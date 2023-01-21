import {
    PRODUCT_SAVED,
    RESET_SAVED_FLAG,
    FETCHED_SUCCESS,
    PRODUCT_UPDATED
  } from './types'; 
  
  //دول الاتنين اكشن كرياتور يهندلو الايرور
  import { addErrorMessage, clearErrorMessages } from './error_actions';
  
  import {
    apiSaveProduct,
    apiFetchProduct,
    apiDeleteProduct,
    apiUpdateProduct 
  } from '../api/product';


  export const saveProduct = product => {
    return async dispatch => {
      try {
        dispatch(clearErrorMessages());
        await apiSaveProduct(product);
        dispatch({ type: PRODUCT_SAVED });
      } catch (e) {
        dispatch(addErrorMessage(e));
      }
    };
  };

  export const resetSaved = () => ({ type: RESET_SAVED_FLAG });

  export const fetchProduct = category => {
    return async dispatch => {
      try {
        const { data } = await apiFetchProduct(category);
        dispatch({ type: FETCHED_SUCCESS, payload: data});
      } catch (e) {
        dispatch(addErrorMessage(e));
      }
    };
  };

  export const updateProduct = product => {
    return async dispatch => {
      try {
        dispatch(clearErrorMessages());
        await apiUpdateProduct(product);
        dispatch({ type: PRODUCT_UPDATED });
      } catch (e) {
        dispatch(addErrorMessage(e));
      }
    };
  };

  export const deleteProduct = productId => {
    return async dispatch => {
      try {
        dispatch(clearErrorMessages());
        await apiDeleteProduct(productId);
        dispatch(fetchProduct());
      } catch (e) {
        dispatch(addErrorMessage(e));
      }
    };
  };

  



