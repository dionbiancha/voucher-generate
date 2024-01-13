// service-worker.ts

// Adicione as importações necessárias aqui

// Configura as opções de cache
const CACHE_NAME = "my-pwa-cache";
const CACHE_VERSION = "v1";
const CACHE_URLS = ["/"];

// Instala o service worker e adiciona os recursos no cache
self.addEventListener("install", (event: ExtendableEvent) => {
  event.waitUntil(
    caches
      .open(`${CACHE_NAME}-${CACHE_VERSION}`)
      .then((cache) => cache.addAll(CACHE_URLS))
  );
});

// Intercepta as solicitações de rede e retorna os recursos em cache se disponíveis
self.addEventListener("fetch", (event: FetchEvent) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }

      return fetch(event.request);
    })
  );
});
