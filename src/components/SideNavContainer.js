import React from 'react'
import classes from '../css/sideNavigation.module.css'
import ExReposContainer from './ExReposContainer'
import ExReposFormContainer from './ExReposFormContainer'
import ReposContanerList from './ReposContanerList'

function SideNavContainer() {
    return (
        <React.Fragment>
            <input type="checkbox" id="togglesidenav" className={classes.toggleSideNav}></input>
            <label htmlFor="togglesidenav"></label>
            <nav className={classes.sideNavWrapper}>
                <ul className={classes.wrapperTopPosition}>
                    <li>
                        <input type="checkbox" id="your-repo"></input>
                        <label htmlFor="your-repo"><span></span><span>Your Repositories</span></label>
                        <ReposContanerList></ReposContanerList>
                    </li>
                    <li>
                        <input type="checkbox" id="ex-repo"></input>
                        <label htmlFor="ex-repo"><span></span><span>External Repositories</span></label>
                        <ExReposContainer></ExReposContainer>
                    </li>
                    <li>
                        <input type="checkbox" id="adex-repo"></input>
                        <label htmlFor="adex-repo"><span></span><span>Add External Repo</span></label>
                        <ExReposFormContainer></ExReposFormContainer>
                    </li>
                </ul>
            </nav>
        </React.Fragment>
    )
}

export default SideNavContainer
