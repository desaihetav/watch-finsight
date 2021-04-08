import { useData } from "../../context/DataContext";
import { PlaylistOverview } from "../../components";

export default function Playlists() {
  const { playlists } = useData();
  return (
    <div className="container">
      <h1 className="my-8">Playlists</h1>
      {playlists &&
        playlists.map((playlistItem) => (
          <PlaylistOverview playlist={playlistItem} />
        ))}
    </div>
  );
}
