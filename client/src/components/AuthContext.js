import React, { Component } from 'react';
import axios from 'axios';

//Globals to be used in other components
const Authenticator = React.createContext();

class AuthProvider extends Component {
    state = {
        isAuth: false,
        _id: null,
        name: null,
        firstName: null,
        lastName: null,
        emailAddress: null,
        password: null,
        confirmPassword: null,
        errors: null,
        author: false,
        errRest: null

    };

    componentDidMount() {

        this.setState({
            errRest: this.errorReset()
        })

        return Object.keys(this.state).map(key => {
            return this.setState({
                [key]: localStorage.getItem(key)
            })
        })
    }

    errorReset = () => {
        this.setState({
            errors: null,
        })
    };
    //Used to Sign in
    signIn = e => {
        if (e) e.preventDefault();
        this.errorReset()
        const { emailAddress, password } = this.state;

        axios.get('http://localhost:5000/api/users', {
            auth: {
                username: emailAddress,
                password: password
            }
        }).then(res => {
            this.setState({
                isAuth: true,
                _id: res.data.id,
                emailAddress: emailAddress,
                password: password,
                name: res.data.firstName + ' ' + res.data.lastName
            });

            return Object.keys(this.state).map(key => {
                return localStorage.setItem(key, this.state[key]);
            });

        }).catch(e => {

            let msg = [e.response.data.message];
            this.setState({
                errors: msg
            })
        });
    };
    //Used to Sign Up
    signUp = e => {
        this.errorReset()
        e.preventDefault();

        const {
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPassword
        } = this.state;
        if (password !== confirmPassword) {
            let msg = ['Passwords dont match'];
            this.setState({
                errors: msg
            })
        } else
            axios
                .post(`http://localhost:5000/api/users`, {
                    firstName,
                    lastName,
                    emailAddress,
                    password,
                    confirmPassword
                })
                .then(() => {
                    this.signIn();
                })
                .catch(err => {

                    let error = [err.response.data.Error];
                    this.setState({
                        errors: error
                    });

                });
    };
    //Used to Sign Out
    signOut = () => {
        this.errorReset()
        this.setState({
            isAuth: false,
            name: null,
            emailAddress: null,
            password: null
        });
        localStorage.clear()
    };
    //Check if user is author
    isAuthor = courseId => e => {
        if (this.state._id === courseId) {
            this.setState({
                author: true
            });
        } else {
            this.setState({
                author: false
            })
        }
    };
    // Updates values as user types in inputs.
    change = e => {
        this.errorReset()
        if (e.currentTarget.value === '') {
            this.setState({
                [e.currentTarget.name]: null
            })
        } else
            this.setState({
                [e.currentTarget.name]: e.currentTarget.value
            });
        localStorage.setItem([e.currentTarget.name], e.currentTarget.value);
    };

    render() {
        const { _id, isAuth, name, errors, author } = this.state;

        return (
            <Authenticator.Provider
                value={{
                    id: _id,
                    state: this.state,
                    isAuth,
                    signIn: this.signIn,
                    signUp: this.signUp,
                    signOut: this.signOut,
                    name,
                    change: this.change,
                    errors,
                    isAuthor: this.isAuthor,
                    author
                }}
            >
                {this.props.children}
            </Authenticator.Provider>
        );
    }
}

const AuthConsumer = Authenticator.Consumer;

export { AuthProvider, AuthConsumer };
