import { useDispatch, useSelector } from "react-redux";

import getCurrentUser from "../actions/getCurrentUser";

const useGetCurrentUser = () => {
  const dispatch = useDispatch();
  const { signingIn, currentUser } = useSelector(({ user }) => user);

  if (!currentUser && signingIn) {
    dispatch(getCurrentUser());
  }
};

export default useGetCurrentUser;
