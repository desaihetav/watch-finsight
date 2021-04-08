import { v4 as uuid } from "uuid";

const addToPlaylist = (state, videoId, playlistId) => ({
  ...state,
  playlists: state.playlists.map((playlistItem) => {
    return playlistItem.id === playlistId
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
    return playlistItem.id === playlistId
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
    case "TOGGLE_IN_PLAYLIST":
      const currentPlaylist = state.playlists.find(
        (playlistItem) => playlistItem.id === payload.playlistId
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
            id: uuid(),
            videos: [payload.videoId],
          },
        ],
      };
    case "UPDATE_PLAYLIST_NAME":
      return {
        ...state,
        playlists: state.playlists.map((playlistItem) =>
          playlistItem.id === payload.id
            ? { ...playlistItem, name: payload.name }
            : playlistItem
        ),
      };
    case "DELETE_PLAYLIST":
      return {
        ...state,
        playlists: state.playlists.filter(
          (playlistItem) => playlistItem.id !== payload.playlistId
        ),
      };
    default:
      return state;
  }
};

export const initialState = {
  videos: [],
  playlists: [
    {
      name: "Liked Videos",
      id: "liked",
      videos: [],
    },
    {
      name: "Saved Videos",
      id: "saved",
      videos: [],
    },
    {
      name: "Watch Later Videos",
      id: "watch-later",
      videos: [],
    },
  ],
  users: [
    {
      username: "admin",
      password: "admin",
      name: "Admin",
    },
    {
      username: "desaihetav",
      password: "pass123",
      name: "Hetav Desai",
    },
  ],
};
