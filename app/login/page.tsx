"use client"
import LoginForm from 'app/components/forms/LoginForm'
import React, { useState } from 'react'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const handleLogin = async () => {
        console.log("clicked handlelogin");

        try {
            await fetch("/api/auth/login", {
                method: "GET",
                // method: "POST",
                // body: JSON.stringify({ email, password }),
            })
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-lg">
                <div className='flex justify-between mb-4'>
                    <h3 className=''>Login Form</h3>
                    <h3 className=''>Secure User Authentication</h3>
                </div>
                <LoginForm />
            </div>
        </div>

    )
}

export default Login