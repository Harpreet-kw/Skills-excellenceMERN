import { FIFTH_STEP, FIRST_STEP, FOURTH_STEP, SECOND_STEP, THIRD_STEP } from "./types";

const initState = {
    loading : true,
  }
  
  const voucherReducer = (state = initState, action) => {
    console.log("call in voucher reducer", action);
      switch (action.type) {
      case FIRST_STEP:
        return {
          ...state,
          first: action.payload,
          loading: false
        }
      case SECOND_STEP:
        return {
          ...state,
          second: action.payload,
          loading: false
        }
      case THIRD_STEP:
        return {
          ...state,
          third: action.payload,
          loading: false
        }
      case FOURTH_STEP:
        return {
          ...state,
          fourth: action.payload,
          loading: false
        }
      case FIFTH_STEP:
        return {
          ...state,
          fifth:  action.payload,
          loading: false
        }
      
      default: // need this for default case
        return state 
     }
  }
  
  export default voucherReducer;