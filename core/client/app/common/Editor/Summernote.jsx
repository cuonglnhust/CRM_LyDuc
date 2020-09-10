import React, { Component } from 'react';
import ModalMedia from '../../admin-dashboard/components/Appearance/BoxMenu/ModalMedia';
class Summernote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowModal: false
        };
    }

    componentDidMount = () => {

        setTimeout(() => {
            this.initEditor();
        }, 1000);

    }

    changeContent(data) {
        this.props.changeContent(data);
    }

    initEditor() {
        let { data, type, editor_id } = this.props;
        let self = this;
        let { html_content } = data;
        type = type || 'small';
        let el_editor = $(`.${editor_id}`);
        if (type == 'small') {
            el_editor.summernote({
                lang: 'vi-VN',
                toolbar: [
                    ["style", ["style"]],
                    ['font', ['bold', 'italic', 'underline', 'clear']],
                    ['fontsize', ['fontsize']],
                    ['fontname', ['fontname']],
                    ['color', ['color']],
                    ['insert', ['link', 'picture', 'video']],
                    ["table", ["table"]],
                    ["view", ["fullscreen", "codeview", "help"]]
                ],
                fontsizes: ['8', '9', '10', '11', '12', '14', '16', '18', '24', '36', '48', '64', '82', '150']
                ,
                callbacks: {
                    onChange: function (contents, $editable) {
                        let plain_text = $('<div>' + contents + '</div>').text();
                        self.changeContent({
                            html_content: contents,
                            plain_text: plain_text,
                        });
                    },
                    // onPaste: function (e) {
                    //     let bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData("Text");
                    //     bufferText = bufferText.replace(/\r?\n/g, '<br>');
                    //     e.preventDefault();
                    //     setTimeout(function () {
                    //         el_editor.summernote('code', bufferText)
                    //     }, 10);
                    // }
                }
            });
        } else {
            el_editor.summernote({
                lang: 'vi-VN',
                // height: 400,
                callbacks: {
                    onChange: function (contents, $editable) {
                        let plain_text = $('<div>' + contents + '</div>').text();
                        self.changeContent({
                            html_content: contents,
                            plain_text: plain_text
                        });
                    },
                    // onPaste: function (e) {
                    //     let bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData("Text");
                    //     bufferText = bufferText.replace(/\r?\n/g, '<br>');
                    //     e.preventDefault();
                    //     setTimeout(function () {
                    //         el_editor.summernote('code', bufferText)
                    //     }, 10);
                    // }
                }
            });
        }
        if (html_content) {
            el_editor.summernote('code', html_content)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.count && nextProps.count !== this.props.count) {
            let { data, editor_id } = nextProps;
            let el_editor = $(`.${editor_id}`);
            let { html_content } = data;
            el_editor.summernote('code', html_content)
        }
    }

    clickImage(image) {
        let { editor_id } = this.props;
        let el_editor = $(`.${editor_id}`);
        if (image.mimetype.indexOf('image') > -1) {
            el_editor.summernote('editor.saveRange');
            el_editor.summernote('editor.restoreRange');
            el_editor.summernote('editor.focus');
            el_editor.summernote('insertImage', image.url, function ($image) {
                $image.css('margin', 15);
            });
        }
            else if (image.mimetype.indexOf('audio') > -1) {
                let markup = el_editor.summernote('code');
                let strAudio = `<div><audio src=${image.url} controls controlsList="nodownload"/></div>`
                el_editor.summernote('code', strAudio + markup);
            } else if (image.mimetype.indexOf('video') > -1) {
                let markup = el_editor.summernote('code');
                let strVideo = `<div><video width="100%" src=${image.url} controls controlsList="nodownload"/></div>`
                el_editor.summernote('code', strVideo + markup);
            }

        this.hideModal();
    }

    showModal() {
        this.setState({
            isShowModal: true
        });
    }

    hideModal() {
        this.setState({
            isShowModal: false
        });
    }

    render() {
        let { isShowModal } = this.state;
        let { editor_id } = this.props;
        return (
            <div className='form-group'>
                <div className="btn-group navbar-btn">
                    <button type="button" className="btn btn-default btn-sm" onClick={this.showModal.bind(this)}><i className="icon-media position-left"></i> Add Image/Video</button>
                </div>
                <div className={editor_id}></div>
                <ModalMedia
                    clickImage={this.clickImage.bind(this)}
                    isShowModal={isShowModal}
                    hideModal={this.hideModal.bind(this)}
                />
            </div>
        );
    }
}

export default Summernote;