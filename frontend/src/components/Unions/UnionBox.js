import { Link } from "react-router-dom";

function UnionBox({ union: { name, _id } }) {
  const unionId = _id;
  return (
    <div className="union">
      <div className="union-text">
        <h3>
          <Link to={`/unions/${unionId}`}>{name}</Link>
        </h3>
        <Link to={`/unions/${unionId}`}>Visit Union</Link>
      </div>
    </div>
  );
}

export default UnionBox;
