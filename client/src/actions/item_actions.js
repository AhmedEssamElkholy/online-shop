import {
    ITEM_SAVED,
    ITEM_UPDATED,
    RESET_SAVED_FLAG,
    FETCHED_SUCCESS,

} from './types';

import { addErrorMessage, clearErrorMessages } from './error_actions';

import {
    apiSaveItem,
    apiFetchItem,
    apiDeleteItem,
    apiUpdateItem
} from '../api/item';


export const saveItem = item => {
    return async dispatch => {
        try {
            dispatch(clearErrorMessages());
            await apiSaveItem(item);
            dispatch({ type: ITEM_SAVED });
        } catch (e) {
            dispatch(addErrorMessage(e));
        }
    };
};


export const resetSaved = () => ({ type: RESET_SAVED_FLAG });


export const fetchItem = () => {
    return async dispatch => {
        try {
            const { data } = await apiFetchItem();
            dispatch({ type: FETCHED_SUCCESS, payload: data });
        } catch (e) {
            dispatch(addErrorMessage(e));
        }
    };
};


export const updateItem = item => {
    return async dispatch => {
        try {
            dispatch(clearErrorMessages());
            await apiUpdateItem(item);
            dispatch({ type: ITEM_UPDATED });
        } catch (e) {
            dispatch(addErrorMessage(e));
        }
    };
};

export const deleteItem = itemId => {
    return async dispatch => {
        try {
            dispatch(clearErrorMessages());
            await apiDeleteItem(itemId);
            dispatch(fetchItem());
        } catch (e) {
            dispatch(addErrorMessage(e));
        }
    };
};




