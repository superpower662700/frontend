import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import { handleLoginApi } from '../../services/userService';

import * as actions from "../../store/actions";
import './Login.scss';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            issShowPassword: false,
            errMessage: ''
        }

    }
    handleOnChangeusername = (event) => {
        this.setState({
            username: event.target.value,
        })
    }
    handleOnChangepassword = (event) => {
        this.setState({
            password: event.target.value
        })// thay đổi được username k bị chết cứng
    }
    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLoginApi(this.state.username, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })


                console.log(data)
            }
            else {
                this.props.userLoginSuccess(data.user)
                console.log('login succeeds');
                console.log(data.user);
                // let datauser = await handleUserApi('1');
                // console.log(datauser);
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }
            console.log(error.response);

        }

    }
    handleShowHidepassword = () => {
        this.setState({
            issShowPassword: !this.state.issShowPassword
        })
    }
    render() {


        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content">
                        <div className="col-12 text-login">Login</div>
                        <div className="col-12 form-group login-input">
                            <label>Username:</label>
                            <input type="text" value={this.state.username}
                                onChange={(event) => this.handleOnChangeusername(event)}
                                className="form-control"
                                placeholder='Enter your username' />
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Password:</label>
                            <div className='custom-input-password'>
                                <input type={this.state.issShowPassword ? 'text' : 'password'}
                                    value={this.state.password}
                                    onChange={(event) => this.handleOnChangepassword(event)}
                                    className='form-control'
                                    placeholder='Enter your password' />
                                <span
                                    onClick={() => { this.handleShowHidepassword() }}
                                >
                                    <i className={this.state.issShowPassword ? "far fa-eye" : 'far fa-eye-slash'}></i>
                                </span>
                            </div>
                        </div>
                        <div className='col-12' style={{ color: 'red' }}>{this.state.errMessage}</div>
                        <div className="col-12">
                            <button className='btl-login' onClick={() => { this.handleLogin() }}>Login</button>
                        </div>
                        <div className="col-12">
                            <span className='forgot-pw'>Forgot your password?</span>
                        </div >
                        <div className="col-12 text-center mt-5">Or sign in with:</div>
                        <div className='col-12 social-login'>
                            <i className="fab fa-google-plus-g"></i>
                            <i className="fab fa-telegram"></i>
                            <i className="fab fa-facebook"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
