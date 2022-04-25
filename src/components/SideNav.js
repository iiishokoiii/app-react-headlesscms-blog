import { Link } from "react-router-dom";
import { cagtegoryList } from "../config";

export default function SideNav() {
  return (
    <ul>
    {cagtegoryList.map((item, i) => (
    <li
    key={i}
    >
    <Link to={`/category/${item}/page/1`}>
      <p>{item}</p>
    </Link>
    </li>
    ))}
    </ul>
  )
}
