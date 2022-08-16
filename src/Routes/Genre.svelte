<script lang="ts">
  import ExpandedTile from "../Components/ExpandedTile.svelte";
  import { DB } from "../services/store";
  let cnt = 0;
  let expanded = {};
  let selected = {};
  $: db = {}
  let genre = [];
  let show = false;
  let r = JSON.parse(localStorage.getItem('genre'))

//   DB.subscribe(g => {
//     db = g
//     console.log(g)
//     console.log(genre)
    for (let i in r) {
      expanded[cnt++] = false;
      genre.push({ header: i, content: r[i] });
    }
    // console.log(genre)
    show = true;
//   })
</script>

<section>
    {#if show}
        {#each genre as g, i}
        <ExpandedTile bind:expanded header={g.header} index={i} bind:selected>
            {#each g.content as track, j}
                <div><h5>{track.trackName}</h5></div>
            {/each}
        </ExpandedTile>
        {/each}
    
    {:else}
        <h1>gijdrofjdfj</h1>
    {/if}
    <!-- <h1>sdfcsdf</h1> -->
</section>

<style>
    div {
        margin: 0;
    }
    h5 {
        margin: 0 0 0.5rem 0;
    }
    /* section{
        background-color: aqua;
    } */
</style>
