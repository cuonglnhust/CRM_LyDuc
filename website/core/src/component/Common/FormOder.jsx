import React, { Component } from 'react';
import 'react-datepicker/dist/react-datepicker.css'
import 'react-datepicker/dist/react-datepicker-cssmodules.css'
import DateInput from './DateInput';
import { request } from '../../libs';
import { validateMobile} from '../../../../../core/server/libs/common/validate'
class FormOder extends Component {
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
            end_time: new Date()
        }
    }
    onChangeInputSelect = (id, e) => {
        // e.preventDefault()
        let { service_select } = this.state;
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
    }
    componentDidMount() {
        let str = '';
        $('.control-handjob .view').click(function (event) {
            $(this).siblings('.list-job').addClass('active');
        });
        $(document).mouseup(function (e) {
            var container = $(".control-handjob .list-job");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                container.removeClass('active');
            }
        });
        $(document).on('click', '.control-handjob .list-job .contain input', function (e) {
            const value = $(this).val();
            if ($(this).prop('checked')) {
                str += ' ' + value;
                str = str.trim()
            } else {
                str = str.replace(value, '');
                str = str.trim()
            }
            $('.control-handjob .view').text(str);
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
        request.makeRequest("get", "/api/services/getListServices", { services_category_id })
            .then(result => {
                if (result.signal) {
                    let listServices = result.data.listServices
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
        e.preventDefault();
        let key = e.target.name;
        let value = e.target.value;
        this.setState({
            [key]: value
        })
    }

    changeDate = (value, key) => {
        let time = value.format('YYYY-MM-DD')
        this.setState({
            [key]: time
        })
    }

    onSubmit = () => {
        let { name, mobiles, note, address, start_time, end_time, service_select } = this.state
        if (!name || !mobiles || !start_time || !address || !end_time || !service_select) {
            alert('Vui lòng nhập đầy đủ thông tin!')
        }
        if (name && !name.trim().length) {
            return alert('Vui lòng nhập đầy đủ thông tin họ và tên!')
        }
        if (address && !address.trim().length) {
            return alert('Vui lòng nhập đầy đủ thông tin địa chỉ!')
        }
        if (!validateMobile(mobile)) {
            return alert('Vui lòng nhập số điện thoại đúng định dạng!')
        }
        request.makeRequest('post', 'https://cms.laodonglyduc.com/api/apiWeb/customer/creatRequestCustomer', {
            service_select, start_time, end_time, name, mobiles, address, note
        })
            .then(result => {
                if (result.code == 200) {
                    alert("Cảm ơn quý khách đã tin tưởng đặt dịch vụ của chúng tôi!");
                    $('#modal-services').modal('hide')
                }
            })
            .catch(err => {
                showErrorMessage(err)
            })
    }

    onRestart = () =>{
        this.setState({
            name: '',
            mobiles: '',
            address: '',
            note: '',
            service_select: [],
            start_time: new Date(),
            end_time: new Date()
        
        })
        $('.control-handjob .view').text(str);
    }

    render() {
        let { listServices, service_select } = this.state
        let renderListServices = listServices.map((item, index) => {
            let checked = service_select.indexOf(item.service_id) > -1 ? true : false
            return (
                <li key={index}>
                    <label className="contain">
                        <input type="checkbox" value={item.name} checked={checked} onClick={this.onChangeInputSelect.bind(this, item.service_id)} />
                        <span className="checkmark"></span>
                        <span className="text">{item.name}</span>
                    </label>
                </li>
            )
        })
        return (
            <div className="modal fade" id="modal-services">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <button type="button" class="close" data-dismiss="modal" onClick={this.onRestart} >&times;</button>
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
                                                <div className=" view">Chọn dịch vụ</div>
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
                                                    <DateInput className="form-control" timeInput={this.state.start_time} name="start_time" changeDate={this.changeDate} />
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
                                                    <DateInput className="form-control" timeInput={this.state.end_time} name="end_time" changeDate={this.changeDate} />
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
                                            <input type="text" name="name" className="form-control" placeholder="Nguyễn Văn A" onChange={this.onChangeInput} />
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
                                            <input type="tel" name="mobiles" className="form-control" placeholder="0912345678" onChange={this.onChangeInput} />
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
                                    <input type="text" name="address" className="form-control" placeholder="Số nhà 00 - Tên Đường - Tên Quận Huyện - Thành Phố" onChange={this.onChangeInput} />
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

export default FormOder;