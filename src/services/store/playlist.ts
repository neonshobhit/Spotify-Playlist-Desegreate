import * as Store from "../store";
import { getPlaylists, getSavedSongs } from "../../services/playlist";
import type { Playlist } from "../../types/Playlist";

export let playlistArray: Playlist[] = [];
Store.user.subscribe((user) => {
  console.log("user", user);
  if (!user) return;
  getPlaylists(user).then(async (data) => {
    let playlists: Playlist[] = [];
    for (let i = 0; i < data.data.items.length; ++i) {
      let thisPlaylistItem: Playlist = {
        id: data.data.items[i].id,
        name: data.data.items[i].name,
      };
      playlists.push(thisPlaylistItem);
    }
    playlistArray = playlists;
    console.log("playlists", playlists)
    Store.playlist.set(playlists);
  });
});
