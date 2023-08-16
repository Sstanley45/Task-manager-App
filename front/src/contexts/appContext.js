import React from "react";
import { useReducer } from "react";
import { createContext } from "react";
import reducer from "./reducer";
import axios from "axios";



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

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");

export const AppContext = createContext();

export const initialState = {
  showAlert: false,
  alertType: "",
  alertText: "",
  isLoading: false,
  user: user ? JSON.parse(user) : null,
  token: token,
  userTasks: [],
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const displayAlert = () => {
    dispatch({ type: SHOW_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const addToLocalStorage = ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const removeFromLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const registerUser = async (currentUser) => { 
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const response = await axios.post("/api/v1/auth/register", currentUser);
      const { user, token } = response.data;
      dispatch({ type: REGISTER_USER_SUCCESS, payload: { user, token } });
      addToLocalStorage({ user, token });
    } catch (error) {
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const response = await axios.post("/api/v1/auth/login", currentUser);
      const { token, user } = response.data;
      dispatch({ type: LOGIN_USER_SUCCESS, payload: { user, token } });
      addToLocalStorage({ user, token });
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const authFetch = axios.create({
    baseURL: "/api/v1",
  });

  axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`
  authFetch.interceptors.request.use(
     (config) => {
      authFetch.defaults.headers.common['Authorization'] = `Bearer ${state.token}`
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log('interceptor error on response',error);
      if (error.response.status === 401) {
        console.log("AUTH ERROR");
        removeFromLocalStorage() 
      }
      return Promise.reject(error);
    }
  );

  const fetchTasks = async () => {
    dispatch({ type: FETCH_USER_TASKS_BEGIN });
    try {
      const response = await authFetch.get("/tasks");
      const data = response.data;
      dispatch({ type: FETCH_USER_TASKS_SUCCESS, payload: data.tasks });
    } catch (error) {
      console.log(error);
      dispatch({
        type: FETCH_USER_TASKS_ERROR, 
        payload: { msg: error.response.data.msg },
      });
      console.log(error);
    }
  };

  const createTask = async (currentTask) => { 
    dispatch({ type: CREATE_TASK_BEGIN });
    try {
      const response = await authFetch.post("/tasks", { name: currentTask });
      const data = await response.data; 
      const {name} = data.task
      dispatch({ type: CREATE_TASK_SUCCESS, payload: name });
    } catch (error) {
      console.log('error when creating task',error.response);
      dispatch({type: CREATE_TASK_ERROR, payload:error.response.data.msg})
    }
    clearAlert() 
  }
   
  const deleteTask = async (id) => { 
    dispatch({ type: DELETE_TASK_BEGIN })
    try {
      const response = await authFetch.delete(`/tasks/${id}`)
      const data = response.data 
      dispatch({type:DELETE_TASK_SUCCESS, payload : data})
    } catch (error) {
      console.log('error when deleting a task', error);
      dispatch({type:DELETE_TASK_ERROR}) 
    }
    clearAlert()
  }

  const updateTask = async (id, editedTask) => {
    dispatch({ type: UPDATE_TASK_BEGIN })
    try {
      const response = await authFetch.patch(`/tasks/${id}`, {name : editedTask})
      const data = response.data 
      dispatch({type: UPDATE_TASK_SUCCESS, payload: data}) 
    } catch (error) {
      console.log('error when updating the task', error);
      dispatch({type: UPDATE_TASK_ERROR, payload: error.response.data})
    }
    clearAlert()
  }

  const logout = () => {
    dispatch({type: REMOVE_USER})
    removeFromLocalStorage()
  }



  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        clearAlert,
        registerUser,
        loginUser,
        fetchTasks,
        createTask,
        deleteTask,
        updateTask,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
