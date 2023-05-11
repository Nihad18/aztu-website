import React from "react";
import Loader from "./globalcomponents/Loader";
import useSWR from "swr";
import { Link } from "react-router-dom";
const News = () => {
  const url = "http://localhost:8000/api/news/";
  async function fetchData() {
    const res = await fetch(url);
    return res.json();
  }
  const { data, error, isLoading } = useSWR("news", fetchData);
  if (isLoading) return <Loader/>;
  if (error) return "Error: " + error;
  console.log("data : ", data);
  return (
    <div className='bg-[#f9f9f9f9] py-4'>
      <div className='container'>
        <div className='text-xl lg:text-3xl font-medium py-6'>
          Xəbərlər | <Link to='/allnews' className='hover:text-sky-800'>Bütün xəbərlər</Link>
        </div>
        <div>
          {data?.results?.map((item, index) => {
            return (
              <div className='flex mb-4 items-center' key={index}>
                <div className='w-[60px] h-[60px] bg-[#0E205B] text-white text-xl text-center'>
                  {item.creation_date}
                </div>
                <Link to={`/news-detail/${item.slug}`} className='ml-4 hover:text-sky-800'>
                  {item.title}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default News;
