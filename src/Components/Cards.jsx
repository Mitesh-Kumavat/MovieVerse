import { getDoc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import ReactStars from 'react-stars';
import { db, moviesRef } from '../firebase/firebase';
import { TailSpin, Bars } from 'react-loader-spinner';

function Cards() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function getData() {
            setLoading(true);
            try {
                // Assuming moviesRef is a collection reference
                const querySnapshot = await getDocs(moviesRef);
                console.log(querySnapshot);

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
            {loading ? <div className='w-[100vw] h-[80vh] flex justify-center items-center'><Bars color='white' width={455} strokeWidth={2} height={80} /></div> : <>
                {
                    data.map((item, idx) => {
                        return (
                            <div key={idx} className='mx-3  max-sm:text-sm max-sm:font-normal text-lg font-medium p-2 transition-all duration-200 bg-[#3b3b3b] hover:scale-105 max-sm:mx-auto max-sm:my-3 hover:backdrop-blur-0  cursor-pointer md:mt-0 mb-8 lg:zz backdrop-blur-lg bg-white/30 border border-white/10 rounded-xl shadow-lg'>
                                <img className='h-72 rounded-lg' src={item.img} alt="Movie Thumbnail" />

                                <h1 className='text-start mt-3 max-w-48 max-sm:max-w-32 overflow-x-hidden'>
                                    <span className='text-indigo-400 font-bold'>Name: </span>
                                    {item.name}
                                </h1>
                                <h1>
                                    <span className='text-indigo-400 font-bold'>Rating: </span>
                                    <ReactStars size={25} color2='gold' half={true} value={item.rating} edit={false} />
                                </h1>
                                <h1>
                                    <span className='text-indigo-400 font-bold'>Year: </span>
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