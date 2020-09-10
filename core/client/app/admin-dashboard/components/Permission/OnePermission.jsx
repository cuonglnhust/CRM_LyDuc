import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { makeRequest } from '../../../libs/request'
import { showErrorMessage, showSuccessMessage } from '../../actions/notification'

class OnePermission extends Component {

    onClick = (e) => {
        e.preventDefault()
        let thiss = this;
        bootbox.confirm({
            size: "small",
            message: "Bạn có chắc chắn muốn xóa",
            buttons: {
                confirm: {
                    label: 'Đồng ý',
                    className: 'btn-success'
                },
                cancel: {
                    label: 'Không',
                    className: 'btn-danger'
                }
            },
            callback: function (result) {
                if (result) {
                    thiss.handleDelete();
                }
            }
        })
    }

    handleDelete = () => {
        let { permission } = this.props
        let { id } = permission

        makeRequest('post', '/admin/permission/deletePermission', { id })
            .then(result => {
                if (result.signal) {
                    showSuccessMessage('Xóa quyền thành công')
                    this.props.handleDelete(id)
                } else {
                    showErrorMessage(result.message)
                }
            })
    }

    render() {
        let { permission } = this.props
        return (
            <tr>
                <td>{permission.name}</td>
                <td>{permission.action}</td>
                <td>{permission.object}</td>
                <td>{(permission.status == 0) ? <span className="badge badge-danger">Chờ duyệt</span> : <span className="badge badge-success">Đã đồng ý</span>}</td>
                <td className="text-center">
                    <Link to={`/admin/permission/update/${permission.id}`} className="label label-primary" style={{ marginRight: 10 }}><span className="icon-info22 position-left"></span>Sửa</Link>
                    <button type="submit" className="label label-danger bg-pink" onClick={this.onClick}>
                        <i className=" icon-trash position-left"></i>
                        Xóa
                                    </button>

                </td>
            </tr>
        );
    }
}

export default OnePermission;