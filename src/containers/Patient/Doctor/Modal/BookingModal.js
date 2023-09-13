import React, { Component } from 'react';

import { LANGUAGE } from '../../../../utils'
import { connect } from 'react-redux';
import './BookingModal.scss';
import { FormattedMessage } from 'react-intl';
import 'react-image-lightbox/style.css';
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
class BookingModal extends Component {


    constructor(props) {
        super(props);
        this.state = {
        }
    }


    async componentDidMount() {
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {

    }


    render() {
        let { isOpenModal,
            closeBookingModal,
            dataTime } = this.props;
        return (
            <Modal
                isOpen={isOpenModal}
                className='booking-modal-container'
                size='lg'
                centered>
                <div className='booking-modal-content'>
                    <div className='booking-modal-header'>
                        <span className='left'>Thông tin đặt lịch khám bệnh</span>
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
                                <label>Họ tên</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Số điện thoại</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Địa chỉ Email</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Địa chỉ liên hệ</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Lý do khám</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Đặt cho ai</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Giới tính</label>
                                <input className='form-control' />
                            </div>
                        </div>
                    </div>
                    <div className='booking-modal-footer'>
                        <button className='btn-booking-confirm'
                            onClick={closeBookingModal}
                        >
                            Xác nhận
                        </button>
                        <button className='btn-booking-cancel'
                            onClick={closeBookingModal}
                        >
                            Hủy bỏ
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
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
