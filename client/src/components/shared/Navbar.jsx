import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
    
    return (
        <div className='w-full h-20 flex-center relative bg-white'>
            <div 
            onClick={() => {navigate('/')}}
            className='flex-center cursor-pointer'>
                <img
                    src="/images/logo.png"
                    alt="logo" />
                <h2
                    className="font-bold text-xl">
                    SOCIAL
                    <span style={{ color: "#3b5589" }}>BUZZ</span>
                </h2>
            </div>

            <img
                style={{ top: '50%', right: '2rem', transform: 'translateY(-50%)' }}
                className='absolute w-10 cursor-pointer'
                src="/images/dm.png"
                alt="dm" />
        </div>
    )
}

export default Navbar