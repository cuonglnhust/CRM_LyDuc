import React, { Component } from 'react';
import { changeToSlug } from '../../../libs/utils'
import {
    PageHeader,
    InputGroup,
    DateInput,
    ButtonUpload
} from '../Common/index'
import Collapse from '../../../common/Collapse/Collapse'
import Editor from '../../../common/Editor/Summernote'
import ButtonLoader from '../../../common/Button/ButtonLoader'
import Switcher from 'react-switcher'
import { makeRequest } from '../../../libs/request';
import { showErrorMessage, showSuccessMessage } from '../../actions/notification';


class UpdateNews extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            title: '',
            description: '',
            html_content: '',
            plain_text: '',
            category_id: '',
            image: '',
            publish_date: new Date(),
            status: false,
            listCategory: [],
            hot: false,
            count: 0
        }
    }

    componentDidMount() {
        this.getCategory()
    }

    componentWillMount() {
        let { news_id } = this.props.match.params || 0;
        if (news_id) {
            this.getNewsById(news_id)
        } else {
            this.props.history.push('/admin/news/listNews')
        }
    }
    componentWillReceiveProps(nextProps, nextState) {
        let next_new_id = nextProps.match.params.news_id || 0
        let { news_id } = this.props.match.params || 0;
        if (next_new_id != 0 && next_new_id != news_id) {
            this.getNewsById(next_new_id)
        } else {
            this.props.history.push('/admin/news/listNews')
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
        let value = target.value;
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
    onPasteContent = (text) => {
        let { html_content, plain_text } = this.state;
        html_content = html_content.concat(text.replace("<br>", " "))
        plain_text = plain_text.concat(text.replace("<br>", " "))
        this.setState({
            html_content,
            plain_text
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

    getNewsById(news_id) {
        makeRequest('get', '/admin/news/getNewsById', {
            id: news_id
        })
            .then(result => {
                if (result.signal) {
                    let currentNews = result.data;
                    this.setState({
                        id: currentNews.id,
                        title: currentNews.title,
                        description: currentNews.description,
                        html_content: currentNews.html_content,
                        image: currentNews.image,
                        plain_text: currentNews.plain_text,
                        category_id: currentNews.category_id,
                        status: currentNews.status ? true : false,
                        publish_date: currentNews.publish_date,
                        hot: currentNews.hot ? true : false,
                        count: this.state.count + 1
                    })
                }
            })
    }

    getCategory = () => {
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
    updateNews = (e) => {
        let { t } = this.props;
        e.preventDefault()
        let { id, title, description, html_content, plain_text, publish_date, status, category_id, hot, image } = this.state;
        if (!id || !title || !description || !html_content || !plain_text || !parseInt(category_id) || !publish_date) {
            return showErrorMessage("Vui lòng nhập đầy đủ thông tin")
        }
        makeRequest('post', '/admin/news/updateNews', {
            id,
            title,
            description,
            html_content,
            plain_text,
            image,
            category_id,
            publish_date,
            status: status ? 1 : 0,
            slug: changeToSlug(title),
            hot: hot ? 1 : 0
        })
            .then(res => {
                if (res.signal) {
                    showSuccessMessage("Cập nhật thành công")
                    this.props.history.push("/admin/news/listNews")
                } else {
                    showErrorMessage(res.message)
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
                    title="Sửa tin tức"
                    breadcrumb={[
                        { title: "Danh sách", link: '/news/listNews' },
                        { title: "Sửa tin tức", link: '' }
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
                                        <label className="control-label fontBold">Slug</label>
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
                                        <label className="control-label fontBold">Nội dung</label>
                                        <Editor
                                            type="small"
                                            editor_id="summernote-create-articles"
                                            data={dataEditor}
                                            changeContent={this.changeContent}
                                            onPasteContent={this.onPasteContent}
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
                                            text="Lưu"
                                            clickFunc={this.updateNews.bind(this)}
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

export default UpdateNews;