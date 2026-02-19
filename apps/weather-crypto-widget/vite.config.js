import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/weather-crypto-widget.ts',
      formats: ['es'],
      fileName: 'weather-crypto-widget',
    },
  },
  preview: {
    cors: true,
  },
});
