"use client"
import LoginForm from 'app/components/forms/LoginForm'
import React, { useState } from 'react'

const Login = () => {
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