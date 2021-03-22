import { combineReducers } from 'redux'
import authReducer from './authorize/authReducer'
import repoReducer from './gitrepo/repoReducer'
import userReducer from './user/userReducer'
import issueReducer from './issues/issueReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    repo: repoReducer,
    user: userReducer,
    issue: issueReducer
})
export default rootReducer