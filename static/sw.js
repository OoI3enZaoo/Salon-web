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
    "url": "/_nuxt/app.f4879b330255a39ef102.js",
    "revision": "31b159c8b57e5968e477548a8ae6d3dc"
  },
  {
    "url": "/_nuxt/common.710d6b607581cc17a8a8.js",
    "revision": "cd6471b6337f3b68263f7e64705ea9ca"
  },
  {
    "url": "/_nuxt/common.9fe8054654e621fe561911cf427b36f5.css",
    "revision": "5cd94c1773e335d3a8fc1f0a7ade2d25"
  },
  {
    "url": "/_nuxt/layouts/default.190241c45ed0871535c7.js",
    "revision": "2a15766331046c84fc0c6fb90c76f5b2"
  },
  {
    "url": "/_nuxt/manifest.c810280644e618c968d5.js",
    "revision": "bccb343652a995abe142c34081d1b1b3"
  },
  {
    "url": "/_nuxt/pages/home.e3297259e62e18bf02d8.js",
    "revision": "48ca8822c8b614c9c7d98b4957f5ea89"
  },
  {
    "url": "/_nuxt/pages/index.9babfebc393821e9ed71.js",
    "revision": "0c9efeccc78eabbda5d889b86aa8d6f6"
  },
  {
    "url": "/_nuxt/pages/logout.c32b7daca20fbae90311.js",
    "revision": "a6a2d41661e4b099bbd220704a9e8920"
  },
  {
    "url": "/_nuxt/pages/manage\\course\\_course_id\\_lesson_id\\index.326385b7bb4bb6215dac.js",
    "revision": "e9595bf98e45e31dfcaa7dab0c19cacc"
  },
  {
    "url": "/_nuxt/pages/manage\\course\\_course_id\\index.9db64b0bc26f6c11bed7.js",
    "revision": "240403a5a020d3962fcc0a7f343423cb"
  },
  {
    "url": "/_nuxt/pages/manage\\index.8fa0a148e67e34a4bbd3.js",
    "revision": "15eac774caefe29698726a7e2ff7985d"
  },
  {
    "url": "/_nuxt/pages/member.e822d612c17f94e928b4.js",
    "revision": "0cc5a1b89262688c3398ea4807ea97af"
  },
  {
    "url": "/_nuxt/pages/message.8c3497ee56950528d4b7.js",
    "revision": "f6bd08129741476f43ec75d995b6e667"
  },
  {
    "url": "/_nuxt/pages/use\\_id.ee97e1db7cfb22980ba9.js",
    "revision": "bf0bb748175f711787d67cb871091056"
  },
  {
    "url": "/_nuxt/pages/users\\_id.3f903ebbbf72abcc3377.js",
    "revision": "1dbcb963ba8f351d3ddebf4c4bae64ae"
  }
];

const workboxSW = new self.WorkboxSW({
  "cacheId": "salon_1.0.0",
  "clientsClaim": true,
  "directoryIndex": "/"
});
workboxSW.precache(fileManifest);
workboxSW.router.registerRoute('/**', workboxSW.strategies.networkFirst({}), 'GET');
workboxSW.router.registerRoute('/_nuxt/**', workboxSW.strategies.cacheFirst({}), 'GET');
