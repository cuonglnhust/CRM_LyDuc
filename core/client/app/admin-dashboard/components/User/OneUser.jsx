import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { makeRequest } from '../../../libs/request'
import { showErrorMessage, showSuccessMessage } from '../../actions/notification'

class OneUser extends Component {

    // onClick = (e) => {
    //     e.preventDefault()
    //     let thiss = this;
    //     bootbox.confirm({
    //         size: "small",
    //         message: "Bạn có chắc chắn muốn xóa",
    //         buttons: {
    //             confirm: {
    //                 label: 'Đồng ý',
    //                 className: 'btn-success'
    //             },
    //             cancel: {
    //                 label: 'Không',
    //                 className: 'btn-danger'
    //             }
    //         },
    //         callback: function (result) {
    //             if (result) {
    //                 thiss.handleDelete();
    //             }
    //         }
    //     })
    // }

    handleDelete = () => {
        let { user } = this.props
        let  id = user.user_id
        if(window.confirm( "Bạn có chắc chắn muốn xóa")){
        makeRequest('post', '/admin/user/deleteUser', { id })
            .then(result => {
                if (result.signal) {
                    showSuccessMessage('Xóa quản trị viên thành công')
                    this.props.handleDelete(id)
                } else {
                    showErrorMessage(result.message)
                }
            })
        }
    }

    render() {
        let { user } = this.props
        return (
            <tr>
                <td>{user.user.full_name}</td>
                <td>{user.user.email}</td>
                <td>{user.user.mobile}</td>
                <td>{user.role.name}</td>
                <td>{(user.user.status == 0) ? <span className="badge badge-danger">Chờ duyệt</span> : <span className="badge badge-success">Đã đồng ý</span>}</td>
                <td className="text-center">
                    <Link to={`/admin/user/update/${user.user.id}`} className="label label-primary" style={{ marginRight: 10 }}><span className="icon-info22 position-left"></span>Sửa</Link>
                    <button type="submit" className="label label-danger bg-pink" onClick={this.handleDelete}>
                        <i className=" icon-trash position-left"></i>
                        Xóa
                                    </button>

                </td>
            </tr>
        );
    }
}

export default OneUser;