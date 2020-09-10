import React, { Component } from 'react';

class NewsSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {

        return (
            <section className="news-slider img-banner">
                <img src="/public/images/newsbannerdes.png" alt="" />
                <div className="content">
                    <div className="text-center text-uppercase text-green font-RobotoCondensed-Bold font48 big-title">Tin tức</div>
                    <div className="text-center text-white font-Roboto-Medium font24 sub-title">Nhanh chóng - Hiệu quả - Tin cậy</div>
                </div>
            </section>
        );
    }
}

export default NewsSlider;