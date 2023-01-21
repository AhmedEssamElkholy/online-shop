import {
    ITEM_SAVED,
    ITEM_UPDATED,
    RESET_SAVED_FLAG,
    FETCHED_SUCCESS,

} from '../actions/types';

const INITIAL_STATE = {
    updated: false,
    saved: false,
    item: [],
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case FETCHED_SUCCESS:
            const item = action.payload;  //==> 1 thing {}
            return { ...state, item };

        case ITEM_SAVED:
            return { ...state, saved: true };


        case ITEM_UPDATED:
            return { ...state, updated: true };


        case RESET_SAVED_FLAG:
            return { ...state, saved: false, updated: false };


        default:
            return state;
    }
};
