<script lang="ts">
  import type { Playlist } from "../types/Playlist";
  import * as Store from "../services/store";

  import ExpandedTile from "./ExpandedTile.svelte";
  import SongList from "./SongList.svelte";
  import { getPlaylistItems, getSavedSongs, fetchAllSongsOfPlaylist } from "../services/playlist";
  import { getTrackInfo } from "../services/track";
  import { getArtist } from "../services/artist";
import Genre from "../Routes/Genre.svelte";

  export let showPlaylist: boolean = false;
  export let playlists: Playlist[] = [];
  let completeList: Playlist[] = [{ id: "", name: "Saved Songs" }];
  let expanded: Map<string, boolean> = new Map();
  let selected = {};
  Store.playlist.subscribe((playlist: Playlist[]) => {
    if (playlist.length === 0) return;
    expanded[0] = false;
    selected[0] = false;
    for (let i = 0; i < playlist?.length; ++i) {
      expanded[i + 1] = false;
      playlists.push(playlist[i]);
      completeList.push(playlist[i]);
    }
    showPlaylist = true;
  });

  let songsTypeLoaded = false;
  const genres = {}
  const loadSongsType = async () => {
    let tracks = {};
    console.log("allsongs");
    let artistSongs = {};
    for (let key in selected) {
      if (!selected[key]) continue;
      let playlistId = completeList[key].id;
      let songs;
      let foundTracks = {}
      // if (playlistId === "") {
      //   songs = await getSavedSongs().then(
      //     (savedSongs) => savedSongs.data.items
      //   );
        // await getSavedSongs().then((savedSongs) => {
        //   for (let i = 0; i < savedSongs.data.items.length; ++i) {
        //     let id = savedSongs.data.items[i].track.id
        //     let name = savedSongs.data.items[i].track.name
        //     tracks[id] = name
        //     console.log(savedSongs.data.items[i].track)
        //     for (let j=0; j<savedSongs.data.items[i].track)
        //     artistSongs[]
        //   }
        // });
      // } else {
        songs = await fetchAllSongsOfPlaylist(playlistId).then(
          (data) => data.data.items
        );
        // await getPlaylistItems(playlistId).then((data) => {
        //   for (let i = 0; i < data.data.items.length; ++i) {
        //     let id = data.data.items[i].track.id
        //     let name = data.data.items[i].track.name
        //     tracks[id] = name
        //   }
        // });
      // }
      for (let i = 0; i < songs.length; ++i) {
        let trackId = songs[i].track.id;
        let trackName = songs[i].track.name;
        for (let j = 0; j < songs[i].track.artists.length; ++j) {
          if (artistSongs[songs[i].track.artists[j].id]) {
            if (!foundTracks[trackId])
              artistSongs[songs[i].track.artists[j].id].push({
                trackId,
                trackName,
              });
              foundTracks[trackId] = true
          } else {
            artistSongs[songs[i].track.artists[j].id] = [
              { trackId, trackName },
            ];
          }
        }
      }
    }
    console.log(tracks);

    // let trackId = '3APdIdF8H0jsxSuGOqXedS'
    // let artists = {}

    // for (let trackId in tracks) {
    //   await getTrackInfo(trackId).then(track => {
    //     let arrLen = track.data.artists.length
    //     for (let i=0; i<arrLen; ++i) {
    //       let artist = track.data.artists[i]
    //       artists[artist.id] = artist.name
    //     }
    //   })

    // }
    
    for (let id in artistSongs) {
      await getArtist(id).then((artist) => {
        console.log(artist.data);
        for (let i = 0; i < artist.data.genres.length; ++i) {
          if (genres[artist.data.genres[i]]) {
            genres[artist.data.genres[i]].push(...artistSongs[id]);
          } else {
            genres[artist.data.genres[i]] = artistSongs[id];
          }
        }
      });
    }
    
    // Store.DB.genre = {...genres}
    // Store.DB.set(genres)
    localStorage.setItem('genre', JSON.stringify(genres))
    console.log(genres);
    window.location.replace('/#/genre')
    songsTypeLoaded = true;
  };
</script>

<section>
  {#if showPlaylist}
    <ExpandedTile header={"Saved Songs"} bind:expanded bind:selected index={0}>
      <SongList playlistId={""} />
    </ExpandedTile>
    {#each playlists as playlist, i}
      <ExpandedTile
        header={playlist.name}
        bind:expanded
        bind:selected
        index={i + 1}
      >
        <SongList playlistId={playlist.id} />
      </ExpandedTile>
    {/each}

    {#if playlists.length}
      <button on:click={loadSongsType}>Load Songs Type!</button>
    {/if}
    {#if songsTypeLoaded}
      <Genre/>
      <!-- {#each Object.entries(genres) as [genre, songs]}
        <h1>{genre}</h1>
        <h5>{JSON.stringify(songs)}</h5>
      {/each} -->
    {/if}
  {/if}
</section>

<style>
  /* section {
    display: block;
    background-color: aqua;
    margin-left: 5rem;
  }
  div {
    display: flex;
    height: 5rem;
  } */
</style>
