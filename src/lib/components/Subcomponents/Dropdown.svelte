<script>
  import { createEventDispatcher } from "svelte";

  // Set up event dispatcher
  const dispatch = createEventDispatcher();

  export function clickOutside(node) {
    const handleClick = (event) => {
      if (node && !node.contains(event.target) && !event.defaultPrevented) {
        node.dispatchEvent(new CustomEvent("click_outside"));
      }
    };

    document.addEventListener("click", handleClick, true);

    return {
      destroy() {
        document.removeEventListener("click", handleClick, true);
      },
    };
  }

  // Setting default visibility of option panel to false
  let ddActive = false;

  // Toggle dropdown visibility
  function toggleDropdown() {
    ddActive = !ddActive;
    dispatch("toggle", { isActive: ddActive });
  }

  // Close dropdown when clicked outside
  function clickOutsideDropdown() {
    ddActive = false;
    dispatch("toggle", { isActive: ddActive });
  }
</script>

<div
  class="dd-wrapper"
  use:clickOutside
  on:click_outside={clickOutsideDropdown}
>
  <div class="dd-control">
    <slot name="dd-input" />
    <button class="dd-button" on:click={toggleDropdown}>
      <slot name="dd-button" />
    </button>
  </div>
  {#if ddActive}
    <div class="dd-panel">
      <slot name="dd-panel" />
    </div>
  {/if}
</div>

<style lang="scss">
  .dd-control {
    display: flex;
    gap: var(--spacing-sm);

    :global(input) {
      flex: 1;
    }

    button {
      width: 4rem;
      height: 100%;
      aspect-ratio: 1/1;
      border: 1px solid var(--border-color);
    }
  }

  .dd-panel {
    margin-top: var(--spacing-sm);
  }
</style>
