"use client";

import {signIn} from 'next-auth/react';
import { useEffect } from 'react';

const Login = () => {

    useEffect(() => {
        signIn();
    }, [])

    return (
        <div></div>
    )
}

export default Login;