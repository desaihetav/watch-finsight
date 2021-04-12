import { useState, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useData } from "../../context";
import { VideoCard } from "../../components";
import styles from "./PlaylistDetails.module.css";

export default function PlaylistDetails() {
  const { playlistId } = useParams();
  const { playlists, dispatch } = useData();
  const playlist = playlists.find(
    (playlistItem) => playlistItem.id === playlistId
  );

  const [showDeleteModal, setshowDeleteModal] = useState(false);
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
    <div className={`container relative ${styles.pageContainer}`}>
      {showDeleteModal && (
        <DeleteModal
          setshowDeleteModal={setshowDeleteModal}
          dispatch={dispatch}
          playlistId={playlistId}
        />
      )}
      <div className="space-y-1"></div>
      <div className="space-y-1"></div>
      <div className={`flex justify-between items-center`}>
        <input
          readOnly={!isEditMode}
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
          <button
            onClick={() => setshowDeleteModal(() => true)}
            className="btn btn-icon btn-small btn-ghost"
          >
            <span class="material-icons-outlined">delete</span>
          </button>
        </div>
      </div>
      <ul className="flex flex-col w-full">
        {playlist.videos.length !== 0 ? (
          playlist.videos.map((videoItem) => (
            <li className="w-full">
              <VideoCard videoId={videoItem} />
            </li>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center flex-grow-1">
            <h2 className={`w-full text-center my-8`}>
              No video is this playlist
            </h2>
            <Link to="/" className={`btn btn-solid`}>
              Explore
            </Link>
          </div>
        )}
      </ul>
    </div>
  );
}

const DeleteModal = ({ setshowDeleteModal, playlistId }) => {
  const { dispatch } = useData();
  const navigate = useNavigate();

  const isDefaultPlaylist = ["liked", "saved", "watch-later"].includes(
    playlistId
  );

  const modalTitle = isDefaultPlaylist ? "Uh Oh!" : "Are you sure?";
  const modalText = isDefaultPlaylist
    ? "You cannot delete a default playlist. You can remove videos from this playlist instead."
    : "Do you really want to delete your playlist? This will delete all your videos saved in the playlist. You cannot undo this action.";

  const deletePlaylist = () => {
    navigate("/playlists", { replace: true });
    dispatch({ type: "DELETE_PLAYLIST", payload: { playlistId } });
    setshowDeleteModal(() => false);
  };

  return (
    <div className={`${styles.modalOuter}`}>
      <div className={`${styles.modalInner}`}>
        <h2>{modalTitle}</h2>
        <p>{modalText}</p>
        <div className="flex items-center justify-center">
          <button
            onClick={() => setshowDeleteModal(false)}
            className="btn btn-outlined btn-small"
          >
            {isDefaultPlaylist ? "Okay" : "Cancel"}
          </button>
          {!isDefaultPlaylist && (
            <button
              onClick={deletePlaylist}
              className="btn btn-solid btn-small"
            >
              Yes, Delete Playlist
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
