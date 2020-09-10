import React, {Component, } from 'react';
import {connect} from 'react-redux';
import {showErrorMessage, } from '../../actions/notification';
import ChangePassword from './ChangePassword';
import ChangeInfo from './ChangeInfo';
import PageHeader from '../Common/PageHeader'
import { makeRequest } from '../../../libs/request'

class UserProfile extends Component {
    constructor(props) {
        super(props);
    }

    _onInputChangeValue(key, event) {
        let value  = event.target.value;
        this.setState({
            [key]: {
                data: value,
                error: ''
            } 
        });
    }

    getClassForm(key) {
        let dataForm = this.state[key];
        if (dataForm.error) {
            return 'form-group has-error'
        } else {
            return 'form-group';
        }
    }

    showErrorColumn(text, key) {
        this.setState({
            [key] : {
                ...this.state[key],
                error: text
            }
        });
    }

    handleUploadAvatar(e) {
        let file = e.target.files[0]
        var formData = new FormData()
        formData.append('file', file)

        makeRequest('post', '/upload/file', formData, {
            'Content-Type': 'multipart/form-data'
        }).then(result => {
            if (result.signal) {
                let { url } = result.data
                this.props.uploadSuccess(this.props.name, url)
            }
            else{
                showErrorMessage("Can't upload avatar");
            }
        })

        
    }

    render() {
        let {users} = this.props;
        let {profile} = users;
        return (
            <div>
                <PageHeader 
                    title="Cập nhật thông tin tài khoản"
                    breadcrumb={[
                        {title: 'Tài khoản', link: ''}
                    ]}
                />

                <div className="content">
                    <div className="panel panel-white">
                        <div className="panel-body">
                            <div className="row">

                            <div className="col-xs-12 col-sm-12 col-md-5 col-lg-3">
                                <div className="imgAvatarContainer">
                                <div className="imgAvatar">
                                    <img src={profile.avatar || '/images/anonymous.png'} alt="..." className="img-circle" />
                                </div>
                                </div>
                            </div>

                            <div className="col-xs-12 col-sm-12 col-md-7 col-lg-9">
                                <div className="tabbable">
                                <ul className="nav nav-tabs nav-tabs-highlight">
                                    <li className="active"><a href="#right-icon-tab1" data-toggle="tab"><i className="icon-info22"></i> Cập nhật thông tin</a></li>
                                    <li ><a href="#right-icon-tab2" data-toggle="tab"><i className="icon-lock4"></i> Đổi mật khẩu</a></li>
                                </ul>
                                <div className="tab-content">

                                    <ChangeInfo />

                                    <ChangePassword />

                                </div>
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

function mapStateToProps(state) {
    let {users} = state;
    return {
        users
    };
}

export default connect(mapStateToProps)(UserProfile);