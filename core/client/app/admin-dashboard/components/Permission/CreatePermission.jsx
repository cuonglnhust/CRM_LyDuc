import React, { Component } from 'react';
import PageHeader from '../Common/PageHeader'
import InputGroup from '../Common/InputGroup'
import { makeRequest } from '../../../libs/request';
import { showErrorMessage, showSuccessMessage } from '../../actions/notification';

class CreateService extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            status: '0',
            action: '',
            object: '',
        }
    }

    handleInput = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    submitForm = (e) => {
        e.preventDefault()
        let { name, status, action, object } = this.state
        if (!name || !status || !action || !object) {
            return showErrorMessage('Vui lòng nhập đủ thông tin')
        }

        makeRequest('post', '/admin/permission/createPermission', { name, status, action, object })
            .then(result => {
                if (result.signal) {
                    showSuccessMessage('Thêm nhóm quyền thành công')
                    this.props.history.push('/admin/permission/list')
                } else {
                    showErrorMessage(result.message)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    onHandle = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <div>
                <PageHeader
                    title="Tạo mới quyền"
                    breadcrumb={[
                        { title: 'Danh sách quyền', link: '/permission/list' },
                        { title: 'Tạo mới', link: '' }
                    ]}
                />

                <div className="content">
                    <div className="panel panel-white">
                        <form className="form-horizonal" action="#" onSubmit={this.submitForm}>
                            <fieldset className="panel-body pb-10">

                                <div className="form-group">
                                    <label className="control-label fontBold">Tên quyền: <span className="text-danger">*</span></label>

                                    <InputGroup
                                        name="name"
                                        placeholder="Nhập tên quyền"
                                        icon="icon-compose"
                                        changeInput={this.handleInput}
                                    />

                                </div>

                                <div className="form-group">
                                    <label className="control-label fontBold">Trạng thái: <span className="text-danger">*</span></label>
                                    <select value={this.state.status} className='form-control' name='status' onChange={this.onHandle} >
                                        <option value={0}>Chờ duyệt</option>
                                        <option value={1}>Đã đồng ý</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="control-label fontBold">Hành động: <span className="text-danger">*</span></label>

                                    <InputGroup
                                        name="action"
                                        placeholder="Nhập tên hành động"
                                        icon="icon-power2"
                                        changeInput={this.handleInput}
                                    />

                                </div>

                                <div className="form-group">
                                    <label className="control-label fontBold">Đối tượng: <span className="text-danger">*</span></label>

                                    <InputGroup
                                        name="object"
                                        placeholder="Nhập tên đối tượng"
                                        icon="icon-point-right"
                                        changeInput={this.handleInput}
                                    />

                                </div>

                                <div className="form-group">
                                    <button type="submit" className="btn bg-blue">
                                        <i className="icon-envelop2 position-left"></i>
                                        Tạo quyền
                                    </button>
                                </div>

                            </fieldset>
                        </form>
                    </div>
                </div>


            </div>
        );
    }


}

export default CreateService;