import { useDispatch } from "react-redux";
// import { deleteGrief } from "../../store/griefs";
import { logout } from "../../store/session";
import jwtFetch from "../../store/jwt";

const DeleteUserButton = ({ userId }) => {
  const dispatch = useDispatch();

  const handleDeleteUser = async () => {
    try {
      await jwtFetch(`/api/users/${userId}`, { method: "DELETE" });
      dispatch(logout());
    } catch (err) {
      console.error(err);
    }
  };

  if (userId === "6425b7a2dfd65fcd6c6e0788") {
    return null;
  }

  return <button onClick={handleDeleteUser}>Delete weUnion</button>;
};

export default DeleteUserButton;
