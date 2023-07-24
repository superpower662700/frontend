//About
import React, { Component } from 'react';
import { connect } from 'react-redux';
class About extends Component {


    render() {
        return (
            <div className='section-share section-About'>
                <div className='section-about-header'>Truyền thông nói về BookingCare</div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe width="100%" height="400px"
                            src="https://www.youtube.com/embed/147SkAVXEqM?list=PLncHg6Kn2JT6E38Z3kit9Hnif1xC_9VqI"
                            title="#51 Kết Thúc Design Giao Diện Clone BookingCare.vn 4 | React.JS Cho Người Mới Bắt Đầu"
                            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen>
                        </iframe>
                    </div>
                    <div className='content-right'>
                        <p>Làm sao để trở thành 1 fullstack web developer  ? Đây là câu hỏi mà mình không có lời giải đáp khi còn là sinh viên.
                            Tuy nhiên, sau một thời gian đi làm, thì mình cũng nhận ra nhiều điều khi dấn thân vào con đường trở thành 1 full-stack.
                            Series này chính làm một khóa học hoàn toàn miễn phí, giúp những bạn mới bắt đầu chưa có định hướng, cũng như những bạn nào muốn cải thiện trình độ lập trình của mình để trành một lập trình viên thực thụ.
                            Mọi hướng dẫn sẽ được giải thích cụ thể nhất, cũng như mang tính áp dụng thực tế, phục vụ mục đích đi làm sau này.
                        </p>
                    </div>
                </div>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
