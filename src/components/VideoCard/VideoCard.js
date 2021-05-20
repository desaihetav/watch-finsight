import styles from "./VideoCard.module.css";
import { Link } from "react-router-dom";
import { useData } from "../../context";

export default function VideoCard({ videoItemId }) {
  const { videos } = useData();
  const findVideoById = () =>
    videos?.find((videoItem) => videoItem.videoId === videoItemId);
  const {
    videoId,
    thumbnailURL,
    channelName,
    publishedDate,
    title,
    description,
    duration,
  } = findVideoById();

  return (
    <Link to={`/video/${videoId}`} className="w-full">
      <div className={`${styles.cardContainer}`}>
        <div className={`${styles.card}`}>
          <img alt="" src={thumbnailURL} className={`${styles.cardImage}`} />

          <div className={`${styles.cardContent}`}>
            <p className={`${styles.cardSubtitle}`}>
              {channelName} • {publishedDate}
            </p>

            <h3 className={`${styles.cardTitle}`}>{title}</h3>

            <p className={`${styles.cardDescription}`}>{description}</p>
            <div className={`${styles.cardStats} row`}>
              <span className="material-icons-round">schedule</span>
              <div className="space-x-0-5"></div>
              <span className="">{duration}</span>
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
  );
}
