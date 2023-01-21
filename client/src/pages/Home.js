import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import { Button, Input, FormGroup, Label, FormFeedback } from 'reactstrap';
import * as Yup from 'yup';

import { ErrorMessage, Filter } from '../components';
import { fetchProduct, deleteProduct } from '../actions/product_actions';
//item
import { saveItem, resetSaved } from '../actions/item_actions';

const categories = ["All", "phones", "clothes", "computers"];  //111
class HomePage extends Component {

    state = { selected: "All" };      //111

    onSelectCategory(category) {   //111
        this.setState({ selected: category });
        this.props.fetchProduct(category);
    }


    componentDidMount = (category) => {
        const { fetchProduct } = this.props;
        fetchProduct(category);
    }

    _handleFormSubmit(values, bag) {
        this.props.saveItem(values);
        this.bag = bag;

    }
    //item
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
        const { selected } = this.state;  //111
        const API_ENDPOINT = process.env.API_ENDPOINT || 'http://localhost:3000';
        const { deleteProduct, products, isAdmin } = this.props;

        const TheProducts = products.map(product => {
            return (
                <div key={product._id} className='col-lg-4 col-md-6 col-12  p-1 '>

                    <div className="card" >
                        <img src={`${API_ENDPOINT}/${product.image}`} className="card-img-top" alt="photo" />
                        <div className="card-body">
                            <Link className="link link-warning link-lg fs-4"
                                to={{
                                    pathname: '/productDetails',
                                    state: { product },
                                }}
                            >
                                {product.name}
                            </Link>


                            <h5 className="card-title">price:{product.price}$</h5>

                            {
                                isAdmin &&
                                <>
                                    <button onClick={() => { deleteProduct(product._id) }} className="btn btn-danger">Delete</button>

                                    <Link className="btn btn-secondary btn-sm"
                                        to={{
                                            pathname: '/EditProduct',
                                            state: { product },
                                        }}
                                    >
                                        Edit
                                    </Link>

                                </>
                            }


                            <Formik
                                initialValues={{ name: product.name, price: product.price, productId: product._id, amount: '', image: product.image }}
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

            )
        })

        return (
            <div style={{ padding: 20 }}>

                <Filter       //111
                    categories={categories}
                    onSelectCategory={this.onSelectCategory.bind(this)}
                    selected={selected}
                />

                <div className='text-center m-1'>
                    <h3>products</h3>
                </div>
                <hr />

                <ErrorMessage />

                {
                    products.length === 0
                        ? <p className="alert alert-danger">There is no products</p>
                        : <div className='container'>
                            <div className='row'>
                                {TheProducts}
                            </div>
                        </div>
                }

                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item"><a className="page-link" href="#">Next</a></li>
                    </ul>
                </nav>


            </div>
        );
    }
}
const mapStateToProps = ({ product, auth, item }) => {
    return {
        products: product.product,
        isAdmin: auth.isAdmin,
        saved: item.saved,
    };
};
const Home = connect(mapStateToProps, {
    fetchProduct,
    deleteProduct,
    saveItem,
    resetSaved,
}
)(HomePage);

export { Home };
