import React, { Component } from 'react';
import { showErrorMessage, showSuccessMessage } from '../../actions/notification'
import InputGroup from '../Common/InputGroup'
import { makeRequest } from '../../../libs/request'
import { Link } from 'react-router-dom'
import PageHeader from '../Common/PageHeader'
import ButtonUpload from '../Common/ButtonUpload'

class UpdateUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            full_name: '',
            user_name: '',
            status: '0',
            password: '',
            email: '',
            mobile: '',
            role_id: '1',
            allRole: [],
            avatar: '',
            id: 0
        }
    }
    componentWillMount() {
        let { user_id } = this.props.match.params;
        makeRequest('get', '/admin/user/getUserRoleById', { id: user_id })
            .then(result => {
                if (result.signal) {
                    let data = result.data;
                    this.setState({
                        id: data.user.id,
                        full_name: data.user.full_name,
                        user_name: data.user.user_name,
                        avatar: data.user.avatar,
                        status: data.user.status,
                        email: data.user.email,
                        mobile: data.user.mobile,
                        role_id: data.role.id
                    })
                } else {
                    this.props.history.push('/admin/user/list')
                }
            })
        this.getRole()
    }

    getRole = () => {
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

    onUpdate = () => {
        let { id, full_name, role_id, status , email, mobile, avatar } = this.state;
        if (!full_name || !role_id) {
            return showErrorMessage('Vui lòng nhập đủ thông tin')
        }
        makeRequest('post', '/admin/user/updateUser', {
            id, full_name, role_id, status , email, mobile, avatar 
        })
            .then(res => {
                if (res.signal) {
                    showSuccessMessage('Cập nhật quản trị viên thành công')
                    this.props.history.push('/admin/user/list')
                } else {
                    showErrorMessage(res.message)
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
        let { full_name, user_name, email, mobile, avatar, status, role_id, allRole } = this.state;
        let renderRole = allRole.map((item, index) => {
            return <option key={index} value={item.id}>{item.name}</option>
        })
        return (
            <div>
                <PageHeader
                    title="Cập nhật quản trị viên"
                    breadcrumb={[
                        { title: 'Danh sách quản trị viên', link: '/user/list' },
                        { title: 'Cập nhật', link: '' }
                    ]}
                />

                <div className="content">
                    <div className="panel panel-flat">
                        <div className="panel-body">
                            <form className="form-horizontal" >
                                <fieldset className="content-group">
                                    <div className="form-group">

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
                                                readOnly={true}
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

                                        <div className="form-group col-md-12">
                                            <button className="btn bg-blue col-md-1" type="button" onClick={this.onUpdate} style={{ width: 'auto' }} >
                                                <i className="icon-checkmark4 position-left"></i>Cập nhật</button>
                                            <Link to={`/admin/user/list/`} className="btn btn-danger col-md-1" style={{ marginLeft: 10, width: 'auto' }}>
                                                <i className="icon-cancel-circle2 position-left"></i>Hủy</Link>
                                        </div>

                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    </div>

                </div>
            </div>

        );
    }
}

export default UpdateUser;