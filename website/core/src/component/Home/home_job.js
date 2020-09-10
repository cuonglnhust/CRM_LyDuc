import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { request } from '../../request'
import { showErrorMessage } from '../../request/notification'
class home_job extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customer_number:0,
            worker_number:0,
            job_number:0,
            
        }
    }
    componentWillMount(){
        this.getCusNumber()
        this.getCompleteWork()
        this.getSkillEmployee()
    }
    getCusNumber() {
        request.makeRequest("get", "https://cms.laodonglyduc.com/api/apiWeb/data/getNumberReview")
            .then(result => {
                if (result.code==200) {
                    this.setState({
                        customer_number: result.data.total_feedback
                    })
                } else {
                    return showErrorMessage(result.message)
                }
            }).catch(err => {
                console.log(err)
            })
    }
    getCompleteWork() {
        request.makeRequest("get", "https://cms.laodonglyduc.com/api/apiWeb/data/getCompleteWork")
            .then(result => {
                if (result.code==200) {
                    this.setState({
                        worker_number: result.data.total_complete_work
                    })
                } else {
                    return showErrorMessage(result.message)
                }
            }).catch(err => {
                console.log(err)
            })
    }
    getSkillEmployee() {
        request.makeRequest("get", "https://cms.laodonglyduc.com/api/apiWeb/data/getSkillEmployee")
            .then(result => {
                if (result.code==200) {
                    this.setState({
                        job_number: result.data.total_skill_employee
                    })
                } else {
                    return showErrorMessage(result.message)
                }
            }).catch(err => {
                console.log(err)
            })
    }
    render() {
        return (
            <section className="home-job">
                <ul className="list-inline text-center text-white list">
                    <li>
                        <div className="thumb">
                            <img src="/public/images/str5.png" alt=""/>
                        </div>
                        <div className="number">{this.state.customer_number + 523}</div>
                        <p className="des">Khách hàng hài lòng</p>
                    </li>
                    <li>
                        <div className="thumb">
                            <img src="/public/images/str6.png" alt=""/>
                        </div>
                        <div className="number">{this.state.job_number +556}</div>
                    <p className="des">Thợ lành nghề</p>
                    </li>
                    <li>
                        <div className="thumb">
                            <img src="/public/images/str7.png" alt=""/>
                        </div>
                        <div className="number">{this.state.worker_number+3157}</div>
                        <p className="des">Đầu việc đã hoàn thành</p>
                    </li>
                </ul>
            </section>
        );
    }
}

export default home_job;