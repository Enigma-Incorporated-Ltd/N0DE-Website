import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from "vite-tsconfig-paths";
import tagger from "@dhiwise/component-tagger";



export default defineConfig({
    plugins: [tsconfigPaths(), react(), tagger()],
    assetsInclude: ["**/*.webp"],
    build: {
        outDir: 'dist',          // output directory
        assetsDir: 'assets',     // all assets will go under dist/assets/ (lowercase)
        rollupOptions: {
            output: {
                // keep directory structure for assets like fonts/ and img/
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name?.includes('fonts/')) {
                        return 'assets/fonts/[name][extname]';
                    }
                    if (assetInfo.name?.includes('img/')) {
                        return 'assets/img/[name][extname]';
                    }
                    return 'assets/[name][extname]';
                },
            },
        },
    },
    server: {
        open: true,
        proxy: {
            '/api': {
                target: 'https://enigmaincapp.azurewebsites.net',
                changeOrigin: true,
                secure: false, // Allow self-signed certificates
            }
        }
    },
    css: {
        postcss: './postcss.config.js'
    },
});
