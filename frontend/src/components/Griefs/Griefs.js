import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearGriefErrors, fetchGriefs } from "../../store/griefs";
import GriefBox from "./GriefBox";
import UnionForm from "../Unions/UnionForm";

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
      <UnionForm />
      <h2>All Grievances</h2>
      {griefs.map((grief) => (
        <GriefBox key={grief._id} grief={grief} />
      ))}
    </>
  );
}

export default Griefs;
