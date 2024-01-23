import React from 'react';
import useInfoModalStore from '../hooks/infocardmodel';

const MovieCard = ({ data }) => {
    const { openModal } = useInfoModalStore();
  
    const handleInfo = (data) => {
      openModal(data);
    }

return (
    <div className="group bg-zinc-900 col-span relative h-[12vw]" onClick={() => handleInfo(data)}>
      <img src={data.thumbnailUrl} alt="Movie" draggable={false} className="
        cursor-pointer
        object-cover
        transition
        duration
        shadow-xl
        rounded-md
        group-hover:opacity-90
        delay-300
        w-full
        h-[12vw]
      " />
    </div>
  )
}

export default MovieCard;
