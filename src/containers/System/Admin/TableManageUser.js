import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from '../../../store/actions'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}
class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: [],
        }
    }



    componentDidMount() {
        this.props.getAllUserRedux();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.users !== this.props.users) {
            this.setState({
                user: this.props.users
            })
        }
    }
    handleDeleteUser(id) {
        this.props.deleteUserRedux(id);
    }
    handleUpdateUser(user) {
        this.props.updateUser(user)
    }
    render() {
        let listuser = this.state.user;
        return (
            <React.Fragment>
                <div className="user-container">
                    <div className='user-table py-3'>
                        <table id="customers">
                            <tbody>
                                <tr>
                                    <th>Emial</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Address</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                                {listuser.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button className='btl-edit' onClick={() => { this.handleUpdateUser(item) }}><i className="fas fa-pencil-alt"></i></button>
                                            </td>
                                            <td>
                                                <button className='btl-delete' onClick={() => { this.handleDeleteUser(item.id) }} ><i className="fas fa-trash-alt"></i></button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        users: state.admin.user,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllUserRedux: () => dispatch(actions.fetAllUserStart()),
        deleteUserRedux: (id) => dispatch(actions.fetDeleteUserStart(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
