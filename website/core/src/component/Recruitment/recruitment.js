import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom'
import RecruitmentSlider from './recruitment_slide'
import RecruitmentAll from './recruitment_all';
import Recruitment_Content from './recruitment_content';
import Social from '../Social'
class news extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }
    render() {
        return (
            <Fragment>
                <RecruitmentSlider/>
                <Route exact path='/tuyen-dung' component={RecruitmentAll}  />
                <Route path='/tuyen-dung/:slug' component={Recruitment_Content}/>
                <Social/>
            </Fragment>
        );
    }
}

export default news;