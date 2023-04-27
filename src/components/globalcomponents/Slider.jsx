import React from "react";
import img1 from "../../assets/images/sliders/aztu_1.png";
import img2 from "../../assets/images/sliders/AzTU-drone-pic.jpg";
import img3 from "../../assets/images/sliders/aztu.jpg";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/skyblue";
const Slider = () => {
  const data = [img1, img2, img3];
  return (
    <div className='max-w-full'>
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
              <div
                className='relative w-screen h-screen'
                style={{ backgroundImage: `url('${item}')`,backgroundRepeat:"no-repeat",
                backgroundPosition:"center",backgroundAttachment:'fixed',backgroundSize:'100vw 100vh' }}
              >
                <div className='w-[70%] xl:w-[970px] text-[60px]
                 text-white z-50 absolute top-2/4 left-2/4 -translate-x-2/4 text-center'>
                  <div className="mx-auto">Azərbaycan Texniki Universitetinə xoş gəlmisiniz!</div>
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
