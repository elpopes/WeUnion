import { useState, useEffect } from "react"; // Add useEffect
import jwtFetch from "../../store/jwt";
import { useDispatch, useSelector } from "react-redux";
import { fetchUnionMembers } from "../../store/users";

const JoinUnion = ({ union }) => {
  const unionId = union._id;
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [buttonText, setButtonText] = useState("Join Union");

  const joinUnion = async () => {
    setButtonText("Joining...");

    try {
      const res = await jwtFetch(`/api/unionMembers/union/${unionId}/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          unionId,
        }),
      });

      if (res.ok) {
        setButtonText("Leave Union"); // Change the button text to "Leave Union" if the user successfully joins
      } else {
        setButtonText("Error");
      }
    } catch (e) {
      console.error(e);
      setButtonText("Error");
    }
  };

  const leaveUnion = async () => {
    setButtonText("Leaving...");

    try {
      const res = await jwtFetch(`/api/unionMembers/union/${unionId}/leave`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          unionId,
        }),
      });

      if (res.ok) {
        setButtonText("Join Union"); // Change the button text back to "Join Union" if the user successfully leaves
      } else {
        setButtonText("Error");
      }
    } catch (e) {
      console.error(e);
      setButtonText("Error");
    }
  };

 // Use useEffect to check if the user is already a member of the union and update the button text accordingly
 useEffect(() => {
  const checkMembership = async () => {
    try {
      const members = await dispatch(fetchUnionMembers(unionId));
      console.log("members:", members);
      const memberIndex = members.findIndex((member) => member._id === user.id);
      const isMember = memberIndex !== -1;        
      if (isMember) {
        debugger
        setButtonText("Leave Union");
      } else {
        setButtonText("Join Union");
      }
    } catch (e) {
      console.error(e);
      setButtonText("Join Union");
    }
  };
  // Check that unionId and user.id are defined before calling checkMembership
  if (unionId && user.id) {
    checkMembership();
  }
}, [dispatch, unionId, user.id]);

  
  

  // Change the onClick handler to call either joinUnion or leaveUnion depending on the button text
  const handleClick = () => {
    if (buttonText === "Join Union") {
      joinUnion();
    } else if (buttonText === "Leave Union") {
      leaveUnion();
    }
  };

  return (
    <button onClick={handleClick} disabled={buttonText === "Joined!" || buttonText === "Leaving..."}>
      {buttonText}
    </button>
  );
};

export default JoinUnion;
