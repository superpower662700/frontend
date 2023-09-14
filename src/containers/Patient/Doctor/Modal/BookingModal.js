import React, { Component } from 'react';
import { LANGUAGE } from '../../../../utils'
import { connect } from 'react-redux';
import './BookingModal.scss';
import { FormattedMessage } from 'react-intl';
import 'react-image-lightbox/style.css';
import { Modal } from 'reactstrap';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { toast } from 'react-toastify';
import _ from 'lodash';
import ProfileDoctor from '../ProfileDoctor';
import * as actions from "../../../../store/actions";
import DatePicker from '../../../../components/Input/DatePicker';


import { saveBooking } from '../../../../services/userService';

class BookingModal extends Component {


    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            gender: '',
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            doctorId: '',
            birthday: '',
            reason: '',
            timeType: '',
            date: '',
        }
    }


    async componentDidMount() {
        this.props.getGendersStart();
        let doctorId = this.props.dataTime.doctorId
        let timeType = this.props.dataTime.timeType
        let date = this.props.dataTime.date
        this.setState({
            doctorId: doctorId,
            timeType: timeType,
            date: date
        })
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArr: this.props.genderRedux,
                gender: this.props.genderRedux && this.props.genderRedux.length > 0 ? this.props.genderRedux[0].keyMap : ''
            })
        }
        if (prevProps.dataTime !== this.props.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let doctorId = this.props.dataTime.doctorId
                let timeType = this.props.dataTime.timeType

                let date = this.props.dataTime.date
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType,
                    date: date
                })
            }
        }
    }

    handleOnChangInput(event, id) {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }
    handleOnChangeDatePicker = (date) => {
        // let currentDate = moment(new Date(date[0])).startOf('days').valueOf();
        // let value = moment(currentDate).format('YYYY-MM-DD') + "T17:00:00.000Z";
        let formatedDate = new Date(date[0]).getTime();
        this.setState({ birthday: formatedDate });
    }
    handleSave = async () => {
        let { language, dataTime } = this.props
        let time = this.renderTimeBooking(dataTime)
        let doctorName = language === LANGUAGE.VI ? `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}` :
            `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`
        let res = await saveBooking({
            gender: this.state.gender,
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            doctorId: this.state.doctorId,
            birthday: this.state.birthday,
            reason: this.state.reason,
            date: this.state.date,
            timeType: this.state.timeType,
            time: time,
            doctorName: doctorName,
            language: this.props.language
        })
        if (res && res.errCode === 0) {
            toast.success("Create a new user success")
            this.setState({
                gender: this.props.genderRedux && this.props.genderRedux.length > 0 ? this.props.genderRedux[0].keyMap : '',
                fullName: '',
                phoneNumber: '',
                email: '',
                address: '',
                doctorId: '',
                birthday: '',
                reason: '',
                timeType: '',
                date: '',
            })
        } else {
            toast.error("Create a new user error")
        }
    }
    renderTimeBooking = (dataTime) => {
        let { language } = this.props
        let currentDate = moment(new Date(dataTime.date)).startOf('days').valueOf();
        let date = language === LANGUAGE.VI ? moment(currentDate).format('dddd - DD/MM/YYYY') :
            moment(currentDate).locale('en').format('ddd - MM/DD/YYYY')
        if (dataTime && !_.isEmpty(dataTime)) {
            return `${language === LANGUAGE.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn} - ${date}`
        }
    }
    render() {
        let { isOpenModal,
            closeBookingModal,
            dataTime, language } = this.props;
        let genders = this.state.genderArr;
        let {
            gender } = this.state;
        return (
            <Modal
                isOpen={isOpenModal}
                className='booking-modal-container'
                size='lg'
                centered>
                <div className='booking-modal-content'>
                    <div className='booking-modal-header'>
                        <span className='left'><FormattedMessage id='patient.text3' /></span>
                        <span className='right' onClick={closeBookingModal}><i className='fas fa-times'></i></span>
                    </div>
                    <div className='booking-modal-body'>
                        <div className='doctor-infor'>
                            <ProfileDoctor
                                doctorId={dataTime.doctorId}
                                dataTime={dataTime}
                                isShowInforDoctor={true}
                            />
                        </div>
                        <div className='price'>

                        </div>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='patient.name' /></label>
                                <input className='form-control'
                                    value={this.state.fullName}
                                    onChange={(event) => this.handleOnChangInput(event, 'fullName')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='patient.phonenumber' /></label>
                                <input className='form-control'
                                    value={this.state.phoneNumber}
                                    onChange={(event) => this.handleOnChangInput(event, 'phoneNumber')} />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='patient.email' /></label>
                                <input className='form-control'
                                    value={this.state.email}
                                    onChange={(event) => this.handleOnChangInput(event, 'email')} />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='patient.address' /></label>
                                <input className='form-control'
                                    value={this.state.address}
                                    onChange={(event) => this.handleOnChangInput(event, 'address')} />
                            </div>
                            <div className='col-12 form-group'>
                                <label><FormattedMessage id='patient.reason' /></label>
                                <input className='form-control'
                                    value={this.state.reason}
                                    onChange={(event) => this.handleOnChangInput(event, 'reason')} />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='patient.date' /></label>
                                <DatePicker
                                    onChange={this.handleOnChangeDatePicker}
                                    className='form-control'
                                    value={this.state.birthday}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='patient.sex' /></label>
                                <select className='form-control'
                                    onChange={(event) => this.handleOnChangInput(event, 'gender')}
                                    value={gender}
                                >
                                    {genders.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap}
                                            >{language === LANGUAGE.VI ? item.valueVi : item.valueEn}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='booking-modal-footer'>
                        <button className='btn-booking-confirm'
                            onClick={() => this.handleSave()}
                        >
                            <FormattedMessage id='patient.ok' />
                        </button>
                        <button className='btn-booking-cancel'
                            onClick={closeBookingModal}
                        >
                            <FormattedMessage id='patient.close' />
                        </button>
                    </div>
                </div>
            </Modal>
        )
    }
}
const mapStateToProps = state => {
    return {
        language: state.app.language,

        genderRedux: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {

        getGendersStart: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
