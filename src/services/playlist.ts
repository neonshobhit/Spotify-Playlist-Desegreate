import { callSpotify } from "../spotify/callSpotify";
import type { APIRequest, APIResponse } from "../types/API";
import type { User } from "../types/User";
import * as Store from "./store"

export const getSavedSongs = async (offset:number = 0, limit: number = 50): Promise<APIResponse> => {
  let query = `?limit=${limit}&offset=${offset}`
  let request: APIRequest = {
    method: "GET",
    endpoint: `/me/tracks`+query,
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


export const getPlaylistItems = async (playlistId: string, offset:number = 0, limit: number = 0): Promise<APIResponse> => {
  console.log(Store.fetchedSongsOfPlaylist[playlistId]?.songs?.length)
  console.log(offset)
  console.log(limit)
  if (Store.fetchedSongsOfPlaylist[playlistId]?.maxItems <= limit+offset || Store.fetchedSongsOfPlaylist[playlistId]?.songs?.length >= offset + limit) {
    return {data: {items: Store.fetchedSongsOfPlaylist[playlistId].songs.slice(offset, offset+limit)}, error: undefined};
  }
  offset = Store.fetchedSongsOfPlaylist[playlistId]?.songs?.length || 0
  let response
  if (playlistId === "") {
    response = await getSavedSongs(offset, limit)
  } else {
    let query = `?limit=${limit}&offset=${offset}`
    let request: APIRequest = {
      method: "GET",
      endpoint: `/playlists/${playlistId}/tracks` + query,
      body: undefined,
    };
    response =  await callSpotify(request)
  }
  console.log(response)
  let items = response.data.items;
  let maxItems = limit > items.length ? Store.fetchedSongsOfPlaylist[playlistId].songs.length + items.length: undefined
  console.log(items)
  for (let i = 0; i<items.length; ++i) {
    if (Store.fetchedSongsOfPlaylist[playlistId]) {
      Store.fetchedSongsOfPlaylist[playlistId].songs.push(items[i]);
      Store.fetchedSongsOfPlaylist[playlistId].maxItems = maxItems
    } else {
      Store.fetchedSongsOfPlaylist[playlistId] = {
        maxItems,
        songs: [items[0]]
      }
    }
  }

  console.log(Store.fetchedSongsOfPlaylist[playlistId])
  return response
};

export const fetchAllSongsOfPlaylist = async (playlistId: string) => {
  if (Store.fetchedSongsOfPlaylist[playlistId]?.maxItems) return;
  await getPlaylistItems(playlistId, Store.fetchedSongsOfPlaylist[playlistId]?.songs?.length || 0, 50)
    fetchAllSongsOfPlaylist(playlistId)
  return {data: {items: Store.fetchedSongsOfPlaylist[playlistId]}}
}
