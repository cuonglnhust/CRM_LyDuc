import React, { Component } from 'react';

import { Link,withRouter} from 'react-router-dom'
import {request} from '../../request'
import {showErrorMessage} from '../../request/notification'

class NewsSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {

            listCategory:[]
        }
    }
    componentWillMount() {
        request.makeRequest("get", `/api/news/getCategoryApi`)
            .then(result => {
                if (result.signal) {
                    let listCategory = result.data;
                    this.setState({
                        listCategory
                    })
                } else {
                    return showErrorMessage(result.message)
                }
            }).catch(err => {
                console.log(err)
            })
            
    }
    submitSearch = (e) => {
        e.preventDefault();
        this.props.search();
    }
    changeInput = (key, value) => {
        this.props.onChangeInputSearch(key, value)
    }
    

    render() {
        let {title} = this.props
        let {listCategory} = this.state
        let renderCategory = listCategory.map((item,idx)=>{
            return (
                    <li className={this.props.location.pathname === `/tin-tuc/${item.slug}` ? 'active' : ''} key={`news__${idx}`}><Link to={`/tin-tuc/${item.slug}`}>{item.title}</Link></li>
            );

        })
        return (
            <section className="news-search">
                <div className="container">
                    <div className="clearfix">
                        <div className="row">
                            <div className="col-xs-12 col-sm-9 col-md-7 col-lg-7">
                                <ul className="list-inline">

                                    <li className={this.props.location.pathname === '/tin-tuc' ? 'active' : ''}><Link to="/tin-tuc">Tất cả</Link></li>
                                    {renderCategory}

                                </ul>
                            </div>
                            <div className="col-xs-12 col-sm-3 col-md-5 col-lg-5">
                                <form onSubmit={this.submitSearch.bind(this)}>
                                    <input type="text" name="title" className="form-control" value={title} onChange={(e)=>{this.changeInput(e.target.name,e.target.value)}}/>
                                    <button type="submit" className="btn btn-default">
                                        <span className="fa fa-search"></span>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default withRouter(NewsSearch);