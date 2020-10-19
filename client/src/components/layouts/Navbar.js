import React, { Fragment,useContext } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/auth/auth_Context'

const Navbar = ({title,icon}) => {
    const authContext = useContext(AuthContext);
    const {Logout,user,isAuthenticated,ClearAllContact} = authContext;

    const LogoutUser = () => {
        Logout();
        ClearAllContact();
    }
    const guestLink = (
        <Fragment>
                <li>
                    <Link to='/register'>Register</Link>
                </li>
                <li>
                    <Link to='/login'>Login</Link>
                </li>
        </Fragment>
    )

    const userLink = (
        <Fragment>
            <li>
                Hello, {user && user.name}
            </li>
            <li>
                <a href='!#' onClick={LogoutUser}>
                    <i className='fas fa-sign-out-alt'></i>Logout
                </a>
            </li>
        </Fragment>
    )
    return (
        <div className="navbar bg-primary">
            <h1>
                <i className={icon}></i> {title}
            </h1>
            <ul>
                {isAuthenticated ? userLink : guestLink}               
            </ul>
        </div>
    )
}

Navbar.propTypes = {
title:PropTypes.string.isRequired,
icon:PropTypes.string.isRequired,
Logout:PropTypes.func.isRequired,
}

Navbar.defaultProps={
    title:'Contact Keeper',
    icon:'fas fa-id-card-alt'
}

export default Navbar
