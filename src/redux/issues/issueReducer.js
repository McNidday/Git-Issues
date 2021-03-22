import { GET_ISSUES_FAILURE, TOGGLE_SEARCH_ISSUES_SUCCESS, TOGGLE_ISSUES_SUCCESS, REMOVE_PROJECTS_FILTER, REMOVE_MILESTONES_FILTER, REMOVE_AUTHOR_FILTER, REMOVE_EVERYTHING_FILTER, REMOVE_ASSIGNEE_FILTER, REMOVE_LABEL_FILTER, REMOVE_SORT_FILTER, ADD_SORT_FILTER_SUCCESS, ADD_MILESTONES_FILTER_SUCCESS, ADD_PROJECTS_FILTER_SUCCESS, ADD_ASSIGNEE_FILTER_SUCCESS, ISSUES_SORT_INPUT_SUCCESS, ADD_EVERYTHING_FILTER_SUCCESS, ADD_AUTHOR_FILTER_SUCCESS, ADD_LABEL_FILTER_SUCCESS, ISSUES_SEARCH_INPUT_SUCCESS, GET_ISSUES_SUCCESS, GET_ISSUES_LOADING, CHANGE_ACTIVE_SEARCH_SUCCESS, SEARCH_FOR_ISSUES_FAILURE, SEARCH_FOR_ISSUES_SUCCESS } from "./issueTypes"

const initialState = {
    page: 1,
    issues: [],
    activeRepo: '',
    state: 'open',
    error: false,
    loading: false,
    activeSearch: 'Everything',
    searchInput: '',
    label: false,
    everything: false,
    projects: false,
    author: false,
    milestones: false,
    sort: false,
    assignee: false
}

const issueReducer = (state = initialState, action) => {
    // console.log(action)
    switch (action.type) {
        case GET_ISSUES_FAILURE: return {
            ...state,
            issues: [],
            loading: false,
            error: action.payload
        }
        case GET_ISSUES_LOADING: return {
            ...state,
            loading: true
        }
        case GET_ISSUES_SUCCESS: return {
            ...state,
            issues: action.payload.issues,
            state: action.payload.state,
            activeRepo: action.payload.activeRepo,
            error: false,
            loading: false
        }
        case CHANGE_ACTIVE_SEARCH_SUCCESS: return {
            ...state,
            activeSearch: action.payload
        }
        case ADD_EVERYTHING_FILTER_SUCCESS: return {
            ...state,
            everything: action.payload
        }
        case ADD_AUTHOR_FILTER_SUCCESS: return {
            ...state,
            author: action.payload
        }
        case ADD_LABEL_FILTER_SUCCESS: return {
            ...state,
            label: action.payload
        }
        case ADD_PROJECTS_FILTER_SUCCESS: return {
            ...state,
            projects: action.payload
        }
        case ADD_MILESTONES_FILTER_SUCCESS: return {
            ...state,
            milestones: action.payload
        }
        case ADD_ASSIGNEE_FILTER_SUCCESS: return {
            ...state,
            assignee: action.payload
        }
        case ADD_SORT_FILTER_SUCCESS: return {
            ...state,
            sort: action.payload
        }
        case ISSUES_SEARCH_INPUT_SUCCESS: return {
            ...state,
            searchInput: action.payload
        }
        case ISSUES_SORT_INPUT_SUCCESS: return {
            ...state,
            sort: action.payload
        }
        case SEARCH_FOR_ISSUES_SUCCESS: return {
            ...state,
            issues: action.payload,
            loading: false,
            error: false,
        }
        case SEARCH_FOR_ISSUES_FAILURE: return {
            ...state,
            loading: false,
            error: action.payload
        }
        case REMOVE_EVERYTHING_FILTER: return {
            ...state,
            everything: false
        }
        case REMOVE_LABEL_FILTER: return {
            ...state,
            label: false
        }
        case REMOVE_AUTHOR_FILTER: return {
            ...state,
            author: false
        }
        case REMOVE_MILESTONES_FILTER: return {
            ...state,
            milestones: false
        }
        case REMOVE_ASSIGNEE_FILTER: return {
            ...state,
            assignee: false
        }
        case REMOVE_PROJECTS_FILTER: return {
            ...state,
            projects: false
        }
        case REMOVE_SORT_FILTER: return {
            ...state,
            sort: false
        }
        case TOGGLE_ISSUES_SUCCESS: return {
            ...state,
            loading: false,
            issues: action.payload.issues,
            page: action.payload.page,
            state: action.payload.state,
            repo: action.payload.repo
        }
        case TOGGLE_SEARCH_ISSUES_SUCCESS: return {
            ...state,
            loading: false,
            issues: action.payload.issues,
            page: action.payload.page
        }
        default: return state
    }
}

export default issueReducer