import { reducerFunc } from "./reducer";

describe("testing playlist actions", () => {
  it("should add video to playlist if not present, and remove otherwise", () => {
    const initialState = {
      playlists: [
        {
          _id: "60c7d95f27c795016c451ff9",
          videos: ["60a28213e34fd5043f59b446"],
        },
      ],
    };
    const payload1 = {
      videoId: "60a28213e34fd5043f59b446",
      playlistId: "60c7d95f27c795016c451ff9",
    };
    const action1 = {
      type: "TOGGLE_IN_PLAYLIST",
      payload: payload1,
    };

    const state = reducerFunc(initialState, action1);
    expect(state).toEqual({
      playlists: [
        {
          _id: "60c7d95f27c795016c451ff9",
          videos: [],
        },
      ],
    });

    const payload2 = {
      videoId: "60a28213e34fd5043f59b489",
      playlistId: "60c7d95f27c795016c451ff9",
    };
    const action2 = {
      type: "TOGGLE_IN_PLAYLIST",
      payload: payload2,
    };
    const state2 = reducerFunc(initialState, action2);
    expect(state2).toEqual({
      playlists: [
        {
          _id: "60c7d95f27c795016c451ff9",
          videos: ["60a28213e34fd5043f59b446", "60a28213e34fd5043f59b489"],
        },
      ],
    });
  });

  it("should create new playlist", () => {
    const initialState = {
      playlists: [],
    };

    const newPlaylist = {
      _id: "60c7d95f27c795016c45a8r4",
      playlistName: "Test Playlist",
      videoId: "60a28213e34fd5043f59b446",
    };

    const action = {
      type: "CREATE_PLAYLIST",
      payload: newPlaylist,
    };

    const state = reducerFunc(initialState, action);
    expect(state).toEqual({
      playlists: [
        {
          _id: "60c7d95f27c795016c45a8r4",
          name: "Test Playlist",
          videos: ["60a28213e34fd5043f59b446"],
        },
      ],
    });
  });

  it("should update playlist name", () => {
    const initialState = {
      playlists: [
        {
          _id: "60c7d95f27c795016c45a8r4",
          name: "Test Playlist",
          videos: ["60a28213e34fd5043f59b446"],
        },
      ],
    };

    const payload = {
      _id: "60c7d95f27c795016c45a8r4",
      name: "Test Playlist Updated",
    };

    const action = {
      type: "UPDATE_PLAYLIST_NAME",
      payload,
    };

    const state = reducerFunc(initialState, action);

    expect(state).toEqual({
      playlists: [
        {
          _id: "60c7d95f27c795016c45a8r4",
          name: "Test Playlist Updated",
          videos: ["60a28213e34fd5043f59b446"],
        },
      ],
    });
  });

  it("should delete playlist", () => {
    const initialState = {
      playlists: [
        {
          _id: "60c7d95f27c795016c45a8r4",
          name: "Test Playlist",
          videos: ["60a28213e34fd5043f59b446"],
        },
      ],
    };

    const payload = {
      playlistId: "60c7d95f27c795016c45a8r4",
    };

    const action = {
      type: "DELETE_PLAYLIST",
      payload,
    };

    const state = reducerFunc(initialState, action);

    expect(state).toEqual({
      playlists: [],
    });
  });
});
