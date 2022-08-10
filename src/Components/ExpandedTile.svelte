<script lang="ts">
  export let isExpanded: Boolean = false;
  export let header: string;
</script>

<section>
  <div>
    <h1>{header}</h1>
  </div>
  {#if isExpanded}
    <slot />
  {/if}
</section>

<style>
  div {
    display: flex;
    margin-left: 1.5rem;
    background-color: rgb(0, 0, 0);
    margin-bottom: 0.5rem;
  }
  h1 {
    font-size: 1.5rem;
    color: white;
    margin-left: 1.5rem;
  }
</style>
