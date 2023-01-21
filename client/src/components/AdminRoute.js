import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
// دا زى ميدل وير بيعمل بروتكت للروت 
//لو كان مسجل وديه للمسار الى طالبه 
//ولو مكنش مسجل رجعه يسجل

// not user cant go home befor signIn
const AdminRouteComponent = ({ isAdmin, component: Component, ...rest }) => {
    

    return (
        <Route 
         {...rest}
         render={props => isAdmin ? <Component {...props}/>  : <Redirect to='/'/> }
        />
        
    );
}
 
const mapStateToProps = ({ auth }) => {
     return {
        isAdmin: auth.isAdmin
    };
};

const AdminRoute = connect(mapStateToProps)(AdminRouteComponent);
export { AdminRoute };