import "./index.css";
import { Routes, Route } from "react-router-dom";
import { Home, VideoDetails, Playlists, PlaylistDetails, Login } from "./pages";
import { Navbar } from "./components";
import { useEffect } from "react";
import axios from "axios";
import { useData } from "./context";
import { PrivateRoute } from "./api/ProtectedRoute";

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
  }, []);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/video/:videoId" element={<VideoDetails />}></Route>
        <Route path="/playlists" element={<Playlists />}></Route>
        <Route path="/login" element={<Login />} />
        <PrivateRoute
          path="/playlist/:playlistId"
          element={<PlaylistDetails />}
        ></PrivateRoute>
      </Routes>
    </div>
  );
}

export default App;
