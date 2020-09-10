import React, { Component } from 'react';
import { formartOnlyDate } from '../../libs/until'
import { Link } from 'react-router-dom'
import { request } from '../../request'
import { showErrorMessage } from '../../request/notification'
import { FacebookProvider, Comments } from 'react-facebook';

class RecruitmentContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
            title: '',
            id: '',
            createdBy: 0,
            createdAt: '',
            listNews: [],
            avatar: '',
            username: '',
            html_content: '',
            plain_text: ''

        }
    }

    componentWillMount() {

        this.getListNews();
        let { slug } = this.props.match.params || '';
        if (slug) {
            this.getNewsByNewsSlug(slug)
        } else {
            this.props.history.push('/recruitment')
        }

    }



    componentWillReceiveProps(nextProps) {
        let next_slug = nextProps.match.params.slug || ''
        let { slug } = this.props.match.params || '';
        if (next_slug != '' && next_slug != slug || next_slug == slug) {
            this.getNewsByNewsSlug(next_slug)
        } else {
            this.props.history.push('/recruitment')
        }
    }

    getNewsByNewsSlug(slug) {
        request.makeRequest("get", `/api/news/getNewsByNewsSlug`, {
            slug: slug
        })
            .then(result => {
                if (result.signal) {
                    let news = result.data;
                    this.setState({
                        html_content: news.html_content,
                        plain_text: news.plain_text,
                        title: news.title,
                        id: news.id,
                        createdBy: news.createdBy,
                        createdAt: news.createdAt
                    })
                    this.getUserNews(news.createdBy);
                    this.getListNews(news.category_id);
                } else {
                    return showErrorMessage(result.message)
                }
            }).catch(err => {
                console.log(err)
            })
    }
    getListNews(category_id) {
        request.makeRequest("get", "/api/news/getListNewsContent", { limit: 4, category_id })
            .then(result => {
                if (result.signal) {

                    this.setState({
                        listNews: result.data
                    })
                } else {
                    return showErrorMessage(result.message)
                }
            }).catch(err => {
                console.log(err)
            })
    }
    getUserNews(createdBy) {
        request.makeRequest("get", "/api/getUserNews", {
            createdBy: createdBy
        })
            .then(result => {
                if (result.signal) {
                    let user = result.data;
                    this.setState({
                        avatar: user.avatar,
                        username: user.user_name
                    })
                } else {
                    return showErrorMessage(result.message)
                }
            }).catch(err => {
                console.log(err)
            })
    }


    render() {
        let { listNews, id } = this.state
        let list_news = listNews.filter(item => item.id != id);
        let renderNews = list_news.map((item, idx) => {
            if (idx == 3) {
                return null
            } else {
                return (
                    <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4" key={`recruitment_content__${idx}`}>
                        <div className="new">
                            <div className="thumb">
                                <img src={item.image} alt="" />
                            </div>
                            <div className="name">
                                <a href={`/tuyen-dung/${item.slug}`}>{item.title}</a>
                            </div>
                            <div className="info clearfix">
                                <div className="avatar">
                                    <img src={item.user.avatar} alt="" />
                                </div>
                                <div className="author">by {item.user.user_name}</div>
                                <div className="time">{formartOnlyDate(item.createdAt)}</div>
                            </div>
                            <p className="des">{item.description}</p>
                        </div>
                    </div>
                );
            }

        })
        let str = 'https://laodonglyduc.com' + this.props.location.pathname
        return (

            <div>
                <section className="news-detail">
                    <div className="container">
                        <h1 class="font36 text-black font-RobotoCondensed-Bold big-name">{this.state.title}</h1>
                        <div class="author-share clearfix">
                            <div class="info">
                                <div class="avatar">
                                    <img src={this.state.avatar} alt="" />
                                </div>
                                <div className="author">by {this.state.username}</div>
                                <div className="time">{formartOnlyDate(this.state.createdAt)}</div>
                            </div>
                            <div class="share">
                                <span>Chia sẻ: </span>
                                <ul class="list-inline">
                                    <li>
                                        <a href="https://www.facebook.com/sharer/sharer.php?u=https://laodonglyduc.com/tin-tuc/zczxc/"><img src="/public/images/icon/social8.png" alt="" />&nbsp;</a>
                                    </li>

                                    <li>
                                        <a href="https://twitter.com/share?ref_src=https://laodonglyduc.com/" className="twitter-share-button" data-text="Công ty TNHH nghiệp đoàn lao động Lý Đức" data-url="https://laodonglyduc.com/" data-hashtags="Lao động Lý Đức" data-show-count="false"><img src="/public/images/icon/social10.png" alt="" />&nbsp;</a>
                                        <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="article_content clearfix">
                            <div dangerouslySetInnerHTML={{ __html: this.state.html_content }}></div>

                        </div>
                    </div>
                </section>
                <section className="news-related">
                    <div className="text-center big-title">Có thể bạn quan tâm</div>
                    <div className="container">
                        <div className="row">
                            {renderNews}
                        </div>
                    </div>
                </section>
                <section className="home-comment">
                    <div className="text-center big-title " style={{ textAlign: "center" }}>Bình luận</div>
                    <div className="container">
                        <div className="fb-comments" data-href={`${str}`} data-width="100%" data-numposts="5"></div>
                    </div>

                </section>
            </div>
        );
    }
}

export default RecruitmentContent;