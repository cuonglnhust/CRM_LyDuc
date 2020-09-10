import React, { Component } from 'react';
import { request } from '../../libs'
import { showErrorMessage } from '../../libs/notification';
import { validateMobile ,validateEmail} from '../../../../../core/server/libs/common/validate'
class contact_form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            full_name: "",
            email: "",
            phone: "",
            note: ""
        }
    }
    handleInput = (key, value) => {
        this.setState({
            [key]: value
        })
    }
    onChangeInputNumber = (e) => {
        e.preventDefault();
        let key = e.target.name;
        let value = e.target.value;
        let oldValue = this.state[key]
        value = value || ''
        let checkIpn = value.replace('+', '')
        if (isNaN(checkIpn)) {
            value = oldValue
        } 
        this.setState({
            [key]: value
        })
    }
    createContact = (e) => {
        e.preventDefault()
        let { full_name, email, phone, note } = this.state;
        if (!full_name || !phone || !email || !note.trim().length) {
            return alert('Vui lòng nhập đầy đủ thông tin')
        }
        if (!validateMobile(phone)){
            return alert('vui lòng nhập số điện thoại đúng định dạng !')
        }
        if (full_name && !full_name.trim().length){
            return alert('vui lòng nhập đầy đủ họ tên!')
        }
        if (!validateEmail(email.trim())){
            return alert('vui lòng nhập email đúng định dạng!')
        }
        request.makeRequest('post', 'https://cms.laodonglyduc.com/api/apiWeb/customer/sendContact', {
            full_name,
            email,
            phone,
            note
        })
            .then(res => {
                if (res.data) {
                    alert("Cảm ơn bạn đã để lại lời nhắn cho chúng tôi!");
                    this.setState({
                        full_name: "",
                        email: "",
                        phone: "",
                        note: ""
                    })
                } else {
                    alert(res.message)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    render() {
        return (
            <section className="contact-form">
                <div className="container">
                    <div className="form-contact" style={{ marginTop: -112 }}>
                        <h3 className="text-uppercase text-center title">Để lại lời nhắn cho chúng tôi</h3>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Họ tên" name="full_name" value={this.state.full_name} onChange={(e) => { this.handleInput(e.target.name, e.target.value) }} />
                        </div>
                        <div className="clearfix">
                            <div className="row">
                                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Email" name="email" value={this.state.email} onChange={(e) => { this.handleInput(e.target.name, e.target.value) }} />
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Số điện thoại" name="phone" value={this.state.phone} onChange={this.onChangeInputNumber}  />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <textarea name="" id="" cols="30" rows="4" className="form-control" placeholder="Lời nhắn" name="note" value={this.state.note} onChange={(e) => { this.handleInput(e.target.name, e.target.value) }}></textarea>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="bg-green text-white text-center text-uppercase btn-send btn-streng" onClick={this.createContact} style={{ width: '100%' }}>Gửi</button>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default contact_form;