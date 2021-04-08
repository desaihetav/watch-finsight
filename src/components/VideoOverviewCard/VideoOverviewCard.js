import { useData } from "../../context";
import styles from "./VideoOverviewCard.module.css";
import { Link } from "react-router-dom";

const VideoOverviewCard = ({ videoId }) => {
  const { videos } = useData();

  const findVideoById = () => videos.find((video) => video.id === videoId);

  const { id, title, thumbnailURL, channelName } = findVideoById();

  return (
    <Link to={`/video/${id}`} className={`flex flex-col ${styles.card}`}>
      <img alt={title} src={thumbnailURL} className={`${styles.thumbnail}`} />
      <div className={`${styles.content}`}>
        <span className={`${styles.title}`}>{title}</span>
        <span className={`${styles.subtitle}`}>{channelName}</span>
      </div>
    </Link>
  );
};

export default VideoOverviewCard;
