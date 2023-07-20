import axios from "../axios";

const handleLoginApi = (useremail, userpassword) => {
    return axios.post('/api/login', { email: useremail, password: userpassword });
}

const handleUserApi = (userid) => {
    return axios.get(`/api/get-all-user?id=${userid}`);
}
const handleAddUserApi = (data) => {
    return axios.post('/api/create-user', data);
}
const handleDeleteUserApi = (userid) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: userid
        }
    });
}
const handleEditUserApi = (user) => {
    return axios.put('/api/put-user', {
        data: {
            user: user
        }
    });
}
export {
    handleLoginApi,
    handleUserApi,
    handleAddUserApi,
    handleDeleteUserApi,
    handleEditUserApi
}