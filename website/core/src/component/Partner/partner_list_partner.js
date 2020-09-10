import React, { Component } from 'react';

import { Link, withRouter } from 'react-router-dom'
import {request} from '../../request'
import {showErrorMessage} from '../../request/notification'

class partner_list_partner extends Component {
    constructor(props) {
        super(props);
        this.state = {

            listPartner:[]
        }
    }
    componentWillMount() {
        request.makeRequest("get", "/api/partner/getListPartner")
            .then(result => {
                if (result.signal) {
                    let {listPartner} = result.data;
                    this.setState({
                        listPartner
                    })
                } else {
                    return showErrorMessage(result.message)
                }
            }).catch(err => {
                console.log(err)
            })

    }
    render() {
        let { listPartner } = this.state
        if (!listPartner.length) return (
            <tr>
                <td valign="top" colSpan="12" className="text-center">Không có dữ liệu hiển thị</td>
            </tr>
        );
        let RenderPartner = listPartner.map((item, idx) => {
            return (
                <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4" key={`partner_list_partner_${idx}`}>
                    <div className="unit">
                        <div className="thumb">
                            <img src={item.image} alt="" />
                        </div>
                        <div className="info">
                            <div className="content">
                                <div className="name">{item.name_partner}</div>
                                <a href={item.link_partner} className="address" target="_blank">{item.link_partner}</a>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
        return (
            <section className="partner-list-partner">
                <div className="container">
                    <div className="row">
                        {RenderPartner}
                    </div>
                </div>
            </section>
        );
    }
}

export default withRouter(partner_list_partner);