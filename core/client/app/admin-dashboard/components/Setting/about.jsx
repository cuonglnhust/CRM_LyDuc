import React, { Component } from 'react';
import PageHeader from '../Common/PageHeader'
import { makeRequest } from '../../../libs/request';
import { validateMobile, validateEmail } from '../../../libs/utils';
import { showErrorMessage, showSuccessMessage } from '../../actions/notification';
import Editor from '../../../common/Editor/Summernote'
class SettingAbout extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            phone: '',
            hotline: '',
            mobile: '',
            email: '',
            address: '',
            facebook: '',
            icon: '',
            youtube: '',
            twitter: '',
            pinterest: '',
            id: 0,

        }
    }

    componentDidMount() {
        makeRequest('get', '/admin/about/getAbout')
            .then(result => {
                if (result.signal) {
                    let data = result.data;
                    this.setState({
                        name: data.name || '',
                        phone: data.phone || '',
                        hotline: data.hotline || '',
                        mobile: data.mobile || '',
                        email: data.email || '',
                        address: data.address || '',
                        facebook: data.facebook || '',
                        youtube: data.youtube || '',
                        twitter: data.twitter || '',
                        pinterest: data.pinterest || '',
                        id: data.id || 0
                    })
                }
            })
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitForm = (e) => {
        e.preventDefault()
        let { name, phone, hotline, mobile, email, address, facebook, youtube, twitter, id, pinterest } = this.state;
        if (phone.data && !validateMobile(phone.data)) {
            this.showErrorMessage("Vui lòng nhập số điện thoại", 'phone');
        }
        if (hotline.data && !validateMobile(hotline.data)) {
            this.showErrorMessage("Vui lòng nhập số điện thoại", 'hotline');
        }
        if (mobile.data && !validateMobile(mobile.data)) {
            this.showErrorMessage("Vui lòng nhập số điện thoại di động", 'mobile');
        }
        if (email.data && !validateEmail(email.data)) {
            this.showErrorMessage("Vui lòng nhập đúng định dạng email", 'email');
        }
        makeRequest('post', '/admin/about/updateAbout', {
            id,
            name,
            phone,
            hotline,
            mobile,
            email,
            address,
            facebook,
            youtube,
            twitter,
            pinterest
        })
            .then(res => {
                if (res.signal) {
                    showSuccessMessage("Cập nhật thành công")
                    this.props.history.push("/admin/setting/about")
                } else {
                    showErrorMessage(res.message)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    changeContent = (data) => {
        this.setState({
            address: data.html_content
        })
    }
    onPasteContent = (text) => {
        let { address } = this.state;
        address = html_content.concat(text.replace("<br>", " "))
        this.setState({
            address
        })
    }

    renderFromCreate() {
        let { address } = this.state
        let dataEditor = {
            html_content:address
        }
        
            return (
                <form className="form-horizonal" action="#" onSubmit={this.submitForm}>
                    <fieldset className="panel-body">

                        <div className="form-group">
                            <label className="control-label">Tên liên hệ</label>
                            <input type="text" className="form-control" name="name" placeholder="" onChange={this.handleInput.bind(this)} value={this.state.name} required />
                        </div>

                        <div className="form-group">
                            <label className="control-label">Cố định</label>
                            <input type="text" className="form-control" name="phone" placeholder="" onChange={this.handleInput.bind(this)} value={this.state.phone} required />
                        </div>

                        <div className="form-group">
                            <label className="control-label">Tổng đài</label>
                            <input type="text" className="form-control" name="hotline" placeholder="" onChange={this.handleInput.bind(this)} value={this.state.hotline} required />
                        </div>

                        <div className="form-group">
                            <label className="control-label">Di động</label>
                            <input type="text" className="form-control" name="mobile" placeholder="" onChange={this.handleInput.bind(this)} value={this.state.mobile} required />
                        </div>

                        <div className="form-group">
                            <label className="control-label">Email</label>
                            <input type="text" className="form-control" name="email" placeholder="" onChange={this.handleInput.bind(this)} value={this.state.email} required />
                        </div>

                        <div className="form-group">
                            <label className="control-label fontBold">Địa chỉ</label>
                            <Editor
                                type="small"
                                editor_id="summernote-create-articles"
                                data={dataEditor}
                                changeContent={this.changeContent}
                                onPasteContent={this.onPasteContent}
                            />
                        </div>

                        {/* <div className="form-group">
                        <label className="control-label">Địa chỉ</label>
                        <input type="text" name="address" placeholder="" className="form-control" onChange={this.handleInput.bind(this)} value={this.state.address} />
                    </div> */}

                        <div className="form-group">
                            <label className="control-label">Facebook</label>
                            <input type="text" className="form-control" name="facebook" placeholder="" onChange={this.handleInput.bind(this)} value={this.state.facebook} required />
                        </div>
                        <div className="form-group">
                            <label className="control-label">YouTube</label>
                            <input type="text" className="form-control" name="youtube" placeholder="" onChange={this.handleInput.bind(this)} value={this.state.youtube} required />
                        </div>
                        <div className="form-group">
                            <label className="control-label">Twitter</label>
                            <input type="text" className="form-control" name="twitter" placeholder="" onChange={this.handleInput.bind(this)} value={this.state.twitter} required />
                        </div>

                        <div className="form-group">
                            <label className="control-label">Pinterest</label>
                            <input type="text" className="form-control" name="pinterest" placeholder="" onChange={this.handleInput.bind(this)} value={this.state.pinterest} required />
                        </div>

                        <div className="media stack-media-on-mobile text-left">
                            <div className=" media-left media-middle text-nowrap">
                                <button type="submit" className="btn bg-teal-400"> Cập nhật</button>
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
                    title="Cài đặt thông tin"
                    breadcrumb={[
                        { title: "Cài đặt", link: '' }
                    ]}
                />

                <div className="content">
                    <div className="panel panel-flat">
                        <div className="panel-body">
                            {this.renderFromCreate()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SettingAbout;