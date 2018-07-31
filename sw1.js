
// 缓存静态资源
const staticAssets = [
  './sw.js'
]
console.log('sw1.js')
// sw.js 首次被注册时触发
self.addEventListener('install', async event => {
  const cache = await caches.open('news-static1')
  console.log('sw1.js install event emit')
  cache.addAll(staticAssets)
})