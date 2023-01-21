import {
    ORDER_SAVED,
    ORDER_UPDATED,
    RESET_SAVED_FLAG,
    FETCHED_SUCCESS,
    FETCHED_SUCCESS_Admin

} from '../actions/types';

const INITIAL_STATE = {
    updated: false,
    saved: false,
    order: [],
    AdminOrders: [],
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case FETCHED_SUCCESS:
            const order = action.payload;  //==> 1 thing {}
            return { ...state, order };

        case FETCHED_SUCCESS_Admin:
            const AdminOrders = action.payload;  //==> 1 thing {}
            return { ...state, AdminOrders };

        case ORDER_SAVED:
            return { ...state, saved: true };


        case ORDER_UPDATED:
            return { ...state, updated: true };


        case RESET_SAVED_FLAG:
            return { ...state, saved: false, updated: false };


        default:
            return state;
    }
};
