import React, { Component } from 'react';
import axios from 'axios';
import { AuthConsumer } from "./AuthContext";
import { NavLink } from "react-router-dom";
import ReactMarkDown from "react-markdown"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//Course Details component
class CourseDetail extends Component {

    state = { course: {} };

    componentDidMount() {
//Get course with id
        axios.get(`http://localhost:5000/api/courses/${this.props.match.params.id}`).then(
            response => { this.setState({ course: response.data }) }
        ).then(this.User)

    }
//Get users to match the selected course to display name as author
    User = () => {
        axios.get('http://localhost:5000/api/users/coursesusers', {
        }).then((res) => {
            const author = res.data.filter(i => i.id === this.state.course.course.userId)[0];

            this.setState({
                authorname: author.firstName + ' ' + author.lastName
            })
        })
    };
//Delete course using axios
    deleteCourse = e => {
        e.preventDefault();
        const { emailAddress, password } = localStorage;
        const { _id } = localStorage;
        const { history } = this.props

        axios.delete(`http://localhost:5000/api/courses/${this.state.course.course.id}`,
            {
                auth: {username: emailAddress, password}
            },
            {user: _id}).then(() => {
                history.push('/');
            }).catch(err => {
     
                console.log('Error deleting data', err); 
            })
    };
//Render if course state has info
    render() {
        if (this.state.course.course === undefined) {
            return null
        } else {
            return this.renderCourse()
        }
    }
//Render the course details
    renderCourse() {
     return (
            <div>
                <AuthConsumer>
                    {({ isAuth, author }) => (
                        <div className="actions--bar">
                            <div className="bounds">
                                <div className="grid-100">
                                    {isAuth && author ? (
                                        <span>
                                            <NavLink to={`${this.state.course.course.id}/update`} className="button"><FontAwesomeIcon icon="pen" /> Update Course</NavLink>
                                            <button className="button" onClick={this.deleteCourse}><FontAwesomeIcon icon="trash" /> Delete Course</button>
                                        </span>
                                    ) : null}
                                    <NavLink className="button button-secondary" to="/"><FontAwesomeIcon icon="reply" /> Return to List</NavLink>
                                </div>
                            </div>
                        </div>
                    )}
                </AuthConsumer>
                <div className="bounds course--detail">
                    <div className="grid-66">
                        <div className="course--header">
                            <h4 className="course--label"><FontAwesomeIcon icon="book" /> Course</h4>
                            <h5 className="course--title">{this.state.course.course.title}</h5>
                            <p><FontAwesomeIcon icon="user" /> By {this.state.authorname}</p>
                        </div>
                        <ReactMarkDown className="course--description">
                            {this.state.course.course.description}
                        </ReactMarkDown>
                    </div>
                    <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4><FontAwesomeIcon icon="clock" /> Estimated Time</h4>
                                    <h3>{this.state.course.course.estimatedTime}</h3>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4><FontAwesomeIcon icon="ruler" /> Materials Needed</h4>
                                    <ReactMarkDown>
                                        {this.state.course.course.materialsNeeded}
                                    </ReactMarkDown>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CourseDetail