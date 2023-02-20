import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUnion } from "../../store/unions";

const UnionForm = () => {
  const dispatch = useDispatch();
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
    dispatch(createUnion(data));
  }


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
