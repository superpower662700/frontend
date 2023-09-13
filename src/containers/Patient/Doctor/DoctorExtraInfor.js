import React, { Component } from 'react';

import { LANGUAGE } from '../../../utils'
import { connect } from 'react-redux';
import './DoctorExtraInfor.scss';
import { FormattedMessage } from 'react-intl';
import 'react-image-lightbox/style.css';
import { getDoctorInfor } from '../../../services/userService'
import NumberFormat from 'react-number-format';
class DoctorExtraInfor extends Component {


    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false,
            doctorInfor: [],
        }
    }


    async componentDidMount() {
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
        }
        if (prevProps.doctorIdFromParent !== this.props.doctorIdFromParent) {
            let doctorInfor = await getDoctorInfor(this.props.doctorIdFromParent);
            if (doctorInfor && doctorInfor.errCode === 0) {
                this.setState({
                    doctorInfor: doctorInfor.data
                })
            }

        }

    }
    showHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: !this.state.isShowDetailInfor
        })
    }

    render() {

        let { isShowDetailInfor, doctorInfor } = this.state;
        let { language } = this.props;
        return (
            <div className='doctor-extra-infor-container'>
                <div className='content-up'>
                    <div className='text-address'><FormattedMessage id='patient.examination-address' /></div>
                    <div className='name-clinic'>{doctorInfor && doctorInfor.addressClinic ? doctorInfor.addressClinic : ''}</div>
                    <div className='detail-address'>{doctorInfor && doctorInfor.nameClinic ? doctorInfor.nameClinic : ''}</div>
                </div>
                <div className='content-down'>
                    {isShowDetailInfor === false &&
                        <div className='short-infor'><FormattedMessage id='patient.examination-price' />
                            {doctorInfor && doctorInfor.priceTypeData ? language === LANGUAGE.VI ?
                                <NumberFormat
                                    value={doctorInfor.priceTypeData.valueVi}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'VND'}
                                />
                                : <NumberFormat
                                    value={doctorInfor.priceTypeData.valueEn}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'$'}
                                /> : ''}

                            <span className='detail' onClick={() => this.showHideDetailInfor()}> <FormattedMessage id='patient.see-details' /> </span>
                        </div>

                    }
                    {isShowDetailInfor === true &&
                        <>
                            <div className='title-price'><FormattedMessage id='patient.examination-price' /></div>
                            <div className='detail-infor'>
                                <div className='price'>
                                    <div className='left'><FormattedMessage id='patient.examination-price' /></div>
                                    <div className='right'>{doctorInfor && doctorInfor.priceTypeData ? language === LANGUAGE.VI ?
                                        <NumberFormat
                                            value={doctorInfor.priceTypeData.valueVi}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={'VND'}
                                        />
                                        : <NumberFormat
                                            value={doctorInfor.priceTypeData.valueEn}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={'$'}
                                        /> : ''}</div>
                                </div>
                                <div className='note'>
                                    {doctorInfor && doctorInfor.note ? doctorInfor.note : ''}
                                </div>
                            </div>
                            <div className='payment'><FormattedMessage id='patient.text2' />
                                {doctorInfor && doctorInfor.priceTypeData ? language === LANGUAGE.VI ?
                                    doctorInfor.paymentTypeData.valueVi : doctorInfor.paymentTypeData.valueEn : ''}</div>
                            <div className='hide-price'>

                                <span onClick={() => this.showHideDetailInfor()}><FormattedMessage id='patient.hide-less' /></span>
                            </div>
                        </>
                    }
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
