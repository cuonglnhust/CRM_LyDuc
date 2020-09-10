import React, { Component } from 'react'
import { Link ,withRouter} from 'react-router-dom'
import {request} from '../../request'
import {showErrorMessage} from '../../request/notification'
import {formartOnlyDate} from '../../libs/until'

class RecruitmentAll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listNews:[],
        }
    }

    componentWillMount() {
            this.getNewsRecruitment()
    }
    getNewsRecruitment(){
        request.makeRequest("get", `/api/news/getNewsRecruitment`)
            .then(result => {
                if (result.signal) {
                    this.setState({
                        listNews:result.data
                    })
                } else {
                    return showErrorMessage(result.message)
                }
            }).catch(err => {
                console.log(err)
            })
    }

    limitText(str){
        let n = str.lastIndexOf(" ")
        return str.slice(0, n)
    }
    render() {
        let {listNews} = this.state
        let renderNews = listNews.map((item, idx) =>{
            return(
                <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4" key={`new_cate_${idx}`}>
                    <div className="new">
                        <div className="thumb">
                            <a href={`/tuyen-dung/${item.slug}`}><img src={item.image} alt="" /></a>
                        </div>
                        <div className="name">
                            <a href={`/tuyen-dung/${item.slug}`} class="font-Roboto-Bold font22 text-4f">{item.title}</a>
                        </div>
                        <div className="clearfix font11 text-black info">
                            <div className="avatar">
                                <img src={item.user.avatar} alt="" />
                            </div>
                            <div className="author">by {item.user.user_name}</div>
                            <div className="time">{formartOnlyDate(item.createdAt)}</div>
                        </div>
                        <p className="font18 text4f des">{this.limitText( item.description.slice(0, 215))}...</p>
                    </div>
                </div>
                
        );
    })
 
    return(
        <div>
            <section className="news-cats v2">
            <div className="container">
                        <div className="top clearfix" style={{marginTop: 50}}>
                            <h2 className="font-Roboto-Medium font22 text-black">Tuyển dụng Lý Đức</h2>
                        </div>
                        <div className="bottom">
                            <div className="row">
                                {renderNews}
                            </div>
                            {/* <div className="watch-more">
                            <a href="#">Xem thêm</a>
                        </div> */}
                        </div>
                    </div>
            </section>
        </div>
        
    );
}
}
export default withRouter(RecruitmentAll);