import { defineConfig } from 'vite'
import { resolve } from 'path'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        contacts: resolve(__dirname, 'contacts.html'), // Assuming this is a page
        works: resolve(__dirname, 'works.html'),       // Assuming this is a page
        projects: resolve(__dirname, 'projects.html'), // Assuming this is a page
        // If you have more HTML files, add them here
      },
    },
  },
  server: {
    host: true
  }
  
})
