import React, { Component, Fragment } from 'react';
import $ from 'jquery';
import DateInput from '../Common/DateInput'
import { request } from '../../libs'
import { showErrorMessage, showSuccessMessage } from '../../libs/notification';
// import validatePhoneNumber from 'validate-phone-number-node-js';
import { validateMobile, validatePassword } from '../../../../../core/server/libs/common/validate'
class landing_money extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            phone: '',
            birthday: new Date(),
            address: '',
            type: "2",
            work_manship: [],
            workManShip: [],
            address_c: '',
            hotline: '',
            email: '',
            mobile: ''
        }
    }

    onChangeInputSelect = (id, e) => {
        // e.preventDefault()
        let { work_manship } = this.state;
        let checked = e.target.checked;
        if (checked) {
            if (work_manship.indexOf(id) == -1) {
                work_manship.push(id)
                this.setState({
                    work_manship
                })
            }
        } else {
            if (work_manship.indexOf(id) > -1) {
                work_manship = work_manship.filter(it => it != id)
                this.setState({
                    work_manship
                })
            }
        }
    }

    onChangeInput = (e) => {
        e.preventDefault();
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
        let { name, phone, birthday, address, type, work_manship } = this.state
        if (!name || !phone || !birthday || !address || !type || !work_manship.length) {
            return alert('Vui lòng nhập đầy đủ thông tin!')
        }
        if (name && !name.trim().length) {
            return alert('Vui lòng nhập đầy đủ thông tin họ và tên!')
        }
        if (address && !address.trim().length) {
            return alert('Vui lòng nhập đầy đủ thông tin địa chỉ!')
        }
        if (!validateMobile(phone)) {
            return alert('Vui lòng nhập số điện thoại đúng định dạng!')
        }
        if (birthday) {
            let birthday1 = new Date(birthday)
            let year_birth = birthday1.getFullYear()
            let now = new Date()
            let year_now = now.getFullYear()
            if ((year_now - year_birth) < 15) {
                return alert('Bạn cần trên 15 tuổi để có thể đăng ký thợ !')
            }
        }
        request.makeRequest('post', 'https://cms.laodonglyduc.com/api/apiWeb/employee/creatEmployeeWeb', {
            name, phone, birthday, address, type, work_manship
        })
            .then(result => {
                if (result.code == 200) {
                    alert("Đăng kí thông tin tài khoản thành công!");
                    this.setState({
                        name: '',
                        phone: '',
                        birthday: new Date(),
                        address: '',
                        type: "2",
                        work_manship: [],
                    })
                    $('.control-handjob .view').text("Chọn tay nghề")
                }
                else {
                    alert(result.message)
                }
            })
            .catch(err => {
                showErrorMessage(err)
            })
    }


    componentDidMount() {
        let str = ``;
        $('.control-handjob .view').click(function (event) {
            $(this).siblings('.list-job').addClass('active');
        });
        $(document).mousedown(function (e) {
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

        this.getWorkManShip()
        this.getAbout()
    }

    getAbout = () => {
        request.makeRequest("get", "/api/about/getAbout")
            .then(result => {
                if (result.signal) {
                    let listAbout = result.data;
                    this.setState({
                        address_c: listAbout.address,
                        hotline: listAbout.hotline,
                        email: listAbout.email,
                        mobile: listAbout.mobile
                    })
                } else {
                    return showErrorMessage(result.message)
                }
            }).catch(err => {
                console.log(err)
            })
    }

    getWorkManShip = () => {
        request.makeRequest('get', 'https://cms.laodonglyduc.com/api/apiWeb/employee/workManship')
            .then(result => {
                if (result.code == 200) {
                    this.setState({
                        workManShip: result.data
                    })
                } else {
                    showErrorMessage(result.message)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }


    render() {
        let { workManShip, work_manship, address_c, mobile, hotline, email, name } = this.state;
        let renderWorkManShip = workManShip.map((item, index) => {
            let checked = work_manship.indexOf(item.id) > -1 ? true : false
            return (
                <li key={index} className="col-md-12">
                    <label className="contain">
                        <input type="checkbox" value={item.name} checked={checked} onClick={this.onChangeInputSelect.bind(this, item.id)} />
                        <span className="checkmark"></span>
                        <span className="text">{item.name}</span>
                    </label>
                </li>
            )
        })
        return (
            <Fragment>
                <section className="landing-money" id="landing_money">
                    <div className="container">
                        <div className="text-center text-uppercase font-Roboto-Bold font48 big-title">

                            <span className="text-green" style={{ marginRight: 5 }}>Kiếm tiền</span>

                            <span className="text-white">Nhiều hơn</span>
                        </div>
                        <div className="text-center text-white font24 sub-title">Nghiệp đoàn lao động Lý Đức</div>
                        <div className="tttk clearfix">
                            <div className="left f-buong">
                                <div className="big-name text-grey">Thông tin tài khoản</div>
                                <div className="form-group">
                                    <div className="name">Họ tên</div>
                                    <input type="text" name="name" className="form-control" placeholder="Nguyễn Văn A" onChange={this.onChangeInput} value={this.state.name} />
                                </div>
                                <div className="form-group ">
                                    <div className="name">Số điện thoại</div>
                                    <input type="text" name="phone" className="form-control" placeholder="0912345678" min="0" onChange={this.onChangeInputNumber} value={this.state.phone} />

                                </div>
                                <div className="form-group">
                                    <div className="name">Ngày sinh</div>
                                    <DateInput className="form-control" timeInput={this.state.birthday} name="birthday" changeDate={this.changeDate} />
                                </div>
                                <div className="form-group">
                                    <div className="name">Địa chỉ</div>
                                    <input type="text" name="address" className="form-control" placeholder="Số nhà-Tên Đường-Tên Quận Huyện-Thành Phố" onChange={this.onChangeInput} value={this.state.address} />
                                </div>
                                <div className="form-group">
                                    <div className="name">Hình thức hoạt động</div>
                                    <select name="type" className="form-control" onChange={this.onChangeInput} value={this.state.type}>
                                        <option value="2">Cá nhân</option>
                                        <option value="3">Nhóm</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <div className="name">Tay nghề</div>
                                    <div className="control-handjob">

                                        <div className="view">Chọn tay nghề</div>

                                        <div className="list-job">
                                            <ul className="list-unstyled">
                                                {renderWorkManShip}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <button class="text-white text-center text-uppercase bg-green btn-block btn-register" onClick={this.onSubmit}>Đăng ký ngay</button>
                                </div>
                            </div>
                            <div className="right">
                                <div className="text-center logo">
                                    <img src="/public/images/ic_logo.png" alt="" />
                                </div>
                                <ul className="list-unstyled list-info">
                                    <li className="clearfix">
                                        <div className="icon">
                                            <span className="fa fa-map-marker"></span>
                                        </div>
                                        <div className="info">
                                            <div className="name">Địa chỉ</div>
                                            <p className="des"><div dangerouslySetInnerHTML={{ __html: this.state.address_c }}/></p>
                                        </div>
                                    </li>
                                    <li className="clearfix">
                                        <div className="icon">
                                            <span className="fa fa-phone"></span>
                                        </div>
                                        <div className="info">
                                            <div className="name">Tổng đài</div>
                                            <p className="des">{hotline}</p>
                                        </div>
                                    </li>
                                    <li className="clearfix">
                                        <div className="icon">
                                            <span className="fa fa-mobile"></span>
                                        </div>
                                        <div className="info">
                                            <div className="name">Di động</div>
                                            <p className="des">{mobile}</p>
                                        </div>
                                    </li>
                                    <li className="clearfix">
                                        <div className="icon">
                                            <span className="fa fa-envelope" style={{ fontSize: 18 }}></span>
                                        </div>
                                        <div className="info">
                                            <div className="name">Hòm thư</div>
                                            <p className="des">{email}</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

            </Fragment>
        );
    }
}



export default landing_money;