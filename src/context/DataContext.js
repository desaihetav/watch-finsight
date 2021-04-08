import { createContext, useContext, useReducer } from "react";
import { reducerFunc, initialState } from "../reducer/reducer";

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducerFunc, initialState);
  return (
    <DataContext.Provider
      value={{
        videos: state.videos,
        playlists: state.playlists,
        users: state.users,
        dispatch,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
