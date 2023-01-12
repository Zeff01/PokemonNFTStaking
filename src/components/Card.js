import React from "react";
import { GiPaperArrow } from "react-icons/gi";
const Card = ({ id, name, image, type, stats = [], specie }) => {
  const description = specie ? specie.description : name;

  return (
    <div className="w-full p-3 ">
      <div className={`mainContainerFlip  `}>
        <div
          className={` cardFlip ${type} duration-300 rounded-lg border border-[#417878]`}
        >
          <div className="cardFront p-4">
            <div className="flex items-center justify-between">
              <h2 className={`idNumber `}>#&nbsp;{id}&nbsp;</h2>
              <h1 className="ml-2 text-xl textStroke">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </h1>
            </div>
            <img
              src={image}
              className="w-[80px] h-[80px]  animate-[wiggle_1s_ease-in-out_infinite]"
            />
            <h2 className="textStroke text-xl typeBackground">
              {type.toUpperCase()}
            </h2>
          </div>

          <div className="cardBack p-1">
            <h1 className="flex items-center justify-center rounded-lg p-4 w-full h-full bg-[rgba(0,0,0,0.3)] font-[Quicksand]">
              {description}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
