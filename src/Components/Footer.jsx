import React from 'react'

function Footer() {
    return (
        <footer className="backdrop-blur-lg mt-9 border-t-2 shadow-lg w-full">
            <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="flex justify-center font-bold sm:justify-start">
                        <span className='text-2xl text-indigo-600'>Movie
                            <span className='text-black text-2xl'>Verse</span>
                        </span>
                    </div>

                    <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
                        Copyright &copy; 2024 | Mitesh-Kumavat.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer