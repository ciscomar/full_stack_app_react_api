import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { AuthConsumer } from "./AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Animated } from "react-animated-css";

//Course component for each course checking if user is author for update, delete buttons
class Course extends Component {
    render() {
        const { id, title, courseUserId } = this.props;

        return (
            <AuthConsumer>
                {({ isAuthor }) => (
                    <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
                        <div className="grid-33">
                            <NavLink to={`courses/${id}`} className="course--module course--link" onClick={isAuthor(courseUserId)}>
                                <h4 className="course--label"> Course</h4>
                                <h3 className="course--title"><FontAwesomeIcon icon="book" /> {title}</h3>
                            </NavLink>
                        </div>
                    </Animated>
                )}
            </AuthConsumer>
        );
    }
}
export default React.memo(Course)