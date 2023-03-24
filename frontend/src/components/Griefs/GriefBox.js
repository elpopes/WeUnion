import "./GriefBox.css";
import { useState } from "react";

function GriefBox({ grief: { text, author, poll } }) {
  const username = author ? author.username : "Author Unknown";
  const profileImageUrl = author
    ? author.profileImageUrl
    : "https://we-union-id-photos.s3.amazonaws.com/public/blank-profile-picture-g1eb6c33f6_1280.png";

  const [selectedOption, setSelectedOption] = useState(null);
  const [votes, setVotes] = useState(poll ? poll.votes : 0);

  const handleOptionClick = (optionId) => {
    // Clear selected option
    setSelectedOption(null);

    // Increase poll votes by 1 for selected option
    setVotes(votes + 1);

    // Select clicked option
    setSelectedOption(optionId);
  };
  
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(composeGrief({ votes }));
  //   setText("");
    
  //   // if (newUnion) {
  //   //   history.push(`/unions/${newUnion._id}`);
  //   // }
  // };

  return (
    <div className="grief">
      <div className="grief-image">
        <img src={profileImageUrl} alt="Profile" />
      </div>
      <div className="grief-text">
        <h3>{username}</h3>
        <p>{text}</p>
        {poll && (
          <div>
            <h4>{poll.question}</h4>
            <div className="poll-options">
              {poll.options.map((option) => (
                <div key={option._id}>
                  <button
                    onClick={() => handleOptionClick(option._id)}
                    className={
                      selectedOption === option._id ? "selected" : ""
                    }
                  >
                    {option.option}
                  </button>
                </div>
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
            <div>
              Total votes: {votes}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GriefBox;
