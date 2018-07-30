// 缓存静态资源
const staticAssets = [
  './',
  './style.css',
  './app.js'
]

// sw.js 首次被注册时触发
self.addEventListener('install', async event => {
  const cache = await caches.open('news-static')
  console.log('sw.js install event emit')
  cache.addAll(staticAssets)
})

// sw 监听到 fetch 事件时触发
self.addEventListener('fetch', event => {
  const req = event.request

  event.respondWith(cacheFirst(req))
})

// 使用浏览器缓存
async function cacheFirst (req) {
  const cachedResponse = await caches.match(req)
  return cachedResponse || fetch(req)
}