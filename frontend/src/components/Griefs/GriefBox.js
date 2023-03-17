import "./GriefBox.css";
import { useState } from "react";
import PollOptions from "../Poll/PollOptions";

function GriefBox({ grief: { text, author, poll } }) {
  const username = author ? author.username : "Author Unknown";
  const profileImageUrl = author
    ? author.profileImageUrl
    : "https://we-union-id-photos.s3.amazonaws.com/public/blank-profile-picture-g1eb6c33f6_1280.png";

  return (
    <div className="grief">
      <div className="grief-image">
        <img src={profileImageUrl} alt="Profile" />
      </div>
      <div className="grief-text">
        <h3>{username}</h3>
        <p>{text}</p>
      </div>
      {poll && <PollOptions options={poll.options} />}
    </div>
  );
}

export default GriefBox;
