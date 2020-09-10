import React, { Component, Fragment } from 'react';

class landing_slider extends Component {
    scrollWin = () => {
        let pos = $("#landing_money").position()
        window.scrollTo(0, pos ? pos.top : 0);
    }
    render() {
        return (
            <Fragment>
                <section class="landing-slider">
                    <div class="container">
                        <div class="info">
                            <div class="text-white font-RobotoCondensed-Bold font48 big-title">Quyền lợi bất ngờ</div>
                            <p class="font18 text-white sub-title">Đăng ký tham gia tại Lý Đức bạn sẽ có rất nhiều quyền lợi. </p>
                            <button class="text-uppercase text-white bg-green font-RobotoCondensed-Bold font24 btn-register" onClick = {this.scrollWin} >Đăng ký ngay</button>
                        </div>
                    </div>
                </section>
            </Fragment>
        );
    }
}

export default landing_slider;