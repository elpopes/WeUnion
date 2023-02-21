import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUnion, getUnion } from "../../store/unions";

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
    <div>
      <h1>{union.name}</h1>
    </div>
  );
};

export default UnionDetails;
