import React, { Component, Fragment } from 'react';
import { formartOnlyDate } from '../../libs/until'
import { Link } from 'react-router-dom'
import { request } from '../../request'
import { showErrorMessage } from '../../request/notification'
import { FacebookProvider, Comments } from 'react-facebook';
import NewsSlider from './news_slide'
import Social from '../Social'
class NewsContent extends Component {
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
            plain_text: '',
            category_title: '',
            listNewsHot: []
        }
    }

    componentWillMount() {


        let { slug } = this.props.match.params || '';
        if (slug) {
            this.getNewsByNewsSlug(slug)
        } else {
            this.props.history.push('/tin-tuc')
        }

    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    componentWillReceiveProps(nextProps) {
        let next_slug = nextProps.match.params.slug || ''
        let { slug } = this.props.match.params || '';
        if (next_slug != '' && next_slug != slug || next_slug == slug) {
            this.getNewsByNewsSlug(next_slug)
        } else {
            this.props.history.push('/tin-tuc')
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
                        createdAt: news.createdAt,
                        category_title: news.category.title
                    })
                    this.getUserNews(news.createdBy);
                    this.getListNews(news.category_id);
                    this.getListNewsHotByCategory(news.category_id)
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

    getListNewsHotByCategory(category_id) {
        request.makeRequest("get", "/api/news/getListNewsHotByCategory", { category_id })
            .then(result => {
                if (result.signal) {

                    this.setState({
                        listNewsHot: result.data
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
        let { listNews, id, listNewsHot } = this.state
        let new_id = id;
        let list_news = listNews.filter(item => item.id != new_id);
        let renderNews = list_news.map((item, idx) => {
            if (idx == 3) {
                return null
            } else {
                return (
                    <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4" key={`news_content__${idx}`}>
                        <div className="new">
                            <div className="thumb">
                                <img src={item.image} alt="" />
                                {/* <div className="group-tags">
                                    <a href="#" className="tag tag1">#Tag 1</a>
                                    <a href="#" className="tag tag2">#Tag 2</a>
                                </div> */}
                            </div>
                            <div className="name">
                                <a href={`/${item.slug}`} onClick={scroll(0, 50)}>{item.title}</a>
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

        let renderNewsHot = listNewsHot.map((news_category, idx1) => {
            
            let renderNewsSub = !news_category.length ? news_category.list_news.map((news, idx2) => {
                if (news_category.category.isRecruitment == 0) {
                    return (
                        <div className="wp-item-tin-sidebar" key={`news_sub__${idx2}`}>
                            <div className="wp-img-item-tin">
                                <a href={`/${news.slug}`}><img src={news.image} alt="" /></a>
                            </div>
                            <div className="wp-text-tin-sidebar">
                                <h3 className="h3-title"><a href={`/${news.slug}`}>{news.title}</a></h3>
                            </div>
                        </div>
                    )

                } else {
                    return (
                    <div className="wp-item-tin-sidebar" key={`news_sub__${idx2}`}>
                        <div className="wp-img-item-tin">
                            <a href={`/tuyen-dung/${news.slug}`}><img src={news.image} alt="" /></a>
                        </div>
                        <div className="wp-text-tin-sidebar">
                            <h3 className="h3-title"><a href={`/tuyen-dung/${news.slug}`}>{news.title}</a></h3>
                        </div>
                    </div>
                    )
                }
            }) : ''
            if ((news_category.list_news.length < 1 || news_category.list_news == undefined)) {
                return ""
            } else {
                if (news_category.category.isRecruitment == 0) {
                    return (
                        <div className="wp-box-sidebar box1" key={`news_hot__${idx1}`}>
                            <div className="wp-title-sidebar-b">
                                <h2 className="h2-title"><a href={`/tin-tuc/${news_category.category.slug}`}>{news_category.category.title}</a></h2>
                            </div>
                            <div className="wp-list-tin-sidebar">
                                {renderNewsSub}
                            </div>
                        </div>
                    )
                } else {
                    return (
                        <div className="wp-box-sidebar box1" key={`news_hot__${idx1}`}>
                            <div className="wp-title-sidebar-b">
                                <h2 className="h2-title"><a href={`/tuyen-dung`}>{news_category.category.title}</a></h2>
                            </div>
                            <div className="wp-list-tin-sidebar">
                                {renderNewsSub}
                            </div>
                        </div>
                    )
                }
            }
        })

        let str = 'https://laodonglyduc.com' + this.props.location.pathname
        return (
            <Fragment>
                <NewsSlider />
                <div>
                    <section className="news-detail">
                        <div className="container">
                            <div className="top clearfix top-b">
                                <h2 className="h2-title font-Roboto-Medium font22 text-black">{this.state.category_title}</h2>
                            </div>
                            <div className="row row-edit-10">
                                <div className="col-md-8 col-sm-12 col-xs-12 col-edit-10">
                                    <div className="wp-left" style={{textAlign: "justify"}}>
                                        <h1 className="font36 text-black font-RobotoCondensed-Bold big-name">{this.state.title}</h1>
                                        <div className="author-share clearfix">
                                            <div className="info">
                                                <div className="avatar">
                                                    <img src={this.state.avatar} alt="" />
                                                </div>
                                                <div className="author">by {this.state.username}</div>
                                                <div className="time">{formartOnlyDate(this.state.createdAt)}</div>
                                            </div>
                                            <div className="share">
                                                <span>Chia sẻ: </span>
                                                <ul className="list-inline">
                                                    <li>
                                                        <a href={`https://www.facebook.com/sharer/sharer.php?u=${str}`}><img src="/public/images/icon/social8.png" alt="" />&nbsp;</a>
                                                    </li>

                                                    <li>
                                                        <a href={`https://twitter.com/share?ref_src=${str}`} className="twitter-share-button" data-text="Công ty TNHH nghiệp đoàn lao động Lý Đức" data-url="http://laodonglyduc.com/" data-hashtags="Lao động Lý Đức" data-show-count="false"><img src="/public/images/icon/social10.png" alt="" />&nbsp;</a>
                                                        <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="article_content clearfix">
                                            <div dangerouslySetInnerHTML={{ __html: this.state.html_content }}></div>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-12 col-xs-12 col-edit-10">
                                    <div className="wp-right">
                                        {renderNewsHot}
                                    </div>
                                </div>
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
                            {/* <div style={{ textAlign: "center" }}>
                            <FacebookProvider appId="2318401288216022">
                                <Comments href="https://www.24h.com.vn/bong-da-c48.html" style={{ width: 800 }} />
                            </FacebookProvider>
                        </div> */}
                            <div className="fb-comments" data-href={`${str}`} data-width="100%" data-numposts="5"></div>
                        </div>
                    </section>
                    {/* <section className="news-share">
                    <ul className="list-unstyled">
                        <li><a href="https://www.facebook.com/sharer/sharer.php?u=http://demo-web-cuuvan.sky-demo.net/news/detail/zczxc/" className="share1">&nbsp;</a></li>
                        <li><a href="https://twitter.com/share?ref_src=https://demo-web-cuuvan.sky-demo.net/" className="twitter-share-button" data-text="Công ty TNHH nghiệp đoàn lao động Lý Đức" data-url="http://demo-web-cuuvan.sky-demo.net/" data-hashtags="Lao động Lý Đức" data-show-count="false" className="share2">&nbsp;</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></li>
                        <li><a href="#" className="share3">&nbsp;</a></li>
                        <li><a href="#" className="share3">&nbsp;</a></li>
                        <li><a href="#" className="share4">&nbsp;</a></li>
                    </ul>
                </section> */}
                </div>
                <Social />
            </Fragment>
        );
    }
}

export default NewsContent;