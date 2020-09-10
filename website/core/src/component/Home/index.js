import React, { Component, Fragment } from 'react';
import HomeSlider from './home_slider'
import HomeStrong from './home_strong'
import HomeServices from './home_services'
import HomeCustomer from './home_customer'
import HomeJob from './home_job'
import HomeStep from './home_step'
import HomeSetup from './home_setup'
import HomeNews from './home_news'
import HomeCompany from './home_company'
import Social from '../Social'
class index extends Component {
    componentDidMount(){
        window.scrollTo(0, 0);
    }
    render() {
        return (
            <Fragment>
                <HomeSlider />
                <HomeStrong />
                <HomeServices />
                <HomeCustomer />
                <HomeJob />
                <HomeStep />
                <HomeSetup />
                <HomeNews />
                <HomeCompany />
                <Social/>
            </Fragment>
        );
    }
}

export default index;