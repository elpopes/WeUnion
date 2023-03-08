import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserGriefs, clearGriefErrors } from "../../store/griefs";
import GriefBox from "../Griefs/GriefBox";
import "./Profile.css";
import ProfileImageController from "./UpdateProfileImage";
import MyUnion from "../Unions/MyUnion";
import DeleteGriefButton from "../Griefs/GriefDelete";
import DeleteUserButton from "./DeleteUser";

function Profile() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const [userGriefs, setUserGriefs] = useState([]);
  // const userGriefs = useSelector((state) => Object.values(state.griefs.user));
  const profileImageUrl = useSelector((state) => {
    return state.session.user.profileImageUrl;
  });

  useEffect(() => {
    dispatch(fetchUserGriefs(currentUser._id));
  }, [currentUser, dispatch]);

  const onDeleteGrief = (griefId) => {
    // Update userGriefs state after deleting a grief
    setUserGriefs(userGriefs.filter((grief) => grief._id !== griefId));
  };

  const griefs = useSelector((state) => state.griefs.user);

  useEffect(() => {
    setUserGriefs(Object.values(griefs));
  }, [griefs]);
  //   return () => dispatch(clearGriefErrors());
  // }, [currentUser, dispatch]);
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
                   <DeleteGriefButton griefId={grief._id} onDelete={onDeleteGrief} />
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
        <div>
          <DeleteUserButton userId={currentUser._id}></DeleteUserButton>
        </div>
      </div>
    </div>
  );
}

export default Profile;
