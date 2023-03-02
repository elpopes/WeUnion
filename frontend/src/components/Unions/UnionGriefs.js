import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUnionGriefs, clearGriefErrors } from "../../store/griefs";
import { useParams } from "react-router-dom";
import GriefBox from "../Griefs/GriefBox";
// import "./UnionProfile.css";

function UnionGriefs({ unionId }) {
  const dispatch = useDispatch();

  const { id } = useParams();

  const unionGriefs = useSelector((state) => {
    return Object.values(state.griefs);
    // .filter((grief) => {

    //   return grief.union === unionId;
    // });
  });

  useEffect(() => {
    dispatch(fetchUnionGriefs(id));
    return () => dispatch(clearGriefErrors());
  }, [id, dispatch]);

  if (Object.values(unionGriefs[2]).length === 0) {
    return <div>No grievances currently available...</div>;
  }
  return (
    <div className="union-griefs-container">
      {unionGriefs[2].length === 0 ? (
        <h1>No grievances for this union</h1>
      ) : (
        <>
          <h1>All grievances for this union</h1>
          {unionGriefs[2].map((grief) => (
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
