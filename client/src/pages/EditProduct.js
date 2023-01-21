import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ErrorMessage, FormProduct } from '../components';
import { updateProduct, resetSaved } from '../actions/product_actions';


class EditProductComponent extends Component {

    componentDidUpdate = () => {
        const { updated, resetSaved, history } = this.props;
        if (updated) {
            resetSaved();
            history.push('/');
        }
    }

    onSubmit = (values, bag) => { //خلى بالك انا مش عامل formData يعنى حتلى لو عملت صوره وانتا بتعدل مش هيحصلها ابللووود
        const product = this.props.location.state.product;
        values._id = product._id;
        this.props.updateProduct(values);
        this.bag = bag;
    }


    render() {
        const product = this.props.location.state.product;
        return (
            <div style={{ marginTop: 30 }}>
                <h3>edit</h3>

                <ErrorMessage />

                <FormProduct
                    onSubmit={this.onSubmit}
                    btnTxt="Update product"
                    product={product}
                />



            </div>
        );
    }
}
const mapStateToProps = ({ product }) => {
    return {
        updated: product.updated
    };
};
const EditProduct = connect(
    mapStateToProps,
    {
        resetSaved,
        updateProduct
    }
)(EditProductComponent);

export { EditProduct };
