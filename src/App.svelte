<script lang="ts">
  import * as Store from "./services/store";
  import Login from "./Login.svelte";
  import Router from "svelte-spa-router";
  import Home from "./Home.svelte";
  import Genre from "./Routes/Genre.svelte";

  const routes = {
    // Exact path

    // Using named parameters, with last being optional
    "/": Home,
    "/login": Login,
    "/genre": Genre,
  };
  const onClickRedirection = () => {
    window.location.replace("/#/login");
  };
</script>

<!-- <Route path="/">
	<a href="/#/login" use:active><h1>This is the main page</h1></a>
	<button on:click={onClickRedirection}>
        
	</button>
</Route>
<Route path="/login">
	<Login/>
</Route> -->
<main>
  <Router {routes} />
</main>

<style>
  :global(body) {
    padding: 0 0 0 0;
  }
  main {
    text-align: center;
    padding: 0;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
