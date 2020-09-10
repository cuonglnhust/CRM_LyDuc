import React, { Component,Fragment } from 'react';
import LandingSlider from './landing_slider'
import LandingStrong from './landing_strong'
import LandingBenefit from './landing_benefit'
import LandingStep from './landing_step'
import HomeJob from '../Home/home_job'
import LandingCustomer from './landing_customer'
import LandingMoney from './landing_money'
import HomeCompany from '../Home/home_company'
import HomeSetup from '../Home/home_setup'
import Social from '../Social'
class index extends Component {
    componentDidMount(){
        window.scrollTo(0, 0);
    }
    render() {
        return (
            <Fragment>
                <LandingSlider />
                <LandingStrong />
                <LandingBenefit />
                <LandingStep />
                <HomeJob />
                <LandingCustomer />
                <LandingMoney />
                <HomeCompany />
                <HomeSetup />
                <Social/>
            </Fragment>
        );
    }
}

export default index;