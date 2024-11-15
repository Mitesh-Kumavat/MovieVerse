import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ThreeDots } from 'react-loader-spinner';
import ReactStars from 'react-stars';
import { db, moviesRef } from '../firebase/firebase';
import Reviews from './Reviews';


function Detail() {
    const [loading, setLoading] = useState(false)
    const { id } = useParams();
    const [data, setData] = useState({
        name: "",
        year: "",
        description: "",
        img: "",
        rating: 0,
        rated: 0,
    })

    useEffect(() => {
        async function getData() {
            setLoading(true);
            const _doc = doc(db, "movies", id);
            const _data = await getDoc(_doc);

            if (_data.exists()) {
                setData({
                    name: _data.data().name || "",
                    year: _data.data().year || "",
                    description: _data.data().description || "",
                    img: _data.data().img || "",
                    rating: _data.data().rating || 0,
                    rated: _data.data().rated || 0,
                });
            } else {
                console.log("No such document!");
            }

            setLoading(false);
        }
        getData();
    }, [id]);

    return (
        loading ? (
            <div className='w-[100vw] h-[80vh] flex justify-center items-center bg-[#121212]'>
                <ThreeDots color='white' width={385} strokeWidth={2} height={20} />
            </div>
        ) :
            (
                <div className='flex max-sm:flex-col max-md:flex-col max-lg:flex-col lg:p-8 md:p-4 bg-[#121212]'>

                    <div className='max-sm:flex-col flex mt-4 justify-start max-lg:justify-center px-8 lg:ml-9 p-4'>
                        <img
                            loading='lazy'
                            src={data.img}
                            className='max-h-96 rounded-xl shadow-[#333333]  lg:sticky lg:top-28 max-sm:h-[20rem] max-sm:mx-auto'
                            alt=""
                        />
                    </div>

                    <div className="w-full lg:mt-0 p-8 lg:ml-12 lg:max-w-[55vw]">

                        <div className='text-[#EAEAEA] font-bold text-4xl mb-3'>
                            {data.name} <br />
                            <span className='text-2xl'>({data.year})</span>
                        </div>

                        <ReactStars
                            count={5}
                            half={true}
                            value={Number(data.rating) / Number(data.rated)}
                            size={25}
                            edit={false}
                            color1='#555555'
                            color2='white'
                        />

                        <div className='px-8 mt-4 pl-0 font-bold lg:text-2xl max-sm:text-xl text-[#B0B0B0]'>
                            {data.description}
                        </div>

                        <Reviews id={id} prevRating={Number(data.rating)} userRated={Number(data.rated)} className='mt-8 border-[#333333]' />

                    </div>
                </div>
            )
    );

}

export default Detail