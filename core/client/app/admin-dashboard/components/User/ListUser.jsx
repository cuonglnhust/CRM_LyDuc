import React, { Component } from 'react';
import {
    PageHeader
} from '../Common/index'
import OneUser from './OneUser'
import { makeRequest } from '../../../libs/request'

class ListUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allRole: [],
            allUser: [],
            name: '',
            description: '',
            status: 0
        }
    }

    componentDidMount() {
        makeRequest('get', '/admin/user/getUser')
            .then(result => {
                if (result.signal) {
                    this.setState({
                        allUser: result.data
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleDelete = (id) => {
        let user = this.state.allUser.filter(item => item.user_id != id)
        this.setState({
            allUser: user
        })
    }

    render() {
        let { allUser } = this.state
        let elements = allUser.map((item, index) => {
            return <OneUser
                user={item}
                key={index}
                index={index}
                handleDelete={this.handleDelete}
            />
        })
        return (
            <div>
                <PageHeader
                    title="Danh sách quản trị viên"
                    breadcrumb={[
                        { title: 'Danh sách quản trị viên', link: '' }
                    ]}
                />

                <div className="content">
                    <div className="panel panel-white">
                        <div className="panel-body">

                            <div className="table-responsive">
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th className="fontBold">Tên người dùng</th>
                                            <th className="fontBold">Email</th>
                                            <th className="fontBold">Số điện thoại</th>
                                            <th className="fontBold">Nhóm quyền</th>
                                            <th className="fontBold">Trạng thái</th>
                                            <th className="fontBold text-center col-md-3">Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {elements}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ListUser;