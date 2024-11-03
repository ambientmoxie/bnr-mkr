<script>
  import { get } from "svelte/store";
  import { bannerConfig } from "../../js/stores";
  import ColorPicker from "../Subcomponents/ColorPicker.svelte";
  import DownloadButton from "../Subcomponents/DownloadButton.svelte";
  import FrameSelector from "../Subcomponents/FrameSelector.svelte";
  import DropzoneContainer from "../Subcomponents/DropzoneContainer.svelte";


  // Retrieve the default configuration to use if no valid values are provided
  const defaultConfig = { ...get(bannerConfig).misc };

  function handleInput(key, e) {
    // On each keystroke, check if there is any value left in the input
    let isEmpty = e.target.value.trim() === "";

    // Update the store with current value
    bannerConfig.update((config) => {
      return {
        ...config,
        misc: {
          ...config.misc,
          // If the input field is empty, switch to the default value
          [key]: isEmpty ? defaultConfig[key] : e.target.value,
        },
      };
    });
  }

  const inputPlaceholder = {
    misc: {
      urlRedirect: "Redirection URL",
      companyName: "Company name",
      delay: "Delay in seconds",
    },
    theme: {
      background: "Background-color (ex:#FFF)",
      text: "Text color (ex:#000)",
    },
  };
</script>

<div id="form">
  <!-- Displaying the frame selector to update the timeline -->
  <FrameSelector />

  <!-- Looping through all configuration values to create input fields for editing -->
  {#each Object.entries($bannerConfig.misc) as [key, _]}
    <!-- Checking each input value to determine if it can be added to the timeline -->
    <input
      value=""
      on:input={(e) => handleInput(key, e)}
      placeholder={inputPlaceholder.misc[key]}
    />
  {/each}
  {#each Object.entries($bannerConfig.theme) as [key, _]}
    <ColorPicker
      {key}
      placeholder={inputPlaceholder.theme[key]}
      value=""
    />
  {/each}

  <!-- Displaying the dropzone to add custom SVG logo -->
  <DropzoneContainer {bannerConfig} />
</div>

<!-- Download button that generates and download the banner -->
<DownloadButton />

<style lang="scss">
  #form {
    width: 100%;
    max-width: 33rem;
    display: grid;
    gap: var(--spacing-sm);
  }

  :global(input) {
    border: 1px solid var(--border-color);
    background-color: var(--input-background);
    border-radius: 0%;
    padding: var(--spacing-sm);
    color: var(--input-text-color);
    height: 4rem;

    &::placeholder {
      color: var(--input-placeholder-color);
    }

    &:hover {
      background-color: var(--input-background-active);
    }

    &:focus,
    &:focus-visible {
      border: 1px solid var(--border-color);
      background-color: var(--input-background-active);
      outline: none;
    }
  }

  :global(.custom-dropzone) {
    background-color: var(--input-background);
    border: 1px dotted var(--border-color);
    color: var(--input-placeholder-color);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 4rem;
    cursor: pointer;

    &:hover {
      background-color: var(--input-background-active);
    }

    :global(p) {
      pointer-events: none;
    }
  }
</style>
