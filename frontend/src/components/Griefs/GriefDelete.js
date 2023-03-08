// import { useDispatch } from "react-redux";
// import { deleteGrief } from "../../store/griefs";

// const DeleteGriefButton = ({ griefId }) => {
//   const dispatch = useDispatch();

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     dispatch(deleteGrief(griefId));
//     window.location.reload()
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <button className="grief-delete-button" type="submit">
//         Delete
//       </button>
//     </form>
//   );
// };

// export default DeleteGriefButton;


import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteGrief } from "../../store/griefs";
import { CSSTransition } from "react-transition-group";

const DeleteGriefButton = ({ griefId }) => {
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsDeleting(true);
    await dispatch(deleteGrief(griefId));
    document.body.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    document.body.innerHTML = "Deleting Grievance";
    // Wait a short amount of time before reloading the page to allow the deletion message to display
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CSSTransition
        in={!isDeleting}
        classNames="delete-button-animation"
        timeout={100}
        unmountOnExit
      >
        <button className="grief-delete-button" type="submit">
          Delete
        </button>
      </CSSTransition>
    </form>
  );
};

export default DeleteGriefButton;
