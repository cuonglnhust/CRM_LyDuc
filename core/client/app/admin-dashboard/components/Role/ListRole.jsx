import React, { Component } from 'react';
import {
    PageHeader,
} from '../Common/index'
import OneRole from './OneRole'
import { makeRequest } from '../../../libs/request'

class ListRole extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allRole: [],
            name: '',
            description: '',
            status: 0
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
            .catch(err => {
                console.log(err)
            })

    }

    handleDelete = (id) => {
        let role = this.state.allRole.filter(item => item.id != id)
        this.setState({
            role
        })
    }

    render() {
        let elements = this.state.allRole.map((item, index) => {
            if(item.id == 1) return null
            return <OneRole
                role={item}
                key={index}
                index={index}
                handleDelete={this.handleDelete}
            />
        })
        return (
            <div>
                <PageHeader
                    title="Danh sách nhóm quyền"
                    breadcrumb={[
                        { title: 'Danh sách nhóm quyền', link: '' }
                    ]}
                />

                <div className="content">
                    <div className="panel panel-white">
                        <div className="panel-body">

                            <div className="table-responsive">
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th className="fontBold">Tên nhóm quyền</th>
                                            <th className="fontBold">Mô tả</th>
                                            <th className="fontBold">Cập nhật quyền</th>
                                            <th className="fontBold">Trạng thái</th>
                                            <th className="fontBold text-center col-md-3">Action</th>
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

export default ListRole;