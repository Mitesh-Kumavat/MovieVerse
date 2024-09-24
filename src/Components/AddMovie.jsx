import React, { useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { addDoc } from 'firebase/firestore';
import { moviesRef } from '../firebase/firebase.js';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom'

function AddMovie() {

    const navigate = useNavigate();
    const [form, setForm] = useState({
        description: "",
        img: "",
        name: "",
        year: "",
    });
    const [loading, setLoading] = useState(false);

    async function addNewMovie(event) {
        event.preventDefault(); // Prevent the default form submission behavior
        console.log('add movie called');
        setLoading(true);
        try {
            const res = await addDoc(moviesRef, {
                description: form.description,
                img: form.img,
                name: form.name,
                year: form.year
            });
            console.log(res);
            // Reset form fields
            setForm({
                description: "",
                img: "",
                name: "",
                year: "",
            });

            // Customize SweetAlert with Tailwind CSS
            swal({
                title: `${form.name} Movie Added`,
                text: 'Your movie has been successfully added!',
                icon: 'success',
                buttons: {
                    confirm: {
                        text: 'Okay',
                        value: true,
                        visible: true,
                        className: 'bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded',
                        closeModal: true,
                    }
                },
            }).then((value) => {
                if (value) {
                    navigate('/'); // Redirect to homepage after clicking "Okay"
                }
            });
        } catch (error) {
            console.log(error);
            swal({
                title: 'Error!',
                text: error.message || "Error adding movie",
                icon: 'error',
                buttons: {
                    confirm: {
                        text: 'Try Again',
                        value: true,
                        visible: true,
                        className: 'bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded',
                        closeModal: true,
                    }
                },
                content: {
                    element: "div",
                    attributes: {
                        className: "bg-red-100 border border-red-300 rounded-lg p-4" // Tailwind classes for the error alert content
                    }
                },
            });
        }
        setLoading(false);
    }

    return (
        <div className="my-16 max-w-screen-md max-sm:max-w-xs border-red-400 mx-auto max-sm:pb-8 px-4 py-8 pb-16 sm:px-6 lg:px-8 backdrop-blur-lg bg-white/10 border border-white/10 rounded-xl shadow-lg">
            <div className="mx-auto max-w-lg text-center">
                <h1 className="text-2xl font-bold sm:text-3xl">Add New Movie</h1>
            </div>

            <form onSubmit={addNewMovie} className="mx-auto mb-0 mt-8 max-w-md max-sm:max-w-80 space-y-4">
                <div>
                    <label htmlFor="name" className="sr-only">Title</label>
                    <div className="relative">
                        <input
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            type="text"
                            required
                            className="text-black font-bold w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                            placeholder="Enter Movie title"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="img" className="sr-only">Image</label>
                    <div className="relative">
                        <input
                            value={form.img}
                            onChange={(e) => setForm({ ...form, img: e.target.value })}
                            required
                            type="text"
                            className="w-full text-black font-bold rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                            placeholder="Enter Poster link"
                        />
                    </div>
                </div>

                <div className='mr-4 w-full'>
                    <label htmlFor="year" className="sr-only">Year</label>
                    <div className="relative">
                        <input
                            value={form.year}
                            onChange={(e) => setForm({ ...form, year: e.target.value })}
                            required
                            type="number"
                            className="w-full text-black font-bold rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                            placeholder="Enter Release Year"
                        />
                    </div>
                </div>

                <div className='w-full'>
                    <label htmlFor="description" className="sr-only">Description</label>
                    <div className="relative">
                        <input
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            type="text"
                            className="w-full text-black font-bold rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                            placeholder="Description"
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
            </form>
        </div>
    );
}

export default AddMovie;
