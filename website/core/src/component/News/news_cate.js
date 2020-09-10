import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { request } from '../../request'
import { showErrorMessage } from '../../request/notification'
import { formartOnlyDate } from '../../libs/until'
import NewsSearch from './news_search'

class NewsCate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listNews: [],
            title: '',
            titleNews: '',
        }
    }
    componentDidMount() {
        window.scrollTo(0, 0);
    }
    componentWillMount() {
        let { slug } = this.props.match.params || '';
        if (slug) {
            this.getNewsBySlug(slug)
        } else {
            this.props.history.push('/news')
        }
    }

    componentWillReceiveProps(nextProps) {
        let next_slug = nextProps.match.params.slug || ''
        let { slug } = this.props.match.params || '';
        if (next_slug != '' && next_slug != slug) {
            this.getNewsBySlug(next_slug)
        } else {
            this.props.history.push('/news')
        }
    }

    onChangeInputSearch = (key, value) => {
        this.setState({
            [key]: value
        });
    };

    submitSearch = () => {
        let { slug } = this.props.match.params || null;
        let { title } = this.state;
        this.getNewsBySlug(slug, title);
    };
    getNewsBySlug(slug, title) {
        request.makeRequest("get", `/api/news/getNewsBySlug`, {
            slug: slug,
            title: title

        })
            .then(result => {
                if (result.signal) {
                    let { news } = result.data;
                    this.setState({
                        listNews: news,
                        titleNews: result.data.title,
                        title
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
        let str = ""
        let renderNews = listNews.map((item, idx) => {
            if (item.description.length < 215){
                str = item.description
            }else{
                str = this.limitText( item.description.slice(0, 215))
            }
            return (
                <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4" key={`new_cate_${idx}`}>
                    <div className="new">
                        <div className="thumb">
                            <a href={`/${item.slug}`}><img src={item.image} alt="" /></a>
                        </div>
                        <div className="name">
                            <a href={`/${item.slug}`} class="font-Roboto-Bold font22 text-4f">{item.title}</a>
                        </div>
                        <div className="clearfix font11 text-black info">
                            <div className="avatar">
                                <img src={item.user.avatar} alt="" />
                            </div>
                            <div className="author">by {item.user.user_name}</div>
                            <div className="time">{formartOnlyDate(item.createdAt)}</div>
                        </div>
                        <p className="font18 text4f des">{str}...</p>
                    </div>
                </div>
            );
        })

        return (
            <div>
                <NewsSearch
                    search={this.submitSearch}
                    onChangeInputSearch={this.onChangeInputSearch}
                    title={this.state.title}
                />
                <section className="news-cats v2">
                    <div className="container">
                        <div className="top clearfix">
                            <h2 className="font-Roboto-Medium font22 text-black">{this.state.titleNews}</h2>
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
export default withRouter(NewsCate);