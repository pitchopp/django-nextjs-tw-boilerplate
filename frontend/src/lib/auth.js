import { getCookies, setCookie, removeCookie } from "@/lib/cookies";

/**
 * Stores a token in cookies.
 * @param {string} token - The token to be stored.
 * @param {"access" | "refresh"} type - The type of the token (access or refresh).
 */
export const storeToken = (token, type) => {
  setCookie(type + "Token", token);
};

/**
 * Retrieves a token from cookies.
 * @param {"access" | "refresh"} type - The type of the token to retrieve (access or refresh).
 * @returns {string | undefined} The token, if found.
 */
export const getToken = (type) => {
  return getCookies()[type + "Token"];
};

/**
 * Removes both access and refresh tokens from cookies.
 */
export const removeTokens = () => {
  removeCookie("accessToken");
  removeCookie("refreshToken");
  removeUserDetails()
};

export const isAuthenticated = () => {
  return !!getAccessToken();
}

export const getAccessToken = () => {
  return getToken("access");
}

export const getRefreshToken = () => {
  return getToken("refresh");
}

export const storeAccessToken = (token) => {
  storeToken(token, "access");
}

export const storeRefreshToken = (token) => {
  storeToken(token, "refresh");
}

export const setUserDetails = (user) => {
  setCookie("userDetails", JSON.stringify(user));
}

export const getUserDetails = () => {
  if (getCookies().userDetails) {
    return JSON.parse(getCookies().userDetails);
  }
  return null;
}

export const removeUserDetails = () => {
  removeCookie("userDetails");
}

export const isStaff = () => {
  const user = getUserDetails();
  return user && user.is_staff;
}
