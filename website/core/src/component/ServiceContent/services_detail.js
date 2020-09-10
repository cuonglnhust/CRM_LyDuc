import React, { Component, Fragment } from 'react';
import { request } from '../../request'
import { showErrorMessage } from '../../request/notification'
import { withRouter } from 'react-router-dom'
import FormOder from '../Common/FormOderSub';
class services_detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: '',
            service_category_id: 0,
            name: '',
            description: '',
            count: 0,
            hotline: '',
            listContent: [],
            content: [
                {
                    title: 'Mô tả ngắn',
                    key: 'des_sort'
                },
                {
                    title: 'Danh mục',
                    key: 'menu'
                },
                {
                    title: 'Giới thiệu',
                    key: 'introduction'
                },
                {
                    title: 'Điểm mạnh',
                    key: 'strength'
                },
                {
                    title: 'Quy trình',
                    key: 'process'
                },
                {
                    title: 'Bảng giá cơ sở',
                    key: 'price'
                },
                {
                    title: 'Các dịch vụ cung cấp',
                    key: 'services_provided',
                },
                {
                    title: 'Thông tin liên hệ ',
                    key: 'contact',
                }
            ],
        }
    }
    componentDidMount() {
        this.getAbout();
        let { slug } = this.props.match.params;
        this.getInfoServices(slug)
        this.getServiceContent(slug)
    }
    componentWillReceiveProps(nextProps) {
        let next_slug = nextProps.match.params.slug || ''
        let { slug } = this.props.match.params || '';
        if (next_slug != '' && next_slug != slug || next_slug == slug) {
            this.getInfoServices(next_slug)
            this.getServiceContent(next_slug)
        } else {
            this.props.history.push('/services')
        }
    }
    showModal = (services_category_id, e) => {
        e.preventDefault();
        this.setState({
            services_category_id
        })
    }
    getServiceContent(slug) {
        request.makeRequest('get', '/api/services/getServicesContentAPI', { slug })
            .then(result => {
                if (result.signal) {
                    this.setState({
                        listContent: result.data.listServicesContent
                    })
                } else {
                    return showErrorMessage(result.message)
                }
            }).catch(err => {
                console.log(err)
            })
    }
    getAbout() {
        request.makeRequest("get", "/api/about/getAbout")
            .then(result => {
                if (result.signal) {
                    let listAbout = result.data;
                    this.setState({
                        hotline: listAbout.hotline,
                    })
                } else {
                    return showErrorMessage(result.message)
                }
            }).catch(err => {
                console.log(err)
            })
    }

    getInfoServices(slug) {
        request.makeRequest('get', '/api/services/getServicesCategoryBySlug', {
            slug
        })
            .then(result => {
                if (result.signal) {
                    let currentServices = result.data;
                    this.setState({
                        name: currentServices.title || '',
                        description: currentServices.description || '',
                        image: currentServices.image || '',
                        service_category_id: currentServices.id || ''
                    })
                }
            })
    }

    render() {
        let { name, description, image, listContent, content, service_category_id } = this.state;
        let renderContent = content.map((item, idx) => {
            let index = listContent.findIndex(it => it.key == item.key)
            let content = index > -1 ? listContent[index] : {}
            return (
                <div dangerouslySetInnerHTML={{ __html: content.data }} key={`content_${idx}`}></div>
            )
        })
        return (
            <Fragment>
                <section className="services-detail">
                    <div className="container">
                        <div className="clearfix">

                            <div className="sidebar" data-spy="affix" data-offset-top="620" data-offset-bottom="1710">
                                <div className="sidebar-services" id="sidebar-services">
                                    <div className="icon">
                                        <img src={image} alt="" className="img-responsive" />
                                    </div>
                                    <div className="font-Roboto-Medium font24 text-4f name">{name}</div>
                                    <p className="font-Roboto-Medium font16 text-4f des">{description}</p>
                                    <div className="font-Roboto-Medium font16 text-4f text-uppercase hotline">Hotline</div>
                                    <div className="font-Roboto-Bold font24 text-red hotline2">{this.state.hotline}</div>
                                    <button className="text-white text-center bg-green text-uppercase font-RobotoCondensed-Bold font22 btn-block order" data-toggle="modal" data-target="#modal-services-detail" onClick={this.showModal.bind(this, service_category_id)}>Đặt dịch vụ</button>
                                </div>
                            </div>

                            <div className="content-body" id="content-services">
                                <h1 className="name">{name}</h1>
                                <div>
                                    {renderContent}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <FormOder services_category_id={this.state.services_category_id} id_key='modal-services-detail' />
            </Fragment>
        );
    }
}

export default withRouter(services_detail);