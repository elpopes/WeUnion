import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUnion } from "../../store/unions";
import Griefs from "../Griefs/Griefs";
import GriefCompose from "../Griefs/GriefCompose";
import GriefBox from "../Griefs/GriefBox";
import NavBar from "../NavBar/NavBar";

const UnionDetails = () => {
  const dispatch = useDispatch();
  const { unionId } = useParams();
  const union = useSelector((state) => state.union);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    dispatch(fetchUnion(unionId)).then(() => setLoaded(true));
  }, [dispatch, unionId]);

  if (!loaded) {
    return null;
  }

  return (
    <div>
      <NavBar />
      <h1>{union.name}</h1>
      <Griefs />
      <GriefCompose />
      <GriefBox />
    </div>
  );
};

export default UnionDetails;
