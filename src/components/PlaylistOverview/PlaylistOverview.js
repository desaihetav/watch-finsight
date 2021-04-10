import { Link } from "react-router-dom";
import { VideoOverviewCard } from "../../components";
import styles from "./PlaylistOverview.module.css";

const PlaylistOverview = ({ playlist }) => {
  return (
    <div className={`${styles.container} flex flex-col`}>
      <div className={`flex items-center justify-between mb-2`}>
        <div className={``}>
          <h2 className={`${styles.title}`}>{playlist.name}</h2>
          {playlist.videos.length !== 0 && (
            <span className={`${styles.subtitle}`}>
              {playlist.videos.length} videos
            </span>
          )}
        </div>
        <Link
          className={`btn btn-ghost btn-small btn-icon`}
          to={`/playlist/${playlist.id}`}
        >
          <span class="material-icons-outlined">launch</span>
          {/* <img
            alt="right arrow"
            className={`btn-icon-right`}
            src={rightArrow}
          ></img> */}
        </Link>
      </div>
      {/* {/* <div className="divider"></div> */}
      <div className="space-y-1"></div>
      <div className={`flex overflow-auto`}>
        {playlist.videos.length !== 0 ? (
          playlist.videos
            .slice(0, 5)
            .map((videoItem) => <VideoOverviewCard videoId={videoItem} />)
        ) : (
          <div
            className={`text-center flex justify-center items-center w-full my-4`}
          >
            <h3 className={`${styles.subtitle}`}>No videos in this playlist</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaylistOverview;
