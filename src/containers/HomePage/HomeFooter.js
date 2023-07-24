//HomeFooter
import React, { Component } from 'react';
import { connect } from 'react-redux';
class HomeFooter extends Component {


    render() {
        return (
            <div className='homefooter-body'>
                <div className='text-center'>
                    <h6>@ 2021 Hỏi dân IT với Eric More information, please visit my youtube channel
                        <a target='_black' href='https://www.youtube.com/playlist?list=PLncHg6Kn2JT6E38Z3kit9Hnif1xC_9VqI'>Click here</a>
                    </h6>
                </div>
            </div>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
