import "./index.css";
import { Routes, Route } from "react-router-dom";
import {
  Home,
  VideoDetails,
  Playlists,
  PlaylistDetails,
  Login,
  Signup,
  Account,
} from "./pages";
import { Navbar, Footer } from "./components";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth, useData } from "./context";
import { PrivateRoute } from "./api/ProtectedRoute";

function App() {
  const { videos, dispatch } = useData();
  const { user } = useAuth();
  const [theme, setTheme] = useState("dark");

  const fetchVideosData = async () => {
    try {
      const response = await axios.get(
        "https://watch-finsight.desaihetav.repl.co/videos"
      );
      dispatch({ type: "INITIALIZE_VIDEOS", payload: response.data.videos });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPlaylistsData = async () => {
    try {
      const response = await axios.get(
        `https://watch-finsight.desaihetav.repl.co/playlists/${user._id}`
      );
      dispatch({
        type: "INITIALIZE_PLAYLISTS",
        payload: response.data.playlists,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const initializeTheme = () => {
    const currentTheme = localStorage.getItem("theme")
      ? localStorage.getItem("theme")
      : null;

    if (currentTheme) {
      document.documentElement.setAttribute("data-theme", currentTheme);
      setTheme(currentTheme);
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
  };

  useEffect(() => {
    fetchVideosData();
    initializeTheme();
  }, []);

  useEffect(() => {
    user && fetchPlaylistsData();
  }, [user]);

  return (
    <div>
      <Navbar theme={theme} setTheme={setTheme} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/video/:videoId" element={<VideoDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <PrivateRoute path="/playlists" element={<Playlists />} />
        <PrivateRoute
          path="/playlist/:playlistId"
          element={<PlaylistDetails />}
        />
        <PrivateRoute path="/account" element={<Account />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
