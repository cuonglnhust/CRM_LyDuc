import React, { Component } from 'react';

class RecruitmentSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
        
        }
    }
    render() {
       
        return (
            <section className="recruitment-slider img-banner">
                <img src="/public/images/tuyendungdes.png" alt="" />
                <div className="content">
                    <div className="text-center text-uppercase text-green font-RobotoCondensed-Bold font48 big-title">Tuyển dụng Lý Đức</div>
                    <div className="text-center text-white font-Roboto-Medium font24 sub-title" style={{color: "#26c56a"}}>Nhanh chóng - Hiệu quả - Tin cậy</div>
                </div>
            </section>
        );
    }
}

export default RecruitmentSlider;