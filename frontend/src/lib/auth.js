import Cookies from "js-cookie";

/**
 * Stores a token in cookies.
 * @param {string} token - The token to be stored.
 * @param {"access" | "refresh"} type - The type of the token (access or refresh).
 */
export const storeToken = (token, type) => {
  Cookies.set(type + "Token", token);
};

/**
 * Retrieves a token from cookies.
 * @param {"access" | "refresh"} type - The type of the token to retrieve (access or refresh).
 * @returns {string | undefined} The token, if found.
 */
export const getToken = (type) => {
  return Cookies.get(type + "Token");
};

/**
 * Removes both access and refresh tokens from cookies.
 */
export const removeTokens = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  removeUserDetails();
};

export const isAuthenticated = () => {
  return !!getAccessToken();
};

export const getAccessToken = () => {
  return getToken("access");
};

export const getRefreshToken = () => {
  return getToken("refresh");
};

export const storeAccessToken = (token) => {
  storeToken(token, "access");
};

export const storeRefreshToken = (token) => {
  storeToken(token, "refresh");
};

export const setUserDetails = (user) => {
  Cookies.set("userDetails", JSON.stringify(user));
};

export const getUserDetails = () => {
  if (Cookies.get("userDetails")) {
    return JSON.parse(Cookies.get("userDetails"));
  }
  return null;
};

export const removeUserDetails = () => {
  Cookies.remove("userDetails");
};

export const isStaff = () => {
  const user = getUserDetails();
  return user && user.is_staff;
};

export const handleLoginSuccess = (res) => {
  storeAccessToken(res.data.access);
  storeRefreshToken(res.data.refresh);
  setUserDetails(res.data.user);
};
