import React, { Component, Fragment } from 'react';
import HelpSlider from './help_slider'
import HelpContent from './help_content';
import Social from '../Social'
class index extends Component {
    componentWillMount() {
        window.scrollTo(0, 0);
    }

    componentWillReceiveProps(nextProps, nextState) {
        window.scrollTo(0, 0);
    }
    render() {
        let option =this.props.history.location.state ? (this.props.history.location.state.option || '') : '';
        return (
            <Fragment>
                <HelpSlider />
                <HelpContent option={option} />
                <Social/>
            </Fragment>
        );
    }
}

export default index;