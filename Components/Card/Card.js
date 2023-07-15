import React from "react";

const WorksCard = (props) => {
  return (
    <div 
      className="bg-[#292524] 
      shadow-lg rounded-sm hover:shadow-2xl sm:w-full hover:ring-4 ring-[#DBC086] hover:scale-105 duration-200 md:h-full  px-4 py-2"
    >
      <div 
        className="text-[#DBC086]  mx-auto mt-5 text-lg font-semibold h-10 lg:text-base md:text-sm text-center"
      >
        {props.title}
      </div>
    </div>
  );
};

export default WorksCard;