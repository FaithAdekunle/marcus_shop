import { serialize } from "cookie";

const date = new Date();
date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);

const COOKIE_PROPS = {
  path: "/",
  secure: true,
  expires: date,
  sameSite: "strict"
};

export const setDocumentAuthCookies = headers => {
  if (headers["access-token"]) {
    document.cookie = serialize(
      "access-token",
      headers["access-token"],
      COOKIE_PROPS
    );
    document.cookie = serialize("uid", headers.uid, COOKIE_PROPS);
    document.cookie = serialize("expiry", headers.expiry, COOKIE_PROPS);
    document.cookie = serialize("client", headers.client, COOKIE_PROPS);
  }
};

const DELETE_COOKIE_PROPS = {
  path: "/",
  expires: new Date(0)
};

export const removeDocumentAuthCookies = () => {
  document.cookie = serialize("uid", "", DELETE_COOKIE_PROPS);
  document.cookie = serialize("expiry", "", DELETE_COOKIE_PROPS);
  document.cookie = serialize("client", "", DELETE_COOKIE_PROPS);
  document.cookie = serialize("access-token", "", DELETE_COOKIE_PROPS);
};
