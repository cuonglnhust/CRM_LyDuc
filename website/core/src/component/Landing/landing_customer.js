import React, { Component } from 'react';
import Slider from 'react-slick'
import { withRouter } from 'react-router-dom'
import { request } from '../../request'
import { showErrorMessage } from '../../request/notification'

class landing_customer extends Component {
    constructor(props){
        super(props);
        this.state={
            listWorker:[]
        }
    }
    componentWillMount() {
        this.getEmployeeLight();
    }

    getEmployeeLight() {
        request.makeRequest("get", "https://cms.laodonglyduc.com/api/apiWeb/data/getEmployeeLight")
            .then(result => {
                if (result.code==200) {
                    this.setState({
                        listWorker: result.data
                    })
                } else {
                    return showErrorMessage(result.message)
                }
            }).catch(err => {
                console.log(err)
            })
    }
    render() {
        let {listWorker} = this.state
        let renderCustomer = listWorker.map((item,idx)=>{
            let star = parseInt(item.star)
            return(
                <div className="unit" key ={`landing_customer_${idx}`}>
                    <div className="avatar">
                        <img src={item.avatar? item.avatar:"/public/images/tramanh.png"} alt=""/>
                    </div>
                    <div className="name text-green text-uppercase">{item.name}</div>
                    <div className="job">{item.employee_service[0].sevice_id}</div>
                    <div className="stars">
                        <div className="ss" style={{width : star*42}}>&nbsp;</div>
                    </div>
                    <p className="des">{item.des ? item.des :"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"}</p>
                </div>
            )
        })
        let settings = {
            arrows: true,
            dots: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            customPaging: function (i) {
                var img = listWorker[i].avatar?listWorker[i].avatar:"/public/images/tramanh.png";
                return (
                    <div className="img" role="button">
                        <img src={img} alt="" />
                    </div>
                )
            }
        };
        return (
            <section className="landing-customer">
        <div className="text-center text-uppercase big-title">
            <span className="text-4f" style={{margin:5}}>Gương mặt</span>
            <span className="text-green" style={{margin:5}}>Tiêu biểu</span>
        </div>
        <div className="text-center text-4f sub-title">Danh sách thợ có thành tích và được đánh giá cao tại Lý Đức</div>
        <div className="container">
            <div className="landing-customer-slider">
                        <Slider {...settings}>
                            {renderCustomer}
                        </Slider>
            </div>
        </div>
    </section>
        );
    }
}

export default withRouter(landing_customer);