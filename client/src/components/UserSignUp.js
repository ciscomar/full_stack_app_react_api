import React, { Component } from 'react'
import { NavLink, Redirect } from "react-router-dom";
import { AuthConsumer } from "./AuthContext";
import ValidationErrors from "./ValidationErrors";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//User sign up component with required information
class UserSignUp extends Component {
    render() {   
        return (
            <AuthConsumer>
                {({ isAuth, change, signUp, errors }) =>
                    isAuth ? (
                        <Redirect to="/" />
                    ) : (

                            <div className="bounds">
                                <div className="grid-33 centered signin">
                                    <h1><FontAwesomeIcon icon="user" /> Sign Up</h1>
                                    <ValidationErrors errors={errors} />
                                    <div>
                                        <form onSubmit={signUp}>
                                            <div>
                                                <input id="firstName" required name="firstName" type="text" className="" placeholder="First Name" onChange={change} />
                                            </div>
                                            <div>
                                                <input id="lastName" required name="lastName" type="text" className="" placeholder="Last Name" onChange={change} />
                                            </div>
                                            <div>
                                                <input id="emailAddress" required name="emailAddress" type="text" className="" autoComplete="username" placeholder="Email Address" onChange={change}
                                                />
                                            </div>
                                            <div>
                                                <input id="password" required name="password" type="password" value={undefined} className="" autoComplete="new-password" placeholder="Password" onChange={change} />
                                            </div>
                                            <div>
                                                <input id="confirmPassword" required name="confirmPassword" type="password" className="" autoComplete="new-password" placeholder="Confirm Password" onChange={change}/>
                                            </div>

                                            <div className="grid-100 pad-bottom">
                                                <button className="button" type="submit"> Sign Up </button>
                                                <NavLink className="button button-secondary" to="/">Cancel</NavLink>
                                            </div>
                                        </form>
                                    </div>
                                    <p>&nbsp;</p>
                                    <p>
                                        Already have a user account?
                                        <NavLink to="/signin"> Click here</NavLink> to sign in
                                    </p>
                                </div>
                            </div>
                        )}
            </AuthConsumer>
        )
    }
}

export default UserSignUp


