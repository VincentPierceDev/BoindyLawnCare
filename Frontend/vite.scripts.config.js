import { defineConfig } from "vite";
import path from 'path';

export default defineConfig({
    publicDir: false, //prevent copying anything from public
    build: {
        outDir: 'public/Scripts',
        emptyOutDir: true, //only clear Scripts subfolder
        rollupOptions: {
            input: {
                NavBar: path.resolve(__dirname, 'src/_Scripts/Navbar.ts'),
                Index: path.resolve(__dirname, 'src/_Scripts/Index.ts'),
            },
            output: {
                entryFileNames: '[name].js',
                format: 'es',
                chunkFileNames: undefined,
                assetFileNames: undefined,
            },
        },
        target: 'esnext',
        minify: true,
        sourcemap: false,
    },
});