import { callSpotify } from "../spotify/callSpotify";
import type { APIRequest, APIResponse } from "../types/API";
import type { User } from "../types/User";

export const getSavedSongs = async (): Promise<APIResponse> => {
  let request: APIRequest = {
    method: "GET",
    endpoint: `/me/tracks`,
    body: undefined,
  };
  return await callSpotify(request);
};

export const getPlaylists = async (user: User): Promise<APIResponse> => {
  let request: APIRequest = {
    method: "GET",
    endpoint: `/users/${user.id}/playlists`,
    body: undefined,
  };
  return await callSpotify(request);
};


export const getPlaylistItems = async (playlistId: string): Promise<APIResponse> => {
  let request: APIRequest = {
    method: "GET",
    endpoint: `/playlists/${playlistId}/tracks`,
    body: undefined,
  };
  return await callSpotify(request);
};
