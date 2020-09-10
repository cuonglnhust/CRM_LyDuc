import React, { Component } from 'react';
import {
    PageHeader,
    InputGroup,
} from '../Common/index'
import { showErrorMessage, showSuccessMessage } from '../../actions/notification'
import { makeRequest } from '../../../libs/request'


class CreateRole extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            status: 0,
            description: '',
        }
    }

    handleInput = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    submitForm = (e) => {
        e.preventDefault()
        let { name, status, description } = this.state
        if (!name || !status || !description) {
            return showErrorMessage('Vui lòng nhập đủ thông tin')
        }

        makeRequest('post', '/admin/role/createRole', {
            name,
            status: parseInt(status),
            description,
        })
            .then(result => {
                if (result.signal) {
                    showSuccessMessage('Thêm nhóm quyền thành công')
                    this.props.history.push(`/admin/user/rolePermission/${result.data.id}`)
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
                    title="Tạo mới nhóm quyền"
                    breadcrumb={[
                        { title: 'Danh sách nhóm quyền', link: '/user/listRole' },
                        { title: 'Tạo mới', link: '' }
                    ]}
                />

                <div className="content">
                    <div className="panel panel-white">
                        <form className="form-horizonal" action="#" onSubmit={this.submitForm}>
                            <fieldset className="panel-body pb-10">

                                <div className="form-group">
                                    <label className="control-label fontBold">Tên nhóm quyền: <span className="text-danger">*</span></label>

                                    <InputGroup
                                        name="name"
                                        placeholder="Nhập tên nhóm quyền"
                                        icon="icon-compose"
                                        changeInput={this.handleInput}
                                    />

                                </div>

                                <div className="form-group">
                                    <label className="control-label fontBold">Mô tả: <span className="text-danger">*</span></label>

                                    <InputGroup
                                        name="description"
                                        placeholder="Nhập mô tả"
                                        icon="icon-barcode2"
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
                                    <button type="submit" className="btn bg-blue">
                                        <i className="icon-envelop2 position-left"></i>
                                        Tạo nhóm quyền
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

export default CreateRole;