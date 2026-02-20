
import RegisterForm from 'app/components/forms/RegisterForm'
import React from 'react'

const Register = () => {
  return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-lg">
                <div className='flex justify-between mb-4'>
                    <h3 className=''>Register Form</h3>
                    <h3 className=''>Secure User Authentication</h3>
                </div>
                <RegisterForm />
            </div>
        </div>
  )
}

export default Register