import {
    ORDER_SAVED,
    ORDER_UPDATED,
    RESET_SAVED_FLAG,
    FETCHED_SUCCESS,
    FETCHED_SUCCESS_Admin

} from './types';

import { addErrorMessage, clearErrorMessages } from './error_actions';

import {
    apiSaveOrder,
    apiFetchOrder,
    apiDeleteOrder,
    apiUpdateOrder,
    apiFetchOrders
} from '../api/order';


export const saveOrder = order => {
    return async dispatch => {
        try {
            dispatch(clearErrorMessages());
            await apiSaveOrder(order);
            dispatch({ type: ORDER_SAVED });
        } catch (e) {
            dispatch(addErrorMessage(e));
        }
    };
};


export const resetSaved = () => ({ type: RESET_SAVED_FLAG });

//user
export const fetchOrder = () => {
    return async dispatch => {
        try {
            const { data } = await apiFetchOrder();
            dispatch({ type: FETCHED_SUCCESS, payload: data });
        } catch (e) {
            dispatch(addErrorMessage(e));
        }
    };
};

//admin
export const fetchOrders = () => {
    return async dispatch => {
        try {
            const { data } = await apiFetchOrders();
            dispatch({ type: FETCHED_SUCCESS_Admin, payload: data });
        } catch (e) {
            dispatch(addErrorMessage(e));
        }
    };
};


export const updateOrder = orderId => {
    return async dispatch => {
        try {
            dispatch(clearErrorMessages());
            await apiUpdateOrder(orderId);
            dispatch(fetchOrders());    //===> refresh data after use in manage-orders
            dispatch({ type: ORDER_UPDATED });
        } catch (e) {
            dispatch(addErrorMessage(e));
        }
    };
};

export const deleteOrder= orderId => {
    return async dispatch => {
        try {
            dispatch(clearErrorMessages());
            await apiDeleteOrder(orderId);
            dispatch(fetchOrder());  //===> refresh data if use in orders
        } catch (e) {
            dispatch(addErrorMessage(e));
        }
    };
};




