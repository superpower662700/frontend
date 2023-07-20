import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserManage.scss';
import { handleUserApi, handleAddUserApi, handleDeleteUserApi, handleEditUserApi } from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter';
/*
Life cycle
Run component
1: Run construct -> inti state
2: Did mount (set state)
3: Render
*/
class UserManage extends Component {

    constructor(props) { // props kiểu cho tk khác kế thừa (cha con) mục đích lưu trữ dữ liệu VD như xét quyền đăng nhập hay chuển EN sang Vi
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            editUser: {}
        }
    }

    async componentDidMount() {
        await this.getAllUser();
    }

    handleAddUser = () => {
        this.setState({
            isOpenModalUser: true,
        })
    }
    toggleFrommParent = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }
    toggleModalEditUser = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        })
    }
    getAllUser = async () => {
        let response = await handleUserApi('ALL')
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }
    createNewUser = async (data) => {
        try {
            console.log(data);
            let response = await handleAddUserApi(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllUser();
                this.setState({
                    isOpenModalUser: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA') // truyền con lên cha
            }
        } catch (error) {
            console.log(error);
        }

    }
    deleteUser = async (id) => {
        try {
            let res = await handleDeleteUserApi(id);
            if (res && res.errCode !== 0) {

                console.log(res.errMessage);

            } else {
                await this.getAllUser();
            }
        } catch (error) {
            console.log(error);
        }

    }
    editUser = async (user) => {
        this.setState({
            isOpenModalEditUser: true,
            editUser: user

        })
    }
    handleEditUser = async (data) => {


        try {
            let res = await handleEditUserApi(data);
            this.setState({
                isOpenModalEditUser: false,
            })
            if (res && res.errCode !== 0) {
                console.log(res.errMessage);
            } else {
                await this.getAllUser();
            }

        } catch (error) {
            console.log(error);
        }

    }

    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className="user-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    isClose={this.toggleFrommParent}
                    createNewUser={this.createNewUser}
                />
                {this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        isClose={this.toggleModalEditUser}
                        currentUser={this.state.editUser}
                        editUser={this.handleEditUser}
                    />}

                <div className="title text-center">Manage users with Erik</div>
                <div className='mx-1'>
                    <button className='btn btn-primary px-3' onClick={() => { this.handleAddUser() }}><i className="fas fa-plus"></i>Add new users</button>
                </div>
                <div className='user-table py-3'>
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Emial</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Phone Number</th>
                                <th>Gender</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>

                            {arrUsers.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>{item.phonenumber}</td>
                                        <td>{item.gender === 1 ? 'Boy' : 'Girl'}</td>
                                        <td>
                                            <button className='btl-edit' onClick={() => { this.editUser(item) }} ><i className="fas fa-pencil-alt"></i></button>
                                        </td>
                                        <td>
                                            <button className='btl-delete' onClick={() => { this.deleteUser(item.id) }}><i className="fas fa-trash-alt"></i></button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
