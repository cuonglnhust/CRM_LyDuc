import React, { Component } from 'react';
import 'react-datepicker/dist/react-datepicker.css'
import 'react-datepicker/dist/react-datepicker-cssmodules.css'
import DateInput from './DateInput';
import { request } from '../../libs';
import { validateMobile } from '../../../../../core/server/libs/common/validate'
class FormOderSub extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            mobiles: '',
            address: '',
            note: '',
            listServices: [],
            service_select: [],
            start_time: new Date(),
            end_time: new Date(),
            isClose: false
        }
    }
    onChangeInputSelect = (id, e) => {
        let str = '';
        let { service_select, listServices } = this.state;
        let checked = e.target.checked;
        if (checked) {
            if (service_select.indexOf(id) == -1) {
                service_select.push(id)
                this.setState({
                    service_select
                })
            }
        } else {
            if (service_select.indexOf(id) > -1) {
                service_select = service_select.filter(it => it != id)
                this.setState({
                    service_select
                })
            }
        }
        if (service_select.length) {
            service_select.map((it, idx) => {
                let text = listServices.filter(item => item.value == it)
                text = text.length ? text[0].label : ''
                if (idx == 0) {
                    str += text
                } else {
                    str += ' ' + text
                }
            })
        } else {
            str = "Chọn dịch vụ"
        }
        $('.control-handjob .view').text(str);
    }
    componentDidMount() {
        let str = '';
        $('.control-handjob .view').click(function (event) {
            $(this).siblings('.list-job').addClass('active');
        });
        $(document).mousedown(function (e) {
            var container = $(".control-handjob .list-job");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                container.removeClass('active');
            }
        });
        let { services_category_id } = this.props;
        if (services_category_id) {
            this.getListServices(services_category_id);
        }
    }

    componentWillReceiveProps(nextProps, nextState) {
        if (nextProps.services_category_id && nextProps.services_category_id != this.props.services_category_id) {
            this.getListServices(nextProps.services_category_id)
        }
    }
    getListServices(services_category_id) {
        request.makeRequest("get", "/api/services/getServicesCategoryById", { id:services_category_id })
            .then(result => {
                if (result.signal) {
                    let listServices = result.data.services_sub
                    this.setState({
                        listServices
                    })
                } else {
                    return showErrorMessage(result.message)
                }
            }).catch(err => {
                console.log(err)
            })
    }
    onChangeInput = (e) => {
        // e.preventDefault();
        let key = e.target.name;
        let value = e.target.value;
        this.setState({
            [key]: value
        })
    }
    onChangeInputNumber = (e) => {
        e.preventDefault();

        let key = e.target.name;
        let value = e.target.value;
        let oldValue = this.state[key]
        value = value || ''
        let checkIpn = value.replace('+', '')
        if (isNaN(checkIpn)) {
            value = oldValue
        }
        this.setState({
            [key]: value
        })
    }
    changeDate = (value, key) => {
        this.setState({
            [key]: value
        })
    }

    onSubmit = () => {
        let { id_key } = this.props;
        let { name, mobiles, note, address, start_time, end_time, service_select } = this.state
        if (!name || !mobiles || !start_time || !address || !end_time ) {
            return alert('Vui lòng nhập đầy đủ thông tin!')
        }
        if (name && !name.trim().length) {
            return alert('Vui lòng nhập đầy đủ thông tin họ tên!')
        }
        if (address && !address.trim().length) {
            return alert('Vui lòng nhập đầy đủ thông tin địa chỉ!')
        }
        if (mobiles && !validateMobile(mobiles)) {
            return alert('Vui lòng nhập số điện thoại đúng định dạng!')
        }
        if (start_time && end_time) {
            let start_time1 = new Date(start_time)
            start_time1.setHours(0);
            start_time1.setSeconds(0);
            start_time1.setMinutes(0);
            start_time1.setMilliseconds(0);
            let end_time1 = new Date(end_time)
            end_time1.setHours(0);
            end_time1.setSeconds(0) ;
            end_time1.setMinutes(0);
            end_time1.setMilliseconds(0);
            let date = new Date()
            date.setHours(0);
            date.setSeconds(0);
            date.setMinutes(0);
            date.setMilliseconds(0);
            if (start_time1.getTime() < date.getTime()) {
                return alert('Vui lòng chọn thời gian bắt đầu lớn hơn hoặc bằng thời gian hiện tại!')
            }
            if (end_time1.getTime() < start_time1.getTime()) {
                return alert('Vui lòng chọn thời gian kết thúc lớn hơn hoặc bằng thời gian bắt đầu!')
            }
        }
        if ( !service_select.length) {
            return alert('Vui lòng cung cấp dịch vụ cần tạo hợp đồng!')
        }
        request.makeRequest('post', 'https://cms.laodonglyduc.com/api/apiWeb/customer/creatRequestCustomer', {
            service_select, start_time, end_time, name, mobiles, address, note
        })
            .then(result => {
                if (result.code == 200) {
                    alert("Cảm ơn quý khách đã tin tưởng đặt dịch vụ của chúng tôi!");

                    $(`#${id_key}`).modal('hide')
                    $('.control-handjob .view').text('Chọn dịch vụ');

                    this.setState({
                        name: '',
                        mobiles: '',
                        address: '',
                        note: '',
                        service_select: [],
                        start_time: new Date(),
                        end_time: new Date(),
                        isClose:true
                    })

                }
                else {

                }
            })
            .catch(err => {
                showErrorMessage(err)
            })
    }
    onRestart = () => {
        this.setState({
            name: '',
            mobiles: '',
            address: '',
            note: '',
            service_select: [],
            start_time: new Date(),
            end_time: new Date(),
            isClose : true
        })
        $('.control-handjob .view').text('Chọn dịch vụ');
    }

    render() {
        let { id_key } = this.props;
        id_key = id_key || 'modal-services'
        let { listServices, service_select } = this.state
        let renderListServices = listServices ? listServices.map((item, index) => {
            let checked = service_select.indexOf(item.value) > -1 ? true : false
            return (
                <li key={index}>
                    <label className="contain">
                        <input type="checkbox" value={item.label} checked={checked} onClick={this.onChangeInputSelect.bind(this, item.value)} />
                        <span className="checkmark"></span>
                        <span className="text">{item.label}</span>
                    </label>
                </li>
            )
        }) : "không có dịch vụ liên quan nào"
        return (
            <div className="modal fade top" id={id_key}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <button type="button" className="close" data-dismiss="modal" onClick={this.onRestart}>&times;</button>
                        <div className="top">
                            <div className="text-center text-uppercase font-RobotoCondensed-Bold font36 text-green big-title">Đặt dịch vụ</div>
                            <div className="text-center font-Roboto-Italic font16 text-82 sub-title">Quý ông bà nhập đầy đủ thông tin bên dưới để chúng tôi có thể phục vụ tốt nhất</div>
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
                                                <div className="form-control view">
                                                    Chọn dịch vụ
                                                </div>
                                                <div className="list-job">
                                                    <ul className="list-unstyled">
                                                        {renderListServices}
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
                                                    {/* <input type="date" name="start_time" className="form-control" onChange={this.onChangeInput} value={this.state.start_time} /> */}
                                                    <DateInput className="form-control" timeInput={this.state.start_time} value={this.state.start_time} name="start_time" changeDate={this.changeDate} />
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
                                                    {/* <input type="date" name="end_time" className="form-control" onChange={this.onChangeInput} value={this.state.end_time} /> */}
                                                    <DateInput className="form-control" timeInput={this.state.end_time} value={this.state.end_time} name="end_time" changeDate={this.changeDate} />
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
                                            <input type="text" name="name" className="form-control" placeholder="Nguyễn Văn A" value={this.state.name} onChange={this.onChangeInput} />
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
                                            <input type="text" name="mobiles" className="form-control" placeholder="0912345678" value={this.state.mobiles} onChange={this.onChangeInputNumber} />
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
                                    <input type="text" name="address" className="form-control" placeholder="Số nhà 00 - Tên Đường - Tên Quận Huyện - Thành Phố" value={this.state.address} onChange={this.onChangeInput} />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="lab-name">
                                    <img src="/public/images/icon/fa-regular_sticky-note.png" alt="" />
                                    <span className="text-4f font16">Ghi chú</span>
                                </div>
                                <div>
                                    <textarea name="" id="" cols="30" rows="4" className="form-control" placeholder="Ghi chú công việc" name="note" value={this.state.note} onChange={this.onChangeInput}></textarea>
                                </div>
                            </div>
                            <div className="form-group text-center">
                                <button className="text-uppercase text-white bg-green font-Roboto-Medium font18 action-ddv" onClick={this.onSubmit}>Đặt dịch vụ</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FormOderSub;