import React, { Component } from 'react';

import { LANGUAGE } from '../../../utils'
import { connect } from 'react-redux';
import './DefaultClass.scss';
import { FormattedMessage } from 'react-intl';
import 'react-image-lightbox/style.css';
import { getDoctorInfor } from '../../../services/userService'
import NumberFormat from 'react-number-format';
class DefaultClass extends Component {


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
        return (
            <></>
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

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
