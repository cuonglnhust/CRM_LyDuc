import React, { Component } from 'react'
import { makeRequest } from '../../../libs/request'
import Checkbox from '../Common/Checkbox'
import { Link } from 'react-router-dom'
import { showErrorMessage, showSuccessMessage } from '../../actions/notification'
import _ from 'lodash'

export default class UpdateRolePermission extends Component {

    constructor(props) {
        super(props)
        this.state = {
            listPermission: [],
            role_id: 0,
            permission_id: []
        }
    }

    componentDidMount() {
        this.getAllPermission();
        this.getRolePermission();
    }

    getAllPermission() {
        makeRequest('get', '/admin/permission/getPermission', {
            status: 1
        })
            .then(result => {
                if (result.signal) {
                    let { allPermission } = result.data;
                    let listPermission = {};
                    allPermission.map(item => {
                        if (!listPermission[item.object]) {
                            listPermission[item.object] = [item]
                        } else {
                            listPermission[item.object].push(item)
                        }
                    })
                    this.setState({
                        listPermission
                    })
                }else{
                    return showErrorMessage(result.message)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    getRolePermission() {
        let { role_id } = this.props.match.params;
        makeRequest('get', '/admin/permission/getRolePermission', { role_id })
            .then(result => {
                if (result.signal) {
                    let data = result.data;
                    this.setState({
                        permission_id: data ? data.permission_id : [],
                        role_id
                    })
                }else{
                    return showErrorMessage(result.message)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    onChange = (e) => {
        let { permission_id } = this.state;
        if (e.isCheck == true) {
            permission_id.push(e.id);
        } else {
            permission_id = permission_id.filter(item => item != e.id)
        }
        this.setState({
            permission_id
        })
    }

    onChangeAll = (listPermissionId, e) => {
        let { permission_id } = this.state;
        let isCheck = e.target.checked;
        if (!isCheck) {
            listPermissionId.map(item => {
                permission_id = permission_id.filter(it => it != item)
            })
        } else {
            permission_id = permission_id.concat(listPermissionId)
        }
        this.setState({
            permission_id
        })
    }

    renderListChildPermission(listChildPermission) {
        let { permission_id } = this.state
        return listChildPermission.map((item, index) => {
            let isCheck = (permission_id.indexOf(item.id) > -1) ? true : false
            return (
                <Checkbox
                    title={item.name}
                    isCheck={isCheck}
                    onChange={this.onChange}
                    id={item.id}
                    key={index}
                />
            )
        })
    }

    renderCheckbox() {
        let { listPermission } = this.state;
        let listKey = _.keys(listPermission);
        return listKey.map((key, idx) => {
            if (idx % 2 == 0) {
                return (
                    <div className="row" key={`key_${idx}`}>
                        {this.renderRole(key, idx)}
                        {idx + 1 < listKey.length && (
                            this.renderRole(listKey[idx + 1], idx + 1)
                        )}
                    </div>
                )
            }
        })
    }

    renderRole = (key, idx) => {
        let { listPermission, permission_id } = this.state;
        let listPermissionId = listPermission[key].map(permission => {
            return permission.id
        })
        let isCheck = true;

        listPermissionId.map(item => {
            if (permission_id.indexOf(item) == -1) {
                isCheck = false
            }
        })
        return (
            <div className="panel panel-default col-md-6" key={`role_${idx}`}>
                <div className="panel-heading" role="tab" id={`heading_${idx}`}>
                    <h4 className="panel-title">
                        {/* <a className="trigge" role="button" data-toggle="collapse"> */}
                        <div className="checkbox" style={{ fontSize: 16, marginTop: 0 }}>
                            <label>
                                <div className="checker">
                                    <span className={isCheck ? 'checked' : ''}>
                                        <input type="checkbox" className="styled" checked={isCheck || false} onChange={this.onChangeAll.bind(this, listPermissionId)} />
                                    </span>
                                </div>
                                {key.toUpperCase()}
                            </label>
                        </div>
                        {/* </a> */}
                    </h4>
                </div>
                <div className='panel-collapse collapse in' role="tabpanel" style={{ marginLeft: 50, marginTop: 10 }} >
                    {this.renderListChildPermission(listPermission[key])}
                </div>
            </div>
        )
    }

    onUpdate = () => {
        let { role_id, permission_id } = this.state;
        makeRequest('post', '/admin/permission/updateRolePermission', {
            role_id,
            permission_id
        })
            .then(res => {
                if (res.signal) {
                    this.props.history.push('/admin/user/listRole')
                    showSuccessMessage('Cập nhập thành công')
                }else{
                    return showErrorMessage(res.message)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div className="panel panel-flat">
                <div className="panel-heading">
                    <h5 className="panel-title">Cập nhập quyền cho nhóm quản trị<a className="heading-elements-toggle"><i className="icon-more" /></a></h5>
                </div>
                <div className="panel-body">
                    <div className="form-group pt-15 my-checkbox">
                        {this.renderCheckbox()}
                    </div>
                    <div className="button col-md-12" style={{ paddingLeft: 0 }}>
                        <button className="btn btn-primary col-md-1 mg-r10" type="button" onClick={this.onUpdate} style={{ marginRight: 10 }} >Cập Nhật</button>
                        <Link to={`/admin/user/listRole/`} className="btn btn-danger col-md-1">Hủy</Link>
                    </div>
                </div>
            </div>
        )
    }
}
