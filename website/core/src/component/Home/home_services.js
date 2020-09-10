import React, { Component, Fragment } from 'react';
import { request } from '../../request'
import { showErrorMessage } from '../../request/notification'
import { Link, withRoute } from 'react-router-dom'
import FormOder from '../Common/FormOderSub';
class home_services extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listServices: [],
            services_category_id: 0

        }
    }
    componentWillMount() {
        this.getListServices()
    }
    getListServices() {
        request.makeRequest("get", "/api/services/getListServicesHot")
            .then(result => {
                if (result.signal) {
                    this.setState({
                        listServices :result.data
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
        let { listServices} = this.state
        let renderServices = listServices.map((item, idx) => {
            return (
                <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4" key={`home_services_${idx}`}>
                    <div className="unit">
                        <div className="thumb">
                            <a href={`/dich-vu/${item.slug}`}>
                                <img src={item.image ? item.image : '/public/images/ser1.png'} onError={(e) => { e.target.src = "/public/images/ser1.png" }} />
                            </a>
                        </div>
                        <div style={{ height: 66}}><a href={`/dich-vu/${item.slug}`} className="font-Roboto-Medium font24 text-4f name">{item.title}</a></div>
                        <p style={{height: 155}}><a href={`/dich-vu/${item.slug}`} className="font16 text-4f des">{this.limitText( item.description.slice(0, 260))}...</a></p>
                        <button className="text-uppercase text-white bg-green btn-block font-RobotoCondensed-Bold font18 action" data-toggle="modal" data-target="#modal-services-home"onClick={this.showModal.bind(this, item.id)} >Đặt dịch vụ</button>
                    </div>
                </div>
            )
        })
        return (
            <Fragment>
                <section className="home-services">
                    <div className="body">
                        <div className="text-center text-uppercase text-green font-Roboto-Bold font48 big-title">Các dịch vụ</div>
                        <div className="text-center text-uppercase text-4f font-Roboto-Medium font24 sub-title">Dịch vụ nổi bật của Lý Đức</div>
                        <div className="line"></div>
                        <div className="container">
                            <div className="row">
                                {renderServices}
                            </div>
                        </div>
                        <div className="text-center">
                            <a href="/services" className="text-green text-uppercase font-RobotoCondensed-Bold font24 xtc">Tất cả dịch vụ</a>
                        </div>
                    </div>
                </section>

                <FormOder services_category_id={this.state.services_category_id} id_key='modal-services-home'/>
            </Fragment>
        );
    }
}

export default home_services;