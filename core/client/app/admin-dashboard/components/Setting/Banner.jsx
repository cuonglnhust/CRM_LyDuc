import React, { Component } from "react";
import PageHeader from "../Common/PageHeader";
import {
  showErrorMessage,
  showSuccessMessage
} from "../../actions/notification";
import { makeRequest } from "../../../libs/request";
import InputGroup from "../Common/InputGroup";
import ButtonUpload from "../Common/ButtonUpload";


class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allBanner: [],
      image: "",
      active: 0,
      type: 0,
      idEdit: "",
      count: 1,
      dataOpts: [
        {
          value: 1,
          label: 'Desktop'
        },
        {
          value: 0,
          label: 'Mobile'
        }
      ],
    };
  }

  componentDidMount() {
    this.getLisBanner();
  }

  getLisBanner = () => {
    makeRequest("get", "/admin/banner/getAllBanner").then(result => {
      if (result.signal) {
        let { allBanner } = result.data;
        this.setState({
          allBanner: allBanner
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

  deleteBanner(banner_id) {
    if (window.confirm("Bạn có chắc chắn muốn xóa!")) {
      makeRequest("post", "/admin/banner/deleteBanner", {
        id: banner_id
      })
        .then(result => {
          if (result.signal) {
            this.getLisBanner();
            showSuccessMessage("Xóa thành công!");
          } else {
            showErrorMessage(result.message);
          }
        })
        .catch(err => {
          console.log("Error in delete banner", err);
        });
    }
  }


  renderBanner = () => {
    let content = this.state.allBanner.map((banner, idx) => {
      return (
        <tr key={"banner-" + idx}>
          <td>
            <img
              src={banner.image}
              className="img-circle img-xs position-left"
              alt=""
            />
          </td>
          <td>
            {banner.active == 0 ? (
              <span className="label label-primary">Ẩn</span>
            ) : (
                <span className="label label-success">Hiển Thị</span>
              )}
          </td>
          <td>{(banner.type == 1 ? "Desktop" : "Mobile")}</td>
          <td className="text-center">
            <div className="">
              <button
                type="button"
                className="label label-primary"
                style={{margin:4}}
                onClick={this.clickEdit.bind(this, banner)}
              >
                <i className="icon-info22 position-left" />Sửa
              </button>
              <button
                type="button"
                className="label label-danger"
                onClick={this.deleteBanner.bind(this, banner.id)}
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
              <th >Ảnh banner</th>
              <th >Trạng thái</th>
              <th >Đối tượng được hiển thị</th>
              <th className="fontBold col-md-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>
      </div>
    );
  };

  clickEdit = banner => {
    this.setState({
      idEdit: banner.id,
      image: banner.image,
      active: banner.active,
      type:banner.type,
      count: this.state.count + 1
    });

    window.scrollTo(0, 0);
  };

  cancelEdit = () => {
    this.setState({
      image: "",
      active: 0,
      idEdit: "",
      type:"",
      count: this.state.count + 1
    });
  };


  submitForm = e => {
    e.preventDefault();
    let {  image, active, idEdit, type } = this.state;
    if ( !image) {
      return showErrorMessage("Vui lòng nhập đầy đủ thông tin");
    }

    let dataPost = {
      image,
      active,
      type
    };

    let url = "createBanner";

    if (idEdit) {
      dataPost.id = idEdit;
      url = "updateBanner";
    }

    makeRequest("post", `/admin/banner/${url}`, dataPost).then(result => {
      if (result.signal) {
        let mess = idEdit ? "Cập nhật thành công" : "Thêm banner thành công";
        showSuccessMessage(mess);
        this.cancelEdit();
        let { allBanner } = this.state;
        if (idEdit) {
          this.setState(state => ({
            allBanner: state.allBanner.map(item => {
              if (item.id == idEdit) return result.data;
              return item;
            })
          }));
        } else {
          allBanner.push(result.data);
          this.setState({
            allBanner
          });
        }
      } else {
        showErrorMessage(result.message);
      }
    });
  };

  renderFromCreate() {
    let { idEdit, image, active, type, dataOpts } = this.state;
    let renderSelect = dataOpts.map((item, index) => {
      return <option key={index} value={item.value}>{item.label}</option>
    })
    return (
      <form className="form-horizonal" action="#" onSubmit={this.submitForm}>
        <fieldset className="panel-body">

          <div className='form-group'>

            <label className="control-label fontBold">Image </label>
            <ButtonUpload
              name="image"
              uploadSuccess={this.handleInput}
              value={image}
            />

          </div>

          <div className="form-group">
            <label className="control-label fontBold">
              Active: <span className="text-danger">*</span>
            </label>
            <select
              className="form-control"
              name="active"
              onChange={this.onHandle}
              value={active}
            >
              <option value={0}>Ẩn</option>
              <option value={1}>Hiển thị</option>
            </select>
          </div>

          <div className="form-group">
            <label className="control-label fontBold">
              Type: <span className="text-danger">*</span>
            </label>
            <select value={this.state.type} className="form-control" name="type" id="sel1" onChange={this.onHandle}> 
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
          title="Cài đặt banner"
          breadcrumb={[{ title: "Banner", link: "" }]}
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
                  <div className="panel-body">{this.renderBanner()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Banner;
