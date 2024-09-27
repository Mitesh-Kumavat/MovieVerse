import { getDoc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import ReactStars from 'react-stars';
import { db, moviesRef } from '../firebase/firebase';
import { ThreeDots } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

function Cards() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        async function getData() {
            setLoading(true);
            try {
                const querySnapshot = await getDocs(moviesRef);

                const myData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setData(myData);
            } catch (error) {
                console.error("Error fetching data: ", error);
            } finally {
                setLoading(false);
            }
        }
        getData();
    }, [])

    return (
        <div className='flex flex-wrap justify-center p-3 mt-2 '>
            {loading ? <div className='w-[100vw] h-[80vh] flex justify-center items-center'><ThreeDots color='white' width={385} strokeWidth={2} height={20} /></div> :
                <>
                    {
                        data.map((item, idx) => {
                            return (
                                <div key={idx} onClick={() => navigate(`/detail/${item.id}`)} className='mx-3 sm:mx-6 max-sm:text-sm max-sm:font-normal text-lg font-medium p-2 transition-all duration-200  hover:scale-105 max-sm:mx-auto max-sm:my-3  cursor-pointer md:mt-0 mb-8  bg-white/30 border border-white/10 rounded-xl shadow-lg'>
                                    <img loading='lazy' className='h-72 w-[13rem] max-sm:h-[12rem] max-sm:w-[9rem] rounded-lg' src={item.img} alt="Movie Thumbnail" />

                                    <h1 className='text-start mt-3 max-w-48 max-sm:max-w-32 overflow-x-hidden'>
                                        <span className='text-black font-bold'>Name: </span>
                                        {item.name}
                                    </h1>
                                    <h1>
                                        <span className='text-black font-bold'>Rating: </span>
                                        <ReactStars size={25} color2='gold' half={true} value={item.rating / item.rated} edit={false} />
                                    </h1>
                                    <h1>
                                        <span className='text-black font-bold'>Year: </span>
                                        {item.year}
                                    </h1>
                                </div>
                            )
                        })
                    }
                </>
            }

        </div>
    )
}

export default Cards