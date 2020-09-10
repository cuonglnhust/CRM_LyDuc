import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom'
import { request } from '../../request'
import { showErrorMessage } from '../../request/notification'
import { Link } from 'react-router-dom'
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listNews: [],
            title: '',
            listServicesCategory: [],
            collapse: 'collapse',
            ariaExpanded: false
        }
    }
    componentWillMount() {
        // if ($(window).width() > 992) {
        //     var $header_top = $('#header-site'),
        //     off_Top = ($('body').length > 0) ? $('body').offset().top : 0,
        //     menuH = $header_top.outerHeight(),
        //     latestScroll = 0;
        //     if ($(window).scrollTop() > 2) {
        //     $header_top.removeClass('affix-top').addClass('affix');
        //     }
        //     $(window).scroll(function() {
        //     var current = $(this).scrollTop();
        //     if (current > 2) {
        //     $header_top.removeClass('affix-top').addClass('affix');
        //     } else {
        //     $header_top.removeClass('affix').addClass('affix-top');
        //     }
        //     if (current > latestScroll && current > menuH + off_Top) {
        //     if (!$header_top.hasClass('menu-hidden')) {
        //     $header_top.addClass('menu-hidden');
        //     }
        //     } else {
        //     if ($header_top.hasClass('menu-hidden')) {
        //     $header_top.removeClass('menu-hidden');
        //     }
        //     }
        //     latestScroll = current;
        //     });
        // }
        let { title } = this.state;
        this.getListNews(title)
        this.getListServicesCategory()
    }
    getListNews(title) {
        request.makeRequest("get", `/api/news/getAllNewsByAllCategory`, {
            title
        })
            .then(result => {
                if (result.signal) {
                    let listNews = result.data;

                    this.setState({
                        listNews,
                        title,
                    })
                } else {
                    return showErrorMessage(result.message)
                }
            }).catch(err => {
                console.log(err)
            })
    }
    getListServicesCategory() {
        request.makeRequest("get", "/api/services/getListServicesCategory")
            .then(result => {
                if (result.signal) {
                    this.setState({
                        listServicesCategory: result.data.listServices
                    })
                } else {
                    return showErrorMessage(result.message)
                }
            }).catch(err => {
                console.log(err)
            })
    }

    changeUrl = (url, data, e) => {
        e.preventDefault();
        this.setState({
            collapse: 'collapse',
            ariaExpanded: false
        })
        this.props.history.push(url, data)
    }
    clickLink = (link, e) => {
        e.preventDefault();
        this.setState({
            collapse: 'collapse',
            ariaExpanded: false
        })
        window.location.href= link
    }
    clickNavbarToggle = () => {
        if (this.state.collapse == 'collapse') {
            this.setState({
                collapse: 'collapse in',
                ariaExpanded: true
            })
        } else {
            this.setState({
                collapse: 'collapse',
                ariaExpanded: false
            })
        }
    }

    render() {
        let { listNews, listServicesCategory } = this.state
        let renderNewsAllMob = listNews.map((item, idx) => {
            return (
                <li key={`menu_news-cats__${idx}`}><a href="javascript:void(0)" onClick={this.clickLink.bind(this, `/tin-tuc/${item.slug}`)}>{item.title}</a></li>
            );
        })
        let renderServicesMob = listServicesCategory.map((item, idx) => {
            return (
                <li key={`services__${idx}`}><a href="javascript:void(0)" onClick={this.clickLink.bind(this, `/dich-vu/${item.slug}`)}>{item.title}</a></li>
            );
        })
        let renderNewsAll = listNews.map((item, idx) => {
            return (
                <li key={`menu_news-cats__${idx}`}><Link to={`/tin-tuc/${item.slug}`} >{item.title}</Link></li>
            );
        })
        let renderServices = listServicesCategory.map((item, idx) => {
            return (
                <li key={`services__${idx}`}><Link to={`/dich-vu/${item.slug}`}>{item.title}</Link></li>
            );
        })
        return (
            <Fragment>
                <div className="bg-green h-desktop">
                    <div className="container">
                        <div className="clearfix">
                            <div className="logo">
                                <a href="/">
                                    <img src="/public/images/ic_logo.png" alt="" />
                                    <span className="sr-only">Nghiệp đoàn lao động Lý Đức</span>
                                </a>
                            </div>
                            <div className="menu">
                                <ul className="list-unstyled ul-menu">
                                    <li>
                                        <a href="/gioi-thieu">Giới thiệu</a>
                                    </li>
                                    <li className="has-child">
                                        <a href="/dich-vu">Dịch vụ</a>
                                        <ul>
                                            {renderServices}
                                        </ul>
                                    </li>
                                    <li className="has-child">
                                        <a href="/tin-tuc">Tin tức</a>
                                        <ul>
                                            {renderNewsAll}
                                        </ul>
                                    </li>

                                    <li><a href="/tuyen-dung">Tuyển dụng</a></li>

                                    <li><a href="/doi-tac">Đối tác</a></li>
                                    <li className="has-child">
                                        <a href="/cam-ket">Cam kết</a>
                                        <ul>
                                            <li><a href="#" onClick={this.changeUrl.bind(this, '/cam-ket', { option: 'cam-ket-cua-ly-duc' })}>Cam kết của Lý Đức</a></li>
                                            <li><a href="#" onClick={this.changeUrl.bind(this, '/cam-ket', { option: 'chinh-sach-bao-mat-thong-tin' })}>Chính sách bảo mật thông tin</a></li>
                                            <li><a href="#" onClick={this.changeUrl.bind(this, '/cam-ket', { option: 'dieu-khoan' })}>Điều khoản</a></li>
                                        </ul>
                                    </li>
                                    <li className="has-child">
                                        <a href="/tro-giup">Trợ giúp</a>
                                        <ul>
                                            <li><a href="#" onClick={this.changeUrl.bind(this, '/tro-giup', { option: 'cau-hoi-thuong-gap' })}>Câu hỏi thường gặp</a></li>
                                            {/* <li><a href="#" onClick={this.changeUrl.bind(this, '/help', { option: 'huong-dan-su-dung' })}>Hướng dẫn sử dụng</a></li> */}
                                        </ul>
                                    </li>
                                    <li><a href="/lien-he">Liên hệ</a></li>
                                    <li className="user">
                                        <a href="#">
                                            <img src="/public/images/icon/user.png" alt="" />
                                        </a>
                                        <ul className="re_ri">
                                            <li><a href="/dang-nhap">Đăng nhập khách hàng</a></li>
                                            <li><a href="/dang-ky-tho">Đăng ký thợ</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-mobile">
                    <nav className="navbar navbar-default bg-green header-top">
                        <div className="container">
                            <div className="navbar-header">
                                <button type="button" className={`navbar-toggle ${!this.state.ariaExpanded ? 'collapsed' : ''}`} data-toggle="collapse" data-target="#bs-example-navbar-collapse-2" aria-expanded={this.state.ariaExpanded} onClick={this.clickNavbarToggle.bind(this)}>
                                    {/* <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false"> */}
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
                                <a className="navbar-brand" href="/">
                                    <img src="/public/images/ic_logo.png" alt="" />
                                    <span className="sr-only">Nghiệp đoàn lao động Lý Đức</span>
                                </a>
                            </div>
                            <div className={`${this.state.collapse} navbar-collapse`} id="bs-example-navbar-collapse-2" aria-expanded={this.state.ariaExpanded}>
                                <ul className="nav navbar-nav navbar-right menu">
                                    <li><a href="javascript:void(0)" onClick={this.clickLink.bind(this, "/gioi-thieu")}>Giới thiệu</a></li>
                                    <li className="dropdown">
                                        <a href="javascript:void(0)" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                            Dịch vụ <span className="caret"></span>
                                        </a>
                                        <ul className="dropdown-menu">
                                            {renderServicesMob}
                                        </ul>
                                    </li>
                                    <li className="dropdown">
                                        <a href="javascript:void(0)"  className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                            Tin tức <span className="caret"></span>
                                        </a>
                                        <ul className="dropdown-menu">
                                            {renderNewsAllMob}
                                        </ul>
                                    </li>
                                    <li className="dropdown">
                                        <a href="javascript:void(0)" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                            Trợ giúp <span className="caret"></span>
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li><a href="#" onClick={this.changeUrl.bind(this, '/tro-giup', { option: 'cau-hoi-thuong-gap' })}>Câu hỏi thường gặp</a></li>
                                            {/* <li><a href="#" onClick={this.changeUrl.bind(this, '/help', { option: 'huong-dan-su-dung' })}>Hướng dẫn sử dụng</a></li> */}
                                        </ul>
                                    </li>
                                    <li><a  href="javascript:void(0)" onClick={this.clickLink.bind(this, "/tuyen-dung")}>Tuyển dụng</a></li>
                                    <li className="dropdown">
                                        <a  href="javascript:void(0)" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                            Cam kết <span className="caret"></span>
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li><a href="#" onClick={this.changeUrl.bind(this, '/cam-ket', { option: 'cam-ket-cua-ly-duc' })}>Cam kết của Lý Đức</a></li>
                                            <li><a href="#" onClick={this.changeUrl.bind(this, '/cam-ket', { option: 'chinh-sach-bao-mat-thong-tin' })}>Chính sách bảo mật thông tin</a></li>
                                            <li><a href="#" onClick={this.changeUrl.bind(this, '/cam-ket', { option: 'dieu-khoan' })}>Điều khoản</a></li>
                                        </ul>
                                    </li>
                                    <li><a  href="javascript:void(0)" onClick={this.clickLink.bind(this, "/doi-tac")}>Đối tác</a></li>
                                    <li><a  href="javascript:void(0)" onClick={this.clickLink.bind(this, "/lien-he")}>Liên hệ</a></li>
                                    <li className="dropdown">
                                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                            <img src="/public/images/icon/user.png" alt="" /> <span className="caret"></span>
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li><a href="javascript:void(0)" onClick={this.clickLink.bind(this, "/dang-nhap")}>Đăng nhập khách hàng</a></li>
                                            <li><a href="javascript:void(0)" onClick={this.clickLink.bind(this, "/dang-ky-tho")}>Đăng ký thợ</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </Fragment>
        );
    }
}

export default withRouter(index);