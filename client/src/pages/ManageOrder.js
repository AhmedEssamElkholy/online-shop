import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchOrders, updateOrder, resetSaved } from '../actions/order_actions';
import { ErrorMessage } from '../components';
class ManageOrderPage extends Component {

    componentDidMount = () => {
        const { fetchOrders } = this.props;
        fetchOrders();
    }
    componentDidUpdate() {
        const { updated, error, resetSaved } = this.props;

        if (updated) {
            resetSaved();
        }

        if (error && this.bag) {
            this.bag.setSubmitting(false);
        }
    }

    render() {
        const { updateOrder, orders } = this.props;
        const theorders = orders.map((product, index) => {
            return (
                <tr key={product._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{product.userId}</td>
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

                    <td>{product.amount}</td>

                    <td>{product.price * product.amount}$</td>
                    <td>{product.address}</td>
                    <td>{product.phoneNumber}</td>
                    <td>{product.status}</td>

                    <td>
                        {
                            product.status === 'pending' &&
                            <button onClick={() => { updateOrder(product._id) }} className="btn btn-danger">send</button>
                        }

                        {
                            product.status === 'sent' &&
                            <button className="btn btn-danger">complete</button>
                        }



                    </td>
                </tr>




            );
        })
        return (
            <div className='container m-3'>
                <ErrorMessage />
                {
                    orders.length === 0
                        ? <p className="alert alert-danger">There is no orders </p>
                        : <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">no</th>
                                    <th scope="col">owner</th>
                                    <th scope="col">product name</th>
                                    <th scope="col">price</th>
                                    <th scope="col">amount</th>
                                    <th scope="col">total</th>
                                    <th scope="col">address</th>
                                    <th scope="col">phone</th>
                                    <th scope="col">status</th>
                                    <th scope="col">actions</th>
                                </tr>
                            </thead>
                            <tbody>

                                {theorders}

                            </tbody>
                        </table>
                }





            </div>
        );
    }
};
const mapStateToProps = ({ order }) => {
    return {
        orders: order.AdminOrders,

    };
};
const ManageOrder = connect(mapStateToProps, {
    fetchOrders,
    updateOrder,
    resetSaved,

}
)(ManageOrderPage);


export { ManageOrder };
