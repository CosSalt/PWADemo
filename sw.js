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
  const url = new URL(req.url)

  // 但本地开发时可以这么配置
  if(url.origin === location.origin) {
    event.respondWith(cacheFirst(req))
  } else if ((req.url.indexOf('http') !== -1)) {
    // chrome 的 https 协议限制,几口必须满足https
    event.respondWith(networkFirst(req))
  }
})

// 使用浏览器缓存
async function cacheFirst (req) {
  const cachedResponse = await caches.match(req)
  return cachedResponse || fetch(req)
}

// 网络优先
async function networkFirst (req) {
  // 将请求到的数据缓存在 id 为 news-dynamic 中
  const cache = await caches.open('news-dynamic')
  try {
    const res = await fetch(req) // 获取数据
    cache.put(req, res.clone()) // 更新缓存
    return res
  } catch (err) {
    return await cache.match(req) // 报错则使用缓存 
  }
}