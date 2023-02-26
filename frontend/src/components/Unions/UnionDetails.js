import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUnion, getUnion } from "../../store/unions";
import Griefs from "../Griefs/Griefs";
import InviteButton from "./Invite";

const UnionDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const union = useSelector(getUnion(id));
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUnionData() {
      try {
        await dispatch(fetchUnion(id));
        setLoaded(true);
      } catch (e) {
        setError(e);
      }
    }

    if (!union && id) {
      fetchUnionData();
    } else if (union) {
      debugger;
      setLoaded(true);
    }
  }, [dispatch, id, union]);

  if (error) {
    return <div>{error.message}</div>;
  }

  if (!loaded || !union) {
    return <div>Loading...</div>;
  }

  return (
    <div className="union-page">
      <div className="union-name-container">
        <h1>{union.name}</h1>
        <div className="invite-container">
          <h2>Send an invite by text</h2>
          <InviteButton className="invite-button" />
        </div>
      </div>
      <Griefs unionId={id} />
    </div>
  );
};

export default UnionDetails;
