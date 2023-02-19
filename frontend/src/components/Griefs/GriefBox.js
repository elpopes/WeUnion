import "./GriefBox.css";

function GriefBox({ grief: { text, author } }) {
  const { username } = author;
  return (
    <div className="grief">
      <h3>{username}</h3>
      <p>{text}</p>
    </div>
  );
}

export default GriefBox;
