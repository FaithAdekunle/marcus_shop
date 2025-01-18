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
