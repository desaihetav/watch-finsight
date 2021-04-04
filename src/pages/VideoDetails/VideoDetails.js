import { useParams } from "react-router-dom";

export default function VideoDetails() {
  const { videoId } = useParams();
  return <div>VideoDetails {videoId}</div>;
}
