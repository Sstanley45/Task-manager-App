import React from 'react'
import noTaskImg from '../assets/images/noTaskImg.svg' 

const NoTask = () => {
    return (
      <>
        <div className="form">
          <h3 style={{textAlign : 'center'}}>Nothing To Do!</h3>
          <div className="noTask-img-div">
            <img src={noTaskImg} alt="" className="noTask-img" />
          </div>
        </div>
      </>
    );
}

export default NoTask;