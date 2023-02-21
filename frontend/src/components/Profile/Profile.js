// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchUserGriefs, clearGriefErrors } from "../../store/griefs";
// import GriefBox from "../Griefs/GriefBox";


// function Profile() {
//   const dispatch = useDispatch();
//   const currentUser = useSelector((state) => state.session.user);
//   const userGriefs = useSelector((state) => Object.values(state.griefs.user));
//   const [image, setImage] = useState(null);
//   // const { profileImageUrl } = currentUser;

//   useEffect(() => {
//     dispatch(fetchUserGriefs(currentUser._id));
//     return () => dispatch(clearGriefErrors());
//   }, [currentUser, dispatch]);

//   if (userGriefs.length === 0) {
//     return <div>{currentUser.username} has no Grievances</div>;
//   } else {
//     return (
//       <>
//       <header>
//          Hello {currentUser.username}
//          {currentUser.profileImageUrl ?
//           <img className="profile-image" src={currentUser.profileImageUrl} alt="profile"/> :
//           undefined
//         }
//       </header>
//         <h2>All of {currentUser.username}'s Grievances</h2>
//         {userGriefs.map((grief) => (
//           <GriefBox key={grief._id} grief={grief} />
//         ))}
//       </>
//     );
//   }
// }

// export default Profile;


import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserGriefs,
  clearGriefErrors,
} from "../../store/griefs";
import GriefBox from "../Griefs/GriefBox";
import { updateUserProfile } from "../../store/session";

function Profile() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const userGriefs = useSelector((state) =>
    Object.values(state.griefs.user)
  );
  const profileImageUrl = useSelector(
    (state) => state.session.user.profileImageUrl
  );
  const [image, setImage] = useState(null);

  useEffect(() => {
    dispatch(fetchUserGriefs(currentUser._id));
    return () => dispatch(clearGriefErrors());
  }, [currentUser, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      // email: currentUser.email,
      // username: currentUser.username,
      image: image,
      // password: "",
    };
    dispatch(updateUserProfile(user));
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    setImage(e.target.files[0]);
  };

  if (userGriefs.length === 0) {
    return <div>{currentUser.username} has no Grievances</div>;
  } else {
    return (
      <>
      <div className="whole_page">
        <header>
          Hello {currentUser.username}
          {image ? (
            <img
              className="profile-image"
              src={URL.createObjectURL(image)}
              alt="profile"
            />
          ) : profileImageUrl ? (
            <img
              className="profile-image"
              src={profileImageUrl}
              alt="profile"
            />
          ) : (
            undefined
          )}
          <form onSubmit={handleSubmit}>
            <label htmlFor="image">
              Change Profile Image
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
              />
            </label>
            <button type="submit">Save</button>
          </form>
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
