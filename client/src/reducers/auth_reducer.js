import {
    SIGNUP_SUCCESS,
    AUTH_FAILED,
    AUTH_SUCCESS,
    USER_LOGGED_OUT,
    PROFILE_FEATCHED ,
    RESET_signUp_FLAG
  } from '../actions/types';

  const INITIAL_STATE = {
    signedUp: false,  
    isAuth: false,  
    isAdmin: false,
    error: null,  
    profile: {},
  };

  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case SIGNUP_SUCCESS:
            return { ...state, error: null, signedUp: true };
        
  
      case AUTH_SUCCESS:
        return { ...state, isAuth: true, error: null };
  
      case AUTH_FAILED:
        return {
          ...state,
          isAuth: false,
          error: action.payload,
        };
  
      case USER_LOGGED_OUT:
        return { ...state, isAuth: false , isAdmin: false, profile: {} };

        
      case PROFILE_FEATCHED:
        const profile  = action.payload;
        if(profile.isAdmin){
            return { ...state, profile ,  isAdmin:true};
        }else{
            return { ...state, profile ,  isAdmin:false};
        }

        case RESET_signUp_FLAG:
            return { ...state, signedUp: false  };
        
  

  
      default:
        return state;
    }
  };
  