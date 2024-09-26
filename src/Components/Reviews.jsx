import React, { useContext, useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { reviewsRef, db, moviesRef } from '../firebase/firebase';
import swal from 'sweetalert';
import { addDoc, doc, updateDoc, query, where, getDocs } from 'firebase/firestore';
import { TailSpin } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { AppState } from './Layout';

function Reviews({ className, id, prevRating, userRated }) {
    const useAppState = useContext(AppState);

    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(false);
    const [reviewsloading, setReviewsLoading] = useState(false);
    const [thought, setThought] = useState("");
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        setData([])
        const getData = async () => {
            setReviewsLoading(true)
            let quer = query(reviewsRef, where("movieid", '==', id));
            const querySnapshot = await getDocs(quer);
            // console.log(querySnapshot);
            querySnapshot.forEach((doc) => {
                setData((prev) => [...prev, doc.data()])
            })
            // console.log("DATA OF REVIEWS", data);
            setReviewsLoading(false)
        }
        getData();
    }, [])

    const sendReview = async () => {
        setLoading(true);

        try {
            const numericRating = Number(rating) || 0;
            const numericPrevRating = Number(prevRating);
            const numericUserRated = Number(userRated);

            console.log({
                movieid: id,
                name: useAppState.username,
                rating: numericRating,
                thought: thought,
                timestamp: new Date().getTime(),
            });

            await addDoc(reviewsRef, {
                movieid: id,
                name: useAppState.username || 'Anonymous',
                rating: isNaN(numericRating) ? 0 : numericRating,
                thought: thought || 'Nice',
                timestamp: new Date().getTime(),
            });

            const _doc = doc(db, "movies", id);
            await updateDoc(_doc, {
                rating: (numericPrevRating + numericRating) || 0,
                rated: (numericUserRated + 1) || 1
            });

            swal({
                title: `Review Added`,
                text: `Thanks for adding your valuable review!`,
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
                    // navigate('/'); // Redirect to homepage after clicking "Okay"
                }
            });
            setThought('');
            setRating(0);
        } catch (error) {
            swal({
                title: 'Error!',
                text: error.message || "Error reviewing movie",
                icon: 'error',
                buttons: {
                    confirm: {
                        text: 'Try Again Later',
                        value: true,
                        visible: true,
                        className: 'bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded',
                        closeModal: true,
                    }
                }
            });
        }
        setLoading(false)
    }


    return (
        <>
            <div className={`flex flex-col mt-9 w-full border-t-2 border-gray-500  ${className}`}>

                <ReactStars
                    size={35}
                    edit={true}
                    half={true}
                    value={rating}
                    onChange={(rate) => setRating(rate)}
                    className='mt-4'
                />

                <div className='flex max-sm:flex-col w-full max-lg:justify-between mt-2'>

                    <input type="text" value={thought} onChange={(e) => setThought(e.target.value)} className='max-sm:w-full w-96 rounded-lg h-10 outline-none backdrop-blur-xl bg-white/50 border shadow-lg px-3 text-black border-white/10  ' placeholder='Enter Your Review' />


                    {useAppState.login ? <button
                        onClick={sendReview}
                        disabled={!thought || rating === 0}
                        className={`bg-indigo-600 px-2 text-center py-2 max-sm:mt-6 lg:ml-8 rounded-lg w-60 max-sm:w-full ${!thought || rating === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? (
                            <span className='flex justify-center items-center'>
                                <TailSpin height={20} color='white' strokeWidth={7} />
                            </span>
                        ) : (
                            "Share"
                        )}
                    </button>
                        :
                        <>
                            <button
                                onClick={() => { navigate('/login') }}
                                className={`bg-indigo-600 px-2 text-center py-2 max-sm:mt-6 lg:ml-8 rounded-lg w-60 max-sm:w-full `}
                            >Log in first for review
                            </button>
                        </>}

                </div>
                {reviewsloading ?
                    <div className=' flex w-full mt-9 justify-center items-center'>
                        <TailSpin color='white' height={30} strokeWidth={6} />
                    </div>
                    :
                    <div className=' p-4 px-0 mt-8 '>
                        {
                            data.map((item, idx) => {
                                return (
                                    <div key={idx} className=' backdrop-blur-lg bg-white/50 border border-white/10 rounded-lg shadow-xl flex flex-col justify-start w-full mt-4'>

                                        <div className=' rounded-xl shadow-lg px-6 py-3 font-semibold  text-black ' key={item}>

                                            <div className='flex justify-between items-center '>
                                                <div className='text-2xl font-bold text-black'>
                                                    {item.name}
                                                </div>
                                                <div className='text-sm font-bold text-black ml-5 '>
                                                    {new Date(item.timestamp).toLocaleDateString()}
                                                </div>
                                            </div>

                                            <ReactStars
                                                size={20}
                                                edit={false}
                                                half={true}
                                                color1='balck'
                                                color2='blue'
                                                value={item.rating}
                                                className='mb-3'
                                            />
                                            {item.thought}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>}

            </div>

        </>
    )
}

export default Reviews