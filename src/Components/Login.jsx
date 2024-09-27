import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from "firebase/auth";
import swal from 'sweetalert';
import { TailSpin } from 'react-loader-spinner';
import { usersRef } from '../firebase/firebase';
import { AppState } from '../Components/Layout';
import { query, where, getDocs } from 'firebase/firestore';

function Login() {
    const [loading, setLoading] = useState(false);
    const useAppState = useContext(AppState);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const login = async () => {
        try {
            setLoading(true);
            const auth = getAuth();

            await setPersistence(auth, browserSessionPersistence);

            const userCredential = await signInWithEmailAndPassword(auth, form.email, form.password);
            const user = userCredential.user;

            const userQuery = query(usersRef, where("email", "==", form.email));
            const querySnapshot = await getDocs(userQuery);

            if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => {
                    const userData = doc.data();
                    useAppState.setLogin(true);
                    console.log("LOGIN SETS USERNAME : ", userData.username);

                    useAppState.setUsername(userData.username || "User");
                });
            } else {
                throw new Error("User data not found in Firestore");
            }

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
                navigate('/'); // Navigate to home page after login
            });

        } catch (error) {
            console.error("Login Error: ", error.message);
            swal({
                title: 'Login Failed!',
                text: error.message || "Something went wrong",
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
        <div className="my-16 max-w-screen-md max-sm:max-w-xs mx-auto px-4 py-8 pb-16 sm:px-6 lg:px-8 backdrop-blur-lg bg-white/10 border border-white/10 rounded-xl shadow-lg">
            <div className="mx-auto max-w-lg text-center">
                <h1 className="text-2xl font-bold sm:text-3xl">Log in</h1>
            </div>

            <form className="mx-auto mb-0 mt-8 max-w-md space-y-4">
                {/* Email Input */}
                <div>
                    <label htmlFor="email" className="sr-only">Email</label>
                    <div className="relative">
                        <input
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            type="email"
                            required
                            className="text-black font-bold w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                            placeholder="Enter your Email"
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
                            type={showPassword ? "text" : "password"} // Toggle input type
                            className="w-full text-black font-bold rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                            placeholder="Enter Password"
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-3 text-gray-500 focus:outline-none"
                        >
                            {showPassword ? (
                                <i className="fas fa-eye-slash"></i> // Hide icon
                            ) : (
                                <i className="fas fa-eye"></i> // Show icon
                            )}
                        </button>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex items-center w-full justify-center">
                    <button
                        onSubmit={(e) => {
                            e.preventDefault();
                            login();
                        }}
                        onClick={(e) => {
                            e.preventDefault();
                            login();
                        }}
                        className={`rounded-lg w-full text-center bg-indigo-600 px-5 py-3 text-sm font-medium text-white`}
                    >
                        {loading ? (
                            <span className='w-full flex justify-center'>
                                <TailSpin height={25} strokeWidth={7} color='white' />
                            </span>
                        ) : "Submit"}
                    </button>
                </div>

                {/* Signup Link */}
                <div className='flex justify-center items-center'>
                    <div className='text-black'>Don't have an account?</div>
                    <Link to={'/signup'}>
                        <div className='text-blue-600 cursor-pointer underline ml-2'>Sign up</div>
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Login;
