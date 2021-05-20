import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useData, useAuth } from "../../context";
import ReactPlayer from "react-player";
import styles from "./VideoDetails.module.css";
import axios from "axios";

export default function VideoDetails() {
  const { videos, playlists, dispatch } = useData();
  const { videoId } = useParams();
  const [newPlaylistInput, setNewPlaylistInput] = useState("");
  const [showPlaylistMenu, setShowPlaylistMenu] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user } = useAuth();

  const togglePlaylistMenu = () => {
    user
      ? setShowPlaylistMenu((showPlaylistMenu) => !showPlaylistMenu)
      : setShowAuthModal(true);
  };

  const video = videos?.find((videoItem) => videoItem.videoId === videoId);

  const getPlaylistById = (id) => {
    return playlists.filter((playlistItem) => playlistItem._id === id)?.[0];
  };

  const getPlaylistByName = (name) => {
    return playlists.filter((playlistItem) => playlistItem.name === name)?.[0];
  };

  const isInPlaylistByName = (playlistName) => {
    const playlist = getPlaylistByName(playlistName);
    return playlist.videos.find((videoItem) => videoItem._id === video._id);
  };

  const isInPlaylistById = (playlistId) => {
    const playlist = getPlaylistById(playlistId);
    return playlist.videos.find((videoItem) => videoItem._id === video._id);
  };

  const createPlaylist = async (e) => {
    e.preventDefault();
    setNewPlaylistInput("");
    if (newPlaylistInput && !getPlaylistByName(newPlaylistInput)) {
      const newPlaylistResponse = await axios.post(
        `https://watch-finsight.desaihetav.repl.co/playlists`,
        {
          owner: user._id,
          name: newPlaylistInput,
          videos: [video._id],
        }
      );
      dispatch({
        type: "CREATE_PLAYLIST",
        payload: {
          _id: newPlaylistResponse.data.playlist._id,
          playlistName: newPlaylistInput,
          videoId: video._id,
        },
      });
    }
  };

  const toggleInPlaylist = async (playlistId) => {
    if (!user) {
      return setShowAuthModal(true);
    }
    dispatch({
      type: "TOGGLE_IN_PLAYLIST",
      payload: { videoId: video._id, playlistId: playlistId },
    });
    const toggleInPlaylistResponse = await axios.post(
      `https://watch-finsight.desaihetav.repl.co/playlists/${playlistId}`,
      {
        videoId: video._id,
      }
    );
  };

  return videos.length && playlists.length ? (
    <div>
      {showAuthModal && (
        <AuthModal setShowAuthModal={setShowAuthModal} dispatch={dispatch} />
      )}
      {video && (
        <div className={`${styles.container}`}>
          <div className={`${styles.reactPlayer}`}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${video.videoId}`}
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
                    onClick={() =>
                      toggleInPlaylist(getPlaylistByName("Saved Videos")._id)
                    }
                    className={`btn btn-ghost btn-icon btn-small`}
                  >
                    <span className={`material-icons-round`}>
                      {isInPlaylistByName("Saved Videos")
                        ? "bookmark"
                        : "bookmark_border"}
                    </span>
                  </button>
                  <button
                    onClick={() =>
                      toggleInPlaylist(getPlaylistByName("Liked Videos")._id)
                    }
                    className={`btn btn-ghost btn-icon btn-small`}
                  >
                    <span className={`material-icons-round`}>
                      {isInPlaylistByName("Liked Videos")
                        ? "favorite"
                        : "favorite_border"}
                    </span>
                  </button>
                  <button
                    onClick={() =>
                      toggleInPlaylist(
                        getPlaylistByName("Watch Later Videos")._id
                      )
                    }
                    className={`btn btn-ghost btn-icon btn-small`}
                  >
                    <span
                      className={`${
                        isInPlaylistByName("Watch Later Videos")
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
                            playlists.map((playlistItem) => (
                              <li
                                key={playlistItem._id}
                                className={`${styles.playlistMenuItem}`}
                              >
                                <input
                                  checked={isInPlaylistById(playlistItem._id)}
                                  type="checkbox"
                                  onChange={() =>
                                    toggleInPlaylist(playlistItem._id)
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
                                className={`${styles.newPlaylistInput} input-field`}
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
                      <span>{video.viewCount} views</span>
                    </div>
                    <div
                      className={`flex items-center flex-1 justify-between ${styles.statItem}`}
                    >
                      <span className={`material-icons-round ${styles.icon}`}>
                        favorite
                      </span>
                      <div className={`space-x-0-5`}></div>
                      <span>{video.likeCount} likes</span>
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
                      <span>{video.commentCount} comments</span>
                    </div>
                    <div
                      className={`flex items-center flex-1 justify-between ${styles.statItem}`}
                    >
                      <span className={`material-icons-round ${styles.icon}`}>
                        timelapse
                      </span>
                      <div className={`space-x-0-5`}></div>
                      <span>{video.publishedDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <h1>Loading...</h1>
  );
}

const AuthModal = ({ setShowAuthModal }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className={`${styles.modalOuter}`}>
      <div className={`${styles.modalInner}`}>
        <h2>Uh Oh!</h2>
        <p>You need to login in order to add videos to your playlists.</p>
        <div className="flex items-center justify-center">
          <button
            onClick={() => setShowAuthModal(false)}
            className="btn btn-outlined btn-small"
          >
            Cancel
          </button>
          <button
            onClick={() => navigate("/login", { state: { from: pathname } })}
            className="btn btn-solid btn-small"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
