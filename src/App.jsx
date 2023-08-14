import "./App.css";
import NavBar from "./Components/NavBar/NavBar";
import ListVideos from "./Components/ListVideos/ListVideos";
import VideoDetail from "./Components/VideoDetail/VideoDetail";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/videos/:video_Id",
    element: <div><NavBar /><VideoDetail /></div>
  },
  {
    path: "/",
    element: <div><NavBar /><ListVideos /></div>
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
