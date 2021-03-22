import { GET_USER_INFO_FAILURE, GET_USER_INFO_SUCCESS, LOGOUT_SUCCESSFUL } from "./userTypes"

const initialState = {
    user: null,
    error: false
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_INFO_FAILURE: return {
            ...state,
            error: action.payload
        }
        case GET_USER_INFO_SUCCESS: return {
            ...state,
            user: action.payload
        }
        case LOGOUT_SUCCESSFUL: return initialState
        default: return state
    }
}

export default userReducer