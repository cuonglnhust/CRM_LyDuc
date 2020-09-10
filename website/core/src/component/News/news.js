import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom'

import NewsSlider from './news_slide'

import NewsAll from './news_all'
import NewsCate from './news_cate';
import NewsContent from './news_content';
import Social from '../Social'
class news extends Component {
    componentDidMount(){
        window.scrollTo(0, 0);
    }
    componentWillMount() {
        window.scrollTo(0, 0);
    }
    componentWillReceiveProps(nextProps, nextState) {
        window.scrollTo(0, 0);
    }
    render() {
        return (
            <Fragment>
                <NewsSlider />
                {/* <Route exact path='/:slug' component={NewsContent} /> */}
                <Route exact path='/tin-tuc' component={NewsAll} />
                <Route exact path='/tin-tuc/:slug' component={NewsCate} />
                <Social />
            </Fragment>
        );
    }
}

export default news;