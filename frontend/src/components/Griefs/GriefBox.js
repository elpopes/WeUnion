import "./GriefBox.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePoll } from "../../store/polls";

function GriefBox({ grief: { text, author, poll } }) {
  const username = author ? author.username : "Author Unknown";
  const profileImageUrl = author
    ? author.profileImageUrl
    : "https://we-union-id-photos.s3.amazonaws.com/public/blank-profile-picture-g1eb6c33f6_1280.png";

  const [selectedOption, setSelectedOption] = useState(
    poll ? poll.selectedOption : null
  );
  // const [votes, setVotes] = useState(poll ? poll.votes : 0);
  const [votes, setVotes] = useState(
    poll && poll.options
      ? poll.options.reduce((sum, option) => sum + option.votes, 0)
      : 0
  );

  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false);

  const handleOptionClick = (optionId) => {
    if (selectedOption === optionId) {
      // User has already voted, do nothing
      return;
    }

    // Increase poll votes by 1 for selected option
    // setVotes(votes + 1);

    // Select clicked option
    setSelectedOption(optionId);
  };

  const handleSubmit = async () => {
    try {
      // Set submitting status to true
      setSubmitting(true);

      // Send API request to update poll with selected option
      await dispatch(updatePoll({ id: poll._id, votes, selectedOption }));

      // Reset form state
      setSubmitting(false);

      // Increase poll votes by 1 for selected option
      setVotes(votes);
      // window.location.reload();
    } catch (error) {
      // Handle submission error
      console.error(error);
      // Reset form state
      setSubmitting(false);
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
          <>
            <h4>{poll.question}</h4>
            <div className="poll-options">
              {poll.options.map((option) => (
                <div key={option._id}>
                  <button
                    onClick={() => handleOptionClick(option._id)}
                    className={selectedOption === option._id ? "selected" : ""}
                    // disabled={selectedOption && selectedOption !== option._id}
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
            <div>Total votes: {votes}</div>
            <button onClick={handleSubmit} disabled={submitting}>
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default GriefBox;
