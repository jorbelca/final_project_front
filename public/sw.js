if(!self.define){let e,s={};const a=(a,i)=>(a=new URL(a+".js",i).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(i,n)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let t={};const r=e=>a(e,c),d={module:{uri:c},exports:t,require:r};s[c]=Promise.all(i.map((e=>d[e]||r(e)))).then((e=>(n(...e),t)))}}define(["./workbox-3c9d0171"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/JWi-kQyWmwt7fsiYnyYdB/_buildManifest.js",revision:"1cdbdf9ff391d2d5a2a4e5ff3baa0448"},{url:"/_next/static/JWi-kQyWmwt7fsiYnyYdB/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/1073-55f349bcb296cf02.js",revision:"JWi-kQyWmwt7fsiYnyYdB"},{url:"/_next/static/chunks/2426-efc3d5487b4e51ac.js",revision:"JWi-kQyWmwt7fsiYnyYdB"},{url:"/_next/static/chunks/5051-6338d35373c92bb8.js",revision:"JWi-kQyWmwt7fsiYnyYdB"},{url:"/_next/static/chunks/5654-ad4d46d6c708f8ff.js",revision:"JWi-kQyWmwt7fsiYnyYdB"},{url:"/_next/static/chunks/6084-7bc883040f70b307.js",revision:"JWi-kQyWmwt7fsiYnyYdB"},{url:"/_next/static/chunks/6329-7e7537d45b67e4a1.js",revision:"JWi-kQyWmwt7fsiYnyYdB"},{url:"/_next/static/chunks/6390-8a87652a619ec11a.js",revision:"JWi-kQyWmwt7fsiYnyYdB"},{url:"/_next/static/chunks/6403-4b6d656d1ef1705f.js",revision:"JWi-kQyWmwt7fsiYnyYdB"},{url:"/_next/static/chunks/6825-05f833398b605006.js",revision:"JWi-kQyWmwt7fsiYnyYdB"},{url:"/_next/static/chunks/8987-13dbd80c8001e98e.js",revision:"JWi-kQyWmwt7fsiYnyYdB"},{url:"/_next/static/chunks/app/_not-found/page-85461f783c0c2d10.js",revision:"JWi-kQyWmwt7fsiYnyYdB"},{url:"/_next/static/chunks/app/api/auth/%5B...nextauth%5D/route-c751ac2ab2e2cf69.js",revision:"JWi-kQyWmwt7fsiYnyYdB"},{url:"/_next/static/chunks/app/api/generate_pdf/route-61d9727bef67ba57.js",revision:"JWi-kQyWmwt7fsiYnyYdB"},{url:"/_next/static/chunks/app/dashboard/(overview)/loading-ed8232f4d3f255e2.js",revision:"JWi-kQyWmwt7fsiYnyYdB"},{url:"/_next/static/chunks/app/dashboard/(overview)/page-f6947f2534efd510.js",revision:"JWi-kQyWmwt7fsiYnyYdB"},{url:"/_next/static/chunks/app/dashboard/budgets/%5Bid%5D/edit/not-found-543f985b08af5e7e.js",revision:"JWi-kQyWmwt7fsiYnyYdB"},{url:"/_next/static/chunks/app/dashboard/budgets/%5Bid%5D/edit/page-e2896bd8ed3090ce.js",revision:"JWi-kQyWmwt7fsiYnyYdB"},{url:"/_next/static/chunks/app/dashboard/budgets/error-8c9da0206d6f1862.js",revision:"JWi-kQyWmwt7fsiYnyYdB"},{url:"/_next/static/chunks/app/dashboard/budgets/page-fa8715293e5390f8.js",revision:"JWi-kQyWmwt7fsiYnyYdB"},{url:"/_next/static/chunks/app/dashboard/clients/create/error-5dde9f37491da089.js",revision:"JWi-kQyWmwt7fsiYnyYdB"},{url:"/_next/static/chunks/app/dashboard/clients/create/page-e0707c63b33c4eca.js",revision:"JWi-kQyWmwt7fsiYnyYdB"},{url:"/_next/static/chunks/app/dashboard/clients/edit/%5Bid%5D/error-a7d7b99796b71686.js",revision:"JWi-kQyWmwt7fsiYnyYdB"},{url:"/_next/static/chunks/app/dashboard/clients/edit/%5Bid%5D/page-45655655e1e85ad6.js",revision:"JWi-kQyWmwt7fsiYnyYdB"},{url:"/_next/static/chunks/app/dashboard/clients/error-115c1598896859fa.js",revision:"JWi-kQyWmwt7fsiYnyYdB"},{url:"/_next/static/chunks/app/dashboard/clients/page-12282cb2186adfa9.js",revision:"JWi-kQyWmwt7fsiYnyYdB"},{url:"/_next/static/chunks/app/dashboard/costs/create/error-3c627ecf0b11d346.js",revision:"JWi-kQyWmwt7fsiYnyYdB"},{url:"/_next/static/chunks/app/dashboard/costs/create/page-1514bc6ce06351c3.js",revision:"JWi-kQyWmwt7fsiYnyYdB"},{url:"/_next/static/chunks/app/dashboard/costs/edit/%5Bid%5D/error-960637e67468c192.js",revision:"JWi-kQyWmwt7fsiYnyYdB"},{url:"/_next/static/chunks/app/dashboard/costs/edit/%5Bid%5D/page-169426637c843bbb.js",revision:"JWi-kQyWmwt7fsiYnyYdB"},{url:"/_next/static/chunks/app/dashboard/costs/error-eeaa9e2d6176f3d1.js",revision:"JWi-kQyWmwt7fsiYnyYdB"},{url:"/_next/static/chunks/app/dashboard/costs/page-a733786f4eedb1c3.js",revision:"JWi-kQyWmwt7fsiYnyYdB"},{url:"/_next/static/chunks/app/dashboard/create/error-64d213ed515e6e25.js",revision:"JWi-kQyWmwt7fsiYnyYdB"},{url:"/_next/static/chunks/app/dashboard/create/page-4dd9767756bd7bbf.js",revision:"JWi-kQyWmwt7fsiYnyYdB"},{url:"/_next/static/chunks/app/dashboard/layout-3ddf4c7c7ca2ddb8.js",revision:"JWi-kQyWmwt7fsiYnyYdB"},{url:"/_next/static/chunks/app/dashboard/subscription/error-5f59150bf73b563e.js",revision:"JWi-kQyWmwt7fsiYnyYdB"},{url:"/_next/static/chunks/app/dashboard/subscription/page-66c621d9c91f7fe4.js",revision:"JWi-kQyWmwt7fsiYnyYdB"},{url:"/_next/static/chunks/app/dashboard/user/error-5ec997658e79052c.js",revision:"JWi-kQyWmwt7fsiYnyYdB"},{url:"/_next/static/chunks/app/dashboard/user/page-e2f828fc2ed9d507.js",revision:"JWi-kQyWmwt7fsiYnyYdB"},{url:"/_next/static/chunks/app/layout-f3b6c7568bd09acd.js",revision:"JWi-kQyWmwt7fsiYnyYdB"},{url:"/_next/static/chunks/app/login/page-3638c20695e8161d.js",revision:"JWi-kQyWmwt7fsiYnyYdB"},{url:"/_next/static/chunks/app/page-071aa7c125e9760f.js",revision:"JWi-kQyWmwt7fsiYnyYdB"},{url:"/_next/static/chunks/app/query/route-ff8f40735af59f04.js",revision:"JWi-kQyWmwt7fsiYnyYdB"},{url:"/_next/static/chunks/app/register/page-2889099aa667dc36.js",revision:"JWi-kQyWmwt7fsiYnyYdB"},{url:"/_next/static/chunks/be3d05f3-6020afca3156b64d.js",revision:"JWi-kQyWmwt7fsiYnyYdB"},{url:"/_next/static/chunks/framework-37fe310501440977.js",revision:"JWi-kQyWmwt7fsiYnyYdB"},{url:"/_next/static/chunks/main-51cabbe4f24c89ec.js",revision:"JWi-kQyWmwt7fsiYnyYdB"},{url:"/_next/static/chunks/main-app-aae4ac5ee352e8b4.js",revision:"JWi-kQyWmwt7fsiYnyYdB"},{url:"/_next/static/chunks/pages/_app-09f6a297d458f5f3.js",revision:"JWi-kQyWmwt7fsiYnyYdB"},{url:"/_next/static/chunks/pages/_error-14d34f99bc1c50fb.js",revision:"JWi-kQyWmwt7fsiYnyYdB"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-338301f0d89860c1.js",revision:"JWi-kQyWmwt7fsiYnyYdB"},{url:"/_next/static/css/0bb3e99e351a2963.css",revision:"0bb3e99e351a2963"},{url:"/_next/static/css/3483d567085ba9b7.css",revision:"3483d567085ba9b7"},{url:"/_next/static/css/f0c38e889a0d62ee.css",revision:"f0c38e889a0d62ee"},{url:"/_next/static/media/155cae559bbd1a77-s.p.woff2",revision:"268d01e94fa0e3a13787891fe19f739c"},{url:"/_next/static/media/162938472036e0a8-s.woff2",revision:"f07093b23087bde42e34448bcbad3f78"},{url:"/_next/static/media/4de1fea1a954a5b6-s.p.woff2",revision:"b7d6b48d8d12946dc808ff39aed6c460"},{url:"/_next/static/media/6d664cce900333ee-s.p.woff2",revision:"017598645bcc882a3610effe171c2ca3"},{url:"/_next/static/media/6ec89c3f4265bc9b-s.woff2",revision:"5396d177b727ae5121d49fda50183c3b"},{url:"/_next/static/media/7cfa6621d35cf216-s.p.woff2",revision:"10ca5cead49d8794475d175622d5f46b"},{url:"/_next/static/media/7ff6869a1704182a-s.p.woff2",revision:"cf5ec3859b05de1b9351ab934b937417"},{url:"/_next/static/media/a4ad98fd7fb9e7bb-s.woff2",revision:"a8aa5d8e5fc839622a5dff6d9aaced19"},{url:"/_next/static/media/a81c0f7b14f15179-s.woff2",revision:"6ef9af3baea28659e0d0c7abe446efae"},{url:"/_next/static/media/af4d27004aa34222-s.woff2",revision:"c5a05a4e2a52b4590fbb511cc93b5045"},{url:"/_next/static/media/f1df658da56627d0-s.woff2",revision:"372d9cf6e4822b41d014fcc9de0a979a"},{url:"/budget.png",revision:"036337a302fd41eaa0ba56b8a19fc1a8"},{url:"/dark_full.png",revision:"840b2fa5c84466f934626cc310b64727"},{url:"/github-mark/github-mark-white.png",revision:"1dee40f2668d5c719eafa2c89296f5e7"},{url:"/github-mark/github-mark.png",revision:"43ce87609eb221d09d4832a9c0e709d0"},{url:"/hero-desktop.png",revision:"a47aff776ddc5a366ddb034f05febfda"},{url:"/hero-mobile.png",revision:"df9fe74c761e4baa93e9419d5efb2313"},{url:"/icon/120.png",revision:"6b6411e784a4a05748f23bb9e38dbb49"},{url:"/icon/128.png",revision:"9b4e3859f32a8e2e375ba311abae28d3"},{url:"/icon/72.png",revision:"7c70e72c2b1badf962a0e8a04082f203"},{url:"/icon/96.png",revision:"2ccde7f4ba47d2f7e3193c42fc898e5d"},{url:"/icon/android-chrome-192x192.png",revision:"9ff907deb4a8c0141ee9cc903f6377a2"},{url:"/icon/android-chrome-512x512.png",revision:"00ccdb383291ed82a5a0b288adad10b0"},{url:"/icon/apple-touch-icon.png",revision:"61a1a72739d94a68f62535302032f5f2"},{url:"/icon/favicon-16x16.png",revision:"aadf0b1afb0b33cb6f59b7d69bf28663"},{url:"/icon/favicon-32x32.png",revision:"bc9f5c5222a4f9993c34ecbb65c5acba"},{url:"/icon/favicon.ico",revision:"594c8b4124efb45b87c4e06507337edd"},{url:"/icon/site.webmanifest",revision:"685a574cb7b4b1eb749fd5327422a9fb"},{url:"/light_full.png",revision:"05206fa274fcc229091bd7956fa47278"},{url:"/splash/apple-icon-180.png",revision:"b44b029cb9152119b9896a2c9ca0e889"},{url:"/splash/apple-splash-1125-2436.jpg",revision:"682ff4c22b29583177cc1ef6d0c46a13"},{url:"/splash/apple-splash-1136-640.jpg",revision:"d044e298f4c46aad206d64dd200109e8"},{url:"/splash/apple-splash-1170-2532.jpg",revision:"5d880b881cce3bb042578797db483461"},{url:"/splash/apple-splash-1179-2556.jpg",revision:"d64e04c7e2c9889f183cae2c3acc7fca"},{url:"/splash/apple-splash-1206-2622.jpg",revision:"1435d6fdedb58dfc33973a18c1321503"},{url:"/splash/apple-splash-1242-2208.jpg",revision:"13e2ce2475f54e5613ebc3f6d56e7fa0"},{url:"/splash/apple-splash-1242-2688.jpg",revision:"a578926b88627aa9e9b19c08574fc6c8"},{url:"/splash/apple-splash-1284-2778.jpg",revision:"df2c1ca3ee0cb35b64883bc5c66bd0cb"},{url:"/splash/apple-splash-1290-2796.jpg",revision:"3100200bd82e92977220815b5a475db9"},{url:"/splash/apple-splash-1320-2868.jpg",revision:"cb65a228dae65b0d57b7fe55d71d9b57"},{url:"/splash/apple-splash-1334-750.jpg",revision:"6783db9881bd642ccee4068828ca7d1d"},{url:"/splash/apple-splash-1488-2266.jpg",revision:"0936cb2e286b5388dd6c8489b42ae8da"},{url:"/splash/apple-splash-1536-2048.jpg",revision:"ee7b920863adfddc4963b09bdcf85ad5"},{url:"/splash/apple-splash-1620-2160.jpg",revision:"abbb59a1978fa55baa8370536d7b9381"},{url:"/splash/apple-splash-1640-2360.jpg",revision:"73ae6f8a85be0dbad64148bb89ac8eb8"},{url:"/splash/apple-splash-1668-2224.jpg",revision:"4d2a682da5e854409b0c3c6372bdc8eb"},{url:"/splash/apple-splash-1668-2388.jpg",revision:"320701fbd5c4ea920da4c65fc8598191"},{url:"/splash/apple-splash-1792-828.jpg",revision:"35f85ecc1bcb82f9e9f6b50dab15e37c"},{url:"/splash/apple-splash-2048-1536.jpg",revision:"16369c4e1b0bdaf521a3a5469a122396"},{url:"/splash/apple-splash-2048-2732.jpg",revision:"20c46956ca6e6867cfea44131a2d8f1f"},{url:"/splash/apple-splash-2160-1620.jpg",revision:"2f317a409c57a668f159ec89ea6457fc"},{url:"/splash/apple-splash-2208-1242.jpg",revision:"80a72e8b8ef63b50db0a06fbd1f5fb1a"},{url:"/splash/apple-splash-2224-1668.jpg",revision:"602401dcf9f87fd5feeb134328a2c46b"},{url:"/splash/apple-splash-2266-1488.jpg",revision:"7bec158473001a7655e6c9c5bcc04789"},{url:"/splash/apple-splash-2360-1640.jpg",revision:"72a7db141c49470ca08ef5539571a0b1"},{url:"/splash/apple-splash-2388-1668.jpg",revision:"c2e6c42d0629bc8380a0070e2c25e3b2"},{url:"/splash/apple-splash-2436-1125.jpg",revision:"5db78153fa032ed49e56441b8de6c3b1"},{url:"/splash/apple-splash-2532-1170.jpg",revision:"852e315fb8462f2c02df57e315096801"},{url:"/splash/apple-splash-2556-1179.jpg",revision:"38ed091558529d7c032dcfe77b250db6"},{url:"/splash/apple-splash-2622-1206.jpg",revision:"91f50f8255753044575fa2aa8f7b16fb"},{url:"/splash/apple-splash-2688-1242.jpg",revision:"0bc25b5e3be4889de744e77e3b479521"},{url:"/splash/apple-splash-2732-2048.jpg",revision:"425f2ca189f3849d2e4a08d0f7e94e9e"},{url:"/splash/apple-splash-2778-1284.jpg",revision:"e462c794e6f7558954f1facb819a6aa7"},{url:"/splash/apple-splash-2796-1290.jpg",revision:"f8f265a9a24b773b30ab28add81cb409"},{url:"/splash/apple-splash-2868-1320.jpg",revision:"05cce7056e79c58849cb8072d85bacd0"},{url:"/splash/apple-splash-640-1136.jpg",revision:"3a6eff9f06dc21a2d64fc2b949804779"},{url:"/splash/apple-splash-750-1334.jpg",revision:"4d96cf0a24197d9e4e3ae1b15cb5f834"},{url:"/splash/apple-splash-828-1792.jpg",revision:"e514e970bc2cfe3c22ef51695e9b840b"},{url:"/splash/favicon-196.png",revision:"d160095d42f04a9d584d47a6aae3e61a"},{url:"/splash/manifest-icon-192.maskable.png",revision:"a66345d0088ff3605c6ef0a4f546a4c7"},{url:"/splash/manifest-icon-512.maskable.png",revision:"84c60bf33ba433169b4c314f7462cdc0"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:function(e){return _ref.apply(this,arguments)}}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((function(e){var s=e.sameOrigin,a=e.url.pathname;return!(!s||a.startsWith("/api/auth/callback")||!a.startsWith("/api/"))}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((function(e){var s=e.request,a=e.url.pathname,i=e.sameOrigin;return"1"===s.headers.get("RSC")&&"1"===s.headers.get("Next-Router-Prefetch")&&i&&!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((function(e){var s=e.request,a=e.url.pathname,i=e.sameOrigin;return"1"===s.headers.get("RSC")&&i&&!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((function(e){var s=e.url.pathname;return e.sameOrigin&&!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((function(e){return!e.sameOrigin}),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
