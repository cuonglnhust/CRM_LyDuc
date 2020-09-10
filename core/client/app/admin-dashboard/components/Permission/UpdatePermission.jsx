import React, { Component } from 'react';
import { showErrorMessage, showSuccessMessage } from '../../actions/notification'
import InputGroup from '../Common/InputGroup'
import { makeRequest } from '../../../libs/request'
import { Link } from 'react-router-dom'
import PageHeader from '../Common/PageHeader'

class UpdateClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            action: '',
            status: 0,
            object: '',
        }
    }
    componentWillMount() {
        let { permission_id } = this.props.match.params;
        makeRequest('get', '/admin/permission/getPermissionById', { id: permission_id })
            .then(result => {
                if (result.signal) {
                    let { id, name, status, action, object } = result.data;
                    this.setState({
                        id,
                        name,
                        status,
                        action,
                        object,
                    })
                } else {
                    this.props.history.push('/admin/permission/list')
                }
            })
    }

    handleInput = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    onUpdate = () => {
        let { id, name, action, status, object } = this.state;
        makeRequest('post', '/admin/permission/updatePermission', {
            id, name, action, object, status
        })
            .then(res => {
                if (res.signal) {
                    showSuccessMessage('Cập nhật quyền thành công')
                    this.props.history.push('/admin/permission/list')
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
        let { name, status, action, object } = this.state;
        return (
            <div>
                <PageHeader
                    title="Cập nhật quyền"
                    breadcrumb={[
                        { title: 'Danh sách quyền', link: '/permission/list' },
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
                                            <label className="control-label fontBold">Tên quyền: <span className="text-danger">*</span></label>

                                            <InputGroup
                                                type="text"
                                                name="name"
                                                value={name}
                                                icon="icon-compose"
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

                                        <div className="form-group">
                                            <label className="control-label fontBold">Hành động: <span className="text-danger">*</span></label>

                                            <InputGroup
                                                value={action}
                                                name="action"
                                                placeholder="Nhập tên hành động"
                                                icon="icon-power2"
                                                changeInput={this.handleInput}
                                            />

                                        </div>

                                        <div className="form-group">
                                            <label className="control-label fontBold">Đối tượng: <span className="text-danger">*</span></label>

                                            <InputGroup
                                                value={object}
                                                name="object"
                                                placeholder="Nhập tên đối tượng"
                                                icon="icon-point-right"
                                                changeInput={this.handleInput}
                                            />

                                        </div>

                                        <div className="form-group col-md-12">
                                            <button className="btn bg-blue col-md-1" type="button" onClick={this.onUpdate} style={{ width: 'auto' }} >
                                                <i className="icon-checkmark4 position-left"></i>Cập nhật</button>
                                            <Link to={`/admin/permission/list/`} className="btn btn-danger col-md-1" style={{ marginLeft: 10, width: 'auto' }}>
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

export default UpdateClinic;