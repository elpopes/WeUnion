import { useState } from "react";

function UnionBox({ union: { name, _id } }) {
  const unionId = _id;
  return (
    <div className="union">
      <div className="union-text">
        <h3>{name}</h3>
      </div>
    </div>
  );
}

export default UnionBox;
