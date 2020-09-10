import React, { Component, Fragment } from 'react';
import { request } from '../../request'
import { showErrorMessage } from '../../request/notification'
import { withRouter } from 'react-router-dom'
import FormOderSUb from '../Common/FormOderSub';
class list_services extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listServices: [],
            id: 0,
            limit: 5,
            services_category_id_sub: 0
        }
    }
    componentDidMount() {
        let { slug } = this.props.match.params;
        this.getInfoServices(slug)
        this.click()
    }
    componentWillReceiveProps(nextProps) {
        let next_slug = nextProps.match.params.slug || ''
        let { slug } = this.props.match.params || '';
        if (next_slug != '' && next_slug != slug || next_slug == slug) {
            this.getInfoServices(next_slug)
            this.click()
        } else {
            this.props.history.push('/dich-vu')
        }
    }
    getInfoServices(slug) {
        request.makeRequest('get', '/api/services/getServicesCategoryBySlugSub', {
            slug
        })
            .then(result => {
                if (result.signal) {
                    this.setState({
                        listServices: result.data.services_sub_other
                    })
                }
            })
    }
    // componentWillMount() {
    //     let { limit } = this.state
    //     request.makeRequest("get", "/api/services/getListServicesCategory", {
    //         limit
    //     })
    //         .then(result => {
    //             if (result.signal) {
    //                 this.setState({
    //                     listServices: result.data
    //                 })
    //             } else {
    //                 return showErrorMessage(result.message)
    //             }
    //         }).catch(err => {
    //             console.log(err)
    //         })
    //     this.click()
    // }
    click() {
        window.scrollTo(0, 0)
    }
    showModal = (services_category_id_sub, e) => {
        e.preventDefault();
        this.setState({
            services_category_id_sub
        })
    }
    render() {
        let { listServices } = this.state
        let renderListServices = listServices.map((item, idx) => {
            if (idx == 4) {
                return null
            } else {
                return (

                    <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3" key={`list_services_${idx}`}>
                        <div className="snit">
                            <div className="thumb">
                                <a href={`/dich-vu/${item.slug}`}> <img className="services_thumb" src={item.image ? item.image : '/public/images/se1.jpg'} onError={(e) => { e.target.src = "/public/images/se1.jpg" }} /></a>
                            </div>
                            <div className="name" style={{marginBottom: 20}}>
                                <a className="font-Roboto-Medium font24 text-4f" href={`/dich-vu/${item.slug}`}>
                                    {item.title}
                                </a>
                            </div>
                            <button className="ddv" data-toggle="modal" data-target="#modal-services-list" onClick={this.showModal.bind(this, item.id)}>Đặt dịch vụ</button>
                        </div>
                    </div>
                )
            }

        })
        return (
            <Fragment>
                <section className="services-list-services" id="sticky-end">
                    <div className="container">
                        <div className="font-Roboto-Medium font22 text-black big-title">
                            <span>Một số dịch vụ tại Lý Đức</span>
                        </div>
                        <div className="row">
                            {renderListServices}
                        </div>
                    </div>
                </section>
                <FormOderSUb services_category_id={this.state.services_category_id_sub} id_key="modal-services-list" />
            </Fragment>
        );
    }
}

export default withRouter(list_services);