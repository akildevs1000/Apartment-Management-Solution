// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        // <meta name="viewport" content="width=device-width, initial-scale=1">
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      script: [
        {
          src: "/js/bootstrap.js",
        },
        {
          src: "/plugins/common/common.min.js",
          body: true,
        },
        {
          src: "/js/custom.min.js",
          body: true,
        },
        {
          src: "/js/settings.js",
          body: true,
        },
        {
          src: "/js/gleek.js",
          body: true,
        },
        {
          src: "/js/styleSwitcher.js",
          body: true,
        },
        {
          src: "/plugins/chart.js/Chart.bundle.min.js",
          body: true,
        },
        {
          src: "/plugins/circle-progress/circle-progress.min.js",
          body: true,
        },
        {
          src: "/plugins/d3v3/index.js",
          body: true,
        },
        {
          src: "/plugins/topojson/topojson.min.js",
          body: true,
        },
        {
          src: "/plugins/datamaps/datamaps.world.min.js",
          body: true,
        },
        {
          src: "/plugins/raphael/raphael.min.js",
          body: true,
        },
        {
          src: "/plugins/morris/morris.min.js",
          body: true,
        },
        {
          src: "/plugins/moment/moment.min.js",
          body: true,
        },
        {
          src: "/plugins/pg-calendar/js/pignose.calendar.min.js",
          body: true,
        },
        {
          src: "/plugins/chartist-plugin-tooltips/js/chartist-plugin-tooltip.min.js",
          body: true,
        },
      ],
      link: [
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css",
        },
        {
          rel: "stylesheet",
          href: "/css/bootstrap.css",
        },
        {
          rel: "stylesheet",
          href: "/plugins/chartist/css/chartist.min.css",
        },
        {
          rel: "stylesheet",
          href: "/plugins/chartist-plugin-tooltips/css/chartist-plugin-tooltip.css",
        },
        {
          rel: "stylesheet",
          href: "/css/style.css",
        },
      ],
      // please note that this is an area that is likely to change
      style: [
        // <style type="text/css">:root { color: red }</style>
        // { children: ":root { color: red }", type: "text/css" },
      ],
      noscript: [
        // <noscript>JavaScript is required</noscript>
        { children: "JavaScript is required" },
      ],
    },
  },
});
