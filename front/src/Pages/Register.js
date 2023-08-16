import { useState,useContext, useEffect, } from "react";
import {FormRow, Alert} from "../components"
import Wrapper from "../assets/wrappers/RegisterWrapper";
import Logo from '../components/Logo'
import { AppContext } from '../contexts/appContext'
import { useNavigate } from 'react-router-dom'


const Register = () => {    
  const navigate = useNavigate()
  const { displayAlert,showAlert, registerUser, loginUser, user } = useContext(AppContext)
  
    const [values, setValues] = useState({ 
        name: '',
        email: '', 
        password: '',
        isMember: ''  
    })
  
    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setValues({...values, [name] : value})
    }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, email, password, isMember } = values;   
    if (!email || !password || (!isMember && !name)) { 
      return displayAlert();
    }
    const currentUser = { name, email, password }
    
    if (isMember) {
     return loginUser(currentUser) 
    } else {
      return registerUser(currentUser) 
    }
  }


  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/home')
      },3000)
    }
  },[user, navigate]) 

    return (
      <Wrapper className="full-page">
        <form className="form" onSubmit={handleSubmit}> 
          <Logo />
          <h3>{values.isMember ? "login" : "register"}</h3>
          {showAlert && <Alert />}
          {/*  name */}
          {!values.isMember && (
            <FormRow
              type="text"
              name="name"
              labelText="Name"
              value={values.name}
              handleChange={handleChange}
            />
          )}
          {/* email  */}
          <FormRow
            type="email"
            name="email"
            labelText="Email"
            value={values.email}
            handleChange={handleChange}
          />

          <FormRow
            type="password"
            name="password"
            labelText="Password"
            value={values.password}
            handleChange={handleChange}
          />
          <button className="btn btn-block" type="submit">
            submit
          </button>
          <p>
            {!values.isMember ? "Already a member ?" : "Not yet a member ?"}
            <button type="button" className="member-btn" onClick={()=>{setValues({...values,isMember:!values.isMember})}}>
              {!values.isMember ? "login" : "register"}
            </button>
          </p>
        </form>
      </Wrapper>
    );
}

export default Register 