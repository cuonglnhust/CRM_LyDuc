import React, { Component, Fragment } from 'react';

class landing_benefit extends Component {
    render() {
        return (
            <Fragment>
                <section className="landing-benefit">
                    <div className="text-center text-uppercase font-RobotoCondensed-Bold font48 big-title">
                        <span className="text-green" style={{ margin: 5 }}>Quyền lợi</span>
                        <span className="text-4f" style={{ margin: 5 }}>của thợ</span>
                    </div>
                    <div className="text-center font-Roboto-Medium font24 text-4f sub-title">Nhanh chóng - Hiệu quả - Tin cậy</div>
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                <div className="left">
                                    <img src="/public/images/attention.png" alt="" className="img-responsive" />
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                <div className="right">
                                    <p className="font-Roboto-Medium font24 text-33">Nâng cao tay nghề của thợ.</p>
                                    <p className="font-Roboto-Medium font24 text-33">Công việc phù hợp nhất với sở trường của thợ.</p>
                                    <p className="font-Roboto-Medium font24 text-33">Thanh toán và giải quyết lương nhanh chóng.</p>
                                    <p className="font-Roboto-Medium font24 text-33">Công việc không áp lực ,lương cao.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Fragment>
        );
    }
}

export default landing_benefit;