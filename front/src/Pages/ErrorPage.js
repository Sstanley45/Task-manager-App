import React from 'react'
import Wrapper from '../assets/wrappers/ErrorWrapper'
import notfound from '../assets/images/notfound.svg'
import {Link} from 'react-router-dom'

const ErrorPage = () => {
    return (
        <Wrapper className='full-page'>
            <div>
                <img src={notfound} alt="notfound" />
                <h3>Oops!... Not Found</h3>
                <p>We cant't seem to find the page you are looking for..</p>
                <Link to='/'>Back Home</Link>
            </div>

      </Wrapper>
  )
}

export default ErrorPage