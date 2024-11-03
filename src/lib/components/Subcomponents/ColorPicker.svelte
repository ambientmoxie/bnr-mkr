<script>
  // @ts-nocheck
  import { get } from "svelte/store";
  import { bannerConfig } from "../../js/stores.js";
  import DropDown from "./Dropdown.svelte";

  // Setting "key" variable to know what color we are updating
  export let key = null;
  // Getting the current color to bind it to the input field
  export let value = null;
  // Getting the write placeholder
  export let placeholder = null;

  // Setting a predefined set of color
  const values = [
    "#DAAFE9",
    "#C7DBF5",
    "#AAD5FB",
    "#ADE5DA",
    "#B0EDC3",
    "#FDF0A4",
    "#F8D6A2",
    "#C47ADA",
    "#90BAEE",
    "#75BAFA",
    "#72D5BF",
    "#73DE8C",
    "#FBE66E",
    "#F5B969",
    "#AE44B7",
    "#5E7ABC",
    "#4C6DAA",
    "#4DACA9",
    "#63B75A",
    "#EDBD4A",
    "#EC9740",
    "#501B87",
    "#021B6B",
    "#0C2794",
    "#337277",
    "#2F6A52",
    "#AE802F",
    "#AD6127",
  ];

  const defaultTheme = { ...get(bannerConfig).theme };

  // Update color and store value
  const updateValue = (newValue) => {
    value = newValue;
    let isEmpty = value.trim() === "";
    bannerConfig.update((config) => ({
      ...config,
      theme: {
        ...config.theme,
        [key]: isEmpty ? defaultTheme[key] : value,
      },
    }));
  };
</script>

<DropDown>
  <input
    type="text"
    slot="dd-input"
    {placeholder}
    on:input={(e) => updateValue(e.target.value)}
    bind:value
  />
  <span
    slot="dd-button"
    class="select-color"
    style="background: {value || defaultTheme[key]};"
  >
  </span>
  <div slot="dd-panel" class="values-dropdown">
    <div class="values-dropdown-grid">
      {#each values as val}
        <button
          class:active={val === value}
          style="background: {val};"
          on:click={() => updateValue(val)}
          class="color-block"
        >
        </button>
      {/each}
    </div>
  </div>
</DropDown>

<style lang="scss">
  input {
    flex: 1;
  }

  .select-color {
    display: block;
    aspect-ratio: 1/1;
  }

  .active {
    box-shadow:
      inset 0 0 0 1px #fff,
      0 0 3px 1px rgba(0, 0, 0, 0.25);
  }

  .color-block {
    line-height: 0;
    font-size: 0;
  }

  .values-dropdown {
    padding: 1rem;
    z-index: 1;
    background: transparent;
    border: 1px solid var(--border-color);
  }

  .values-dropdown-grid {
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(4, 3.5rem);
    grid-gap: 10px;
    display: grid;
  }

  .values-dropdown button {
    border: none;
  }
</style>
