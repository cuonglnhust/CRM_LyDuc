import React, { Component } from 'react';
import Slider from 'react-slick';

class home_customer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listCustomer: [
                {
                    avatar: "/public/images/avatar/dep1-400x400.jpg",
                    des: " Tôi là cư dân KĐT Royal, tôi rất hài lòng với dịch vụ của công ty Lý Đức. Trước khi chuyển về nhà mới, Lý Đức là đơn vị đã giúp tôi hoàn thiện phần thô cho ngôi nhà của mình. Làm việc đúng thời gian, chất lượng, rất tận tâm với công việc. ",
                    name: "Mrs Phạm Thị Yến",
                    des2: "Đã sử dụng dịch vụ Sửa chữa nhà tại Lý Đức"
                },
                {
                    avatar: "/public/images/avatar/giai-dep-1-400x400.jpg",
                    des: " Mình không phải là khách hàng thường xuyên của Lý Đức, nhận xét về dịch vụ bốc xếp hàng hóa này thì khá ổn, đặt người làm qua App, có bạn gọi nhận lịch sau mấy tiếng gì đó. Mình thấy Lý Đức rất tốt! ",
                    name: "Mr Trần Hoài Văn",
                    des2: "Đã sử dụng dịch vụ Bốc xếp hàng hóa tại Lý Đức"
                },
                {
                    avatar: "/public/images/avatar/phuc-anh-400x400.jpg",
                    des: " Dịch vụ khoan cắt bê tông rất tốt, nhân viên làm việc chịu khó và nhiệt tình. Mình rất thích và sẽ tiếp tục sử dụng dịch vụ trong thời gian tới vì bên mình có rất nhiều công trình liên quan đến khoan cắt bê tông. Chúc Lý Đức ngày càng phát triển hơn nữa ",
                    name: "Mr Nguyễn Phúc Ánh",
                    des2: "Đã sử dụng dịch vụ Khoan cắt bê tông tại Lý Đức"
                },
                {
                    avatar: "/public/images/avatar/hai-400x400.jpg",
                    des: " Mình không phải là khách hàng thường xuyên của Lý Đức, nhận xét về dịch vụ bốc xếp hàng hóa này thì khá ổn, đặt người làm qua App, có bạn gọi nhận lịch sau mấy tiếng gì đó. Khoản thanh toán qua cổng online thì tiện, giờ app nào cũng tích hợp rồi. Bạn cần dịch vụ nào bên Lý Đức cũng ok, chỉ cần nhấn và mục cần cung cấp dịch vụ mà bạn muốn, có thể recommend cho những người khác. Thanks. ",
                    name: "Mr Nguyễn Hải Nam",
                    des2: "Đã sử dụng dịch vụ Bốc xếp hàng hóa tại Lý Đức"
                },
                {
                    avatar: "/public/images/avatar/Rectangle 14.png",
                    des: "  Lần đầu sử dụng gói sửa chữa, cải tạo và vệ sinh công nghiệp của bạn này, thấy nhân viên làm từng khâu có trách nhiệm với công việc, tổ trưởng cũng sát sao, đôn đốc nhân viên các việc cần làm, vệ sinh công nghiệp sạch sẽ, gọn gang. Thái độ của mọi người cũng cởi mở, cầu tiến. Chúc Lý Đức ngày càng chuyên nghiệp và tiến xa hơn ",
                    name: "Mrs Nguyễn Thùy Linh",
                    des2: "Đã sử dụng dịch vụ Cải tạo và vệ sinh công nghiệp tại Lý Đức"
                },
                {
                    avatar: "/public/images/avatar/viet-hung-400x400.jpg",
                    des: "  Mình đã từng sử dụng dịch vụ chuyển nhà và văn phòng một vài nơi khác nhau, vài lần nhưng không đáp ứng được yêu cầu độ chuyên nghiệp chưa có nên cũng khá băn khoăn, lần này tìm hiểu về Lý Đức, quyết định đặt lịch cho nhân viên đến chuyển đồ. Đúng lịch nhân viên đến đúng giờ mang theo cả công cụ chuyển đồ, tháo lắp…đầy đủ, làm việc chuyên nghiệp, sắp xếp gọn gàng và nhiệt tình giúp khi mình đề nghị hỗ trợ những công việc ngoài danh mục công việc đã thỏa thuận. Mình sẽ lưu số để những lúc cần mình sẽ alo tới Lý Đức ",
                    name: "Mr Trần Việt Hưng",
                    des2: "Đã sử dụng dịch vụ Chuyển nhà,chuyển văn phòng tại Lý Đức"
                },
                {
                    avatar: "/public/images/avatar/Rectangle 8.png",
                    des: "   Mình đã tìm hiểu và biết đến Lý Đức, thật sự các anh không làm mình thất vọng, nhiệt tình, chu đáo, nhìn các anh làm việc ưng lắm ý. Chúc Nghiệp đoàn Lý Đức ngày một lớn mạnh! ",
                    name: "Mrs Trần Thị Thúy Hường",
                    des2: "Đã sử dụng dịch vụ Cơ khí dân dụng tại Lý Đức"
                },

            ]
        }
    }
    render() {
        let { listCustomer } = this.state
        let renderCustomer = listCustomer.map((item, idx) => {
            return (
                <div className="unit" data-img={item.avatar} key={`home_customer_${idx}`}>
                    <div className="avatar">
                        <img src={item.avatar} alt="" />
                    </div>
                    <p className="font18 text-33 des">{item.des}</p>
                    <div className="text-green text-uppercase font-Roboto-Medium font22 name">{item.name}</div>
                    <div className="text-4f font16 des2">{item.des2}</div>
                </div>
            )
        })
        let settings = {
            infinite: true,
            autoplay:true,
            dots: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            customPaging: function (i) {
                var img = listCustomer[i].avatar;
                return (
                    <div className="img" role="button">
                        <img src={img} alt="" />
                    </div>
                )
            }
        };
        return (
            <section className="home-customer">
                <div className="text-center text-uppercase big-title">
                    <span className="text-4f" style={{ margin: "5px" }}>Khách hàng</span>
                    <span className="text-green" style={{ margin: "5px" }}>Hài lòng</span>
                </div>
                <div className="text-center text-uppercase text-4f sub-title">PHẢN HỒI CỦA KHÁCH HÀNG SAU KHI SỬ DỤNG DỊCH VỤ TẠI LÝ ĐỨC</div>
                <div className="container">
                    <div>
                        <div className="home-customer-slider">
                            <Slider {...settings}>
                                {renderCustomer}
                            </Slider>
                        </div>
                    </div>
                </div>
            </section>

        );
    }
}

export default home_customer;