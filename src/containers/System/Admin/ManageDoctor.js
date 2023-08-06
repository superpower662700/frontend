import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import MarkdownIt from 'markdown-it';
import * as actions from '../../../store/actions'
import MdEditor from 'react-markdown-editor-lite';
import Select from 'react-select';
// import style manually
import { LANGUAGE } from '../../../utils'
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
            contentHTML: '',
            contentMarkdown: '',
            description: '',
            selectedOption: '',
            arrDoctors: '',
        }
    }



    componentDidMount() {
        this.props.getAllDoctorRedux();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.doctors !== this.props.doctors) {
            let dataSelect = this.buildDataInputSelect(this.props.doctors)
            this.setState({
                arrDoctors: dataSelect,
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.doctors)
            this.setState({
                arrDoctors: dataSelect,
            })
        }
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text,
        })
    }
    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
    }
    handleSaveContentMarkDown = () => {
        this.props.saveInforDoctorRedux({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value
        })
    }
    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value
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
                            onChange={(event) => this.handleOnChangeDesc(event)}
                            value={this.state.description}
                        >
                            asdsa
                        </textarea>

                    </div>

                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={this.handleEditorChange} />

                </div>
                <button className='save-content-doctor'
                    onClick={() => this.handleSaveContentMarkDown()}>Lưu thông tin</button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        users: state.admin.user,
        doctors: state.admin.doctors,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctorRedux: () => dispatch(actions.fetAllDoctorStart()),
        saveInforDoctorRedux: (data) => dispatch(actions.saveDetailDoctorStart(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
