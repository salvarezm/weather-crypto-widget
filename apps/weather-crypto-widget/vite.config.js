import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/my-widget.ts',
      formats: ['es'],
      fileName: 'my-widget',
    },
  },
  preview: {
    cors: true,
  },
});
