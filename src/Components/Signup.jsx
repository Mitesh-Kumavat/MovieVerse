import brcypt from 'bcryptjs'
import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import app from '../firebase/firebase';
import swal from 'sweetalert';
import { usersRef } from '../firebase/firebase';
import { addDoc } from 'firebase/firestore';
// import { firebase } from 'firebase/app';
// import 'firebase/auth';

function Signup() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    password: "",
    username: "",
    mobile: '',
  });
  const [otpSent, setOtpSent] = useState(false);
  const [OTP, setOTP] = useState("");
  const auth = getAuth(app);
  const navigate = useNavigate();
  const captchaRef = useRef(null);
  const [verification, setVerification] = useState();

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      'size': 'invisible',
    });
    window.recaptchaVerifier.render();
  };


  const verifyOTP = () => {
    setLoading(true);
    window.confirmationResult.confirm(OTP).then((res) => {
      uploadData();
      swal({
        title: "Registered Successfully",
        icon: 'success',
        buttons: {
          confirm: {
            text: 'Okay',
            className: 'bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded',
          }
        },
      }).then(
        navigate('/login')
      )
    }).catch((error) => {
      console.error('Error in verifying OTP:', error);
      swal({
        title: 'Wrong OTP!',
        text: error.message || "Enter Correct OTP",
        icon: 'error',
        buttons: {
          confirm: {
            text: 'Try Again',
            className: 'bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded',
          }
        }
      });
    }).finally(() => {
      setLoading(false);
      setOTP("")
    });
  };

  const uploadData = async () => {
    try {
      var salt = brcypt.genSaltSync(10);
      var hash = brcypt.hashSync(form.password, salt);
      await addDoc(usersRef, {
        username: form.username,
        password: hash,
        mobile: form.mobile,
      });
      console.log("Uploading Data");
    } catch (e) {
      console.log("ERROR IN UPLOAD DATA : ", e);
    }
  };

  const reqOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    generateRecaptcha();
    const appVerifier = window.recaptchaVerifier;

    await signInWithPhoneNumber(auth, `+91${form.mobile}`, appVerifier)
      .then(confirmationResult => {
        window.confirmationResult = confirmationResult;
        console.log(confirmationResult);
        setVerification(confirmationResult.verificationId);
        console.log("OTP sent successfully.");
        swal({
          title: `OTP Sent to ${form.mobile}`,
          text: 'Check your OTP on your Phone Number!',
          icon: 'success',
          buttons: {
            confirm: {
              text: 'Okay',
              className: 'bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded',
            }
          },
        });
        setOtpSent(true);
      })
      .catch((error) => {
        console.error("Error Code:", error.code);
        console.error("Error in sending OTP:", error.message);
        swal({
          title: 'OTP Not sent!',
          text: error.message || "Error Sending OTP",
          icon: 'error',
          buttons: {
            confirm: {
              text: 'Try Again',
              className: 'bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded',
            }
          }
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };


  return (
    otpSent ? (
      <div className="my-16 max-w-screen-md max-sm:max-w-xs border-red-400 mx-auto max-sm:pb-8 px-4 py-8 pb-16 sm:px-6 lg:px-8 backdrop-blur-lg bg-white/10 border border-white/10 rounded-xl shadow-lg">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Enter OTP</h1>
        </div>
        <form className="mx-auto mb-0 mt-8 max-w-md max-sm:max-w-80 space-y-4">
          <div>
            <label htmlFor="OTP" className="sr-only">OTP</label>
            <div className="relative">
              <input
                value={OTP}
                onChange={(e) => setOTP(e.target.value)}
                required
                className="text-black font-bold w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter your OTP"
              />
            </div>
          </div>
          <div className="flex items-center w-full justify-center">
            <button
              onClick={(e) => {
                e.preventDefault();
                verifyOTP();
              }}
              type="submit"
              className={`rounded-lg w-full text-center bg-indigo-600 px-5 py-3 text-sm font-medium text-white`}
            >
              {loading ? <span className='w-full flex justify-center'><TailSpin height={25} strokeWidth={7} color='white' /></span> : "Submit OTP"}
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
    ) : (
      <div className="my-16 max-w-screen-md max-sm:max-w-xs border-red-400 mx-auto max-sm:pb-8 px-4 py-8 pb-16 sm:px-6 lg:px-8 backdrop-blur-lg bg-white/10 border border-white/10 rounded-xl shadow-lg">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Sign up</h1>
        </div>
        <form className="mx-auto mb-0 mt-8 max-w-md max-sm:max-w-80 space-y-4">
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
            <label htmlFor="mobile" className="sr-only">Mobile</label>
            <div className="relative">
              <input
                value={form.mobile}
                onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                type="number" // Change type to number to avoid spinners
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
              onClick={reqOTP}
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
        <div id="recaptcha-container" ref={captchaRef}></div>
      </div>
    )
  );
}

export default Signup;
