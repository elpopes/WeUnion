import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUnionGriefs, clearGriefErrors } from "../../store/griefs";
import GriefBox from "../Griefs/GriefBox";
// import "./UnionProfile.css";

function UnionGriefs({ unionId }) {
  const dispatch = useDispatch();
  //   debugger;

  const unionGriefs = useSelector((state) => {
    return Object.values(state.griefs);
    // .filter((grief) => {
    //   debugger;
    //   return grief.union === unionId;
    // });
  });

  //   debugger;

  useEffect(() => {
    dispatch(fetchUnionGriefs(unionId));
    return () => dispatch(clearGriefErrors());
  }, [unionId, dispatch]);

  //   if (!unionGriefs) {
  //     return <div></div>;
  //   }
  debugger;
  return (
    <div className="union-griefs-container">
      {unionGriefs[1].length === 0 ? (
        <h1>No grievances for this union</h1>
      ) : (
        <>
          <h1>All grievances for this union</h1>
          {unionGriefs[1].map((grief) => (
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
