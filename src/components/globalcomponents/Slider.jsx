import React from "react";
import img1 from "../../assets/images/sliders/aztu_1.png";
import img2 from "../../assets/images/sliders/AzTU-drone-pic.jpg";
import img3 from "../../assets/images/sliders/aztu.jpg";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/react-splide/css/skyblue';
const Slider = () => {
  const data = [img1, img2, img3];
  return (
    <div className='container'>
      <Splide
        className='splide-container'
        options={{
          autoplay: true,
          type: "loop",
          perPage: 1,
          perMove: 1,
          pagination: false,
          cover: true,
        }}
      >
        {data?.map((item, index) => {
          return (
            <SplideSlide key={index} className='h-screen'>
              <div className='relative'>
                <img className='h-screen w-full absolute' src={item} />
                <div className='text-5xl text-white z-50 absolute left-[50vh] bottom-[-70vh] text-center'>
                  <div>Azərbaycan Texniki Universitetinə</div>
                  <div> xoş gəlmisiniz!</div>
                </div>
              </div>
            </SplideSlide>
          );
        })}
      </Splide>
    </div>
  );
};

export default Slider;
