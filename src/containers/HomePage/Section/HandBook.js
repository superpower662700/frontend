//HandBook
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
class HandBook extends Component {


    render() {
        return (
            <div className='section-share section-HandBook'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Cẩm nang</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize '>
                                <div className='bg-image section-HandBook' />
                                <div>Xét nghiệm nội tiết bao nhiêu tiền? Giá xét nghiệm tại Hà Nội 1</div>
                            </div>
                            <div className='section-customize '>
                                <div className='bg-image section-HandBook' />
                                <div>Xét nghiệm nội tiết bao nhiêu tiền? Giá xét nghiệm tại Hà Nội 2</div>
                            </div>
                            <div className='section-customize '>
                                <div className='bg-image section-HandBook' />
                                <div>Xét nghiệm nội tiết bao nhiêu tiền? Giá xét nghiệm tại Hà Nội 3</div>
                            </div>
                            <div className='section-customize '>
                                <div className='bg-image section-HandBook' />
                                <div>Xét nghiệm nội tiết bao nhiêu tiền? Giá xét nghiệm tại Hà Nội 4</div>
                            </div>
                            <div className='section-customize '>
                                <div className='bg-image section-HandBook' />
                                <div>Xét nghiệm nội tiết bao nhiêu tiền? Giá xét nghiệm tại Hà Nội 5</div>
                            </div>
                            <div className='section-customize '>
                                <div className='bg-image section-HandBook' />
                                <div>Xét nghiệm nội tiết bao nhiêu tiền? Giá xét nghiệm tại Hà Nội 6</div>
                            </div>
                        </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
