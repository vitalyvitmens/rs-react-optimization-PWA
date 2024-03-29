const staticCacheName = 'static-site'
const dynamicCacheName = 'dynamic-site'

const ASSETS = [
	'/',
	'/public/index.html',
	'/src/index.css',
	'/src/app.module.css',
	'/src/index.js',
	'/src/App.js',
]

// install event
// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', async (event) => {
	const cache = await caches.open(staticCacheName)
	await cache.addAll(ASSETS)
})

// activated event
// eslint-disable-next-line no-restricted-globals
self.addEventListener('activate', async (event) => {
	const cachesKeysArr = await caches.keys()
	console.log('####: cachesKeysArr', cachesKeysArr)
	await Promise.all(
		cachesKeysArr
			.filter((key) => key !== staticCacheName && key !== dynamicCacheName)
			.map((key) => caches.delete(key))
	)
})

// fetch event
// eslint-disable-next-line no-restricted-globals
self.addEventListener('fetch', (event) => {
	event.respondWith(cacheFirst(event.request))
})

async function cacheFirst(request) {
	const cached = await caches.match(request)
	try {
		return (
			cached ??
			(await fetch(request).then((response) => {
				return networkFirst(request)
			}))
		)
	} catch (error) {
		return networkFirst(request)
	}
}

async function networkFirst(request) {
	const cache = await caches.open(dynamicCacheName)
	try {
		const response = await fetch(request)
		await cache.put(request, response.clone())
		return response
	} catch (error) {
		console.log('####: error', error)
		const cached = await cache.match(request)
		return cached ?? (await caches.match('src/pages/NotFound/NotFound.jsx'))
	}
}
