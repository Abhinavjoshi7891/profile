import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

function assetPrefixPlugin(basePath: string): Plugin {
  const cleanBase = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath
  return {
    name: 'asset-prefix-plugin',
    enforce: 'pre',
    transform(code: string, id: string) {
      if (!cleanBase) return null
      if (id.includes('node_modules')) return null
      if (/\.(tsx|ts|jsx|js)$/.test(id)) {
        let transformed = code
          .replace(/(['"`])\/assets\//g, `$1${cleanBase}/assets/`)
          .replace(/(['"`])\/Abhinav_Joshi/g, `$1${cleanBase}/Abhinav_Joshi`)
          .replace(/(['"`])\/icons\.svg/g, `$1${cleanBase}/icons.svg`)
          .replace(/(['"`])\/favicon\.svg/g, `$1${cleanBase}/favicon.svg`)
          .replace(/(['"`])\/dexter-/g, `$1${cleanBase}/dexter-`)
          .replace(/(['"`])\/dynamoid-nav-report\.html/g, `$1${cleanBase}/dynamoid-nav-report.html`)
          .replace(/(['"`])\/whole-body-arch\.html/g, `$1${cleanBase}/whole-body-arch.html`)
          .replace(/(['"`])\/vla-dock-report\.html/g, `$1${cleanBase}/vla-dock-report.html`)
          .replace(/(['"`])\/rl-docking-brief\.html/g, `$1${cleanBase}/rl-docking-brief.html`)
          .replace(/(['"`])\/pallet-brief\.html/g, `$1${cleanBase}/pallet-brief.html`)
          .replace(/(['"`])\/sam3d-mocap-report\.html/g, `$1${cleanBase}/sam3d-mocap-report.html`)
          .replace(/(['"`])\/architecture\.html/g, `$1${cleanBase}/architecture.html`)
        return { code: transformed, map: null }
      }
      return null
    },
  }
}

export default defineConfig(({ command }) => {
  const isBuild = command === 'build'
  // When building for GitHub Pages, base is '/profile/'. During dev, it remains '/'
  const base = isBuild ? (process.env.BASE_PATH || '/profile/') : '/'

  return {
    base,
    plugins: [
      assetPrefixPlugin(base),
      react(),
    ],
  }
})
