import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PageHeader from "../Common/PageHeader";
import Pagination from "../Common/Pagination";
import { makeRequest } from '../../../libs/request'
import { showErrorMessage, showSuccessMessage } from '../../actions/notification'
import SearchNews from './Search'

class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listNews: [],
            limit: 10,
            page: 1,
            title: "",
            total: 0,
            number_page: 0
        };
    }

    componentWillMount() {
        let { page, limit, title } = this.state;
        this.getListNews(page, limit, title);
    }

    getListNews(page, limit, title) {
        makeRequest("get", "/admin/news/getListNews", {
            page,
            limit,
            title
        }).then(result => {
            if (result.signal) {
                let { listNews, total, number_page } = result.data;
                this.setState({
                    listNews,
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
        let { page, limit, title } = this.state;
        this.getListNews(page, limit, title);
    };

    deleteNew(news_id) {
        let { page, limit, title } = this.state;
        if (window.confirm("Bạn có chắc chắn muốn xóa!")) {
            makeRequest("post", "/admin/news/deleteNews", {
                id: news_id
            })
                .then(result => {
                    if (result.signal) {
                        this.getListNews(page, limit, title);
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

    clickPage = (page, limit) => {
        let { title } = this.state;
        this.getListNews(page, limit, title);
        this.setState({
            page,
            limit
        });
    };

    renderNews = () => {
        let { listNews } = this.state;
        if (!listNews.length) return (
            <tr>
                <td valign="top" colSpan="12" className="text-center">Không có dữ liệu hiển thị</td>
            </tr>
        );
        return listNews.map((news, index) => {
            return (
                <tr key={`news_${index}`}>
                    <td>{(this.state.page-1)*this.state.limit+index + 1}</td>
                    <td>{news.title}</td>
                    <td>{news.description}</td>
                    <td>
                        {news.status == 0 ? (
                            <p className="label label-default">
                                Ẩn
                            </p>
                        ) : (
                                <p className="label label-success">
                                    Xuất bản
                                </p>
                            )}
                    </td>
                    {/* <td>{news.hot}</td> */}
                    <td>{news.category ? news.category.title : ""}</td>
                    <td>
                        <Link
                            to={`/admin/news/updateNews/${news.id}`}
                            type="button"
                            className="btn btn-info"
                            style={{ marginRight: 10 }}
                        >
                            Sửa
                        </Link>
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={this.deleteNew.bind(this, news.id)}
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
                    title="Danh sách tin tức"
                    breadcrumb={[{ title: "Danh sách", link: "" }]}
                />
                <div className="content">
                    <div className="panel panel-white">
                        <div className="panel-body">
                            <SearchNews
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
                                                <th className="text-bold" style={{ width: "200px", textAlign: "center" }}>
                                                    Tiêu đề
                                                </th>
                                                <th className="text-bold" style={{ textAlign: "center" }}>
                                                    Mô tả
                                                </th>
                                                <th className="text-bold">
                                                    Trạng thái
                                                </th>
                                                <th className="text-bold" style={{ width: "100px", textAlign: "center" }}>
                                                    Thể loại
                                                </th>
                                                <th className="text-bold" style={{ width: "150px" }}>
                                                    Hành động
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>{this.renderNews()}</tbody>
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
export default News;
