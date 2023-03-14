import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, updateUserProfile } from "../../store/session";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faImage } from "@fortawesome/free-solid-svg-icons";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { id: userId, image };

    dispatch(updateUserProfile(user));
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setImage(imageFile);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
      // window.location.reload();
    };
    if (imageFile) {
      reader.readAsDataURL(imageFile);
      // window.location.reload();

    } else {
      setPreviewImage(null);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {previewImage ? (
        <img className="profile-image" src={previewImage} alt="Preview" />
      ) : (
        <img className="profile-image" src={profileImageUrl} alt="Profile" />
      )}
      <label htmlFor="image">
        <FontAwesomeIcon icon={faImage} />
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
      </label>
      <button type="submit">
        <FontAwesomeIcon icon={faSave} />
      </button>
    </form>
  );
}

export default ProfileImageController;
