import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'

class index extends Component {
    render() {
        return (

            <section className={this.props.location.pathname === '/profile' ? "header-main special" : "header-main"} >
                <nav className="navbar navbar-default">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <Link className="navbar-brand" to="/">
                                <img src="/public/images/logoweb.png" alt="" />
                            </Link>
                        </div>
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav">
                                <li className={this.props.location.pathname === '/about' ? 'active' : ''}><Link to="/about">GIỚI THIỆU</Link></li>
                                <li className={this.props.location.pathname === '/services' ? 'active' : ''}><Link to="/services">DỊCH VỤ</Link></li>
                                <li className={this.props.location.pathname === '/news' ? 'active' : ''}><Link to="/news">TIN TỨC</Link></li>
                                <li className={this.props.location.pathname === '/recruitment' ? 'active' : ''}><Link to="/recruitment">TUYỂN DỤNG</Link></li>
                                <li className={this.props.location.pathname === '/partner' ? 'active' : ''}><Link to="/partner">ĐỐI TÁC</Link></li>
                                <li className={this.props.location.pathname === '/contact' ? 'active' : ''}><Link to="/contact">LIÊN HỆ</Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </section>
        );
    }
}

export default withRouter(index);