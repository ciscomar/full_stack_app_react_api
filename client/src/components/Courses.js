import React, { Component } from 'react';
import axios from 'axios';
import Course from './Course';
import { NavLink } from "react-router-dom";
import { AuthConsumer } from "./AuthContext";

//Component to get all courses using axios
class Courses extends Component {
    state = { courses: {} };

    componentDidMount() {
        axios
            .get(`http://localhost:5000/api/courses`)
            .then(response => {
                this.setState({courses: response.data});
            })
            .catch(err => {
                console.log('Error', err);
            });
    }
//Render all courses
    render() {
        return (
            <div>
                <hr />
                <div>
                    {Object.keys(this.state.courses).map(key => {

                        return (
                            <Course
                                title={this.state.courses[key].title}
                                key={key}
                                index={key}
                                id={this.state.courses[key].id}
                                courseUserId={this.state.courses[key].userId}
                            />
                        );
                    })}
                    <AuthConsumer>
                        {({ isAuth }) => (
                            <div className="grid-33">
                                {isAuth ? (

                                    <NavLink className="course--module course--add--module"
                                        to="/courses/create">
                                        <h3 className="course--add--title">
                                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                                viewBox="0 0 13 13" className="add">
                                                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                                            </svg>
                                            New Course
                                </h3>
                                    </NavLink>
                                ) : null}
                            </div>
                        )}
                    </AuthConsumer>

                </div>
            </div>
        )
    }
}

export default Courses;