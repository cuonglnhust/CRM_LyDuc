import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { request } from '../../request'
import { showErrorMessage } from '../../request/notification'
import FormOder from '../Common/FormOderSub';

class services_list_services extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listServicesCategory: [],
            isEditorOpen: false,
            services_category_id: 0
        }
    }
    componentWillMount() {
        this.getListServicesCategory();
    }

    getListServicesCategory() {
        request.makeRequest("get", "/api/services/getListServicesCategory")
            .then(result => {
                if (result.signal) {
                    let listServicesCategory = result.data.listServices
                    this.setState({
                        listServicesCategory
                    })
                } else {
                    return showErrorMessage(result.message)
                }
            }).catch(err => {
                console.log(err)
            })
    }

    showModal = (services_category_id, e) => {
        e.preventDefault() ;
        this.setState({
            services_category_id
        })
    }
    limitText(str){
        let n = str.lastIndexOf(" ")
        return str.slice(0, n)
    }
    render() {
        let { listServicesCategory} = this.state
        let renderService = listServicesCategory.map((item, idx) => {
            return (

                <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4" key={`services_list_services_${idx}`}>
                    <div className="unit">
                        <a className="view-all" href={`/dich-vu/${item.slug}`}></a>
                        <div className="thumb">
                            <a href={`/dich-vu/${item.slug}`}> <img src={item.image ? item.image : '/public/images/se1.jpg'} onError={(e) => { e.target.src = "/public/images/se1.jpg" }} /></a>
                        </div>
                        <h3 className="name"><a className="font-Roboto-Medium font24 text-4f" href={`/dich-vu/${item.slug}`} style ={{marginBottom : 10}}>{item.title}</a></h3>
                        <p className="font-Roboto-Medium font16 text-4f des" style ={{marginBottom : 20}}>{this.limitText( item.description.slice(0, 110))}...</p>
                        <button className="bg-green text-white font-Roboto-Medium font22 text-uppercase detail" data-toggle="modal" data-target="#modal-services-home" onClick={this.showModal.bind(this, item.id)} >Đặt dịch vụ</button>
                    </div>
                </div>
            )
        })
        return (
            <Fragment>
                <section className="services-list-services">
                    <div className="container">
                        <div className="row">
                            {renderService}
                        </div>
                    </div>
                </section>
                <FormOder services_category_id={this.state.services_category_id}  id_key='modal-services-home' />
            </Fragment>
        );
    }
}

export default withRouter(services_list_services);