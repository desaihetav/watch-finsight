import { useState } from "react";
import { useParams } from "react-router-dom";
import { useData } from "../../context/DataContext";
import ReactPlayer from "react-player";
import styles from "./VideoDetails.module.css";

export default function VideoDetails() {
  const { videos, playlists, dispatch } = useData();
  const { videoId } = useParams();
  const [newPlaylistInput, setNewPlaylistInput] = useState("");

  const [showPlaylistMenu, setShowPlaylistMenu] = useState(false);
  const togglePlaylistMenu = () =>
    setShowPlaylistMenu((showPlaylistMenu) => !showPlaylistMenu);

  const video = videos.find((videoItem) => videoItem.id === videoId);

  const getPlaylistById = (id) =>
    playlists.filter((playlistItem) => playlistItem.id === id)?.[0];

  const getPlaylistByName = (name) =>
    playlists.filter((playlistItem) => playlistItem.name === name)?.[0];

  const isInPlaylist = (playlistId, videoId) => {
    const playlist = getPlaylistById(playlistId);
    return playlist.videos.find((videoItem) => videoItem === video.id);
  };

  const createPlaylist = (e) => {
    e.preventDefault();
    setNewPlaylistInput("");
    newPlaylistInput &&
      !getPlaylistByName(newPlaylistInput) &&
      dispatch({
        type: "CREATE_PLAYLIST",
        payload: { playlistName: newPlaylistInput, videoId: video.id },
      });
  };

  // const isSaved = getPlaylistById("saved").videos.find(
  //   (videoItem) => videoItem === video.id
  // );
  // const isLiked = getPlaylistById("liked").videos.find(
  //   (videoItem) => videoItem === video.id
  // );
  // const isWatchLater = getPlaylistById("watch-later").videos.find(
  //   (videoItem) => videoItem === video.id
  // );

  const toggleInPlaylist = (playlistId) => {
    dispatch({
      type: "TOGGLE_IN_PLAYLIST",
      payload: { videoId: video.id, playlistId: playlistId },
    });
  };

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
              pip
            />
          </div>
          <div className="container">
            <div className={`${styles.contentGrid} items-start`}>
              <div className={`${styles.flexLeft}`}>
                <div className="flex items-center mb-4">
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
                <h1 className={`${styles.title}`}>{video.title}</h1>
                <p className={`${styles.description}`}>{video.description}</p>
              </div>

              <div
                className={`flex flex-col w-full justify-start ${styles.flexRight}`}
              >
                <div
                  className={`flex flex-wrap justify-around ${styles.buttonBar}`}
                >
                  <button
                    onClick={() => toggleInPlaylist("saved")}
                    className={`btn btn-ghost btn-icon btn-small`}
                  >
                    <span className={`material-icons-round`}>
                      {isInPlaylist("saved") ? "bookmark" : "bookmark_border"}
                    </span>
                  </button>
                  <button
                    onClick={() => toggleInPlaylist("liked")}
                    className={`btn btn-ghost btn-icon btn-small`}
                  >
                    <span className={`material-icons-round`}>
                      {isInPlaylist("liked") ? "favorite" : "favorite_border"}
                    </span>
                  </button>
                  <button
                    onClick={() => toggleInPlaylist("watch-later")}
                    className={`btn btn-ghost btn-icon btn-small`}
                  >
                    <span
                      className={`${
                        isInPlaylist("watch-later")
                          ? "material-icons"
                          : "material-icons-outlined"
                      }`}
                    >
                      watch_later
                    </span>
                  </button>
                  <div className="relative">
                    <button
                      onClick={togglePlaylistMenu}
                      className={`btn btn-ghost btn-icon btn-small`}
                    >
                      <span className={`material-icons-round`}>
                        playlist_add
                      </span>
                    </button>
                    {showPlaylistMenu && (
                      <div className={`${styles.playlistMenu}`}>
                        <ul>
                          {playlists &&
                            playlists.map((playlistItem, idx) => (
                              <li className={`${styles.playlistMenuItem}`}>
                                <input
                                  checked={isInPlaylist(playlistItem.id)}
                                  type="checkbox"
                                  onChange={() =>
                                    toggleInPlaylist(playlistItem.id)
                                  }
                                  className="mr-4"
                                />
                                <span>{playlistItem.name}</span>
                              </li>
                            ))}
                          <li
                            className={`${styles.playlistMenuItem} flex items-center`}
                          >
                            <form
                              onSubmit={(e) => createPlaylist(e)}
                              className="flex items-center"
                            >
                              <input
                                className={`${styles.newPlaylistInput}`}
                                value={newPlaylistInput}
                                onChange={(e) =>
                                  setNewPlaylistInput(() => e.target.value)
                                }
                                type="text"
                              />
                              <button
                                className={`btn btn-small btn-ghost btn-icon flex-0 ${styles.addIcon} inline`}
                              >
                                <span className={`material-icons-outlined`}>
                                  add
                                </span>
                              </button>
                            </form>
                          </li>
                          <li>
                            <button
                              onClick={togglePlaylistMenu}
                              className="btn btn-ghost btn-small w-full"
                            >
                              Close
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap">
                  <div
                    className={`flex justify-around py-2 ${styles.stats} w-full`}
                  >
                    <div
                      className={`flex items-center flex-1 justify-between ${styles.statItem}`}
                    >
                      <span className={`material-icons-round ${styles.icon}`}>
                        visibility
                      </span>
                      <div className={`space-x-0-5`}></div>
                      <span>{video.statistics.viewCount} views</span>
                    </div>
                    <div
                      className={`flex items-center flex-1 justify-between ${styles.statItem}`}
                    >
                      <span className={`material-icons-round ${styles.icon}`}>
                        favorite
                      </span>
                      <div className={`space-x-0-5`}></div>
                      <span>{video.statistics.likeCount} likes</span>
                    </div>
                  </div>
                  <div
                    className={`flex justify-around py-2 ${styles.stats} w-full`}
                  >
                    <div
                      className={`flex items-center flex-1 justify-between ${styles.statItem}`}
                    >
                      <span className={`material-icons-round ${styles.icon}`}>
                        forum
                      </span>
                      <div className={`space-x-0-5`}></div>
                      <span>{video.statistics.commentCount} comments</span>
                    </div>
                    <div
                      className={`flex items-center flex-1 justify-between ${styles.statItem}`}
                    >
                      <span className={`material-icons-round ${styles.icon}`}>
                        timelapse
                      </span>
                      <div className={`space-x-0-5`}></div>
                      <span>{video.published_date}</span>
                    </div>
                  </div>
                </div>
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
