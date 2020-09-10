import React, { Component, Fragment } from 'react';
import { makeRequest } from '../../../../../core/client/app/libs/request'
import { showErrorMessage } from '../../../../../core/client/app/admin-dashboard/actions/notification'
import Social from '../Social'
import { validateMobile, validatePassword } from '../../../../../core/server/libs/common/validate'
class register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            phone: "",
            pass: "",
            address: ""
        };
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
    onChangeInputNumber = (e) => {
        e.preventDefault();

        let key = e.target.name;
        let value = e.target.value;
        let oldValue = this.state[key]
        value = value || ''
        let checkIpn = value.replace('+', '')
        console.log('+++', value, oldValue)
        if (isNaN(checkIpn)) {
            value = oldValue
        }
        this.setState({
            [key]: value
        })
    }
    submitRegister = (e) => {
        e.preventDefault();
        let { name, phone, pass, address } = this.state;
        if (!name || !phone || !pass || !address) {
            return alert('Vui lòng nhập đầy đủ thông tin!')
        }
        if (name && !name.trim().length) {
            return alert('Vui lòng nhập đầy đủ thông tin họ và tên!')
        }
        if (address && !address.trim().length) {
            return alert('Vui lòng nhập đầy đủ thông tin địa chỉ!')
        }
        if (!validateMobile(phone)) {
            return alert('Vui lòng nhập số điện thoại đúng định dạng!')
        }
        if (validatePassword(pass)) {
            return alert('vui lòng đặt mật khẩu không chứa khoảng trắng')
        }
        makeRequest("post", "https://cms.laodonglyduc.com/api/apiWeb/customer/creatCustomer", { name, phone, pass, address })
            .then(res => {
                if (res.data) {
                    alert("Đăng ký thành công!")
                    window.location.href = '/login';
                } else {
                    alert(res.message)
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
                                <img src="/public/images/ic_name.png" alt="" className="ic-img" />
                                <div className="ic-ipn">
                                    <input type="text" className="form-control" placeholder="Họ và tên khách hàng" name="name" value={this.state.name} onChange={(e) => { this.handleInput(e.target.name, e.target.value) }} />
                                </div>
                            </div>
                            <div className="form-wrap-ipn">
                                <img src="/public/images/ic_phone.png" alt="" className="ic-img" />
                                <div className="ic-ipn">
                                    <input type="text" className="form-control" placeholder="Nhập số điện thoại" name="phone" value={this.state.phone} onChange={this.onChangeInputNumber} min="0" />
                                </div>
                            </div>
                            <div className="form-wrap-ipn">
                                <img src="/public/images/ic_lock.png" alt="" className="ic-img" />
                                <div className="ic-ipn">
                                    <input type="password" className="form-control" placeholder="Nhập mật khẩu" name="pass" value={this.state.pass} onChange={this.onHandle} />
                                </div>
                            </div>
                            <div className="form-wrap-ipn">
                                <img src="/public/images/Group.png" alt="" className="ic-img" />
                                <div className="ic-ipn">
                                    <input type="text" className="form-control" placeholder="Nhập địa chỉ khách hàng" name="address" value={this.state.address} onChange={(e) => { this.handleInput(e.target.name, e.target.value) }} />
                                </div>
                            </div>
                            <div className="div-next">
                                <button type="submit" className="btn btn-block btn-next" onClick={this.submitRegister}>Đăng ký khách hàng</button>
                            </div>
                        </div>
                    </div>
                </section>
                <Social />
            </Fragment>
        );
    }
}

export default register;