import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    prices: [],
    payments: [],
    provinces: [],
    user: [],
    topDoctor: [],
    doctors: [],
    detailDoctor: [],
    scheduleTime: [],
    specialty: [],

}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyState = { ...state };
            copyState.isLoadingGender = true;
            return {
                ...copyState
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            state.isLoadingGender = false;
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_FAILED:
            state.genders = [];
            state.isLoadingGender = false;
            return {
                ...state
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_POSITION_FAILED:
            state.positions = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_FAILED:
            state.roles = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_USER_SUCCESS:
            state.user = action.user;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_USER_FAILED:
            state.user = [];
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            state.topDoctor = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_DOCTOR_FAILED:
            state.topDoctor = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
            state.doctors = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_DOCTOR_FAILED:
            state.doctors = [];
            return {
                ...state
            }
        case actionTypes.FETCH_DETAIL_DOCTOR_BY_ID_SUCCESS:
            state.detailDoctor = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_DETAIL_DOCTOR_BY_ID_FAILED:
            state.detailDoctor = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_SCHEDULE_TIME_SUCCESS:
            state.scheduleTime = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_SCHEDULE_TIME_FAILED:
            state.scheduleTime = [];
            return {
                ...state
            }
        case actionTypes.FETCH_PRICE_SUCCESS:
            state.prices = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_PRICE_FAILED:
            state.prices = [];
            return {
                ...state
            }
        case actionTypes.FETCH_PAYMENT_SUCCESS:
            state.payments = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_PAYMENT_FAILED:
            state.payments = [];
            return {
                ...state
            }
        case actionTypes.FETCH_PROVINCE_SUCCESS:
            state.provinces = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_PROVINCE_FAILED:
            state.provinces = [];
            return {
                ...state
            }
        case actionTypes.FETCH_SPECIALTY_SUCCESS:
            state.specialty = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_SPECIALTY_FAILED:
            state.specialty = [];
            return {
                ...state
            }
        default:
            return state;
    }
}

export default adminReducer;