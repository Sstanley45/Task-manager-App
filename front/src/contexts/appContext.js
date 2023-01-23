import React from "react";
import { useReducer } from "react";
import { createContext } from "react";
import reducer from "./reducer";
import { SHOW_ALERT, CLEAR_ALERT } from "./actions";


export const AppContext = createContext(); 

export const initialState = {    
    isLoading: false,
    showAlert: false,
    alertType: '',
    alertText: '',
};
  
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

    
    const displayAlert = () => {
        dispatch({type:SHOW_ALERT})
        setTimeout(() => {
            clearAlert()
        }, 3000)
    }

    const clearAlert = () => {
        dispatch({type:CLEAR_ALERT}) 
    }

  return (
      <AppContext.Provider value={{...state, displayAlert, clearAlert}}>   
          {children}    
      </AppContext.Provider>
  );
};

export default AppProvider;
