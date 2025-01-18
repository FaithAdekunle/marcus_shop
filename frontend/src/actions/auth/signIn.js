import { normalizeData } from "../../util/index";
import { setDocumentAuthCookies } from "../../util/user";
import { updateSigningIn, updateCurrentUser } from "../../reducers/userReducer";

const signUp = values => {
  return async (dispatch, _getState, { api }) => {
    function onSuccess(response) {
      setDocumentAuthCookies(response.headers);
      const data = normalizeData(response);
      dispatch(updateCurrentUser(Object.values(data.user)[0]));
      dispatch(updateSigningIn(false));
      return data;
    }

    function onError(error) {
      dispatch(updateSigningIn(false));
    }

    try {
      const response = await api.post("/v1/auth/sign_in", values);
      return onSuccess(response);
    } catch (error) {
      return onError(error);
    }
  };
};

export default signUp;
