(()=>{"use strict";var e,t={6851:(e,t,n)=>{var o=n(9909);const s=n.p+"fcf44f50ba5e1ea06c44.png",d=n.p+"7156dde0ce7925dd4de3.png",c=n.p+"2b57cf329cd5cb169897.png",r=n.p+"5755d3f3b922550915b1.png",a=n.p+"f7deed0f51f9b8cccde3.png",i=n.p+"c202cfeadb6a2f87b099.png",l=n.p+"3a15c7733a97b0a4e151.png",u=n.p+"ef2dd2de4932386cba12.png",m=n.p+"5b336d02fed8a41c231d.png";function p(e){e?setTimeout((function(){location.href="profile.html"}),300):setTimeout((function(){location.href="login.html"}),300)}function g(e){const t=document.getElementsByClassName(e);for(;t.length>0;)t[0].parentNode.removeChild(t[0])}function f(){[].slice.call(document.querySelectorAll(".toast")).map((function(e){return new o.FN(e)})).forEach((e=>e.show()))}function y(e,t){g("hide"),document.getElementById("toastsContainer").innerHTML+='\n  <div class="toast" data-autohide="false">\n    <div class="toast-header">\n      <h7 class="mr-auto">'+e+'</h7>\n    </div>\n    <div class="toast-body">\n      '+t+"\n    </div>\n  </div>\n  ",f()}function v(e,t,n){const o=new Date;o.setTime(o.getTime()+24*n*60*60*1e3);let s="expires="+o.toUTCString();document.cookie=e+"="+t+";"+s+";path=/"}function E(e){let t=e+"=",n=decodeURIComponent(document.cookie).split(";");for(let e=0;e<n.length;e++){let o=n[e];for(;" "==o.charAt(0);)o=o.substring(1);if(0==o.indexOf(t))return o.substring(t.length,o.length)}return""}const b=n.p+"90bf8ca3654ab285f764.mp3",h=n.p+"ff2162a8df436b85494c.mp3",I=n.p+"4cb78bb46acae006990f.mp3",B=n.p+"9deb98cd4eecb584c5f8.mp3",L=n.p+"0bceddb041ad73c32a18.mp3";var w=n(3977),k=n(9478),S=n(7828);n(9755);(0,w.ZF)({apiKey:"AIzaSyDQ5M0TuT6v0JlqhcvZ9tkP5gKYPCCUL2A",authDomain:"codeexpresso-ae5b5.firebaseapp.com",projectId:"codeexpresso-ae5b5",storageBucket:"codeexpresso-ae5b5.appspot.com",messagingSenderId:"340531525579",appId:"1:340531525579:web:9a7d69339dd2963386284e",measurementId:"G-91J9LZ5MXF"}),(0,k.v0)(),(0,S.ad)(),new k.hJ;(0,w.ZF)({apiKey:"AIzaSyDQ5M0TuT6v0JlqhcvZ9tkP5gKYPCCUL2A",authDomain:"codeexpresso-ae5b5.firebaseapp.com",projectId:"codeexpresso-ae5b5",storageBucket:"codeexpresso-ae5b5.appspot.com",messagingSenderId:"340531525579",appId:"1:340531525579:web:9a7d69339dd2963386284e",measurementId:"G-91J9LZ5MXF"});const T=(0,k.v0)(),x=(0,S.ad)();!function(){try{document.getElementById("back").addEventListener("mouseover",(function(){document.getElementById("back-button-img").src=d})),document.getElementById("back").addEventListener("mouseout",(function(){document.getElementById("back-button-img").src=s})),document.getElementById("back").addEventListener("mousedown",(function(){document.getElementById("back-button-img").src=c})),document.getElementById("back").addEventListener("mouseup",(function(){document.getElementById("back-button-img").src=d}))}catch(e){}}(),function(){try{document.getElementById("profile").addEventListener("mouseover",(function(){document.getElementById("profile-button-img").src=a})),document.getElementById("profile").addEventListener("mouseout",(function(){document.getElementById("profile-button-img").src=r})),document.getElementById("profile").addEventListener("mousedown",(function(){document.getElementById("profile-button-img").src=i})),document.getElementById("profile").addEventListener("mouseup",(function(){document.getElementById("profile-button-img").src=a}))}catch(e){}}(),function(){try{document.getElementById("settings").addEventListener("mouseover",(function(){document.getElementById("settings-button-img").src=u})),document.getElementById("settings").addEventListener("mouseout",(function(){document.getElementById("settings-button-img").src=l})),document.getElementById("settings").addEventListener("mousedown",(function(){document.getElementById("settings-button-img").src=m})),document.getElementById("settings").addEventListener("mouseup",(function(){document.getElementById("settings-button-img").src=u}))}catch(e){}}(),function(){try{document.getElementById("back").addEventListener("click",(function(){setTimeout((function(){history.back()}),300)}))}catch(e){}}(),function(e){try{document.getElementById("settings").addEventListener("click",(t=>{e.toggle()})),document.getElementById("settings-save").addEventListener("click",(t=>{e.toggle()}))}catch(e){}}(new o.u_(document.getElementById("exampleModalCenter"),{})),function(e,t){if("mute"!=t){document.getElementById("audioContainer").innerHTML+='\n      <audio id="'+e+'" src="'+t+'" style="display:none;" loop ></audio>\n    ';var n=.1,o=E("musicVolume");o&&(n=o),document.addEventListener("click",(function(){var t=document.getElementById(e);t.paused&&(t.volume=n,t.play(),function(e,t){var n=document.getElementById(e),o=document.getElementById(t);o.value=100*n.volume,o.addEventListener("change",(function(){n.volume=Number(this.value/100),v("musicVolume",n.volume,365)}))}(e,"musicVolume"))}))}}("background-music",function(e){switch(e){case"theme1":return I;case"theme2":return B;case"theme3":return h;case"mute":return"mute";default:return b}}("mute")),function(e){var t,n,o,s,d=document.getElementsByClassName(e),c=new Audio(L);for(let e=0;e<d.length;e++){d[e].addEventListener("click",(function(){var e=.3,t=E("SFXVolume");t&&(e=t),c.volume=e,c.play()}))}t="sfxVolume",n=document.getElementById(t),o=.3,(s=E("SFXVolume"))&&(o=s),n.value=100*o,n.addEventListener("change",(function(){v("SFXVolume",Number(n.value/100),365)}))}("btn-sound"),document.getElementById("profile").addEventListener("click",(function(){(0,k.Aj)(T,(e=>{if(e){e.uid;p(e)}else p(e)}))}));let C=document.getElementById("passwordScore");document.getElementById("id_password").addEventListener("keyup",(function(){let e=function(e){var t=0;if(!e)return t;for(var n=new Object,o=0;o<e.length;o++)n[e[o]]=(n[e[o]]||0)+1,t+=5/n[e[o]];var s={digits:/\d/.test(e),lower:/[a-z]/.test(e),upper:/[A-Z]/.test(e),nonWords:/\W/.test(e)},d=0;for(var c in s)d+=1==s[c]?1:0;return t+=10*(d-1),parseInt(t)}(this.value);C.value=e,e<=30?(C.classList.remove("is-success"),C.classList.remove("is-warning"),C.classList.add("is-error")):e>30&&e<=70?(C.classList.remove("is-success"),C.classList.remove("is-error"),C.classList.add("is-warning")):(C.classList.remove("is-warning"),C.classList.remove("is-error"),C.classList.add("is-success")),this.value.length>=8?(document.getElementById("passLength").style.color="white",document.getElementById("passLength").style.paddingLeft="0.2rem"):(document.getElementById("passLength").style.color="black",document.getElementById("passLength").style.paddingLeft="0"),/[a-z]/.test(this.value)?(document.getElementById("passLower").style.color="white",document.getElementById("passLower").style.paddingLeft="0.2rem"):(document.getElementById("passLower").style.color="black",document.getElementById("passLower").style.paddingLeft="0"),/[A-Z]/.test(this.value)?(document.getElementById("passUpper").style.color="white",document.getElementById("passUpper").style.paddingLeft="0.2rem"):(document.getElementById("passUpper").style.color="black",document.getElementById("passUpper").style.paddingLeft="0"),/[0-9]/.test(this.value)?(document.getElementById("passNumber").style.color="white",document.getElementById("passNumber").style.paddingLeft="0.2rem"):(document.getElementById("passNumber").style.color="black",document.getElementById("passNumber").style.paddingLeft="0"),/[^a-zA-Z0-9]/.test(this.value)?(document.getElementById("passSpecial").style.color="white",document.getElementById("passSpecial").style.paddingLeft="0.2rem"):(document.getElementById("passSpecial").style.color="black",document.getElementById("passSpecial").style.paddingLeft="0")}));document.querySelector("form").addEventListener("submit",(e=>{e.preventDefault();const t=e.target.elements.password.value,n=e.target.elements.password2.value;if(t!==n)return document.getElementById("id_password2").focus(),void y("Task Failed","Passwords do not match");var o;(o=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,255}$/,t.match(o))?(0,k.Aj)(T,(e=>{e?(0,k.gQ)(e,t).then((()=>{try{console.log(e.uid),(0,S.QT)((0,S.JU)(x,"users",e.uid)).then((t=>{if(t.exists())y("Please wait","Redirecting..."),location.href="profile.html";else{y("Please wait","Redirecting...");const t=(0,S.JU)(x,"users",e.uid);(0,S.pl)(t,{username:"",ownedThemes:["defaultTheme"],theme:"defaultTheme",ownedSkins:["defaultSkin"],skin:"defaultSkin",ownedBackgrounds:["defaultBackground"],background:"defaultBackground",earnedBadges:[],profilePicture:"",completedLevels1:[],completedLevels2:[],completedLevels3:[],completedLevels4:[],completedLevels5:[],completedLevels6:[],completedLevels7:[],completedLevels8:[],completedLevels9:[],completedLevels10:[],points:0,history:[{dateTime:S.EK.fromDate(new Date),description:"Account Created"}]},{merge:!0}).then((function(){location.href="profile.html"}))}}))}catch(e){console.log(e)}})).catch((e=>{y("Error","Expired Link")})):y("Error","Expired Link")})):y("Task Failed","Invalid Password")}))}},n={};function o(e){var s=n[e];if(void 0!==s)return s.exports;var d=n[e]={exports:{}};return t[e].call(d.exports,d,d.exports,o),d.exports}o.m=t,e=[],o.O=(t,n,s,d)=>{if(!n){var c=1/0;for(l=0;l<e.length;l++){for(var[n,s,d]=e[l],r=!0,a=0;a<n.length;a++)(!1&d||c>=d)&&Object.keys(o.O).every((e=>o.O[e](n[a])))?n.splice(a--,1):(r=!1,d<c&&(c=d));if(r){e.splice(l--,1);var i=s();void 0!==i&&(t=i)}}return t}d=d||0;for(var l=e.length;l>0&&e[l-1][2]>d;l--)e[l]=e[l-1];e[l]=[n,s,d]},o.d=(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;o.g.importScripts&&(e=o.g.location+"");var t=o.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var n=t.getElementsByTagName("script");n.length&&(e=n[n.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),o.p=e})(),(()=>{var e={940:0,123:0};o.O.j=t=>0===e[t];var t=(t,n)=>{var s,d,[c,r,a]=n,i=0;if(c.some((t=>0!==e[t]))){for(s in r)o.o(r,s)&&(o.m[s]=r[s]);if(a)var l=a(o)}for(t&&t(n);i<c.length;i++)d=c[i],o.o(e,d)&&e[d]&&e[d][0](),e[d]=0;return o.O(l)},n=self.webpackChunkCodeExpresso_4=self.webpackChunkCodeExpresso_4||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var s=o.O(void 0,[26,882,444,510,909,188,478,123],(()=>o(6851)));s=o.O(s)})();