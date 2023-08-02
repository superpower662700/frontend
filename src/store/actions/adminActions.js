import actionTypes from './actionTypes';
import { getAllCodeService, handleAddUserApi, handleUserApi, handleDeleteUserApi, handleEditUserApi, getTopDoctorHomeService } from '../../../src/services/userService'
import { toast } from 'react-toastify';

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START, })
            let res = await getAllCodeService('Gender');
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (error) {
            dispatch(fetchGenderFailed());
        }
    }
}
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('Position');
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            } else {
                dispatch(fetchPositionrFailed());
            }
        } catch (error) {
            dispatch(fetchPositionrFailed());
        }
    }
}
export const fetchPositionSuccess = (genderData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: genderData
})
export const fetchPositionrFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILDED
})

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('ROLE');
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (error) {
            dispatch(fetchRoleFailed());
        }
    }
}
export const fetchRoleSuccess = (genderData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: genderData
})
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

export const fetchSaveUserStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await handleAddUserApi(data);
            console.log('check: ', res);
            if (res && res.errCode === 0) {

                toast.success("Create a new user success")
                dispatch(fetchSaveUserSuccess())
                dispatch(fetAllUserStart())
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (error) {
            dispatch(fetchSaveUserFailed());
        }
    }
}
export const fetchSaveUserSuccess = () => ({
    type: actionTypes.SAVE_USER_SUCCESS
})
export const fetchSaveUserFailed = () => ({
    type: actionTypes.SAVE_USER_FAILED
})

export const fetAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await handleUserApi('ALL');
            if (res && res.errCode === 0) {
                dispatch(fetAllUserSuccess(res.users.reverse()))
            } else {
                dispatch(fetAllUserFailed());
            }
        } catch (error) {
            dispatch(fetAllUserFailed());
        }
    }
}
export const fetAllUserSuccess = (users) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    user: users
})
export const fetAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILED
})

export const fetDeleteUserStart = (idInput) => {
    return async (dispatch, getState) => {
        try {
            let res = await handleDeleteUserApi(idInput);
            if (res && res.errCode === 0) {
                dispatch(fetDeleteUserSuccess())
                dispatch(fetAllUserStart())
                toast.success("Delete user success")
            } else {
                dispatch(fetDeleteUserFailed());
            }
        } catch (error) {
            dispatch(fetDeleteUserFailed());
        }
    }
}
export const fetDeleteUserSuccess = () => ({
    type: actionTypes.FETCH_DELETE_USER_SUCCESS,
})
export const fetDeleteUserFailed = () => ({
    type: actionTypes.FETCH_DELETE_USER_FAILED
})

export const fetEditUserStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await handleEditUserApi(data);
            if (res && res.errCode === 0) {
                dispatch(fetEditUserSuccess())
                dispatch(fetAllUserStart())
                toast.success("Update user success")
            } else {
                dispatch(fetEditUserFailed());
            }
        } catch (error) {
            dispatch(fetEditUserFailed());
        }
    }
}
export const fetEditUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
})
export const fetEditUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})

export const fetTopDoctorStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService('');
            if (res && res.errCode === 0) {
                dispatch(fetTopDoctorSuccess(res.data))
            } else {
                dispatch(fetTopDoctorFailed());
            }
        } catch (error) {
            dispatch(fetTopDoctorFailed());
        }
    }
}
export const fetTopDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
    data: data
})
export const fetTopDoctorFailed = () => ({
    type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
})