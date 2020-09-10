'use strict';
import {authenticateUser, isAuthenticate} from '../../libs/auth/auth';
import {ResponseError, ResponseSuccess} from '../BaseReponse';
import {MidUser} from '../../models/middle';

class LoginController {

    loadForm(req, res) {
        return res.render('login')
    }

    checkLogin(req, res) {
        if (isAuthenticate(req, res)) {
            return res.redirect('/admin/dashboard');
        } else {
            return res.redirect('/admin/login');
        }
    }

    register(req, res) {
        let dataPost = req.body;
        let { full_name, user_name, password,mobile, avatar, email} = dataPost;
        if (!full_name  || !user_name  || !password  || !avatar  || !email  || !mobile ) {
            return ResponseError(res, "Vui lòng nhập đủ thông tin yêu cầu")
        }

        MidUser.registerUser(dataPost)
            .then(ins => {
                return ResponseSuccess(res, ins)
            })
            .catch(err => {
                return ResponseError(res, err)
            });
    }

    login(req, res) {
        let dataPost = req.body,
            user_name = dataPost.user_name || '',
            password = dataPost.password || '';

        user_name = user_name.trim();
        password = password.trim();

        if (!user_name || !password) {
            return ResponseError(res, 'Require params');    
        }
                console.log("1111111111111111111111111",dataPost)
        authenticateUser(req, res, { user_name, password })
            .then(ins => {
                console.log("1111111111111111111111111",user_name, password)
                 return ResponseSuccess(res, ins);
            })
            .catch(err => {
                console.log("1111111111111111111111111err.message",err.message)
                 return ResponseError(res, err.message);
            });
    }

}

export default new LoginController