import React, { useContext } from "react";
import { Context } from "../Context";
import useSWR from "swr";
import Loader from "./globalcomponents/Loader";
import { AiOutlineCalendar, AiOutlineDownload } from "react-icons/ai";
const Library = () => {
  const url = "https://djangoresttest.online/api/books/";
  const { token } = useContext(Context);
  async function fetchData() {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  }
  const { data, error, isLoading } = useSWR("library", fetchData);
  if (isLoading) return <Loader />;
  if (error) return "Error: " + error;
  console.log(data);
  return (
    <>
      <div className='h-[200px] py-10 bg-sky-500 text-white text-3xl flex items-end'>
        <div className='container'>Kitabxana</div>
      </div>
      <div className='bg-[#f9f9f9f9]'>
        <div className='container'>
          {token ? (
            <div className='py-6 flex flex-wrap justify-center'>
              {data?.results?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className='w-[300px] px-6 py-4 m-6 bg-white border border-gray-200 rounded-lg shadow'
                  >
                    <div className="max-w-4/5"><img className="h-[200px] mx-auto border" src={item.image}/></div>
                    <a href='#'>
                      <h5 className='my-3 text-xl text-gray-700'>
                        {item.title}
                      </h5>
                    </a>
                    <p className='mb-3 flex'>
                      <span className='flex items-center text-gray-700'>
                        <AiOutlineCalendar /> {item.creation_date}
                      </span>
                      <span className='flex items-center text-gray-700 ml-4'>
                        <AiOutlineDownload /> {item.downloads}
                      </span>
                    </p>
                    <a
                      className='inline-flex cursor-pointer items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300'
                      href={item.download_url + "?auth=" + token}
                      target='_blank'
                      download={item.title}
                    >
                      Yüklə{" ↓ "}
                    </a>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className='text-3xl text-red-600 h-[50vh] flex justify-center items-center'>
              Kitabxana giriş etmək üçün sayta daxil olmalısınız!
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Library;
