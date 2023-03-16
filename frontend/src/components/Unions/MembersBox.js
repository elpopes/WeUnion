import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../store/users";
// import MemberBox from "./MemberBox";
// import "./Members.css";

function Members( { membersArray }) {
  const dispatch = useDispatch();
  debugger
  const state = useSelector((state) => state);
  // debugger
  
  const members = state.unions._id || [];
   

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <>
      <h2 className="all-members-show">All Union Members</h2>
      <div className="all-members-container">
        {members ? members.map((member) => <p key={member._id}>{member.username}</p>) : null}
      </div>
    </>
  );
}

export default Members;
