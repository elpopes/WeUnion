import { useDispatch } from "react-redux";
import { deleteGrief } from "../../store/griefs";

const DeleteGriefButton = ({ griefId }) => {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(deleteGrief(griefId));
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Delete</button>
    </form>
  );
};

export default DeleteGriefButton;
