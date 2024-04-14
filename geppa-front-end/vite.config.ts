import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

const apiBaseUrlProd = process.env.VITE_API_BASE_URL_PROD || '';

export default defineConfig(() => {
    return {
        plugins: [react()],
        build: {
            minify: true
        },
        define: {
            'process.env.VITE_API_BASE_URL_PROD': JSON.stringify(apiBaseUrlProd),
        },
    };
});