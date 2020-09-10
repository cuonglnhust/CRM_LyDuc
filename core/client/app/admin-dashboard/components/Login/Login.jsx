import React, { Component } from 'react';

import { Link } from 'react-router-dom'
import { makeRequest } from '../../../libs/request'
import { showErrorMessage } from '../../actions/notification'
import InputGroup from '../Common/InputGroup'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_name: "",
      password: ""
    };
  }

  changeInput = (key, value) => {
    this.setState({
      [key]: value.trim()
    });
  }

  submitLogin(e) {
    e.preventDefault();
    let { user_name, password } = this.state;

    makeRequest('post', '/admin/login', { user_name, password })
      .then(data => {
        if (data.signal) {
          window.location.href = '/admin/dashboard';
        } else {
          showErrorMessage(data.message);

        }
      })
      .catch(err => {
        showErrorMessage('Something went wrong!');
      });
  }

  render() {
    let { error, disabled, email, password } = this.state;
    return (
      <div>
        <form action="#">
          <div className="panel panel-body login-form" style={{width: 500 , margin:"auto"}}>
            <div className="text-center">
              <div className="icon-object border-slate-300 text-slate-300">
                <i className="icon-reading"></i>
              </div>
              <h5 className="content-group">Đăng nhập</h5>
            </div>
            <div className="form-group has-feedback has-feedback-left" style={{ paddingTop: '0px' }}>
              <div className="form-group">
                <label className="control-label fontBold">Tên tài khoản <span className="text-danger">*</span></label>
                <InputGroup
                  placeholder="Tên tài khoản"
                  name="user_name"
                  required
                  type="text"
                  changeInput={this.changeInput}
                  icon="icon-user"
                />
              </div>
            </div>
            <div className="form-group has-feedback has-feedback-left" style={{ paddingTop: '0px' }}>
              <div className="form-group">
                <label className="control-label fontBold">Mật khẩu <span className="text-danger">*</span></label>
                <InputGroup
                  placeholder="Mật khẩu"
                  name="password"
                  required
                  type="password"
                  changeInput={this.changeInput}
                  icon="icon-key"
                />
              </div>
            </div>
            <div className="text-right marginB10">
              <Link to="/admin/forgot-password">Quên mật khẩu?</Link>
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={disabled}
                onClick={this
                  .submitLogin
                  .bind(this)}>Đăng nhập
                <i className="icon-arrow-right14 position-right"></i>
              </button>
            </div>
            <div className="form-group">
              <Link to="/admin/register"><button type="button" className="btn btn-default btn-block">Đăng ký</button></Link>
            </div>

          </div>
        </form>

      </div>
    )
  }
}
export default Login;
