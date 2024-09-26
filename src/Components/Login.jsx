import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, setPersistence, browserSessionPersistence, signInWithEmailAndPassword } from "firebase/auth";
import swal from 'sweetalert'
import brcypt from 'bcryptjs';
import { TailSpin } from 'react-loader-spinner';
import { usersRef } from '../firebase/firebase';
import { AppState } from '../Components/Layout';
import { query, where, getDocs } from 'firebase/firestore';

function Login() {

    const [loading, setLoading] = useState(false);
    const useAppState = useContext(AppState);
    const [form, setForm] = useState({
        password: "",
        mobile: '',
    });
    const navigate = useNavigate();

    // const login = async () => {
    //     try {
    //         setLoading(true)
    //         let quer = query(usersRef, where("mobile", '==', form.mobile))
    //         const querySnapShot = await getDocs(quer);
    //         querySnapShot.forEach((doc) => {
    //             const _data = doc.data();

    //             const isUser = brcypt.compareSync(form.password, _data.password)
    //             if (isUser) {
    //                 useAppState.setLogin(true);
    //                 // console.log(_data.username);
    //                 useAppState.setUsername(_data.username);
    //                 swal({
    //                     title: "Loged in Successfully",
    //                     icon: 'success',
    //                     buttons: {
    //                         confirm: {
    //                             text: 'Okay',
    //                             className: 'bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded',
    //                         }
    //                     },
    //                 }).then(
    //                     navigate('/')
    //                 )
    //             } else {
    //                 swal({
    //                     title: 'Login Failed!',
    //                     text: "Invalid mobile or password",
    //                     icon: 'error',
    //                     buttons: {
    //                         confirm: {
    //                             text: 'Try Again',
    //                             className: 'bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded',
    //                         }
    //                     }
    //                 });
    //             }
    //         });

    //     } catch (error) {
    //         console.log("ERROR IN LOGIN : ", error);
    //         swal({
    //             title: 'Login Failed!',
    //             text: error.message || "Enter Correct OTP",
    //             icon: 'error',
    //             buttons: {
    //                 confirm: {
    //                     text: 'Try Again',
    //                     className: 'bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded',
    //                 }
    //             }
    //         });
    //     }
    //     setLoading(false)
    // }

    const login = async () => {
        try {
            setLoading(true);

            // Query Firestore to find the user by mobile number
            const quer = query(usersRef, where("mobile", '==', form.mobile));
            const querySnapShot = await getDocs(quer);

            // Check if user exists
            if (querySnapShot.empty) {
                throw new Error("User not found");
            }

            // Iterate through the snapshot to find the user
            querySnapShot.forEach((doc) => {
                const _data = doc.data();
                // Compare entered password with stored hashed password
                const isUser = brcypt.compareSync(form.password, _data.password);

                if (isUser) {
                    // Update application state
                    useAppState.setLogin(true);
                    useAppState.setUsername(_data.username);

                    // Show success alert
                    swal({
                        title: "Logged in Successfully",
                        icon: 'success',
                        buttons: {
                            confirm: {
                                text: 'Okay',
                                className: 'bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded',
                            }
                        },
                    }).then(() => {
                        navigate('/'); // Navigate after alert
                    });
                } else {
                    // Handle login failure
                    swal({
                        title: 'Login Failed!',
                        text: "Invalid mobile or password",
                        icon: 'error',
                        buttons: {
                            confirm: {
                                text: 'Try Again',
                                className: 'bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded',
                            }
                        }
                    });
                }
            });

        } catch (error) {
            console.log("ERROR IN LOGIN: ", error);
            swal({
                title: 'Login Failed!',
                text: error.message || "Enter Correct OTP",
                icon: 'error',
                buttons: {
                    confirm: {
                        text: 'Try Again',
                        className: 'bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded',
                    }
                }
            });
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="my-16 max-w-screen-md max-sm:max-w-xs border-red-400 mx-auto max-sm:pb-8 px-4 py-8 pb-16 sm:px-6 lg:px-8 backdrop-blur-lg bg-white/10 border border-white/10 rounded-xl shadow-lg">
            <div className="mx-auto max-w-lg text-center">
                <h1 className="text-2xl font-bold sm:text-3xl">Log in</h1>
            </div>

            <form className="mx-auto mb-0 mt-8 max-w-md max-sm:max-w-80 space-y-4">

                <div>
                    <label htmlFor="mobile" className="sr-only">mobile</label>
                    <div className="relative">
                        <input
                            value={form.mobile}
                            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                            type="number"
                            required
                            className="text-black font-bold w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                            placeholder="Enter your Mobile"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="sr-only">Password</label>
                    <div className="relative">
                        <input
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            required
                            type="password"
                            className="w-full text-black font-bold rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                            placeholder="Enter Password"
                        />
                    </div>
                </div>


                <div className="flex items-center w-full justify-center">
                    <button
                        onSubmit={(e) => {
                            e.preventDefault();
                            login()
                        }}
                        onClick={(e) => {
                            e.preventDefault();
                            login()
                        }}
                        className={`rounded-lg w-full text-center bg-indigo-600 px-5 py-3 text-sm font-medium text-white`}
                    >
                        {loading ? <span className='w-full flex justify-center'><TailSpin height={25} strokeWidth={7} color='white' /></span> : "Submit"}
                    </button>
                </div>
                <div className='flex justify-center items-center'>
                    <div className='text-black'>Do not have any account ?
                    </div>
                    <Link to={'/signup'}>
                        <div className='text-blue-600 cursor-pointer underline ml-2'>Sign up</div>
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Login