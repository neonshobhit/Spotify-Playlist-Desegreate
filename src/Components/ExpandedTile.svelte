<script lang="ts">
  export let header: string;
  export let expanded;
  export let selected;
  export let index: number;

  $: bottomMargin = expanded[index] === true ? 0 : 0.5;
  let bottomMarginSlot = 0.5;
  let timer: NodeJS.Timeout | undefined;
  let duration: number = 500;

  const toggleExpansion = () => {
    for (let key in expanded) {
      if (index + "" === key) {
        expanded[key] = !expanded[key];
      } else {
        expanded[key] = false;
      }
    }
    console.log(expanded);
  };

  const longTouch = () => {
    timer = undefined;
    selected[index] = !selected[index]
  };
  const mouseup = () => {
    if (timer) {
      clearTimeout(timer);
      toggleExpansion();
    }
  };
  const mousedown = () => {
    timer = setTimeout(longTouch, duration);;
  };
</script>

<section>
  <div
    on:mousedown={mousedown}
    on:mouseup={mouseup}
    style="--margin-bottom:{bottomMargin}rem; --background-color: {selected[index]? 'red': 'black'};"
  >
    <h1>{header}</h1>
  </div>
  {#if expanded[index]}
    <label for="" style="--margin-bottom-slot:{bottomMarginSlot}rem;">
      <slot />
    </label>
  {/if}
</section>

<style>
  div {
    display: flex;
    margin: 0 1.5rem var(--margin-bottom) 1.5rem;
    background-color: var(--background-color);
  }
  label {
    border: 1px solid black;
    border-top: 0px;
    background-color: #f6f6f6;
    margin: 0 1.5rem var(--margin-bottom-slot) 1.5rem;
  }
  h1 {
    font-size: 1.5rem;
    color: white;
    margin-left: 1.5rem;
  }
</style>
