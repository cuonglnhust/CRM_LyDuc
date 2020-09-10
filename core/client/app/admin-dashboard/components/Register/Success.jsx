import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class Success extends Component {
    render() {
        return (
            <div className="panel-body">
                <div className="text-center">
                    <div className="icon-object border-success text-success"><i className="icon-checkmark3" /></div>
                    <h4 className="content-group-lg">Đăng ký thành công</h4>
                    <Link to="/admin/login" className="btn bg-success-400">Quay lại đăng nhập</Link>
                </div>
                
            </div>
        );
    }
}

export default Success;