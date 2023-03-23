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
    
    // if (newUnion) {
    //   history.push(`/unions/${newUnion._id}`);
    // }
  };

  const update = (e) => setText(e.currentTarget.value);

  return (
    <div className="compose-grief-background">
      <div className="compose-grief-container">
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
        <div className="pp-grief-container">
          {text && (
            <div className="grief-preview-container">
              <h3 className="gp">Grievance Preview</h3>
              <div className="grief-preview">
                <GriefBox grief={{ text, author }} />
              </div>
            </div>
          )}
          {newGrief && (
            <div className="previous-grief-container">
              <h3 className="pg">Previous Grievance</h3>
              <div className="previous-grief">
                <GriefBox grief={newGrief} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GriefCompose;
