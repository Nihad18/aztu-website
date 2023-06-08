import React, { useState } from "react";
import Loader from "./globalcomponents/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import useSWR, { mutate } from "swr";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { RxReset } from "react-icons/rx";
const AllNews = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(2);
  const [category, setCategory] = useState("");
  const url = `http://armud.az/api/news/?page=1&category=${category}&search=${search}`;
  const nextPageUrl = `http://armud.az/api/news/?page=${page}&category=${category}&search=${search}`;
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [searchActive, setSearchActive] = useState(false);
  const { data, error, isLoading } = useSWR("news", async () => {
    const res = await fetch(url);
    return res.json();
  });
  //-----------------------------------------------
  const categories = useSWR("news-categories", async () => {
    const res = await fetch(
      "http://armud.az/api/news-categories"
    );
    return res.json();
  });
  //-----------------------------------------------
  const fetchOtherData = async (page) => {
    setHasMore(data?.next != null ? true : false);
    try {
      const data = await fetch(nextPageUrl);
      const res = await data.json();
      setPage(searchData?.next !== null ? page + 1 : 2);
      setItems([...items, ...res?.results]);
      setHasMore(res?.next !== null ? true : false);
    } catch (e) {
      console.log(e);
    }
  };
  const searchData = async (e) => {
    e.preventDefault();
    setSearchActive(true);
    setItems([]);
    const res = await fetch(url);
    const searchData = await res.json();
    setPage(searchData?.next !== null ? (page === 2 ? 2 : page + 1) : 2);
    setHasMore(searchData?.next !== null ? true : false);
    mutate("news", searchData, false);
  };
  const resetSearch = async (e) => {
    e.preventDefault();
    setSearchActive(false);
    setSearch("");
    setItems([]);
    const res = await fetch(
      "http://armud.az/api/news/?page=1&search="
    );
    const searchData = await res.json();
    setPage(2);
    setHasMore(searchData?.next != null ? true : false);
    mutate("news", searchData, false);
  };
  if (isLoading) return <Loader />;
  if (error) return "Error: " + error;
  return (
    <>
      <div className='h-[200px] py-10 bg-sky-500 text-white text-3xl flex items-end'>
        <div className='container'>Bütün xəbərlər</div>
      </div>
      <div className='bg-[#f9f9f9f9]'>
        <div className='container min-h-[50vh]'>
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
          <div>
            {data?.results?.map((item, index) => {
              return (
                <div className='flex mb-4 items-center' key={index}>
                  <div className='w-[60px] h-[60px] bg-[#0E205B] text-white text-xl text-center'>
                    {item.creation_date}
                  </div>
                  <Link
                    to={`/news-detail/${item.slug}`}
                    className='ml-4 hover:text-sky-800'
                  >
                    {item.title}
                  </Link>
                </div>
              );
            })}
          </div>
          <InfiniteScroll
            dataLength={items.length}
            next={() => fetchOtherData(page)}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
          >
            {items?.map((item, index) => {
              return (
                <div className='flex mb-4 items-center' key={index}>
                  <div className='w-[60px] h-[60px] bg-[#0E205B] text-white text-xl text-center'>
                    {item.creation_date}
                  </div>
                  <Link
                    to={`/news-detail/${item.slug}`}
                    className='ml-4 hover:text-sky-800'
                  >
                    {item.title}
                  </Link>
                </div>
              );
            })}
          </InfiniteScroll>
          {searchActive === true && data?.results?.length === 0 && (
            <div className='text-3xl text-red-600 h-[50vh] flex justify-center items-center'>
              Axtarışa uyğun xəbər tapılmadı!
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllNews;
