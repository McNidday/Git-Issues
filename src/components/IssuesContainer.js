import React, { useContext, useEffect } from 'react'
import { connect } from 'react-redux'
import classes from '../css/IssuesContainer.module.css'
import { toggleIssuesPage, addIssuesSortFilter, addNewIssuesFilter, changeActiveSearchFilter, getIssues, issuesSeachInput, removeIssueFilter, searchForIssues } from '../redux/issues/issueActions'
import ClientContext from './contexts/ClientContext'
import queryString from 'query-string'
import moment from 'moment'
import uniqid from 'uniqid'
import { useLocation } from 'react-router'

function IssuesContainer(props) {
    const client = useContext(ClientContext)
    // Get current location
    const location = useLocation();
    // Get all the issues related to the logged in user
    useEffect(() => {
        if (client && props.defaultRepo) {
            // Check if repo has been passed on top
            const parsed = queryString.parse(location.search)
            let repo;
            if (parsed.repo) { repo = parsed.repo } else { repo = props.defaultRepo };
            const config = {
                page: props.page,
                per_page: 20,
                state: 'open'
            }
            props.getIssues(client, config, repo)
        } else if (client && props.defaultExRepo) {
            const parsed = queryString.parse(location.search)
            let repo;
            if (parsed.repo) { repo = parsed.repo } else { repo = props.defaultExRepo };
            const config = {
                page: props.page,
                per_page: 20,
                state: 'open'
            }
            props.getIssues(client, config, repo)
        }
    }, [client, props.defaultRepo, props.defaultExRepo, location])

    function changeActiveSearch(filter) {
        props.changeActiveSearch(filter)
    }
    function filterExists() {
        if (props.label) return true
        if (props.author) return true
        if (props.everything) return true
        if (props.projects) return true
        if (props.milestones) return true
        if (props.assignee) return true
        if (props.sort) return true
        return false
    }

    function getFilters() {
        // Create the search query
        let q = [];

        if (props.everything) {
            q.push(props.everything)
        }

        if (props.author) {
            q.push(`author:${props.author}`)
        }

        if (props.assignee) {
            q.push(`assignee:${props.assignee}`)
        }

        if (props.label) {
            q.push(`label:${props.label}`)
        }

        if (props.milestones) {
            q.push(`milestones:${props.milestones}`)
        }

        if (props.activeRepo) {
            q.push(`repo:${props.activeRepo}`)
        } else {
            q.push(`repo:${props.defaultRepo}`)
        }

        if (props.sort) {
            q.push(`sort:${props.sort}`)
        }

        // Add the state
        q.push(`state:${props.state}`)
        q = q.join('+')
        return q
    }

    function togglePage(e, to) {
        e.preventDefault()
        let page, config, repo, q;
        if (to === 'prev' && props.page !== 1) {
            page = props.page - 1
        }

        if (to === 'next') {
            page = props.page + 1
        }

        if (filterExists()) {
            q = getFilters()
        } else {
            config = {
                page: page,
                per_page: 20,
                state: props.state
            }
            repo = props.activeRepo
        }
        props.togglePage(client, config, repo, q, page)
    }

    function changeActiveState(state) {
        const config = {
            page: 1,
            per_page: 20,
            state: state
        }
        props.getIssues(client, config, props.activeRepo)
    }

    function handleSearchIssuesInput(e) {
        props.handleSearchIssuesInput(e.target.value)
    }

    function removeFilter(filter) {
        props.removeFilter(filter)
    }

    function addSortFilter(e) {
        props.addSortFilter(e.target.value)
    }

    function addFilter(e) {
        e.preventDefault()
        // console.log(props.activeSearch, props.searchInput, 'YEEEEEEEEEE!')
        props.addNewFilter(props.activeSearch, props.searchInput)
        // props.addFilter(props.activeSearch, props.searchInput)
    }

    function searchIssues(e) {
        e.preventDefault()
        // console.log(q);
        props.searchIssues(client, getFilters())
    }

    return (
        <React.Fragment>
            <main className={classes.mainIssues}>
                <div>
                    <h3>Selected Filters</h3>
                    <ul>
                        {!filterExists() ? <li key={uniqid()} className={classes.noFilters}>No filters added</li> : ''}
                        {props.everything ? <li key={uniqid()}>
                            <h5>Everything</h5>
                            <div>{props.everything}</div>
                            <div onClick={() => removeFilter('Everything')}></div>
                        </li> : ''}
                        {props.author ? <li key={uniqid()}>
                            <h5>Author</h5>
                            <div>{props.author}</div>
                            <div onClick={() => removeFilter('Author')}></div>
                        </li> : ''}
                        {props.label ? <li key={uniqid()}>
                            <h5>Label</h5>
                            <div>{props.label}</div>
                            <div onClick={() => removeFilter('Label')}></div>
                        </li> : ''}
                        {props.projects ? <li key={uniqid()}>
                            <h5>Pojects</h5>
                            <div>{props.projects}</div>
                            <div onClick={() => removeFilter('Projects')}></div>
                        </li> : ''}
                        {props.milestones ? <li key={uniqid()}>
                            <h5>Milestones</h5>
                            <div>{props.milestones}</div>
                            <div onClick={() => removeFilter('Milestones')}></div>
                        </li> : ''}
                        {props.assignee ? <li key={uniqid()}>
                            <h5>Assignee</h5>
                            <div>{props.assignee}</div>
                            <div onClick={() => removeFilter('Assignee')}></div>
                        </li> : ''}
                        {props.sort ? <li key={uniqid()}>
                            <h5>Sort By</h5>
                            <div>{props.sort}</div>
                            <div onClick={() => removeFilter('Sort')}></div>
                        </li> : ''}
                    </ul>
                </div>
                <ul>
                    <li key={uniqid()} onClick={() => changeActiveSearch('Everything')} className={props.activeSearch === 'Everything' ? classes.active : ''}>
                        Everything
                    </li>
                    <li key={uniqid()} onClick={() => changeActiveSearch('Author')} className={props.activeSearch === 'Author' ? classes.active : ''}>
                        Author
                    </li>
                    <li key={uniqid()} onClick={() => changeActiveSearch('Label')} className={props.activeSearch === 'Label' ? classes.active : ''}>
                        Label
                    </li>
                    <li key={uniqid()} onClick={() => changeActiveSearch('Projects')} className={props.activeSearch === 'Projects' ? classes.active : ''}>
                        Projects
                    </li>
                    <li key={uniqid()} onClick={() => changeActiveSearch('Milestones')} className={props.activeSearch === 'Milestones' ? classes.active : ''}>
                        Milestones
                    </li>
                    <li key={uniqid()} onClick={() => changeActiveSearch('Assignee')} className={props.activeSearch === 'Assignee' ? classes.active : ''}>
                        Assignee
                    </li>
                    <li key={uniqid()}>
                        <select onChange={addSortFilter}>
                            <option value="best-match">Best Match</option>
                            <option value="comments">Comments</option>
                            <option value="reactions">Reactions</option>
                            <option value='interactions'>Interactions</option>
                            <option value="created">Created</option>
                            <option value="updated">Updated</option>
                        </select>
                    </li>
                </ul>
                <form>
                    <input type="text" onChange={handleSearchIssuesInput} placeholder={props.holding} value={props.searchInput}></input>
                    <button onClick={addFilter}>Add Filter</button>
                    <button onClick={searchIssues}>Search Issues</button>
                </form>
                <div className={classes.state}>
                    <h3>Select state</h3>
                    <ul>
                        <li onClick={() => changeActiveState('open')} className={props.state === 'open' ? classes.active : ''}>Open</li>
                        <li onClick={() => changeActiveState('closed')} className={props.state === 'closed' ? classes.active : ''}>Closed</li>
                    </ul>
                </div>
                <ul>
                    {props.loading ? <li style={{ color: 'lime' }}>Loading Issues...</li> : ''}
                    {props.error ? <li className={classes.error}>{props.error}</li> : ''}
                    {props.issues.length < 1 && !props.error ? <li className={classes.noIssues}>No Isssues Found For This Repo</li> : ''}
                    {props.issues.map(issue => {
                        return (
                            <li key={uniqid()}>
                                <span className={props.state === 'open' ? classes.dangerIcon : classes.dangerIconClosed}></span>
                                <div className={classes.issueTitle}>
                                    <a href={issue.html_url} target="_blank">
                                        <h4>
                                            {issue.title}
                                        </h4>
                                    </a>
                                </div>
                                <div className={classes.association}>
                                    <div><h5>Association</h5><span>{issue.author_association}</span></div>
                                    <div><h5>State</h5><span>{issue.state}</span></div>
                                </div>
                                <div className={classes.lables}>
                                    <ul>
                                        {issue.labels.length < 1 ? <li className={classes.noLabels}>No Labels Assigned</li> : ''}
                                        {issue.labels.map(label => {
                                            return <li key={uniqid()} style={{ backgroundColor: '#d73a4a' }}><h5>{label.name}</h5></li>
                                        })}
                                    </ul>
                                </div>
                                <div className={classes.issueBody}>
                                    {issue.body === '' ? <p className={classes.warning}>No Description For This Issue</p> : <p>{issue.body}</p>}
                                </div>
                                <div className={classes.dateCreated}>
                                    <h5>Created {moment(issue.created_at).fromNow()}</h5>
                                </div>
                            </li>
                        )
                    })}
                </ul>
                <div>
                    {props.page === 1 ? <button disabled>Prev</button> : <button onClick={e => togglePage(e, 'prev')}>Prev</button>}
                    <div>{props.page}</div>
                    {props.issues.length === 0 ? <button disabled>Next</button> : <button onClick={e => togglePage(e, 'next')}>Next</button>}

                </div>
            </main>
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        issues: state.issue.issues,
        error: state.issue.error,
        holding: state.issue.holding,
        loading: state.issue.loading,
        activeSearch: state.issue.activeSearch,
        state: state.issue.state,
        defaultRepo: state.repo.defaultRepo,
        activeRepo: state.issue.activeRepo,
        searchInput: state.issue.searchInput,
        filtersExist: state.issue.filtersExist,
        label: state.issue.label,
        everything: state.issue.everything,
        projects: state.issue.projects,
        author: state.issue.author,
        milestones: state.issue.milestones,
        assignee: state.issue.assignee,
        sort: state.issue.sort,
        page: state.issue.page
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getIssues: (client, config, repo) => dispatch(getIssues(client, config, repo)),
        changeActiveSearch: filter => dispatch(changeActiveSearchFilter(filter)),
        handleSearchIssuesInput: value => dispatch(issuesSeachInput(value)),
        searchIssues: (client, q) => dispatch(searchForIssues(client, q)),
        addNewFilter: (type, filter) => dispatch(addNewIssuesFilter(type, filter)),
        removeFilter: filter => dispatch(removeIssueFilter(filter)),
        addSortFilter: filter => dispatch(addIssuesSortFilter(filter)),
        togglePage: (client, config, repo, q, page) => dispatch(toggleIssuesPage(client, config, repo, q, page))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IssuesContainer)