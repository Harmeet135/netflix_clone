import React, { useEffect, useState } from "react";
import { PlayIcon } from '@heroicons/react/24/solid';
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { getRandomMovie } from "../queries/quesries";

const Billboard = () => {
    const [randomMovie, setRandomMovie] = useState(null);

  useEffect(() => {
    const fetchRandomMovieData = async () => {
      try {
        const randomMovieData = await getRandomMovie();
        setRandomMovie(randomMovieData);
      } catch (error) {
        console.error('Error fetching random movie:', error);
      }
    };

    fetchRandomMovieData();
  }, []);

  return (
    <div className="relative xl:h-[31.25vw] md:h-[50vw] xs:h-[40vw] h-[50vw]">
      <video poster={randomMovie?.thumbnailUrl} className="w-full  xl:h-[31.25vw] md:h-[50vw] xs:h-[40vw] h-[50vw] object-cover brightness-[60%] transition duration-500" autoPlay muted loop src={randomMovie?.videoUrl}></video>
      <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
        <p className="text-white text-1xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
          {randomMovie?.title}
        </p>
        <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
          {randomMovie?.description}
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
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
          <button
            className="
            bg-white
            text-white
              bg-opacity-30 
              rounded-md 
              py-1 md:py-2 
              px-2 md:px-4
              w-auto 
              text-xs lg:text-lg 
              font-semibold
              flex
              flex-row
              items-center
              hover:bg-opacity-20
              transition
            "
            >
              <InformationCircleIcon className="w-4 md:w-7 mr-1" />
              More Info
          </button>
        </div>
      </div>
    </div>
  )
}
export default Billboard;
