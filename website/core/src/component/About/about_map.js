import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { request } from '../../request'
import { showErrorMessage } from '../../request/notification'
class about_map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            phone: '',
            hotline: '',
            email: '',
            mobile:''
        }
    }
    componentWillMount() {
        request.makeRequest("get", "/api/about/getAbout")
            .then(result => {
                if (result.signal) {
                    let listAbout = result.data;
                    this.setState({
                        address: listAbout.address,
                        phone: listAbout.phone,
                        hotline: listAbout.hotline,
                        email: listAbout.email,
                        mobile:listAbout.mobile
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
            <Fragment>
                <section class="about-map">
                    <div class="mask mob">
                        <div class="container">
                            <div class="text-white control">
                                <h3>Thông tin liên hệ</h3>
                                <ul class="list-unstyled">
                                    <li class="clearfix">
                                        <div class="icon">
                                            <span class="fa fa-map-marker"></span>
                                        </div>
                                        <div class="info">
                                            <div class="name">Địa chỉ</div>
                                            <p><div dangerouslySetInnerHTML={{ __html: this.state.address }}/></p>
                                        </div>
                                    </li>
                                    <li class="clearfix phone">
                                        <div class="icon">
                                            <span class="fa fa-phone"></span>
                                        </div>
                                        <div class="info">
                                            <div class="name">Tổng đài</div>
                                            <p>{this.state.hotline}</p>
                                        </div>
                                    </li>
                                    <li class="clearfix mobile">
                                        <div class="icon">
                                            <span class="fa fa-mobile"></span>
                                        </div>
                                        <div class="info">
                                            <div class="name">Di động</div>
                                            <p>{this.state.phone}</p>
                                        </div>
                                    </li>
                                    <li class="clearfix">
                                        <div class="icon">
                                            <span class="fa fa-envelope"></span>
                                        </div>
                                        <div class="info">
                                            <div class="name">Hòm thư</div>
                                            <p>{this.state.email}</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="google-map">
                        <iframe title='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.253989846669!2d105.83349861437816!3d21.022520893368455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab9b7aa39e7d%3A0x6d0f69c561bafd67!2sHOTEL+K15!5e0!3m2!1sen!2s!4v1566528439731!5m2!1sen!2s" width="100%" height={670} frameBorder={0} style={{ border: 0 }} allowFullScreen />
                    </div>
                    <div class="mask desk">
                        <div class="container">
                            <div class="text-white control">
                                <h3>Thông tin liên hệ</h3>
                                <ul class="list-unstyled">
                                    <li class="clearfix">
                                        <div class="icon">
                                            <span class="fa fa-map-marker"></span>
                                        </div>
                                        <div class="info">
                                            <div class="name">Địa chỉ</div>
                                            <p><div dangerouslySetInnerHTML={{ __html: this.state.address }}/></p>
                                        </div>
                                    </li>
                                    <li class="clearfix phone">
                                        <div class="icon">
                                            <span class="fa fa-phone"></span>
                                        </div>
                                        <div class="info">
                                            <div class="name">Tổng đài</div>
                                            <p>{this.state.hotline}</p>
                                        </div>
                                    </li>
                                    <li class="clearfix mobile">
                                        <div class="icon">
                                            <span class="fa fa-mobile"></span>
                                        </div>
                                        <div class="info">
                                            <div class="name">Di động</div>
                                            <p>{this.state.mobile}</p>
                                        </div>
                                    </li>
                                    <li class="clearfix">
                                        <div class="icon">
                                            <span class="fa fa-envelope"></span>
                                        </div>
                                        <div class="info">
                                            <div class="name">Hòm thư</div>
                                            <p>{this.state.email}</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <section className="about-map">
                    <div className="google-map">
                    <iframe title='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.253989846669!2d105.83349861437816!3d21.022520893368455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab9b7aa39e7d%3A0x6d0f69c561bafd67!2sHOTEL+K15!5e0!3m2!1sen!2s!4v1566528439731!5m2!1sen!2s" width="100%" height={670} frameBorder={0} style={{ border: 0 }} allowFullScreen/>
                    </div>
                    <div className="mask">
                        <div className="container">
                            <div className="text-white control">
                                <h3>Thông tin liên hệ</h3>
                                <ul className="list-unstyled">
                                    <li className="clearfix">
                                        <div className="icon">
                                            <span className="fa fa-map-marker"></span>
                                        </div>
                                        <div className="info">
                                            <div className="name">Địa chỉ</div>
                                            <p>{this.state.address}</p>
                                        </div>
                                    </li>
                                    <li className="clearfix phone">
                                        <div className="icon">
                                            <span className="fa fa-phone"></span>
                                        </div>
                                        <div className="info">
                                            <div className="name">Tổng đài</div>
                                            <p>{this.state.hotline}</p>
                                        </div>
                                    </li>
                                    <li className="clearfix mobile">
                                        <div className="icon">
                                            <span className="fa fa-mobile"></span>
                                        </div>
                                        <div className="info">
                                            <div className="name">Di động</div>
                                            <p>{this.state.phone}</p>
                                        </div>
                                    </li>
                                    <li className="clearfix">
                                        <div className="icon">
                                            <span className="fa fa-envelope"></span>
                                        </div>
                                        <div className="info">
                                            <div className="name">Hòm thư</div>
                                            <p>{this.state.email}</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section> */}
            </Fragment>
        );
    }
}

export default withRouter(about_map);