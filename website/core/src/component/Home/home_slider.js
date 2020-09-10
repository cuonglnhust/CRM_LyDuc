import React, { Component, Fragment } from 'react';
import Slider from 'react-slick'
import { request } from '../../request'
import { showErrorMessage } from '../../request/notification'
class home_slider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listBannerDes: [],
            listBannerMob: [],
        }
    }
    componentWillMount() {
        this.getListBannerDes()
        this.getListBannerMob()
    }
    getListBannerDes() {
        request.makeRequest("get", "/api/banner/getListBannerDes")
            .then(result => {
                if (result.signal) {
                    this.setState({
                        listBannerDes: result.data
                    })
                } else {
                    return showErrorMessage(result.message)
                }
            }).catch(err => {
                console.log(err)
            })
    }
    getListBannerMob() {
        request.makeRequest("get", "/api/banner/getListBannerMob")
            .then(result => {
                if (result.signal) {
                    this.setState({
                        listBannerMob: result.data
                    })
                } else {
                    return showErrorMessage(result.message)
                }
            }).catch(err => {
                console.log(err)
            })
    }
    render() {
        let { listBannerDes, listBannerMob } = this.state;
        let renderSliderDes = listBannerDes.map((it, idx) => {
            return (
                <div key={`home_slider_des_${idx}`}>
                    <img src={it.image} alt="" className="center-block" />
                </div>
            )
        })

        let renderSliderMob = listBannerMob.map((it, index) => {
            return (
                <div key={`home_slider_mob_${index}`}>
                    <img src={it.image} alt="" className="img-responsive" />
                </div>
            )
        })
        let settingsDes = {
            autoplay: true,
            autoplaySpeed: 5000,
            speed: 500,
            pauseOnHover: false,
            lazyLoad: 'progressive',
            arrows: false,
            dots: true,
        };

        let settingsMob = {
            autoplay: true,
            arrows: false,
            dots: true,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return (
            <Fragment>
                <section className="home-slider-desktop">
                    <div className="home-slider-desk">
                        <Slider {...settingsDes}>
                            {renderSliderDes}
                        </Slider>
                    </div>
                </section>

                <section className="home-slider-mobile">
                    <div className="home-slider-mob">
                        <Slider {...settingsMob}>
                            {renderSliderMob}
                        </Slider>
                    </div>
                </section>
            </Fragment>
        );
    }
}

export default home_slider;