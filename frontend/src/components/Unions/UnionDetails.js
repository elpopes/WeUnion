import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUnion, getUnion } from "../../store/unions";
import UnionGriefs from "./UnionGriefs";
import InviteButton from "./Invite";
import "./UnionDetails.css";
import Members from "./MembersBox";
import JoinUnion from "./JoinUnion";

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
          <h2>Send an invite by email</h2>
          <InviteButton union={union} className="invite-button" />
        </div>
        <div className="join-containe">
          <JoinUnion union={union} className="join-button" />
        </div>
      </div>
      <div className="griefs-and-members">
        <div className="union-griefs">
          <UnionGriefs unionId={id} />
        </div>
        <div className="union-members">
          <Members unionId={id} />
        </div>
      </div>
    </div>
  );
};

export default UnionDetails;
