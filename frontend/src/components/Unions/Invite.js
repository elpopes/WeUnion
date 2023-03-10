import { useState } from "react";
import jwtFetch from "../../store/jwt";
import { useSelector } from "react-redux";

const InviteButton = ({ union }) => {
  const unionName = union.name;
  const unionId = union._id;
  const [email, setEmail] = useState("");
  const [isInvited, setIsInvited] = useState(false);
  const currentUser = useSelector((state) => state.session.user);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await jwtFetch("/api/invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          unionName,
          unionId,
          inviterName: currentUser.username,
        }),
      });

      if (response.ok) {
        setIsInvited(true);
        setEmail("");
      } else {
        throw new Error("An error occurred while sending the invitation.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <form className="invite-form" onSubmit={handleSubmit}>
      <label htmlFor="email">E-Mail Address:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        required
        onChange={handleEmailChange}
        className="invite-input"
      />
      <button className="invite-button" type="submit">
        Invite
      </button>
      {isInvited && <p>Invited</p>}
    </form>
  );
};

export default InviteButton;
