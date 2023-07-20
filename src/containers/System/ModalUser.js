import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter'

class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phonenumber: '',
            gender: '1',
            roleId: '1',
        }
        this.listenToEmitter();
    }
    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            //reset state
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                phonenumber: '',
                gender: '1',
                roleId: '1',
            })
        })
    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.isClose();
    }
    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }
    checkValideInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address', 'phonenumber', 'gender', 'roleId'];
        for (const element of arrInput) {
            if (!this.state[element]) {
                isValid = false
                alert('Missing parameters: ' + element)
                break;
            }
        }
        return isValid;
    }
    handleAddNewUser = () => {
        let isValid = this.checkValideInput();
        if (isValid === true) {
            this.props.createNewUser(this.state)
        }

    }

    // dùng húc nên viết toggle={()=>{this.toggle()}} 
    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className='modal-user-container'
                size='lg'
            >
                <ModalHeader toggle={() => { this.toggle() }}>Create a new User</ModalHeader>
                <ModalBody>
                    <div className="modal-body-user">
                        <div className="input-container">
                            <label >Email</label>
                            <input type="email"
                                onChange={(event) => { this.handleOnChangeInput(event, 'email') }}
                                // name="email" placeholder="Email"
                                value={this.state.email} />
                        </div>
                        <div className="input-container">
                            <label>Password</label>
                            <input type="password"
                                onChange={(event) => { this.handleOnChangeInput(event, 'password') }}
                                // name="password" placeholder="Password" 
                                value={this.state.password} />
                        </div>

                    </div>
                    <div className="modal-body-user">
                        <div className="input-container">
                            <label>First Name</label>
                            <input type="text"
                                onChange={(event) => { this.handleOnChangeInput(event, 'firstName') }}
                                value={this.state.firstName}
                            // name="firstName" placeholder="firstName" 
                            />
                        </div>
                        <div className="input-container">
                            <label>Last Name</label>
                            <input type="text"
                                onChange={(event) => { this.handleOnChangeInput(event, 'lastName') }}
                                // name="lastName" placeholder="lastName" 
                                value={this.state.lastName} />
                        </div>
                    </div>
                    <div className='modal-body-user'>
                        <div className="input-container max-with-input">
                            <label>Address</label>
                            <input type="text"
                                onChange={(event) => { this.handleOnChangeInput(event, 'address') }}
                                // name="inputAddress" placeholder="1234 Main St"
                                value={this.state.address} />
                        </div>
                    </div>
                    <div className="modal-body-user">
                        <div className="input-container">
                            <label>Phone Number</label>
                            <input type="text"
                                onChange={(event) => { this.handleOnChangeInput(event, 'phonenumber') }}
                                // name="phonenumber" placeholder="phonenumber" 
                                value={this.state.phonenumber} />
                        </div>
                        <div className="input-container">
                            <label>Gender</label>
                            <select name="gender"
                                onChange={(event) => { this.handleOnChangeInput(event, 'gender') }}
                                value={this.state.gender}>
                                <option value="1">Boy</option>
                                <option value="0">Girl</option>
                            </select>
                        </div>
                        <div className="input-container">
                            <label>roleId</label>
                            <select name="roleId"
                                onChange={(event) => { this.handleOnChangeInput(event, 'roleId') }}
                                value={this.state.roleId}>
                                <option value="1">Admin</option>
                                <option value="2">Doctor</option>
                                <option value="3">Patient</option>
                            </select>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => { this.handleAddNewUser() }}>
                        ADD
                    </Button>{' '}
                    <Button color="secondary" onClick={() => { this.toggle() }}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
