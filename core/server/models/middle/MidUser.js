'use strict';
import User from '../User';

import User_Role from '../User_Role';
import CodeForgot from '../CodeForgot'
import {
    validateEmail
} from '../../libs/common/validate';
import {
    generateRandomString
} from '../../utils/random'
import {
    sendMailForgot
} from '../../libs/common/mail'

class MidUser {
    // async checkPassword(email, password) {
    //     let user = await Users.getUserByEmail(email);
    //     if (!user) {
    //         throw new Error('Email incorrect!');
    //     }

    //     if (!user.checkPassword(password)) {
    //         throw new Error('Password incorrect!');
    //     }

    //     return true;
    // }

    // async checkEmail(email) {
    //     let user = await Users.getUserByEmail(email);
    //     if (!user) {
    //         throw new Error('Email incorrect!');
    //     }
    //     return true;
    // }

    // async forgotPassword(email) {
    //     let user = await Users.getUserByEmail(email);
    //     if (!user) {
    //         throw new Error('Email incorrect!');
    //     }

    //     let code = generateRandomString(32)

    //     let dataForgot = {
    //         email,
    //         del: 0,
    //         code
    //     }

    //     let forgot = await CodeForgot.create(dataForgot)
    //     sendMailForgot(code, email)
    //     return 'success'
    // }

    // async resetPassword(dataPost) {
    //     if (!dataPost.code || !dataPost.password) {
    //         throw new Error('Require params')
    //     }

    //     let codeData = await this.getCodeForgot(dataPost.code)
    //     if (!codeData) {
    //         throw new Error('Yêu cầu của bạn hết hạn hoặc không hợp lệ')
    //     }

    //     let email = codeData.email
    //     let userData = await this.getUserByEmail(email)
    //     if (!userData) {
    //         throw new Error('Yêu cầu của bạn hết hạn hoặc không hợp lệ')
    //     }

    //     userData.setPassword(dataPost.password)
    //     let user_update = await userData.save()
    //     return user_update
    // }

    // getCodeForgot(code) {
    //     return CodeForgot.findOne({
    //         where: {
    //             code
    //         }
    //     })
    // }

    // changeAccount(fullname, mobile, avatar, user) {
    //     return new Promise((resolve, reject) => {
    //         user.update({
    //             fullname,
    //             mobile,
    //             avatar
    //         })
    //             .then(ins => resolve(ins))
    //             .catch(err => reject(err));
    //     });
    // }

    // getUserByEmail(email) {
    //     return Users.getUserByEmail(email);
    // }

    async createUser(data) {
        try {
          let checkAccount = await User.getCheckAccount(data.user_name, data.email, data.mobile)
          if (checkAccount) {
            throw new Error("Tài khoản đã tồn tại");
          }
          let adminAccount = await User.create(data);
          if (!adminAccount) {
            throw new Error("Có lỗi xảy ra. Đăng ký tài khoản không thành công.");
          }
          let user_id = adminAccount.id
          let role_id = parseInt(data.role_id)
          let user_role = await User_Role.create({ user_id, role_id })
          return { adminAccount, user_role }
        } catch (err) {
          throw new Error(err)
        }
      }

    async registerUser(data) {
        try {
            let {
                user_name
            } = data
            let users = await User.getUserByUserName(user_name);
            if (users) {
                throw new Error('Tên người dùng đã tồn tại');
            }
            let dataReg = Object.assign(data, {
                status: 0,
                del: 0
            })
            let userAccount = await User.create(dataReg);
            if (!userAccount) {
                throw new Error("Có lỗi xảy ra. Đăng ký tài khoản không thành công.");
            }
            return userAccount
        } catch (err) {
            throw new Error(err)
        }
    }
    getUserNews = async (createdBy) => {
        try {
            let user = await User.getUserNews(createdBy)
            if (!user) {
                throw new Error("Không tìm thấy tác giả !")
            }
            return user
        } catch (err) {
            throw new Error(err)
        }
    }

    async getUser() {
        try {
          let user = await User_Role.getUser()
          if (!user) {
            throw new Error('không tồn tại User')
          }
          return user
        } catch (err) {
          throw new Error(err)
        }
      }
    
      getUserById = async (id) => {
        try {
          let user = await User.getUserById(id)
          if (!user) {
            throw new Error('không tồn tại User')
          }
          return user
        } catch (err) {
          throw new Error(err)
        }
      }

      getUserRoleById = async (id) => {
        try {
          let user = await User_Role.getUserById(id)
          if (!user) {
            throw new Error('không tồn tại User')
          }
          return user
        } catch (err) {
          throw new Error(err)
        }
      }
    
      updateUser = async (data) => {
        try {
          let user = await User.findOne({
            where: {
              del: 0,
              id: data.id
            }
          })
          if (!user) {
            throw new Error('không tồn tại User')
          }
          await user.update(data)
          let user_role = await User_Role.getUserById(data.id)
          if (!user_role) {
            user_role = await User_Role.create({
              user_id: user.id,
              role_id: parseInt(data.role_id),
              del: 0
            })
          }
          await user_role.update({
            role_id: parseInt(data.role_id)
          })
          return { user, user_role }
        } catch (err) {
          throw new Error(err)
        }
    
      }
    
      deleteUser = async (id) => {
        try {
          let user_role = await User_Role.findOne({
            where: {
              del: 0,
              user_id:id
            }
          })
          if (!user_role) {
            throw new Error('không tồn tại user có quyền này')
          }
          let user = await User.findOne({
            where: {
              del: 0,
              id: user_role.user_id
            }
          })
          if (!user) {
            throw new Error('không tồn tại user')
          }
          await user.update({ del: 1 })
          await user_role.update({ del: 1 })
          return { user, user_role }
        } catch (err) {
          throw new Error(err)
        }
      }
}

export default new MidUser()