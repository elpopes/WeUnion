import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUnions } from "../../store/unions";
import UnionBox from "./UnionBox";

const UnionsIndex = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const unions = Object.values(state.unions.all);

  useEffect(() => {
    dispatch(fetchUnions());
  }, [dispatch]);

  return (
    <div className="union-index-container">
      <h2>All Unions</h2>
      <div className="union-index">
        {unions.map((union) => (
          <UnionBox key={union._id} union={union} />
        ))}
      </div>
    </div>
  );
};

export default UnionsIndex;
