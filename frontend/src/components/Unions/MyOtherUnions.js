import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserUnions, moveUnionToFront } from "../../store/unions";

const MyOtherUnions = ({ unionName }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const otherUnions = useSelector((state) => state.unions.user);

  useEffect(() => {
    if (user && user.unions) {
      dispatch(fetchUserUnions(user._id));
    }
  }, [dispatch, user]);

  const handleMoveUnionToFront = (unionId) => {
    // dispatch(moveUnionToFront(user._id, unionId));
  };

  return (
    <div className="other-unions-box">
      {otherUnions &&
        otherUnions
          .filter((union) => union.name !== unionName)
          .map((union) => (
            <div key={union._id}>
              {union.name}
              <button onClick={() => handleMoveUnionToFront(union._id)}>
                Make Default Union
              </button>
            </div>
          ))}
    </div>
  );
};

export default MyOtherUnions;
