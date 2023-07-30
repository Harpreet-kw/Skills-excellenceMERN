import {formatISO9075} from "date-fns";
import {Link} from "react-router-dom";
import { apiUrl } from "./utils/settings";

export default function Job({_id,title,summary,cover,content,createdAt}) {

  return (
    <div className="job">
      <div className="image">
        <Link to={`/job/${_id}`}>
          <img className="JobImg" src={`${apiUrl}/`+cover} alt=""/>
        </Link>
      </div>
      <div className="texts">
        <Link to={`/job/${_id}`}>
        <h2>{title}</h2>
        </Link>
        <p className="info">
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
}