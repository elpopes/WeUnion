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

  if (userId === "6409f00915accf294f76e355") {
    return null;
  }

  return <button onClick={handleDeleteUser}>Delete weUnion</button>;
};

export default DeleteUserButton;
