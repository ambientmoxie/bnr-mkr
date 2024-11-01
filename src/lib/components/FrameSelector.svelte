<script>
  import { bannerConfig } from "../js/stores";
  import { get } from "svelte/store";

  // Freeze current state of "frames"
  const defaultFrames = [...get(bannerConfig).frames];
  let input = "";

  function updateTimeline() {
    // If empty, we do nothing and exit.
    if (input === "") return;
    // If input is not is the suggested list, we do nothing and exit.
    const lowerCaseInput = input.toLowerCase();
    if (!defaultFrames.includes(lowerCaseInput)) return;
    // If we are here, we can add the frame to our list...
    bannerConfig.update((config) => ({
      ...config,
      frames: [...config.frames, lowerCaseInput],
    }));
    // ... and clean the input for the next one.
    input = "";
  }
</script>

<div id="frame-selector">
  <input
    placeholder="Choose a frame type"
    list="frame-suggestion"
    bind:value={input}
  />
  <button on:click={updateTimeline} class="submit-button">add</button>
</div>
<datalist id="frame-suggestion">
  {#each defaultFrames as df}
    <option>{df}</option>
  {/each}
</datalist>

<style lang="scss">
  #frame-selector {
    display: flex;
    gap: var(--spacing-sm);
    input {
      flex: 1;
    }
  }

  button:hover {
    background-color: var(--color-accent-2);
  }

  button.submit-button {
    background-color: transparent;
    border: 1px solid var(--border-color);
    padding: 1rem;
    width: fit-content;
    padding: 0 1rem;
    height: 100%;
    &:hover {
      background-color: var(--button-background);
      border: 1px solid var(--button-background);
      color: var(--button-text-color);
    }
  }
</style>
