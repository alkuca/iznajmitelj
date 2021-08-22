import React from 'react';
import {Redirect, Route, withRouter} from "react-router-dom";

const PrivateRoute = ({isAuthenticated,children, ...rest}) => {

    return (
            <Route {...rest} render={() => {
                return isAuthenticated ?
                    children
                    : <Redirect to="/auth/login"/>
            }}/>
    );
};

export default withRouter(PrivateRoute);