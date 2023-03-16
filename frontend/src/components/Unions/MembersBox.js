import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUnionMembers } from "../../store/users";
// import MemberBox from "./MemberBox";
// import "./Members.css";

function Members({ unionId }) {

  const dispatch = useDispatch();
  // debugger
  const state = useSelector((state) => state);
    // debugger;
  const members = Object.values(state.members || {});

  useEffect(() => {
    dispatch(fetchUnionMembers(unionId));
  }, [dispatch]);
  // debugger;
  
  return (
    <>
      <h2 className="all-members-show">All Union Members</h2>
      <div className="all-members-container">
        {members
          ? members.map((member) => <p key={member._id}>{member.username}</p>)
          : null}
      </div>
    </>
  );
}

export default Members;
