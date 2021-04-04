import { Routes, Route, Link } from "react-router-dom";
import { Home, CategoryList, CategoryDetails, VideoDetails } from "./pages";

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/categories">CategoryList</Link>
        <Link to="/category/category-id">CategoryDetails</Link>
        <Link to="/video/video-id">VideoDetails</Link>
      </nav>
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
