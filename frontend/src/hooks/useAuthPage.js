import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useAuthPage = () => {
  const navigate = useNavigate();
  const { signingIn, currentUser } = useSelector(({ user }) => user);

  if (currentUser) navigate("/products");

  return { signingIn };
};

export default useAuthPage;
