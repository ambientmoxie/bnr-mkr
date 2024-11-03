<script>
  // @ts-ignore
  import DropDown from "./Dropdown.svelte";
  import { bannerConfig } from "../../js/stores";
  import { get } from "svelte/store";

  // Variable to track the input value
  let input = "";
  // @ts-ignore
  let optIsActive = false;
  let isDropdownActive = false;

  // Event handler to update state
  function handleToggle(event) {
    isDropdownActive = event.detail.isActive;
  }

  // Creates a "default frames" array by copying the current frames from config on initial load
  const dfs = [...get(bannerConfig).frames];

  // Handle frame array updates
  function updateTimeline() {
    // Get the value of input on each keystroke.
    // Exit immediately if the input is empty.
    if (input === "") return;

    // Convert input to lowercase...
    const lowerCaseInput = input.toLowerCase();

    // ...then check if it’s in the suggested list.
    // If it's not, exit without making changes.
    if (!dfs.includes(lowerCaseInput)) return;

    // If we reach this point, add the frame to the list...
    bannerConfig.update((config) => ({
      ...config,
      frames: [...config.frames, lowerCaseInput],
    }));

    // ...and clear the input for the next entry.
    input = "";
  }

  function selectFrame(frame) {
    // Adding the desired frame type to the current array
    bannerConfig.update((config) => ({
      ...config,
      frames: [...config.frames, frame],
    }));
  }
</script>

<DropDown on:toggle={handleToggle}>
  <input
    placeholder="Enter a frame type"
    slot="dd-input"
    bind:value={input}
    on:input={updateTimeline}
  />
  <span slot="dd-button">{isDropdownActive ? "-" : "+"}</span>
  <ul slot="dd-panel" id="options-panel">
    <!-- Generate a list of "option frames" by looping through the static default frames array -->
    {#each dfs as df}
      <li>
        <!-- Add frame to the timeline by clicking on the desired type of frame  -->
        <button on:click={() => selectFrame(df)}>{df}</button>
      </li>
    {/each}
  </ul>
</DropDown>

<style lang="scss">
  #options-panel {
    border: 1px solid var(--border-color);
    li {
      button {
        width: 100%;
        text-align: left;
        padding: var(--spacing-sm);
        text-transform: capitalize;
      }
      &:not(:last-child) {
        border-bottom: 1px solid var(--border-color);
      }
    }
  }
</style>
