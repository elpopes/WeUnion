import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../store/session";

function ProfileImageController() {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const profileImageUrl = useSelector(state => state.session.user.profileImageUrl);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { image };
    dispatch(updateUserProfile(user));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <img className="profile-image" src={profileImageUrl} alt="profile" />
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
  );
}

export default ProfileImageController;
