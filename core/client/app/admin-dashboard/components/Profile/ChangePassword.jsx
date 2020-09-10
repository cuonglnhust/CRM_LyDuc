import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {changePassword} from '../../actions/users';
import {showErrorMessage, showSuccessMessage} from '../../actions/notification';
import ButtonLoader from '../../../common/Button/ButtonLoader';

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            old_password: {
                error: '',
                data: ''
            },
            password:{
                data: '',
                error: ''
            },
            confirm_password: {
                data: '',
                error: ''
            },
            loadingPass: false
        }
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

    updatePassword() {
        let self = this;
        let {old_password, password, confirm_password} = this.state;
        if (!old_password.data) {
          this.showErrorColumn("Vui lòng nhập mật khẩu cũ", 'old_password');
          return;
        }
    
        if (!password.data) {
          this.showErrorColumn("Vui lòng nhập mật khẩu mới", 'password');
          return;
        }
    
        if (!confirm_password.data) {
          this.showErrorColumn("Vui lòng nhập mật khẩu xác nhận", 'confirm_password');
          return;
        }
    
        if (password.data != confirm_password.data) {
          this.showErrorColumn("Mật khẩu xác nhận không đúng", 'confirm_password');
          return;
        }

        this.setState({
            loadingPass: true
        });
    
        changePassword({
            old_password: old_password.data,
            password: password.data
        }).then(result => {
                self.setState({
                    loadingPass: false
                });
                if (result.signal) {
                    showSuccessMessage("Thay đổi mật khẩu thành công");
                } else {
                    showErrorMessage(result.message);
                }
                
            })
            .catch(err => {
                self.setState({
                    loadingPass: false
                });
                showErrorMessage(err.message);
            });
      }

    render() {
        let {password, confirm_password, old_password} = this.state;
        let {users} = this.props;
        let {profile} = users;
        return (

            <div className="tab-pane fade" id="right-icon-tab2">
                <div className={this.getClassForm('old_password')}>
                    <p className="fontBold">Nhập mật khẩu cũ</p>
                    <div className="input-group">
                    <span className="input-group-addon"><span className="icon-lock4"></span></span>
                    <input
                        type='password'
                        className="form-control"
                        placeholder=""
                        value = {old_password.data}
                        onChange = {this._onInputChangeValue.bind(this, 'old_password')}
                        />
                        
                    </div>
                    {old_password.error ? (
                        <span className="help-block">{old_password.error}</span>
                    ) : ''}
                </div>
                <div className={this.getClassForm('password')}>
                    <p className="fontBold">Nhập mật khẩu mới</p>
                    <div className="input-group">
                    <span className="input-group-addon"><span className="icon-lock4"></span></span>
                    <input
                        type='password'
                        className="form-control"
                        placeholder=""
                        value = {password.data}
                        onChange = {this._onInputChangeValue.bind(this, 'password')}
                        />
                    </div>
                    {password.error ? (
                        <span className="help-block">{password.error}</span>
                    ) : ''}
                </div>
                <div className={this.getClassForm('confirm_password')}>
                    <p className="fontBold">Xác nhận mật khẩu mới</p>
                    <div className="input-group">
                    <span className="input-group-addon"><span className="icon-lock4"></span></span>
                    <input
                        type='password'
                        className='form-control'
                        placeholder=""
                        value = {confirm_password.data}
                        onChange = {this._onInputChangeValue.bind(this, 'confirm_password')}
                        />
                        
                    </div>
                    {confirm_password.error ? (
                        <span className="help-block">{confirm_password.error}</span>
                    ) : ''}
                </div>
                <div className="form-group">
                    <ButtonLoader text="Đổi mật khẩu" clickFunc={this.updatePassword.bind(this)} loading={this.state.loadingPass}/>
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

export default connect(mapStateToProps)(ChangePassword);