<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    export let searchCity: string;
    const dispatch = createEventDispatcher();

    function handleSearch() {
        dispatch('search', searchCity);
    }

    function handleKeyDown(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            handleSearch();
        }
    }
</script>

<div class="relative w-full max-w-2xl">
    <input type="text" bind:value={searchCity} placeholder="Enter city name" class="w-full px-8 py-5 text-lg bg-white rounded-none border-b-2 border-neutral-200 focus:outline-none focus:border-black transition-all placeholder:text-neutral-400" on:keydown={handleKeyDown} />
    <button on:click={handleSearch} class="absolute right-0 top-1/2 -translate-y-1/2 px-10 py-4 text-neutral-500 hover:text-black transition-colors">
        Search
    </button>
</div>