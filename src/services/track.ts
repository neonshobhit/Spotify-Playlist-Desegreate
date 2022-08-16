import { callSpotify } from "../spotify/callSpotify";
import type { APIRequest, APIResponse } from "../types/API";

export const getTrackInfo = async (trackId: string): Promise<APIResponse> => {
  let request: APIRequest = {
    method: "GET",
    endpoint: "/tracks/"+trackId,
    body: undefined,
  };
  let r = await callSpotify(request);
  return r
};
