import { removeDocumentAuthCookies } from "../../util/user";
import { updateSigningIn, updateCurrentUser } from "../../reducers/userReducer";

const signOut = values => {
  return async (dispatch, _getState, { api }) => {
    function onSuccess() {
      dispatch(updateCurrentUser(undefined));
      removeDocumentAuthCookies();
    }

    function onError(error) {
      dispatch(updateSigningIn(false));
    }

    try {
      const response = await api.delete("/v1/auth/sign_out", values);
      return onSuccess(response);
    } catch (error) {
      return onError(error);
    }
  };
};

export default signOut;
