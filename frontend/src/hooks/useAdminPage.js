import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useAdminPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector(({ user }) => user);

  if (currentUser && currentUser.attributes.role !== "admin")
    navigate("/market");
};

export default useAdminPage;
