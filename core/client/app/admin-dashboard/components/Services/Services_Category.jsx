import React, { Component } from 'react';
import PageHeader from '../Common/PageHeader';
import ButtonUpload from '../Common/ButtonUpload';
import { makeRequest } from '../../../libs/request';
import { showErrorMessage, showSuccessMessage } from '../../actions/notification';
import Switcher from 'react-switcher';
import { Link } from 'react-router-dom'
import { changeToSlug } from '../../../libs/utils'
class Services_Category extends Component {

    constructor(props) {
        super(props)
        this.state = {
            allServicesCategory: [],
            title: '',
            description: '',
            image: '',
            idEdit: 0,
            hot: false
        }
    }

    componentDidMount() {
        makeRequest('get', '/admin/services/getServicesCategory')
            .then(result => {
                if (result.signal) {
                    this.setState({
                        allServicesCategory: result.data
                    })
                }
            })
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleInputE = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    clickEdit = (category) => {
        this.setState({
            idEdit: category.id,
            title: category.title,
            image: category.image,
            description: category.description,
            hot: category.hot ? true : false,
        })

        window.scrollTo(0, 0)
    }

    cancelEdit = () => {
        this.setState({
            title: '',
            image: '',
            description: '',
            idEdit: 0,
            hot: false
        })
    }

    changeHot = () => {
        this.setState({
            hot: !this.state.hot
        })
    }

    submitForm = (e) => {
        e.preventDefault()
        let { title, description, image, idEdit, hot } = this.state
        if (!title) {
            return showErrorMessage("Vui lòng nhập tên thể loại")
        }
        if (!image) {
            return showErrorMessage("Vui lòng cập nhật ảnh nhóm dịch vụ này")
        }
        if (!description) {
            return showErrorMessage("Vui lòng nhập mô tả")
        }

        let dataPost = {
            title,
            description,
            image,
            hot: hot ? 1 : 0,
            slug: changeToSlug(title),
        }

        let url = 'createServicesCategory'

        if (idEdit) {
            dataPost.id = idEdit
            url = 'updateServicesCategory'
        }

        makeRequest('post', `/admin/services/${url}`, dataPost)
            .then(result => {
                if (result.signal) {
                    let mess = idEdit ? "Cập nhật thành công" : "Thêm nhóm dịch vụ thành công"
                    showSuccessMessage(mess)
                    this.cancelEdit()
                    let { allServicesCategory } = this.state
                    if (idEdit) {
                        this.setState(state => ({
                            allServicesCategory: state.allServicesCategory.map(item => {
                                if (item.id == idEdit) return result.data;
                                return item;
                            })
                        }));
                    } else {
                        allServicesCategory.push(result.data)
                        this.setState({
                            allServicesCategory
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
                        <label className="control-label fontBold">Tên nhóm dịch vụ</label>
                        <input type="text" className="form-control" name="title" placeholder="Nhập tên nhóm dịch vụ" onChange={this.handleInput.bind(this)} value={this.state.title} required />
                    </div>

                    <div className="form-group">
                        <label className="control-label fontBold">Slug</label>
                        <input type="text" className="form-control" name="slug"  onChange={this.handleInput.bind(this)} value={changeToSlug(this.state.title)} readOnly />
                    </div>

                    <div className='form-group'>
                        <label className="control-label fontBold">Image </label>
                        <ButtonUpload
                            name="image"
                            uploadSuccess={this.handleInputE}
                            value={this.state.image}
                        />
                    </div>

                    <div className="form-group">
                        <label className="control-label fontBold">Mô tả ngắn nhóm dịch vụ</label>
                        <textarea name="description" rows="3" cols="3" placeholder="Mô tả ngắn gọn nhóm dịch vụ!" className="form-control" onChange={this.handleInput.bind(this)} value={this.state.description} required />
                    </div>

                    <div className="form-group">
                        <label className="control-label fontBold">Nổi bật</label>
                        <div className="has-feedback has-feedback-left" style={{ height: 60 }}>
                            {(this.state.hot == false) ? (<p className="label label-default">Ẩn</p>) : (<p className="label label-success">Nổi bật</p>)}
                            <Switcher
                                on={this.state.hot}
                                onClick={this.changeHot}
                            >
                            </Switcher>
                        </div>

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
        let content = this.state.allServicesCategory.map((services_category, idx) => {

            return (
                <tr key={'services_category-' + idx}>
                    <td>{idx + 1}</td>

                    <td>
                        <img
                            src={services_category.image}
                            alt=""
                        />
                    </td>

                    <td>{services_category.title}</td>
                    <td>{services_category.slug}</td>
                    
                    <td>{services_category.description.slice(0, 110)}...</td>
                    <td>
                        {services_category.hot == 0 ? (
                            <p className="label label-default">
                                Ẩn
                            </p>
                        ) : (
                                <p className="label label-success">
                                    Nổi bật
                                </p>
                            )}
                    </td>
                    <td className="text-center">
                            <button type="button" className="label label-primary" onClick={this.clickEdit.bind(this, services_category)} style={{marginBottom: 10}}>
                                <span className="category-left"></span>Sửa
                            </button>
                            <Link to={`/admin/services/services_category/${services_category.id}`} ><span className=" icon-info22 label bg-success-400 ">nội dung chi tiết</span></Link>


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
                            <th className="fontBold col-md-3">Image</th>
                            <th className="fontBold col-md-3">Tiêu đề</th>
                            <th className="fontBold col-md-5">Mô tả</th>
                            <th className="fontBold col-md-5">Trạng thái</th>
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
                    title="Danh sách nhóm dịch vụ"
                    breadcrumb={[
                        { title: "Nhóm dịch vụ", link: '' }
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

export default Services_Category;