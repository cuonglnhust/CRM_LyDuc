import React, { Component } from 'react';
import { request } from '../../libs'
import { showErrorMessage } from '../../libs/notification';

class home_company extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listPartner: []
        }
    }
    componentWillMount() {
        request.makeRequest("get", "/api/partner/getListPartner").then(result => {
            if (result.signal) {
                let { listPartner } = result.data;
                this.setState({
                    listPartner
                })
            } else {
                showErrorMessage(result.message)
            }
        })
    }
    render() {
        let { listPartner } = this.state
        let RenderPartner = listPartner.map((item, idx) => {
            return (
                // <div className="unit" key={`home_partner${idx}`}>
                //     <img src={item.image} alt=""/>
                // </div>
                <div className="unit buong" key={`home_partner${idx}`}>
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
            )
        })
        return (
            <section className="home-company">
                <div className="text-uppercase text-center font-Roboto-Bold font48 big-title">
                    <span className="text-green" style={{ margin: "5px" }}>Đối tác</span>
                    <span className="text-4f" style={{ margin: "5px" }}>của chúng tôi</span>
                </div>
                <p className="text-center font24 text-82 text-uppercase sub-title">Liên minh bền vững</p>
                <div className="list-brand">
                    {RenderPartner}
                </div>
            </section>
        );
    }
}

export default home_company;