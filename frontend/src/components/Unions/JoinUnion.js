import { useState } from "react";
import jwtFetch from "../../store/jwt";
import { useSelector } from "react-redux";

const JoinUnion = ({ union }) => {
  const unionId = union._id;
  const user = useSelector((state) => state.session.user);

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
        setButtonText("Joined!");
      } else {
        setButtonText("Error");
      }
    } catch (e) {
      console.error(e);
      setButtonText("Error");
    }
  };

  return (
    <button onClick={joinUnion} disabled={buttonText === "Joined!"}>
      {buttonText}
    </button>
  );
};

export default JoinUnion;
