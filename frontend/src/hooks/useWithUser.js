import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const useWithUser = () => {
  const navigate = useNavigate();
  const { signingIn, currentUser } = useSelector(({ user }) => user);

  if (!currentUser && !signingIn) {
    navigate("sign_in");
    return null;
  }
};

export default useWithUser;
