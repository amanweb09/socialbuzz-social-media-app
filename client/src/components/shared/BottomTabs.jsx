import React from 'react'
import { useNavigate } from 'react-router-dom'

const BottomTabs = () => {

    const navigate = useNavigate()
    return (
        <div
            style={{
                boxShadow: '0px -1px 14px 9px rgba(138, 138, 138, 0.25)',
                borderRadius: '14px 14px 0px 0px',
                height: '12vh'
            }}
            className='mx-auto w-full bg-white sticky bottom-0 left-0 flex items-center justify-evenly'>

            <img
                className='cursor-pointer w-12 mx-6'
                src='/images/home.png' alt='home' />
            <img
                className='cursor-pointer w-12 mx-6'
                src='/images/reels.png' alt='reels' />
            <img
                onClick={() => { navigate('/create-post') }}
                className='cursor-pointer w-20 mx-6'
                src='/images/add.png' alt='add' />
            <img
                className='cursor-pointer w-12 mx-6'
                src='/images/heart.png' alt='notifications' />
            <div className='cursor-pointer w-12 h-12 rounded-full bg-gray-200'></div>

        </div>
    )
}

export default BottomTabs