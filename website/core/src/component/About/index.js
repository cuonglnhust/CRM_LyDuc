import React, { Component, Fragment } from 'react';
import AboutSlider from './about_slider'
import AboutIntro from './about_intro'
import AboutMap from './about_map'
import Social from '../Social'
class index extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }
    render() {
        return (
            <Fragment>
                <AboutSlider />
                <AboutIntro />
                <AboutMap />
                <Social />
            </Fragment>
        );
    }
}

export default index;