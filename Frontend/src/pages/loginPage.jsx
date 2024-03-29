import React from "react";


import LoginGoogleButton from "../components/auth/LoginGoogleButton";

// styling
import {
    MDBContainer,
    MDBInput,
    MDBCheckbox,
    MDBBtn
}
    from 'mdb-react-ui-kit';


function LoginPage() {

    return <>
        <MDBContainer style={{height: '83vh'}}  className="p-3 my-5 d-flex flex-column w-50">

            <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' />
            <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' />

            <div className="d-flex justify-content-between mx-3 mb-4">
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                <a href="!#">Forgot password?</a>
            </div>

            <MDBBtn className="mb-4">Sign in</MDBBtn>

            <div className="text-center">
                <p>Not a member? <a href="#!">Register</a></p>
                <p>or sign up with:</p>
                <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>

                </MDBBtn>
                <LoginGoogleButton />
            </div>

        </MDBContainer>

    </>
}

export default LoginPage;
