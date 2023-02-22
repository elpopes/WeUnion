import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUnion } from "../../store/unions";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

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
    // debugger;
    dispatch(createUnion(data));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={data.name}
        onChange={handleInputChange}
      />
      <button type="submit">Create Union</button>
    </form>
  );
};

export default UnionForm;
