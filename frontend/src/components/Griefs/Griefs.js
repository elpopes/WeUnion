import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearGriefErrors, fetchGriefs } from "../../store/griefs";
import GriefBox from "./GriefBox";
import "./Griefs.css";

function Griefs() {
  const dispatch = useDispatch();

  const state = useSelector((state) => state);

  const griefs = Object.values(state.griefs.all);

  //   const griefs = useSelector((state) => Object.values(state.griefs.all));

  useEffect(() => {
    dispatch(fetchGriefs());
    return () => dispatch(clearGriefErrors());
  }, [dispatch]);

  if (griefs.length === 0) return <div>There are no Grievances</div>;

  return (
    <>
      <h2 className="all-grievances-show">All Union Grievances</h2>
      <div className="all-grievances-container">
        {griefs.map((grief) => (
          <GriefBox key={grief._id} grief={grief} />
        ))}
      </div>
    </>
  );
}

export default Griefs;
