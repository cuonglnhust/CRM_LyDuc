import React, { Component, Fragment } from 'react';
import Slider from 'react-slick'
import { request } from '../../request'
import { showErrorMessage } from '../../request/notification'
class home_step extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listStep: [],
        }
    }
    componentWillMount() {
        request.makeRequest("get", "/api/process/getAllProcessService")
            .then(result => {
                if (result.signal) {
                    this.setState({
                        listStep: result.data.allProcessService
                    })
                } else {
                    return showErrorMessage(result.message)
                }
            }).catch(err => {
                console.log(err)
            })

    }
    render() {
        let { listStep } = this.state
        let renderStep = listStep.map((item, idx) => {
            return (
                <div className="unit" data-number={item.step_number} data-text={item.name} key={`home_step_${idx}`}>
                    <div className="clearfix">

                        <div className="thumb">
                            <img src={item.image} alt="" />
                        </div>

                        <div className="info">

                            <div className="name">{item.name}</div>
                            <p className="des">{item.description}</p>

                            {/* <a href="#" className="text-white text-uppercase bg-red font-RobotoCondensed-Bold font24 action" data-toggle="modal" data-target="#modal-services">ĐẶT DỊCH VỤ NGAY</a> */}
                        </div>
                    </div>

                </div>
            )
        });
        let settings = {
            infinite: true,
            autoplay: true,
            arrows: true,
            dots: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            customPaging: function (i) {
                var text = listStep[i].name;
                var number = listStep[i].step_number;
                return (
                    <div className="fix_slider">
                        <div className="number">{number}</div>
                        <div className="text">{text}</div>
                    </div>
                )
            }
        };
        return (
            <Fragment>
                <section className="home-step">
                    <div className="text-center text-uppercase text-4f font-Roboto-Bold font48 big-title">QUY TRÌNH</div>
                    <div className="text-uppercase text-center text-green font24 sub-title">CỤ THỂ QUY TRÌNH ĐẶT DỊCH VỤ VÀ TRIỂN KHAI CÔNG VIỆC</div>
                    <div className="container">
                        <div className="home-step-slider">
                            <Slider {...settings}>
                                {renderStep}
                            </Slider>
                        </div>
                    </div>
                </section>
                <div className="modal fade" id="modal-services">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="top">
                                <div className="text-center text-uppercase font-RobotoCondensed-Bold font36 text-green big-title">Đặt dịch vụ</div>
                                <div className="text-center font-Roboto-Italic font16 text-82 sub-title">Quí ông bà nhập đầy đủ thông tin bên dưới để chúng tôi có thể phục vụ tốt nhất</div>
                            </div>
                            <div className="cont3nt">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <div className="lab-name">
                                                <img src="/public/images/icon/gridicons-menus.png" alt="" />
                                                <span className="text-4f font16">Dịch vụ</span>
                                            </div>
                                            <div>
                                                <div className="control-handjob">
                                                    <div className="form-control view"></div>
                                                    <div className="list-job">
                                                        <ul className="list-unstyled">
                                                            <li>
                                                                <label className="contain">
                                                                    <input type="checkbox" value="Xây dựng, " />
                                                                    <span className="checkmark"></span>
                                                                    <span className="text">Xây dựng</span>
                                                                </label>
                                                            </li>
                                                            <li>
                                                                <label className="contain">
                                                                    <input type="checkbox" value="Tháo dỡ, " />
                                                                    <span className="checkmark"></span>
                                                                    <span className="text">Tháo dỡ</span>
                                                                </label>
                                                            </li>
                                                            <li>
                                                                <label className="contain">
                                                                    <input type="checkbox" value="Vận chuyển, " />
                                                                    <span className="checkmark"></span>
                                                                    <span className="text">Vận chuyển</span>
                                                                </label>
                                                            </li>
                                                            <li>
                                                                <label className="contain">
                                                                    <input type="checkbox" value="Điện nước, " />
                                                                    <span className="checkmark"></span>
                                                                    <span className="text">Điện nước</span>
                                                                </label>
                                                            </li>
                                                            <li>
                                                                <label className="contain">
                                                                    <input type="checkbox" value="Điện dân dụng, " />
                                                                    <span className="checkmark"></span>
                                                                    <span className="text">Điện dân dụng</span>
                                                                </label>
                                                            </li>
                                                            <li>
                                                                <label className="contain">
                                                                    <input type="checkbox" value="Máy tính, " />
                                                                    <span className="checkmark"></span>
                                                                    <span className="text">Máy tính</span>
                                                                </label>
                                                            </li>
                                                            <li>
                                                                <label className="contain">
                                                                    <input type="checkbox" value="Kim loại, " />
                                                                    <span className="checkmark"></span>
                                                                    <span className="text">Kim loại</span>
                                                                </label>
                                                            </li>
                                                            <li>
                                                                <label className="contain">
                                                                    <input type="checkbox" value="Cá nhân, " />
                                                                    <span className="checkmark"></span>
                                                                    <span className="text">Cá nhân</span>
                                                                </label>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="row" id="modal-services-datepair">
                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <div className="lab-name">
                                                        <img src="/public/images/icon/ic-outline-date-range.png" alt="" />
                                                        <span className="text-4f font16">Ngày bắt đầu</span>
                                                    </div>
                                                    <div>
                                                        <input type="text" className="form-control date start" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <div className="lab-name">
                                                        <img src="/public/images/icon/ic-outline-date-range.png" alt="" />
                                                        <span className="text-4f font16">Ngày kết thúc</span>
                                                    </div>
                                                    <div>
                                                        <input type="text" className="form-control date end" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <div className="lab-name">
                                                <img src="/public/images/icon/ant-design_user-outline.png" alt="" />
                                                <span className="text-4f font16">Họ tên</span>
                                            </div>
                                            <div>
                                                <input type="text" className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <div className="lab-name">
                                                <img src="/public/images/icon/jam-phone.png" alt="" />
                                                <span className="text-4f font16">Điện thoại</span>
                                            </div>
                                            <div>
                                                <input type="text" className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="lab-name">
                                        <img src="/public/images/icon/bytesize-location.png" alt="" />
                                        <span className="text-4f font16">Địa chỉ</span>
                                    </div>
                                    <div>
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="lab-name">
                                        <img src="/public/images/icon/fa-regular_sticky-note.png" alt="" />
                                        <span className="text-4f font16">Ghi chú</span>
                                    </div>
                                    <div>
                                        <textarea name="" id="" cols="30" rows="3" className="form-control"></textarea>
                                    </div>
                                </div>
                                <div className="form-group text-center">
                                    <a href="#" className="text-uppercase text-white bg-green font-Roboto-Medium font18 action-ddv">Đặt dịch vụ</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default home_step;