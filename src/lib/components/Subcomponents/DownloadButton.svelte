<script>
  import { bannerConfig } from "../../js/stores";
  import { createDoctype } from "../../js/doctype";
  import updateDoctype from "../../js/updateDoctype";

  function downloadBanner() {
    // Create a basic HTML node structure, stripped of unecessary code.
    let htmlContent = createDoctype($bannerConfig);

    // Get the current frames in order and create the corresponding HTML, JS, and CSS for each frame.
    htmlContent = updateDoctype(htmlContent, $bannerConfig);

    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "index.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
</script>

<button class="download" on:click={downloadBanner}>download</button>

<style>
  button.download {
    background-color: var(--button-background);
    color: var(--button-text-color);
    height: 4rem;
    width: fit-content;
  }
</style>
