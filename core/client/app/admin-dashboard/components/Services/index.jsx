import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PageHeader from "../Common/PageHeader";
import Pagination from "../Common/Pagination";
import { makeRequest } from '../../../libs/request'
import { showErrorMessage } from '../../actions/notification'
import SearchServices from './SearchServices'
class Services extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listServices: [],
            limit: 10,
            page: 1,
            title: "",
            total: 0,
            number_page: 0,
        };
    }

    componentWillMount() {
        let { page, limit, title } = this.state;
        this.getListServices(page, limit, title);
    }
    getListServices(page, limit, title) {
        makeRequest("get", "/admin/services/getServicesCategory", {
            page,
            limit,
            title
        }).then(result => {
            if (result.signal) {
                let { listServices, total, number_page } = result.data
                this.setState({
                    listServices,
                    total,
                    number_page
                });
            } else {
                return showErrorMessage(result.message)
            }
        }).catch(err => {
            console.log(err)
        })
    }

    // getAllServices(page, limit, title) {
    //     makeRequest("get", "http://demo-cuuvan-v1.sky-demo.net/api/apiWeb/service/allService", {
    //         page,
    //         limit_record:limit,
    //         title
    //     }
    //     )
    //         .then(result => {
    //             if (result.code == 200) {
    //                 let listServices = result.data.services
    //                 let total = result.data.total
    //                 let number_page = result.data.number_page
    //                 this.setState({
    //                     listServices,
    //                     total,
    //                     number_page
    //                 })
    //             } else {
    //                 return showErrorMessage(result.message)
    //             }
    //         }).catch(err => {
    //             console.log(err)
    //         })
    // }

    onChangeInputSearch = (key, value) => {
        this.setState({
            [key]: value
        });
    };

    clickPage = (page, limit) => {
        let { title } = this.state;
        this.getListServices(page, limit, title);
        this.setState({
            page,
            limit
        });
    };
    submitSearch = () => {
        let { page, limit, title } = this.state;
        this.getListServices(page, limit, title);
    };

    deleteServicesCategory(id) {
        let { page, limit, title } = this.state;
        if (window.confirm("Bạn có chắc chắn muốn xóa!")) {
            makeRequest("post", "/admin/services/deleteServicesCategory", {
                id
            })
                .then(result => {
                    if (result.signal) {
                        this.getListServices(page, limit, title);
                        showSuccessMessage("Xóa thành công!");
                    } else {
                        showErrorMessage(result.message);
                    }
                })
                .catch(err => {
                    console.log("Error in delete news admin", err);
                });
        }
    }

    // renderServicesSub = (services_sub) => {
    //     return services_sub.map((item, idxsub) => {
    //         return (<li key={`servicesSub_${idxsub}`} >
    //             {item.label}
    //         </li>)
    //     })
    // }

    // renderServicesOther = (services_other) => {
    //     return services_other.map((item, idxother) => {
    //         return (<li key={`servicesOther_${idxother}`} >
    //             {item.label}
    //         </li>)
    //     })
    // }

    renderServices = () => {
        let { listServices } = this.state;
        if (!listServices.length) return (
            <tr>
                <td valign="top" colSpan="12" className="text-center">Không có dữ liệu hiển thị</td>
            </tr>
        );
        return listServices.map((services, index) => {
            return (
                <tr key={`services_${index}`}>
                    <td>{(this.state.page - 1) * this.state.limit + index + 1}</td>
                    <td><img src={services.image ? services.image : ''} ></img></td>
                    <td>{services.title}</td>
                    <td>{services.description.slice(0, 100)}</td>
                    <td>
                        {services.hot == 0 ? (
                            <p className="label label-default">
                                không nổi bật
                            </p>
                        ) : (
                                <p className="label label-success">
                                    Nổi bật
                                </p>
                            )}
                    </td>
                    {/* <td>
                        <ul>
                            {services.services_sub ? (services.services_sub.length ? this.renderServicesSub(services.services_sub) : '') : ''}
                        </ul>
                    </td>
                    <td>
                        <ul>
                            {services.services_other ? (services.services_other.length ? this.renderServicesOther(services.services_other) : '') : ''}
                        </ul>
                    </td> */}
                    <td>
                        <Link
                            to={`/admin/services/updateServices/${services.id}`}
                            type="button"
                            className="btn btn-info"
                            style={{ marginRight: 10 }}
                        >
                            Sửa
                        </Link>
                        <button
                            style={{ marginLeft: 10 }}
                            type="button"
                            className="btn btn-danger"
                            onClick={this.deleteServicesCategory.bind(this, services.id)}
                        >
                            Xóa
                        </button>
                        <Link to={`/admin/services/services_category/${services.id}`} style={{ display: "block", marginTop: 10 }} ><span className=" icon-info22 label bg-success-400 ">nội dung chi tiết</span></Link>
                    </td>
                </tr>
            );
        });
    };

    render() {
        return (
            <div>
                <PageHeader
                    title="Danh sách dịch vụ"
                    breadcrumb={[{ title: "Danh sách", link: "" }]}
                />
                <div className="content">
                    <div className="panel panel-white">
                        <div className="panel-body">
                            <SearchServices
                                search={this.submitSearch}
                                onChangeInputSearch={this.onChangeInputSearch}
                                title={this.state.title}
                            />
                            <div className="form-group">
                                <div className="table-responsive">
                                    <table className="table table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th className="text-bold">
                                                    STT
                                                </th>
                                                <th className="text-bold" style={{ width: "10%", textAlign: "center" }}>
                                                    Ảnh
                                                </th>
                                                <th className="text-bold" style={{ width: "200px", textAlign: "center" }}>
                                                    Tiêu đề
                                                </th>
                                                <th className="text-bold" style={{ textAlign: "center" }}>
                                                    Mô tả
                                                </th>
                                                <th className="text-bold" style={{ textAlign: "center" }}>
                                                    Trạng thái
                                                </th>
                                                {/* <th className="text-bold" style={{ textAlign: "center" }}>
                                                    Danh sách các dịch vụ con
                                                </th>
                                                <th className="text-bold" style={{ textAlign: "center" }}>
                                                    Danh sách các dịch vụ liên quan
                                                </th> */}
                                                <th className="text-bold" style={{ width: "150px" }}>
                                                    Hành động
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>{this.renderServices()}</tbody>
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
export default Services;
