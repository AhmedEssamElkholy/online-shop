import React, { Component } from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { Button, Input, FormGroup, Label, FormFeedback } from 'reactstrap';
import * as Yup from 'yup';

import { saveItem, resetSaved } from '../actions/item_actions';

class ProductDetailsComponrnt extends Component {

    _handleFormSubmit(values, bag) {
        this.props.saveItem(values);
        this.bag = bag;

    }

    componentDidUpdate() {
        const { saved, error, resetSaved } = this.props;

        if (saved) {
            resetSaved();
            this.props.history.push('/cart');
        }

        if (error && this.bag) {
            this.bag.setSubmitting(false);
        }
    }
    render() {
        const product = this.props.location.state.product;
        const API_ENDPOINT = process.env.API_ENDPOINT || 'http://localhost:3000';
        return (
            <div>
                <div className='text-center m-1'>
                    <h3>product details</h3>
                    <hr />
                </div>

                <div className='container'>
                    <div className='row'>

                        <div className='col col-12 col-md-6  p-1 '>
                            <div className="card" >
                                <img src={`${API_ENDPOINT}/${product.image}`} className="card-img-top" alt="photo" />
                                <div className="card-body">
                                    <Formik
                                        initialValues={{ name: product.name, price: product.price, productId: product._id, amount: '' ,image:product.image}}
                                        onSubmit={this._handleFormSubmit.bind(this)}
                                        validationSchema={Yup.object().shape({
                                            name: Yup.string().required(),
                                            price: Yup.number().required(),
                                            amount: Yup.number().required(),
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
                                                    <Input
                                                        invalid={errors.amount && touched.amount}
                                                        name="amount"
                                                        type="number"
                                                        value={values.amount}
                                                        placeholder="Enter amount"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {errors.amount && touched.amount && (
                                                        <FormFeedback>{errors.amount}</FormFeedback>
                                                    )}
                                                </FormGroup>
                                                <Button
                                                    color="warning"
                                                    style={{ marginTop: 15 }}
                                                    onClick={handleSubmit}
                                                    disabled={!isValid || isSubmitting}
                                                >
                                                    Add To Cart
                                                </Button>
                                            </div>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>


                        <div className="col col-12 col-md-6 product-detail">
                            <h3> {product.name}</h3>
                            <h5>Price:  {product.price} $</h5>
                            <p>{product.description}</p>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
};
const mapStateToProps = ({  item }) => {
    return {
        saved: item.saved,
    };
};
const ProductDetails = connect(mapStateToProps, {
    saveItem,
    resetSaved,
}
)(ProductDetailsComponrnt);
export { ProductDetails };
