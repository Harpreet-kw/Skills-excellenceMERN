import { STUDENTS_LIST } from "./types";

const initState = {
  isLogin : false,
  data: []
}

const rootReducer = (state = initState, action) => {
  console.log("call in reducer", action);
    switch (action.type) {
    case 'LOGIN_USER':
      return {
        ...state,
        userData: action.payload,
        isLogin: true
      }
    case 'LOGIN_USER_ERROR': {
      return {
        ...state,
        userData: action.payload,
        loginError: true
      }
    }
    case STUDENTS_LIST:
      console.log('payload here', action);
      return {
        ...state,
        data: action.payload,
      } 
    case 'LOGOUT_USER':
      return {
        ...state,
        isLogin: false
      }   
    case 'REGISTER_USER':
      return {
        ...state,
        registerUser: action.payload
      }   
    default: // need this for default case
      return state 
   }
}

export default rootReducer;