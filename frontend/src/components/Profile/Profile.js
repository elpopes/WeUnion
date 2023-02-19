import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserGriefs, clearGriefErrors } from "../../store/griefs";
import GriefBox from "../Griefs/GriefBox";

function Profile() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const userGriefs = useSelector((state) => Object.values(state.griefs.user));

  useEffect(() => {
    dispatch(fetchUserGriefs(currentUser._id));
    return () => dispatch(clearGriefErrors());
  }, [currentUser, dispatch]);

  if (userGriefs.length === 0) {
    return <div>{currentUser.username} has no Grievances</div>;
  } else {
    return (
      <>
        <h2>All of {currentUser.username}'s Grievances</h2>
        {userGriefs.map((grief) => (
          <GriefBox key={grief._id} grief={grief} />
        ))}
      </>
    );
  }
}

export default Profile;
