"use client"
import LoginForm from 'app/components/forms/LoginForm'
import { Suspense } from 'react'

export const dynamic = "force-dynamic";

const Login = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-lg">
                <div className='flex justify-between mb-4'>
                    <h3 className=''>Login Form</h3>
                    <h3 className=''>Secure User Authentication</h3>
                </div>
                <LoginForm />
            </div>
        </div>
        </Suspense>
    )
}

export default Login