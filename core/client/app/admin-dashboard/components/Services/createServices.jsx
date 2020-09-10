import React, { Component } from 'react';
import { changeToSlug } from '../../../libs/utils'
import {
    PageHeader,
    InputGroup,
    ButtonUpload,
} from '../Common/index'
import Collapse from '../../../common/Collapse/Collapse'
import ButtonLoader from '../../../common/Button/ButtonLoader'
import Switcher from 'react-switcher'
import { makeRequest } from '../../../libs/request';
import { showErrorMessage, showSuccessMessage } from '../../actions/notification';
import Select from 'react-select';

class CreateServices extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            services_sub: [],
            services_other: [],
            image: '',
            hot: false,
            listServices: [],
            listServicesSub: []
        },
            this.handleChangeSub = this.handleChangeSub.bind(this)
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
        let value = parseInt(target.value);
        this.handleInput(name, value)
    }
    changeDate(value, key) {
        this.handleInput(key, value)
    }
    changeHot = () => {
        this.setState({
            hot: !this.state.hot
        })
    }
    componentDidMount = () => {
        this.getListServices();
        this.getAllServices();
        document.body.classList.add("has-detached-right");
        document.body.classList.remove("has-detached-left");
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

    createServices = (e) => {
        e.preventDefault()
        let { title, description, services_other, services_sub, hot, image } = this.state;
        if (!title || !description || !services_other || !services_sub || !image) {
            return showErrorMessage("Vui lòng nhập đủ thông tin")
        }
        makeRequest('post', '/admin/services/createServicesCategory', {
            title,
            description,
            image,
            services_sub,
            services_other,
            image,
            slug: changeToSlug(title),
            hot: hot ? 1 : 0
        })
            .then(res => {
                if (res.signal) {
                    showSuccessMessage("Thêm dịch vụ thành công")
                    this.props.history.push("/admin/services/listServices")
                } else {
                    showErrorMessage(result.message)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    render() {
        let { listCategory, listServices, listServicesSub } = this.state;
        let optionsSub = []
        let optionsOther = []
        if (!listServicesSub.length) {
            optionsSub.push({ value: "0", label: "chọn dịch vụ" })
        } else {
            listServicesSub.map((sevices_sub, idxSub) => {
                optionsSub.push({ value: `${sevices_sub.id}`, label: `${sevices_sub.name}` })
            })
        }
        if (!listServices.length) {
            optionsOther.push({ value: "0", label: "chọn dịch vụ" })
        } else {
            listServices.map((sevices_other, idxOrther) => {
                optionsOther.push({ value: sevices_other.id, label: sevices_other.title })
            })
        }
        return (
            <div>
                <PageHeader
                    title="Tạo dịch vụ"
                    breadcrumb={[
                        { title: "Danh sách", link: '/services/listServices' },
                        { title: "Tạo dịch vụ", link: '' }
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
                                            text="Tạo"
                                            clickFunc={this.createServices.bind(this)}
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

export default CreateServices;