'use strict';
import { isAuthenticate, getUserCurrent } from '../libs/auth/auth';
import { MidPermission } from '../models/middle'
import { ResponseError } from '../controllers/BaseReponse';

const publicResources = [
    'login', 'logout'
];
export const authMiddeware = (req, res, next) => {
    if (publicResources.indexOf(req.path.split('/')[1]) >= 0) return next();
    if (!req.session.isAuthenticated) {
        return res.redirect('/admin/login');
    }
    next();
}

export const authLogin = async (req, res, next) => {
    let is_auth = await isAuthenticate(req, res)
    if (is_auth) {
        return res.redirect('/admin/dashboard');
    } else {
        next();
    }
}

export const isAuth = async (req, res, next) => {
    let is_auth = await isAuthenticate(req, res)
    if (!is_auth) {
        return res.redirect('/admin/login');
    } else {
        next();
    }
}

export const isCanPost = async (req, res, next) => {
    let is_auth = await isAuthenticate(req, res)
    if (!is_auth) {
        return res.send({
            signal: 0,
            message: 'Tài khoản đã hết hạn đăng nhập. Vui lòng đăng nhập lại tài khoản',
            logout: 1
        });
    } else {
        next();
    }
}

export const isCanDoActionAdmin = (action) => {
    //check quyền tài khoản
    return async (req, res, next) => {
        let is_auth = await isAuthenticate(req, res)
        if (!is_auth) {
            return ResponseError(res, 'Tài khoản đã hết hạn đăng nhập. Vui lòng đăng nhập lại tài khoản');
        }

        let users = await getUserCurrent(req)
        if (!users) {
            return ResponseError(res, 'Tài khoản đã hết hạn đăng nhập. Vui lòng đăng nhập lại tài khoản');
        }

        try {
            await MidPermission.checkPermissions(users.id, action)
            next();
        } catch (err) {
            return ResponseError(res, 'Tài khoản của bạn không đủ quyền thực hiện hành động này!');
        }
    }
}

export const isCanAccessRouterAdmin = (action) => {

    return async (req, res, next) => {
        let urlDenied = '/admin/error/denied';

        let is_auth = await isAuthenticate(req, res)
        if (!is_auth) {
            return res.redirect(urlDenied);
        }

        let users = await getUserCurrent(req)
        if (!users) {
            return res.redirect(urlDenied);
        }
        try {
            await MidPermission.checkPermissions(users.id, action)
            next();
        } catch (err) {
            return res.redirect(urlDenied);
        }
    }

}