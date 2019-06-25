import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthConsumer } from './AuthContext';

//Signed in private route
const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <AuthConsumer>
            {({ isAuth, emailAddress }) => (
                <Route
                    render={props =>
                        isAuth || emailAddress ? (
                            <Component {...props} />
                        ) : (
                            <Redirect to={{pathname: '/signin', state: { from: props.location }}}/>
                        )
                    }
                    {...rest}
                />
            )}
        </AuthConsumer>
    );
};

export default PrivateRoute;