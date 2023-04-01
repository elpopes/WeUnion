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
  const [imageChanged, setImageChanged] = useState(false);
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
      setImageChanged(true);
    };
    if (imageFile) {
      reader.readAsDataURL(imageFile);
    } else {
      setPreviewImage(null);
      setImageChanged(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {previewImage ? (
        <img className="profile-image" src={previewImage} alt="Preview" />
      ) : (
        <img className="profile-image" src={profileImageUrl} alt="Profile" />
      )}
      <div
        style={{
          marginLeft: "10px",
          marginBottom: "-10px",
          height: "20px",
          width: "50px",
        }}
      >
        <label
          htmlFor="image"
          style={{ marginBottom: "-10px", cursor: "pointer" }}
        >
          <FontAwesomeIcon icon={faImage} />
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </label>
        {imageChanged && (
          <button
            type="submit"
            style={{
              width: "20px",
              height: "20px",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            <FontAwesomeIcon
              icon={faSave}
              style={{ width: "16px", height: "16px" }}
            />
          </button>
        )}
      </div>
    </form>
  );
}

export default ProfileImageController;
