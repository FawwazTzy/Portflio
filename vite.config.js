import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgx from "@svgx/vite-plugin-react";
// import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgx()],
  build: {
    outDir: "dist",
    sourcemap: false, // Disable source maps for production
    cssCodeSplit: true, // Enable CSS code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Example: Create a separate chunk for 'react'
          react: ["react", "react-dom"],
        },
      },
    },
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs in production
        drop_debugger: true, // Remove debugger statements
      },
    },
  },
  resolve: {
    alias: {
      // "@": path.resolve(__dirname, "./src"), // Alias for src directory
    },
  },
  define: {
    "process.env": {},
  },
  //! sementara untuk mengatasi CORS
  server: {
    // proxy: {
    //   "/api": {
    //     target: "http://103.193.178.21",
    //     changeOrigin: true,
    //     // rewrite: (path) => path.replace(/^\/api/, ""),
    //   },
    // },
    // //! Mengizinkan semua subdomain ngrok
    // allowedHosts: [".ngrok-free.app"],
  },
});
