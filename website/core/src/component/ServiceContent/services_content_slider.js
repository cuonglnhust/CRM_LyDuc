import React, { Component, Fragment } from 'react';

class services_content_slider extends Component {
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
            </Fragment>
        );
    }
}

export default services_content_slider;