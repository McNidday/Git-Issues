import { GET_AUTH_URL_SUCCESS, CREATE_CLIENT_SUCCESS, CLIENT_LOGIN_SUCCESS } from './authTypes';
const initialState = {
    access_token: null,
    auth_url: null,
    client: null,
    guest_client: null,
    user: null,
    error: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_AUTH_URL_SUCCESS: return {
            ...state,
            auth_url: action.payload
        }
        case CREATE_CLIENT_SUCCESS: return {
            ...state,
            client: action.payload
        }
        case CLIENT_LOGIN_SUCCESS: return {
            ...state,
            access_token: action.payload
        }
        default: return state
    }
}
export default authReducer