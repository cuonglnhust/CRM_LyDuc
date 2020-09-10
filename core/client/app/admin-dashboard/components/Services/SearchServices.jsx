import React, { Component } from 'react';
import InputForm from '../Common/InputForm'
import { Link } from 'react-router-dom'

class SearchServices extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isSearch: false
        }
    }

    changeInput = (key, value) => {
        this.props.onChangeInputSearch(key, value)
    }

    submitSearch = (e) => {
        e.preventDefault();
        this.props.search();
    }

    render() {
        let { title } = this.props
        return (
            <div className="row">
                <form onSubmit={this.submitSearch.bind(this)}>
                    <div>
                        <div className="col-xs-12 col-sm-4 col-md-2" >
                            <div className="form-group">
                                <label className="control-label fontBold">Tên dịch vụ</label>
                                <InputForm
                                    placeholder="Nhập tên dịch vụ"
                                    name="title"
                                    value={title}
                                    changeInput={this.changeInput}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-4 col-md-3 col-lg-3">
                        <div className="form-group" style={{ marginTop: 27 }}>
                            <button type="submit" className="btn btn-primary"><span className="icon-zoomin3"></span> Tìm kiếm</button>
                        </div>
                    </div>

                    <div className="col-xs-12 col-sm-4 col-md-7 col-lg-7" style={{ textAlign: "right", marginTop: 27 }} >
                        <Link type="button" className="btn btn-success " to="/admin/services/createServices" >Tạo dịch vụ</Link>
                    </div>
                </form>
            </div>
        );
    }
}


export default SearchServices;
