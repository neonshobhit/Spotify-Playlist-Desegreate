<script lang="ts">
    export let isExpanded:Boolean = false;
    export let header:string;
</script>

<section>
    <h1>{header}</h1>
    {#if isExpanded}
        <slot></slot>
    {/if}
</section>

<style>
    h1 {
        font-size: 2rem;
    }

</style>