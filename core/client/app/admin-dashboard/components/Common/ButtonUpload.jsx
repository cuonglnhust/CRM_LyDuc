import React, { Component, Fragment } from 'react';
import { makeRequest } from '../../../libs/request'

class ButtonUpload extends Component {
    constructor(props) {
        super(props)
    }

    handleUpload = (e) => {
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
        })
    }

    render() {
        let { title } = this.props
        return (
            <Fragment>
                {/* <div className="form-group">
                    <label className="control-label fontBold display-block">{title}: <span className="text-danger">*</span></label>
                    <div className="uploader" style={{ width: '100px' }}>
                        <input type="file" className="file-styled" onChange={this.handleUpload} />
                        <span className="action btn bg-pink-400" style={{ userSelect: "none" }}>Chọn ảnh</span>
                    </div>
                    <span className="help-block">Accepted formats: png, jpg. Max file size 20Mb</span>
                </div> */}
                <div className="side-a">
                    <div className="ipn-file">
                        <input accept="image/*" name="file" id="file" type="file" onChange={this.handleUpload} className="inputfile" data-multiple-caption="{count} files selected" multiple={false} />
                        <label htmlFor="file">
                            <span>Chọn ảnh</span>
                        </label>
                    </div>
                </div>
                {this.props.value && (
                    <div className="form-group">
                        <div className="row">
                            <img
                                src={this.props.value}
                                width="96"
                                style={{ marginLeft: 10, marginTop: 10 }}
                                alt=""
                                onError={(e) => { e.target.src = "/images/medal.jpg" }}
                            />
                        </div>
                    </div>
                )}
            </Fragment>
        );
    }
}

export default ButtonUpload;