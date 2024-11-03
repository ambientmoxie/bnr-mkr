<script>
  import { truncateString } from "../../js/helpers";
  import Dropzone from "svelte-file-dropzone";

  export let bannerConfig = null;

  function readSVGFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }

  // Handle svg transformation.
  function handleSVGTransformation(svgText) {
    // Create a new DOMParser instance, which will allow us to convert strings of XML or HTML into DOM objects
    const parser = new DOMParser();
    // Parse the svgText string (which contains SVG markup) into an XML DOM structure,
    // specifying that the input is of type "image/svg+xml". This will convert the string into a document object.
    const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
    // Query the parsed document to select the <svg> element within it.
    // This returns the actual <svg> DOM element from the parsed document.
    const svgElement = svgDoc.querySelector("svg");
    // Ensure that the svg element is successfully retrieved.
    if (!svgElement) return null;

    // Checking for the presence of certain attributes
    const viewBox = svgElement.getAttribute("viewBox");
    const width = svgElement.getAttribute("width");
    const height = svgElement.getAttribute("height");

    // Default value assignment
    let svgViewBox = "0 0 100 100";
    let svgWidth = 100;
    let svgHeight = 100;

    // Conditionally setting attribute values
    if (viewBox) {
      const [vbWidth, vbHeight] = viewBox.split(" ").slice(2).map(Number);
      svgViewBox = viewBox;
      svgWidth = vbWidth;
      svgHeight = vbHeight;
    } else if (width && height) {
      svgWidth = Number(width);
      svgHeight = Number(height);
      svgViewBox = `0 0 ${svgWidth} ${svgHeight}`;
    }

    // If the "fill" attribute if empty or not present, we are setting an empty value.
    const svgFill = svgElement.getAttribute("fill") || "";
    const xmlns =
      svgElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg";

    // Check if our logo is vertical or not. This will be used for css fine-tuning.
    const isVertical = Number(svgWidth) / Number(svgHeight) < 1;

    // We are extracting the inner content of the <svg> tag, then creating the final SVG symbol.
    const innerContent = svgElement.innerHTML;
    const transformedSVG = `
      <svg>
        <symbol id="my-logo" viewBox="${svgViewBox}" xmlns="${xmlns}" fill="${svgFill}">
          ${innerContent}
        </symbol>
      </svg>
    `;

    // Update the configuration store with our new values.
    bannerConfig.update((config) => ({
      ...config,
      logo: {
        ...config.logo,
        code: transformedSVG,
        width: Number(svgWidth), // Converting string into number
        height: Number(svgHeight), // Converting string into number
        isVertical: isVertical,
      },
    }));
  }

  let files = {
    accepted: [],
    rejected: [],
  };

  async function handleFilesSelect(e) {
    const { acceptedFiles, fileRejections } = e.detail;

    // Don't go further is more than 1 file is uploaded.
    if (files.accepted.length > 0) {
      console.log("Only one file accepted");
      return;
    }
    // Update the "accepted" and "reject" array with the new file
    files.accepted = [...files.accepted, ...acceptedFiles];
    files.rejected = [...files.rejected, ...fileRejections];

    // Retrieve the new (and unique) file.
    const svgLogo = acceptedFiles[0];

    // Check if this is a SVG.
    if (svgLogo.type === "image/svg+xml") {
      // Reading the file as a string for extracting and manipulating the data.
      const svgContent = await readSVGFile(svgLogo);
      // Transforming the loaded SVG into a symbol with correct width, height and fill attributes.
      handleSVGTransformation(svgContent);
    }
  }
</script>

<Dropzone
  class="custom-dropzone"
  accept="image/svg+xml"
  on:drop={handleFilesSelect}
>
  <p>Logo (*svg only)</p>
</Dropzone>

{#if files.accepted.length > 0}
  <ol>
    {#each files.accepted as item}
      <li>{truncateString(item.name, 10)}</li>
    {/each}
  </ol>
{/if}

<style lang="scss">
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
