import { useCallback, useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { PlayIcon } from "@heroicons/react/24/solid";
import useInfoModalStore from "../hooks/infocardmodel";
import { PlusIcon, CheckIcon } from "@heroicons/react/24/outline";
import { addMovieToFavorites, getMovies, removeMovieFromFavorites } from "../queries/quesries";

const InfoModal = ({ visible, onClose }) => {
  const [data, setMovies] = useState([]);
  const [isVisible, setIsVisible] = useState(!!visible);
  const { moviedata } = useInfoModalStore();

  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movieDat = await getMovies('favorites');
        setMovies(movieDat);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  if (!visible) {
    return null;
  }
 


  const handleFavoriteClick = async () => {
    const favoriteStatus =  isFavorite();
    if (favoriteStatus) {
      await removeMovieFromFavorites(moviedata.id);
    } else {
      await addMovieToFavorites(moviedata.id, moviedata);
    }
    const updatedData = await getMovies('favorites');
    setMovies(updatedData);
  };
  const isFavorite = () => {
    const isFav = data.some((movie) => movie.movieId === moviedata.id);
    return isFav;
  };

  const Icon = isFavorite() ? CheckIcon : PlusIcon;

  return (
    <div  className="z-50 transition duration-300 bg-black bg-opacity-80 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0">
      <div className="relative w-auto mx-auto max-w-3xl rounded-md overflow-hidden">
        <div
          className={`${
            isVisible ? "scale-100" : "scale-0"
          } transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md`}
        >
          <div className="relative h-96">
            <video
              poster={moviedata?.thumbnailUrl}
              autoPlay
              muted
              loop
              src={moviedata?.videoUrl}
              className="w-full brightness-[60%] object-cover h-full"
            />
            <div
              onClick={handleClose}
              className="cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center"
            >
              <XMarkIcon className="text-white w-6" />
            </div>
            <div className="absolute bottom-[10%] left-10">
              <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8">
                {moviedata?.title}
              </p>
              <div className="flex flex-row gap-4 items-center">
                <button
                  className="
        bg-white 
        rounded-md 
        py-1 md:py-2 
        px-2 md:px-4
        w-auto 
        text-xs lg:text-lg 
        font-semibold
        flex
        flex-row
        items-center
        hover:bg-neutral-300
        transition
        "
                >
                  <PlayIcon className="w-4 md:w-7 text-black mr-1" />
                  Play
                </button>
                <div
                  onClick={()=>handleFavoriteClick()}
                  className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
                >
                  <Icon className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
                </div>
              </div>
            </div>
          </div>

          <div className="px-12 py-8">
            <div className="flex flex-row items-center gap-2 mb-1">
              <p className="text-green-400 font-semibold text-lg">New</p>
              <p className="text-white text-lg">{moviedata?.duration}</p>
              
            </div>
            <p className="text-white text-lg mb-8">{moviedata?.genre}</p>
            <p className="text-white text-lg">{moviedata?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
