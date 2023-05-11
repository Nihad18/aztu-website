import React, { useContext, useState } from "react";
import Loader from "./globalcomponents/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import useSWR, { mutate } from "swr";
import { Link } from "react-router-dom";
import {
  AiOutlineSearch,
  AiOutlineCalendar,
  AiOutlineDownload,
} from "react-icons/ai";
import { RxReset } from "react-icons/rx";
import { Context } from "../Context";
const Library = () => {
  const { token } = useContext(Context);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(2);
  const [category, setCategory] = useState("");
  const url = `http://localhost:8000/api/books/?page=1&size=4&category=${category}&search=${search}`;
  const nextPageUrl = `http://localhost:8000/api/books/?page=${page}&size=4&category=${category}&search=${search}`;
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [searchActive, setSearchActive] = useState(false);
  //-----------------------------------------------------------
  const { data, error, isLoading } = useSWR("books", async () => {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  });
  const categories = useSWR("book-categories", async () => {
    const res = await fetch(
      "http://localhost:8000/api/book-categories",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.json();
  });
  // infinite pagination---------------------
  const fetchOtherData = async (page) => {
    setHasMore(data?.next != null ? true : false);
    try {
      const data = await fetch(nextPageUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const res = await data.json();
      setPage(searchData?.next !== null ? page + 1 : 2);
      setItems([...items, ...res?.results]);
      setHasMore(res?.next !== null ? true : false);
    } catch (e) {
      console.log(e);
    }
  };
  //-------search------------------------------------
  const searchData = async (e) => {
    e.preventDefault();
    setSearchActive(true);
    setItems([]);
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const searchData = await res.json();
    setPage(searchData?.next !== null ? (page === 2 ? 2 : page + 1) : 2);
    setHasMore(searchData?.next !== null ? true : false);
    mutate("books", searchData, false);
  };
  //------reset search-----------------------------
  const resetSearch = async (e) => {
    e.preventDefault();
    setSearchActive(false);
    setSearch("");
    setItems([]);
    setCategory("");
    const res = await fetch(
      "https://djangoresttest.online/api/books/?page=1&size=4&search=",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const searchData = await res.json();
    setPage(2);
    setHasMore(searchData?.next != null ? true : false);
    mutate("books", searchData, false);
  };
  //----------------------------------------------
  if (isLoading) return <Loader />;
  if (error) return "Error: " + error;
  return (
    <>
      <div className='h-[200px] py-10 bg-sky-500 text-white text-3xl flex items-end'>
        <div className='container'>Kitabxana</div>
      </div>
      <div className='bg-[#f9f9f9f9]'>
        <div className='container min-h-[50vh]'>
          {token ? (
            <>
              <div className='py-6 flex'>
                <select
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                  value={category}
                  className='w-[200px] outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5'
                >
                  <option value={""} defaultValue>
                    Kateqoriya : Bütün
                  </option>
                  {categories?.data?.map((item, index) => (
                    <option key={index} value={item.slug}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <input
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                  type='text'
                  className='outline-none w-[500px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5'
                  placeholder='axtar'
                />
                <button
                  disabled={search.length < 1 && category === ""}
                  onClick={searchData}
                  className='disabled:cursor-not-allowed disabled:bg-green-300 text-2xl border rounded px-8 ml-4 bg-green-500 text-white'
                >
                  <AiOutlineSearch />
                </button>
                <button
                  disabled={searchActive === false}
                  onClick={resetSearch}
                  className='flex items-center text-lg ml-4 border px-8 bg-red-500 text-white disabled:bg-red-300 disabled:cursor-not-allowed'
                >
                  Sıfırla <RxReset className='ml-2' />{" "}
                </button>
              </div>
              <div className='py-6'>
                <div className='flex flex-wrap justify-center mx-auto'>
                  {data?.results?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className='w-[250px] min-h-[386px] px-6 py-4 m-6 bg-white border border-gray-200 rounded-lg shadow'
                      >
                        <div className='max-w-4/5'>
                          <img
                            className='h-[200px] mx-auto border'
                            src={item.image}
                          />
                        </div>
                        <h5 className='my-3 text-xl text-gray-700 short-title'>
                          {item.title}
                        </h5>
                        <h5 className='my-3 text-xl text-gray-700 short-title'>
                          {"M : "} {item.author}
                        </h5>
                        <h5 className='my-3 text-xl text-gray-700 short-title'>
                          {"K : "} {item.category}
                        </h5>
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
                <div>
                  <InfiniteScroll
                    dataLength={items.length}
                    next={() => fetchOtherData(page)}
                    hasMore={hasMore}
                    loader={<h4>Loading...</h4>}
                    className='flex flex-wrap justify-center mx-auto'
                  >
                    {items?.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className='w-[280px] min-h-[386px] px-6 py-4 m-6 bg-white border border-gray-200 rounded-lg shadow'
                        >
                          <div className='max-w-4/5'>
                            <img
                              className='h-[200px] mx-auto border'
                              src={item.image}
                            />
                          </div>
                          <h5 className='my-3 text-xl text-gray-700 short-title'>
                            {item.title}
                          </h5>
                          <h5 className='my-3 text-xl text-gray-700 short-title'>
                            {"M : "} {item.author}
                          </h5>
                          <h5 className='my-3 text-xl text-gray-700 short-title'>
                            {"K : "} {item.category}
                          </h5>
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
                  </InfiniteScroll>
                </div>
              </div>
              {searchActive === true && data?.results?.length === 0 && (
                <div className='text-3xl text-red-600 h-[50vh] flex justify-center items-center'>
                  Axtarışa uyğun kitab tapılmadı!
                </div>
              )}
            </>
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
