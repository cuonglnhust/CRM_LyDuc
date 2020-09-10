import React, { Component } from 'react';

class help_slider extends Component {
    render() {
        return (
            <section className="help-slider img-banner">
                <img src="/public/images/helpDes.png" alt="" />
                <div className="content">
                    <div className="text-center text-uppercase text-white font-RobotoCondensed-Bold font48 big-title title-help">Trung tâm trợ giúp</div>
                    <div className="text-center text-white font-Roboto-Medium font24 sub-title">Những câu hỏi thường gặp phải</div>
                </div>
            </section>
        );
    }
}

export default help_slider;