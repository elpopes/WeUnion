import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUnionMembers } from "../../store/users";
import "./Members.css";

function Members({ unionId }) {
  const dispatch = useDispatch();
  const { new: members } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUnionMembers(unionId));
  }, [dispatch, unionId]);

  return (
    <>
      <h2 className="all-members-show">All Union Members</h2>
      <div className="all-members-container">
        {members
          ? members.map((member) => (
              <div key={member._id} className="member-item">
                <img
                  src={member.profileImageUrl}
                  alt={`${member.username}'s profile`}
                  className="member-profile-image"
                />
                <p>{member.username}</p>
              </div>
            ))
          : null}
      </div>
    </>
  );
}

export default Members;
