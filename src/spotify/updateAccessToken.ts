import { secrets } from "../Config";
import type { AccessTokenDetails } from "../types/AccessTokenDetails";
import type { APIResponse } from "../types/API";

export const updateAccessToken = async (
  refreshToken: undefined | string,
  code: undefined | string
): Promise<APIResponse> => {
  var details: AccessTokenDetails = {
    grant_type: refreshToken ? "refresh_token" : "authorization_code",
    refresh_token: refreshToken,
    redirect_uri: secrets.redirectURI,
    code: code,
  };

  var formBody = [];
  for (var property in details) {
    if (!details[property]) continue;
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  let stringFormBody = formBody.join("&");
  console.log(stringFormBody);
  let response = await fetch(secrets.spotifyUrl + "/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      Authorization:
        "Basic " + btoa(secrets.clientId + ":" + secrets.clientSecret),
    },
    body: stringFormBody,
  });

  let resp = await response.json();
  console.log(resp);
  if (resp.access_token) {
    localStorage.setItem("spotifyAccessToken", resp.access_token);
  }
  if (resp.refresh_token) {
    localStorage.setItem("spotifyRefreshToken", resp.refresh_token);
  }
  return {
    data: resp,
    error: undefined,
  };
};
