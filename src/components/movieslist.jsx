import React, {useEffect, useState } from 'react';
import MovieCard from './moviescard';
import { getMovies } from '../queries/quesries';
import 'swiper/css';
import 'swiper/css/free-mode';
import { FreeMode, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Loader from './Loader';


const MovieList = () => {
    const [data, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchMovies = async () => {
        try {
          const movieData = await getMovies('movies');
          setMovies(movieData);
          setLoading(false)
        } catch (error) {
          setLoading(false)
          console.error('Error fetching movies:', error);
        }
      };
  
      fetchMovies();
    }, []);

  return (
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">Trending</p>
      
        <Swiper
        slidesPerView={3.5}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination ]}
        className="mySwiper"
      >
          {loading ? (
          <Loader />
        ) : (
          <>
        {data.map((movie) => (
          <SwiperSlide key={movie.id}>
            <MovieCard data={movie} />
          </SwiperSlide>
        ))}
        </>
        )}
      </Swiper>
      
      </div>
    </div>
  );
}

export default MovieList;
