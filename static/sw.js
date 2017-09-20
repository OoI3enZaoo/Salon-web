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
    "url": "/_nuxt/app.de57bb601f543e9a29fa.js",
    "revision": "67a7fffc46ce1c71212d921eea948acf"
  },
  {
    "url": "/_nuxt/common.3919789674d886ab91f0.js",
    "revision": "6bd75d56f35f396d177bb7e2a77a7daf"
  },
  {
    "url": "/_nuxt/common.7439bbe7526cf1abc0dd323dd8818d08.css",
    "revision": "dc97204c0286aa0dd3050db04dd21075"
  },
  {
    "url": "/_nuxt/layouts/default.3d138fc9a9d86ef85c01.js",
    "revision": "60a49a15e8adb245797a4c98ceabee73"
  },
  {
    "url": "/_nuxt/manifest.7ef1a2a431840d8b174b.js",
    "revision": "e4d0578af9d8e595c2e0c5f7b9407f90"
  },
  {
    "url": "/_nuxt/pages/home.9186d67165e42482448e.js",
    "revision": "88db12e05fd28b1bec998570524fa7e4"
  },
  {
    "url": "/_nuxt/pages/index.c3b6d465c2419b231db8.js",
    "revision": "aac85f2390c75b468bf9efc3a2ce11b3"
  },
  {
    "url": "/_nuxt/pages/inspire.31cdba76a48da6dafaec.js",
    "revision": "6a36de45f52e824ec6577081b32b7d04"
  },
  {
    "url": "/_nuxt/pages/logout.f0072a7551811fc8a2a4.js",
    "revision": "1747fecdb75a7d607d0b7d457a65234e"
  },
  {
    "url": "/_nuxt/pages/manage\\_courses\\_title.b295cd51db048a6f72fb.js",
    "revision": "4d2a26843ca958f9aa3ca3054f306c54"
  },
  {
    "url": "/_nuxt/pages/manage\\index.71937aeb66b61aa5a017.js",
    "revision": "863d781f5d0ff1fab5b7a4c3129c03ff"
  },
  {
    "url": "/_nuxt/pages/member.afd1cabdb0baa9e1f9a5.js",
    "revision": "3fca568c9317c1dca3538a0596c7399a"
  },
  {
    "url": "/_nuxt/pages/message.581b93627dfe67b0da5b.js",
    "revision": "f15a954c6a9e793ed454a8f5690d6a99"
  },
  {
    "url": "/_nuxt/pages/use\\_id.9f238ebbeaf3c7ec261d.js",
    "revision": "578800b08a0e1d792e34092a29a73251"
  },
  {
    "url": "/_nuxt/pages/users\\_id.014ef0f86ef244e1871b.js",
    "revision": "24ea22c9211a63281304be4cf04f5be1"
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
