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
import Modal from "react-modal";

const customStyles = {
  content: {
    backgroundColor: "skyblue",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    border: "none",
    borderRadius: "10px",
    outline: "none",
    width: "15%",
    height: "10%",
    top: "25%",
    left: "40%",
  },
};

const DeleteGriefButton = ({ griefId }) => {
  const dispatch = useDispatch();
  //   const [isDeleting, setIsDeleting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // setIsDeleting(true);
    setShowModal(true);
    await dispatch(deleteGrief(griefId));
    // Wait a short amount of time before reloading the page to allow the deletion message to display
    setTimeout(() => {
      window.location.reload();
    }, 400);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <button className="grief-delete-button" type="submit">
          Delete
        </button>
      </form>
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        style={customStyles}
        ariaHideApp={false}
      >
        <p style={{ fontSize: "13px", fontFamily: "" }}>
          Deleting Grievance...
        </p>
      </Modal>
    </>
  );
};

export default DeleteGriefButton;
