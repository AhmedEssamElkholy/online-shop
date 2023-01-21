import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    Button,
    FormGroup,
    Label,
    Input,
    FormFeedback,
    Alert,
} from 'reactstrap';
import { Link } from 'react-router-dom';


import { Formik } from 'formik';
import * as Yup from 'yup';

import { signUp, reset } from '../actions/auth_actions';   //action creator

class SignupPage extends Component {

    _handleFormSubmit(values, bag) {
        this.props.signUp(values);
        this.bag = bag;

    }
    componentDidUpdate() {
        const { signedUp, error, reset } = this.props;

        if (signedUp) {
            this.props.history.push('/login');
            reset();
        }

        if (error && this.bag) {
            this.bag.setSubmitting(false);
        }
    }

    render() {
        const { error } = this.props;
        return (
            <div style={{ padding: 20 }}>
                <h3>Create new account</h3>
                {error && <Alert color="danger">{error}</Alert>}
                <hr />
                <Formik
                    initialValues={{ userName: '', email: '', password: '' }}
                    onSubmit={this._handleFormSubmit.bind(this)}
                    validationSchema={Yup.object().shape({
                        userName: Yup.string().required(),
                        email: Yup.string()
                            .email()
                            .required(),
                        password: Yup.string()
                            .min(6)
                            .required(),
                    })}
                    render={({
                        handleChange,
                        handleSubmit,
                        isValid,
                        isSubmitting,
                        handleBlur,
                        errors,
                        touched,
                    }) => (
                        <div>
                            <FormGroup>
                                <Label>userName</Label>
                                <Input
                                    invalid={errors.userName && touched.userName}
                                    name="userName"
                                    type="string"
                                    placeholder="Your Name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />

                                {errors.userName && touched.userName && (
                                    <FormFeedback>{errors.userName}</FormFeedback>
                                )}
                            </FormGroup>
                            <FormGroup>
                                <Label>Email</Label>
                                <Input
                                    invalid={errors.email && touched.email}
                                    name="email"
                                    type="email"
                                    placeholder="your Email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />

                                {errors.email && touched.email && (
                                    <FormFeedback>{errors.email}</FormFeedback>
                                )}
                            </FormGroup>
                            <FormGroup>
                                <Label>Password</Label>
                                <Input
                                    invalid={errors.password && touched.password}
                                    name="password"
                                    type="password"
                                    placeholder="Your Password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.password && touched.password && (
                                    <FormFeedback>{errors.password}</FormFeedback>
                                )}
                            </FormGroup>
                            <Button
                                color="primary"
                                block
                                onClick={handleSubmit}
                                disabled={!isValid || isSubmitting}
                            >
                                Create Account
                            </Button>
                        </div>
                    )}
                />
                <Link to="/login">Have an account? Sign In</Link>
            </div>
        );



    }


}
const mapStateToProps = ({ auth }) => {
    return {
        error: auth.error,
        signedUp: auth.signedUp,
    };
};
const Signup = connect(
    mapStateToProps,
    { signUp, reset }
)(SignupPage);

export { Signup };
