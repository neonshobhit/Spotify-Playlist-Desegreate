<script lang="ts">
  import Code from "./AuthCode.svelte";
  import { secrets } from "./Config";
  import { getUser } from "./services/user";
  import type { User } from "./types/User";
  let accessToken = localStorage.getItem("spotifyAccessToken");
  let refreshToken = localStorage.getItem("spotifyRefreshToken");

  let isLoggedIn: boolean = !refreshToken;
  let user: User;

  if (window.location.href.split("code=")?.[1]) {
    let url = secrets.redirectURI + "/#/login";
    let code: string | undefined = window.location.href.split("code=")?.[1];
    window.location.replace(url + "?code=" + code);
  } else if (!isLoggedIn) {
    getUser().then((data) => {
      user = {
        name: data.data.display_name,
        id: data.data.id,
      };
      localStorage.setItem("user", JSON.stringify(user));
    });
  }

  const redirectToSpotify = () => {
    let url =
      secrets.spotifyUrl +
      "/authorize" +
      "/?" +
      "client_id=" +
      secrets.clientId +
      "&response_type=code&" +
      "redirect_uri=http://localhost:8080&" +
      "scope=app-remote-control user-read-playback-state user-modify-playback-state user-follow-modify user-read-recently-played&" +
      "show_dialog=false";
    window.location.replace(url);
  };
</script>

<section>
  {#if user?.name}
    <h1>Hello, {user.name} !</h1>
  {:else}
    <h1>Spotify - Playlist</h1>
  {/if}
  {#if isLoggedIn}
    <button on:click={redirectToSpotify}><h2>Login to Spotify</h2></button>
  {/if}
</section>

<style>
  h1 {
    color: #116e1e;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 200;
  }
  h2 {
    color: #116e1e;
    font-size: 1em;
    font-weight: 100;
  }
</style>
