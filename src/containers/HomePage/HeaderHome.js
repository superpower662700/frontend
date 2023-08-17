import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HeaderHome.scss';
import { FormattedMessage } from 'react-intl';
import { LANGUAGE } from '../../utils/constant'
import { withRouter } from 'react-router';
import { changeLanguageApp } from "../../store/actions"
class HeaderHome extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }
    handlereturnhome = () => {
        this.props.history.push(`/home`)
    }
    render() {
        let language = this.props.language;
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className='fas fa-bars'></i>
                            <div className='header-logo' onClick={() => this.handlereturnhome()}></div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="headerhome.speciality" /></b></div>
                                <div><FormattedMessage id="headerhome.searchdoctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="headerhome.health-facility" /></b></div>
                                <div><FormattedMessage id="headerhome.search-room" />
                                </div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="headerhome.doctor" /></b></div>
                                <div><FormattedMessage id="headerhome.search-doctor" />
                                </div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="headerhome.fee" /></b></div>
                                <div><FormattedMessage id="headerhome.check-health" />
                                </div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'>
                                <i className='fas fa-question-circle'>
                                </i>
                                <div className='sp'><FormattedMessage id="headerhome.support" /></div>
                            </div>
                            <div className='flag'>
                                <div className={language === LANGUAGE.VI ? 'languageVN active' : 'languageVN'}><span onClick={() => this.changeLanguage(LANGUAGE.VI)}>VN</span></div>
                                <div className={language === LANGUAGE.EN ? 'languageEN active' : 'languageEN'}><span onClick={() => this.changeLanguage(LANGUAGE.EN)}>EN</span></div>
                            </div>

                        </div>
                    </div>
                </div>
                {this.props.isisShowBanner === true &&
                    <div className='home-header-banner'>
                        <div className='content-up'><div className='title1'><FormattedMessage id="headerhome.title1" /></div>
                            <div className='title2'><FormattedMessage id="headerhome.title2" /></div>
                            <div className='search'>
                                <i className='fas fa-search'></i>
                                <input type='text' placeholder='Tìm chuyên khoa khám bệnh'>
                                </input>
                            </div></div>
                        <div className='content-down'>
                            <div className='options'>
                                <div className='options-child'>
                                    <div className='icon-child'><i className='far fa-hospital'></i></div>
                                    <div className='text-child'><FormattedMessage id="headerhome.child1" /></div>
                                </div>
                                <div className='options-child'>
                                    <div className='icon-child'><i className='fas fa-mobile-alt'></i></div>
                                    <div className='text-child'><FormattedMessage id="headerhome.child2" /></div>
                                </div>
                                <div className='options-child'>
                                    <div className='icon-child'><i className='fas fa-book'></i></div>
                                    <div className='text-child'><FormattedMessage id="headerhome.child3" /></div>
                                </div>
                                <div className='options-child'>
                                    <div className='icon-child'><i className='fas fa-flask'></i></div>
                                    <div className='text-child'><FormattedMessage id="headerhome.child4" /></div>
                                </div>
                                <div className='options-child'>
                                    <div className='icon-child'><i className='fas fa-user-md'></i></div>
                                    <div className='text-child'><FormattedMessage id="headerhome.child5" /></div>
                                </div>
                                <div className='options-child'>
                                    <div className='icon-child'><i className='fas fa-briefcase-medical'></i></div>
                                    <div className='text-child'><FormattedMessage id="headerhome.child6" /></div>
                                </div>
                            </div>
                        </div>


                    </div>}
            </React.Fragment>

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderHome));
