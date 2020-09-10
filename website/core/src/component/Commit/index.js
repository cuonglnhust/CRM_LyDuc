import React, { Component, Fragment } from 'react';
import CommitSlider from './commit_slider'
import CommitContent from './commit_content';
import Social from '../Social';
class index extends Component {

    componentWillMount() {
        window.scrollTo(0, 0);
    }

    componentWillReceiveProps(nextProps, nextState) {
        window.scrollTo(0, 0);
    }
    render() {

        let option = this.props.history.location.state ? (this.props.history.location.state.option || '') : '';
       
        return (
            <Fragment>
                <CommitSlider />
                <CommitContent option={option} />
                <Social />
            </Fragment>
        );
    }
}

export default index;