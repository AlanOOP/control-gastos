import React from 'react'

type ErrorMessageProps = {
    children: React.ReactNode
}

const ErrorMessage = ({ children }: ErrorMessageProps) => {
    return (
        <p className='bg-red-200 p-2 text-red-600 font-bold text-sm text-center border-l-4 border-red-600'>
            {children}
        </p>
    )
}

export default ErrorMessage