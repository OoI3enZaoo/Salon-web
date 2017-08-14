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
    "url": "/_nuxt/0.nuxt.bundle.30a351fe7ee9eea9aaae.js",
    "revision": "8e34b1432333b62fb16a08d1f2aa6cff"
  },
  {
    "url": "/_nuxt/1.nuxt.bundle.c2f1f7500ff5a28520de.js",
    "revision": "21236cce3f76ac6896253cd2f942a195"
  },
  {
    "url": "/_nuxt/2.nuxt.bundle.93bd4c31fcd91326cfbd.js",
    "revision": "19d48e7c3efbcc3ff4c9bf0d5582c415"
  },
  {
    "url": "/_nuxt/3.nuxt.bundle.48c878b3c267a8779b8a.js",
    "revision": "a17e6f220eb6af0f52e33cc8f316ef5f"
  },
  {
    "url": "/_nuxt/4.nuxt.bundle.9bf12e5179fbd9dca7f3.js",
    "revision": "041f07f17f79dcc24dfb952c93e585ba"
  },
  {
    "url": "/_nuxt/5.nuxt.bundle.811f58ffd68df740108d.js",
    "revision": "328b842a078ae441ab4839c5ed745080"
  },
  {
    "url": "/_nuxt/6.nuxt.bundle.87e936f47c23e563939a.js",
    "revision": "c7a34e8dab11b9104f718b6c62cd8f3b"
  },
  {
    "url": "/_nuxt/7.nuxt.bundle.5c89b50572e2a02e1264.js",
    "revision": "16ab9be0e5db43f8e729492de2606c21"
  },
  {
    "url": "/_nuxt/8.nuxt.bundle.0886529d45edb9ab511e.js",
    "revision": "62c26ecb9203068c73c2407d82fb03c8"
  },
  {
    "url": "/_nuxt/9.nuxt.bundle.f304471e0b6a62be4bdf.js",
    "revision": "6c16cf11098056e3db35c28e68eaed94"
  },
  {
    "url": "/_nuxt/manifest.210abd7c24e1192105b6.js",
    "revision": "4fddf14189f1e0a70cd1acfc0e5ff6a2"
  },
  {
    "url": "/_nuxt/nuxt.bundle.0555b790e021b0e750c4.js",
    "revision": "9a546151491b5349f821c373e68e196f"
  },
  {
    "url": "/_nuxt/vendor.bundle.ccfce824c4f161d82e4c.js",
    "revision": "16b289759c337250eaa759206a719fe6"
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
