import React, { Component } from 'react';

import { LANGUAGE, CRUD_ACTIONS, CommonUtils } from '../../../utils'
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import * as actions from "../../../store/actions";
import './UserRedux.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';


class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            roles: [],
            positions: [],
            priviewImg: '',
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phonenumber: '',
            gender: '',
            roleId: '',
            position: '',
            avatar: '',

            action: '',
            userEditId: '',
        }
    }

    async componentDidMount() {
        this.props.getGendersStart();
        this.props.getPositionsStart();
        this.props.getRolesStart();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArr: this.props.genderRedux,
                gender: this.props.genderRedux && this.props.genderRedux.length > 0 ? this.props.genderRedux[0].keyMap : ''
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            this.setState({
                positions: this.props.positionRedux,
                position: this.props.positionRedux && this.props.positionRedux.length > 0 ? this.props.positionRedux[0].keyMap : ''
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            this.setState({
                roles: this.props.roleRedux,
                roleId: this.props.roleRedux && this.props.roleRedux.length > 0 ? this.props.roleRedux[0].keyMap : ''
            })
        }
        if (prevProps.users !== this.props.users) {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                phonenumber: '',
                gender: this.props.genderRedux && this.props.genderRedux.length > 0 ? this.props.genderRedux[0].keyMap : '',
                roleId: this.props.roleRedux && this.props.roleRedux.length > 0 ? this.props.roleRedux[0].keyMap : '',
                position: this.props.positionRedux && this.props.positionRedux.length > 0 ? this.props.positionRedux[0].keyMap : '',
                avatar: '',
                priviewImg: '',
                action: CRUD_ACTIONS.CREATE
            })
        }
    }
    async handleOnChangeImage(event) {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let ObjectUrl = URL.createObjectURL(file);
            this.setState({
                priviewImg: ObjectUrl,
                avatar: base64
            })
        }

    }
    openPriviewImage = () => {
        if (!this.state.priviewImg) { return; }
        this.setState({
            isOpen: true,
        })
    }
    handleOnChangInput(event, id) {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }
    handleSaveUser = async () => {
        if (this.checkValideInput()) {
            if (this.state.action === CRUD_ACTIONS.CREATE) {
                await this.props.getSaveUserStart({
                    email: this.state.email,
                    password: this.state.password,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    address: this.state.address,
                    phonenumber: this.state.phonenumber,
                    gender: this.state.gender,
                    roleId: this.state.roleId,
                    position: this.state.position,
                    avatar: this.state.avatar,
                })
            }
            if (this.state.action === CRUD_ACTIONS.EDIT) {
                console.log(this.state);
                await this.props.getUpdateUserStart({
                    id: this.state.userEditId,
                    email: this.state.email,
                    password: this.state.password,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    address: this.state.address,
                    phonenumber: this.state.phonenumber,
                    gender: this.state.gender,
                    roleId: this.state.roleId,
                    position: this.state.position,
                    avatar: this.state.avatar,
                })
            }

        }
        else {
            return;
        }
    }
    checkValideInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address', 'phonenumber', 'gender', 'roleId', 'position',];
        for (const element of arrInput) {
            if (!this.state[element]) {
                isValid = false
                alert('Missing parameters: ' + element)
                break;
            }
        }
        return isValid;
    }
    handleEditUser = (user) => {
        let imageBase64 = '';
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        }
        console.log(user);
        this.setState({
            email: user.email,
            password: 'HARDCODE',
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            phonenumber: user.phonenumber,
            gender: user.gender,
            roleId: user.roleId,
            position: user.positionId,
            avatar: '',
            priviewImg: imageBase64,
            userEditId: user.id,
            action: CRUD_ACTIONS.EDIT,
        })
    }

    render() {
        let genders = this.state.genderArr;
        let role = this.state.roles;
        let positions = this.state.positions;
        let language = this.props.language;
        let { email, password, firstName, lastName,
            address,
            phonenumber,
            gender,
            roleId,
            position } = this.state;
        return (
            <div className='user-redux-container'>
                <div className="title" >
                    User Redux
                </div>
                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3'><FormattedMessage id='manage-user.add' /></div>
                            <div className='col-6'>
                                <label><FormattedMessage id='manage-user.email' /></label>
                                <input className='form-control' type='email' value={email}
                                    onChange={(event) => this.handleOnChangInput(event, 'email')}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                />
                            </div>
                            <div className='col-6'>
                                <label><FormattedMessage id='manage-user.password' /></label>
                                <input className='form-control' type='password' value={password}
                                    onChange={(event) => this.handleOnChangInput(event, 'password')}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                />
                            </div>
                            <div className='col-6'>
                                <label><FormattedMessage id='manage-user.firstName' /></label>
                                <input className='form-control' type='text' value={firstName}
                                    onChange={(event) => this.handleOnChangInput(event, 'firstName')}
                                />
                            </div>
                            <div className='col-6'>
                                <label><FormattedMessage id='manage-user.lastName' /></label>
                                <input className='form-control' type='text' value={lastName}
                                    onChange={(event) => this.handleOnChangInput(event, 'lastName')}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.phoneNumber' /></label>
                                <input className='form-control' type='text' value={phonenumber}
                                    onChange={(event) => this.handleOnChangInput(event, 'phonenumber')}
                                />
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id='manage-user.address' /></label>
                                <input className='form-control' type='text' value={address}
                                    onChange={(event) => this.handleOnChangInput(event, 'address')}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.gender' /></label>
                                <select className='form-control'
                                    onChange={(event) => this.handleOnChangInput(event, 'gender')}
                                    value={gender}
                                >
                                    {genders.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap}
                                            >{language === LANGUAGE.VI ? item.valueVi : item.valueEn}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.position' /></label>
                                <select className='form-control'
                                    onChange={(event) => this.handleOnChangInput(event, 'position')}
                                    value={position}
                                >
                                    {positions.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap}
                                            >{language === LANGUAGE.VI ? item.valueVi : item.valueEn}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.role' /></label>
                                <select className='form-control'
                                    onChange={(event) => this.handleOnChangInput(event, 'roleId')}
                                    value={roleId}
                                >
                                    {role.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap}
                                            >{language === LANGUAGE.VI ? item.valueVi : item.valueEn}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.avatar' /></label>

                                <div className='priview-img-container'>
                                    <input id='previewImg' type='file' hidden
                                        onChange={(event) => this.handleOnChangeImage(event)}
                                    />
                                    <label className='label-upload' htmlFor='previewImg'>Tải ảnh <i className='fas fa-upload'></i></label>
                                    <div className='priview-image'
                                        style={{ backgroundImage: `url(${this.state.priviewImg})` }}
                                        onClick={() => this.openPriviewImage()}
                                    ></div>
                                </div>
                            </div>
                            <div className='col-12 mt-3'>
                                <Button className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn btn-primary'}
                                    onClick={() => this.handleSaveUser()}
                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT ? <FormattedMessage id='manage-user.edit' /> : <FormattedMessage id='manage-user.save' />}

                                </Button>
                            </div>
                            <div className='col-12 my-5'>
                                <TableManageUser
                                    updateUser={this.handleEditUser}
                                /></div>
                        </div>
                    </div>
                </div>
                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.priviewImg}
                        onCloseRequest={() => this.setState({ isOpen: false })} />
                }
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        users: state.admin.user,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGendersStart: () => dispatch(actions.fetchGenderStart()),
        getPositionsStart: () => dispatch(actions.fetchPositionStart()),
        getRolesStart: () => dispatch(actions.fetchRoleStart()),
        getSaveUserStart: (data) => dispatch(actions.fetchSaveUserStart(data)),
        getUpdateUserStart: (data) => dispatch(actions.fetEditUserStart(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
