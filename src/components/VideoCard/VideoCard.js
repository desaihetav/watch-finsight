import styles from "./VideoCard.module.css";
import { Link } from "react-router-dom";

export default function VideoCard({ video }) {
  const {
    id,
    title,
    description,
    thumbnailURL,
    channelName,
    published_date,
    duration,
  } = video;
  return (
    <Link to={`video/${id}`}>
      <div className={`${styles.cardContainer}`}>
        <div className={`${styles.card}`}>
          <img alt="" src={thumbnailURL} className={`${styles.cardImage}`} />

          <div className={`${styles.cardContent}`}>
            {/* <div className="card-badge">
            <span>new</span>
          </div> */}
            <p className={`${styles.cardSubtitle}`}>
              {channelName} • {published_date}
            </p>

            <h3 className={`${styles.cardTitle}`}>{title}</h3>

            <p className={`${styles.cardDescription}`}>
              Timeless lessons on wealth, greed, and happiness doing well with
              money isn’t necessarily about what you know. It’s about how you
              behave. And behavior is hard to teach, even to really smart
              people.
            </p>
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
