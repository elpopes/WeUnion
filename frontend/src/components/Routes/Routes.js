import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export const AuthRoute = ({ component: Component, path, exact }) => {
  const loggedIn = useSelector((state) => !!state.session.user);
  //   const user = useSelector(getCurrentUser());

  return (
    <Route
      path={path}
      exact={exact}
      render={(props) =>
        !loggedIn ? <Component {...props} /> : <Redirect to="/profile" />
      }
    />
  );
};

// this is an attempt to redirect to the union's show page on signup
// export const AuthRoute = ({ component: Component, path, exact }) => {
//     const loggedIn = useSelector((state) => !!state.session.user);
//     const unionId = useSelector((state) => state.session.user?.unionId);
//     const [redirecting, setRedirecting] = useState(false);

//     useEffect(() => {
//       if (unionId) {
//         setRedirecting(true);
//       }
//     }, [unionId]);

//     return (
//       <Route
//         path={path}
//         exact={exact}
//         render={(props) =>
//           !loggedIn ? (
//             <Component {...props} />
//           ) : redirecting ? (
//             <Redirect to={`/unions/${unionId}`} />
//           ) : null
//         }
//       />
//     );
//   };
// trying to redirect to union show page

/// this works to send to grief
export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const loggedIn = useSelector((state) => !!state.session.user);

  return (
    <Route
      {...rest}
      render={(props) =>
        loggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};
