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
    "url": "/_nuxt/app.279998b07a63fb71aa86.js",
    "revision": "f389be72d16f16c1d2d688694e3e5aef"
  },
  {
    "url": "/_nuxt/common.0b512fd6f88842c8978c.js",
    "revision": "35ca8c69e471929e2cfc879be8befbe6"
  },
  {
    "url": "/_nuxt/common.9fe8054654e621fe561911cf427b36f5.css",
    "revision": "5cd94c1773e335d3a8fc1f0a7ade2d25"
  },
  {
    "url": "/_nuxt/layouts/default.5940e1dd0e99497b02a0.js",
    "revision": "65b90298f5c406ab71325a06442d0219"
  },
  {
    "url": "/_nuxt/manifest.5a4e567b7fe0d32d6e33.js",
    "revision": "c5f02cc0c1168b6aead91d1fd1e51d5a"
  },
  {
    "url": "/_nuxt/pages/home.470f3f759934a534ed3c.js",
    "revision": "c38fc8eac5fb76e4ce024ae35c7d73dc"
  },
  {
    "url": "/_nuxt/pages/index.c49cc08d3a7b5bbc0563.js",
    "revision": "378d7e0faeecd823ebdb729dd018e41f"
  },
  {
    "url": "/_nuxt/pages/logout.c0264b5c816d36058e78.js",
    "revision": "c9d0c177ef66cf7886c735daa78ffd3b"
  },
  {
    "url": "/_nuxt/pages/manage\\_courses\\_lesson.df912ceda4b3317b1f67.js",
    "revision": "3482f3bdc5f0606fc341c01153b6cdbe"
  },
  {
    "url": "/_nuxt/pages/manage\\course\\_course_id\\_lesson_id\\index.6accec5905a049918b9b.js",
    "revision": "751d51c9c1acfeedc03de875cd2d03d5"
  },
  {
    "url": "/_nuxt/pages/manage\\course\\_course_id\\index.0b9c3a576b242a33ae42.js",
    "revision": "15e7f1ca636e353a2b6250a7e63f1723"
  },
  {
    "url": "/_nuxt/pages/manage\\index.cf3ae6c5674b3f4f3f89.js",
    "revision": "70185ec508c859fbd864cb37b6c34f08"
  },
  {
    "url": "/_nuxt/pages/member.73f0e85013cc9618d20d.js",
    "revision": "7b6137ba095a54bcfa91747e9150e3c0"
  },
  {
    "url": "/_nuxt/pages/message.9ba02fff3920b4d01153.js",
    "revision": "39bbd130ad42390c57a9eac94c2eeab4"
  },
  {
    "url": "/_nuxt/pages/use\\_id.2bfbe39c60c39086a498.js",
    "revision": "a658e05b1b728a1633843eabb58cbf96"
  },
  {
    "url": "/_nuxt/pages/users\\_id.dc37900fbac407546ad3.js",
    "revision": "1c223e8b11a38c56748baa3a608641f8"
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
