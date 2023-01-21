import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormProduct, ErrorMessage } from '../components';


import { saveProduct, resetSaved } from '../actions/product_actions';


class AddProductPage extends Component {

    onSubmit = (values, bag) => {
        const formData = new FormData();
        Object.keys(values).forEach((key) => formData.append(key, values[key]));
        this.props.saveProduct(formData);
        this.bag = bag;
    }

    componentDidUpdate() {
        const { saved, error, resetSaved } = this.props;

        if (saved) {
            resetSaved();
            this.props.history.push('/');
        }

        if (error && this.bag) {
            this.bag.setSubmitting(false);
        }
    }

    render() {
        return (
            <div style={{ padding: 20 }}>
                <h3>ADD New product</h3>
                <hr  className='text-warning '/>

                <ErrorMessage />

                <FormProduct onSubmit={this.onSubmit} />

            </div>
        );
    }
}
const mapStateToProps = ({ product, errors }) => {
    return {
        saved: product.saved,
        error: errors.message,
    };
};
const AddProduct = connect(mapStateToProps, {
    saveProduct,
    resetSaved
}
)(AddProductPage);

export { AddProduct };
