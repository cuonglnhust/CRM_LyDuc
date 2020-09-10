import React, { Component, Fragment } from 'react';

class index extends Component {
    render() {
        return (
            <Fragment>
                <ul className="list-unstyled float-icon-mobile">
                    <li>
                        <a  href="tel:0332962626">
                            <img src="/public/images/icon/social1.png" alt="" />
                        </a>
                    </li>
                    <li>
                        <a href="mailto:laodonglyduc@gmail.com">
                            <img src="/public/images/icon/social2.png" alt="" />
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <img src="/public/images/icon/social3.png" alt="" />
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <img src="/public/images/icon/social4.png" alt="" />
                        </a>
                    </li>
                </ul>
                <ul className="list-unstyled float-icon-desktop">
                    <li className="left">
                        <div className="top">
                            <a href="#">
                                <img src="/public/images/icon/social5.png" alt="" />
                            </a>
                        </div>
                        <div>
                            <a href="tel:0332962626">
                                <img src="/public/images/icon/Group24.png" alt="" />
                            </a>
                        </div>
                    </li>
                    <li className="right">
                        <a href="#">
                            <img src="/public/images/icon/social7.png" alt="" />
                        </a>
                    </li>
                </ul>
            </Fragment>
        );
    }
}

export default index;