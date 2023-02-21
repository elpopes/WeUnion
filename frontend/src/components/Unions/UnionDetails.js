import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUnion, getUnion } from "../../store/unions";
// import Griefs from "../Griefs/Griefs";
// import GriefCompose from "../Griefs/GriefCompose";
// import GriefBox from "../Griefs/GriefBox";

const UnionDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // extract unionId parameter from URL
  const union = useSelector(getUnion(id));

  //   const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    dispatch(fetchUnion(id));
  }, [dispatch, id]);

  //   if (!loaded || !union) {
  //     return null;
  //   }

  return (
    <div>
      <h1>YOUR MAMA</h1>
      <h1>{union.name}</h1>
      {/* <Griefs />
      <GriefCompose />
      <GriefBox /> */}
    </div>
  );
};

export default UnionDetails;
