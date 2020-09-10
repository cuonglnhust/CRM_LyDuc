import React, { Component, Fragment } from 'react';

class services_slider extends Component {
    render() {
        return (
            <Fragment>
                <section className="services-slider img-banner">
                    <img src="/public/images/servicesDek.png" alt="" />
                    {/* <div className="content">
                        <div className="text-center text-uppercase font-RobotoCondensed-Bold font48 big-title">
                            <span className="text-green" style={{marginRight: 10}}>Dịch vụ</span>
                            <span className="text-white">của chúng tôi</span>
                        </div>
                        <div className="text-center text-white font-Roboto-Medium font24 sub-title">Nhanh chóng - Hiệu quả - Tin cậy</div>
                    </div> */}
                </section>
                <section className="services-call-to-action" style={{position:"relative",zIndex:9}}>
                    <ul className="list-inline text-white">
                        <li className="clearfix left">
                            <div className="icon">
                                <img src="/public/images/icon/wpf-phone.png" alt="" />
                            </div>
                            <div className="info">
                                <div className="font-RobotoCondensed-Regular font18 top">Hotline</div>
                                <div className="font-RobotoCondensed-Bold font30">0332962626</div>
                            </div>
                        </li>
                        <li className="clearfix">
                            <div className="icon">
                                <img src="/public/images/icon/wpf-email.png" alt="" />
                            </div>
                            <div className="info">
                                <div className="font-RobotoCondensed-Regular font18 top">Email</div>
                                <div className="font-RobotoCondensed-Bold font30">laodonglyduc@gmail.com</div>
                            </div>
                        </li>
                    </ul>
                </section>
            </Fragment>
        );
    }
}

export default services_slider;