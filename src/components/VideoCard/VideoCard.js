import styles from "./VideoCard.module.css";
import { Link } from "react-router-dom";
import { useData } from "../../context";

export default function VideoCard({ videoItemId }) {
  const { videos } = useData();
  const video = videos.find((videoItem) => videoItem._id === videoItemId);

  return video ? (
    <Link to={`/video/${video.videoId}`} className="w-full">
      <div className={`${styles.cardContainer}`}>
        <div className={`${styles.card}`}>
          <img
            alt=""
            src={video.thumbnailURL}
            className={`${styles.cardImage}`}
          />

          <div className={`${styles.cardContent}`}>
            <p className={`${styles.cardSubtitle}`}>
              {video.channelName} • {video.publishedDate}
            </p>

            <h3 className={`${styles.cardTitle}`}>{video.title}</h3>

            <p className={`${styles.cardDescription}`}>{video.description}</p>
            <div className={`${styles.cardStats} row`}>
              <span className="material-icons-round">schedule</span>
              <div className="space-x-0-5"></div>
              <span className="">{video.duration}</span>
              <div className="space-x-1"></div>
              <span className="material-icons-round">visibility</span>
              <div className="space-x-0-5"></div>
              <span className="">257 views</span>
              <div className="space-x-1"></div>
              <span className="material-icons-round">favorite</span>
              <div className="space-x-0-5"></div>
              <span className="">100 likes</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  ) : (
    <h1>Loading...</h1>
  );
}
