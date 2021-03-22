import React from 'react'
import classes from '../css/topNavigation.module.css'
import TopNavUserContainer from './TopNavUserContainer'

function TopNavContainer(props) {
    return (
        <React.Fragment>
            <nav className={classes.topNavContainer}>
                <ul>
                    <li>
                        <div>
                            <span>Psst...Am i a worthy candidate?</span>
                            <span>Let's schedule the interview 😉</span>
                        </div>
                        <div>
                            <span>Email: nidday.mc.troy@gmail.com</span>
                            <span>Mobile: 0791495667</span>
                            <span>Alternate: 0748799137</span>
                        </div>
                        <div>
                            <span>nidday.mc.troy@gmail.com</span>
                            <span>0791495667</span>
                            <span>0748799137</span>
                        </div>
                    </li>
                    <TopNavUserContainer></TopNavUserContainer>
                </ul>
            </nav>
        </React.Fragment>
    )
}

export default TopNavContainer
