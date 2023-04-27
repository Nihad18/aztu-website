import React, { useState } from "react";
import Loader from "./globalcomponents/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import useSWR from "swr";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { RxReset } from "react-icons/rx";
const AllNews = () => {
  const url = "https://djangoresttest.online/api/news/";
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");
  const [mainData,setMainData]=useState('')
  const [searchActive, setSearchActive] = useState(false);
  const [searchDatas, setSearchDatas] = useState([]);
  const [searchStatus, setSearchStatus] = useState("");
  async function fetchData() {
    const res = await fetch(url); 
    return res.json();
  }
  const searchData = async () => {
    setSearchActive(true);
    try {
      setSearchStatus("loading");
      const url = `https://djangoresttest.online/api/news/?search=${search}`;
      const res = await fetch(url);
      const data = await res.json();
      setSearchDatas(data);
      setSearchStatus("");
    } catch (error) {
      console.error(error);
      setSearchStatus("Axtardığız xəbər tapılmadı!");
    }
  };
  const resetSearch=()=>{
    setSearchActive(false);
  }
  const fetchOtherData = (pageNumber) => {
    fetch(`https://djangoresttest.online/api/news/?page=${pageNumber}`)
      .then((response) => response.json())
      .then((data) => {
        const newItems = data.results;
        const nextPage = pageNumber + 1;
        setItems([...items, ...newItems]);
        setPage(nextPage);
        if (data.next === null) return setHasMore(false);
      })
      .catch((error) => console.error(error));
  };
  const { data, error, isLoading } = useSWR("news", fetchData);
  if (isLoading) return <Loader />;
  if (error) return "Error: " + error;
  console.log(searchActive)
  console.log("status : ", searchStatus);
  return (
    <>
      <div className='h-[200px] py-10 bg-sky-500 text-white text-3xl flex items-end'>
        <div className='container'>Bütün xəbərlər</div>
      </div>
      <div className='bg-[#f9f9f9f9]'>
        <div className='container'>
          <div className='py-6 flex'>
            <input
              onChange={(e) => setSearch(e.target.value)}
              type='text'
              className='outline-none w-[500px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5'
              placeholder='axtar'
            />
            <button
              disabled={search.length < 1}
              onClick={searchData}
              className='disabled:cursor-not-allowed text-2xl border rounded px-8 ml-4 bg-green-500 text-white'
            >
              <AiOutlineSearch />
            </button>
            <button
              disabled={searchActive===false}
              onClick={() => resetSearch}
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
        </div>
      </div>
    </>
  );
};

export default AllNews;
