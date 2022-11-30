import { Navigate } from "react-router-dom";
import useRole from "../../hooks/useRole";
import useToken from "../../hooks/useToken";

const AuthRoutes = ({ children }) => {
  const { token } = useToken();
  const { authRole } = useRole();
  if (!token) {
    return <Navigate to="/" />;
  } else if (authRole) {
    return children;
  } else {
    return <Navigate to="notpermitted" />;
  }
};
export default AuthRoutes;
