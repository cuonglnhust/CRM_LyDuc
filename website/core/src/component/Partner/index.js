import React, { Component, Fragment } from 'react';
import PartnerSlider from './partner_slider'
import PartnerListPartner from './partner_list_partner';
import Social from '../Social'
class index extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }
    render() {
        return (
            <Fragment>
                <PartnerSlider />
                <PartnerListPartner />
                <Social />
            </Fragment>
        );
    }
}

export default index;