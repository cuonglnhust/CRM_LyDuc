import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { makeRequest } from '../../../libs/request'
import { showErrorMessage, showSuccessMessage } from '../../actions/notification'

class OneRole extends Component {

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
        let { role } = this.props
        let { id } = role

        makeRequest('post', '/admin/role/deleteRole', { id })
            .then(result => {
                if (result.signal) {
                    showSuccessMessage('Xóa nhóm quyền thành công')
                    this.props.handleDelete(id)
                } else {
                    showErrorMessage(result.message)
                }
            })
    }

    render() {
        let { role } = this.props
        return (
            <tr>
                <td>{role.name}</td>
                <td>{role.description}</td>
                <td>
                    <Link to={`/admin/user/rolePermission/${role.id}`} className="label label-success" ><i className=" icon-clipboard5 position-left"></i>Cập nhật quyền</Link>
                </td>
                <td>{(role.status == 0) ? <span className="badge badge-danger">Chờ duyệt</span> : <span className="badge badge-success">Đã đồng ý</span>}</td>
                <td className="text-center">
                    <Link to={`/admin/user/updateRole/${role.id}`} className="label label-primary" style={{ marginRight: 10 }}><span className="icon-info22 position-left"></span>Sửa</Link>
                    <button type="submit" className="label label-danger bg-pink" onClick={this.onClick}>
                        <i className=" icon-trash position-left"></i>
                        Xóa
                                    </button>

                </td>
            </tr>
        );
    }
}

export default OneRole;