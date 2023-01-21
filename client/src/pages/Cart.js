import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import { Button, Input, FormGroup, Label, FormFeedback } from 'reactstrap';
import * as Yup from 'yup';
import { ErrorMessage } from '../components';
import { fetchItem, deleteItem, updateItem ,resetSaved} from '../actions/item_actions';

class CartComponent extends Component {

    componentDidMount = () => {
        const { fetchItem } = this.props;
        fetchItem();
    }

    _handleFormSubmit(values, bag) {
        this.props.updateItem(values);
        this.bag = bag;

    }

    componentDidUpdate() {
        const { updated, error, resetSaved ,fetchItem} = this.props;
        if (updated) {
            resetSaved();
            fetchItem();
            this.bag.setSubmitting(false);
            // this.bag.resetForm();
        }

        if (error && this.bag) {
            this.bag.setSubmitting(false);
        }
    }



    render() {
        const { deleteItem, items } = this.props;
        const theItems = items.map((product, index) => {
            return (
                <tr key={product._id}>
                    <th scope="row">{index + 1}</th>
                    <td>
                        <Link className="link link-primary link-md"
                            to={{
                                pathname: '/productDetails',
                                state: { product },
                            }}
                        >
                            {product.name}
                        </Link>
                    </td>
                    <td>{product.price}$</td>

                    <td>
                        <Formik
                            initialValues={{  itemId: product._id, amount: product.amount }}
                            onSubmit={this._handleFormSubmit.bind(this)}
                            validationSchema={Yup.object().shape({
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
                                        update
                                    </Button>
                                </div>
                            )}
                        />
                        {/* {product.amount} */}
                    </td>

                    <td>{product.price * product.amount}$</td>

                    <td>
                        <button onClick={() => { deleteItem(product._id) }} className="btn btn-danger">Delete</button>
                        <Link className="btn btn-secondary btn-md"
                            to={{
                                pathname: '/verify-order',
                                state: { product },
                            }}
                        >
                            order
                        </Link>
                    </td>
                </tr>




            );
        })
        return (
            <div className='container m-3'>
                <ErrorMessage />
                {
                    items.length === 0
                        ? <p className="alert alert-danger">There is no products in your cart</p>
                        : <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">no</th>
                                    <th scope="col">product name</th>
                                    <th scope="col">price</th>
                                    <th scope="col">amount</th>
                                    <th scope="col">total</th>
                                    <th scope="col">actions</th>
                                </tr>
                            </thead>
                            <tbody>

                                {theItems}

                            </tbody>
                        </table>

                        
                }





            </div>
        );
    }
}
const mapStateToProps = ({ item }) => {
    return {
        items: item.item,
        updated: item.updated,
    };
};
const Cart = connect(mapStateToProps, {
    fetchItem,
    deleteItem,
    updateItem,
    resetSaved
}
)(CartComponent);

export { Cart };
