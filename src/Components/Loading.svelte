<script lang="ts">
    export let height:Number = 100;
    $: heightRem = `${height}px`;
</script>

<section>
  <div class="center" style="--height:{heightRem};">
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
</section>

<style>
  section {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .wave {
    width: 5px;
    height: var(--height);
    background: linear-gradient(45deg, rgb(41, 167, 9), rgb(0, 0, 0));
    margin: 10px;
    animation: wave 1s alternate-reverse infinite;
    border-radius: 20px;
  }

  .center {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

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
</style>
