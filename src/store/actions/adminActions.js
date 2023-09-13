import actionTypes from './actionTypes';
import {
    getAllCodeService, handleAddUserApi, handleUserApi, handleDeleteUserApi, getDetailDoctorByIdService,
    handleEditUserApi, getTopDoctorHomeService, getAllDoctorService, saveInforDoctor
} from '../../../src/services/userService'
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

export const fetAllDoctorStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctorService();
            if (res && res.errCode === 0) {
                dispatch(fetAllDoctorSuccess(res.data))
            } else {
                dispatch(fetAllDoctorFailed());
            }
        } catch (error) {
            dispatch(fetAllDoctorFailed());
        }
    }
}
export const fetAllDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
    data: data
})
export const fetAllDoctorFailed = () => ({
    type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
})

export const saveDetailDoctorStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveInforDoctor(data);
            if (res && res.errCode === 0) {
                dispatch(saveDetailDoctorSuccess())
                toast.success("Save Infor Doctor Success")
            } else {
                console.log(res);
                dispatch(saveDetailDoctorFailed());
                toast.error("Save Infor Doctor Error")
            }
        } catch (error) {
            dispatch(saveDetailDoctorFailed());
            toast.error("Save Infor Doctor Error")
        }
    }
}
export const saveDetailDoctorSuccess = () => ({
    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
})
export const saveDetailDoctorFailed = () => ({
    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
})

export const fetDetailDoctorByIdStart = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await getDetailDoctorByIdService(id);
            if (res && res.errCode === 0) {
                dispatch(fetDetailDoctorByIdSuccess(res.data))
            } else {
                dispatch(fetDetailDoctorByIdFailed());
            }
        } catch (error) {
            dispatch(fetDetailDoctorByIdFailed());
        }
    }
}
export const fetDetailDoctorByIdSuccess = (data) => ({
    type: actionTypes.FETCH_DETAIL_DOCTOR_BY_ID_SUCCESS,
    data: data
})
export const fetDetailDoctorByIdFailed = () => ({
    type: actionTypes.FETCH_DETAIL_DOCTOR_BY_ID_FAILED,
})

export const fetAllScheduleTimeStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('TIME');
            if (res && res.errCode === 0) {
                dispatch(fetAllScheduleTimeSuccess(res.data))
            } else {
                dispatch(fetAllScheduleTimeFailed());
            }
        } catch (error) {
            dispatch(fetAllScheduleTimeFailed());
        }
    }
}
export const fetAllScheduleTimeSuccess = (timeData) => ({
    type: actionTypes.FETCH_ALL_SCHEDULE_TIME_SUCCESS,
    data: timeData
})
export const fetAllScheduleTimeFailed = () => ({
    type: actionTypes.FETCH_ALL_SCHEDULE_TIME_FAILED
})

export const fetchPriceStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('PRICE');
            if (res && res.errCode === 0) {
                dispatch(fetchPriceSuccess(res.data))
            } else {
                dispatch(fetchPriceFailed());
            }
        } catch (error) {
            dispatch(fetchPriceFailed());
        }
    }
}
export const fetchPriceSuccess = (PriceData) => ({
    type: actionTypes.FETCH_PRICE_SUCCESS,
    data: PriceData
})
export const fetchPriceFailed = () => ({
    type: actionTypes.FETCH_PRICE_FAILED
})

export const fetchPaymentStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('PAYMENT');
            if (res && res.errCode === 0) {
                dispatch(fetchPaymentSuccess(res.data))
            } else {
                dispatch(fetchPaymentFailed());
            }
        } catch (error) {
            dispatch(fetchPaymentFailed());
        }
    }
}
export const fetchPaymentSuccess = (PaymentData) => ({
    type: actionTypes.FETCH_PAYMENT_SUCCESS,
    data: PaymentData
})
export const fetchPaymentFailed = () => ({
    type: actionTypes.FETCH_PAYMENT_FAILED,
})
export const fetchProvinceStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('PROVINCE');
            if (res && res.errCode === 0) {
                dispatch(fetchProvinceSuccess(res.data))
            } else {
                dispatch(fetchProvinceFailed());
            }
        } catch (error) {
            dispatch(fetchProvinceFailed());
        }
    }
}
export const fetchProvinceSuccess = (ProvinceData) => ({
    type: actionTypes.FETCH_PROVINCE_SUCCESS,
    data: ProvinceData
})
export const fetchProvinceFailed = () => ({
    type: actionTypes.FETCH_PROVINCE_FAILED
})