
import React, { useContext, useEffect, useState } from 'react';
import ReactStars from 'react-stars';
import { reviewsRef, db } from '../firebase/firebase';
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

    const fetchReviews = async () => {
        setReviewsLoading(true);
        let quer = query(reviewsRef, where("movieid", '==', id));
        const querySnapshot = await getDocs(quer);
        let fetchedData = [];
        querySnapshot.forEach((doc) => {
            fetchedData.push(doc.data());
        });
        setData(fetchedData);
        setReviewsLoading(false);
    };

    useEffect(() => {
        fetchReviews();
    }, [id]);

    const sendReview = async () => {
        setLoading(true);

        try {
            const numericRating = Number(rating) || 0;
            const numericPrevRating = Number(prevRating);
            const numericUserRated = Number(userRated);

            { console.log(useAppState.username) }

            const newReview = {
                movieid: id,
                name: useAppState.username || 'Anonymous',
                rating: isNaN(numericRating) ? 0 : numericRating,
                thought: thought || 'Nice',
                timestamp: new Date().getTime(),
            };

            await addDoc(reviewsRef, newReview);

            const _doc = doc(db, "movies", id);
            await updateDoc(_doc, {
                rating: (numericPrevRating + numericRating) || 0,
                rated: (numericUserRated + 1) || 1
            });

            setData((prev) => [...prev, newReview]);

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
        setLoading(false);
    };

    return (
        <>
            <div className={`flex flex-col mt-9 w-full border-t-2 border-[#333333] ${className}`}>

                <ReactStars
                    size={35}
                    edit={true}
                    half={true}
                    color2='white'
                    color1='#555555'
                    value={rating}
                    onChange={(rate) => setRating(rate)}
                    className="mt-4"
                />

                <div className="flex max-sm:flex-col w-full max-lg:justify-between mt-2">
                    <input
                        type="text"
                        value={thought}
                        onChange={(e) => setThought(e.target.value)}
                        className="max-sm:w-full w-96 rounded-lg h-10 outline-none bg-[#2C2C2C] border-[#333333] text-[#EAEAEA] px-3 shadow-sm"
                        placeholder="Enter Your Review"
                    />

                    {useAppState.login ? (
                        <button
                            type="submit"
                            onSubmit={(e) => {
                                e.preventDefault();
                                sendReview();
                            }}
                            onClick={sendReview}
                            disabled={!thought || rating === 0}
                            className={`bg-white text-black hover:bg-gray-400 px-2 py-2 max-sm:mt-6 lg:ml-8 rounded-lg w-60 max-sm:w-full ${!thought || rating === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {loading ? (
                                <span className="flex justify-center items-center">
                                    <TailSpin height={20} color="white" strokeWidth={7} />
                                </span>
                            ) : (
                                "Share"
                            )}
                        </button>
                    ) : (
                        <button
                            onClick={() => navigate('/login')}
                            className="bg-white text-black hover:bg-gray-400 px-2 py-2 max-sm:mt-6 lg:ml-8 rounded-lg w-60 max-sm:w-full"
                        >
                            Log in first for review
                        </button>
                    )}
                </div>

                {reviewsloading ? (
                    <div className="flex w-full mt-9 justify-center items-center">
                        <TailSpin color="white" height={30} strokeWidth={6} />
                    </div>
                ) : (
                    <div className="p-4 px-0 mt-8">
                        {data.map((item, idx) => (
                            <div key={idx} className="bg-zinc-800 border-[#333333] rounded-lg shadow-xl flex flex-col justify-start w-full mt-4">
                                <div className="rounded-xl shadow-lg px-6 py-3 font-semibold text-[#EAEAEA]">
                                    <div className="flex justify-between items-center">
                                        <div className="text-2xl sm:text-2xl font-bold text-zinc-300">
                                            {String(item.name).toLowerCase()}
                                        </div>
                                        <div className="text-sm font-bold text-[#B0B0B0] ml-5">
                                            {new Date(item.timestamp).toLocaleDateString()}
                                        </div>
                                    </div>

                                    <ReactStars
                                        size={20}
                                        edit={false}
                                        half={true}
                                        color1="#555555"
                                        color2="white"
                                        value={item.rating}
                                        className="mb-3"
                                    />
                                    <p className="text-zinc-400">{item.thought}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );

}

export default Reviews;
