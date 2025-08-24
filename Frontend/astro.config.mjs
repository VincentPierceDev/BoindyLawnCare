import { defineConfig } from 'astro/config';

export default defineConfig({
  server: {
      host: true
  },

  devToolbar: {
      enabled: false
  },

  build: {
      inlineStylesheets: 'never',
  },

  experimental: {
    fonts: [
        {
            provider: "local",
            name: "Raleway",
            cssVariable: "--heading-font",
            variants: [
                {
                    src: ["./src/assets/fonts/raleway/custom-400.woff2"],
                    weight: 400,
                    style: "normal"
                },
                {
                    src: ["./src/assets/fonts/raleway/custom-700.woff2"],
                    weight: 700,
                    style: "normal"
                },
                {
                    src: ["./src/assets/fonts/raleway/custom-900.woff2"],
                    weight: 900,
                    style: "normal"
                }
            ]
        },
        {
            provider: "local",
            name: "Roboto",
            cssVariable: "--body-font",
            variants: [
                {
                    src: ["./src/assets/fonts/Roboto.woff2"],
                    weight: "[100, 200, 300, 400, 500, 600, 700, 800, 900]",
                    style: "normal"
                }
            ]
        }
    ]
  },
 
  trailingSlash: 'never',
  base: '/',
  output: 'static',
  integrations: [],
});
