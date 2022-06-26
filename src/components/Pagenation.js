
import { Link, useParams } from "react-router-dom";

function Pagenation(props ) {
  const params = useParams();
  const current = params.pageid || '1';
  const range = props.totalCount;
  return (
    <ul>
      {current > 1 ? <Link to={`/page/${Number(current) - 1}`}><li>prev({Number(current) - 1})</li></Link> : ''}
      <li>現在のページ({Number(current)})</li>
      {current < range ? <Link to={`/page/${Number(current) + 1}`}><li>next({Number(current) + 1})</li></Link> : ''}
    </ul>
  )
}
export default Pagenation;