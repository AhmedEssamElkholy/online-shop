import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

//  user cant signIn again he must logout first

const NotAuthRouteComponent = ({ isAuth, component: Component, ...rest }) => {
    

    return (
        <Route 
         {...rest}
         render={props => !isAuth ? <Component {...props}/>  : <Redirect to='/'/> }
        />
        
    );
}
 
const mapStateToProps = ({ auth }) => {
     return {
        isAuth: auth.isAuth
    };
};

const NotAuthRoute = connect(mapStateToProps)(NotAuthRouteComponent);
export { NotAuthRoute };