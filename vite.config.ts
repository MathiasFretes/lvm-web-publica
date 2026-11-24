import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()], base: process.env.LVM_PUBLIC_ASSET_BASE || '/',
  define: { __DEV__: false, 'process.env.NODE_ENV': JSON.stringify('production') },
  resolve: { alias: [
    { find: /^react-native$/, replacement: 'react-native-web' },
    { find: 'expo-linear-gradient', replacement: path.resolve('src/legacy/LinearGradient.jsx') },
    { find: /^(\.\.\/|\.\/)+firebaseService$/, replacement: path.resolve('src/legacy/contentService.js') },
  ] },
})
