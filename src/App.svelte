<script>
  // @ts-nocheck
  import Form from "./lib/components/Main/Form.svelte";
  import LastUpdate from "./lib/components/Main/LastUpdate.svelte";
  import Timeline from "./lib/components/Main/Timeline.svelte";
  import { generateFavIcon } from "./lib/js/helpers";

  generateFavIcon("#00e");
</script>

<header>
  <span>bnr.mkr</span> tool is running. <br />
  Online html5 builder, <br />
  powered by gsap & flickity.
</header>

<div id="notice">
  <p>
    This tool is designed to set up and download simple HTML5 banners with a
    GSAP timeline. Compose your banner by selecting specific frame types in the
    input field below and define basic configurations through the form. The
    website serves as a helper for junior web designers to learn javascript
    animation without the need to use proprietary software. Sketch roughly what
    you need for your banner, download it, then modify what's necessary.
  </p>
</div>

<Timeline />

<Form />

<div id="terms">
  <p>
    This website is developed using svelte (without sveltekit) and generates a
    bundle of static assets. The tool is obviously free; you can play around
    with it, modify it, us it in your projects and so on. Sources are available
    on <a href="https://github.com/ambientmoxie/bnr-mkr" target="_blank">
      github</a
    >. It is offered as-is and may contain bugs.
  </p>
</div>

<LastUpdate />
