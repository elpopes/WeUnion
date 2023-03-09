import { Link } from "react-router-dom";
import "./UnionBox.css";

function UnionBox({ union: { name, _id } }) {
  const unionId = _id;
  return (
    <div className="union">
      <div className="union-text">
        <h3>
          <Link to={`/unions/${unionId}`}>{name}</Link>
        </h3>
      </div>
    </div>
  );
}

export default UnionBox;
