import React, { Component } from 'react';

import { LANGUAGE } from '../../../utils'
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from "../../../store/actions";
import './DetailDoctor.scss'
import 'react-image-lightbox/style.css';
import HeaderHome from '../../HomePage/HeaderHome';
import DoctorSchedule from './DoctorSchedule';
import DoctorExtraInfor from './DoctorExtraInfor';
import ProfileDoctor from './ProfileDoctor';
class DetailDoctor extends Component {


    constructor(props) {
        super(props);
        this.state = {
            detailDoctorById: {}
        }
    }


    async componentDidMount() {
        await this.props.getDetailDoctorStart(this.props.match.params.id)
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.detailDoctor !== this.props.detailDoctor) {
            this.setState({
                detailDoctorById: this.props.detailDoctor
            })
        }
    }


    render() {
        let { detailDoctorById } = this.state;
        let { language } = this.props;
        let nameVi = '';
        let nameEn = '';
        if (detailDoctorById && detailDoctorById.positionData) {
            nameVi = `${detailDoctorById.positionData.valueVi}, ${detailDoctorById.lastName} ${detailDoctorById.firstName}`;
            nameEn = `${detailDoctorById.positionData.valueEn}, ${detailDoctorById.firstName} ${detailDoctorById.lastName}`;
        }
        return (
            <>
                <HeaderHome isShowBanner={false} />
                <div className='doctor-detail-container'>
                    <ProfileDoctor
                        doctorId={detailDoctorById.id}
                        isShowInforDoctor={false}
                    />
                    <div className='schedule-doctor'>
                        <div className='content-left'>
                            <DoctorSchedule
                                doctorIdFromParent={detailDoctorById && detailDoctorById.id ? detailDoctorById.id : -1}
                            />
                        </div>
                        <div className='content-right'>
                            <DoctorExtraInfor
                                doctorIdFromParent={detailDoctorById && detailDoctorById.id ? detailDoctorById.id : -1}
                            />
                        </div>
                    </div>
                    <div className='detail-infor-doctor'>
                        {
                            detailDoctorById && detailDoctorById.Markdown && detailDoctorById.Markdown.contentHTML
                            &&
                            <div dangerouslySetInnerHTML={{ __html: detailDoctorById.Markdown.contentHTML }}></div>
                        }
                    </div>
                    <div className='comment-doctor'>

                    </div>
                </div>
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        detailDoctor: state.admin.detailDoctor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDetailDoctorStart: (id) => dispatch(actions.fetDetailDoctorByIdStart(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
