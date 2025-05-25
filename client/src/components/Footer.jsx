import React from 'react'

const Footer = () => {
    return (
        <div className='text-sm text-center bg-gray-50 py-4'>
            Mern Blog &copy; {new Date().getFullYear()} | All rights reserved
        </div>
    )
}

export default Footer