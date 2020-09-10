import React, { Component} from 'react';
import Slider from 'react-slick'
import {request} from '../../request'
import {showErrorMessage} from '../../request/notification'

class landing_step extends Component {
    constructor (props) {
        super(props);
        this.state = {
            listStep:[]
            
        }
    }
    componentWillMount() {
        request.makeRequest("get", "/api/process/getAllProcessWorker")
            .then(result => {
                if (result.signal) {
                    this.setState({
                        listStep:result.data.allProcessWorker
                    })
                } else {
                    return showErrorMessage(result.message)
                }
            }).catch(err => {
                console.log(err)
            })

    }
    scrollWin = () => {
        let pos = $("#landing_money").position()
        window.scrollTo(0, pos ? pos.top : 0);
    }
    render() {
        let {listStep} =this.state
        let renderStep= listStep.map((item, idx)=>{
            return(
                <div className="unit" data-number={item.step_number} data-text={item.name} key={`landing_step_${idx}`}>
                    <div className="number">{item.step_number}</div>
                    <div className="clearfix">
                        <img src={item.image} alt=""/>
                    </div>
                    <div className="info">
                        <div className="name">{item.name}</div>
                        <p className="des">{item.description}</p>
                    </div>
                </div>
            )
        })
        let settings = {
            infinite: true,
            autoplay:true,
            arrows: true,
            dots: true,
            dotsclassName: "slick-dots slick-thumb",
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            focusOnSelect: true,
            customPaging: function (i) {
                var text = listStep[i].name;
                var number = listStep[i].step_number;
                return (
                    <div>
                        <div className="number">{number}</div>
                        <div className="text">{text}</div>
                    </div>
                )
            }
        };
        return (
            <section className="landing-step">
                <div className="text-center text-uppercase text-4f font-RobotoCondensed-Bold font48 big-title">
                    <span className="text-4f" style={{margin:5}}>Đăng ký</span>
                    <span className="text-green" style={{margin:5}}>như thế nào?</span>
                </div>
                <div className="text-uppercase text-center text-4f font-Roboto-Medium font24 sub-title">Chỉ 5 bước để gia nhập đội ngũ lao động Lý Đức</div>
                <div className="container">
                    <div className="landing-step-slider">
                        <Slider {...settings}>
                            {renderStep}
                        </Slider>
                    </div>
                    <div className="text-center">
                        <button className="text-uppercase text-white bg-green btn-register" onClick={this.scrollWin}>Đăng ký ngay</button>
                    </div>
                </div>
            </section>
        );
    }
}

export default landing_step;