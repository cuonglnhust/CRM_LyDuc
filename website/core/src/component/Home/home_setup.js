import React, { Component } from 'react';
import { request } from '../../request'
class home_setup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listAppDetailEmp: "",
            listAppDetailCus: "",
        }
    }
    componentWillMount() {
        this.getListAppDetailEmp()
        this.getListAppDetailCus()
    }
    getListAppDetailEmp() {
        request.makeRequest("get", "/api/appdetail/getAllAppDetailEmp")
            .then(result => {
                if (result.signal) {
                    this.setState({
                        listAppDetailEmp: result.data
                    })
                } else {
                    return showErrorMessage(result.message)
                }
            }).catch(err => {
                console.log(err)
            })
    }
    getListAppDetailCus() {
        request.makeRequest("get", "/api/appdetail/getAllAppDetailCus")
            .then(result => {
                if (result.signal) {
                    this.setState({
                        listAppDetailCus: result.data
                    })
                } else {
                    return showErrorMessage(result.message)
                }
            }).catch(err => {
                console.log(err)
            })
    }
    render() {
        let { listAppDetailEmp,listAppDetailCus } = this.state;
        return (
            <section className="home-setup">
                <div className="text-uppercase text-center font48 font-Roboto-Bold big-title">
                    <span className="text-white" style={{ margin: "5px" }}>Cài đặt</span>
                    <span className="text-green" style={{ margin: "5px" }}>Ứng dụng</span>
                </div>
                <p className="text-uppercase text-center font24 text-white sub-title">Chúng tôi hỗ trợ ứng dụng trên nền tảng iOS và Android</p>
                <ul className="list-inline text-center list-app">
                    <li className="left">
                        <div className="text-uppercase text-white font-Roboto-Medium font26 txt1">Ứng dụng dành cho</div>
                        <div className="text-uppercase text-white font-Roboto-Medium font42 txt2">Nhân công</div>
                        <a href={listAppDetailEmp.link_app_android} className="download">
                            <img src="/public/images/icon/google-play.png" alt="" />
                        </a>
                        <a href={listAppDetailEmp.link_app_ios} className="download">
                            <img src="/public/images/icon/app-store.png" alt="" />
                        </a>
                        <div className="clearfix download-qr">
                            <img src="/public/images/icon/qr-code.png" alt="" />
                            <div className="font24 text-white text">Tải bằng mã QR</div>
                        </div>
                    </li>
                    {/* <li className="right">
                        <div className="text-uppercase text-white font-Roboto-Medium font26 txt1">Ứng dụng dành cho</div>
                        <div className="text-uppercase text-white font-Roboto-Medium font42 txt2">Khách hàng</div>
                        <a href={listAppDetailCus.link_app_android} className="download">
                            <img src="/public/images/icon/google-play.png" alt="" />
                        </a>
                        <a href={listAppDetailCus.link_app_ios} className="download">
                            <img src="/public/images/icon/app-store.png" alt="" />
                        </a>
                        <div className="clearfix download-qr">
                            <img src="/public/images/icon/qr-code.png" alt="" />
                            <div className="font24 text-white text">Tải bằng mã QR</div>
                        </div>
                    </li> */}
                </ul>
            </section>

        )
    }
}

export default home_setup;