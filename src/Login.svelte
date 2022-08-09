<script lang="ts">
  import { updateAccessToken } from "./spotify/updateAccessToken";
  import Loading from "./Components/Loading.svelte";
  let isFailed: Boolean = false;
  if (window.location.href.split("code=")?.[1]) {
    let code: string | undefined = window.location.href.split("code=")?.[1];
    updateAccessToken(undefined, code).then((data) => {
      let spotifyAccessToken = localStorage.getItem("spotifyAccessToken");
      let spotifyRefreshToken = localStorage.getItem("spotifyRefreshToken");

      if (data.error || !(spotifyRefreshToken && spotifyAccessToken)) {
        isFailed = true;
      } else {
        console.log(spotifyAccessToken, spotifyRefreshToken);
        window.location.replace("/");
      }
    });
  }
</script>

<section>
  {#if isFailed}
    <div class="failure">
      <h1>Please login again!</h1>
    </div>
  {:else}
    <div class="center">
      <Loading height={100}/>
    </div>
  {/if}
</section>

<style>
  section {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .center {
    margin: 0;
    padding: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(0, 0, 0);
  }

  /* h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  } */




  .failure {
    height: min-content;
    justify-content: center;
  }

  h1 {
    display: flex;
    text-transform: uppercase;
    font-size: 2em;
    font-weight: 300;
    margin: 0;
  }
</style>
