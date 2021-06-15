import { Route, Navigate, useParams } from "react-router-dom";

import { useAuth } from "../context";

export function PrivateRoute({ path, ...props }) {
  const { user } = useAuth();
  const { playlistId } = useParams();
  const actualPath = playlistId ? `/playlist/${playlistId}` : path;
  return user ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate state={{ from: actualPath }} replace to="/login" />
  );
}
