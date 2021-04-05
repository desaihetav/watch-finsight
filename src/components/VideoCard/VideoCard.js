import styles from "./VideoCard.module.css";

export default function VideoCard({ video }) {
  const {
    title,
    description,
    thumbnailURL,
    channelName,
    published_date,
    duration,
  } = video;
  return (
    <div className={`${styles.cardContainer}`}>
      <div className={`${styles.card}`}>
        <img alt="" src={thumbnailURL} className={`${styles.cardImage}`} />

        <div className={`${styles.cardContent}`}>
          {/* <div class="card-badge">
            <span>new</span>
          </div> */}
          <p className={`${styles.cardSubtitle}`}>
            {channelName} • {published_date}
          </p>

          <h3 className={`${styles.cardTitle}`}>{title}</h3>

          <p className={`${styles.cardDescription}`}>
            Timeless lessons on wealth, greed, and happiness doing well with
            money isn’t necessarily about what you know. It’s about how you
            behave. And behavior is hard to teach, even to really smart people.
          </p>
          <div className={`${styles.cardStats} row`}>
            <span class="material-icons-round">schedule</span>
            <div class="space-x-0-5"></div>
            <span class="">{duration}</span>
            <div class="space-x-1"></div>
            <span class="material-icons-round">visibility</span>
            <div class="space-x-0-5"></div>
            <span class="">257 views</span>
            <div class="space-x-1"></div>
            <span class="material-icons-round">favorite</span>
            <div class="space-x-0-5"></div>
            <span class="">100 likes</span>
          </div>
        </div>
      </div>
    </div>
  );
}
