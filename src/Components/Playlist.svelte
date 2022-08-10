<script lang="ts">
  import type { Playlist } from "../types/Playlist";
  import * as Store from "../services/store";

  import ExpandedTile from "./ExpandedTile.svelte";
  import SongList from "./SongList.svelte";

  export let showPlaylist: boolean = false;
  export let playlists: Playlist[] = [];
  let expanded = {};
  Store.playlist.subscribe((playlist: Playlist[]) => {
    if (playlist.length === 0) return;
    playlists = playlist;
    for (let i = 0; i < playlist?.length; ++i) {
      expanded[i] = false;
    }
    showPlaylist = true;
  });
  const toggleExpansion = (x: number) => {
    for (let key in expanded) {
      if (x === +key) {
        expanded[key] = !expanded[key];
      } else {
        expanded[key] = false;
      }
    }
  };
</script>

<section>
  {#if showPlaylist}
    {#each playlists as playlist, i}
      <div on:click={() => toggleExpansion(i)}>
        <ExpandedTile header={playlist.name} isExpanded={expanded[i]}>
          <SongList playlistId={playlist.id} />
        </ExpandedTile>
      </div>
    {/each}
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
