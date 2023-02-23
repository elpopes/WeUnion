import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, updateUserProfile } from "../../store/session";
import { useEffect } from "react";

function ProfileImageController() {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const profileImageUrl = useSelector(
    (state) => state.session.user.profileImageUrl
  );

  useEffect(() => {
    dispatch(getCurrentUser);
  }, [dispatch]);

  const userId = useSelector((state) => state.session.user._id);
  //   debugger;
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { id: userId, image };
    // debugger;
    dispatch(updateUserProfile(user));
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setImage(imageFile);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    if (imageFile) {
      reader.readAsDataURL(imageFile);
    } else {
      setPreviewImage(null);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {previewImage ? (
        <img className="preview-image" src={previewImage} alt="Preview" />
      ) : (
        <img className="profile-image" src={profileImageUrl} alt="Profile" />
      )}
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
