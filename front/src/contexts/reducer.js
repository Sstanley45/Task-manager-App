import React from "react";
import { initialState } from "./appContext";
import {
  SHOW_ALERT,
  CLEAR_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  FETCH_USER_TASKS_BEGIN,
  FETCH_USER_TASKS_SUCCESS,
  FETCH_USER_TASKS_ERROR,
  CREATE_TASK_BEGIN,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_ERROR,
  DELETE_TASK_BEGIN,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_ERROR,
  UPDATE_TASK_BEGIN,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_ERROR,
  REMOVE_USER,
} from "./actions";

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
  if (action.type === REGISTER_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      showAlert: true,
      alertType: "success",
      alertText: "User Created! Redirecting...",
    };
  }
  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === LOGIN_USER_BEGIN) {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      token: action.payload.token,
      showAlert: true,
      alertType: "success",
      alertText: "logging in! please wait...",
    };
  }
  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === FETCH_USER_TASKS_BEGIN) {
    return {
      ...state,
      isLoading: true,
    }
  }
  if (action.type === FETCH_USER_TASKS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      userTasks: [...action.payload] 
    }
  }
  if (action.type === FETCH_USER_TASKS_ERROR) {
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg
    }
  }
  if (action.type === CREATE_TASK_BEGIN) {
    return {
      ...state,
      isLoading: true
   }
  }
  if (action.type === CREATE_TASK_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      userTasks: [...state.userTasks, action.payload],
      showAlert: true,
      alertType: 'success',
      alertText: 'task added',
    }
  }
  if (action.type === CREATE_TASK_ERROR) {
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText : action.payload
    }
  }
   
  if (action.type === DELETE_TASK_BEGIN) {
    return {
      ...state,
      isLoading : true
    }
  }
  if (action.type === DELETE_TASK_SUCCESS) {
    return {
      ...state,
      showAlert: true,
      alertType: 'danger', 
      alertText: action.payload.msg,
    }
  }
  if (action.type === DELETE_TASK_ERROR) {
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg
    }
  }
  if (action.type === UPDATE_TASK_BEGIN) {
    return {
      ...state, isLoading : true,
    }
  }
  if (action.type === UPDATE_TASK_SUCCESS) {
    return {
      ...state,
      showAlert: true,
      alertType: 'success',
      alertText: action.payload.msg
    }
  }
  if (action.type === UPDATE_TASK_ERROR) {
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg 
    }
  }
  if (action.type === REMOVE_USER) {
    return {
      ...state, user : null, token: null
    }
  }

  throw new Error(`there is no such action ${action.type}`);
};

export default reducer;
