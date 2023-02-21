import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUnion } from "../../store/unions";
import { Route, Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

const UnionForm = ({ union }) => {
  const dispatch = useDispatch();
  const member = useSelector((state) => state.session.user);
  const [data, setData] = useState({
    name: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    data.member = member;
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
