import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PageHeader from "../Common/PageHeader";
import Pagination from "../Common/Pagination";
import { makeRequest } from '../../../libs/request'
import { showErrorMessage, showSuccessMessage } from '../../actions/notification'
import SearchPartner from './Search'

class Partner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listPartner: [],
            limit: 10,
            page: 1,
            name_partner: "",
            total: 0,
            number_page: 0
        };
    }

    componentWillMount() {
        let { page, limit, name_partner } = this.state;
        this.getListPartner(page, limit, name_partner);
    }

    getListPartner(page, limit, name_partner) {
        makeRequest("get", "/admin/partner/getListPartner", {
            page,
            limit,
            name_partner
        }).then(result => {
            if (result.signal) {
                let { listPartner, total, number_page } = result.data;
                this.setState({
                    listPartner,
                    total,
                    number_page
                });
            }
        });
    }
    onChangeInputSearch = (key, value) => {
        this.setState({
            [key]: value
        });
    };

    submitSearch = () => {
        let { page, limit, name_partner } = this.state;
        this.getListPartner(page, limit, name_partner);
    };

    deletePartner(partner_id) {
        let { page, limit, name_partner } = this.state;
        if (window.confirm("Bạn có chắc chắn muốn xóa!")) {
            makeRequest("post", "/admin/partner/deletePartner", {
                id: partner_id
            })
                .then(result => {
                    if (result.signal) {
                        this.getListPartner(page, limit, name_partner);
                        showSuccessMessage("Xóa thành công!");
                    } else {
                        showErrorMessage(result.message);
                    }
                })
                .catch(err => {
                    console.log("Error in delete partner admin", err);
                });
        }
    }

    clickPage = (page, limit) => {
        let { name_partner } = this.state;
        this.getListPartner(page, limit, name_partner);
        this.setState({
            page,
            limit
        });
    };

    renderPartner = () => {
        let { listPartner } = this.state;
        if (!listPartner.length) return (
            <tr>
                <td valign="top" colSpan="12" className="text-center">Không có dữ liệu hiển thị</td>
            </tr>
        );
        return listPartner.map((partner, index) => {
            return (
                <tr key={`partner_${index}`}>
                    <td>{index + 1}</td>
                    <td>
                        <img src={partner.image ? partner.image :''} className="img-xs" alt="" />
                    </td>
                    <td>{partner.name_partner}</td>
                    <td>{partner.link_partner}</td>

                    <td>
                        <Link
                            to={`/admin/partner/updatePartner/${partner.id}`}
                            type="button"
                            className="btn btn-info"
                            style={{ marginRight: 10 }}
                        >
                            Sửa
                        </Link>
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={this.deletePartner.bind(this, partner.id)}
                        >
                            Xóa
                        </button>
                    </td>
                </tr>
            );
        });
    };

    render() {
        return (
            <div>
                <PageHeader
                    title="Danh sách đối tác"
                    breadcrumb={[{ title: "Danh sách", link: "" }]}
                />
                <div className="content">
                    <div className="panel panel-white">
                        <div className="panel-body">
                            <SearchPartner
                                search={this.submitSearch}
                                onChangeInputSearch={this.onChangeInputSearch}
                                name_partner={this.state.name_partner}
                            />

                            <div className="form-group">
                                <div className="table-responsive">
                                    <table className="table table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th className="text-bold">
                                                    STT
                                                </th>
                                                <th className="text-bold">
                                                    Ảnh
                                                </th>
                                                <th className="text-bold">
                                                    Tên
                                                </th>
                                                <th className="text-bold">
                                                    Website đối tác
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>{this.renderPartner()}</tbody>
                                    </table>
                                </div>
                                <div className="table-footer">
                                    <div className="pull-right">
                                        <Pagination
                                            page={this.state.page}
                                            number_page={this.state.number_page}
                                            number_per_page={this.state.limit}
                                            total={this.state.total}
                                            clickPage={this.clickPage.bind(this)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Partner;
