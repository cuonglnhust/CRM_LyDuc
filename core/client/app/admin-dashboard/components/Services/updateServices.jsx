import React, { Component } from 'react';
import { changeToSlug } from '../../../libs/utils'
import {
    PageHeader,
    InputGroup,
    ButtonUpload
} from '../Common/index'
import Collapse from '../../../common/Collapse/Collapse'
import ButtonLoader from '../../../common/Button/ButtonLoader'
import Switcher from 'react-switcher'
import { makeRequest } from '../../../libs/request';
import { showErrorMessage, showSuccessMessage } from '../../actions/notification';
import Select from 'react-select';

class UpdateServices extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            title: '',
            description: '',
            services_sub: [],
            services_other: [],
            image: '',
            hot: false,
            listServices: [],
            listServicesSub: []
        }
    }

    componentDidMount = () => {
        this.getListServices();
        this.getAllServices();
        document.body.classList.add("has-detached-right");
        document.body.classList.remove("has-detached-left");
    }


    componentWillMount() {
        let { services_id } = this.props.match.params || 0;
        if (services_id) {
            this.getServicesCategoryById(services_id)
        } else {
            this.props.history.push('/admin/services/listServices')
        }
    }
    componentWillReceiveProps(nextProps, nextState) {
        let next_service_id = nextProps.match.params.service_id || 0
        let { service_id } = this.props.match.params || 0;
        if (next_service_id != 0 && next_service_id != service_id) {
            this.getServicesCategoryById(next_service_id)
        } else {
            this.props.history.push('/admin/services/listServices')
        }
    }

    handleInput = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    handleChangeSub = (e) => {
        this.setState({ services_sub: e })
    }

    handleChangeOther = (e) => {
        this.setState({ services_other: e })
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
    changeHot = () => {
        this.setState({
            hot: !this.state.hot
        })
    }

    getServicesCategoryById(services_id) {
        makeRequest('get', '/admin/services/getServicesCategoryById', {
            id: services_id
        })
            .then(result => {
                if (result.signal) {
                    let services = result.data;
                    this.setState({
                        id: services.id,
                        title: services.title,
                        description: services.description,
                        services_sub: services.services_sub,
                        services_other: services.services_other,
                        image: services.image,
                        hot: services.hot ? true : false
                    })
                }
            })
    }

    getAllServices() {
        makeRequest("get", "https://cms.laodonglyduc.com/api/apiWeb/service/allService")
            .then(result => {
                if (result.code == 200) {
                    let listServicesSub = result.data.services

                    this.setState({
                        listServicesSub,
                    })
                } else {
                    return showErrorMessage(result.message)
                }
            }).catch(err => {
                console.log(err)
            })
    }

    getListServices() {
        makeRequest("get", "/admin/services/getServicesCategory").then(result => {
            if (result.signal) {
                let listServices = result.data.listServices
                this.setState({
                    listServices
                });
            } else {
                return showErrorMessage(result.message)
            }
        }).catch(err => {
            console.log(err)
        })
    }

    updateService = (e) => {
        let { t } = this.props;
        e.preventDefault()
        let { id, title, description, services_other, services_sub, hot, image } = this.state;
        if (!id || !title || !description || !services_other || !services_sub || !image) {
            return showErrorMessage("Vui lòng nhập đầy đủ thông tin")
        }
        makeRequest('post', '/admin/services/updateServicesCategory', {
            id,
            title,
            description,
            services_other,
            services_sub,
            image,
            slug: changeToSlug(title),
            hot: hot ? 1 : 0
        })
            .then(res => {
                if (res.signal) {
                    showSuccessMessage("Cập nhật thành công")
                    this.props.history.push("/admin/services/listServices")
                } else {
                    showErrorMessage(res.message)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    render() {
        let { listServices, listServicesSub } = this.state;
        let optionsSub = []
        let optionsOther = []
        if (!listServicesSub.length) {
            optionsSub = [{ value: '0', label: 'không có dịch vụ nào' }]
        } else {
            listServicesSub.map((sevices_sub, idxSub) => {
                optionsSub.push({ value: `${sevices_sub.id}`, label: `${sevices_sub.name}` })
            })
        }
        if (!listServices.length) {
            optionsOther = [{ value: '0', label: 'không có dịch vụ nào' }]
        } else {
            listServices.map((sevices_other, idxOrther) => {
                optionsOther.push({ value: sevices_other.id, label: sevices_other.title })
            })
        }
        return (
            <div>
            <PageHeader
                title="Cập nhật dịch vụ"
                breadcrumb={[
                    { title: "Danh sách", link: 'admin/services/listServices' },
                    { title: "Cập nhật dịch vụ", link: '' }
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
                                        placeholder="Nhập tên dịch vụ"
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
                                        placeholder="Nhập mô tả ngắn của dịch vụ"
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

                                <div className='form-group'>

                                    <label className="control-label fontBold">Các dịch vụ con </label>
                                    <Select
                                        isMulti
                                        name="services_sub"
                                        value={this.state.services_sub}
                                        onChange={this.handleChangeSub}
                                        options={optionsSub}
                                        defaultValue={this.state.services_sub}
                                    />

                                </div>

                                <div className='form-group'>

                                    <label className="control-label fontBold">Các dịch vụ liên quan </label>
                                    <Select
                                        isMulti
                                        name="services_other"
                                        value={this.state.services_other}
                                        onChange={this.handleChangeOther}
                                        options={optionsOther}
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
                                        clickFunc={this.updateService.bind(this)}
                                    />
                                </div>
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

                    </div>
                </div>
            </div>
        </div>
        )

    }
}

export default UpdateServices;