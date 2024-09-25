import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { AppState } from '../Components/Layout';


function Header() {

    const navigate = useNavigate();
    const useAppState = useContext(AppState);

    return (
        <div className="sticky top-0 z-40 flex border-b-2 text-3xl text-indigo-500 font-bold justify-between p-3 backdrop-blur-lg bg-white/50 border border-white/10  shadow-xl ">
            <div className='hover:scale-105 transition-all duration-200'>
                <span className=' transition-all duration-300 cursor-pointer ' onClick={() => navigate('/')}>Movie
                    <span className='transition-all duration-300 text-black  cursor-pointer' onClick={() => navigate('/')}>Verse</span>
                </span>
            </div>

            {useAppState.login ? <Link to={"/add-movie"}
                className="transition-all duration-300 inline-flex  items-center gap-2 rounded border border-indigo-400 bg-indigo-500 px-8 max-sm:px-2 py-2 text-white hover:bg-transparent hover:text-indigo-500 ">
                <span className="text-base max-sm:hidden  font-medium bg-transparent">  Add new
                </span>
                <AddIcon className='bg-transparent' />
            </Link> :
                <div className='mr-3'>
                    <Link to={"/login"}
                        className="transition-all duration-300 inline-flex  items-center gap-2 rounded border border-indigo-400 bg-indigo-500 px-8 max-sm:px-2 py-2 text-white hover:bg-transparent hover:text-indigo-500 ">
                        <span className="text-base font-medium bg-transparent">  Login
                        </span>
                    </Link>
                </div>

            }

        </div >
    )
}

export default Header