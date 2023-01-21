import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { Button, Input, FormGroup, Label, FormFeedback } from 'reactstrap';
import * as Yup from 'yup';
import {  ErrorMessage } from '../components';
import { saveOrder, resetSaved } from '../actions/order_actions';

class VerifyOrderComponent extends Component {


    _handleFormSubmit(values, bag) {
        this.props.saveOrder(values);
        this.bag = bag;

    }
    componentDidUpdate() {
        const { saved, error, resetSaved } = this.props;

        if (saved) {
            resetSaved();
            this.props.history.push('/orders');
        }

        if (error && this.bag) {
            this.bag.setSubmitting(false);
        }
    }

    render() {
        const product = this.props.location.state.product;
        return (
            <div>
                <div className='text-center m-1'>
                    <h3>Verify Order</h3>
                </div>
                <hr />
                <ErrorMessage />
                <Formik
                    initialValues={{ name: product.name, price: product.price, productId: product.productId, amount:product.amount, itemId:product._id ,image:product.image,address:'',phoneNumber:''}}
                    onSubmit={this._handleFormSubmit.bind(this)}
                    validationSchema={Yup.object().shape({
                        address: Yup.string().required(),
                        phoneNumber: Yup.number().required(),
                    })}
                    render={({
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        values,
                        handleSubmit,
                        isValid,
                        isSubmitting,
                    }) => (
                        <div>
                            <FormGroup>
                            <Label>address</Label>
                                <Input
                                    invalid={errors.address && touched.address}
                                    name="address"
                                    type="string"
                                    value={values.address}
                                    placeholder="Enter your address"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.address && touched.address && (
                                    <FormFeedback>{errors.address}</FormFeedback>
                                )}
                            </FormGroup>
                            <FormGroup>
                            <Label>phoneNumber</Label>
                                <Input
                                    invalid={errors.phoneNumber && touched.phoneNumber}
                                    name="phoneNumber"
                                    type="number"
                                    value={values.phoneNumber}
                                    placeholder="Enter your phoneNumber"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.phoneNumber && touched.phoneNumber && (
                                    <FormFeedback>{errors.phoneNumber}</FormFeedback>
                                )}
                            </FormGroup>

                            <Button
                                color="warning"
                                style={{ marginTop: 15 }}
                                onClick={handleSubmit}
                                disabled={!isValid || isSubmitting}
                            >
                                verify
                            </Button>
                        </div>
                    )}
                />
            </div>
        );
    }
};
const mapStateToProps = ({ order, errors }) => {
    return {
        saved: order.saved,
        error: errors.message,
    };
};
const VerifyOrder = connect(mapStateToProps, {
    saveOrder,
    resetSaved
}
)(VerifyOrderComponent);

export { VerifyOrder };
