    'use strict';

import _ from 'lodash';
import {User} from '../../models';
import {encrypt, decrypt} from '../common/encryption';
import {
    generateRandomString
} from '../../utils/random'

const LYDUC_KEY_SESSION_AUTH = 'auth_lyduc_identity';
const LYDUC_KEY_COOKIES_AUTH = 'auth_lyduc_cookies';
const LYDUC_COOKIES_LIFETIME = 30 * 24 * 3600 * 1000;

let self = module.exports = {
    authenticateUser: async(req, res, credentials) => {
        let user_instance = await User.getUserByUserName(credentials.user_name);
        if (!user_instance || !user_instance.id) {
            throw new Error('Tài khoản không tồn tại.');
        }

        if (!user_instance.status)
            throw new Error('Tài khoản chưa kích hoạt');

        if (!user_instance.password || !user_instance.checkPassword(credentials.password)) {
            throw new Error('Mật khẩu không đúng, vui lòng thử lại.');
        } 

        // let token = generateRandomString(32)
        // let userUpdate = await user_instance.update({token})
        self.setCookies(res, LYDUC_KEY_COOKIES_AUTH, JSON.stringify(user_instance));
        self.setIdentity(req, user_instance);
        return true
    },
    isAuthenticate: async(req, res) =>{
        let dataIdentity = req.session[LYDUC_KEY_SESSION_AUTH] || ''
        let dataCookies = res.cookies.get( LYDUC_KEY_COOKIES_AUTH) || ''
        if (dataIdentity) {
            if (!dataCookies) {
                self.setCookies(res,  LYDUC_KEY_COOKIES_AUTH, JSON.stringify(dataIdentity), LYDUC_COOKIES_LIFETIME)
            }
            return true
        } else {
            if (!dataCookies)
                return false
            else {
                let dataUser = JSON.parse(decrypt(dataCookies))
                self.setIdentity(req, dataUser, LYDUC_KEY_SESSION_AUTH)
                return true
            }
        }
    },

    loginUser :(req, res, users) => {
        self.setCookies(res, LYDUC_KEY_COOKIES_AUTH, JSON.stringify(users));
        self.setIdentity(req, users);
    },

    setCookies : (res, key, data, lifeTime = LYDUC_COOKIES_LIFETIME, path='/', httpOnly = true) => {
        let dataEncrypt = encrypt(data);
        res.cookies.set(key, dataEncrypt, {maxAge: lifeTime, httpOnly: httpOnly});
    },

    setIdentity(req, user) {
        req.session[LYDUC_KEY_SESSION_AUTH] =  user ;
    },

    removeCookies(res) {
        res.clearCookie(LYDUC_KEY_COOKIES_AUTH);
    },

    logout(req, res) {
        self.removeCookies(res);
        req.session.destroy();
    },

    getUserCurrent(req) {
        return new Promise((resolve, reject) => {
            let dataIdentity = req.session[LYDUC_KEY_SESSION_AUTH] || '';
            if (!dataIdentity || !dataIdentity.id) {
                resolve(false);
            }
            return User.getUserById(dataIdentity.id).then(users => resolve(users))
                .catch(err => reject(err));
        });

    }
    
}