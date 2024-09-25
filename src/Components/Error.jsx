import React from 'react'
import { useNavigate } from 'react-router-dom'

function Error() {
    const navigate = useNavigate();
    return (
        <div className='flex justify-center items-center flex-col max-w-full max-h-screen'>
            <div className='text-black text-center text-5xl mt-72 mb-3'>
                404
            </div>
            <div className='p-4 pt-0 text-center text-3xl  text-black mb-9'>
                Page Not Found
            </div>
            <button onClick={() => navigate('/')} className='transition-all duration-200 border text-black hover:text-white hover:border-white text-xl border-black px-8 py-3 rounded-lg' >Go to Home Page</button>
        </div>
    )
}

export default Error