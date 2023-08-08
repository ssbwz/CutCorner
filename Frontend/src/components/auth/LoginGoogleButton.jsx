import React from 'react'

import { useNavigate } from 'react-router-dom';
import { useGoogleLogin, useGoogleOneTapLogin  } from '@react-oauth/google';

import {
    MDBIcon,
    MDBBtn
}
    from 'mdb-react-ui-kit';
import authorization from '../../services/authorization';
import axios from 'axios';

function LoginGoogleButton(props) {
    const navigate = useNavigate();

    const onSuccess = () => {
        navigate('/myProfile');
    }


    const login = useGoogleLogin({
        onSuccess: async response => {
            try{
                const data = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo',{
                    headers: {
                        'Authorization': `Bearer ${response.access_token}`
                    }
                })
                const googleLoginRequest = {
                    first_name: data.data.given_name,
                    last_name: data.data.family_name,
                    email: data.data.email,
                    accountPhotoUrl: data.data.picture
                }
                authorization.loginWithGoogle(googleLoginRequest)
            }catch(err){
                console.log(err)
            }
        },
    });

    return <>
        <button className="ripple ripple-surface btn btn-primary btn-lg mb-2 w-100" style={{ backgroundColor: '#dd4b39' }} onClick={() => login()}> <MDBIcon fab icon="google" className="mx-2" />
            Sign in with google</button>
    </>
}

export default LoginGoogleButton;


