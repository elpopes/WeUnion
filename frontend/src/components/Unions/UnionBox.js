import { Link } from "react-router-dom";
import "./UnionBox.css";

function UnionBox({ union: { name, _id } }) {
  const unionId = _id;
  return (
    <Link to={`/unions/${unionId}`}>
      <div className="union">
        <div className="union-text">
          <h3>{name}</h3>
        </div>
      </div>
    </Link>
  );
}

export default UnionBox;
