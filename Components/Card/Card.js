import React from "react";
import { Button } from "@chakra-ui/react";
const WorksCard = (props) => {
  return (
    <Button colorScheme="teal"
      className="bg-[#292524] 
      shadow-lg rounded-sm hover:shadow-2xl sm:w-full hover:ring-4 ring-[#DBC086] hover:scale-105 duration-200 md:h-full  px-4 py-2"
    >
        {props.title}
    </Button>
  );
};

export default WorksCard;