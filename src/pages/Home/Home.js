import { useEffect } from "react";
import axios from "axios";
import { useData } from "../../context/DataContext";
import { HomeHeader, VideoCard } from "../../components";

export default function Home() {
  const { videos, dispatch } = useData();

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(
  //       "https://watch-finsight-default-rtdb.firebaseio.com/videos.json"
  //     );
  //     dispatch({ type: "INITIALIZE_VIDEOS", payload: response.data });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   videos.length === 0 && fetchData();
  // }, []);

  return (
    <div>
      <HomeHeader />
      <div className="space-y-1"></div>
      <div className="space-y-1"></div>
      <div className="container">
        <h1>All Videos</h1>
        {videos.map((videoItem) => (
          <VideoCard videoId={videoItem.id} />
        ))}
      </div>
    </div>
  );
}
