import React, { Component } from 'react';
import { changeToSlug } from '../../../libs/utils'
import {
    PageHeader,
    InputGroup,
    ButtonUpload,
    DateInput
} from '../Common/index'
import Collapse from '../../../common/Collapse/Collapse'
import Editor from '../../../common/Editor/Summernote'
import ButtonLoader from '../../../common/Button/ButtonLoader'
import Switcher from 'react-switcher'
import { makeRequest } from '../../../libs/request';
import { showErrorMessage, showSuccessMessage } from '../../actions/notification';


class CreateNews extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            html_content: '',
            plain_text: '',
            category_id: '',
            image:'',
            publish_date: new Date(),
            status: false,
            listCategory: [],
            hot: false
        }
    }

    handleInput = (key, value) => {
        this.setState({
            [key]: value
        })
    }
    changeText = (e) => {
        e.preventDefault()
        let target = e.target;
        let name = target.name;
        let value = parseInt(target.value);
        this.handleInput(name, value)
    }
    changeDate(value, key) {
        this.handleInput(key, value)
    }
    changeContent = (data) => {
        this.setState({
            html_content: data.html_content,
            plain_text: data.plain_text
        })
    }
    changeStatus = () => {
        this.setState({
            status: !this.state.status
        })
    }
    changeHot = () => {
        this.setState({
            hot: !this.state.hot
        })
    }
    componentDidMount = () => {
        makeRequest('get', '/admin/news/getCategory')
            .then(res => {
                if (res.signal) {
                    this.setState({
                        listCategory: res.data
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
        document.body.classList.add("has-detached-right");
        document.body.classList.remove("has-detached-left");
    }

    createNews = (e) => {
        e.preventDefault()
        let { title, description, html_content, plain_text, publish_date, category_id, hot, status,image } = this.state;
        if (!title || !description || !html_content || !plain_text || !category_id || !publish_date) {
            return showErrorMessage("Vui lòng nhập đủ thông tin")
        }
        makeRequest('post', '/admin/news/createNews', {
            title,
            description,
            html_content,
            plain_text,
            category_id,
            publish_date,
            image,
            status: status ? 1 : 0,
            slug: changeToSlug(title),
            hot: hot ? 1 : 0
        })
            .then(res => {
                if (res.signal) {
                    showSuccessMessage("Thêm bài thành công")
                    this.props.history.push("/admin/news/listNews")
                } else {
                    showErrorMessage(result.message)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    render() {
        let { html_content, plain_text, listCategory } = this.state;
        let dataEditor = {
            html_content,
            plain_text
        }
        const renderCategory = listCategory.map((category, index) => {
            return <option key={`category_${index}`} value={category.id}>{category.title}</option>
        })

        return (
            <div>
                <PageHeader
                    title="Tạo tin tức"
                    breadcrumb={[
                        { title: "Danh sách", link: '/news/listNews' },
                        { title: "Tạo tin tức", link: '' }
                    ]}
                />

                <div className="content col-md-12">
                    <div className="container-detached ">
                        <div className="content-detached">
                            <div className="panel">
                                <div className="panel-body">
                                    <div className='form-group'>
                                        <label className="control-label fontBold">Tiêu đề: <span className="text-danger">*</span></label>

                                        <InputGroup
                                            name="title"
                                            type="text"
                                            placeholder="Nhập tiêu đề"
                                            icon="icon-quill4"
                                            value={this.state.title}
                                            changeInput={this.handleInput}
                                        />

                                    </div>

                                    <div className='form-group'>
                                        <label className="control-label fontBold">Slug:</label>
                                        <InputGroup
                                            name="slug"
                                            type="text"
                                            icon="icon-quill4"
                                            value={changeToSlug(this.state.title)}
                                            readOnly
                                        />

                                    </div>

                                    <div className='form-group'>

                                        <label className="control-label fontBold">Mô tả: <span className="text-danger">*</span></label>
                                        <InputGroup
                                            name="description"
                                            type="text"
                                            icon="icon-quill4"
                                            placeholder="Nhập mô tả"
                                            changeInput={this.handleInput}
                                            value={this.state.description}
                                        />

                                    </div>
                                    <div className='form-group'>

                                        <label className="control-label fontBold">Image </label>
                                        <ButtonUpload
                                            name="image"
                                            uploadSuccess={this.handleInput}
                                            value={this.state.image}
                                        />

                                    </div>
                                    <div className="form-group">
                                        <label className="control-label fontBold">Nội dung:</label>
                                        <Editor
                                            type="small"
                                            editor_id="summernote-create-articles"
                                            data={dataEditor}
                                            changeContent={this.changeContent}
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="sidebar-detached ">
                        <div className="sidebar sidebar-default sidebar-separate">
                            <Collapse
                                title="Hành động"
                                description=""
                                isOpen={true}
                            >
                                <div className="row mt-5">
                                    <div className="pull-right">
                                        <ButtonLoader
                                            type="submit"
                                            text="Tạo"
                                            clickFunc={this.createNews.bind(this)}
                                        />
                                    </div>
                                </div>

                            </Collapse>

                            <Collapse
                                title="Trạng thái"
                                description=""
                                isOpen={true}
                            >
                                <div className="has-feedback has-feedback-left" style={{ height: 60 }}>
                                    {(this.state.status == false) ? (<p className="label label-default">Ẩn</p>) : (<p className="label label-success">Xuất bản</p>)}
                                    <Switcher
                                        on={this.state.status}
                                        onClick={this.changeStatus}
                                    >
                                    </Switcher>
                                </div>

                            </Collapse>

                            <Collapse
                                title="Nổi bật"
                                description=""
                                isOpen={true}
                            >
                                <div className="has-feedback has-feedback-left" style={{ height: 60 }}>
                                    <Switcher
                                        on={this.state.hot}
                                        onClick={this.changeHot}
                                    >
                                    </Switcher>
                                </div>

                            </Collapse>

                            <Collapse
                                title="Loại tin"
                                description=""
                                isOpen={true}
                            >
                                <div className="has-feedback has-feedback-left" style={{ height: 60 }}>
                                    <div className="has-feedback">
                                        <select onChange={this.changeText} className="form-control" name="category_id" value={this.state.category_id}>
                                            <option value={0}>-Chọn loại tin-</option>
                                            {renderCategory}
                                        </select>
                                    </div>
                                </div>
                            </Collapse>

                            <Collapse
                                title="Ngày xuất bản"
                                description=""
                                isOpen={true}
                            >
                                <div className="has-feedback has-feedback-left" >
                                    <div className="input-group">
                                        <div className="input-group-addon">
                                            <i className="icon-calendar2"></i>
                                        </div>
                                        <div style={{ height: 36 }} className="form-group">
                                            <DateInput timeInput={this.state.publish_date} name="publish_date" changeDate={this.changeDate.bind(this)} />
                                        </div>
                                    </div>
                                </div>

                            </Collapse>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}

export default CreateNews;