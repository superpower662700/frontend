import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';
import { LANGUAGE } from '../../utils/constant'
import { FormattedMessage } from 'react-intl';

class Header extends Component {
    handleLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }
    render() {
        const { processLogout, language, userInfo } = this.props;
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>
                <div className='languague'>

                    <div className='languague-body'>
                        <span><FormattedMessage id="headerhome.wellcome" />{userInfo.firstName}!</span>
                        <span className={language === LANGUAGE.VI ? 'language-vi active' : 'language-vi'}
                            onClick={() => this.handleLanguage(LANGUAGE.VI)}>VN</span>
                        <span className={language === LANGUAGE.EN ? 'language-en active' : 'language-en'}
                            onClick={() => this.handleLanguage(LANGUAGE.EN)}>EN</span>
                    </div>
                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout}>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
