import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import Select from 'react-select';
import { LANGUAGE, dateFormat } from '../../../utils'
import { FormattedMessage } from 'react-intl';
import DatePicker from '../../../components/Input/DatePicker';
import './ManageSchedule.scss'
import { toast } from 'react-toastify';
import moment from 'moment';
import _ from 'lodash';
import { saveBulkSchedule } from '../../../services/userService';
class ManageSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listDoctor: [],
            selectedDoctor: {},
            currentDate: '',
            rangeTime: []
        }
    }
    componentDidMount() {
        this.props.getAllDoctorRedux();
        this.props.getAllScheduleTime();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.doctors !== this.props.doctors) {
            let dataSelect = this.buildDataInputSelect(this.props.doctors)
            this.setState({
                listDoctor: dataSelect,
            })
        }
        if (prevProps.scheduleTimes !== this.props.scheduleTimes) {
            let data = this.props.scheduleTimes;
            if (data && data.length > 0) {
                data = data.map(item => ({ ...item, isSelected: false }))
            }
            this.setState({
                rangeTime: data
            })
        }
    }
    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelEn = `${item.firstName} ${item.lastName}`;
                let labelVi = `${item.lastName} ${item.firstName}`;
                object.label = language === LANGUAGE.EN ? labelEn : labelVi;
                object.value = item.id;
                result.push(object)
            })
        }
        return result;
    }
    handleChange = async (selectedOption) => {
        this.setState({ selectedDoctor: selectedOption });
    }
    handleOnChangeDatePicker = (date) => {
        this.setState({ currentDate: date[0] });
    }
    handleClickBtnTime = (time) => {
        let { rangeTime } = this.state;
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id)
                    item.isSelected = !item.isSelected;
                return item;
            })
            this.setState({
                rangeTime: rangeTime
            })
        }
    }
    handleSaveScheudle = async () => {
        let { rangeTime, selectedDoctor, currentDate } = this.state;
        let result = [];

        if (!selectedDoctor.value && _.isEmpty(selectedDoctor.value)) {
            toast.error("Invalid Selecte Doctor")
            return;
        }
        if (!currentDate) {
            toast.error("Invalid Date")
            return;
        }
        console.log('currentDate: ', currentDate);
        let formatedDate = new Date(currentDate).getTime();

        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true)
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map((schedule, index) => {
                    let object = {};
                    object.doctorId = selectedDoctor.value;
                    object.date = formatedDate;
                    object.timeType = schedule.keyMap;
                    result.push(object);
                })
            } else {
                toast.error("Invalid Selecte Time");
                return;
            }
            let data = await saveBulkSchedule({
                arrSchedule: result,
                doctorId: selectedDoctor.value,
                date: formatedDate
            });
            if (!data.errCode && data.errCode === 0) {
                toast.success("Success Doctor Schedule");
            }
            else {
                toast.error("Error");
            }
        }

    }
    render() {
        let { rangeTime } = this.state;
        let { language } = this.props;
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        return (
            <div className='manage-schedule-container'>
                <div className='m-s-title'>
                    <FormattedMessage id='manage-schedule.title' />
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 form group'>
                            <label><FormattedMessage id='manage-schedule.choose-doctor' /></label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChange}
                                options={this.state.listDoctor}
                            />
                        </div>
                        <div className='col-6 form group'>
                            <label><FormattedMessage id='manage-schedule.choose-date' /></label>
                            <DatePicker
                                onChange={this.handleOnChangeDatePicker}
                                className='form-control'
                                value={this.state.currentDate}
                                minDate={yesterday}
                            />
                        </div>
                        <div className='col-12 pick-hour-container'>
                            {rangeTime && rangeTime.length > 0 &&
                                rangeTime.map((item, index) => {
                                    return (
                                        <button
                                            key={index}
                                            className={item.isSelected ? 'btn btn-schedule active' : 'btn btn-schedule'}
                                            onClick={() => this.handleClickBtnTime(item)}>
                                            {language === LANGUAGE.EN ? item.valueEn : item.valueVi}
                                        </button>
                                    )
                                })
                            }
                        </div>
                        <div className='col-12'>
                            <button className='btn btn-primary btn-save-schedule'
                                onClick={() => this.handleSaveScheudle()}
                            >
                                <FormattedMessage id='manage-schedule.save' />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}


const mapStateToProps = state => {
    return {
        language: state.app.language,
        scheduleTimes: state.admin.scheduleTime,
        doctors: state.admin.doctors,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctorRedux: () => dispatch(actions.fetAllDoctorStart()),
        getAllScheduleTime: () => dispatch(actions.fetAllScheduleTimeStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
