import React, { Component } from 'react';

import { LANGUAGE } from '../../../utils'
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from "../../../store/actions";
import './DoctorSchedule.scss';
import moment from 'moment';
import localization from 'moment/locale/vi';
import 'react-image-lightbox/style.css';
import { getDoctorSchedule } from '../../../services/userService'
import BookingModal from './Modal/BookingModal';
class DoctorSchedule extends Component {


    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvalableTime: [],
            isOpenModalBooking: false,
            dataScheduleTime: [],
        }
    }


    async componentDidMount() {
        let { language } = this.props;
        let allDays = this.getArrDays(language);
        this.setState({
            allDays: allDays
        })
    }

    getArrDays = (language) => {
        let allDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {}
            if (language === LANGUAGE.VI) {
                object.label = moment(new Date()).add(i, 'days').format('dddd-DD/MM')
            }
            else {
                object.label = moment(new Date()).add(i, 'days').locale('en').format('dddd-DD/MM')
            }

            let currentDate = moment(new Date()).add(i - 1, 'days').startOf('days').valueOf();
            object.value = moment(currentDate).format('YYYY-MM-DD') + "T17:00:00.000Z";
            allDays.push(object);
        }
        return allDays
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
            let allDays = this.getArrDays(this.props.language)
            this.setState({
                allDays: allDays
            })

        }
        if (prevProps.doctorIdFromParent !== this.props.doctorIdFromParent) {
            let allDays = this.getArrDays(this.props.language)
            this.setState({
                allDays: allDays
            })
            let res = await getDoctorSchedule(this.props.doctorIdFromParent, allDays[0].value);
            this.setState({
                allAvalableTime: res.data
            })
        }

    }
    handleOnchangeSelect = async (event) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent;
            let date = event.target.value
            let res = await getDoctorSchedule(doctorId, date);
            this.setState({
                allAvalableTime: res.data
            })
        }
    }
    handleSchedule = (schedule) => {
        this.setState({
            isOpenModalBooking: true,
            dataScheduleTime: schedule
        })
    }
    closeBookingModal = () => {
        this.setState({
            isOpenModalBooking: false,
        })
    }

    render() {
        let { allDays, allAvalableTime, isOpenModalBooking,
            dataScheduleTime } = this.state;
        let { language } = this.props;
        return (
            <>
                <div className='doctor-schedule-container'>
                    <div className='all-schedule'>
                        <select onChange={(event) => this.handleOnchangeSelect(event)}>
                            {allDays.map((item, index) => {
                                return (
                                    <option value={item.value} key={index}>{item.label}</option>
                                )
                            })
                            }
                        </select>
                    </div>
                    <div className='all-vailable-time'>
                        <div className='text-calendar'>
                            <i className='fas fa-calendar-alt'><span><FormattedMessage id='patient.examination-schedule' /></span></i>
                        </div>
                        <div className='time-content'>
                            {allAvalableTime && allAvalableTime.length > 0 ?
                                allAvalableTime.map((item, index) => {
                                    let timeDisplay = language === LANGUAGE.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => this.handleSchedule(item)}
                                        >
                                            {timeDisplay}

                                        </button>
                                    )
                                }) : <div><FormattedMessage id='patient.text1' /></div>
                            }
                        </div>
                    </div>
                </div>
                <BookingModal
                    isOpenModal={isOpenModalBooking}
                    closeBookingModal={this.closeBookingModal}
                    dataTime={dataScheduleTime}
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
