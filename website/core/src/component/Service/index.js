import React, { Component, Fragment } from 'react';
import ServiceSlider from './services_slider';
import ListService from './services_list_services';
import Social from '../Social'
class index extends Component {
    componentDidMount(){
        window.scrollTo(0, 0);
    }
    render() {
        return (
            <Fragment>
                <ServiceSlider />
                <ListService />
                <Social/>
            </Fragment>
        );
    }
}

export default index;