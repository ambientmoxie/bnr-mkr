<script>
  import { bannerConfig } from "../js/stores";
  import { get } from "svelte/store";
  import { clickOutside } from "../js/helpers";

  // Freeze current state of "frames"
  const defaultFrames = [...get(bannerConfig).frames];
  let input = "";
  let options = false;

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

  function toggleOptionContainer() {
    options = !options;
  }

  function selectFrame(frame) {
    bannerConfig.update((config) => ({
      ...config,
      frames: [...config.frames, frame],
    }));
    options = false; // Close the options panel after selection
  }
</script>

<div id="frame-selector">
  <input
    placeholder="Enter a frame type"
    bind:value={input}
    on:input={updateTimeline}
  />
  <button on:click={toggleOptionContainer} class="submit-button">
    {#if options} - {:else} + {/if}
  </button>
</div>

{#if options}
  <ul id="options-panel"
      use:clickOutside
      on:click_outside={() => (options = false)}
  >
    {#each defaultFrames as df}
      <li>
        <button on:click={() => selectFrame(df)}>{df}</button>
      </li>
    {/each}
  </ul>
{/if}

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
    width: 4rem;
    padding: 0 1rem;
    height: 100%;
    &:hover {
      background-color: var(--button-background);
      border: 1px solid var(--button-background);
      color: var(--button-text-color);
    }
  }

  #options-panel {
    border: 1px solid var(--color-gray-4);
    li {
      button {
        width: 100%;
        text-align: left;
        padding: var(--spacing-sm);
        text-transform: capitalize;
        &:hover {
          background-color: var(--input-background-active);
          color: var(--color-gray-2);
        }
      }
      &:not(:last-child) {
        border-bottom: 1px solid var(--color-gray-4);
      }
    }
  }
</style>
