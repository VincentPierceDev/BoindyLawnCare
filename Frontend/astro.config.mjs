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
  trailingSlash: 'always',
  base: '/',
  site: 'https://boindylawncare.netlify.app/',
  output: 'static',
  integrations: [],
});
