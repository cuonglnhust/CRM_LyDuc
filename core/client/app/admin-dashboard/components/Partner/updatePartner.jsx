import React, { Component } from 'react';
import { makeRequest } from '../../../libs/request'
import {
    showErrorMessage,
    showSuccessMessage
} from '../../actions/notification'
import {
    PageHeader,
    InputGroup,
    ButtonUpload
} from '../Common/index'

class UpdatePartner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            name_partner: '',
            link_partner: '',
            image: ''

        }
    }

    componentWillMount() {
        let { partner_id } = this.props.match.params || 0;
        if (partner_id) {
            this.getPartnerById(partner_id)
        } else {
            this.props.history.push('/admin/partner/listPartner')
        }
    }
    componentWillReceiveProps(nextProps, nextState) {
        let next_partner_id = nextProps.match.params.partner_id || 0;
        let { partner_id } = this.props.match.params || 0;
        if (next_partner_id != partner_id) {
            if (next_partner_id) {
                this.getPartnerById(next_partner_id)
            } else {
                this.props.history.push('/admin/partner/listPartner')
            }
        }
    }

    getPartnerById(partner_id) {
        makeRequest('get', '/admin/partner/getPartnerById', {
            id: partner_id
        })
            .then(result => {
                if (result.signal) {
                    let currentPartner = result.data;
                    this.setState({
                        id: currentPartner.id,
                        name_partner: currentPartner.name_partner || '',
                        link_partner: currentPartner.link_partner || '',
                        image: currentPartner.image || ''

                    })
                }
            })
    }
    handleInput = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    changeInput = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        let { id, name_partner, link_partner, image } = this.state
        if (!id || !name_partner || !link_partner || !image) {
            return showErrorMessage('Vui lòng điền đẩy đủ thông tin')
        }
        makeRequest('post', '/admin/partner/updatePartner', {
            id,
            name_partner,
            link_partner,
            image
        })
            .then(result => {
                if (result.signal) {
                    showSuccessMessage("Cập nhật thành công")
                    this.props.history.push('/admin/partner/listPartner')
                } else {
                    showErrorMessage(result.message)
                }
            }).catch(err => {
                console.log("Error in update Partner", err)
            })

    }

    render() {
        return (
            <div>
                <PageHeader
                    title="Cập nhật đối tác"
                    breadcrumb={[
                        { title: "Danh sách", link: '/partner/listPartner' },
                        { title: "Cập nhật đối tác", link: '' }
                    ]}
                />
                <div className="content">
                    <div className="panel panel-white">
                        <form className="form-basic ui-formwizard" action="#" onSubmit={this.onSubmit}>

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
                                                            changeInput={this.changeInput}
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
                                                            changeInput={this.changeInput}
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
                                                        <button type="submit" className="btn btn-large btn-block btn-primary" style={{ width: "10%" }}>Cập nhật</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default UpdatePartner;