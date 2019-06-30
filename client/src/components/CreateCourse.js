import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import ValidationErrors from './ValidationErrors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//component to create course
class CreateCourse extends Component {
//Initializae state
    state = {
        title: null,
        description: null,
        estimatedTime: '',
        materialsNeeded: '',
        errors: null
    };
//Create course using axios with info and authorization
    createCourse = e => {
        e.preventDefault();
        const  id  = localStorage.getItem('_id');
        const { emailAddress, password } = localStorage;
        const { title, description, estimatedTime, materialsNeeded } = this.state;
        const { history } = this.props;
    
        axios.post(
                `http://localhost:5000/api/courses`,
                {
                    userId: id,
                    title: title,
                    description: description,
                    estimatedTime: estimatedTime,
                    materialsNeeded: materialsNeeded
                },
                {
                    auth: {
                        username: emailAddress,
                        password: password
                    }
                }
            )
            .then(() => {
                history.push('/');

            })
            .catch(err => {
             
                if (err.response.status === 400) {
                    let errors = [err.response.data.message];
 
                    this.setState({
                        errors: errors
                    });
                } else {
                    console.log('Error', err);
                }
            });
    };
//handle change value in course inputs
    change = e => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        });
    };
//render create new course
    render() {
        const { errors } = this.state;
        return (
                    <div>
                        <hr />
                        <div className="bounds course--detail">
                            <h1>Create Course</h1>
                            <div>
                                <ValidationErrors errors={errors} />
                                <form onSubmit={this.createCourse}>
                                    <div className="grid-66">
                                        <div className="course--header">
                                            <h4 className="course--label"><FontAwesomeIcon icon="book" /> Course</h4>
                                            <div>
                                                <input id="title"  name="title" type="text" className="input-title course--title--input" placeholder="Title..." onChange={this.change}/>
                                            </div>
                                            <p />
                                        </div>
                                        <div className="course--description">
                                            <div>
                                                <textarea id="description"  name="description" placeholder="Description..." onChange={this.change}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid-25 grid-right">
                                        <div className="course--stats">
                                            <ul className="course--stats--list">
                                                <li className="course--stats--list--item">
                                                    <h4><FontAwesomeIcon icon="clock" /> Estimated Time</h4>
                                                    <div>
                                                        <input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hrs" onChange={this.change}/>
                                                    </div>
                                                </li>
                                                <li className="course--stats--list--item">
                                                    <h4><FontAwesomeIcon icon="ruler" /> Materials Needed</h4>
                                                    <div>
                                                        <textarea id="materialsNeeded" name="materialsNeeded" placeholder="Materials..." onChange={this.change}/>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="grid-100 pad-bottom">
                                        <button className="button" type="submit"> Create Course</button>
                                        <NavLink to={'/'} className="button button-secondary">Cancel</NavLink>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
        );
    }
}

export default CreateCourse;