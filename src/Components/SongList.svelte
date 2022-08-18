<script lang="ts">
  import { getPlaylistItems, getSavedSongs, fetchAllSongsOfPlaylist } from "../services/playlist";
  import Loading from "./Loading.svelte";
  let isLoading = true;
  export let playlistId: string;
  let tracks = [];
  let offset = 0, limit = 20;
  // fetchAllSongsOfPlaylist("").then(console.log)
  const getTracks = () => {
    // if (playlistId === "") {
    //   getSavedSongs().then((savedSongs) => {
    //     for (let i = 0; i < savedSongs.data.items.length; ++i) {
    //       tracks.push(savedSongs.data.items[i]);
    //     }
    //     isLoading = false;
    //   });
    // } else {
      getPlaylistItems(playlistId, offset, limit).then((data) => {
        console.log(data.data);
        for (let i = 0; i < data.data.items.length; ++i) {
          tracks.push(data.data.items[i]);
        }
        isLoading = false;
      });
    // }
  }
  const next = () => {
    if (!tracks.length) return;
    isLoading = true;
    tracks = [] 
    offset += limit;
    getTracks()
  }

  const prev = () => {
    if (offset - limit < 0) return;
    isLoading = true;
    offset -= limit;
    tracks = []
    getTracks()
  }
  getTracks()
</script>

<section>
  {#if isLoading}
    <Loading height={30} />
  {:else}
    {#each tracks as track, i}
      <div><h5>{track.track.name}</h5></div>
    {/each}
    <div>
      <button on:click={prev}>Prev</button>
      <button on:click={next}>Next</button>
    </div>
  {/if}
</section>

<style>
  div {
    display: flex;
    margin-left: 2rem;
  }
  h5 {
    margin: 0.5rem;
    margin-left: 1.5rem;
  }
  button {
    margin: 0;
  }
  /* section {
    border: 100px;
    border-color: black;
    margin-top: 0;
    background-color: aqua;
    margin-left: 1.5rem;
    margin-right: 1.5rem;
  } */
  /* section {
    display: flex;
    justify-content: left;
    align-items: flex-start;
    flex-direction: column;
    align-content: flex-start;
  } */
</style>
