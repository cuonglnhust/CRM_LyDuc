import React, { Component } from "react";
import PageHeader from "../Common/PageHeader";
import {
  showErrorMessage,
  showSuccessMessage
} from "../../actions/notification";
import { makeRequest } from "../../../libs/request";
import InputGroup from "../Common/InputGroup";
import Editor from '../../../common/Editor/Summernote'


class AppDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allAppDetail: [],
      html_content: '',
      plain_text: '',
      link_app_ios: "",
      link_app_android: "",
      type:"",
      idEdit: "",
      dataOpts: [
        {
          value: 1,
          label: 'Thợ'
        },
        {
          value: 0,
          label: 'Khách'
        }
      ],
      count: 1
    };
  }

  componentDidMount() {
    this.getListAppDetail();
  }

  getListAppDetail = () => {
    makeRequest("get", "/admin/appdetail/getAllAppDetail").then(result => {
      if (result.signal) {
        this.setState({
          allAppDetail: result.data.allAppDetail
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

  deleteAppDetail(appDetail_id) {
    if (window.confirm("Bạn có chắc chắn muốn xóa!")) {
      makeRequest("post", "/admin/appdetail/deleteAppDetail", {
        id: appDetail_id
      })
        .then(result => {
          if (result.signal) {
            this.getListAppDetail();
            showSuccessMessage("Xóa thành công!");
          } else {
            showErrorMessage(result.message);
          }
        })
        .catch(err => {
          console.log("Error in delete AppDetail", err);
        });
    }
  }


  renderAppDetail = () => {
    let content = this.state.allAppDetail.map((appDetail, idx) => {
      return (
        <tr key={"appDetail-" + idx}>
          
          <td>{appDetail.plain_text.slice(0, 300)}...</td>
          <td>{appDetail.link_app_android}</td>
          <td>{appDetail.link_app_ios}</td>
          <td>{(appDetail.type == 0 ? "Khách" : "Thợ")}</td>
          <td className="text-center">
            <div className="">
              <button
                type="button"
                className="label label-primary"
                style={{margin:4}}
                onClick={this.clickEdit.bind(this, appDetail)}
              >
                <i className="icon-info22 position-left" />Sửa
              </button>
              <button
                type="button"
                className="label label-danger"
                onClick={this.deleteAppDetail.bind(this, appDetail.id)}
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
              <th >Mô tả</th>
              <th >Link tải app android</th>
              <th >Link tải app android</th>
              <th >Đối tượng</th>
              <th className="fontBold col-md-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>
      </div>
    );
  };

  clickEdit = appDetail => {
    this.setState({
      idEdit: appDetail.id,
      type: appDetail.type,
      plain_text: appDetail.plain_text,
      html_content: appDetail.html_content,
      link_app_android: appDetail.link_app_android,
      link_app_ios: appDetail.link_app_ios,
      count: this.state.count + 1
    });

    window.scrollTo(0, 0);
  };

  cancelEdit = () => {
    this.setState({
      type: "",
      plain_text: "",
      html_content: "",
      link_app_android: "",
      link_app_ios: "",
      idEdit: "",
      count: this.state.count + 1
    });
  };


  submitForm = e => {
    e.preventDefault();
    let { type, html_content, plain_text, link_app_android, link_app_ios, idEdit } = this.state;
    if (type == null || !plain_text || !html_content || !link_app_android || !link_app_ios) {
      return showErrorMessage("Vui lòng nhập đầy đủ thông tin");
    }

    let dataPost = {
      type,
      plain_text,
      html_content,
      link_app_ios,
      link_app_android
    };

    let url = "createAppDetail";

    if (idEdit) {
      dataPost.id = idEdit;
      url = "updateAppDetail";
    }

    makeRequest("post", `/admin/appdetail/${url}`, dataPost).then(result => {
      if (result.signal) {
        let mess = idEdit ? "Cập nhật thành công" : "Thêm AppDetail thành công";
        showSuccessMessage(mess);
        this.cancelEdit();
        let { allAppDetail } = this.state;
        if (idEdit) {
          this.setState(state => ({
            allAppDetail: state.allAppDetail.map(item => {
              if (item.id == idEdit) return result.data;
              return item;
            })
          }));
        } else {
          allAppDetail.push(result.data);
          this.setState({
            allAppDetail
          });
        }
      } else {
        showErrorMessage(result.message);
      }
    });
  };

  renderFromCreate() {
    let { idEdit, html_content, plain_text, link_app_android, link_app_ios,dataOpts } = this.state;
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
              Đối tượng: <span className="text-danger">*</span>
            </label>
            <select className="form-control" name="type" id="sel1" onChange={this.onHandle} value={this.state.type}>
              <option value={''}>-Chọn Đối tượng-</option>
              {renderSelect}
            </select>
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
              Link tải app IOS : <span className="text-danger">*</span>
            </label>

            <InputGroup
              name="link_app_ios"
              value={link_app_ios}
              placeholder="Nhập link"
              icon="icon-pen"
              type="text"
              changeInput={this.handleInput}
            />
          </div>

          <div className="form-group">
            <label className="control-label fontBold">
              Link tải app Android : <span className="text-danger">*</span>
            </label>

            <InputGroup
              name="link_app_android"
              value={link_app_android}
              placeholder="Nhập link"
              icon="icon-pen"
              type="text"
              changeInput={this.handleInput}
            />
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
          title="Cài đặt AppDetail"
          breadcrumb={[{ title: "AppDetail", link: "" }]}
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
                  <div className="panel-body">{this.renderAppDetail()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AppDetail;
