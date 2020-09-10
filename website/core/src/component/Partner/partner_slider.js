import React, { Component } from 'react';

class partner_slider extends Component {
    render() {
        return (
            <section className="partner-slider img-banner">
                <img src="/public/images/doitacdes.png" alt="" />
                <div className="content">
                    <div className="text-center text-uppercase font-RobotoCondensed-Bold font48 big-title">
                        <span className="text-green" style={{ margin: "5px" }}>Đối tác</span>
                        <span className="text-white" style={{ margin: "5px" }}>của chúng tôi</span>
                    </div>
                    <div className="text-center text-white font-Roboto-Medium font24 sub-title">Nhanh chóng - Hiệu quả - Tin cậy</div>
                </div>
            </section>

        );
    }
}

export default partner_slider;