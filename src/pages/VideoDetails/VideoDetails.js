import { useParams } from "react-router-dom";
import { useData } from "../../context/DataContext";
import ReactPlayer from "react-player";
import styles from "./VideoDetails.module.css";

export default function VideoDetails() {
  const { videos } = useData();
  const { videoId } = useParams();
  const video = videos.find((videoItem) => videoItem.id === videoId);
  return (
    <div>
      {video && (
        <div className={`${styles.container}`}>
          <div className={`${styles.reactPlayer}`}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${video.id}`}
              className={`${styles.reactPlayer}`}
              width="100%"
              height="100%"
              controls
              playing
              pip
            />
          </div>
          <div className="container">
            <div className={`grid ${styles.contentGrid}`}>
              <div>
                <div className="flex items-center py-4">
                  <img
                    alt=""
                    className={`avatar ${styles.avatarImage}`}
                    src={video.channelImageURL}
                  />
                  <div className="space-x-0-5"></div>
                  <div>
                    <h2 className={`${styles.channelName}`}>
                      {video.channelName}
                    </h2>
                    <p className={`${styles.subs}`}>25K subscribers</p>
                  </div>
                </div>
                <h1 className={`my-0 ${styles.title}`}>{video.title}</h1>
                <p className={`${styles.description}`}>{video.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
