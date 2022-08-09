<script lang="ts">
  import Code from "./AuthCode.svelte";
  import { secrets } from "./Config";
  import { getPlaylists } from "./services/playlist";
  import { getUser } from "./services/user";
  import type { User } from "./types/User";
  import Loading from "./Components/Loading.svelte";
  import ExpandedTile from "./Components/ExpandedTile.svelte";
  import SongList from "./Components/SongList.svelte";
  let accessToken = localStorage.getItem("spotifyAccessToken");
  let refreshToken = localStorage.getItem("spotifyRefreshToken");

  let isLoggedIn: boolean = !refreshToken;
  let user: User;
  let showPlaylist = false;
  let playlists = [];
  let expanded = {}

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

    getPlaylists().then((data) => {
      console.log(data.data);

      for (let i = 0; i < data.data.items.length; ++i) {
        playlists.push(data.data.items[i]);
        expanded[i] = false;
      }
      showPlaylist = true;
    });
  }

  const toggleExpansion = (x:number) => {
    for (let key in expanded) {
      if (x === +key) {
        expanded[key] = !expanded[key];
      }
      else {
        expanded[key] = false
      }
    }
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
      "scope=app-remote-control user-read-playback-state user-modify-playback-state user-follow-modify user-read-recently-played user-library-read&" +
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

  {#if showPlaylist}
    {#each playlists as playlist, i}
      <div on:click={() => toggleExpansion(i)}>
        <ExpandedTile header={playlist.name} isExpanded={expanded[i]}>
          <SongList playlistId={playlist.id}/>
        </ExpandedTile>
      </div>
    {/each}
  {/if}
  <Loading height={50} />
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
