//Specialty
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import { getAllSpecialtyService } from '../../../services/userService'
import { withRouter } from 'react-router';
class Specialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrSpecialty: [],
        }
    }
    async componentDidMount() {
        let res = await getAllSpecialtyService('ALL');
        if (res && res.errCode === 0) {
            this.setState({
                arrSpecialty: res.data
            })
        }

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
    }
    handleViewDetailDoctor = (specialty) => {
        this.props.history.push(`/detail-specialty/${specialty.id}`)
    }
    render() {
        let { arrSpecialty } = this.state
        return (
            <div className='section-share section-specialty'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Chuyên khoa phổ biến</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {arrSpecialty.length > 0 && arrSpecialty.map((item, index) => {
                                let imageBase64 = '';
                                if (item.image) {
                                    imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                }
                                return (
                                    <div className='section-customize' key={index}
                                        onClick={() => this.handleViewDetailDoctor(item)}
                                    >
                                        <div className='customize-border'>
                                            <div className='outer-bg'>
                                                <div className='bg-image section-OutstandingDoctor'
                                                    style={{ backgroundImage: `url(${imageBase64})` }} />
                                            </div>
                                            <div className='position text-center'>
                                                <div>{item.name}</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
