import React from "react";
import Background from "./HomeBackground/Background";
import HeaderText from "./HomeHeaderText/HeaderText";
import BlogCard from "../../BlogCard/BlogCard";
import { blog } from "@/static/blog";
import { ButtonArr, ButtonArrTwo } from "@/static/btns";
import GradientBar from "./HomeGradientBar/GradientBar";


const HomeContainer = () => {
  return (
    <div className="relative w-full h-[92vh] flex flex-col justify-center items-center overflow-hidden  ">
      <div className="">
        <Background ButtonArr={ButtonArr} ButtonArrTwo={ButtonArrTwo} />
      </div>

      <GradientBar />

      <div className="h-1/2 w-full absolute top-0 flex justify-start sm:justify-center items-start z-40 pt-16 xl:pt-20">
        <div className=" sm:w-[70%] lg:w-[60%] xl:w-1/2 lg:h-1/2 flex justify-center items-center">
          <HeaderText />
        </div>
      </div>

      <div className="absolute bottom-56 sm:bottom-48 lg:bottom-28 flex justify-center items-center z-30">
          <BlogCard blog={blog} />
      </div>
    </div>
  );
};

export default HomeContainer;
