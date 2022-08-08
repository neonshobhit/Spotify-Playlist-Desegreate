import { callSpotify } from "../spotify/callSpotify";
import type { APIRequest, APIResponse } from "../types/API";

export const getUser = async (): Promise<APIResponse> => {
  let request: APIRequest = {
    method: "GET",
    endpoint: "/me",
    body: undefined,
  };
  return await callSpotify(request);
};
