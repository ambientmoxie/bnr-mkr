<script>
  import Form from "./lib/components/Form.svelte";
  import LastUpdate from "./lib/components/LastUpdate.svelte";
  import Timeline from "./lib/components/Timeline.svelte";
  import { generateFavIcon } from "./lib/js/helpers";
  import { bannerConfig } from "./lib/js/stores";

  // Setting "night time" between 6pm and 7am
  const hour = new Date().getHours();
  // const isNightTime = hour <= 18 || hour > 7;
  const isNightTime = true;

  // Determine if dark or light mode is displayed
  const currentTheme = isNightTime ? "dark-theme" : "light-theme";
  document.body.className = currentTheme;
  
  // Determine if favicon is white or black
  const faviconColor = !isNightTime ? "white" : "black";
  generateFavIcon(faviconColor);
  
  // Setting
  bannerConfig.update((config) => {
    return {
      ...config,
      theme: {
        background: isNightTime ? "#000" : "#fff",
        text: isNightTime ? "#e0e0e0" : "#000",
      },
    };
  });

  
  

</script>

<header>
  <span>bnr.mkr</span> tool is running. <br />
  Online  html5 builder, <br />
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
