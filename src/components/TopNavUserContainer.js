import React, { useContext, useEffect } from 'react'
import { connect } from 'react-redux'
import GuestImage from '../cssIcons/github-mark.png'
import { getUserInfo, logout } from '../redux/user/userActions'
import ClientContext from './contexts/ClientContext'

function TopNavUserContainer(props) {
    const client = useContext(ClientContext)
    // Get the user
    useEffect(() => {
        if (client) {
            props.getUserInfo(client)
        }
    }, [client])
    function logout() {
        props.logout()
        window.location.replace('/')
    }
    // console.log(props.user)
    return (
        <React.Fragment>
            <li>
                <input type="checkbox" id="user-info"></input>
                <label htmlFor="user-info">
                    {props.user ? <img src={props.user.avatar_url} alt="Github user image"></img> : <img src={GuestImage} alt="Github user image"></img>}
                    <span></span>
                </label>
                <div>
                    <ul>
                        {props.user ? <li><a href={props.user.html_url} target="_blank">{props.user.name}</a></li> : <li>@Guest</li>}
                        <li></li>
                        <li onClick={logout}><span></span><span>Logout</span></li>
                    </ul>
                </div>
            </li>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUserInfo: client => dispatch(getUserInfo(client)),
        logout: () => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopNavUserContainer)
