import bcrypt from 'bcryptjs';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import app from '../firebase/firebase';
import swal from 'sweetalert';
import { usersRef } from '../firebase/firebase';
import { addDoc } from 'firebase/firestore';
import { AppState } from './Layout';


function Signup() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    password: "",
    username: "",
    email: "",
  });
  const useAppState = useContext(AppState);

  const auth = getAuth(app);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { email, password, username } = form;

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: username });

      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(password, salt);

      await addDoc(usersRef, {
        username,
        password: hash,
        email,
      });


      useAppState.setUsername(username || "Anoynomus");
      useAppState.setLogin(true);

      swal({
        title: "Registered and Logged in Successfully",
        icon: 'success',
        buttons: {
          confirm: {
            text: 'Okay',
            className: 'bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded',
          }
        },
      }).then(() => {
        navigate('/');
      });

    } catch (error) {
      console.error('Error in registration:', error);
      swal({
        title: 'Registration Failed!',
        text: error.message || "Please try again.",
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
        <h1 className="text-2xl font-bold sm:text-3xl">Sign up</h1>
      </div>
      <form className="mx-auto mb-0 mt-8 max-w-md max-sm:max-w-80 space-y-4" onSubmit={handleSignup}>
        <div>
          <label htmlFor="username" className="sr-only">Username</label>
          <div className="relative">
            <input
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
              className="text-black font-bold w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Enter your username"
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="sr-only">Email</label>
          <div className="relative">
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              type="email"
              className="text-black font-bold w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Enter your email"
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
              className="absolute right-3 top-3 text-gray-500 focus:outline-none transition-transform duration-300 ease-in-out"
            >
              {showPassword ? (
                <i className="fas fa-eye-slash transition-opacity duration-300 ease-in-out"></i> // Hide icon
              ) : (
                <i className="fas fa-eye transition-opacity duration-300 ease-in-out"></i> // Show icon
              )}
            </button>
          </div>
        </div>
        <div className="flex items-center w-full justify-center">
          <button
            type="submit"
            className={`rounded-lg w-full text-center bg-indigo-600 px-5 py-3 text-sm font-medium text-white`}
          >
            {loading ? <span className='w-full flex justify-center'><TailSpin height={25} strokeWidth={7} color='white' /></span> : "Sign up"}
          </button>
        </div>
        <div className='flex items-center justify-center'>
          <div className='text-black'>Already have an account?</div>
          <Link to={'/login'}>
            <div className='text-blue-600 cursor-pointer underline ml-2'>Log in</div>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
