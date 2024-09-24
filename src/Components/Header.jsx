import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Link, useNavigate } from 'react-router-dom'

function Header() {

    const navigate = useNavigate();

    return (
        <div className={` sticky top-0 z-40 flex border-b-2 text-3xl text-indigo-500 font-bold justify-between p-3 backdrop-blur-lg bg-white/60 border border-white/10  shadow-lg `}>
            <span className='cursor-pointer' onClick={() => navigate('/')}>Movie
                <span className='text-black cursor-pointer' onClick={() => navigate('/')}>Verse</span>
            </span>

            <Link to={"/add-movie"}
                className=" inline-flex  items-center gap-2 rounded border border-indigo-400 bg-indigo-500 px-8 max-sm:px-2 py-2 text-white hover:bg-transparent hover:text-indigo-500 focus:outline-none focus:ring active:text-indigo-500"
            >
                <span className="text-base max-sm:hidden  font-medium bg-transparent"> Add new </span>
                <AddIcon className='bg-transparent' />
            </Link>

        </div >
    )
}

export default Header