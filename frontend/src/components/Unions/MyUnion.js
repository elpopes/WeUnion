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
    if (user && user.unions) {
      dispatch(fetchUnion(user.unions[0]));
    }
  }, [dispatch, user]);

  const handleClick = () => {
    if (user.unions[0]) {
      history.push(`/unions/${user.unions[0]}`, { user: user });
    } else {
      history.push("/unions/new");
    }
  };

  return (
    <div>
      <button className="union-card-button" onClick={handleClick}>
        {user.unions ? "Your Default Union" : "Create Your Union!"}
      </button>
    </div>
  );
};

export default MyUnion;
