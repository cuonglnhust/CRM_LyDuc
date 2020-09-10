'use strict';
import {
  MidUser, MidSeo
} from '../../models/middle'
import {
  getUserCurrent,
  logout,
} from '../../libs/auth/auth';
import { ResponseError, ResponseSuccess } from '../BaseReponse'

class UserController {


  loadForm(req, res) {
    getUserCurrent(req, res).then(users => {

      let preloadState = {
        users: {
          profile: users
        }
      };
      return res.render('main', {
        preloadState
      });
    }).catch(err => {
      return ResponseError(res, err)
    });
  }

  initViewSite = (req, res) => {
    MidSeo.getAllSeo()
      .then(seo => {
        return res.render('website', {
          preloadState: {},
          seo: seo[0].content,
          url: req.url
        });
      }).catch(err => {
        ResponseError(res, err)
      })
  }

  userLogout(req, res) {
    logout(req, res);
    res.redirect('login');
  }

  getUserProfile(req, res) {
    getUserCurrent(req)
      .then(user => {
        ResponseSuccess(res, user);
      })
      .catch(err => {
        ResponseError(res, err);
      });
  }
  updateUserProfile(req, res) {
    let dataPost = req.body;
    getUserCurrent(req)
      .then(user_account => {
        user_account
          .update(dataPost)
          .then(user => {
            return ResponseSuccess(res, user);
          })
          .catch(err => {
            ResponseError(res, err);
          });
      })
      .catch(err => {
        ResponseError(res, err);
      });
  }

  changePassword(req, res) {
    let dataPost = req.body;
    let {
      old_password,
      password
    } = dataPost;
    if (!old_password || !password) {
      return ResponseError(res, "Require params");
    }
    getUserCurrent(req)
      .then(user => {
        if (!user.checkPassword(old_password)) {
          throw new Error("Mật khẩu không đúng");
        }
        user.updatePassword(password).then(users => {
          return ResponseSuccess(res, users);
        }).catch(err => {
          ResponseError(res, err);
        });

      })
      .catch(err => {
        return ResponseError(res, err);
      });
  }
  getUserNews = (req, res) => {
    let dataPost = req.query
    let { createdBy } = dataPost;
    MidUser.getUserNews(createdBy)
      .then(ins => {
        ResponseSuccess(res, ins)
      })
      .catch(err => {
        ResponseError(res, err)
      })
  }

  createUser = (req, res) => {
    let dataUser = req.body;
    let { full_name, user_name, password, email, mobile, status, avatar, role_id } = dataUser
    if (!full_name || !user_name || !avatar || !password || !email || !mobile || !status || !role_id) {
      return ResponseError(res, 'Require Params')
    }
    MidUser.createUser(dataUser)
      .then(result => {
        ResponseSuccess(res, result)
      }).catch(err => {
        ResponseError(res, err)
      })
  }

  getUser = (req, res) => {
    MidUser.getUser()
      .then(result => {
        ResponseSuccess(res, result)
      }).catch(err => {
        ResponseError(res, err)
      })
  }

  getUserById = (req, res) => {
    let { id } = req.query
    if (!id) {
      return ResponseError(res, 'User không tồn tại!')
    }
    MidUser.getUserById(id)
      .then(result => {
        ResponseSuccess(res, result)
      }).catch(err => {
        ResponseError(res, err)
      })
  }

  getUserRoleById = (req, res) => {
    let { id } = req.query
    if (!id) {
      return ResponseError(res, 'User không tồn tại!')
    }
    MidUser.getUserRoleById(id)
      .then(result => {
        ResponseSuccess(res, result)
      }).catch(err => {
        ResponseError(res, err)
      })
  }

  updateUser = (req, res) => {
    let dataUser = req.body
    let { id, role_id } = dataUser
    if (!id || !role_id) {
      return ResponseError(res, 'Require Params')
    }
    MidUser.updateUser(dataUser)
      .then(result => {
        ResponseSuccess(res, result)
      }).catch(err => {
        ResponseError(res, err)
      })
  }

  deleteUser = (req, res) => {
    let { id } = req.body
    if (!id) {
      return ResponseError(res, 'User không tồn tại!')
    }
    
    getUserCurrent(req)
      .then(user => {
        if (parseInt(user.id) === parseInt(id)) {
          throw new Error("Bạn không được phép xóa tài khoản của mình");
        }
        MidUser.deleteUser(id)
          .then(result => {
            ResponseSuccess(res, result)
          }).catch(err => {
            ResponseError(res, err)
          })
      }).catch(err => {
        ResponseError(res, err);
      }); 
  }

};

export default new UserController();