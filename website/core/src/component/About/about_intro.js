import React, { Component } from 'react';
import { request } from '../../request'
import { showErrorMessage } from '../../request/notification'
class about_intro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listIntro: [],
        }
    }
    componentWillMount() {
        this.getListIntroductions()
    }
    getListIntroductions() {
        request.makeRequest("get", "/api/introductions/getIntroductionsByCo")
            .then(result => {
                if (result.signal) {
                    this.setState({
                        listIntro: result.data
                    })
                } else {
                    return showErrorMessage(result.message)
                }
            }).catch(err => {
                console.log(err)
            })
    }
    render() {
        let { listIntro } = this.state
        // let renderIntro = listIntro.map((item, idx) => {
        //     return (
        //         <div classNameName="col-xs-12 col-sm-4 col-md-4 col-lg-4" key={`about_intro_${idx}`}>
        //             <div classNameName="unit">
        //                 <div classNameName="name">{item.title}</div>
        //                 <div classNameName="line"></div>
        //                 <p classNameName="des">{item.plain_text}</p>
        //             </div>
        //         </div>
        //     )
        // })
        return (

            // <section className="about-intro">
            //     {listIntro.length ? (
            //     <div className="container">

            //         <h3 className="text-green font-Roboto-Medium font36 supper-title">{listIntro[0].title}</h3>
            //         <div dangerouslySetInnerHTML={{ __html: listIntro[0].html_content }}></div>
            //         {/* {listIntro[0].html_content} */}
            //         {/* <div className="block-cont clearfix">
            //             <div className="right">
            //                 <img src="/public/images/Rectangle11.png" alt="" />
            //             </div>
            //             <div className="left">
            //                 <p className="font18">Công ty TNHH Nghiệp đoàn lao động Lý Đức là công ty chuyên cung cấp dịch vụ: bốc xếp, bốc vác hàng hóa, bốc dỡ container; dịch vụ chuyển nhà, chuyển văn phòng; dịch vụ dọn dẹp nhà cửa, sửa chữa vật dụng gia đình; sửa chữa nhà, cải tạo nhà; khoan cắt, khoan rút lõi bê tông; phá dỡ, chuẩn bị mặt bằng; cung ứng nhân công, thợ lành nghề….</p>
            //                 <p className="font18">Nghiệp đoàn Lao động Lý Đức khởi đầu với 10 lao động làm việc chủ yếu ở tại các quận nội thành Hà Nội, trải qua hơn 10 năm xây dựng và phát triển, đến nay chúng tôi đã có đội ngũ hơn 100 lao động có sức khỏe tốt, được đào tạo chuyên nghiệp với phạm vi hoạt động trải rộng khắp Hà Nội.</p>
            //             </div>
            //         </div> */}
            //         {/* <div className="block-cont clearfix">
            //             <p className="font18">Năm 2020, laodonglyduc.com sẽ triển khai mở rộng phạm vi cung cấp dịch vụ, tạo công ăn việc làm cho nhiều người lao động và đáp ứng nhiều hơn nhu cầu của Khách hàng. Với phương trâm hoạt động: “Phục vụ chuyên nghiệp – Xây dựng niềm tin – Phát triển bền vững”</p>
            //         </div> */}
            //         <div className="block-cont clearfix">
            //             <div className="left">
            //                 <h3 className="text-green font-Roboto-Medium font36 supper-title">{listIntro[1].title}</h3>
            //                 <p className="font18" dangerouslySetInnerHTML={{ __html: listIntro[1].html_content }}></p>
            //             </div>
            //             <div className="right">
            //                 <h3 className="text-green font-Roboto-Medium font36 supper-title">{listIntro[2].title}</h3>
            //                 <p className="font18" dangerouslySetInnerHTML={{ __html: listIntro[2].html_content }}></p>
            //             </div>
            //         </div>
            //         <div className="block-cont">
            //             <h3 className="text-green font-Roboto-Medium font36 supper-title">{listIntro[3].title}</h3>
            //             <p className="font18" dangerouslySetInnerHTML={{ __html: listIntro[3].html_content }}></p>
            //         </div>
            //         <div className="block-image">
            //             <img src="/public/images/Rectangle10.png" alt="" className="img-responsive center-block" />
            //         </div>
            //         <div className="block-cont">
            //             <h3 className="text-green font-Roboto-Medium font36 supper-title">{listIntro[4].title}</h3>
            //             <div dangerouslySetInnerHTML={{ __html: listIntro[4].html_content }}></div>
            //         </div> 
            //     </div> ) : null }

            // </section>

            <section class="about-intro">
                <div class="container">
                    <h3 class="text-green font-Roboto-Medium font36 supper-title">Lịch sử</h3>
                    <div class="block-cont clearfix">
                        <div class="right">
                            <img src="/public/images/Rectangle11.png" alt="" class="img-responsive center-block" />
                        </div>
                        <div class="left">
                            <p class="font18">Công ty TNHH Nghiệp đoàn lao động Lý Đức là công ty chuyên cung cấp dịch vụ: bốc xếp, bốc vác hàng hóa, bốc dỡ container; dịch vụ chuyển nhà, chuyển văn phòng; dịch vụ dọn dẹp nhà cửa, sửa chữa vật dụng gia đình; sửa chữa nhà, cải tạo nhà; khoan cắt, khoan rút lõi bê tông; phá dỡ, chuẩn bị mặt bằng; cung ứng nhân công, thợ lành nghề….</p>
                            <p class="font18">Nghiệp đoàn Lao động Lý Đức khởi đầu với 10 lao động làm việc chủ yếu ở tại các quận nội thành Hà Nội, trải qua hơn 10 năm xây dựng và phát triển, đến nay chúng tôi đã có đội ngũ hơn 100 lao động có sức khỏe tốt, được đào tạo chuyên nghiệp với phạm vi hoạt động trải rộng khắp Hà Nội.</p>
                        </div>
                    </div>
                    <div class="block-cont clearfix">
                        <p class="font18">Năm 2020, laodonglyduc.com sẽ triển khai mở rộng phạm vi cung cấp dịch vụ, tạo công ăn việc làm cho nhiều người lao động và đáp ứng nhiều hơn nhu cầu của Khách hàng. Với phương trâm hoạt động: “Phục vụ chuyên nghiệp – Xây dựng niềm tin – Phát triển bền vững”</p>
                    </div>
                    <div class="block-cont clearfix">
                        <div class="left">
                            <h3 class="text-green font-Roboto-Medium font36 supper-title">Sứ mệnh</h3>
                            <p class="font18">Nghiệp đoàn Lao động Lý Đức cam kết cung cấp cho người tiêu dùng một sản phẩm toàn diện về ngôi nhà thân yêu và cuộc sống hàng ngày, bằng sự chuyên nghiệp, chất lượng, giá cả hợp lý và tin cậy.</p>
                        </div>
                        <div class="right">
                            <h3 class="text-green font-Roboto-Medium font36 supper-title">Tầm nhìn</h3>
                            <p class="font18">Trở thành biểu tượng niềm tin về cung cấp thợ tay nghề cao, thợ lành nghề và lao động phổ thông đã qua đào tạo, nhằm cung ứng đến người tiêu dùng các dịch vụ chất lượng như:  Xây, sửa chữa, cải tạo nhà; Chuyển nhà, chuyển văn phòng, kho xưởng; Bốc xếp, bốc vác hàng hóa; Khoan cắt, đục phá, chuẩn bị mặt bằng; Sửa chữa các vật dụng trong nhà như bóng đèn, quạt, tủ lạnh, giường tủ…</p>
                        </div>
                    </div>
                    <div class="block-cont">
                        <h3 class="text-green font-Roboto-Medium font36 supper-title">Giá trị cốt lõi</h3>
                        <p class="font18">Với phương châm hoạt động: Nhanh chóng – Hiệu quả – Tin cậy, Nghiệp đoàn Lao động Lý Đức luôn luôn xây dựng lực lượng lao động lớn mạnh, tay nghề cao, sức khỏe tốt, làm việc tận tâm và giữ kỷ luật. Vì vậy người lao động luôn được tuyển chọn cẩn thận, đào tạo huấn luyện bài bản, thường xuyên kiểm tra, đánh giá năng lực làm việc để luôn phục vụ khách hàng được tốt nhất. Trong thời đại công nghệ 4.0, Nghiệp đoàn luôn chú trọng phát triển hệ thống phần mềm trên nền tảng công nghệ cao để có thể quản lý, phát triển dịch ngày một chuyên nghiệp và hiện đại.</p>
                    </div>
                    <div class="block-image">
                        <img src="/public/images/Rectangle10.png" alt="" class="img-responsive center-block" />
                    </div>
                    <div class="block-cont">
                        <h3 class="text-green font-Roboto-Medium font36 supper-title">Triết lý kinh doanh</h3>
                        <p class="font18">Với mong muốn được đồng hành giải quyết các nhu cầu thiết yếu của khách hàng, mang lại sự tin yêu. Vì thế Chúng tôi tâm niệm rằng chất lượng, uy tín và giá cả hợp lý là người bạn đồng hành của Nghiệp đoàn Lao động Lý Đức. Lao động Lý Đức xem khách hàng là trung tâm và cam kế đáp ứng mọi nhu cầu của Khách hàng.</p>
                        
                    </div>
                </div>
            </section>
        );
    }
}

export default about_intro;