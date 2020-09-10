import React, { Component, Fragment } from 'react';
import { makeRequest } from '../../../../../core/client/app/libs/request'
import { showErrorMessage } from '../../../../../core/client/app/admin-dashboard/actions/notification'
import Social from '../Social'

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: "",
      password: ""
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  handleInput = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  onHandle = (e) => {
    e.preventDefault();
    let target = e.target;
    let name = target.name;
    let value = target.value;
    this.setState({
      [name]: value
    })
  }

  submitLogin = (e) => {
    e.preventDefault();
    let { mobile, password } = this.state;

    makeRequest("get", "https://cms.laodonglyduc.com/api/apiWeb/customer/loginCustomer", { phone: mobile, pass: password })
      .then(res => {
        if (res.data) {
          alert("Welcome LyDuc!");
          window.location.href = '/';
        } else {
          alert(res.message);

        }
      })
      .catch(err => {
        showErrorMessage('Something went wrong!');
      });
  }

  render() {
    return (
      <Fragment>
        <section className="section-login">
          <div className="container">
            <div className="content">
              <div className="text-center logo">
                <img src="/public/images/ic_logo2.png" alt="" />
              </div>
              <div className="form-wrap-ipn">
                <img src="/public/images/ic_phone.png" alt="" className="ic-img" />
                <div className="ic-ipn">
                  <input type="text" className="form-control" placeholder="Nhập số điện thoại" name="mobile" value={this.state.mobile} onChange={(e) => { this.handleInput(e.target.name, e.target.value) }} />
                  {/* <input type="text" className="form-control" placeholder="Nhập số điện thoại" name="mobile" value={mobile} onChange={this.onHandle} /> */}
                </div>
              </div>
              <div className="form-wrap-ipn">
                <img src="/public/images/ic_lock.png" alt="" className="ic-img" />
                <div className="ic-ipn">
                  <input type="password" className="form-control" placeholder="Nhập mật khẩu" name="password" value={this.state.password} onChange={this.onHandle} />
                </div>
              </div>
              <div className="div-next">
                <button type="submit" className="btn btn-block btn-next" onClick={this.submitLogin}>Tiếp tục</button>
              </div>
              <div className="text-center div-register">
                <a href="/register" className="text-uppercase">Đăng ký tài khoản</a>
              </div>
            </div>
          </div>
          <Social />
        </section>
      </Fragment>
    );
  }
}

export default login;