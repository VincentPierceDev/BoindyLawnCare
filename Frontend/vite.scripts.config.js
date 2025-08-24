import { defineConfig } from "vite";

export default defineConfig({
    publicDir: false, //prevent copying anything from public
    build: {
        outDir: 'public/Scripts',
        emptyOutDir: true, //only clear Scripts subfolder
        rollupOptions: {
            input: {
                //DropDownMenu: path.resolve(__dirname, 'src/_Scripts/NavBar/DropDownMenu.ts'),
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