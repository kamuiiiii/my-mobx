(()=>{"use strict";var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}e.r(t),e.d(t,{action:()=>v,autorun:()=>l,observable:()=>f,reaction:()=>s});var r=function(){function e(){var t,n,r;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),t=this,n="proxies",r=new WeakMap,n in t?Object.defineProperty(t,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[n]=r}var t,r;return t=e,(r=[{key:"on",value:function(e,t,n){this.proxies.has(e)||this.proxies.set(e,{});var r=this.proxies.get(e);r[t]=r[t]||new Set,r[t].add(n)}},{key:"trigger",value:function(e,t){var n=this.proxies.get(e);if(n){var r=n[t];if(r&&r.size){var o=e[t];r.forEach((function(t){0!==i.batchDeep?i.saveBatchEvent(e,t,o):t(o)}))}}}},{key:"off",value:function(e,t,n){this.proxies.get(e)[t].delete(n)}},{key:"clear",value:function(e,t){this.proxies.get(e)[t].clear()}}])&&n(t.prototype,r),e}();function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var i=new(function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),a(this,"currentFn",null),a(this,"disposes",[]),a(this,"event",new r),a(this,"batchDeep",0),a(this,"batchEventSet",new Map),a(this,"callbackMap",new Map)}var t,n;return t=e,(n=[{key:"saveBatchEvent",value:function(e,t,n){this.batchEventSet.has(e)||this.batchEventSet.set(e,new Set),this.batchEventSet.get(e).add(t),this.callbackMap.set(t,n)}},{key:"triggerBatchEvent",value:function(){var e=this;this.batchEventSet.forEach((function(t,n,r){t.size&&t.forEach((function(t){t(e.callbackMap.get(t))})),r.delete(n)}))}}])&&o(t.prototype,n),e}());function c(e){return c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},c(e)}var u=function(e){return null!==e&&"object"===c(e)},f=function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return new Proxy(t,{get:function(t,n,r){var o=i.currentFn;return o&&(i.event.on(t,n,o),i.disposes.push((function(){i.event.off(t,n,o)}))),u(t[n])?e(t[n]):Reflect.get(t,n,r)},set:function(e,t,n,r){if(e[t]===n)return!0;var o=Reflect.set(e,t,n,r);return i.event.trigger(e,t),o},deleteProperty:function(e,t){return i.event.clear(e,t),Reflect.deleteProperty(e,t)}})},l=function(e){!function t(){i.currentFn=t,e(),i.currentFn=null}()},s=function(e,t){var n={};i.currentFn=function(e){return t(e,n.old)},n.old=e(),i.currentFn=null;var r=i.disposes;return i.disposes=[],function(){r.forEach((function(e){return e()}))}},v=function(e){return function(){i.batchDeep++,e(),i.batchDeep--,0===i.batchDeep&&i.triggerBatchEvent()}},p=exports;for(var b in t)p[b]=t[b];t.__esModule&&Object.defineProperty(p,"__esModule",{value:!0})})();