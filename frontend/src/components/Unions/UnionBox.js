import { Link } from "react-router-dom";
import { fetchUnionMembers } from "../../store/unions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "./UnionBox.css";

function UnionBox({ union: { name, _id } }) {
  const dispatch = useDispatch();

  
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
