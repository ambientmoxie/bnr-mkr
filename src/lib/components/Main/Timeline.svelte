<script>
  import { bannerConfig } from "../../js/stores";

  // Deleting a frame by creating a new array of frames, excluding the frame that was clicked
  function del(idx) {
    bannerConfig.update((config) => ({
      ...config,
      frames: [...config.frames.filter((_, i) => i !== idx)],
    }));
  }

  // Returns a more descriptive label for each frame.
  function extendedLabel(frame) {
    const labels = {
      logo: "static logo",
      image: "single image",
      text: "simple text",
      carousel: "flkty slider",
      cta: "call to action",
    };
    return labels[frame] || "invalid frame";
  }

  // Helper function to generate styles based on bannerConfig values (for preview purposes)
  function getFrameStyle(config) {
    return `
      background-color: ${config.theme.background};
      color: ${config.theme.text};
    `;
  }
</script>

<!-- Checking if there is frame before creating the frame container -->
{#if $bannerConfig.frames.length > 0}
  <div id="frames">
    <!-- Looping through the frame array to display all the current frames -->
    {#each $bannerConfig.frames as frame, i}
      <!-- Generates a frame with current/selected color attributes for background and text -->
      <div class="frame" style={getFrameStyle($bannerConfig)}>
        <!-- Creates a button inside the banner to easily delete the selected frame -->
        <button on:click={() => del(i)} class="remove-btn">
          <span>remove</span>
          <span class="frame-informations">
            frame {i + 1} <br />
            {extendedLabel(frame)}
          </span>
        </button>
      </div>
    {/each}
  </div>
{/if}

<style lang="scss">
  #frames {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
  }

  .frame {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;

    width: 16rem;
    height: 16rem;
    aspect-ratio: 1 / 1;

    line-height: 1;
    border: 1px solid var(--border-color);
    padding: var(--spacing-sm);
  }

  .remove-btn {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    z-index: 1;
    text-align: left;
    font-size: 1.2rem;
    padding: var(--spacing-sm);
  }
</style>
