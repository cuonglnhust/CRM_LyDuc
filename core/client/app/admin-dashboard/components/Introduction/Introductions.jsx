import React, { Component } from "react";
import PageHeader from "../Common/PageHeader";
import {
  showErrorMessage,
  showSuccessMessage
} from "../../actions/notification";
import { makeRequest } from "../../../libs/request";
import InputGroup from "../Common/InputGroup";
import Editor from '../../../common/Editor/Summernote';

class Introductions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allIntroductions: [],
      title: "",
      html_content: "",
      plain_text: "",
      type: "",
      count: 1,
      dataOpts: [
        {
          value: 1,
          label: 'Thợ'
        },
        {
          value: 0,
          label: 'Tổng thể'
        }
      ],
      idEdit: '',
    };
  }

  componentDidMount() {
    this.getListIntroductions()
  }

  getListIntroductions = () => {
    makeRequest("get", "/admin/introductions/getAllIntroductions").then(result => {
      if (result.signal) {
        this.setState({
          allIntroductions: result.data.allIntroductions
        });
      }
    });
  }

  changeContent = (data) => {
    this.setState({
      html_content: data.html_content,
      plain_text: data.plain_text
    })
  }

  onPasteContent = (text) => {
    let { html_content, plain_text } = this.state;
    html_content = html_content.concat(text.replace("<br>", " "))
    plain_text = plain_text.concat(text.replace("<br>", " "))
    this.setState({
      html_content,
      plain_text
    })
  }

  handleInput = (key, value) => {
    this.setState({
      [key]: value
    });
  };

  uploadSuccess = data => {
    this.setState({
      image: data.url
    });
  };

  changeText = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };


  onHandle = e => {
    e.preventDefault();
    let target = e.target;
    let title = target.name;
    let value = target.value;
    this.setState({
      [title]: value
    });
  };

  deleteIntroductions(introductions_id) {
    if (window.confirm("Bạn có chắc chắn muốn xóa!")) {
      makeRequest("post", "/admin/introductions/deleteIntroductions", {
        id: introductions_id
      })
        .then(result => {
          if (result.signal) {
            this.getListIntroductions();
            showSuccessMessage("Xóa thành công!");
          } else {
            showErrorMessage(result.message);
          }
        })
        .catch(err => {
          console.log("Error in delete Introductions", err);
        });
    }
  }

  renderIntroductions = () => {
    let content = this.state.allIntroductions.map((introductions, idx) => {
      return (
        <tr key={"introductions-" + idx}>
          <td>{introductions.title}</td>
          <td>{(introductions.type == 0 ? "Tổng thể" : "Thợ")}</td>
          <td>{introductions.plain_text ? introductions.plain_text.slice(0, 300) : ''} ...</td>
          <td className="text-center">
            <div className="">
              <button
                type="button"
                className="label label-primary"
                onClick={this.clickEdit.bind(this, introductions)}
              >
                <span className="icon-info22 position-left" />Sửa
              </button>
              <button
                type="button"
                className="label label-danger"
                onClick={this.deleteIntroductions.bind(this, introductions.id)}
              >
                <i className="icon-info22 position-left" />Xóa
              </button>
            </div>
          </td>
        </tr>
      );
    });

    return (
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th >Tiêu đề</th>
              <th >Đối tượng được xem</th>
              <th >Mô tả</th>
              <th className="fontBold col-md-4" style={{ textAlign: "center" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>
      </div>
    );
  };

  clickEdit = introductions => {
    this.setState({
      idEdit: introductions.id,
      title: introductions.title,
      html_content: introductions.html_content,
      plain_text: introductions.plain_text,
      type: introductions.type,
      count: this.state.count + 1
    });

    window.scrollTo(0, 0);
  };

  cancelEdit = () => {
    this.setState({
      title: "",
      plain_text: "",
      html_content: "",
      type: "",
      idEdit: '',
      count: this.state.count + 1
    });
  };

  submitForm = e => {
    e.preventDefault();
    let { title, html_content, plain_text, type, idEdit } = this.state;
    if (!title || !html_content || !plain_text || !type) {
      return showErrorMessage("Vui lòng nhập đầy đủ thông tin");
    }

    let dataPost = {
      title,
      html_content,
      plain_text,
      type
    };

    let url = "createIntroductions";

    if (idEdit) {
      dataPost.id = idEdit;
      url = "updateIntroductions";
    }

    makeRequest("post", `/admin/introductions/${url}`, dataPost).then(result => {
      if (result.signal) {
        let mess = idEdit ? "Cập nhật thành công" : "Thêm thông tin thành công";
        showSuccessMessage(mess);
        this.cancelEdit();
        let { allIntroductions } = this.state;
        if (idEdit) {
          this.setState(state => ({
            allIntroductions: state.allIntroductions.map(item => {
              if (item.id == idEdit) return result.data;
              return item;
            })
          }));
        } else {
          allIntroductions.push(result.data);
          this.setState({
            allIntroductions,
            type: '',
            idEdit: ''
          });
        }

      } else {
        showErrorMessage(result.message);
      }
    });
  };

  renderFromCreate() {
    let { idEdit, title, html_content, plain_text, dataOpts } = this.state;
    let renderSelect = dataOpts.map((item, index) => {
      return <option key={index} value={item.value}>{item.label}</option>
    })
    let dataEditor = {
      html_content,
      plain_text
    }
    return (
      <form className="form-horizonal" action="#" onSubmit={this.submitForm}>
        <fieldset className="panel-body">
          <div className="form-group">
            <label className="control-label fontBold">
              Tiêu đề: <span className="text-danger">*</span>
            </label>

            <InputGroup
              name="title"
              value={title}
              placeholder="Nhập tiêu đề"
              icon="icon-pen"
              type="text"
              changeInput={this.handleInput}
            />
          </div>

          <div className="form-group">
            <label className="control-label fontBold">
              Mô tả: <span className="text-danger">*</span>
            </label>

            <Editor
              type="small"
              editor_id="summernote-create-articles"
              data={dataEditor}
              changeContent={this.changeContent}
              onPasteContent={this.onPasteContent}
              count={this.state.count}
            />
          </div>

          <div className="form-group">
            <label className="control-label fontBold">
              Type: <span className="text-danger">*</span>
            </label>
            <select value={this.state.type} className="form-control" name="type" onChange={this.onHandle}>
              {renderSelect}
            </select>
          </div>

          <div className="media stack-media-on-mobile text-left">
            <div className=" media-left media-middle text-nowrap">
              <button type="submit" className="btn bg-teal-400">
                {" "}
                {idEdit ? "Cập nhật" : "Tạo"}
              </button>
              {idEdit ? (
                <button
                  type="button"
                  className="btn bg-warning ml-5"
                  onClick={this.cancelEdit.bind(this)}
                >
                  {" "}
                  Hủy bỏ
                </button>
              ) : (
                  ""
                )}
            </div>
          </div>
        </fieldset>
      </form>
    );
  }

  render() {
    return (
      <div>
        <PageHeader
          title="Thông tin giới thiệu"
          breadcrumb={[{ title: "Giới thiệu", link: "" }]}
        />

        <div className="content">
          <div className="row">
            <div className="col-xs-12 col-sm-12">
              <div className="col-md-4">
                <div className="panel panel-flat">
                  <div className="panel-body">{this.renderFromCreate()}</div>
                </div>
              </div>

              <div className="col-md-8">
                <div className="panel panel-flat">
                  <div className="panel-body">{this.renderIntroductions()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Introductions;
