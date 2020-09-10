import React, { Component } from 'react';
import { request } from '../../request'
import { showErrorMessage } from '../../request/notification'
class landing_strong extends Component {
    constructor(props){
        super(props);
        this.state = {
            listStrengths:[],
        }
    }
    componentWillMount() {
        this.getListStrengths()
    }
    getListStrengths() {
        request.makeRequest("get", "/api/strengths/getStrengthsByWorker")
            .then(result => {
                if (result.signal) {
                    this.setState({
                        listStrengths: result.data
                    })
                } else {
                    return showErrorMessage(result.message)
                }
            }).catch(err => {
                console.log(err)
            })
    }
    render() {
        let {listStrengths} = this.state
        let renderStrong = listStrengths.map((item, idx)=>{
            return(
                <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4"  key={`landing_strong_${idx}`}>
                    <div className="unit">
                        <div className="thumb">
                            <img src={item.image} alt=""/>
                        </div>
                        <div className="font-Roboto-Medium font24 text-black name">{item.title} </div>
                        <p className="font16 text-black des">{item.plain_text} </p>
                    </div>
                </div>
            )
        })
        return (
            <section className="landing-strong">
        <div className="container">
            <div className="row">
                {renderStrong}
            </div>
        </div>
    </section>
        );
    }
}

export default landing_strong;