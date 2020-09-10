import React, { Component } from 'react';

class contact_slider extends Component {
    render() {
        return (
            <section className="contact-slider img-banner">
                <img src="/public/images/contactdes.png" alt="" />
                <div className="content">
                    <div className="text-center text-uppercase text-white font-RobotoCondensed-Bold font48 big-title">
                        <span className="text-green" style={{ margin: "5px" }}>Liên hệ</span>
                        <span className="text-green" style={{ margin: "5px" }}>với chúng tôi</span>
                    </div>
                    <div className="text-center text-green font-Roboto-Medium font24 sub-title">Để lại lời nhắn góp ý, đề xuất để Lý Đức trở nên tốt hơn</div>
                </div>
            </section>
        );
    }
}

export default contact_slider;