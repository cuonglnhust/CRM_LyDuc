import React, { Component } from 'react';
import {
    PageHeader,
    InputGroup,
    ButtonUpload
} from '../Common/index'
import { makeRequest } from '../../../libs/request';
import { showErrorMessage, showSuccessMessage } from '../../actions/notification';


class CreatePartner extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name_partner: '',
            link_partner: '',
            image: ''
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

    createPartner = (e) => {
        e.preventDefault()
        let { name_partner, link_partner, image } = this.state;
        if (!name_partner || !link_partner || !image) {
            return showErrorMessage("Vui lòng nhập đủ thông tin")
        }
        makeRequest('post', '/admin/partner/createPartner', {
            name_partner,
            link_partner,
            image
        })
            .then(res => {
                if (res.signal) {
                    showSuccessMessage("Thêm đối tác thành công")
                    this.props.history.push("/admin/partner/listPartner")
                } else {
                    showErrorMessage(result.message)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    render() {

        return (
            <div>
                <PageHeader
                    title="Tạo đối tác"
                    breadcrumb={[
                        { title: "Danh sách", link: '/partner/listPartner' },
                        { title: "Tạo đối tác", link: '' }
                    ]}
                />

                <form className="form-basic ui-formwizard" action="#" onSubmit={this.createPartner}>

                    <fieldset className="step ui-formwizard-content">
                        <div className="content col-md-12">
                            <div className="container-detached ">
                                <div className="content-detached">
                                    <div className="panel">
                                        <div className="panel-body">
                                            <div className='form-group'>
                                                <label className="control-label fontBold">Tên đối tác <span className="text-danger">*</span></label>
                                                <InputGroup
                                                    name="name_partner"
                                                    type="text"
                                                    placeholder="Nhập tên đối tác"
                                                    icon="icon-quill4"
                                                    value={this.state.name_partner}
                                                    changeInput={this.handleInput}
                                                />
                                            </div>
                                            <div className='form-group'>
                                                <label className="control-label fontBold">Website đối tác<span className="text-danger">*</span></label>
                                                <InputGroup
                                                    name="link_partner"
                                                    type="text"
                                                    placeholder="Nhập website đối tác"
                                                    icon="icon-quill4"
                                                    value={this.state.link_partner}
                                                    changeInput={this.handleInput}
                                                />

                                            </div>
                                            <div className="form-group">
                                                <label className="control-label fontBold"></label>
                                                <ButtonUpload
                                                    name="image"
                                                    uploadSuccess={this.handleInput}
                                                    title="Logo đối tác"
                                                    value={this.state.image}
                                                />
                                            </div>
                                            <div className="form-group" style={{ marginTop: "20px" }}>
                                                <button type="submit" className="btn btn-large btn-block btn-primary" style={{ width: "10%" }}>Tạo</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>




                    </fieldset>
                </form>

            </div>
        );
    }
}

export default CreatePartner;