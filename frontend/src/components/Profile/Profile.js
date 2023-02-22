import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserGriefs, clearGriefErrors } from "../../store/griefs";
import GriefBox from "../Griefs/GriefBox";
import "./Profile.css";
import ProfileImageController from "./UpdateProfileImage";

function Profile() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  debugger;
  const userGriefs = useSelector((state) => Object.values(state.griefs.user));
  const profileImageUrl = useSelector((state) => {
    // debugger;
    return state.session.user.profileImageUrl;
  });

  useEffect(() => {
    dispatch(fetchUserGriefs(currentUser._id));
    debugger;
    return () => dispatch(clearGriefErrors());
  }, [currentUser, dispatch]);

  if (userGriefs.length < 0) {
    return <div>{currentUser.username} has no Grievances</div>;
  } else {
    return (
      <>
        <div className="whole_page">
          <header>
            Hello {currentUser.username}
            <ProfileImageController profileImageUrl={profileImageUrl} />
          </header>
          <h2>All of {currentUser.username}'s Grievances</h2>
          {userGriefs.map((grief) => (
            <GriefBox key={grief._id} grief={grief} />
          ))}
        </div>
      </>
    );
  }
}

export default Profile;
