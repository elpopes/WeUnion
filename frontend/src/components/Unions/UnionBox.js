import { Link } from "react-router-dom";
import "./UnionBox.css";

function UnionBox({ union: { name, _id } }) {
  const unionId = _id;
  return (
    <Link to={`/unions/${unionId}`}>
      <div className="union">
        <div>
          <h3 className="union-text">{name}</h3>
        </div>
      </div>
    </Link>
  );
}

export default UnionBox;
