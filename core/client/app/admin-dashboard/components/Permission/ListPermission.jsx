import React, { Component } from 'react';
import {
    PageHeader
}from '../Common/index';
import OnePermission from './OnePermission'
import { makeRequest } from '../../../libs/request';
import Pagination from '../Common/Pagination'
import { Link } from 'react-router-dom'


class ListPermission extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allPermission: [],
            name: '',
            status: 0,
            action: '',
            object: '',
            limit: 15,
            page: 1,
            number_page: 0,
            total: 0
        }
    }

    componentDidMount() {
        let { page, limit } = this.state;
        this.getPermission(page, limit)
    }

    getPermission = (page, limit) => {
        makeRequest('get', '/admin/permission/getPermission', { page, limit })
            .then(result => {
                if (result.signal) {
                    let { allPermission, total, number_page } = result.data
                    this.setState({
                        allPermission: allPermission,
                        number_page,
                        total
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })

    }

    clickPage = (page, number_per_page) => {
        this.getPermission(page, number_per_page)
        this.setState({
            page,
            limit: number_per_page
        })
    }

    handleDelete = (id) => {
        let permission = this.state.allPermission.filter(item => item.id != id)
        this.setState({
            permission
        })
    }

    render() {
        let elements = this.state.allPermission.map((item, index) => {
            return <OnePermission
                permission={item}
                key={index}
                index={index}
                handleDelete={this.handleDelete}
            />
        })
        return (
            <div>
                <PageHeader
                    title="Danh sách quyền"
                    breadcrumb={[
                        { title: 'Danh sách quyền', link: '' }
                    ]}
                />

                <div className="content">
                    <div className="panel panel-white">
                        <div className="panel-body">
                            <div className="row">
                                <div className="col-xs-12 col-sm-2 col-md-1 col-lg-1" style={{ float: "right" }} >
                                    <Link type="button" className="btn btn-success " to="/permission/create" >Tạo quyền</Link>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th className="fontBold">Tên quyền</th>
                                            <th className="fontBold">Hành động</th>
                                            <th className="fontBold">Đối tượng</th>
                                            <th className="fontBold">Trạng thái</th>
                                            <th className="fontBold text-center col-md-3">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {elements}
                                    </tbody>
                                </table>
                            </div>
                            <div className="table-footer">
                                <div className="pull-right">
                                    <Pagination
                                        page={this.state.page}
                                        number_page={this.state.number_page}
                                        number_per_page={this.state.limit}
                                        total={this.state.total}
                                        clickPage={this.clickPage.bind(this)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ListPermission;