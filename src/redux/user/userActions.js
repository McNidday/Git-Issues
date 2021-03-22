import { GET_USER_INFO_SUCCESS, GET_USER_INFO_FAILURE, LOGOUT_SUCCESSFUL } from "./userTypes";

function getUserInfoSuccess(user) {
    return {
        type: GET_USER_INFO_SUCCESS,
        payload: user
    }
}

function getUserInfoFailure(error) {
    return {
        type: GET_USER_INFO_FAILURE,
        payload: error
    }
}

export function getUserInfo(client) {
    return function (dispatch) {
        client.me().info(function (err, user) {
            if (err) {
                dispatch(getUserInfoFailure(err.message))
                return
            }
            dispatch(getUserInfoSuccess(user))
        })
    }
}

function logoutSuccessfull() {
    return { type: LOGOUT_SUCCESSFUL }
}

export function logout() {
    return function (dispatch) {
        localStorage.clear();
        dispatch(logoutSuccessfull)
    }
}