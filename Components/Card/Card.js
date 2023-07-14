import React from "react";

const WorksCard = (props) => {
  return (
    <div 
      className="shadow-lg rounded-sm hover:shadow-2xl sm:w-full hover:ring-4 ring-green-500 hover:scale-105 duration-200 md:h-full bg-gray-100 px-4 py-2"
    >
      <div 
        className="text-green-500 mx-auto mt-5 text-lg font-semibold h-10 lg:text-base md:text-sm text-center"
      >
        {props.title}
      </div>
    </div>
  );
};

export default WorksCard;