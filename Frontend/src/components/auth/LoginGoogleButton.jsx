import React from 'react'

import { useNavigate } from 'react-router-dom';



function LoginGoogleButton(props) {
    const navigate = useNavigate();

    const onSuccess = () => {
        navigate('/myProfile');
    }

    const onFailure = () => {
    }

    return <>
</>
}

export default LoginGoogleButton;


