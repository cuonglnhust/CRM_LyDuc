import React, { Component } from 'react';

class about_slider extends Component {
    render() {
        return (
            <section className="about-slider img-banner">
                <img src="/public/images/bg-about.png" alt=""/>
                <div className="content">
                    <div className="text-center text-white font-Roboto-Bold font36 big-title">Chúng tôi là</div>
                    <div className="text-center text-uppercase text-green font-Roboto-Medium font64 sub-title">Nghiệp đoàn lao động Lý Đức</div>
                </div>
            </section>
        );
    }
}

export default about_slider;