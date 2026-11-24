// 録音メモ：電波が悪い場所でも、アプリ本体を開けるようにする控え（通信できるときは、いつも最新を取りに行く）
const C = 'rokuon-memo-v1';
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', function (e) {
  var r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== self.location.origin) return;
  e.respondWith(fetch(r).then(function (res) {
    var c = res.clone(); caches.open(C).then(function (ch) { ch.put(r, c); });
    return res;
  }).catch(function () {
    return caches.match(r).then(function (m) { return m || caches.match('./index.html') || caches.match('./'); });
  }));
});
