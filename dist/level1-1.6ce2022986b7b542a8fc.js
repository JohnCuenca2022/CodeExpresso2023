(()=>{"use strict";var e,t={1911:(e,t,i)=>{var n=i(7049),o=i(2468),a=i(5973),r=i(9478),s=i(7828),c=(i(9755),i(9909)),d=i(2260),l=i.n(d),p=(i(5100),i(752)),u=(i(2711),i(8681)),m=i(127),h=i(7797),y=i(5677),f=i(4614),g=i(6616);i(5897);(0,n.oP)(),(0,n.wm)(),(0,o.c5)("background-music",(0,o.SM)("mute")),(0,o.Ih)("btn-sound"),document.getElementById("profile").addEventListener("click",(function(){(0,r.Aj)(a.I8,(async e=>{if(e){e.uid;(0,n.dm)(e)}else(0,n.dm)(e)}))})),window.onload=function(){!function(){var e=ace.edit("editor");e.setTheme("ace/theme/twilight"),e.session.setMode("ace/mode/java"),e.setOptions({fontSize:"15pt"});let t='public class Main{\n    public static void main(String args[]){\n        System.out.println("CodeExpresso");\n    }\n}';async function n(e,t){const n=i(7218),o={method:"POST",url:"https://onecompiler-apis.p.rapidapi.com/api/v1/run",headers:{"content-type":"application/json","X-RapidAPI-Key":"b73b411cc0mshd35f69dd29dd737p115fa0jsn4b3e3be739c5","X-RapidAPI-Host":"onecompiler-apis.p.rapidapi.com"},data:{language:"java",stdin:t,files:[{name:"main.java",content:e}]}};try{return(await n.request(o)).data}catch(e){return console.error(e),!1}}async function o(e,t){const n=i(7218),o={method:"POST",url:"https://code-compiler10.p.rapidapi.com/",headers:{"content-type":"application/json","x-compile":"rapidapi","Content-Type":"application/json","X-RapidAPI-Key":"b73b411cc0mshd35f69dd29dd737p115fa0jsn4b3e3be739c5","X-RapidAPI-Host":"code-compiler10.p.rapidapi.com"},data:{langEnum:["php","python","c","c_cpp","csharp","kotlin","golang","r","java","typescript","nodejs","ruby","perl","swift","fortran","bash"],lang:"java",code:e,input:t}};try{return(await n.request(o)).data}catch(e){return console.error(e),!1}}async function a(e,t){const n=i(7218),o={method:"POST",url:"https://online-code-compiler.p.rapidapi.com/v1/",headers:{"content-type":"application/json","X-RapidAPI-Key":"b73b411cc0mshd35f69dd29dd737p115fa0jsn4b3e3be739c5","X-RapidAPI-Host":"online-code-compiler.p.rapidapi.com"},data:{language:"java",version:"latest",code:e,input:t}};try{return(await n.request(o)).data}catch(e){return console.error(e),!1}}async function r(e,t){const n=i(7218),o={method:"POST",url:"https://java-code-compiler.p.rapidapi.com/",headers:{"content-type":"application/json","X-RapidAPI-Key":"b73b411cc0mshd35f69dd29dd737p115fa0jsn4b3e3be739c5","X-RapidAPI-Host":"java-code-compiler.p.rapidapi.com"},data:{code:e,input:t,version:"latest"}};try{return(await n.request(o)).data}catch(e){return console.error(e),!1}}e.setValue(t),document.getElementById("run").addEventListener("click",(async function(){let t=e.getValue(),i=document.getElementById("inputArea").value;document.getElementById("ans").innerHTML="Loading...";let s=await n(t,i);return s?(console.log("oneCompilerAPI"),void(document.getElementById("ans").innerHTML=s.stdout)):(s=await o(t,i),s?(console.log("codeCompilerAPI"),void(document.getElementById("ans").innerHTML=s.output)):(s=await a(t,i),s?(console.log("onlineCodeCompilerAPI"),void(document.getElementById("ans").innerHTML=s.output)):(s=await r(t,i),s?(console.log("javaCodeCompiler"),void(document.getElementById("ans").innerHTML=s.output)):void 0)))}))}()},(0,r.Aj)(a.I8,(async e=>{const t=(0,s.JU)(a.db,"users",e.uid);!function(e){let t,i,n,o={type:l().AUTO,parent:"gameContent",width:608,height:768,pixelArt:!0,physics:{default:"arcade",arcade:{gravity:{y:500},debug:!1}},scene:{preload:r,create:s,update:w}},a=(new(l().Game)(o),-1);function r(){switch(e){case"skin1":this.load.spritesheet("player",h,{frameWidth:32,frameHeight:32});break;case"skin2":this.load.spritesheet("player",f,{frameWidth:32,frameHeight:32});break;case"skin3":this.load.spritesheet("player",y,{frameWidth:32,frameHeight:32});break;case"skin4":this.load.spritesheet("player",g,{frameWidth:32,frameHeight:32});break;default:this.load.spritesheet("player",m,{frameWidth:32,frameHeight:32})}this.load.image("tiles",p),this.load.image("rightTile",u)}function s(){const e=this.sys.game.canvas;function o(t){e.focus()}e.tabIndex=0,e.focus(),e.id="gameCanvas",e.addEventListener("click",o),this.input.keyboard.disableGlobalCapture(),n=this.input.keyboard.addKeys("UP,DOWN,LEFT,RIGHT,SHIFT,ENTER"),i=this.physics.add.sprite(0,0,"player"),this.physics.world.gravity.y=0,i.body.setGravity(0,0),i.body.setVelocity(0,0),i.setDepth(1),this.anims.create({key:"walk",frames:this.anims.generateFrameNumbers("player",{start:0,end:8}),frameRate:6,repeat:-1}),i.anims.play("walk",!0);const{width:r,height:s}=this.sys.game.canvas;this.physics.world.setBounds(0,0,r,s),i.setCollideWorldBounds(!0);const c=[[1,4,4,4,4,5,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,5,6,6,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,4,4,4,4,4,4,4,3,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];t=this.make.tilemap({data:c,tileWidth:32,tileHeight:32});const d=t.addTilesetImage("tiles"),l=t.createLayer(0,d,0,0);l.setCollisionBetween(0,1e3),this.physics.add.collider(i,l),l.setInteractive(),l.on("pointerdown",((e,i,n,o)=>{const r=l.worldToTileX(e.worldX),s=l.worldToTileY(e.worldY),c=t.getTileAt(r,s,!0,l);if(c){console.log("Clicked tile:",c);let e=c.index;1!=e&&3!=e&&-1!=a&&(c.index=a)}}));let p=160,u=704;const m=[];for(let e=0;e<10;e++){const t=this.add.sprite(p+32*e,u,"emptyTile");t.setInteractive(),m.push(t)}function h(e,t){console.log("Clicked inventory slot:",e),console.log("Clicked inventory index:",t),e.isTinted?e.clearTint():(a=t,m.forEach((e=>{e.clearTint()})),e.setTint(16748544))}m.forEach(((e,t)=>{e.on("pointerdown",(()=>{h(e,t)}))}))}let c=!1,d=!1,b=!0;function w(){const e=32,o=200;let a=t.getTileAtWorldXY(i.x,i.y);if(!a)return i.setVelocityX(0),i.setVelocityY(0),void i.setPosition(0,0);let r=a.index,s=document.getElementById("gameCanvas");if(n.ENTER.isDown&&!d&&1==r&&document.activeElement==s&&(i.setPosition(i.x+e,i.y),d=!0),n.ENTER.isDown&&(d=!1),n.SHIFT.isDown&&!d&&document.activeElement==s)return i.setVelocityX(0),i.setVelocityY(0),i.setPosition(0,0),void(d=!0);if(n.SHIFT.isDown&&(d=!1),0==r&&(i.setVelocityX(0),i.setVelocityY(0),i.setPosition(0,0)),4==r&&b)return b=!1,void l();if(5==r&&b)return b=!1,void p();if(6==r&&b)return b=!1,void u();if(7==r&&b)return b=!1,void m();if(3==r&&!c)return c=!0,void v.toggle();function l(){i.setPosition(i.x+e,i.y),setTimeout((function(){b=!0}),o)}function p(){i.setPosition(i.x,i.y+e),setTimeout((function(){b=!0}),o)}function u(){i.setPosition(i.x-e,i.y),setTimeout((function(){b=!0}),o)}function m(){i.setPosition(i.x,i.y-e),setTimeout((function(){b=!0}),o)}}}((await(0,s.QT)(t)).data().skin)}));const v=new c.u_(document.getElementById("levelCompleteModal"),{});document.getElementById("nextLevelButton").addEventListener("click",(function(){location.href="level1-2.html"}))}},i={};function n(e){var o=i[e];if(void 0!==o)return o.exports;var a=i[e]={exports:{}};return t[e].call(a.exports,a,a.exports,n),a.exports}n.m=t,e=[],n.O=(t,i,o,a)=>{if(!i){var r=1/0;for(l=0;l<e.length;l++){for(var[i,o,a]=e[l],s=!0,c=0;c<i.length;c++)(!1&a||r>=a)&&Object.keys(n.O).every((e=>n.O[e](i[c])))?i.splice(c--,1):(s=!1,a<r&&(r=a));if(s){e.splice(l--,1);var d=o();void 0!==d&&(t=d)}}return t}a=a||0;for(var l=e.length;l>0&&e[l-1][2]>a;l--)e[l]=e[l-1];e[l]=[i,o,a]},n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;n.g.importScripts&&(e=n.g.location+"");var t=n.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var i=t.getElementsByTagName("script");i.length&&(e=i[i.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),n.p=e})(),(()=>{var e={134:0,723:0};n.O.j=t=>0===e[t];var t=(t,i)=>{var o,a,[r,s,c]=i,d=0;if(r.some((t=>0!==e[t]))){for(o in s)n.o(s,o)&&(n.m[o]=s[o]);if(c)var l=c(n)}for(t&&t(i);d<r.length;d++)a=r[d],n.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return n.O(l)},i=self.webpackChunkCodeExpresso_4=self.webpackChunkCodeExpresso_4||[];i.forEach(t.bind(null,0)),i.push=t.bind(null,i.push.bind(i))})();var o=n.O(void 0,[26,882,444,510,943,57,88,892,723,346],(()=>n(1911)));o=n.O(o)})();