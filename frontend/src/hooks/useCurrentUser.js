import { useSelector } from "react-redux";

const useCurrentUser = () => {
  const { currentUser } = useSelector(({ user }) => user);

  return { currentUser };
};

export default useCurrentUser;
