import { useParams } from "react-router-dom";

export default function CategoryDetails() {
  const { categoryId } = useParams();
  return <div>CategoryDetails {categoryId}</div>;
}
