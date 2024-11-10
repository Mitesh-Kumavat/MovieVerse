import React from 'react'
import { useNavigate } from 'react-router-dom'

function Error() {
    const navigate = useNavigate();
    return (
        <div className="flex justify-center items-center flex-col max-w-full max-h-screen bg-[#121212]">
            <div className="text-[#EAEAEA] text-center text-5xl mt-72 mb-3">
                404
            </div>
            <div className="p-4 pt-0 text-center text-3xl text-[#EAEAEA] mb-9">
                Page Not Found
            </div>
            <button
                onClick={() => navigate('/')}
                className="transition-all duration-200 border text-[#EAEAEA] hover:text-[#BB86FC] hover:border-[#BB86FC] text-xl border-[#333333] px-8 py-3 rounded-lg"
            >
                Go to Home Page
            </button>
        </div>
    );

}

export default Error