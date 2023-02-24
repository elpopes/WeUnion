import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUnion } from "../../store/unions";

const MyUnion = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    if (user && user.unionId) {
      dispatch(fetchUnion(user.union));
    }
  }, [dispatch, user]);

  const handleClick = () => {
    if (user.union) {
      history.push(`/unions/${user.union}`);
    } else {
      history.push("/unions/new");
    }
  };

  return (
    <div>
      <button className="union-card-button" onClick={handleClick}>
        {user.union ? "Your Union" : "Create Your Union!"}
      </button>
    </div>
  );
};

export default MyUnion;
