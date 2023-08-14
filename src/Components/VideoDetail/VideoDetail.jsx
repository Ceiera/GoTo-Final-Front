import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from 'moment';
const VideoDetail = () => {
  const { video_Id } = useParams();
  const [video, setVideo] = useState([]);
  const [products, setProducts] = useState([]);
  const [comments, setComments] = useState([]);
  const [username, setUsername] = useState("");
  const [komentar, setKomentar] = useState("");
  const [playId, setPlayId] = useState("");
  const getVideoDetail = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API}/videos/${video_Id}`
    );
    const data = await response.json();
    setVideo(data.data[0]);
    setPlayId(data.data[0].videoUrl.split("v=")[1]);
  };

  const getComments = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API}/comments?videoId=${video_Id}`
    );
    const data = await response.json();
    setComments(data.data);
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleKomentar = (e) => {
    setKomentar(e.target.value);
  };

  const postComment = async (e) => {
    e.preventDefault();
    console.log(video._id, username, komentar);
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          videoId: video._id,
          username: username,
          comment: komentar
        })
      }
    );
    const data = await response.json();
    if (data.status === 'failed') {
      alert('Error when posting comment');
    }
    getComments();
  };

  const getProducts = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API}/products?videoId=${video_Id}`
    );
    const data = await response.json();
    setProducts(data.data);
  }

  useEffect(() => {
    getVideoDetail();
    getComments();
    getProducts();
  }, []);
  
  return (
    <>
      <div className="grid gap-4 grid-cols-content shadow-lg h-content p-4 border border-gray-200 rounded">
        <div className=" shadow-lg border-gray-200 border-4 rounded overflow-hidden hover:overflow-y-auto h-[33rem]">
          {products.map((product) => (
            <a href={product.productUrl} key={product._id} className="shadow-md m-2 grid grid-rows-[auto_auto] gap-1">
              <p className="font-bold h-auto">{product.title}</p>
              <div className="grid grid-cols-[40%_60%]">
                <img src={product.imageUrl} className="h-24"alt="" />
                <div className="grid grid-rows-2 items-center">
                  <p className="text-xs line-through">Rp.{product.price}</p>
                  <p className="text-md font-bold text-red-500">Rp.{product.price - (product.price * (product.discount / 100))}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
        <div>
          <iframe
            className="h-[33rem] w-full"
            src={`https://www.youtube.com/embed/${playId}?autoplay=0`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <div className="grid grid-rows-[auto_150px] gap-y-3.5 h-[30rem]">
          <div className=" bg-white border-gray-200 rounded border-4 text-left overflow-hidden hover:overflow-y-auto h-[23rem]">
            {comments.map((comment) => (
              <div key={comment._id} className="bg-gray-100 m-2">
                <p className="font-bold"><span className="font-normal">from: </span>{comment.username}</p>
                <p className="py-2">{comment.comment}</p>
                <p className="text-right text-xs" >{moment({...comment.createdAt}).format('DD MMM YYYY')}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-rows-3 gap-y-2">
            <input
              onChange={handleUsername}
              type="text"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="username"
              id="usernames"
            />
            <input
              onChange={handleKomentar}
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="your comment"
              id="comments"
            />
            <button className="bg-blue-500 rounded text-white" onClick={postComment}>Submit</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoDetail;
