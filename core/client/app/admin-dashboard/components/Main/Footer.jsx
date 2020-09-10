import React, {Component, PropTypes} from 'react';

export default class Footer extends Component {
    render() {
        return(
            <div className="footer text-muted" style={{padding: '0 20px 0px 20px'}}>
                &copy; 2015. <a href="#">LyDuc Dashboard</a> by <a href="" target="_blank">Nobita 4116</a>
            </div>
        );
    }
}