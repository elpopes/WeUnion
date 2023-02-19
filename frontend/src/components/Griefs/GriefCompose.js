import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearGriefErrors, composeGrief } from "../../store/griefs";
import GriefBox from "./GriefBox";
import "./GriefCompose.css";

function GriefCompose() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const author = useSelector((state) => state.session.user);
  const newGrief = useSelector((state) => state.griefs.new);
  const errors = useSelector((state) => state.errors.griefs);

  useEffect(() => {
    return () => dispatch(clearGriefErrors());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(composeGrief({ text }));
    setText("");
  };

  const update = (e) => setText(e.currentTarget.value);

  return (
    <>
      <form className="compose-grief" onSubmit={handleSubmit}>
        <input
          type="textarea"
          value={text}
          onChange={update}
          placeholder="Air your grievance..."
          required
        />
        <div className="errors">{errors?.text}</div>
        <input type="submit" value="Submit" />
      </form>
      <div className="grief-preview">
        <h3>Grievance Preview</h3>
        {text ? <GriefBox grief={{ text, author }} /> : undefined}
      </div>
      <div className="previous-grief">
        <h3>Previous Grievance</h3>
        {newGrief ? <GriefBox grief={newGrief} /> : undefined}
      </div>
    </>
  );
}

export default GriefCompose;
