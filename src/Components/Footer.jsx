import React from 'react';
import { FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';

function Footer() {
    return (
        <footer className=" bg-white/50 border border-white/10 mt-9 border-t-2 shadow-lg w-full">
            <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex justify-center font-bold sm:justify-start">
                        <span className='text-2xl text-indigo-600'>Movie
                            <span className='text-black text-2xl'>Verse</span>
                        </span>
                    </div>

                    <div className="mt-4 flex max-sm:flex-col items-center justify-center sm:justify-end space-x-4 lg:mt-0">
                        <p className="text-center text-sm text-black sm:text-right lg:mr-4">
                            Copyright &copy; 2024 | Mitesh Kumavat
                        </p>
                        <div className="flex space-x-4 max-sm:mt-6 max-sm:mb-0 max-sm:pb-0">
                            <a
                                href="https://www.instagram.com/mitesh_777?igsh=MXB5bGdsam1zaTh1dg=="
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-black hover:text-white transition-colors duration-300"
                            >
                                <FaInstagram size={24} />
                            </a>
                            <a
                                href="https://github.com/Mitesh-Kumavat"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-black hover:text-white transition-colors duration-300"
                            >
                                <FaGithub size={24} />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/mitesh-kumavat-48ba51287?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-black hover:text-white transition-colors duration-300"
                            >
                                <FaLinkedin size={24} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
