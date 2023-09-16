import React, { Component } from 'react';

import { LANGUAGE } from '../../../utils'
import { connect } from 'react-redux';
import './ProfileDoctor.scss';
import { FormattedMessage } from 'react-intl';
import 'react-image-lightbox/style.css';
import { getDetailDoctorByIdService } from '../../../services/userService';
import _ from 'lodash';

import localization from 'moment/locale/vi';
import moment from 'moment';

import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom/cjs/react-router-dom';
class ProfileDoctor extends Component {


    constructor(props) {
        super(props);
        this.state = {
            doctorInfor: [],
        }
    }


    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId)
        this.setState({
            doctorInfor: data
        })
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.doctorId !== this.props.doctorId) {
            let data = await this.getInforDoctor(this.props.doctorId)
            this.setState({
                doctorInfor: data
            })
        }
    }
    getInforDoctor = async (doctorId) => {
        let result = {};
        if (doctorId) {
            let res = await getDetailDoctorByIdService(doctorId);
            if (res && res.errCode === 0) {
                result = res.data
            }
        }
        return result
    }
    renderTimeBooking = (dataTime) => {
        let { language } = this.props
        let currentDate = moment(new Date(dataTime.date)).startOf('days').valueOf();
        let date = language === LANGUAGE.VI ? moment(currentDate).format('dddd - DD/MM/YYYY') : moment(currentDate).locale('en').format('ddd - MM/DD/YYYY')
        if (dataTime && !_.isEmpty(dataTime)) {
            return (
                <>
                    <div>{language === LANGUAGE.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn}</div>
                    <div>{date}</div>
                </>
            )
        }
    }

    render() {
        let { doctorInfor } = this.state;
        let { language, isShowInforDoctor, dataTime, isShowLinkDetailDoctor } = this.props;
        let nameVi = '';
        let nameEn = '';
        if (doctorInfor && doctorInfor.positionData) {
            nameVi = `${doctorInfor.positionData.valueVi}, ${doctorInfor.lastName} ${doctorInfor.firstName}`;
            nameEn = `${doctorInfor.positionData.valueEn}, ${doctorInfor.firstName} ${doctorInfor.lastName}`;
        }
        return (
            <>
                <div className='intro-doctor'>
                    <div className='content-left'
                        style={{ backgroundImage: `url(${doctorInfor && doctorInfor.image ? doctorInfor.image : ''})` }}
                    >
                    </div>
                    <div className='content-right'>
                        <div className='up'>
                            {language === LANGUAGE.VI ? nameVi : nameEn}
                        </div>
                        <div className='down'>
                            {isShowInforDoctor === false ?
                                <>
                                    {doctorInfor && doctorInfor.Markdown && doctorInfor.Markdown.description &&
                                        <span>
                                            {doctorInfor.Markdown.description}
                                        </span>
                                    }
                                </>
                                :
                                <>{this.renderTimeBooking(dataTime)}</>
                            }

                        </div>

                    </div>

                </div>
                {
                    isShowLinkDetailDoctor === true ?
                        < div className='seen'>
                            <Link to={`/detail-doctor/${this.props.doctorId}`}>Xem Thêm</Link>
                        </div >
                        : ''
                }
                {
                    isShowInforDoctor === true ?
                        <div>

                            <FormattedMessage id='patient.examination-price' />
                            {doctorInfor && doctorInfor.Doctor_infor && doctorInfor.Doctor_infor.priceTypeData && language === LANGUAGE.VI &&
                                <NumberFormat
                                    value={doctorInfor.Doctor_infor.priceTypeData.valueVi}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'VND'}
                                />}
                            {doctorInfor && doctorInfor.Doctor_infor && doctorInfor.Doctor_infor.priceTypeData && language === LANGUAGE.EN &&
                                <NumberFormat
                                    value={doctorInfor.Doctor_infor.priceTypeData.valueEn}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'$'}
                                />}

                        </div>
                        : ''
                }
            </>
        )
    }
}
const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
