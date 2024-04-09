import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import eslintPlugin from "@nabla/vite-plugin-eslint";
import svgr from 'vite-plugin-svgr';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    svgr({
      svgrOptions: {
      },
    }), 
    eslintPlugin()],
    resolve: {
      alias: {
        pages: path.resolve(__dirname, './src/pages'),
        assets: path.resolve(__dirname, './src/assets'),
        components: path.resolve(__dirname, './src/components'),
        constantes: path.resolve(__dirname, './src/constantes'),
      },
    },
    server:{
      open:true
    }
})
