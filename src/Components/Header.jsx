import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { AppState } from '../Components/Layout';
import { getAuth, signOut } from 'firebase/auth';

function Header() {

    const navigate = useNavigate();
    const useAppState = useContext(AppState);


    const handleLogout = async () => {
        try {
            const auth = getAuth();
            await signOut(auth); // Sign out from Firebase
            useAppState.setLogin(false); // Update context state
            useAppState.setUsername(""); // Clear username state
            console.log("User has logged out.");

            swal({
                title: "Logged out Successfully",
                icon: 'success',
                buttons: {
                    confirm: {
                        text: 'Okay',
                        className: 'bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded',
                    }
                }
            });
        } catch (error) {
            console.error("Logout Error: ", error);
            swal({
                title: 'Logout Failed!',
                text: error.message || "An error occurred while logging out.",
                icon: 'error',
                buttons: {
                    confirm: {
                        text: 'Try Again',
                        className: 'bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded',
                    }
                }
            });
        }
    };


    return (
        <div className="sticky top-0 z-40 flex border-b-2 text-3xl text-indigo-500 font-bold justify-between p-3 backdrop-blur-lg bg-white/50 border border-white/10  shadow-xl ">
            <div className='hover:scale-105 transition-all duration-200'>
                <span className=' transition-all duration-300 cursor-pointer ' onClick={() => navigate('/')}>Movie
                    <span className='transition-all duration-300 text-black  cursor-pointer' onClick={() => navigate('/')}>Verse</span>
                </span>
            </div>

            {useAppState.login ?
                <div className='flex '>
                    <Link to={"/add-movie"}
                        className="transition-all duration-300 inline-flex  items-center gap-2 rounded border border-indigo-400 bg-indigo-500 px-8 max-sm:px-2 py-2 text-white hover:bg-transparent hover:text-indigo-500 ">
                        <span className="text-base max-sm:hidden  font-medium bg-transparent">  Add new
                        </span>
                        <AddIcon className='bg-transparent' />
                    </Link>
                    <div
                        onClick={handleLogout}
                        className="ml-2 transition-all duration-300 inline-flex  items-center gap-2 rounded border border-indigo-400 bg-indigo-500 px-8 max-sm:px-2 py-2 text-white hover:bg-transparent hover:text-indigo-500 ">
                        <span className="text-base max-sm:text-xs py-1 mt-0 font-medium bg-transparent">  Log Out
                        </span>
                    </div>
                </div>

                :
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

export default Header;
