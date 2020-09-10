import React, { Component } from 'react';
import { showErrorMessage, showSuccessMessage } from '../../actions/notification'
import InputGroup from '../Common/InputGroup'
import { makeRequest } from '../../../libs/request'
import { Link } from 'react-router-dom'
import PageHeader from '../Common/PageHeader'

class UpdateRole extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            description: '',
            status: 0,
        }
    }
    componentWillMount() {
        let { role_id } = this.props.match.params;
        makeRequest('get', '/admin/role/getRoleById', { id: role_id })
            .then(result => {
                if (result.signal) {
                    let { id, name, description, status } = result.data;
                    this.setState({
                        id,
                        name,
                        description,
                        status,
                    })
                } else {
                    this.props.history.push('/admin/user/listRole')
                }
            })
    }

    handleInput = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    onUpdate = () => {
        let { id, name, description, status } = this.state;
        makeRequest('post', '/admin/role/updateRole', {
            id, name, description, status
        })
            .then(res => {
                if (res.signal) {
                    showSuccessMessage('Cập nhật nhóm quyền thành công')
                    this.props.history.push('/admin/user/listRole')
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
        if (name === "select") {
            this.setState({
                status: value
            })
        }
        this.setState({
            [name]: value
        })
    }


    render() {
        let { name, description, status } = this.state;
        return (
            <div>
                <PageHeader
                    title="Cập nhật nhóm quyền"
                    breadcrumb={[
                        { title: 'Danh sách nhóm quyền', link: '/user/listRole' },
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
                                            <label className="control-label fontBold">Tên nhóm quyền: <span className="text-danger">*</span></label>

                                            <InputGroup
                                                type="text"
                                                name="name"
                                                value={name}
                                                icon="icon-compose"
                                                changeInput={this.handleInput}
                                                required />

                                        </div>


                                        <div className="form-group">
                                            <label className="control-label fontBold">Mô tả: <span className="text-danger">*</span></label>

                                            <InputGroup
                                                type="text"
                                                name="description"
                                                value={description}
                                                icon="icon-quill4"
                                                changeInput={this.handleInput}
                                                required />

                                        </div>

                                        <div className="form-group" >
                                            <label className="control-label fontBold">Trạng thái: <span className="text-danger">*</span></label>
                                            <select className="form-control" onChange={this.onHandle} value={status} name="select" >
                                                <option value={0}>Chờ duyệt</option>
                                                <option value={1}>Đã đồng ý</option>
                                            </select>
                                        </div>

                                        <div className="form-group col-md-12">
                                            <button className="btn bg-blue col-md-1" type="button" onClick={this.onUpdate} style={{ width: 'auto' }} >
                                                <i className="icon-checkmark4 position-left"></i>Cập nhật</button>
                                            <Link to={`/admin/role/list/`} className="btn btn-danger col-md-1" style={{ marginLeft: 10, width: 'auto' }}>
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

export default UpdateRole;