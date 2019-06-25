import React from 'react';
import { NavLink } from 'react-router-dom';
import { AuthConsumer } from './AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//Main Header
const Header = () => {
    return (
        <AuthConsumer>
            {({ isAuth, name, signOut }) => (
                <div className="header">
                    <div className="bounds">
                        <NavLink to="/">
                            <h1 className="header--logo"><FontAwesomeIcon icon="book"/> Courses</h1>
                        </NavLink>
                        <nav>
                            {isAuth ? (
                                
                                <div>
                                    <NavLink className="signin" to="signin"> 
                                        {`Hello,  ${name} `} <FontAwesomeIcon icon="smile"/>
                                    </NavLink>
                                    <NavLink className="signout" to="/signout" onClick={signOut}>
                                        Sign Out <FontAwesomeIcon icon="times"/>
                                    </NavLink>
                                </div>
                            ) : (
                                <div>
                                    <NavLink className="signin" to="../signin">
                                    <FontAwesomeIcon icon="user"/> Sign In
                                    </NavLink>
                                    <NavLink className="signup" to="../signup">
                                    <FontAwesomeIcon icon="plus"/> Sign Up
                                    </NavLink>
                                </div>
                            )}
                        </nav>
                    </div>
                </div>
            )}
        </AuthConsumer>
    );
};

export default Header;