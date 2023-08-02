//OutstandingDoctor
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { LANGUAGE } from '../../../utils';
class OutstandingDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrTopDoctor: [],
        }
    }
    componentDidMount() {
        this.props.getTopDoctorStart();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctor !== this.props.topDoctor) {
            this.setState({
                arrTopDoctor: this.props.topDoctor
            })
        }
    }

    render() {
        let arrTopDoctor = this.state.arrTopDoctor;
        arrTopDoctor = arrTopDoctor.concat(arrTopDoctor).concat(arrTopDoctor)
        const { language } = this.props;
        return (
            <div className='section-share section-OutstandingDoctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Bác sĩ nổi bật tuần qua</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>

                            {arrTopDoctor.length > 0 && arrTopDoctor.map((item, index) => {

                                let imageBase64 = '';
                                if (item.image) {
                                    imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                }

                                let nameVi = `${item.positionData.valueVi}, ${item.firstName} ${item.lastName}`;
                                let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                                return (
                                    <div className='section-customize ' key={index}>
                                        <div className='customize-border'>
                                            <div className='outer-bg'>
                                                <div className='bg-image section-OutstandingDoctor'
                                                    style={{ backgroundImage: `url(${imageBase64})` }} />
                                            </div>
                                            <div className='position text-center'>
                                                <div>{language === LANGUAGE.VI ? nameVi : nameEn}</div>
                                                <div>Cơ xương khớp </div>
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
        language: state.app.language,
        topDoctor: state.admin.topDoctor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getTopDoctorStart: () => dispatch(actions.fetTopDoctorStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);