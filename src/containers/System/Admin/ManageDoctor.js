import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import MarkdownIt from 'markdown-it';
import * as actions from '../../../store/actions'
import MdEditor from 'react-markdown-editor-lite';
import Select from 'react-select';
// import style manually
import { LANGUAGE, CRUD_ACTIONS } from '../../../utils'
import { getAllCodeService } from '../../../services/userService'
import 'react-markdown-editor-lite/lib/index.css';


const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!

class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailDoctorById: '',
            contentHTML: '',
            contentMarkdown: '',
            description: '',
            selectedOption: '',
            arrDoctors: '',
            listPrice: [],
            listPayment: [],
            listProvince: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            addressClinic: '',
            nameClinic: '',
            note: '',
            hasOldData: false
        }
    }



    componentDidMount() {
        this.props.getAllDoctorRedux();
        this.props.getPriceStart();
        this.props.getPaymentStart();
        this.props.getProvinceStart();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.doctors !== this.props.doctors) {
            let dataSelect = this.buildDataInputSelect(this.props.doctors)
            this.setState({
                arrDoctors: dataSelect,
            })
        }

        if (prevProps.prices !== this.props.prices) {
            this.setState({
                listPrice: this.props.prices,
                selectedPrice: this.props.prices && this.props.prices.length > 0 ? this.props.prices[0].keyMap : ''
            })
        }
        if (prevProps.payments !== this.props.payments) {
            this.setState({
                listPayment: this.props.payments,
                selectedPayment: this.props.payments && this.props.payments.length > 0 ? this.props.payments[0].keyMap : ''
            })
        }
        if (prevProps.provinces !== this.props.provinces) {
            this.setState({
                listProvince: this.props.provinces,
                selectedProvince: this.props.provinces && this.props.provinces.length > 0 ? this.props.provinces[0].keyMap : ''
            })
        }

        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.doctors)
            this.setState({
                arrDoctors: dataSelect,
            })
        }
        if (prevProps.detailDoctor !== this.props.detailDoctor) {
            this.setState({
                detailDoctorById: this.props.detailDoctor
            })
        }
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text,
        })
    }
    handleChange = async (selectedOption) => {
        this.setState({ selectedOption });
        await this.props.getDetailDoctorStart(selectedOption.value);

        if (this.state.detailDoctorById.Markdown === null || this.state.detailDoctorById.Markdown.id === null) {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false
            })
        }
        else {
            this.setState({
                contentHTML: this.state.detailDoctorById.Markdown.contentHTML,
                contentMarkdown: this.state.detailDoctorById.Markdown.contentMarkdown,
                description: this.state.detailDoctorById.Markdown.description,
                hasOldData: true
            })
        }

        if (this.state.detailDoctorById.Doctor_infor === null || this.state.detailDoctorById.Doctor_infor.id === null) {
            this.setState({
                selectedPrice: this.props.prices && this.props.prices.length > 0 ? this.props.prices[0].keyMap : '',
                selectedPayment: this.props.payments && this.props.payments.length > 0 ? this.props.payments[0].keyMap : '',
                selectedProvince: this.props.provinces && this.props.provinces.length > 0 ? this.props.provinces[0].keyMap : '',
                addressClinic: '',
                nameClinic: '',
                note: '',
            })
        }
        else {
            this.setState({
                selectedPrice: this.state.detailDoctorById.Doctor_infor.priceId,
                selectedPayment: this.state.detailDoctorById.Doctor_infor.paymentId,
                selectedProvince: this.state.detailDoctorById.Doctor_infor.provinceId,
                addressClinic: this.state.detailDoctorById.Doctor_infor.addressClinic,
                nameClinic: this.state.detailDoctorById.Doctor_infor.nameClinic,
                note: this.state.detailDoctorById.Doctor_infor.note,
            })
        }
        console.log(this.state.selectedPrice);
    }
    checkValideInput = () => {
        let isValid = true;
        let arrInput = ['addressClinic', 'nameClinic', 'description'];
        for (const element of arrInput) {
            if (!this.state[element]) {
                isValid = false
                alert('Missing parameters: ' + element)
                break;
            }
        }
        return isValid;
    }
    handleSaveContentMarkDown = () => {
        if (this.checkValideInput()) {
            this.props.saveInforDoctorRedux({
                contentHTML: this.state.contentHTML,
                contentMarkdown: this.state.contentMarkdown,
                description: this.state.description,
                doctorId: this.state.selectedOption.value,
                action: this.state.hasOldData === false ? CRUD_ACTIONS.CREATE : CRUD_ACTIONS.EDIT,

                priceId: this.state.selectedPrice,
                paymentId: this.state.selectedPayment,
                provinceId: this.state.selectedProvince,
                addressClinic: this.state.addressClinic,
                nameClinic: this.state.nameClinic,
                note: this.state.note,
            })
            this.setState({
                selectedOption: '',
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
                selectedPrice: this.props.prices && this.props.prices.length > 0 ? this.props.prices[0].keyMap : '',
                selectedPayment: this.props.payments && this.props.payments.length > 0 ? this.props.payments[0].keyMap : '',
                selectedProvince: this.props.provinces && this.props.provinces.length > 0 ? this.props.provinces[0].keyMap : '',
                addressClinic: '',
                nameClinic: '',
                note: '',
            })
        }
        else {
            return
        }

    }
    handleOnChangInput(event, id) {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
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
    render() {
        let { hasOldData, listPrice, listProvince, listPayment, addressClinic, nameClinic, note, description } = this.state;
        let { language } = this.props;
        console.log(this.state.detailDoctorById);
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>
                    Tạo thêm thông tin bác sĩ
                </div>
                <div className='more-infor'>
                    <div className='content-left form-group'>
                        <label>Chọn bác sĩ</label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChange}
                            options={this.state.arrDoctors}
                        />
                    </div>
                    <div className='content-right'>
                        <label>Giới thiệu bác sĩ</label>
                        <textarea className='form-control' rows='4'
                            onChange={(event) => this.handleOnChangInput(event, 'description')}
                            value={description}
                        >
                        </textarea>

                    </div>

                </div>
                <div className='more-infor-extra row'>
                    <div className='col-4 form-group'>
                        <label>Chọn Giá</label>
                        <select className='form-control'
                            onChange={(event) => this.handleOnChangInput(event, 'selectedPrice')}
                            value={this.state.selectedPrice}
                        >
                            {listPrice.map((item, index) => {
                                return (
                                    <option key={index} value={item.keyMap}
                                    >{language === LANGUAGE.VI ? item.valueVi : item.valueEn}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className='col-4 form-group'>
                        <label>Chọn Phương thức</label>
                        <select className='form-control'
                            onChange={(event) => this.handleOnChangInput(event, 'selectedPayment')}
                            value={this.state.selectedPayment}
                        >
                            {listPayment.map((item, index) => {
                                return (
                                    <option key={index} value={item.keyMap}
                                    >{language === LANGUAGE.VI ? item.valueVi : item.valueEn}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className='col-4 form-group'>
                        <label>Chọn Tỉnh Thành</label>
                        <select className='form-control'
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
                    <div className='col-4 form-group'>
                        <label>Tên phòng khám</label>
                        <input className='form-control' type='text' value={addressClinic}
                            onChange={(event) => this.handleOnChangInput(event, 'addressClinic')}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Địa chỉ phòng khám</label>
                        <input className='form-control' type='text' value={nameClinic}
                            onChange={(event) => this.handleOnChangInput(event, 'nameClinic')}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Note</label>
                        <input className='form-control' type='text' value={note}
                            onChange={(event) => this.handleOnChangInput(event, 'note')}
                        />
                    </div>
                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown} />
                </div>
                <button className={hasOldData === false ? 'create-content-doctor' : 'save-content-doctor'}
                    onClick={() => this.handleSaveContentMarkDown()}>{hasOldData === true ? <span>Lưu thông tin</span> : <span>Tạo thông tin</span>}</button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        users: state.admin.user,
        doctors: state.admin.doctors,
        language: state.app.language,
        detailDoctor: state.admin.detailDoctor,
        prices: state.admin.prices,
        payments: state.admin.payments,
        provinces: state.admin.provinces,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctorRedux: () => dispatch(actions.fetAllDoctorStart()),
        saveInforDoctorRedux: (data) => dispatch(actions.saveDetailDoctorStart(data)),
        getDetailDoctorStart: (id) => dispatch(actions.fetDetailDoctorByIdStart(id)),
        getPriceStart: () => dispatch(actions.fetchPriceStart()),
        getPaymentStart: () => dispatch(actions.fetchPaymentStart()),
        getProvinceStart: () => dispatch(actions.fetchProvinceStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
