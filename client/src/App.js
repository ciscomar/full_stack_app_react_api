import React from 'react';
import './App.css';
import Courses from "./components/Courses";
import { Route, Switch } from 'react-router-dom';
import CourseDetail from './components/CourseDetail'
import { AuthProvider } from "./components/AuthContext";
import Header from "./components/Header";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import UserSignOut from "./components/UserSignOut";
import UpdateCourse from "./components/UpdateCourse";
import CreateCourse from "./components/CreateCourse";
import PrivateRoute from "./components/PrivateRoute"

//Font awsome icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faBook } from '@fortawesome/free-solid-svg-icons'
import { faSmile } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import { faRuler } from '@fortawesome/free-solid-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { faReply } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

library.add(faUser)
library.add(faPlus)
library.add(faBook)
library.add(faSmile)
library.add(faTimes)
library.add(faClock)
library.add(faRuler)
library.add(faPen)
library.add(faReply)
library.add(faTrash)



function App() {
  return (
    <div>

      <AuthProvider>
        <Header />
        <Switch>
          <Route exact path="/" component={Courses} />
          <PrivateRoute exact path="/courses/create" component={CreateCourse} />
          <Route exact path="/courses/:id" component={CourseDetail} />
          <Route exact path="/signin" component={UserSignIn} />
          <Route exact path="/signup" component={UserSignUp} />
          <PrivateRoute exact path="/courses/:id/update" component={UpdateCourse} />
          <Route exact path="/signout" component={UserSignOut} />

        </Switch>
      </AuthProvider>
    </div>
  );
}

export default App;
