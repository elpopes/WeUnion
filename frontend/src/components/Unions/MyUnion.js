import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUnion } from "../../store/unions";
import MyOtherUnions from "./MyOtherUnions";

const MyUnion = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const union = useSelector(
    (state) => user.unions?.[0] && state.unions[user.unions[0]]
  );

  useEffect(() => {
    if (user && user.unions) {
      dispatch(fetchUnion(user.unions[0]));
    }
  }, [dispatch, user]);

  const handleClick = () => {
    if (user.unions) {
      history.push(`/unions/${user.unions[0]}`, { user: user });
    } else {
      window.location.reload();
    }
  };

  return (
    <div>
      <button className="union-card-button" onClick={handleClick}>
        {union ? union.name : "Refresh the Page"}
      </button>
      {user && user.unions && user.unions.length > 1 && (
        <MyOtherUnions unionName={union ? union.name : null} />
      )}
    </div>
  );
};

export default MyUnion;
