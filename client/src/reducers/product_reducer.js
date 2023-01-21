import {
    PRODUCT_SAVED,
    RESET_SAVED_FLAG,
    FETCHED_SUCCESS,
    PRODUCT_UPDATED
  } from '../actions/types';
  
  const INITIAL_STATE = {
    updated: false,
    saved: false,
    // fetching: false,
    product: [],
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

      case FETCHED_SUCCESS:
        const  product  = action.payload;  //==> 1 thing {}
        return { ...state, product};

      case PRODUCT_SAVED:
        return { ...state, saved: true };


      case PRODUCT_UPDATED:
        return { ...state, updated: true };

    
      case RESET_SAVED_FLAG:
        return { ...state, saved: false, updated: false };


      default:
        return state;
    }
  };
  