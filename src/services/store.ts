import { Writable, writable } from 'svelte/store';
import type { User } from "../types/User";
import type { Playlist } from "../types/Playlist";

export const user: Writable<User|undefined> = writable(undefined)
export const playlist: Writable<Playlist[]> = writable([])

export const DB = writable()

export const fetchedSongsOfPlaylist = {}