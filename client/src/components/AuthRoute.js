import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
// دا زى ميدل وير بيعمل بروتكت للروت 
//لو كان مسجل وديه للمسار الى طالبه 
//ولو مكنش مسجل رجعه يسجل

// not user cant go home befor signIn
const AuthRouteComponent = ({ isAuth, component: Component, ...rest }) => {
    

    return (
        <Route 
         {...rest}
         render={props => isAuth ? <Component {...props}/>  : <Redirect to='/login'/> }
        />
        
    );
}
 
const mapStateToProps = ({ auth }) => {
     return {
        isAuth: auth.isAuth
    };
};

const AuthRoute = connect(mapStateToProps)(AuthRouteComponent);
export { AuthRoute };