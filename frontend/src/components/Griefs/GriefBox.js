import "./GriefBox.css";
import { useState } from "react";

function GriefBox({ grief: { text, author, poll } }) {
  const { username } = author;
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (optionId) => {
    if (selectedOptions.includes(optionId)) {
      // If the option is already selected, remove it from the array
      setSelectedOptions(selectedOptions.filter((id) => id !== optionId));
      setSelectedOption(null); // Clear the selected option
    } else {
      // If the option is not selected, add it to the array and set it as the selected option
      setSelectedOptions([...selectedOptions, optionId]);
      setSelectedOption(optionId);
    }
  };

  return (
    <div className="grief">
      <h3>{username}</h3>
      <p>{text}</p>
      {poll && (
        <div>
          <h4>{poll.question}</h4>
          {poll.options.map((option) => (
            <button
              key={option._id}
              onClick={() => handleOptionClick(option._id)}
              className={selectedOptions.includes(option._id) ? "selected" : ""}
            >
              {option.option}
            </button>
          ))}
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
  );
}

export default GriefBox;
