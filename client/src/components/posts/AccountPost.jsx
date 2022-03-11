import React from 'react'

const AccountPost = ({ picture }) => {
    return (
        <div className='w-64 h-64 bg-gray-200 mb-6'>
            <img
                className='w-full h-full'
                src={picture}
                alt="post" />
        </div>
    )
}

export default AccountPost