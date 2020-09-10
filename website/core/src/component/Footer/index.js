import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { request } from '../../request'
import { showErrorMessage } from '../../request/notification'
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            phone: '',
            hotline: '',
            email: '',
            facebook: '',
            youtube: '',
            twitter: '',
            mobile: '',
            pinterest: ''
        }
    }
    componentWillMount() {
        request.makeRequest("get", "/api/about/getAbout")
            .then(result => {
                if (result.signal) {
                    let listAbout = result.data;
                    this.setState({
                        name: listAbout.name,
                        address: listAbout.address,
                        phone: listAbout.phone,
                        hotline: listAbout.hotline,
                        email: listAbout.email,
                        facebook: listAbout.facebook,
                        youtube: listAbout.youtube,
                        twitter: listAbout.twitter,
                        mobile: listAbout.mobile,
                        pinterest: listAbout.pinterest,
                    })
                } else {
                    return showErrorMessage(result.message)
                }
            }).catch(err => {
                console.log(err)
            })
    }
    render() {
        return (
            // <footer>
            //     <div className="footer-top">
            //         <div className="container">
            //             <div className="clearfix">
            //                 <div className="block1">
            //                     <div className="logo">
            //                         <Link to="/">
            //                             <img src="/public/images/logo.svg" alt="" />
            //                         </Link>
            //                     </div>
            //                     <ul className="list-unstyled m-b-0 list-info">
            //                         <li>
            //                             <div className="icon">
            //                                 <span className="fa fa-map-marker"></span>
            //                             </div>
            //                             <div className="info">
            //                                 <div className="name">Địa chỉ</div>
            //                                 <p className="m-b-0 des">{this.state.address}</p>
            //                             </div>
            //                         </li>
            //                         <li>
            //                             <div className="icon">
            //                                 <span className="fa fa-phone"></span>
            //                             </div>
            //                             <div className="info">
            //                                 <div className="name">Tổng đài</div>
            //                                 <p className="m-b-0 des">{this.state.hotline}</p>
            //                             </div>
            //                         </li>
            //                         <li>
            //                             <div className="icon mobile">
            //                                 <span className="fa fa-mobile"></span>
            //                             </div>
            //                             <div className="info">
            //                                 <div className="name">Di động</div>
            //                                 <p className="m-b-0 des">{this.state.phone}</p>
            //                             </div>
            //                         </li>
            //                         <li>
            //                             <div className="icon">
            //                                 <span className="fa fa-envelope"></span>
            //                             </div>
            //                             <div className="info">
            //                                 <div className="name">Hòm thư</div>
            //                                 <p className="m-b-0 des">{this.state.email}</p>
            //                             </div>
            //                         </li>
            //                     </ul>
            //                 </div>
            //                 <div className="block2">
            //                     <div className="big-name">MENU</div>
            //                     <ul className="list-unstyled m-b-0 list-menu">
            //                         <li><a href="/about">Giới thiệu</a></li>
            //                         <li><a href="/services">Dịch vụ</a></li>
            //                         <li><a href="/partner">Đối tác</a></li>
            //                         <li><a href="/recruitment">Tuyển dụng</a></li>
            //                         <li><a href="/news">Tin tức - Blog</a></li>
            //                         <li><a href="#">Điều khoản</a></li>
            //                     </ul>
            //                 </div>
            //                 <div className="block3">
            //                     <div className="big-name">Social</div>
            //                     <ul className="list-unstyled list-social">
            //                         <li>
            //                             {/* <a href={this.state.youtobe}>
            //                                 <span className="icon">
            //                                     <span className="fa fa-youtube-play"></span>
            //                                 </span>
            //                                 <span className="text">Youtube</span>
            //                             </a> */}
            //                             <a href={this.state.youtube}>
            //                                 <span className="icon">
            //                                     <span className="fa fa-youtube-play"></span>
            //                                 </span>
            //                                 <span className="text">Youtube</span>
            //                             </a>
            //                         </li>
            //                         <li>
            //                             <a href={this.state.facebook}>
            //                                 <span className="icon">
            //                                     <span className="fa fa-facebook"></span>
            //                                 </span>
            //                                 <span className="text">Facebook</span>
            //                             </a>
            //                         </li>
            //                         <li>
            //                             <a href={this.state.twitter}>
            //                                 <span className="icon">
            //                                     <span className="fa fa-twitter"></span>
            //                                 </span>
            //                                 <span className="text">Twitter</span>
            //                             </a>
            //                         </li>
            //                     </ul>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            //     <div className="footer-bottom text-center">
            //         <ul className="list-inline list">
            //             <li><a href="#">Chính sách bảo mật</a></li>
            //             <li><a href="#">Điều khoản dịch vụ</a></li>
            //             <li><a href="#">Hỗ trợ khách hàng</a></li>
            //         </ul>
            //         <p className="m-b-0">Copyright © 2014 Công ty TNHH Nghiệp đoàn Lao động Lý Đức </p>
            //     </div>
            // </footer>

            <footer>
                <div className="footer-top">
                    <div className="container">
                        <div className="clearfix">
                            <div className="block1">
                                <div className="text-center logo">
                                    <a href="/">
                                        <img src="/public/images/logo.png" alt="" />
                                    </a>
                                </div>
                                <h2 className="text-uppercase font-RobotoCondensed-Bold font18 des" style={{fontSize:21 ,lineHeight: "25px", textAlign:"center"}}>{this.state.name}</h2>
                                <ul className="clearfix list-social">
                                    <li>
                                        <a href={this.state.youtube} target="_blank" className="social4">
                                            Youtube
                                        </a>
                                    </li>
                                    <li>
                                        <a href={this.state.facebook} target="_blank" className="social1">
                                            Facebook
                                        </a>
                                    </li>
                                    <li>
                                        <a href={this.state.twitter}  target="_blank" className="social2">
                                            Twitter
                                        </a>
                                    </li>
                                    <li>
                                        <a href={this.state.pinterest} target="_blank" className="social3">
                                            Pinterest
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="block2 text-33">
                                <div className="text-uppercase font-RobotoCondensed-Bold font24 big-name">Thông tin liên hệ</div>
                                <div className="unit">
                                    <div className="text-uppercase font20 font-RobotoCondensed-Bold">Hà Nội</div>
                                    <p className="font16 font-RobotoCondensed-Regular"> <div dangerouslySetInnerHTML={{ __html: this.state.address }} /></p>
                                </div>
                                <div className="unit">
                                    <div className="font20 font-RobotoCondensed-Bold">Cố định</div>
                                    <p className="font16 font-RobotoCondensed-Regular">{this.state.phone}</p>
                                </div>
                                <div className="unit">
                                    <div className="font20 font-RobotoCondensed-Bold">Tổng đài</div>
                                    <p className="font16 font-RobotoCondensed-Regular">{this.state.hotline}</p>
                                </div>
                                <div className="unit">
                                    <div className="font20 font-RobotoCondensed-Bold">Di động</div>
                                    <p className="font16 font-RobotoCondensed-Regular">{this.state.mobile}</p>
                                </div>
                            </div>
                            <div className="block3">
                                <div className="text-uppercase font-RobotoCondensed-Bold font24 big-name">Danh sách phục vụ</div>
                                <ul className="list-unstyled m-b-0 list-menu">
                                    <li className="font16 font-RobotoCondensed-Regular">Quận Ba Đình</li>
                                    <li className="font16 font-RobotoCondensed-Regular">Quận Bắc Từ Liêm</li>
                                    <li className="font16 font-RobotoCondensed-Regular">Quận Cầu Giấy</li>
                                    <li className="font16 font-RobotoCondensed-Regular">Quận Đống Đa</li>
                                    <li className="font16 font-RobotoCondensed-Regular">Quận Hà Đông</li>
                                    <li className="font16 font-RobotoCondensed-Regular">Quận Hai Bà Trưng</li>
                                    <li className="font16 font-RobotoCondensed-Regular">Quận Hoàn Kiếm</li>
                                    <li className="font16 font-RobotoCondensed-Regular">Quận Hoàng Mai</li>
                                    <li className="font16 font-RobotoCondensed-Regular">Quận Long Biên</li>
                                    <li className="font16 font-RobotoCondensed-Regular">Quận Nam Từ Liêm</li>
                                    <li className="font16 font-RobotoCondensed-Regular">Quận Tây Hồ</li>
                                    <li className="font16 font-RobotoCondensed-Regular">Quận Thanh Xuân</li>
                                    <li className="font16 font-RobotoCondensed-Regular">Và các huyện lân cận</li>
                                </ul>
                            </div>
                            <div className="block3 block3-mobile">
                                <div className="" id="accordion" role="tablist" aria-multiselectable="true">
                                    <div className="big-name" role="tab" id="headingOne">
                                        <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="false" aria-controls="collapseOne" className="text-uppercase font-RobotoCondensed-Bold font24 text-33">
                                            Danh sách phục vụ
                                </a>
                                    </div>
                                    <div id="collapseOne" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
                                        <ul className="list-unstyled m-b-0 list-menu">
                                            <li>Quận Ba Đình</li>
                                            <li>Quận Bắc Từ Liêm</li>
                                            <li>Quận Cầu Giấy</li>
                                            <li>Quận Đống Đa</li>
                                            <li>Quận Hà Đông</li>
                                            <li>Quận Hai Bà Trưng</li>
                                            <li>Quận Hoàn Kiếm</li>
                                            <li>Quận Hoàng Mai</li>
                                            <li>Quận Long Biên</li>
                                            <li>Quận Nam Từ Liêm</li>
                                            <li>Quận Tây Hồ</li>
                                            <li>Quận Thanh Xuân</li>
                                            <li>Và các huyện lân cận</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="block4">
                                <div className="text-uppercase font-RobotoCondensed-Bold font24 big-name">Menu</div>
                                <ul className="list-unstyled m-b-0 list-menu">
                                    <ul className="list-unstyled m-b-0 list-menu">
                                        <li><a href="/gioi-thieu">Giới thiệu</a></li>
                                        <li><a href="/dich-vu">Dịch vụ</a></li>
                                        <li><a href="/doi-tac">Đối tác</a></li>
                                        <li><a href="/tuyen-dung">Tuyển dụng</a></li>
                                        <li><a href="/tin-tuc">Tin tức - Blog</a></li>
                                        <li><a href="/cam-ket">Điều khoản</a></li>
                                    </ul>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom text-center">
                    <p className="m-b-0 font-RobotoCondensed-Italic text-4f">© Copyright 2012 - 2019 Ly Duc, All rights reserved.</p>
                </div>
            </footer>
        );
    }
}

export default index;