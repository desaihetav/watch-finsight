import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useData } from "../../context/DataContext";
import { VideoCard } from "../../components";
import styles from "./PlaylistDetails.module.css";

export default function PlaylistDetails() {
  const { playlistId } = useParams();
  const { playlists, dispatch } = useData();
  const playlist = playlists.find(
    (playlistItem) => playlistItem.id === playlistId
  );

  const [isEditMode, setIsEditMode] = useState(false);
  const [playlistName, setPlaylistName] = useState(playlist.name);
  const playlistNameEl = useRef(null);

  const editBtnClickHandler = () => {
    if (!isEditMode) {
      playlistNameEl.current.focus();
    } else {
      dispatch({
        type: "UPDATE_PLAYLIST_NAME",
        payload: { id: playlist.id, name: playlistName },
      });
    }
    setIsEditMode((isEditMode) => !isEditMode);
  };

  return (
    <div className={`container`}>
      <div className="space-y-1"></div>
      <div className="space-y-1"></div>
      <div className={`flex justify-between items-center`}>
        <input
          contentEditable
          ref={playlistNameEl}
          className={`${styles.name}`}
          value={playlistName}
          onChange={(e) => setPlaylistName(() => e.target.value)}
        />

        <div className={`flex`}>
          <button
            onClick={() => editBtnClickHandler()}
            className={`btn btn-icon btn-small ${
              isEditMode ? "btn-solid" : "btn-ghost"
            }`}
          >
            <span class="material-icons-outlined">
              {isEditMode ? "done" : "edit"}
            </span>
          </button>
          <button className="btn btn-icon btn-small btn-ghost">
            <span class="material-icons-outlined">delete</span>
          </button>
        </div>
      </div>
      <ul className="flex flex-col w-full">
        {playlist.videos.map((videoItem) => (
          <li className="w-full">
            <VideoCard videoId={videoItem} />
          </li>
        ))}
      </ul>
    </div>
  );
}
