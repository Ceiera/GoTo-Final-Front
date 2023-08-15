import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const ListVideos = () => {
  const [title, setTitle] = useState("");
  const [ListVideoss, setListVideoss] = useState([""]);
  const getVideos = async () => {
    if (title !== "") {
      getVideosbyTitle(title);
    } else {
      getVideosAll();
    }
  };

  const handleChangeSearch = (e) => {
    const value = e.target.value
    setTitle(value);
    if (value === "") {
      getVideosAll()
    }
  }
  const handleKeySearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      if (title !== "") {
        getVideosbyTitle(title);
      }
      getVideosAll();
    }
  }
  const getVideosAll = async () => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/videos`);
    const data = await response.json();
    setListVideoss(data.data);
  };

  const getVideosbyTitle = async (judul) => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API}/videos/title/${judul}`
    );
    const data = await response.json();
    setListVideoss(data.data);
  };
  useEffect(() => {
    getVideos();
  }, []);
  if (ListVideoss[0] === "") {
    return (
      <>
        <div
          role="status"
          className="max-w-xs p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700"
        >
          <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
            <svg
              className="w-10 h-10 text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 20"
            >
              <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
              <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
            </svg>
          </div>
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>

          <span className="sr-only">Loading...</span>
        </div>
      </>
    );
  }
  return (
    <div className="shadow-lg h-content p-4 border border-gray-200 rounded items-center">
      <form className="flex items-center pb-3">
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            onChange={handleChangeSearch}
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search by Title and press enter..."
            onKeyDown={handleKeySearch}
          />
        </div>
      </form>
      <div className="flex flex-wrap shadow-lg h-anotherContent p-4 border border-gray-200 rounded overflow-hidden hover:overflow-auto ">
        {ListVideoss.map((item) => {
          return (
            <Link to={`/videos/${item._id}`} key={item._id}>
              <div className="w-60 h-48 shadow-orange-50 rounded p-2">
                <img
                  src={item.videoUrlThumbnail[1]}
                  alt=""
                  className="h-36 mx-auto"
                />
                <span className="text-sm">{item.title}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ListVideos;
