import { GET_ISSUES_SUCCESS, TOGGLE_ISSUES_SUCCESS, TOGGLE_SEARCH_ISSUES_SUCCESS, REMOVE_EVERYTHING_FILTER, REMOVE_AUTHOR_FILTER, REMOVE_MILESTONES_FILTER, REMOVE_PROJECTS_FILTER, REMOVE_ASSIGNEE_FILTER, REMOVE_LABEL_FILTER, REMOVE_SORT_FILTER, ADD_SORT_FILTER_SUCCESS, SEARCH_FOR_ISSUES_SUCCESS, SEARCH_FOR_ISSUES_FAILURE, ISSUES_SEARCH_INPUT_SUCCESS, ADD_PROJECTS_FILTER_SUCCESS, GET_ISSUES_FAILURE, GET_ISSUES_LOADING, CHANGE_ACTIVE_SEARCH_SUCCESS, ADD_LABEL_FILTER_SUCCESS, ADD_EVERYTHING_FILTER_SUCCESS, ADD_MILESTONES_FILTER_SUCCESS, ADD_AUTHOR_FILTER_SUCCESS, ADD_ASSIGNEE_FILTER_SUCCESS } from './issueTypes'

function getIssuesSuccess(issues, state, repo) {
    return {
        type: GET_ISSUES_SUCCESS,
        payload: { issues: issues, state: state, activeRepo: repo }
    }
}

function getIssuesLoading() {
    return {
        type: GET_ISSUES_LOADING
    }
}

function getIssuesFailure(error, state) {
    return {
        type: GET_ISSUES_FAILURE,
        payload: { error, state }
    }
}

export function getIssues(client, config, repo) {
    return function (dispatch) {
        // console.log(client, config, repo)
        dispatch(getIssuesLoading())
        client.issues(repo, config).then(issues => {
            dispatch(getIssuesSuccess(issues, config.state, repo))
        }).catch(err => {
            dispatch(getIssuesFailure(err.response.data, config.state))
        })
    }
}

function changeActiveSearchSuccess(filter) {
    return {
        type: CHANGE_ACTIVE_SEARCH_SUCCESS,
        payload: filter
    }
}

export function changeActiveSearchFilter(filter) {
    return function (dispatch) {
        dispatch(changeActiveSearchSuccess(filter))
    }
}

function issuesSeachInputSuccess(value) {
    return {
        type: ISSUES_SEARCH_INPUT_SUCCESS,
        payload: value
    }
}

export function issuesSeachInput(value) {
    return function (dispatch) {
        dispatch(issuesSeachInputSuccess(value))
    }
}

function addLabelFilterSuccess(filter) {
    return {
        type: ADD_LABEL_FILTER_SUCCESS,
        payload: filter
    }
}

function addEverthingFilterSuccess(filter) {
    return {
        type: ADD_EVERYTHING_FILTER_SUCCESS,
        payload: filter
    }
}

function addMilestonesFilterSuccess(filter) {
    return {
        type: ADD_MILESTONES_FILTER_SUCCESS,
        payload: filter
    }
}

function addAuthorFilterSuccess(filter) {
    return {
        type: ADD_AUTHOR_FILTER_SUCCESS,
        payload: filter
    }
}

function addAssigneeFilterSuccess(filter) {
    return {
        type: ADD_ASSIGNEE_FILTER_SUCCESS,
        payload: filter
    }
}

function addProjectsFilterSuccess(filter) {
    return {
        type: ADD_PROJECTS_FILTER_SUCCESS,
        payload: filter
    }
}

function addSortFilterSuccess(filter) {
    return {
        type: ADD_SORT_FILTER_SUCCESS,
        payload: filter
    }
}

export function addNewIssuesFilter(type, filter) {
    return function (dispatch) {
        switch (type) {
            case "Everything": dispatch(addEverthingFilterSuccess(filter))
                break;
            case "Label": dispatch(addLabelFilterSuccess(filter))
                break;
            case "Projects": dispatch(addProjectsFilterSuccess(filter))
                break;
            case "Milestones": dispatch(addMilestonesFilterSuccess(filter))
                break;
            case "Assignee": dispatch(addAssigneeFilterSuccess(filter))
                break;
            case "Author": dispatch(addAuthorFilterSuccess(filter))
                break;
            default:
                break;
        }
    }
}

function searchForIssuesFailure(err) {
    return {
        type: SEARCH_FOR_ISSUES_FAILURE,
        payload: err
    }
}
function searchForIssuesSuccess(issues) {
    return {
        type: SEARCH_FOR_ISSUES_SUCCESS,
        payload: issues
    }
}

export function searchForIssues(client, q) {
    return function (dispatch) {
        dispatch(getIssuesLoading())
        client.search(q).then(issues => {
            dispatch(searchForIssuesSuccess(issues.items))
        }).catch(error => {
            dispatch(searchForIssuesFailure(error.response.data))
        })
    }
}

function removeEverythingFilter() {
    return {
        type: REMOVE_EVERYTHING_FILTER
    }
}

function removeLabelFilter() {
    return {
        type: REMOVE_LABEL_FILTER
    }
}

function removeAuthorFilter() {
    return {
        type: REMOVE_AUTHOR_FILTER
    }
}

function removeMilestonesFilter() {
    return {
        type: REMOVE_MILESTONES_FILTER
    }
}

function removeAssigneeFilter() {
    return {
        type: REMOVE_ASSIGNEE_FILTER
    }
}

function removeProjectsFilter() {
    return {
        type: REMOVE_PROJECTS_FILTER
    }
}

function removeSortFilter() {
    return {
        type: REMOVE_SORT_FILTER
    }
}

export function removeIssueFilter(filter) {
    return function (dispatch) {
        switch (filter) {
            case 'Everything': dispatch(removeEverythingFilter())
                break;
            case 'Author': dispatch(removeAuthorFilter())
                break;
            case 'Milestones': dispatch(removeMilestonesFilter())
                break;
            case 'Assignee': dispatch(removeAssigneeFilter())
                break;
            case 'Projects': dispatch(removeProjectsFilter())
                break;
            case 'Label': dispatch(removeLabelFilter())
                break;
            case 'Sort': dispatch(removeSortFilter())
                break;
            default:
                break;
        }
    }
}

export function addIssuesSortFilter(filter) {
    return function (dispatch) {
        if (filter === 'best-match') filter = false
        // console.log(filter, 'tHE FILTER IS WOLR')
        dispatch(addSortFilterSuccess(filter))
    }
}

function toggleSearchIssuesSuccess(issues, page) {
    return {
        type: TOGGLE_SEARCH_ISSUES_SUCCESS,
        payload: { issues, page }
    }
}

function toggleIssuesSuccess(issues, state, repo, page) {
    return {
        type: TOGGLE_ISSUES_SUCCESS,
        payload: { issues, page, state, repo }
    }
}

export function toggleIssuesPage(client, config, repo, q, page) {
    return function (dispatch) {
        if (q) {
            dispatch(getIssuesLoading())
            client.search(q, page).then(issues => {
                dispatch(toggleSearchIssuesSuccess(issues.items, page))
            }).catch(error => {
                dispatch(searchForIssuesFailure(error.response.data.message))
            })
        } else if (config) {
            dispatch(getIssuesLoading())
            client.issues(repo, config, page).then(issues => {
                dispatch(toggleIssuesSuccess(issues, config.state, repo, page))
            }).catch(error => {
                dispatch(getIssuesFailure(error.response.data.message))
            })
        }
    }
}