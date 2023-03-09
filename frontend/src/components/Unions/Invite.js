import { useState } from "react";

const InviteButton = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isInvited, setIsInvited] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(`Invited phone number: ${phoneNumber}`);
    setIsInvited(true);
    setPhoneNumber("");
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  return (
    <form className="invite-form" onSubmit={handleSubmit}>
      <label>Phone number:</label>
      <input
        type="tel"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        className="invite-input"
      />
      <button className="invite-button" type="submit">Invite</button>
      {isInvited && <p>Invited</p>}
    </form>
  );
};

export default InviteButton;
