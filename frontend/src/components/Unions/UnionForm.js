import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUnion } from "../../store/unions";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import "./UnionForm.css";

const UnionForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const newUnion = useSelector((state) =>
    state.unions ? Object.values(state.unions)[0] : null
  );
  const member = useSelector((state) => state.session.user);
  const [data, setData] = useState({
    name: "",
    member: member,
  });

  useEffect(() => {
    if (newUnion) {
      history.push(`/unions/${newUnion._id}`);
    }
  }, [newUnion, history]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setData((prevState) => ({
      ...prevState,
      member: member,
    }));

    dispatch(createUnion(data));
  };

  return (
    <div className="create-union-background">
      <div className="union-form-container">
        <form onSubmit={handleSubmit}>
          <label className="union-label">Name Your Revolution!</label>
          <input
            className="union-form-input"
            type="text"
            name="name"
            value={data.name}
            onChange={handleInputChange}
            placeholder="Union Name"
          />
          <button className="union-form-button" type="submit">
            Create Union
          </button>
        </form>
      </div>
    </div>
  );
};

export default UnionForm;
