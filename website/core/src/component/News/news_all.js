import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { request } from '../../request'
import { showErrorMessage } from '../../request/notification'
import { formartOnlyDate } from '../../libs/until'
import NewsSearch from './news_search'

class NewsAll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listNews: [],
            title: '',

        }
    }
    componentDidMount() {
        window.scrollTo(0, 0);
    } 
    componentWillMount() {
        let { title } = this.state;
        this.getListNews(title)
    }
    
    getListNews(title) {
        request.makeRequest("get", `/api/news/getAllNewsByAllCategory`, {
            title
        })
            .then(result => {
                if (result.signal) {
                    let listNews = result.data;
                    this.setState({
                        listNews,
                        title,
                    })
                } else {
                    return showErrorMessage(result.message)
                }
            }).catch(err => {
                console.log(err)
            })
    }

    onChangeInputSearch = (key, value) => {
        this.setState({
            [key]: value
        });
    };
    limitText(str){
        let n = str.lastIndexOf(" ")
        return str.slice(0, n)
    }
    submitSearch = () => {
        let { title } = this.state;
        this.getListNews(title);
    };
    render() {
        let { listNews } = this.state
        let str =""
        let renderNewsAll = listNews.map((item, idx) => {
            let renderNews = item.listNews.map((news, idxnews) => {
                if (news.description.length < 215){
                    str = news.description
                }else{
                    str = this.limitText( news.description.slice(0, 215))
                }
                return (
                    <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4" key={`news__${idxnews}`}>
                        <div className="new">
                            <div className="thumb">
                                <a href={`/${news.slug}`}><img src={news.image} alt="" /></a>
                            </div>
                            <div className="name">
                                <a className="font-Roboto-Bold font22 text-4f" href={`/${news.slug}`}>{news.title}</a>
                            </div>
                            <div className="clearfix font11 text-black info">
                                <div className="avatar">
                                    <img src={news.user.avatar} alt="" />
                                </div>
                                <div className="author">by {news.user.user_name}</div>
                                <div className="time">{formartOnlyDate(news.createdAt)}</div>
                            </div>
                            <p className="font18 text4f des">{str}...</p>
                        </div>
                    </div>
                );
            })
            if((item.listNews.length < 1 || item.listNews == undefined)){
                return ""
            }else {
                return (
                    <section className="news-cats" key={`news-cats__${idx}`}>
                        <div className="container">
                            <div className="top clearfix">
                                <h2 className="font-Roboto-Medium font22 text-black">{item.title}</h2>
                                <a href={`/tin-tuc/${item.slug}`} className="font-Roboto-Medium font22">Xem tất cả</a>
                            </div>
                            <div className="bottom">
                                <div className="row">
                                    {renderNews}
                                </div>
                            </div>
                        </div>
                    </section>
                )
            }
            
        })

        return (
            <div>
                <NewsSearch
                    search={this.submitSearch}
                    onChangeInputSearch={this.onChangeInputSearch}
                    title={this.state.title}
                />
                {renderNewsAll}

            </div>
        );
    }
}
export default withRouter(NewsAll);