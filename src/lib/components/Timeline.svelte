<script>
  import { bannerConfig } from "../js/stores";

  // Creating new frames array, without the item that has been clicke on
  function del(idx) {
    bannerConfig.update((config) => ({
      ...config,
      frames: [...config.frames.filter((_, i) => i !== idx)],
    }));
  }

  // Return extended label
  function extendedLabel(frame) {
    let label = "";
    switch (frame) {
      case "logo":
        label = "static logo";
        break;
      case "image":
        label = "single image";
        break;
      case "text":
        label = "simple text";
        break;
      case "carousel":
        label = "flkty slider";
        break;
      case "cta":
        label = "call to action";
        break;
      default:
        label = "invalid frame";
        break;
    }
    return label;
  }
</script>

{#if $bannerConfig.frames.length > 0}
  <div id="frames">
    {#each $bannerConfig.frames as frame, i}
      <div
        class="frame"
        style=" background-color:{$bannerConfig.theme.background};
              color:{$bannerConfig.theme.text}"
      >
        <button on:click={() => del(i)} class="remove-btn">
          remove
        </button>

        <div class="frame-informations">
          frame {i + 1} <br/>
          {extendedLabel(frame)}
        </div>
      </div>
    {/each}
  </div>
{/if}

<style lang="scss">
  

  #frames {
    display: flex;
    gap: var(--spacing-sm);
    flex-wrap: wrap;
  }

  .frame {
    position: relative;
    width: 16rem;
    aspect-ratio: 1 / 1;
    border: 1px solid var(--border-color);
    line-height: 1.2;
    padding: var(--spacing-sm);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    line-height: 1;
  }

  .remove-btn {
    position: absolute;
    font-size: var(--theme-font-size-s);
    display: flex;
    justify-content: flex-end;
    padding: var(--spacing-sm);
    z-index: 1;
    width: 100%;
    height: 100%;
    inset: 0;
    &:hover {
      background-color: var(--input-background-active);
    }
  }

  .frame-informations {
    margin-top: auto;
    z-index: 2;
    pointer-events: none;

  }

 
</style>
