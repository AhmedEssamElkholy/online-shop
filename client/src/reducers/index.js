import { combineReducers } from 'redux';

import auth from './auth_reducer';
import product from './product_reducer';
import errors from './error_reducer';
import item from './item_reducer';
import order from './order_reducer';

export default combineReducers({
    auth,
    product,
    errors,
    item,
    order,
});