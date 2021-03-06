import {defineConfig} from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import {resolve} from 'path'
// https://vitejs.dev/config/
export default defineConfig({
    root: 'client',
    build: {
        emptyOutDir: true,
        outDir: resolve('public')
    },
    server: {
        open: '/'
    },
    plugins: [reactRefresh()]
})
