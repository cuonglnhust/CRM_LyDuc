import React, { Component } from 'react';
import InputGroup from '../Common/InputGroup'
import ButtonUpload from '../Common/ButtonUpload'
import Success from './Success'
import {validateMobile, validateEmail} from '../../../libs/utils';
import { showErrorMessage } from '../../actions/notification'
import { makeRequest } from '../../../libs/request'
import { Link } from 'react-router-dom'

class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            full_name: '',
            user_name: '',
            email: '',
            mobile: '',
            avatar: '',
            password: '',
            confirm_password: '',
            success: false
        }
    }

    changeInput = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    submitRegister = (e) => {
        e.preventDefault()
        let { password, confirm_password, user_name, full_name, email, mobile, avatar } = this.state
        if (confirm_password != password) {
            return showErrorMessage('Mật khẩu xác nhận không đúng')
        }

        if ( validateMobile(mobile)==false) {
            return showErrorMessage("Vui lòng nhập số điện thoại và đúng định dạng");
            
        }

        if (!validateEmail(email)) {
            return showErrorMessage("Vui lòng nhập email và đúng định dạng");
        }

        makeRequest('post', '/admin/register', {
            user_name, password, full_name, email, mobile, avatar
        })
            .then(result => {
                if (result.signal) {
                    this.setState({
                        success: true
                    })
                } else {
                    showErrorMessage(result.message)
                }
            })
    }

    render() {
        let { success } = this.state;
        return (
            <form onSubmit={this.submitRegister}>
                {success ? (
                    <Success />
                ) : (
                        <div className="panel panel-body login-form">
                            <div className="text-center">
                                <div className="icon-object border-slate-300 text-slate-300">
                                    <i className="icon-reading"></i>
                                </div>
                                <h5 className="content-group">Tạo tài khoản đăng nhập</h5>
                            </div>
                            <div className="row">
                                <div className="col-md-6 ">
                                    <div className="form-group">
                                        <label className="control-label fontBold">Tên tài khoản <span className="text-danger">*</span></label>
                                        <InputGroup
                                            placeholder=""
                                            name="user_name"
                                            required
                                            type="text"
                                            changeInput={this.changeInput}
                                            icon='icon-user'
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label fontBold">Mật khẩu: <span className="text-danger">*</span></label>
                                        <InputGroup
                                            placeholder=""
                                            name="password"
                                            type="password"
                                            required
                                            changeInput={this.changeInput}
                                            icon="icon-lock2"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label fontBold">Xác nhận mật khẩu: <span className="text-danger">*</span></label>
                                        <InputGroup
                                            placeholder=""
                                            type="password"
                                            name="confirm_password"
                                            required
                                            changeInput={this.changeInput}
                                            icon="icon-lock2"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 ">
                                    <div className="form-group">
                                        <label className="control-label fontBold">Họ Và Tên <span className="text-danger">*</span></label>
                                        <InputGroup
                                            placeholder=""
                                            name="full_name"
                                            required
                                            type="text"
                                            changeInput={this.changeInput}
                                            icon='icon-user'
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label fontBold">Email <span className="text-danger">*</span></label>
                                        <InputGroup
                                            placeholder=""
                                            name="email"
                                            required
                                            type="text"
                                            changeInput={this.changeInput}
                                            icon='icon-mail-read'
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label fontBold">Mobile <span className="text-danger">*</span></label>
                                        <InputGroup
                                            placeholder=""
                                            name="mobile"
                                            required
                                            type="text"
                                            changeInput={this.changeInput}
                                            icon='icon-mobile'
                                        />
                                    </div>
                                    <ButtonUpload
                                        name="avatar"
                                        uploadSuccess={this.changeInput}
                                        title="Avatar"
                                        value={this.state.avatar}
                                    />

                                </div>
                            </div>
                            <div className="form-group has-feedback has-feedback-left" style={{ paddingTop: '0px' }}>

                                <div className="text-right">
                                    <Link to="/admin/login" className="btn btn-link"><i className="icon-arrow-left13 position-left" /> Quay lại đăng nhập</Link>
                                    <button type="submit" className="btn bg-teal-400 btn-labeled btn-labeled-right ml-10"><b><i className="icon-plus3" /></b> Đăng ký</button>
                                </div>
                            </div>
                        </div>
                    )}
            </form >
        );
    }
}

export default index;