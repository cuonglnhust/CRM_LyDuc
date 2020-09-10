import React, { Component } from 'react';
import { request } from '../../request'
import { showErrorMessage } from '../../request/notification'
import { formartOnlyDate } from '../../libs/until'

class home_news extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listNews: []
        }
    }
    componentWillMount() {
        request.makeRequest("get", "/api/news/getNewsHot")
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
    limitText(str){
        let n = str.lastIndexOf(" ")
        return str.slice(0, n)
    }
    render() {
        let { listNews } = this.state
        let renderNews = listNews.map((item, idx) => {
            return (
                <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4" key={`home_news${idx}`}>
                    <div className="new">
                        <div className="font-Roboto-Medium text-black font22 big-name">{item[0].category.title}</div>
                        <div className="thumb">
                            <a href={`/${item[0].slug}`}><img src={item[0].image} alt="" /></a>
                        </div>
                        <div className="name">
                            <a href={`/${item[0].slug}`} className="font20 text-4f font-Roboto-Bold">{item[0].title}</a>
                        </div>
                        <div className="info clearfix">
                            <div className="avatar">
                                <img src={item[0].user.avatar} alt="" />
                            </div>
                            <div className="author">by {item[0].user.user_name}</div>
                            <div>{formartOnlyDate(item[0].createdAt)}</div>
                        </div>
                        <p className="font16 text-4f des">{item[0].description.length < 115 ? item[0].description :this.limitText( item[0].description.slice(0, 115))}...</p>
                    </div>
                    <ul className="list-unstyled sub-news">
                        <li className="clearfix">
                            <div className="thumb-mini">
                                <a href={`/${item[1].slug}`}><img src={item[1].image} alt="" /></a>
                            </div>
                            <div className="info">
                                <div className="name">
                                    <a href={`/${item[1].slug}`} className="font16 text-4f">{item[1].title}</a>
                                </div>
                                <time className="time">{formartOnlyDate(item[1].createdAt)}</time>
                            </div>
                        </li>
                        <li className="clearfix">
                            <div className="thumb-mini">
                                <a href={`/${item[2].slug}`}><img src={item[2].image} alt="" /></a>
                            </div>
                            <div className="info">
                                <div className="name">
                                    <a href={`/${item[2].slug}`} className="font16 text-4f">{item[2].title}</a>
                                </div>
                                <time className="time">{formartOnlyDate(item[2].createdAt)}</time>
                            </div>
                        </li>
                    </ul>
                </div>
            )
        })

        return (
            <section className="home-news">
                <div className="text-center text-uppercase text-4f font-Roboto-Bold font48 big-title">Tin tức</div>
                <div className="text-center text-uppercase text-green font24 sub-title">Cung cấp thông tin mới nhất tới khách hàng</div>
                <div className="block-desktop">
                    <div className="container">
                        <div className="row">
                            {listNews.length ? renderNews : null}
                        </div>
                    </div>
                </div>

                <div className="block-mobile">
                    {listNews.length ? (
                        <div className="tabs">
                            <ul className="list-unstyled ul-control clearfix" role="tablist">
                                <li role="presentation" className="active">
                                    <a href="#home" aria-controls="home" role="tab" data-toggle="tab">{listNews[0][0].category.title}</a>
                                </li>
                                <li role="presentation">
                                    <a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">{listNews[1][0].category.title}</a>
                                </li>
                                <li role="presentation">
                                    <a href="#messages" aria-controls="messages" role="tab" data-toggle="tab">{listNews[2][0].category.title}</a>
                                </li>
                            </ul>
                            <div className="tab-content">
                                <div role="tabpanel" className="tab-pane active" id="home">
                                    <div className="new">
                                        <div className="thumb">
                                            <a href={`/${listNews[0][0].slug}`}><img src={listNews[0][0].image} alt="" /></a>
                                        </div>
                                        <div className="name">
                                            <a href={`/${listNews[0][0].slug}`} className="font20 text-4f font-Roboto-Bold">{listNews[0][0].title}</a>
                                        </div>
                                        <div className="info clearfix">
                                            <div className="avatar">
                                                <img src={listNews[0][0].user.avatar} alt="" />
                                            </div>
                                            <div className="author">by {listNews[0][0].user.user_name}</div>
                                            <div>{formartOnlyDate(listNews[0][0].createdAt)}</div>
                                        </div>
                                        <p className="text-4f des">{listNews[0][0].description.length < 140 ? listNews[0][0].description : this.limitText( listNews[0][0].description.slice(0, 140))}...</p>
                                    </div>
                                    <ul className="list-unstyled sub-news">
                                        <li className="clearfix">
                                            <div className="thumb-mini">
                                                <a href={`/${listNews[0][1].slug}`}><img src={listNews[0][1].image} alt="" /></a>
                                            </div>
                                            <div className="info">
                                                <div className="name">
                                                    <a href={`/${listNews[0][1].slug}`} className="font16 text-4f">{listNews[0][1].title}</a>
                                                </div>
                                                <time className="time">{formartOnlyDate(listNews[0][1].createdAt)}</time>
                                            </div>
                                        </li>
                                        <li className="clearfix">
                                            <div className="thumb-mini">
                                                <a href={`/${listNews[0][2].slug}`}><img src={listNews[0][2].image} alt="" /></a>
                                            </div>
                                            <div className="info">
                                                <div className="name">
                                                    <a href={`/${listNews[0][2].slug}`} className="font16 text-4f">{listNews[0][2].title}</a>
                                                </div>
                                                <time className="time">{formartOnlyDate(listNews[0][2].createdAt)}</time>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div role="tabpanel" className="tab-pane" id="profile">
                                    <div className="new">
                                        <div className="thumb">
                                            <a href={`/${listNews[1][0].slug}`}><img src={listNews[1][0].image} alt="" /></a>
                                        </div>
                                        <div className="name">
                                            <a href={`/${listNews[1][0].slug}`} className="font20 text-4f font-Roboto-Bold">{listNews[1][0].title}</a>
                                        </div>
                                        <div className="info clearfix">
                                            <div className="avatar">
                                                <img src={listNews[1][0].user.avatar} alt="" />
                                            </div>
                                            <div className="author">by {listNews[1][0].user.user_name}</div>
                                            <div>{formartOnlyDate(listNews[1][0].createdAt)}</div>
                                        </div>
                                        <p className="text-4f des">{listNews[1][0].description.length < 140 ? listNews[1][0].description : this.limitText( listNews[1][0].description.slice(0, 140))}...</p>
                                    </div>
                                    <ul className="list-unstyled sub-news">
                                        <li className="clearfix">
                                            <div className="thumb-mini">
                                                <a href={`/${listNews[1][1].slug}`}><img src={listNews[1][1].image} alt="" /></a>
                                            </div>
                                            <div className="info">
                                                <div className="name">
                                                    <a href={`/${listNews[1][1].slug}`} className="font16 text-4f">{listNews[1][1].title}</a>
                                                </div>
                                                <time className="time">{formartOnlyDate(listNews[1][1].createdAt)}</time>
                                            </div>
                                        </li>
                                        <li className="clearfix">
                                            <div className="thumb-mini">
                                                <a href={`/${listNews[1][2].slug}`}><img src={listNews[1][2].image} alt="" /></a>
                                            </div>
                                            <div className="info">
                                                <div className="name">
                                                    <a href={`/${listNews[1][2].slug}`} className="font16 text-4f">{listNews[1][2].title}</a>
                                                </div>
                                                <time className="time">{formartOnlyDate(listNews[1][2].createdAt)}</time>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div role="tabpanel" className="tab-pane" id="messages">
                                    <div className="new">
                                        <div className="thumb">
                                            <a href={`/${listNews[2][0].slug}`}><img src={listNews[2][0].image} alt="" /></a>
                                        </div>
                                        <div className="name">
                                            <a href={`/${listNews[2][0].slug}`} className="font20 text-4f font-Roboto-Bold">{listNews[2][0].title}</a>
                                        </div>
                                        <div className="info clearfix">
                                            <div className="avatar">
                                                <img src={listNews[2][0].user.avatar} alt="" />
                                            </div>
                                            <div className="author">by {listNews[2][0].user.user_name}</div>
                                            <div>{formartOnlyDate(listNews[2][0].createdAt)}</div>
                                        </div>
                                        <p className="text-4f des">{listNews[2][0].description.length < 140 ? listNews[2][0].description : this.limitText( listNews[2][0].description.slice(0, 140))}...</p>
                                    </div>
                                    <ul className="list-unstyled sub-news">
                                        <li className="clearfix">
                                            <div className="thumb-mini">
                                                <a href={`/${listNews[2][1].slug}`}><img src={listNews[2][1].image} alt="" /></a>
                                            </div>
                                            <div className="info">
                                                <div className="name">
                                                    <a href={`/${listNews[2][1].slug}`} className="font16 text-4f">{listNews[2][1].title}</a>
                                                </div>
                                                <time className="time">{formartOnlyDate(listNews[2][1].createdAt)}</time>
                                            </div>
                                        </li>
                                        <li className="clearfix">
                                            <div className="thumb-mini">
                                                <a href={`/${listNews[2][2].slug}`}><img src={listNews[2][2].image} alt="" /></a>
                                            </div>
                                            <div className="info">
                                                <div className="name">
                                                    <a href={`/${listNews[2][2].slug}`} className="font16 text-4f">{listNews[2][2].title}</a>
                                                </div>
                                                <time className="time">{formartOnlyDate(listNews[2][2].createdAt)}</time>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>) : null}
                </div>
                <div className="text-center">
                    <a href="/tin-tuc" className="text-white text-uppercase font-RobotoCondensed-Bold font24 view-more">Xem thêm</a>
                </div>
            </section >
        );
    }
}

export default home_news;