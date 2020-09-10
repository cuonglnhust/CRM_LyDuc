import React, { Component } from 'react';
import PageHeader from '../Common/PageHeader'
import { showErrorMessage, showSuccessMessage } from '../../actions/notification'
import { makeRequest } from '../../../libs/request'

class Seo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allSeo: [],
            name: '',
            idEdit: '',
            title: '',
            description: '',
            keywords: '',
            content: { title: '', description: '', keywords: '' }
        }
    }

    componentDidMount() {
        this.getListSeo();
    }
    getListSeo = () => {
        makeRequest("get", "/admin/seo/getAllSeo").then(result => {
            if (result.signal) {
                this.setState({
                    allSeo :result.data
                });
            }
        });
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    deleteSeo(seo_id) {
        if (window.confirm("Bạn có chắc chắn muốn xóa!")) {
            makeRequest("post", "/admin/seo/deleteSeo", {
                id: seo_id
            })
                .then(result => {
                    if (result.signal) {
                        this.getListSeo();
                        showSuccessMessage("Xóa thành công!");
                    } else {
                        showErrorMessage(result.message);
                    }
                })
                .catch(err => {
                    console.log("Error in delete seo", err);
                });
        }
    }

    renderSeo = () => {
        let {allSeo}= this.state
        let content = allSeo.map((seo, idx) => {
            return (
                <tr key={'seo-' + idx}>
                    <td>{idx + 1}</td>
                    <td>{seo.name}</td>
                    <td>
                        {`Title : ${(seo.content.title)}`} <hr />
                        Description  : {`${(seo.content.description)}`.slice(0, 230)}<hr />
                        Keywords : {`${(seo.content.keywords)}`.slice(0, 230)}
                    </td>
                    <td className="text-center">
                        <div className="">
                            <button type="button" className="label label-primary" onClick={this.clickEdit.bind(this, seo)}>
                                <i className="icon-info22 position-left"></i>Sửa
                            </button>
                            <button
                                type="button"
                                className="label label-danger"
                                onClick={this.deleteSeo.bind(this, seo.id)}
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
                            <th >STT</th>
                            <th >Tên</th>
                            <th >Nội dung</th>
                            <th className="fontBold col-md-4" style={{ textAlign: "center" }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {content}
                    </tbody>
                </table>
            </div>
        )
    }

    clickEdit = (seo) => {
        this.setState({
            idEdit: seo.id,
            name: seo.name,
            title: seo.content.title,
            description: seo.content.description,
            keywords: seo.content.keywords
        })

        window.scrollTo(0, 0)
    }

    cancelEdit = () => {
        this.setState({
            name: '',
            title: '',
            description: '',
            keywords: '',
            idEdit: ''
        })
    }

    submitForm = (e) => {
        e.preventDefault()
        let { name, title, description, keywords, idEdit } = this.state
        if (!name || !title || !description || !keywords) {
            return showErrorMessage('Vui lòng nhập đủ thông tin!')
        }
        let content = { title, description, keywords }
        let dataPost = {
            name,
            content
        }

        let url = 'createSeo'

        if (idEdit) {
            dataPost.id = idEdit
            url = 'updateSeo'
        }

        makeRequest('post', `/admin/seo/${url}`, dataPost)
            .then(result => {
                if (result.signal) {
                    let mess = idEdit ? 'Cập nhật thành công' : 'Thêm trường thành công'
                    showSuccessMessage(mess)
                    this.cancelEdit()
                    let { allSeo } = this.state
                    if (idEdit) {
                        this.setState(state => ({
                            allSeo: state.allSeo.map(item => {
                                if (item.id == idEdit) return result.data;
                                return item;
                            })
                        }));
                    } else {
                        allSeo.push(result.data)
                        this.setState({
                            allSeo
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
                        <label className="control-label">Tên trường</label>
                        <input type="text" className="form-control" name="name" placeholder="" onChange={this.handleInput} value={this.state.name} required />
                    </div>

                    <div className="form-group">
                        <label className="control-label">Tiêu đề</label>
                        <input type="text" className="form-control" name="title" placeholder="" onChange={this.handleInput} value={this.state.title} required />
                    </div>

                    <div className="form-group">
                        <label>Giới thiệu</label>
                        <textarea name="description" rows="3" cols="3" placeholder="" className="form-control" onChange={this.handleInput} value={this.state.description} />
                    </div>

                    <div className="form-group no-margin-bottom">
                        <label>Keywords</label>
                        <textarea name="keywords" rows="3" cols="3" placeholder="" className="form-control" onChange={this.handleInput} value={this.state.keywords} />
                    </div>

                    <div className="media stack-media-on-mobile text-left">
                        <div className=" media-left media-middle text-nowrap">
                            <button type="submit" className="btn bg-teal-400"> {idEdit ? "Cập nhật" : "Tạo"}</button>
                            {idEdit ? (
                                <button type="button" className="btn bg-warning ml-5" onClick={this.cancelEdit.bind(this)}> Hủy bỏ</button>
                            ) : ''}
                        </div>
                    </div>

                </fieldset>
            </form>
        )
    }

    render() {
        return (
            <div>
                <PageHeader
                    title="Danh sách seo"
                    breadcrumb={[
                        { title: 'Seo', link: '' }
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
                                        {this.renderSeo()}
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

export default Seo;