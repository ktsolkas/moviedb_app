import { useNavigate } from "react-router-dom";
import { ProfileData } from "../../../common/types/ProfileData";

interface ProtectedRouteProps {
  user: Partial<ProfileData>;
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ user, children }) => {
  const navigate = useNavigate();
  if (!user) {
    navigate("/", { replace: true });
  }

  return children;
};

export default ProtectedRoute;
