import React, { Component, Fragment } from 'react';
import ContactSlider from "./contact_slider"
import ContactForm from "./contact_form"
import AboutMap from '../About/about_map'
import Social from '../Social'
class index extends Component {
    componentDidMount(){
        window.scrollTo(0, 0);
    }
    render() {
        return (
            <Fragment>
                <ContactSlider />
                <ContactForm />
                <AboutMap />
                <Social/>
            </Fragment>
        );
    }
}

export default index;