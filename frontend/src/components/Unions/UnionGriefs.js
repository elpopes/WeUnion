import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUnionGriefs, clearGriefErrors } from "../../store/griefs";
import GriefBox from "../Griefs/GriefBox";
// import "./UnionProfile.css";

function UnionGriefs({ unionId }) {
  const dispatch = useDispatch();

  const unionGriefs = useSelector((state) => {
    debugger;
    const unionGriefs = Object.values(state.griefs.union);
    return unionGriefs;
  });

  useEffect(() => {
    dispatch(fetchUnionGriefs(unionId));

    return () => dispatch(clearGriefErrors());
  }, [unionId, dispatch]);

  return (
    <div className="union-griefs-container">
      {unionGriefs.length === 0 ? (
        <h1>No grievances for this union</h1>
      ) : (
        <>
          <h1>All grievances for this union</h1>
          {unionGriefs.map((grief) => (
            <div key={grief._id}>
              <GriefBox grief={grief} />
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default UnionGriefs;
