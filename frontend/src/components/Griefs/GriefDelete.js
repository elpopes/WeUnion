import { useDispatch } from "react-redux";
import { deleteGrief } from "../../store/griefs";

const DeleteGriefButton = ({ griefId }) => {
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await dispatch(deleteGrief(griefId));
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <button className="grief-delete-button" type="submit">
        Delete
      </button>
    </form>
  );
};

export default DeleteGriefButton;
