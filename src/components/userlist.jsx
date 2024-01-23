import React, { useCallback, useEffect, useState } from 'react';
import MovieCard from './moviescard';
import { getMovies } from '../queries/quesries';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import { FreeMode, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation  } from 'swiper/modules';

const UserList = () => {
  const [data, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

  const fetchMovies = async () => {
    try {
      const movieData = await getMovies('favorites');
      setMovies(movieData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching movies:', error);
    }
  }
    fetchMovies();
  }, []);

  return (
    <div className="px-4 md:px-12 mt-4 space-y-8 pb-12">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">Favorites</p>
        {data.length === 0 ? (
           <div className="group bg-zinc-900 col-span relative h-[12vw] " >
             <div  className='  cursor-pointer
             object-cover
             transition
             flex justify-center
             duration
             items-center
             shadow-xl
             rounded-md
             group-hover:opacity-90
             delay-300
             w-[24rem]
             border border-white
             h-[12vw] text-white'>Click on movies to add to Fav.</div>
         </div>
        
        ) : (
          <Swiper
            cssMode={true}
            navigation={true}
            slidesPerView={3.5}
            spaceBetween={30}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            modules={[FreeMode, Pagination, Navigation]}
            className="mySwiper"
          >
            {data.map((movie) => (
              <SwiperSlide key={movie.id}>
                <MovieCard data={movie} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default UserList;