let cache = 'tennis-log';
let filesToCache = [
    'index.html',
];
self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(cache).then(function(cache) {
            return cache.addAll(filesToCache);
        })
    );
});
self.addEventListener("activate", event => {

});
self.addEventListener('fetch', function(event) {

});
