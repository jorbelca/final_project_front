if(!self.define){let e,n={};const c=(c,s)=>(c=new URL(c+".js",s).href,n[c]||new Promise((n=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=n,document.head.appendChild(e)}else e=c,importScripts(c),n()})).then((()=>{let e=n[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(s,a)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(n[i])return;let t={};const d=e=>c(e,i),r={module:{uri:i},exports:t,require:d};n[i]=Promise.all(s.map((e=>r[e]||d(e)))).then((e=>(a(...e),t)))}}define(["./workbox-3c9d0171"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/44ncFMiHdWj2nZf2S_lcN/_buildManifest.js",revision:"e535dd7e9959f56be82ddb4cf3753e2d"},{url:"/_next/static/44ncFMiHdWj2nZf2S_lcN/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/390-0d2800163e6e1c62.js",revision:"44ncFMiHdWj2nZf2S_lcN"},{url:"/_next/static/chunks/403-cc5f9c67c92792f7.js",revision:"44ncFMiHdWj2nZf2S_lcN"},{url:"/_next/static/chunks/439-c4e2a3a26e034e34.js",revision:"44ncFMiHdWj2nZf2S_lcN"},{url:"/_next/static/chunks/461-b82463c41003a277.js",revision:"44ncFMiHdWj2nZf2S_lcN"},{url:"/_next/static/chunks/987-118a54e8900de420.js",revision:"44ncFMiHdWj2nZf2S_lcN"},{url:"/_next/static/chunks/app/_not-found/page-9b41912373770285.js",revision:"44ncFMiHdWj2nZf2S_lcN"},{url:"/_next/static/chunks/app/auth/%5B...nextauth%5D/route-df469a4f9a98fdfc.js",revision:"44ncFMiHdWj2nZf2S_lcN"},{url:"/_next/static/chunks/app/dashboard/(overview)/loading-43584a4783c1469a.js",revision:"44ncFMiHdWj2nZf2S_lcN"},{url:"/_next/static/chunks/app/dashboard/(overview)/page-a0f4e8420396bba1.js",revision:"44ncFMiHdWj2nZf2S_lcN"},{url:"/_next/static/chunks/app/dashboard/budgets/%5Bid%5D/edit/not-found-7a8ac036ad5c213a.js",revision:"44ncFMiHdWj2nZf2S_lcN"},{url:"/_next/static/chunks/app/dashboard/budgets/%5Bid%5D/edit/page-fc877ee22a766204.js",revision:"44ncFMiHdWj2nZf2S_lcN"},{url:"/_next/static/chunks/app/dashboard/budgets/error-9a61a334194758ac.js",revision:"44ncFMiHdWj2nZf2S_lcN"},{url:"/_next/static/chunks/app/dashboard/budgets/page-5d8d3455a51a33f7.js",revision:"44ncFMiHdWj2nZf2S_lcN"},{url:"/_next/static/chunks/app/dashboard/clients/create/page-2e30df043b83d9d8.js",revision:"44ncFMiHdWj2nZf2S_lcN"},{url:"/_next/static/chunks/app/dashboard/clients/edit/%5Bid%5D/page-6f67af5b5032c652.js",revision:"44ncFMiHdWj2nZf2S_lcN"},{url:"/_next/static/chunks/app/dashboard/clients/page-ca396eac51f42c1c.js",revision:"44ncFMiHdWj2nZf2S_lcN"},{url:"/_next/static/chunks/app/dashboard/costs/create/page-874868eac48602f5.js",revision:"44ncFMiHdWj2nZf2S_lcN"},{url:"/_next/static/chunks/app/dashboard/costs/edit/%5Bid%5D/page-e9ea90369e9bdac8.js",revision:"44ncFMiHdWj2nZf2S_lcN"},{url:"/_next/static/chunks/app/dashboard/costs/page-d967803a2c76d4ac.js",revision:"44ncFMiHdWj2nZf2S_lcN"},{url:"/_next/static/chunks/app/dashboard/create/page-4074e1f5e3d56c32.js",revision:"44ncFMiHdWj2nZf2S_lcN"},{url:"/_next/static/chunks/app/dashboard/layout-97f5d48be113b35e.js",revision:"44ncFMiHdWj2nZf2S_lcN"},{url:"/_next/static/chunks/app/dashboard/user/page-4211c67cd6f3d691.js",revision:"44ncFMiHdWj2nZf2S_lcN"},{url:"/_next/static/chunks/app/layout-684736737e747d21.js",revision:"44ncFMiHdWj2nZf2S_lcN"},{url:"/_next/static/chunks/app/login/page-c1c121d0af73fc9f.js",revision:"44ncFMiHdWj2nZf2S_lcN"},{url:"/_next/static/chunks/app/page-8d8c4bcdfd663532.js",revision:"44ncFMiHdWj2nZf2S_lcN"},{url:"/_next/static/chunks/app/query/route-f1114819cdc9cfa7.js",revision:"44ncFMiHdWj2nZf2S_lcN"},{url:"/_next/static/chunks/app/register/page-10c040d3f7f122c3.js",revision:"44ncFMiHdWj2nZf2S_lcN"},{url:"/_next/static/chunks/app/ui/dashboard/customers/page-5418655082510df4.js",revision:"44ncFMiHdWj2nZf2S_lcN"},{url:"/_next/static/chunks/app/ui/dashboard/invoices/page-d828420afc89cb16.js",revision:"44ncFMiHdWj2nZf2S_lcN"},{url:"/_next/static/chunks/be3d05f3-cb5e929c5841771b.js",revision:"44ncFMiHdWj2nZf2S_lcN"},{url:"/_next/static/chunks/framework-3e1e466622962c34.js",revision:"44ncFMiHdWj2nZf2S_lcN"},{url:"/_next/static/chunks/main-76fc151085d07467.js",revision:"44ncFMiHdWj2nZf2S_lcN"},{url:"/_next/static/chunks/main-app-c449db1d4905a395.js",revision:"44ncFMiHdWj2nZf2S_lcN"},{url:"/_next/static/chunks/pages/_app-01f807f44af414f1.js",revision:"44ncFMiHdWj2nZf2S_lcN"},{url:"/_next/static/chunks/pages/_error-ca45ad20477297a9.js",revision:"44ncFMiHdWj2nZf2S_lcN"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-fc12d275ac3dcf2e.js",revision:"44ncFMiHdWj2nZf2S_lcN"},{url:"/_next/static/css/4e4bd68a8a914121.css",revision:"4e4bd68a8a914121"},{url:"/_next/static/css/ff660f6e821b6d2d.css",revision:"ff660f6e821b6d2d"},{url:"/_next/static/media/26a46d62cd723877-s.woff2",revision:"befd9c0fdfa3d8a645d5f95717ed6420"},{url:"/_next/static/media/55c55f0601d81cf3-s.woff2",revision:"43828e14271c77b87e3ed582dbff9f74"},{url:"/_next/static/media/581909926a08bbc8-s.woff2",revision:"f0b86e7c24f455280b8df606b89af891"},{url:"/_next/static/media/6d93bde91c0c2823-s.woff2",revision:"621a07228c8ccbfd647918f1021b4868"},{url:"/_next/static/media/7cfa6621d35cf216-s.p.woff2",revision:"10ca5cead49d8794475d175622d5f46b"},{url:"/_next/static/media/97e0cb1ae144a2a9-s.woff2",revision:"e360c61c5bd8d90639fd4503c829c2dc"},{url:"/_next/static/media/a34f9d1faa5f3315-s.p.woff2",revision:"d4fe31e6a2aebc06b8d6e558c9141119"},{url:"/_next/static/media/a4ad98fd7fb9e7bb-s.woff2",revision:"a8aa5d8e5fc839622a5dff6d9aaced19"},{url:"/_next/static/media/a81c0f7b14f15179-s.woff2",revision:"6ef9af3baea28659e0d0c7abe446efae"},{url:"/_next/static/media/c556ae4be4c9cfa8-s.p.woff2",revision:"7fc0472d53fb0d4f28b65106b68c99bd"},{url:"/_next/static/media/df0a9ae256c0569c-s.woff2",revision:"d54db44de5ccb18886ece2fda72bdfe0"},{url:"/_next/static/media/ebd7dc65a6ba3e83-s.p.woff2",revision:"296fbcc6254e1bccc30ee3255005844b"},{url:"/github-mark/github-mark-white.png",revision:"1dee40f2668d5c719eafa2c89296f5e7"},{url:"/github-mark/github-mark.png",revision:"43ce87609eb221d09d4832a9c0e709d0"},{url:"/hero-desktop.png",revision:"a47aff776ddc5a366ddb034f05febfda"},{url:"/hero-mobile.png",revision:"df9fe74c761e4baa93e9419d5efb2313"},{url:"/icon/android-chrome-192x192.png",revision:"9ff907deb4a8c0141ee9cc903f6377a2"},{url:"/icon/android-chrome-512x512.png",revision:"00ccdb383291ed82a5a0b288adad10b0"},{url:"/icon/apple-touch-icon.png",revision:"61a1a72739d94a68f62535302032f5f2"},{url:"/icon/favicon-16x16.png",revision:"aadf0b1afb0b33cb6f59b7d69bf28663"},{url:"/icon/favicon-32x32.png",revision:"bc9f5c5222a4f9993c34ecbb65c5acba"},{url:"/icon/favicon.ico",revision:"594c8b4124efb45b87c4e06507337edd"},{url:"/icon/site.webmanifest",revision:"685a574cb7b4b1eb749fd5327422a9fb"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:function(e){return _ref.apply(this,arguments)}}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((function(e){var n=e.sameOrigin,c=e.url.pathname;return!(!n||c.startsWith("/api/auth/callback")||!c.startsWith("/api/"))}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((function(e){var n=e.request,c=e.url.pathname,s=e.sameOrigin;return"1"===n.headers.get("RSC")&&"1"===n.headers.get("Next-Router-Prefetch")&&s&&!c.startsWith("/api/")}),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((function(e){var n=e.request,c=e.url.pathname,s=e.sameOrigin;return"1"===n.headers.get("RSC")&&s&&!c.startsWith("/api/")}),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((function(e){var n=e.url.pathname;return e.sameOrigin&&!n.startsWith("/api/")}),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((function(e){return!e.sameOrigin}),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
