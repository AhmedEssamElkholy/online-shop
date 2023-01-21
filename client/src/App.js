import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';

import { Home, Login, Signup, ManageOrder, AddProduct, EditProduct, Cart, Orders } from './pages';
import { NavBar, NotAuthRoute, AdminRoute, AuthRoute, ProductDetails,VerifyOrder } from './components';

class App extends Component {
  render() {
    return (
      <div className='container'>

        <NavBar />
                  {/* any one  */}
        <Route path="/" component={Home} exact />
        <Route path="/productDetails" component={ProductDetails} exact />

        <Switch>
                  {/* only user */}
          <AuthRoute path="/cart" component={Cart} exact />
          <AuthRoute path="/orders" component={Orders} exact />
          <AuthRoute path="/verify-order" component={VerifyOrder} exact />
                  {/* only Not user */}
          <NotAuthRoute path="/login" component={Login} exact />
          <NotAuthRoute path="/signup" component={Signup} exact />
                  {/* only Admin */}
          <AdminRoute path="/AddProduct" component={AddProduct} exact />
          <AdminRoute path="/manage-order" component={ManageOrder} exact />
          <AdminRoute path="/EditProduct" component={EditProduct} exact />
          
        </Switch>





      </div>
    );
  }
}

export default App;


{/* <Container>
<NavBar />
<Switch>
  <ProtectedRoute path="/" component={Home} exact />
  <ProtectedRoute path="/edit" component={Edit} exact />
  <ProtectedRoute path="/AddExpense" component={AddExpense} exact />
  <ProtectedRoute2 path="/login" component={Login} exact />
  <ProtectedRoute2 path="/signup" component={Signup} exact />
</Switch>
<Route   path="/Design"  component={Design} exact/>

</Container> */}
