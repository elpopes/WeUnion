import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserUnions, moveUnionToFront } from "../../store/unions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

const MyOtherUnions = ({ unionName }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const otherUnions = useSelector((state) => state.unions.user);

  useEffect(() => {
    if (user && user.unions) {
      dispatch(fetchUserUnions(user._id));
    }
  }, [dispatch, user.unions, user]);

  const handleMoveUnionToFront = (unionId) => {
    dispatch(moveUnionToFront(user._id, unionId));
    window.location.reload();
  };

  return (
    <div className="other-unions-box">
      <h3>Select a new default union</h3>
      {otherUnions &&
        otherUnions
          .filter((union) => union.name !== unionName)
          .map((union) => (
            <div key={union._id}>
              {union.name}
              <FontAwesomeIcon
                className="select-button"
                size="sm"
                icon={faCircleCheck}
                onClick={() => handleMoveUnionToFront(union._id)}
              />
            </div>
          ))}
    </div>
  );
};

export default MyOtherUnions;
