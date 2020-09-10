import React, {Component} from 'react';

class Denied extends Component {
    render() {
        return(
            <div className="panel panel-flat">
                <div className="panel-body">
                    <div className="row">
                        <div className="col-xs-12 col-md-12">
                            <div className="text-center">
                                <div className="icon-object border-danger text-danger"><i className="icon-warning"></i></div>
                                <h5 className="text-semibold">Permission Denied!</h5>
                                <p className="mb-15">Bạn không có quyền truy cập sử dụng hệ thống</p>
                                <a href="/admin/logout" className="btn btn-w-m btn-danger" style={{minWidth: '100px'}}>Thoát</a>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Denied;