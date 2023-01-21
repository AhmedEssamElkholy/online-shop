import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { logUserOut } from '../actions/auth_actions';

class NavBarComponent extends Component {



    render() {
        const { isAuth,logUserOut ,isAdmin} = this.props;
        return (
            <div>
                <nav className="navbar navbar-expand-lg bg-light">
                    <div className="container-fluid">
                        {/* Home */}
                        <Link className="navbar-brand text-warning" to="/">online-shop</Link>
                        {/* open & close*/}
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>

                        {/* all things in navBar*/}
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            {/* first thing in navBar ==> ul (links) */}
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                                {
                                    !isAuth &&
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link active" aria-current="page" to="/login">login</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link active" aria-current="page" to="/signup">signup</Link>
                                        </li>
                                    </>
                                }
                                {
                                    isAuth &&
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link active" aria-current="page" to="/cart">cart</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link active" aria-current="page" to="/orders">orders</Link>
                                        </li>
                                    </>
                                }
                                
                                {
                                    isAdmin &&
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link active" aria-current="page" to="/AddProduct">Add product</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link active" aria-current="page" to="/manage-order">manage orders</Link>
                                        </li>
                                    </>
                                }







                            </ul>

                            {/* second thing in navBar ==> form*/}

                            {
                                isAuth &&
                                <>
                                    <form className="d-flex" role="search">
                                        <button className="btn btn-warning"  onClick={logUserOut}>logOut</button>
                                    </form>
                                </>
                            }



                        </div>


                    </div>
                </nav>



            </div>
        );
    }
}
const mapStateToProps = ({ auth }) => {
    return {
        isAuth: auth.isAuth,
        isAdmin: auth.isAdmin,
        profile: auth.profile
    };
};

const NavBar = connect(
    mapStateToProps,
    { logUserOut }
)(NavBarComponent);

export { NavBar };
