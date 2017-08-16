importScripts('workbox-sw.prod.v1.3.0.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const fileManifest = [
  {
    "url": "/_nuxt/0.nuxt.bundle.3a4f4f4370d14a8ea7b3.js",
    "revision": "1f8a0b8269eb9c202916f3239e666911"
  },
  {
    "url": "/_nuxt/1.nuxt.bundle.3e2f955af5193753ee82.js",
    "revision": "c1f27a478ca42a32ae4e57bb2697d426"
  },
  {
    "url": "/_nuxt/2.nuxt.bundle.718f7f386e840176351b.js",
    "revision": "66177df991aff51709733a84b5ddac23"
  },
  {
    "url": "/_nuxt/3.nuxt.bundle.810e3499933eaead2110.js",
    "revision": "7bc883813067ddf17bb2126d7b7831bd"
  },
  {
    "url": "/_nuxt/4.nuxt.bundle.baf875915c67ffd5aaa0.js",
    "revision": "f48751e9d8f268a49bac01c82f25946c"
  },
  {
    "url": "/_nuxt/5.nuxt.bundle.7515ce83f9239c7537db.js",
    "revision": "5082408f5c14a5d61e0b654a20be00f8"
  },
  {
    "url": "/_nuxt/6.nuxt.bundle.bb1612a2403456a355a2.js",
    "revision": "9f8fa946cb56a14e3460ca16dbfc16d7"
  },
  {
    "url": "/_nuxt/7.nuxt.bundle.44c66b4a27a39acba444.js",
    "revision": "bb7ac26ed2d0721cff5a20275e895e8f"
  },
  {
    "url": "/_nuxt/8.nuxt.bundle.8dd2173c47367c3d592e.js",
    "revision": "d8417f783184b0ee58f22185be7b580b"
  },
  {
    "url": "/_nuxt/9.nuxt.bundle.33f32bdd834cb32263fe.js",
    "revision": "42455b091a9debb9b8564274bda24396"
  },
  {
    "url": "/_nuxt/manifest.c7d74afee8b80c5a35bb.js",
    "revision": "fb68766ce00dc4eea8dcc9695725949d"
  },
  {
    "url": "/_nuxt/nuxt.bundle.a741654052b9af20689f.js",
    "revision": "bbcedeffadcbf3d1ce6d1751c8aff104"
  },
  {
    "url": "/_nuxt/vendor.bundle.c0a9a22ea3b3cf960286.js",
    "revision": "806142a9634e35d8a4552082971e9687"
  }
];

const workboxSW = new self.WorkboxSW({
  "cacheId": "f_1.0.0",
  "clientsClaim": true,
  "directoryIndex": "/"
});
workboxSW.precache(fileManifest);
workboxSW.router.registerRoute('/**', workboxSW.strategies.networkFirst({}), 'GET');
workboxSW.router.registerRoute('/_nuxt/**', workboxSW.strategies.cacheFirst({}), 'GET');
