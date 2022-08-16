import { callSpotify } from "../spotify/callSpotify";
import type { APIRequest, APIResponse } from "../types/API";

export const getArtist = async (artistId: string): Promise<APIResponse> => {
  let request: APIRequest = {
    method: "GET",
    endpoint: "/artists/"+artistId,
    body: undefined,
  };
  let r = await callSpotify(request);
  return r
};
