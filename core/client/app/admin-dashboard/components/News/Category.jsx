import React, { Component } from 'react';
import PageHeader from '../Common/PageHeader';
import { changeToSlug } from '../../../libs/utils';
import { makeRequest } from '../../../libs/request';
import { showErrorMessage, showSuccessMessage } from '../../actions/notification';
import Collapse from '../../../common/Collapse/Collapse'
import Switcher from 'react-switcher'
class Category extends Component {

    constructor(props) {
        super(props)
        this.state = {
            allCategory: [],
            title: '',
            description: '',
            slug: '',
            idEdit: 0,
            isRecruitment: false,
            limit: 10,
            page: 1,
            total: 0,
            number_page: 0
        }
    }

    componentDidMount() {
        this.getListCategory();
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    clickEdit = (category) => {
        this.setState({
            idEdit: category.id,
            title: category.title,
            description: category.description,
            isRecruitment: category.isRecruitment
        })

        window.scrollTo(0, 0)
    }

    changeRecruitment = () => {
        this.setState({
            isRecruitment: !this.state.isRecruitment
        })
    }

    cancelEdit = () => {
        this.setState({
            title: '',
            description: '',
            idEdit: 0,
            isRecruitment: false
        })
    }

    deleteCategory(category_id) {
        if (window.confirm("Bạn có chắc chắn muốn xóa!")) {
            makeRequest("post", "/admin/news/deleteCategory", {
                id: category_id
            })
                .then(result => {
                    if (result.signal) {
                        this.getListCategory();
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

    getListCategory() {
        makeRequest('get', '/admin/news/getCategory').then(result => {
            if (result.signal) {
                this.setState({
                    allCategory: result.data
                })
            }
        })
    }

    submitForm = (e) => {
        e.preventDefault()
        let { title, description, slug, isRecruitment, idEdit } = this.state
        if (!title) {
            return showErrorMessage("Vui lòng nhập tên thể loại")
        }
        if (!description) {
            return showErrorMessage("Vui lòng nhập mô tả")
        }

        let dataPost = {
            title,
            description,
            slug,
            isRecruitment
        }

        let url = 'createCategory'

        if (idEdit) {
            dataPost.id = idEdit
            url = 'updateCategory'
        }

        makeRequest('post', `/admin/news/${url}`, dataPost)
            .then(result => {
                if (result.signal) {
                    let mess = idEdit ? "Cập nhật thành công" : "Thêm thể loại thành công"
                    showSuccessMessage(mess)
                    this.cancelEdit()
                    let { allCategory } = this.state
                    if (idEdit) {
                        this.setState(state => ({
                            allCategory: state.allCategory.map(item => {
                                if (item.id == idEdit) return result.data;
                                return item;
                            })
                        }));
                    } else {
                        allCategory.push(result.data)
                        this.setState({
                            allCategory
                        })
                    }
                } else {
                    showErrorMessage(result.message)
                }
            })

    }
    renderFromCreate() {
        let { idEdit } = this.state
        return (
            <form className="form-horizonal" action="#" onSubmit={this.submitForm}>
                <fieldset className="panel-body">

                    <div className="form-group">
                        <label className="control-label">Tên thể loại</label>
                        <input type="text" className="form-control" name="title" placeholder="" onChange={this.handleInput.bind(this)} value={this.state.title} required />
                    </div>

                    <div className="form-group">
                        <label className="control-label">Slug</label>
                        <input type="text" className="form-control" name="slug" placeholder="" onChange={this.handleInput.bind(this)} value={this.state.slug = changeToSlug(this.state.title)} readOnly required />
                    </div>

                    {/* <div className="form-group">
                        <label className="control-label">Thể loại tuyển dụng</label>
                        <input type="text" className="form-control" name="slug" placeholder="" onChange={this.handleInput.bind(this)} value={this.state.slug = changeToSlug(this.state.title)} readOnly required />
                    </div> */}
                    <div className="sidebar-detached">
                        <div className="sidebar sidebar-default sidebar-separate" style={{ width: "100%" }}>
                            <Collapse
                                title="Thể loại tin tuyển dụng"
                                description=""
                                isOpen={true}
                            >
                                <div className="has-feedback has-feedback-left" style={{ height: 60 }}>
                                    <Switcher
                                        on={this.state.isRecruitment}
                                        onClick={this.changeRecruitment}
                                    >
                                    </Switcher>
                                </div>

                            </Collapse>
                        </div>
                    </div>


                    <div className="form-group no-margin-bottom">
                        <label>Thông tin thể loại</label>
                        <textarea name="description" rows="3" cols="3" placeholder="" className="form-control" onChange={this.handleInput.bind(this)} value={this.state.description} />
                    </div>


                    <div className="media stack-media-on-mobile text-left">
                        <div className=" media-left media-middle text-nowrap">
                            <button type="submit" className="btn bg-teal-400"> {idEdit ? "Cập nhật" : "Tạo"}</button>
                            {idEdit ? (
                                <button type="button" className="btn bg-warning ml-5" onClick={this.cancelEdit.bind(this)}> Hủy </button>
                            ) : ''}
                        </div>
                    </div>

                </fieldset>
            </form>
        )
    }

    renderCategory = () => {
        let { t } = this.props;
        let content = this.state.allCategory.map((category, idx) => {

            return (
                <tr key={'category-' + idx}>
                    <td>{idx + 1}</td>
                    <td>{category.title}</td>
                    <td>{category.slug}</td>
                    <td>{category.description}</td>
                    <td className="text-center">
                        <div className="">
                            <button
                                type="button"
                                className="label label-primary"
                                style={{ margin: 4 }}
                                onClick={this.clickEdit.bind(this, category)}
                            >
                                <i className="icon-info22 position-left" />Sửa
                            </button>
                            <button
                                type="button"
                                className="label label-danger"
                                onClick={this.deleteCategory.bind(this, category.id)}
                            >
                                <i className="icon-info22 position-left" />Xóa
                        </button>
                        </div>
                    </td>

                </tr>
            )
        })

        return (
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th className="fontBold col-md-2">STT</th>
                            <th className="fontBold col-md-3">Tiêu đề</th>
                            <th className="fontBold col-md-3">Slug</th>
                            <th className="fontBold col-md-5">Mô tả</th>
                            <th className="fontBold col-md-2" style={{ textAlign: "center" }}>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {content}
                    </tbody>
                </table>
            </div>
        )
    }

    render() {
        const { t } = this.props;
        return (
            <div>
                <PageHeader
                    title="Danh sách thể loại"
                    breadcrumb={[
                        { title: "Thể loại", link: '' }
                    ]}
                />

                <div className="content">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12">
                            <div className="col-md-4">
                                <div className="panel panel-flat">
                                    <div className="panel-body">
                                        {this.renderFromCreate()}
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-8">
                                <div className="panel panel-flat">
                                    <div className="panel-body">
                                        {this.renderCategory()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Category;