import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5000,
    open:true,
    proxy:{
      '/api':{
        target:'http://localhost:3000',
        changeOrigin:true,
        rewrite:(path)=>path.replace(/^\/api/,'')
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})