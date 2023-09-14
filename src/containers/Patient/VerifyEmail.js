import React, { Component } from 'react';

import { connect } from 'react-redux';
import './VerifyEmail.scss';
import 'react-image-lightbox/style.css';
import HeaderHome from '../HomePage/HeaderHome';
import { postVerifyBooking } from '../../services/userService'
class VerifyEmail extends Component {


    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errCode: 0
        }
    }


    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');
            let res = await postVerifyBooking({
                token: token,
                doctorId: doctorId
            })
            if (res && res.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode
                })
            }
            else {
                this.setState({
                    statusVerify: false,
                    errCode: res && res.errCode ? res.errCode : -1
                })
            }
        }
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {

    }


    render() {
        let { statusVerify, errCode } = this.state
        return (
            <>
                <HeaderHome />
                <div className='verify-email-container'>
                    {statusVerify === false ?
                        <div>Loading data...</div>
                        :
                        <div>
                            {
                                +errCode === 0 ?
                                    <div className='infor-booking'>Xác nhận lịch hẹn thành công </div>
                                    :
                                    <div className='infor-booking'>Lịch hẹn không tồn tại</div>
                            }
                        </div>
                    }
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
