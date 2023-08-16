import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../contexts/appContext'

const Alert = () => {
    const {alertText,alertType,} = useContext(AppContext)
  return (
      <div className={`alert alert-${alertType}`}> {alertText }</div>  
  )
}

export default Alert;