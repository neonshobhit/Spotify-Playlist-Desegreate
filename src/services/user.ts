import { callSpotify } from "../spotify/callSpotify";
import type { APIRequest, APIResponse } from "../types/API";

export const getUser = async (): Promise<APIResponse> => {
  console.log("gettng user")
  let request: APIRequest = {
    method: "GET",
    endpoint: "/me",
    body: undefined,
  };
  let r = await callSpotify(request);
  console.log("user: ", r)
  return r
};
