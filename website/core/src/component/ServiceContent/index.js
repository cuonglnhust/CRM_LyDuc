import React, { Component, Fragment } from 'react';
import ServicesContentSlider from './services_content_slider'
import ServiceDetail from './services_detail'
import ListServices from './list_services'
import Social from '../Social'
class index extends Component {
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
                <ServicesContentSlider />
                <ServiceDetail />
                <ListServices />
                <Social/>
            </Fragment>
        );
    }
}

export default index;