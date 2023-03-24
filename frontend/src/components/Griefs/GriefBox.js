import "./GriefBox.css";
import { useState } from "react";

function GriefBox({ grief: { text, author, poll } }) {
  const username = author ? author.username : "Author Unknown";
  const profileImageUrl = author
    ? author.profileImageUrl
    : "https://we-union-id-photos.s3.amazonaws.com/public/blank-profile-picture-g1eb6c33f6_1280.png";

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const handleOptionClick = (optionId) => {
    if (selectedOptions.includes(optionId)) {
      setSelectedOptions(selectedOptions.filter((id) => id !== optionId));
      setSelectedOption(null);
    } else {
      setSelectedOptions([...selectedOptions, optionId]);
      setSelectedOption(optionId);
    }
  };

  return (
    <div className="grief">
      <div className="grief-image">
        <img src={profileImageUrl} alt="Profile" />
      </div>
      <div className="grief-text">
        <h3>{username}</h3>
        <p>{text}</p>
        {poll && poll.options && (
          <div>
            <h4>{poll.question}</h4>
            <div className="poll-options">
              {poll.options.map((option) => (
                <button
                  key={option._id}
                  onClick={() => handleOptionClick(option._id)}
                  className={
                    selectedOptions.includes(option._id) ? "selected" : ""
                  }
                >
                  {option.option}
                </button>
              ))}
            </div>
            {selectedOption && (
              <div>
                You selected:{" "}
                {
                  poll.options.find((option) => option._id === selectedOption)
                    .option
                }
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default GriefBox;
