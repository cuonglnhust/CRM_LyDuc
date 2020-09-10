import React, { Component } from "react";
import PageHeader from "../Common/PageHeader";
import {
  showErrorMessage,
  showSuccessMessage
} from "../../actions/notification";
import { makeRequest } from "../../../libs/request";
import InputGroup from "../Common/InputGroup";
import ButtonUpload from "../Common/ButtonUpload";

class ProcessService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allProcessService: [],
      step_number: "",
      name: "",
      description: "",
      image: "",
      idEdit:"",
      count: 1,
    };
  }

  componentDidMount() {
    this.getListProcessService()
  }

  getListProcessService = () => {
    makeRequest("get", "/admin/process/getAllProcessService").then(result => {
      if (result.signal) {
        this.setState({
          allProcessService: result.data.allProcessService
        });
      }
    });
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

  deleteProcessService(processService_id) {
    if (window.confirm("Bạn có chắc chắn muốn xóa!")) {
      makeRequest("post", "/admin/process/deleteProcessService", {
        id: processService_id
      })
        .then(result => {
          if (result.signal) {
            this.getListProcessService();
            showSuccessMessage("Xóa thành công!");
          } else {
            showErrorMessage(result.message);
          }
        })
        .catch(err => {
          console.log("Error in delete ProcessService", err);
        });
    }
  }

  renderProcessService = () => {
    let content = this.state.allProcessService.map((processService, idx) => {
      return (
        <tr key={"processService-" + idx}>
          <td>{processService.step_number}</td>
          <td>
            <img
              src={processService.image}
              className="img-circle img-xs ProcessService-left"
              alt=""
            />
          </td>
          <td>{processService.name}</td>
          <td>{processService.description.slice(0, 500)} ...</td>
          <td className="text-center">
            <div className="">
              <button
                type="button"
                className="label label-primary"
                onClick={this.clickEdit.bind(this, processService)}
              >
                <span className="icon-info22 position-left" />Sửa
              </button>
              <button
                type="button"
                className="label label-danger"
                onClick={this.deleteProcessService.bind(this, processService.id)}
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
              <th >Step_Number</th>
              <th >Ảnh</th>
              <th >Tên Bước</th>
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

  clickEdit = processService => {
    this.setState({
      idEdit: processService.id,
      name: processService.name,
      description: processService.description,
      step_number: processService.step_number,
      image: processService.image,
      count: this.state.count + 1
    });

    window.scrollTo(0, 0);
  };

  cancelEdit = () => {
    this.setState({
      name: "",
      description: "",
      step_number: "",
      image: "",
      count: this.state.count + 1,
      idEdit:""
    });
  };

  submitForm = e => {
    e.preventDefault();
    let { name, description, image, step_number, idEdit } = this.state;
    if (!name || !description || !step_number || !image) {
      return showErrorMessage("Vui lòng nhập đầy đủ thông tin");
    }

    let dataPost = {
      name,
      description,
      step_number,
      image
    };

    let url = "createProcessService";

    if (idEdit) {
      dataPost.id = idEdit;
      url = "updateProcessService";
    }

    makeRequest("post", `/admin/process/${url}`, dataPost).then(result => {
      if (result.signal) {
        let mess = idEdit ? "Cập nhật thành công" : "Thêm quy trình thành công";
        showSuccessMessage(mess);
        this.cancelEdit();
        let { allProcessService } = this.state;
        if (idEdit) {
          this.setState(state => ({
            allProcessService: state.allProcessService.map(item => {
              if (item.id == idEdit) return result.data;
              return item;
            })
          }));
        } else {
          allProcessService.push(result.data);
          this.setState({
            allProcessService,
            idEdit:""
          });
        }
      } else {
        showErrorMessage(result.message);
      }
    });
  };

  renderFromCreate() {
    let { idEdit, step_number, name, description, image } = this.state
    return (
      <form className="form-horizonal" action="#" onSubmit={this.submitForm}>
        <fieldset className="panel-body">
          <div className="form-group">
            <label className="control-label fontBold">
              Thứ tự trong quy trình: <span className="text-danger">*</span>
            </label>

            <InputGroup
              name="step_number"
              value={step_number}
              placeholder="Nhập thứ tự"
              icon="icon-pen"
              type="number"
              changeInput={this.handleInput}
            />
          </div>

          <div className='form-group'>

            <label className="control-label fontBold">Image: <span className="text-danger">*</span></label>
            <ButtonUpload
              name="image"
              uploadSuccess={this.handleInput}
              value={image}
            />

          </div>

          <div className='form-group'>

            <label className="control-label fontBold">Mô tả: <span className="text-danger">*</span></label>
            <InputGroup
              name="description"
              type="text"
              icon="icon-quill4"
              placeholder="Nhập mô tả"
              changeInput={this.handleInput}
              value={description}
            />

          </div>

          <div className='form-group'>

            <label className="control-label fontBold">Tên Bước: <span className="text-danger">*</span></label>
            <InputGroup
              name="name"
              type="text"
              icon="icon-quill4"
              placeholder="Nhập mô tả"
              changeInput={this.handleInput}
              value={name}
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
          title="Quy trình đăng kí dịch vụ"
          breadcrumb={[{ title: "ProcessService", link: "" }]}
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
                  <div className="panel-body">{this.renderProcessService()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProcessService;
