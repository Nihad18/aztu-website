import React from "react";
import Loader from "./globalcomponents/Loader";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { AiOutlineCalendar, AiOutlineEye } from "react-icons/ai";
const NewsDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const url = `https://djangoresttest.online/api/news-detail/${params.slug}`;
  async function fetchData() {
    const res = await fetch(url);
    return res.json();
  }

  const { data, error, isLoading } = useSWR("detailNews", fetchData);
  if (data?.status >= 400) {
    navigate("*");
  }
  if (isLoading) return <Loader/>;
  if (error) return "Error: " + error;
  console.log("news data : ", data);
  return (
    <>
      <div className='h-[200px] py-10 bg-sky-500 text-white text-3xl flex items-end'>
        <div className='container'>Xəbərlər</div>
      </div>
      <div className='bg-[#f9f9f9f9] mt-10'>
        <div className='container'>
          {/* head */}
          <div className='mb-16 py-2'>
            <Link
              to='/'
              className='hover:text-sky-800 hover:border-b hover:border-b-sky-800'
            >
              Ana səhifə {" > "}
            </Link>
            <Link
              to='/allnews'
              className='hover:text-sky-800 hover:border-b hover:border-b-sky-800'
            >
              Xəbərlər {" > "}
            </Link>
            <span>{data?.title}</span>
          </div>
          <div>
            <div className='text-2xl font-medium mb-6'>{data?.title}</div>
            <div className='flex'>
              <span className='flex items-center text-gray-700'>
                <AiOutlineCalendar /> {data?.creation_date}
              </span>
              <span className='flex items-center mx-4 text-gray-700'>
                <AiOutlineEye />
                <span className='ml-[2px]'>{data?.views}</span>
              </span>
              <span className='font-medium'>{data?.category}</span>
            </div>
          </div>
          <div className='w-4/5 mt-4'>
            <img className='aspect-[16/8]' src={data?.images[0]} />
          </div>
          <div className='w-4/5 mt-4'>{data?.text}</div>
          <div className='w-4/5 mt-4 pb-4'>
            <Splide
              options={{
                pagination: false,
                arrows:true,
                rewind: true,
                autoplay: true,
                drag: "free",
                type: "loop",
                perPage: 4,
                gap:"1rem",
                breakpoints: {
                  1200: { perPage: 4 },
                  800: { perPage: 2 },
                  640: { perPage: 1 },
                },
              }}
            >
              {data?.images?.map((item, index) => {
                return (
                  <SplideSlide>
                    <div className='center'>
                      <img
                        className='w-[314px] lg:w-[244px] h-[116px]'
                        src={item}
                        alt={`Image ${index}`}
                      />
                    </div>
                  </SplideSlide>
                );
              })}
            </Splide>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsDetail;
