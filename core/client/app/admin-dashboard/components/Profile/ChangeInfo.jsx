import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { validateMobile, validateEmail } from '../../../libs/utils';
import { updateUser } from '../../actions/users';
import { showErrorMessage, showSuccessMessage } from '../../actions/notification';
import ButtonLoader from '../../../common/Button/ButtonLoader';
import { makeRequest } from '../../../libs/request';
import ButtonUpload from '../Common/ButtonUpload'

class ChangeInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_name: {
                data: props.users.profile.user_name,
                error: ''
            },
            full_name: {
                data: props.users.profile.full_name,
                error: ''
            },
            mobile: {
                data: props.users.profile.mobile,
                error: ''
            },
            email: {
                data: props.users.profile.email,
                error: ''
            },
            id: {
                data: props.users.profile.id,
                error: ''
            },
            avatar: {
                data: props.users.profile.avatar,
                error: ''
            }
        }
    }

    componentWillReceiveProps(nextProps, nextState) {
        if (nextProps.users.profile !== this.props.users.profile) {
            this.setState({
                email: {
                    data: nextProps.users.profile.email,
                    error: ''
                },
                user_name: {
                    data: nextProps.users.profile.user_name,
                    error: ''
                },
                full_name: {
                    data: nextProps.users.profile.full_name,
                    error: ''
                },
                mobile: {
                    data: nextProps.users.profile.mobile,
                    error: ''
                },
                id: {
                    data: nextProps.users.profile.id,
                    error: ''
                },
                avatar: {
                    data: nextProps.users.profile.avatar,
                    error: ''
                }
            });
        }
    }

    _onInputChangeValue(key, event) {
        let value = event.target.value;
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
            [key]: {
                ...this.state[key],
                error: text
            }
        });
    }
    handleInput = (key, value) => {
        this.setState({
            [key]: {
                data: value
            }
        })
    }

    updateUserInfo() {
        let self = this;
        const { dispatch, users } = this.props;
        let { user_name, full_name, mobile, email, avatar } = this.state;
        if (!user_name.data) {
            this.showErrorColumn("Vui lòng nhập Tên đăng nhập", 'user_name');
            return;
        }

        if (!avatar.data) {
            this.showErrorColumn("Vui lòng chọn ảnh đại diện", 'avatar');
            return;
        }

        if (!full_name.data) {
            this.showErrorColumn("Vui lòng nhập họ và tên đầy đủ", 'full_name');
            return;
        }

        if (mobile.data && !validateMobile(mobile.data)) {
            this.showErrorColumn("Vui lòng nhập số điện thoại", 'mobile');
            return;
        }

        if (email.data && !validateEmail(email.data)) {
            this.showErrorColumn("Vui lòng nhập email", 'email');
            return;
        }
        makeRequest('post', '/admin/updateUserProfile', {
            id: users.profile.id,
            user_name: user_name.data,
            full_name: full_name.data,
            email: email.data,
            mobile: mobile.data,
            avatar: avatar.data,
        }).then(result => {
            self.setState({
                loadingInfo: false
            });
            if (result.signal) {
                showSuccessMessage("Cập nhật thông tin thành công");
                dispatch(updateUser(result.data));
            } else {
                showErrorMessage(result.message);
            }

        })
            .catch(err => {
                self.setState({
                    loadingInfo: false
                });
                showErrorMessage(err.message);
            });
    }

    render() {
        let { user_name, full_name, email, mobile, avatar } = this.state;
        let { users } = this.props;
        let { profile } = users;
        return (
            <div className="tab-pane fade in active" id="right-icon-tab1">

                <div className={this.getClassForm('user_name')}>
                    <p className="fontBold">Tên đăng nhập</p>
                    <div className="input-group">
                        <span className="input-group-addon"><span className="icon-user"></span></span>
                        <input
                            type='text'
                            className="form-control"
                            placeholder="Nhập Tên đăng nhập"
                            value={user_name.data}
                            onChange={this._onInputChangeValue.bind(this, 'user_name')}
                        />

                    </div>
                    {user_name.error ? (
                        <span className="help-block">{user_name.error}</span>
                    ) : ''}
                </div>
                <div className={this.getClassForm('full_name')}>
                    <p className="fontBold">Họ tên</p>
                    <div className="input-group">
                        <span className="input-group-addon"><span className="icon-user"></span></span>
                        <input
                            type='text'
                            className="form-control"
                            placeholder="Nhập họ tên"
                            value={full_name.data}
                            onChange={this._onInputChangeValue.bind(this, 'full_name')}
                        />

                    </div>
                    {full_name.error ? (
                        <span className="help-block">{full_name.error}</span>
                    ) : ''}
                </div>
                <div className={this.getClassForm('email')}>
                    <p className="fontBold">Email</p>
                    <div className="input-group">
                        <span className="input-group-addon"><span className="icon-envelop3"></span></span>
                        <input
                            type='email'
                            className="form-control"
                            placeholder="Nhập email"
                            value={email.data}
                            onChange={this._onInputChangeValue.bind(this, 'email')}
                        />
                    </div>
                    {email.error ? (
                        <span className="help-block">{email.error}</span>
                    ) : ''}
                </div>
                <div className={this.getClassForm('mobile')}>
                    <p className="fontBold">Số điện thoại</p>
                    <div className="input-group">
                        <span className="input-group-addon"><span className="icon-phone"></span></span>
                        <input
                            type='tel'
                            className="form-control"
                            placeholder="Nhập số điện thoại"
                            value={mobile.data}
                            onChange={this._onInputChangeValue.bind(this, 'mobile')}
                        />
                    </div>
                    {mobile.error ? (
                        <span className="help-block">{mobile.error}</span>
                    ) : ''}
                </div>
                <div className='form-group'>

                    <label className="control-label fontBold">Avatar </label>
                    <ButtonUpload
                        name="avatar"
                        uploadSuccess={this.handleInput}
                        value={avatar.data}
                    />

                </div>
                <div className="form-group">
                    <ButtonLoader text="Cập nhật" clickFunc={this.updateUserInfo.bind(this)} loading={this.state.loadingInfo} />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    let { users } = state;
    return {
        users
    };
}

export default connect(mapStateToProps)(ChangeInfo);