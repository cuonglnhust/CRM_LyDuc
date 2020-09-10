import React, { Component } from 'react';
import Editor from '../../../common/Editor/Summernote'
import SkyModal from '../../../common/Modal/SkyModal'
import { makeRequest } from '../../../libs/request'
import { showErrorMessage, showSuccessMessage } from '../../actions/notification'
import { showLoading, hideLoading } from '../../actions/loading'
import PageHeader from "../Common/PageHeader";
class ServicesCategoryContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isEditorOpen: false,
            html_content: '',
            plain_text: '',
            editItem: {},
            title: '',
            content: [
                {
                    title: 'Mô tả ngắn',
                    key: 'des_sort',
                    isShow: false
                },
                {
                    title: 'Danh mục',
                    key: 'menu',
                    isShow: false
                },
                {
                    title: 'Giới thiệu',
                    key: 'introduction',
                    isShow: false
                },
                {
                    title: 'Điểm mạnh',
                    key: 'strength',
                    isShow: false
                },
                {
                    title: 'Quy trình',
                    key: 'process',
                    isShow: false
                },
                {
                    title: 'Bảng giá cơ sở',
                    key: 'price',
                    isShow: false
                },
                {
                    title: 'Các dịch vụ cung cấp',
                    key: 'services_provided',
                    isShow: false
                },
                {
                    title: 'Thông tin liên hệ ',
                    key: 'contact',
                    isShow: false
                }
            ],
            listContent: []
        }
    }

    componentWillMount = () => {
        let { service_id } = this.props.match.params;
        if (!service_id) {
            this.props.history.push('/admin/services/services_category')
        }
        this.getServiceContent(service_id)

    }

    getServiceContent = (service_id) => {
        showLoading();
        makeRequest('get', '/admin/services/getServiceContent', { service_category_id: service_id })
            .then(result => {
                hideLoading();
                if (result.signal) {
                    this.setState({
                        listContent: result.data.listServicesContent,
                        title : result.data.servicesCategory.title
                    })
                } else {
                    console.log("log for page service category content", result.message)
                }
            }).catch(err => {
                console.log("log for page service category content", err)
            })
    }

    renderContent = () => {
        let { content, listContent } = this.state;
        return content.map((item, idx) => {
            let index = listContent.findIndex(it => it.key == item.key)
            let content = index > -1 ? listContent[index] : {}
            return (
                <div style={{ marginBottom: '20px' }} key={`content_${idx}`}>
                    <div className="panel panel-body p-10">
                        <div className="media">
                            <div className="media-left"><i className={item.isShow ? "icon-arrow-down12" : "icon-arrow-up12"} onClick={this.toggleDetail.bind(this, idx, item.isShow)}></i></div>
                            <div className="media-body">
                                <h6 className="media-heading text-semibold" onClick={this.toggleDetail.bind(this, idx, item.isShow)} >{item.title}</h6>
                            </div>
                            <div className="heading-elements">
                                <div className="heading-btn">
                                    <button className="btn border-success text-success btn-flat btn-icon btn-rounded btn-xs mr-5" onClick={this.openEditor.bind(this, item, content.data)} >
                                        <i className="icon-pencil">
                                        </i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {item.isShow ? (
                            <div className="panel-body">
                                {content.data ? (
                                    <div dangerouslySetInnerHTML={{ __html: content.data }} />
                                ) : <p>Không có dữ liệu</p>}
                            </div>) : null}
                    </div>
                </div>
            )
        })
    }

    openEditor = (editItem, html_content) => {
        let plain_text = html_content ? html_content.innerHTML : '';
        this.setState({
            editItem,
            html_content: html_content || '',
            plain_text,
            isEditorOpen: true
        })
    }


    toggleDetail = (index, isShow) => {
        let { content } = this.state;
        content.map((it, idx) => {
            if (idx == index) {
                it.isShow = !isShow
            } else {
                it.isShow = false
            }
        })
        this.setState({
            content
        })
    }

    hideEditor = () => {
        this.setState({
            isEditorOpen: false,
            editItem: {},
            html_content: '',
            plain_text: ''
        })
    }

    changeContent = (data) => this.setState({
        html_content: data.html_content,
        plain_text: data.plain_text
    })

    submitEditIntro = () => {
        let {
            html_content,
            editItem,
        } = this.state
        let {
            service_id
        } = this.props.match.params
        if (!editItem || !editItem.key) return showErrorMessage('Không thể sửa nội dung lúc này!');
        showLoading();
        makeRequest('post', '/admin/services/updateServiceContent', {
            key: editItem.key,
            html_content,
            service_id
        })
            .then(result => {
                hideLoading();
                if (result.signal) {
                    this.getServiceContent(service_id);
                    showSuccessMessage('Sửa nội dung thành công')
                    this.hideEditor()
                } else {
                    return showErrorMessage('Có lỗi xảy ra!')
                }
            })
            .catch(err => showErrorMessage('Có lỗi xảy ra!'))
    }

    render() {
        let { html_content, plain_text, isEditorOpen, content, editItem ,title} = this.state;
        return (
            <div>
                <PageHeader
                    title={title}
                    breadcrumb={[
                        { title: "Danh sách nhóm dịch vụ", link: '/services/services_category' },
                        { title: "Nội dung", link: "" }
                    ]}
                />
                <div className="panel-group panel-group-control panel-group-control-right">
                    <ul>
                        {content.length ? this.renderContent() : null}
                    </ul>
                    <SkyModal
                        isShow={isEditorOpen}
                        handleHide={this.hideEditor.bind(this)}
                        hasButtonCancel={true}
                        hasButtonAction={true}
                        onClickAction={this.submitEditIntro.bind(this)}
                        textAction="Sửa nội dung"
                        title="Sửa nội dung"
                    >
                        <p>{editItem.title}</p>
                        <Editor
                            type="small"
                            editor_id={`summernote-exam-desc-${editItem.key}`}
                            data={{ html_content, plain_text }}
                            changeContent={this.changeContent.bind(this)}
                        />
                    </SkyModal>
                </div>
            </div>
        );
    }
}

export default ServicesCategoryContent;