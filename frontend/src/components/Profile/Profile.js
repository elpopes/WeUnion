import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserGriefs, clearGriefErrors } from "../../store/griefs";
import GriefBox from "../Griefs/GriefBox";
import "./Profile.css";
import ProfileImageController from "./UpdateProfileImage";
import MyUnion from "../Unions/MyUnion";
import DeleteGriefButton from "../Griefs/GriefDelete";

function Profile() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);

  const userGriefs = useSelector((state) => Object.values(state.griefs.user));
  const profileImageUrl = useSelector((state) => {
    return state.session.user.profileImageUrl;
  });

  useEffect(() => {
    dispatch(fetchUserGriefs(currentUser._id));

    return () => dispatch(clearGriefErrors());
  }, [currentUser, dispatch]);
  return (
    <div>
      <div className="page-container">
        <div className="profile-page-left-side">
          {userGriefs.length === 0 ? (
            <h1>{currentUser.username} has no Grievances</h1>
          ) : (
            <>
              <h1>All of {currentUser.username}'s Grievances</h1>
              {userGriefs.map((grief) => (
                <div key={grief._id}>
                  <DeleteGriefButton griefId={grief._id} />
                  <GriefBox grief={grief} />
                </div>
              ))}
            </>
          )}
        </div>
        <div className="profile-page-right-side">
          <div className="member-title">
            {currentUser.username}'s Member Card
          </div>
          <div className="profile-box">
            <ProfileImageController profileImageUrl={profileImageUrl} />
            <MyUnion />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
