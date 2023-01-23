import React from "react";
import { SHOW_ALERT, CLEAR_ALERT } from "./actions";
import { initialState } from "./appContext";

const reducer = (state, action) => {
  if (action.type === SHOW_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "please fill all values!",
    };
  }

  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }
  throw new Error(`there is no such action ${action.type}`);
};

export default reducer;
