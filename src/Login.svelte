<script lang="ts">
  import { updateAccessToken } from "./spotify/updateAccessToken";
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
      <div class="wave" />
      <div class="wave" />
      <div class="wave" />
      <div class="wave" />
      <div class="wave" />
      <div class="wave" />
      <div class="wave" />
      <div class="wave" />
      <div class="wave" />
      <div class="wave" />
    </div>
  {/if}
</section>

<style>
  section {
    margin: 0 0 0 0;
    padding: 0 0 0 0;
    box-sizing: border-box;
  }
  .wave {
    width: 5px;
    height: 100px;
    background: linear-gradient(45deg, rgb(41, 167, 9), rgb(0, 0, 0));
    margin: 10px;
    animation: wave 1s alternate-reverse infinite;
    border-radius: 20px;
  }

  .center {
    margin: 0 0 0 0;
    padding: 0 0 0 0;
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
  .wave:nth-child(2) {
    animation-delay: 0.1s;
  }
  .wave:nth-child(3) {
    animation-delay: 0.2s;
  }
  .wave:nth-child(4) {
    animation-delay: 0.3s;
  }
  .wave:nth-child(5) {
    animation-delay: 0.4s;
  }
  .wave:nth-child(6) {
    animation-delay: 0.1s;
  }
  .wave:nth-child(7) {
    animation-delay: 0.2s;
  }
  .wave:nth-child(8) {
    animation-delay: 0.3s;
  }
  .wave:nth-child(9) {
    animation-delay: 0.4s;
  }

  @keyframes wave {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }

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
