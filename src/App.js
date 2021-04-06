import "./index.css";
import { Routes, Route } from "react-router-dom";
import { Home, CategoryList, CategoryDetails, VideoDetails } from "./pages";
import { Navbar } from "./components";
import { useEffect } from "react";
import axios from "axios";
import { useData } from "./context/DataContext";

function App() {
  const { videos, dispatch } = useData();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://watch-finsight-default-rtdb.firebaseio.com/videos.json"
      );
      dispatch({ type: "INITIALIZE_VIDEOS", payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    videos.length === 0 && fetchData();
    console.log(videos);
  }, []);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/categories" element={<CategoryList />}></Route>
        <Route
          path="/category/:categoryId"
          element={<CategoryDetails />}
        ></Route>
        <Route path="/video/:videoId" element={<VideoDetails />}></Route>
      </Routes>
    </div>
  );
}

export default App;
