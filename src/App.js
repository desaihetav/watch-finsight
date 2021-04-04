import "./index.css";
import { Routes, Route, Link } from "react-router-dom";
import { Home, CategoryList, CategoryDetails, VideoDetails } from "./pages";
import { Navbar } from "./components";

function App() {
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
