const addToPlaylist = (state, videoId, playlistId) => ({
  ...state,
  playlists: state.playlists.map((playlistItem) => {
    return playlistItem._id === playlistId
      ? {
          ...playlistItem,
          videos: [...playlistItem.videos, videoId],
        }
      : playlistItem;
  }),
});

const removeFromPlaylist = (state, videoId, playlistId) => ({
  ...state,
  playlists: state.playlists.map((playlistItem) => {
    return playlistItem._id === playlistId
      ? {
          ...playlistItem,
          videos: playlistItem.videos.filter(
            (videoItem) => videoItem !== videoId
          ),
        }
      : playlistItem;
  }),
});

export const reducerFunc = (state, { type, payload }) => {
  switch (type) {
    case "INITIALIZE_VIDEOS":
      return { ...state, videos: payload };
    case "INITIALIZE_PLAYLISTS":
      return { ...state, playlists: payload };
    case "TOGGLE_IN_PLAYLIST":
      const currentPlaylist = state.playlists.find(
        (playlistItem) => playlistItem._id === payload.playlistId
      );
      const isInPlaylist = currentPlaylist.videos.find(
        (videoItem) => videoItem === payload.videoId
      );
      return isInPlaylist
        ? removeFromPlaylist(state, payload.videoId, payload.playlistId)
        : addToPlaylist(state, payload.videoId, payload.playlistId);
    case "CREATE_PLAYLIST":
      return {
        ...state,
        playlists: [
          ...state.playlists,
          {
            name: payload.playlistName,
            _id: payload._id,
            videos: [payload.videoId],
          },
        ],
      };
    case "UPDATE_PLAYLIST_NAME":
      return {
        ...state,
        playlists: state.playlists.map((playlistItem) =>
          playlistItem._id === payload._id
            ? { ...playlistItem, name: payload.name }
            : playlistItem
        ),
      };
    case "DELETE_PLAYLIST":
      return {
        ...state,
        playlists: state.playlists.filter(
          (playlistItem) => playlistItem._id !== payload.playlistId
        ),
      };
    case "CLEAR_PLAYLISTS":
      return {
        ...state,
        playlists: [],
      };
    default:
      return state;
  }
};

export const initialState = {
  videos: [],
  playlists: [],
};
