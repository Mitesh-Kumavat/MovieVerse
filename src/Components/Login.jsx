import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function Login() {

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        password: "",
        mobile: '',
    });

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
                        type="submit"
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