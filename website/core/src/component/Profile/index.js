import React, { Component, Fragment } from 'react';
import Social from '../Social'
class index extends Component {
    componentDidMount(){
        window.scrollTo(0, 0);
    }
    render() {
        return (
            <Fragment>
                <section className="profile-slider">
                </section>
                <section className="profile-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-3">
                                <div className="sidebar">
                                    <div className="avatar">
                                        <img src="/public/images/a1.jpg" alt="" />
                                    </div>
                                    <div className="stars">
                                        <div className="ss">&nbsp;</div>
                                    </div>
                                    <ul className="list-unstyled">
                                        <li className="clearfix">
                                            <div className="thumb">
                                                <span className="fa fa-mobile"></span>
                                            </div>
                                            <div className="info">
                                                <div className="name">Điện thoại</div>
                                                <p className="des">098123785</p>
                                            </div>
                                        </li>
                                        <li className="clearfix">
                                            <div className="thumb">
                                                <span className="fa fa-map-marker"></span>
                                            </div>
                                            <div className="info">
                                                <div className="name">Địa chỉ</div>
                                                <p className="des">391 - Trường Chinh - Khương Đình - Thanh Xuân - HN</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-8 col-md-8 col-lg-9">
                                <div className="body-content">
                                    <div className="name">Nguyễn Văn A</div>
                                    <div className="job">Thợ công ty - Xây sửa nhà</div>
                                    <ul className="list-inline list-tab">
                                        <li className="active"><a href="#">Thông tin cơ bản</a></li>
                                        <li><a href="#">Đánh giá</a></li>
                                        <li><a href="#">Tay nghề</a></li>
                                        <li><a href="#">Ngân hàng</a></li>
                                    </ul>
                                    <div className="tab-contentt">
                                        <div className="group-info">
                                            <div className="name">Điện thoại</div>
                                            <div className="name2">098123785</div>
                                        </div>
                                        <div className="group-info">
                                            <div className="name">Mật khẩu</div>
                                            <div className="name2"><img src="/public/images/pass.png" alt="" /></div>
                                        </div>
                                        <div className="group-info">
                                            <div className="name">Địa chỉ</div>
                                            <div className="name2">391 - Trường Chinh - Khương Đình - Thanh Xuân - HN</div>
                                        </div>
                                        <div className="group-info">
                                            <div className="name">Ngày sinh</div>
                                            <div className="name2">13/10/1995</div>
                                        </div>
                                        <div className="group-info">
                                            <div className="name">Thông tin CMTND Hoặc TCCCD</div>
                                            <div className="name2">Mặt trước Mặt sau</div>
                                        </div>
                                        <div className="group-info">
                                            <div className="cmnd">
                                                <img src="/public/images/dich-cmnd-sang-tieng-nhat.jpg" alt="" />
                                                <img src="/public/images/h10a.jpg" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Social/>
            </Fragment>
        );
    }
}

export default index;