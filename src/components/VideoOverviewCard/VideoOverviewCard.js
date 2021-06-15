import { useData } from "../../context";
import styles from "./VideoOverviewCard.module.css";
import { Link } from "react-router-dom";

const VideoOverviewCard = ({ videoId }) => {
  const { videos } = useData();
  const video = videos.find((video) => video._id === videoId);
  return video ? (
    <Link
      to={`/video/${video.videoId}`}
      className={`flex flex-col ${styles.card}`}
    >
      <img
        alt={video.title}
        src={video.thumbnailURL}
        className={`${styles.thumbnail}`}
      />
      <div className={`${styles.content}`}>
        <span className={`${styles.title}`}>{video.title}</span>
        <span className={`${styles.subtitle}`}>{video.channelName}</span>
      </div>
    </Link>
  ) : (
    <></>
  );
};

export default VideoOverviewCard;
