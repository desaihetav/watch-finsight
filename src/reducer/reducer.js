export const reducerFunc = (state, { type, payload }) => {
  switch (type) {
    case "INITIALIZE_VIDEOS":
      return { ...state, videos: payload };
    default:
      return state;
  }
};

export const initialState = {
  videos: [],
};
