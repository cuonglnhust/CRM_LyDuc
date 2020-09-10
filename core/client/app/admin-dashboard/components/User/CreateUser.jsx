import React, { Component } from 'react';
import {
    PageHeader,
    InputGroup,
    ButtonUpload
} from '../Common/index'
import { makeRequest } from '../../../libs/request';
import { showErrorMessage, showSuccessMessage } from '../../actions/notification';


class CreateUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            full_name: '',
            user_name: '',
            status: '0',
            password: '',
            email: '',
            mobile: '',
            role_id: '1',
            allRole: [],
            avatar: ''
        }
    }

    componentDidMount() {
        makeRequest('get', '/admin/role/getRole')
            .then(result => {
                if (result.signal) {
                    this.setState({
                        allRole: result.data
                    })
                }
            })
    }

    handleInput = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    submitForm = (e) => {
        e.preventDefault()
        let { full_name, user_name, password, email, mobile, status , role_id, avatar } = this.state
        if (!full_name || !user_name || !avatar || !password || !email || !mobile|| !role_id ) {
            return showErrorMessage('Vui lòng nhập đủ thông tin')
        }

        makeRequest('post', '/admin/user/createUser', {
            full_name,
            password,
            email,
            mobile,
            status,
            user_name,
            avatar,
            role_id
        })
            .then(result => {
                if (result.signal) {
                    showSuccessMessage('Thêm quản trị viên thành công')
                    this.props.history.push('/admin/user/list')
                } else {
                    showErrorMessage(result.message)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    onHandle = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value
        })
    }

    render() {
        let { full_name, user_name, email, mobile, avatar, status, password,role_id } = this.state;
        let renderRole = this.state.allRole.map((item, index) => {
            return <option value={item.id} key={index}>{item.name}</option>
        })
        return (
            <div>
                <PageHeader
                    title="Tạo mới quản trị viên"
                    breadcrumb={[
                        { title: 'Danh sách quản trị viên', link: '/user/list' },
                        { title: 'Tạo mới', link: '' }
                    ]}
                />

                <div className="content">
                    <div className="panel panel-white">
                        <form className="form-horizonal" action="#" onSubmit={this.submitForm}>
                            <fieldset className="panel-body pb-10">

                                <div className="form-group">
                                    <label className="control-label fontBold">Tên người dùng: <span className="text-danger">*</span></label>

                                    <InputGroup
                                        name="full_name"
                                        placeholder="Nhập tên đầy đủ"
                                        icon="icon-compose"
                                        value={full_name}
                                        changeInput={this.handleInput}
                                    />

                                </div>

                                <div className="form-group">
                                    <label className="control-label fontBold">Email: <span className="text-danger">*</span></label>

                                    <InputGroup
                                        name="email"
                                        placeholder="Nhập email"
                                        icon="icon-envelop5"
                                        changeInput={this.handleInput}
                                        value={email}
                                    />

                                </div>
                                <div className="form-group">
                                    <label className="control-label fontBold">Tên đăng nhập: <span className="text-danger">*</span></label>

                                    <InputGroup
                                        name="user_name"
                                        placeholder="Nhập tên đăng nhập"
                                        icon="icon-compose"
                                        changeInput={this.handleInput}
                                        value={user_name}
                                    />

                                </div>

                                <div className="form-group">
                                    <label className="control-label fontBold">Mật khẩu: <span className="text-danger">*</span></label>

                                    <InputGroup
                                        name="password"
                                        type="password"
                                        placeholder="Nhập mật khẩu"
                                        icon="icon-lock"
                                        changeInput={this.handleInput}
                                        value={password}
                                    />

                                </div>

                                <div className="form-group">
                                    <label className="control-label fontBold">Số điện thoại: <span className="text-danger">*</span></label>

                                    <InputGroup
                                        name="mobile"
                                        placeholder="Nhập số điện thoại"
                                        icon="icon-mobile"
                                        changeInput={this.handleInput}
                                        value={mobile}
                                    />

                                </div>

                                <div className="form-group">
                                    <label className="control-label fontBold">Ảnh đại diện</label>
                                    <ButtonUpload
                                        name="avatar"
                                        uploadSuccess={this.handleInput}
                                    />
                                    {avatar && (
                                        <div className="form-group">
                                            <div className="row">
                                                <img src={avatar} width="96" style={{ marginLeft: 10, marginTop: 10, marginBottom: -20 }} alt="" onError={(e) => { e.target.src = "/images/error_image.jpg" }} />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label className="control-label fontBold">Trạng thái: <span className="text-danger">*</span></label>
                                    <select value={status} className='form-control' name='status' onChange={this.onHandle} >
                                        <option value={0}>Chờ duyệt</option>
                                        <option value={1}>Đã đồng ý</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="control-label fontBold">Chọn nhóm quyền: <span className="text-danger">*</span></label>
                                    <select value={role_id} className='form-control' name='role_id' onChange={this.onHandle} >
                                        {renderRole}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <button type="submit" className="btn bg-blue">
                                        <i className="icon-envelop2 position-left"></i>
                                        Tạo người dùng
                                    </button>
                                </div>

                            </fieldset>
                        </form>
                    </div>
                </div>


            </div>
        );
    }


}

export default CreateUser;