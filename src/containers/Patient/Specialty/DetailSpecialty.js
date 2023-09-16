
import React, { Component } from 'react';
import * as actions from '../../../store/actions'
import { LANGUAGE } from '../../../utils'
import { connect } from 'react-redux';
import './DetailSpecialty.scss';
import 'react-image-lightbox/style.css';
import { getAllSpecialtyService, getDoctorIdBySpecialtyId } from '../../../services/userService'
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import HeaderHome from '../../HomePage/HeaderHome';


class DetailSpecialty extends Component {


    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            listProvince: [],
            selectedProvince: '',
            detailSpecialty: {},
        }
    }
    async handleOnChangInput(event, id) {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
        let arrDoctorId = await getDoctorIdBySpecialtyId(this.state.detailSpecialty.id, event.target.value)
        if (arrDoctorId && arrDoctorId.errCode === 0) {
            this.setState({
                arrDoctorId: arrDoctorId.data
            })

        }
    }

    async componentDidMount() {
        this.props.getProvinceStart();
        let res = await getAllSpecialtyService(this.props.match.params.id)
        if (res && res.errCode === 0) {
            this.setState({
                detailSpecialty: res.data
            })
            let specialtyId = res.data && res.data.id ? res.data.id : null;
            let arrDoctorId = await getDoctorIdBySpecialtyId(specialtyId, 'ALL')



            if (arrDoctorId && arrDoctorId.errCode === 0) {
                this.setState({
                    arrDoctorId: arrDoctorId.data
                })

            }
        }
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.provinces !== this.props.provinces) {
            this.props.provinces.reverse()
            if (this.props.provinces && this.props.provinces.length > 0) {
                this.props.provinces.push({
                    createdAt: null,
                    keyMap: "ALL",
                    type: 'PROVINCEID',
                    valueEn: 'Nationwide',
                    valueVi: 'Toàn Quốc'
                })
            }
            this.props.provinces.reverse()
            this.setState({
                listProvince: this.props.provinces,
                selectedProvince: this.props.provinces && this.props.provinces.length > 0 ? this.props.provinces[0].keyMap : ''
            })
        }
    }


    render() {
        let { arrDoctorId, detailSpecialty, listProvince } = this.state;
        let { language } = this.props
        return (
            <>
                <div className='detail-specialty-container'>
                    <HeaderHome />
                    <div className='detail-specialty-body'>
                        <div className='detail-specialty-body-content'>
                            <div dangerouslySetInnerHTML={{ __html: detailSpecialty.descriptionHTML }}></div>
                        </div>
                        <div className='search-sp-doctor'>
                            <select
                                onChange={(event) => this.handleOnChangInput(event, 'selectedProvince')}
                                value={this.state.selectedProvince}
                            >
                                {listProvince.map((item, index) => {
                                    return (
                                        <option key={index} value={item.keyMap}
                                        >{language === LANGUAGE.VI ? item.valueVi : item.valueEn}</option>
                                    )
                                })}
                            </select>
                        </div>
                        {
                            arrDoctorId && arrDoctorId.length > 0
                            && arrDoctorId.map((item, index) => {
                                return (
                                    <div className='each-doctor' key={index}>
                                        <div className='dt-content-left'>
                                            <div className='profile-doctor'>
                                                <ProfileDoctor
                                                    doctorId={item.doctorId}
                                                    isShowInforDoctor={false}

                                                    isShowLinkDetailDoctor={true}
                                                />
                                            </div>
                                        </div>
                                        <div className='dt-content-right'>
                                            <div className='doctor-schedule'>
                                                <DoctorSchedule
                                                    doctorIdFromParent={item.doctorId}
                                                />
                                            </div>
                                            <div className='doctor-extra-infor'>
                                                <DoctorExtraInfor
                                                    doctorIdFromParent={item.doctorId}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </>
        )
    }
}
const mapStateToProps = state => {
    return {
        language: state.app.language,
        provinces: state.admin.provinces,
    };
};

const mapDispatchToProps = dispatch => {
    return {

        getProvinceStart: () => dispatch(actions.fetchProvinceStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
