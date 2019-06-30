import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import ValidationErrors from "./ValidationErrors";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//Update course component
class UpdateCourse extends Component {
    _isMounted = false;
    state = { title: null, description: null, estimatedTime: null, materialsNeeded: null, errors: null, userId: null };

    componentDidMount() {
        this._isMounted = true;
        const id = this.props.match.params.id;
        const _id = parseInt(localStorage.getItem('_id'));

        axios
            .get(`http://localhost:5000/api/courses/${id}`)
            .then(response => {

                if (response.data.course.userId === _id) {
                    if (this._isMounted) {
                        this.setState({
                            title: response.data.course.title,
                            description: response.data.course.description,
                            estimatedTime: response.data.course.estimatedTime,
                            materialsNeeded: response.data.course.materialsNeeded,
                            userId: response.data.course.userId
                        });
                    }
                }
            })
            .catch(err => {
                console.log('Error', err);
            });
    }
//Update course using axios to request api
    updateCourse = e => {
        e.preventDefault();
        const { id } = this.props.match.params;
        const { _id, emailAddress, password } = localStorage;
        const { title, description, estimatedTime, materialsNeeded } = this.state;

        axios
            .put(
                `http://localhost:5000/api/courses/${id}`,
                {
                    user: _id,
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

                this.props.history.push(`/courses/${id}`);

            })
            .catch(err => {
                if (err.response.status === 400) {
                    let error = [err.response.data.message];
                    this.setState({
                        
                        errors: error
                    });
                } else {
                    console.log('Error', err);
                }
            });
    };

    //Handle the changed value for course values
    change = e => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        });
    };

    //Render course that is going to be updated
    render() {
        const { errors, title,  description, estimatedTime, materialsNeeded } = this.state;

        return (
            <div>
                <hr />
                <div className="bounds course--detail">
                    <h1><FontAwesomeIcon icon="pen" /> Update Course</h1>
                    <ValidationErrors errors={errors} />
                    <div>
                        <form onSubmit={this.updateCourse}>
                            <div className="grid-66">
                                <div className="course--header">
                                    <h4 className="course--label"><FontAwesomeIcon icon="book" /> Course</h4>
                                    <div>
                                        <input className="input-title course--title--input" id="title" name="title" type="text" placeholder="Title..." onChange={this.change} value={title} />
                                    </div>
                                </div>
                                <div className="course--description">
                                    <div>
                                        <textarea id="description" name="description" placeholder="Description..." onChange={this.change} value={description} />
                                    </div>
                                </div>
                            </div>
                            <div className="grid-25 grid-right">
                                <div className="course--stats">
                                    <ul className="course--stats--list">
                                        <li className="course--stats--list--item">
                                            <h4><FontAwesomeIcon icon="clock" /> Estimated Time</h4>
                                            <div>
                                                <input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hrs" onChange={this.change} value={estimatedTime} />
                                            </div>
                                        </li>
                                        <li className="course--stats--list--item">
                                            <h4><FontAwesomeIcon icon="ruler" /> Materials Needed</h4>
                                            <div>
                                                <textarea id="materialsNeeded" name="materialsNeeded" placeholder="Materials..." onChange={this.change} value={materialsNeeded} />
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="grid-100 pad-bottom">
                                <button className="button" type="submit"> Update Course </button>
                                <NavLink to={`/courses/${this.props.match.params.id}`} className="button button-secondary">{' '}Cancel</NavLink>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default UpdateCourse