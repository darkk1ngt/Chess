// @ts-check
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

// Docs: https://rsbuild.rs/config/
export default defineConfig({
  plugins: [pluginReact()],
  html : {
    favicon : './public/favicon.jpg',
    title: 'Dark Chess'
  },
  source : {
    entry : {
      index : './src/Main.jsx'
    }
  }
});



