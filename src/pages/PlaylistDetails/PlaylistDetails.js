import { useParams } from "react-router-dom";
import { useData } from "../../context/DataContext";
import { VideoCard } from "../../components";

export default function PlaylistDetails() {
  const { playlistId } = useParams();
  const { playlists } = useData();
  const playlist = playlists.find(
    (playlistItem) => playlistItem.id === playlistId
  );
  return (
    <div className={`container`}>
      <div className="space-y-1"></div>
      <div className="space-y-1"></div>
      <h1>{playlist.name}</h1>
      {playlist.videos.map((videoItem) => (
        <VideoCard videoId={videoItem} />
      ))}
    </div>
  );
}
