import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useWithUser = () => {
  const navigate = useNavigate();
  const { signingIn, currentUser } = useSelector(({ user }) => user);

  if (!currentUser && !signingIn) {
    navigate("sign_up");
    return null;
  }
};

export default useWithUser;
