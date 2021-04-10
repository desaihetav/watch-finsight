import "./index.css";
import { Routes, Route } from "react-router-dom";
import {
  Home,
  VideoDetails,
  Playlists,
  PlaylistDetails,
  Login,
  Signup,
} from "./pages";
import { Navbar, Footer } from "./components";
import { useEffect, useState } from "react";
import axios from "axios";
import { useData } from "./context";
import { PrivateRoute } from "./api/ProtectedRoute";

function App() {
  const { videos, dispatch } = useData();
  const [theme, setTheme] = useState("dark");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://watch-finsight.desaihetav.repl.co/videos"
      );
      dispatch({ type: "INITIALIZE_VIDEOS", payload: response.data });
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
    videos.length === 0 && fetchData();
    initializeTheme();
  }, []);

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
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
