import { useEffect } from "react";
import React  from "react";


import LoginGoogleButton from "../components/auth/LoginGoogleButton";
import LogoutGoogleButton from "../components/auth/LogoutGoogleButton";
import { gapi } from "gapi-script"

// styling
import {
    MDBContainer,
    MDBInput,
    MDBCheckbox,
    MDBBtn
}
    from 'mdb-react-ui-kit';


const clientId = "676561310102-n0re7t10lpgc4ngd74t7umi9i6l2kujk.apps.googleusercontent.com"



function LoginPage() {

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: { clientId },
                scope: "",

            })

            gapi.load('client:auth2', start)
        }
    }, [])


    return <>
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

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
                    <LoginGoogleButton clientId={clientId} />
                </MDBBtn>
            </div>

        </MDBContainer>

    </>
}

export default LoginPage;
