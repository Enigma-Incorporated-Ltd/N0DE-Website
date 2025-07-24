import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from "vite-tsconfig-paths";
import tagger from "@dhiwise/component-tagger";



export default defineConfig({
    plugins: [tsconfigPaths(), react(), tagger()],
    build: {
        outDir: 'dist',          // output directory
        assetsDir: 'Assets',     // all assets will go under dist/Assets/
        rollupOptions: {
            output: {
                // keep directory structure for assets like Fonts/ and Img/
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name?.includes('Fonts/')) {
                        return 'Assets/Fonts/[name][extname]';
                    }
                    if (assetInfo.name?.includes('Img/')) {
                        return 'Assets/Img/[name][extname]';
                    }
                    return 'Assets/[name][extname]';
                },
            },
        },
    },
    server: {
        open: true,
        proxy: {
            '/api': {
                target: 'https://localhost:7013',
                // target: 'https://enigmaincapp.azurewebsites.net',
                changeOrigin: true,
                secure: false, // Allow self-signed certificates
            }
        }
    },
    css: {
        postcss: './postcss.config.js'
    },
});
