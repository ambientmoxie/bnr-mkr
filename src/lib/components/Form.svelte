<script>
  import { bannerConfig } from "../js/stores";
  import { get } from "svelte/store";
  import ColorPicker from "./ColorPicker.svelte";
  import DownloadButton from "./DownloadButton.svelte";
  import FrameSelector from "./FrameSelector.svelte";
  import DropzoneContainer from "./DropzoneContainer.svelte";

  const defaultConfig = { ...get(bannerConfig).misc };

  function handleInput(key, e) {
    let isEmpty = e.target.value.trim() === "";

    bannerConfig.update((config) => {
      return {
        ...config,
        misc: {
          ...config.misc,
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
  <FrameSelector />

  {#each Object.entries($bannerConfig.misc) as [key, _]}
    <input
      value=""
      on:input={(e) => handleInput(key, e)}
      placeholder={inputPlaceholder.misc[key]}
    />
  {/each}
  {#each Object.entries($bannerConfig.theme) as [key, entry]}
    <ColorPicker
      {key}
      placeholder={inputPlaceholder.theme[key]}
      defaultColor={entry}
      value=""
    />
  {/each}

  <DropzoneContainer {bannerConfig} />
</div>

<DownloadButton />

<style lang="scss">
  #form {
    display: grid;
    gap: var(--spacing-sm);
    width: 100%;
    max-width: 33rem;
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

  // :global(ol li) {
  //   margin-top: var(--spacing-sm);
  // }
</style>
