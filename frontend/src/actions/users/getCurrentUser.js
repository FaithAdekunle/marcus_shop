import {
  setDocumentAuthCookies,
  removeDocumentAuthCookies
} from "../../util/user";
import { normalizeData } from "../../util/index";
import { updateCurrentUser, updateSigningIn } from "../../reducers/userReducer";

const getCurrentUser = () => {
  return async (dispatch, _getState, { api }) => {
    function onSuccess(response) {
      setDocumentAuthCookies(response.headers);
      const data = normalizeData(response);
      dispatch(updateCurrentUser(Object.values(data.user)[0]));
      dispatch(updateSigningIn(false));
      return data;
    }

    function onError(error) {
      removeDocumentAuthCookies();
      dispatch(updateSigningIn(false));
    }

    try {
      const response = await api.get("/v1/users/current_user");
      return onSuccess(response);
    } catch (error) {
      return onError(error);
    }
  };
};

export default getCurrentUser;
