var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},r=e.parcelRequired7c6;function a(e){try{let t=localStorage.getItem(e);t||(t="[]");const n=JSON.parse(t);if(Array.isArray(n))return n;throw new Error("Object is not array")}catch(e){console.error("Get LocslStorage error: ",e)}}null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in n){var r=n[e];delete n[e];var a={id:e,exports:{}};return t[e]=a,r.call(a.exports,a,a.exports),a.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){n[e]=t},e.parcelRequired7c6=r),r("eWCmQ");const i=(0,r("krGWQ").getRefs)();function l(e){const t=a(e);i.galleryItems.insertAdjacentHTML("beforeend",function(e){i.galleryItems.innerHTML="";const t="https://image.tmdb.org/t/p/w500";if(e.length>=1){return e.map((({id:e,title:n,original_title:r,poster_path:a,genres:i,vote_average:l,year:o})=>`<li class="gallery__item data-modal-open">\n            <img src="${t}${a}" alt="${e}-${r}" class="img" data-modal-open/>\n            <div class="item__text">\n                <h2 class="item__capt">${n}</h2>\n                <div class="item__wrap">\n                <p class="item__genre">${i} | ${o}</p>\n                <p class="item__rating">${l}</p>\n                </div>\n            </div>\n            </li>`)).join("")}return'<div class="clear-list">\n    <h3 class="clear-list__title">Oops...</h3>\n    <p class="clear-list__text">You haven\'t added a movie yet. Please make your choice.</p>\n    </div>'}(t))}i.myLibrary.classList.contains("my-library")&&(l("watched"),i.watchedBtn.addEventListener("click",(function(e){e.preventDefault,l("watched")})),i.queueBtn.addEventListener("click",(function(e){e.preventDefault,l("queue")}))),r("bTcpz");
//# sourceMappingURL=library.e938c38b.js.map
