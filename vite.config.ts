import { defineConfig } from 'vite';
import postcssImport from 'postcss-import';
import react from '@vitejs/plugin-react';

interface AtRule {
    name: string;
    remove: () => void;
}

export default defineConfig({
    plugins: [react()],
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
        
    },
    css: {
        postcss: {
            plugins: [
                postcssImport(),
                {
                    postcssPlugin: 'strip-charset',
                    AtRule: {
                        charset: (atRule: AtRule) => {
                            if (atRule.name === 'charset') {
                                atRule.remove();
                            }
                        },
                    },
                },
            ],
        },
    },
});
