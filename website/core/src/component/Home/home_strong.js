import React, { Component } from 'react';
import { request } from '../../request'
import { showErrorMessage } from '../../request/notification'
import Slider from 'react-slick'
class home_strong extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listStrengths: [],
        }
    }
    componentWillMount() {
        this.getListStrengths()
    }
    getListStrengths() {
        request.makeRequest("get", "/api/strengths/getStrengthsByCo")
            .then(result => {
                if (result.signal) {
                    this.setState({
                        listStrengths: result.data
                    })
                } else {
                    return showErrorMessage(result.message)
                }
            }).catch(err => {
                console.log(err)
            })
    }
    render() {
        let { listStrengths } = this.state
        let renderStrongDes = listStrengths.map((item, index) => {
            return (
                <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3" key={`home_strong_${index}`}>
                    <div className="unit">
                        <div className="thumb">
                            <img src={item.image} alt="" />
                        </div>
                        <div className="font-Roboto-Medium font24 name">{item.title}</div>
                        <p className="font16 des">{item.plain_text}</p>
                    </div>
                </div>
            )
        })

        let renderStrongMob = listStrengths.map((it, idx) => {
            return (
                <div key={`home_strongmob_${idx}`}>
                    <div className="unit">
                        <div className="thumb">
                            <img src={it.image} alt="" />
                        </div>
                        <div className="font-Roboto-Medium font24 name">{it.title}</div>
                        <p className="font16 des">{it.plain_text}</p>
                    </div>
                </div>
            )
        })
        let settingsDes = {
            arrows: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true
        };
        return (
            <section className="home-strong">
                <div className="text-center text-uppercase text-4f font48 font-Roboto-Bold big-title">Nghiệp đoàn lao động Lý Đức</div>
                <div className="text-center text-uppercase text-green font24 font-Roboto-Medium sub-title">Điểm khác biệt của Lý Đức</div>
                <div className="desktop">
                    <div className="container">
                        <div className="row">
                            {renderStrongDes}
                        </div>
                    </div>
                </div>
                <div className="mobile">
                    <div className="home-strong-slider">
                        <Slider {...settingsDes}>
                            {renderStrongMob}
                        </Slider>

                    </div>
                </div>
            </section>
        );
    }
}

export default home_strong;