(function(){"use strict";var e=typeof window!="undefined"?window:global;if(typeof e.require=="function")return;var t={},n={},r=function(e,t){return{}.hasOwnProperty.call(e,t)},i=function(e,t){var n=[],r,i;/^\.\.?(\/|$)/.test(t)?r=[e,t].join("/").split("/"):r=t.split("/");for(var s=0,o=r.length;s<o;s++)i=r[s],i===".."?n.pop():i!=="."&&i!==""&&n.push(i);return n.join("/")},s=function(e){return e.split("/").slice(0,-1).join("/")},o=function(t){return function(n){var r=s(t),o=i(r,n);return e.require(o)}},u=function(e,t){var r={id:e,exports:{}};t(r.exports,o(e),r);var i=n[e]=r.exports;return i},a=function(e){var s=i(e,".");if(r(n,s))return n[s];if(r(t,s))return u(s,t[s]);var o=i(s,"./index");if(r(n,o))return n[o];if(r(t,o))return u(o,t[o]);throw new Error('Cannot find module "'+e+'"')},f=function(e,n){if(typeof e=="object")for(var i in e)r(e,i)&&(t[i]=e[i]);else t[e]=n};e.require=a,e.require.define=f,e.require.register=f,e.require.brunch=!0})(),window.require.register("application",function(e,t,n){var r;r={initialize:function(){var e,n;return e=t("views/home_view"),n=t("lib/router"),this.homeView=new e,this.router=new n,typeof Object.freeze=="function"?Object.freeze(this):void 0}},n.exports=r}),window.require.register("initialize",function(e,t,n){var r;r=t("application"),$(function(){return r.initialize(),Backbone.history.start()})}),window.require.register("lib/router",function(e,t,n){var r,i,s={}.hasOwnProperty,o=function(e,t){function r(){this.constructor=e}for(var n in t)s.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e};i=t("application"),n.exports=r=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return o(t,e),t.prototype.routes={"":"home"},t.prototype.home=function(){return $("body").html(i.homeView.render().el)},t}(Backbone.Router)}),window.require.register("lib/view_helper",function(e,t,n){}),window.require.register("models/collection",function(e,t,n){var r,i={}.hasOwnProperty,s=function(e,t){function r(){this.constructor=e}for(var n in t)i.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e};n.exports=r=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return s(t,e),t}(Backbone.Collection)}),window.require.register("models/model",function(e,t,n){var r,i={}.hasOwnProperty,s=function(e,t){function r(){this.constructor=e}for(var n in t)i.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e};n.exports=r=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return s(t,e),t}(Backbone.Model)}),window.require.register("views/audio",function(e,t,n){var r=t("./util"),i=r.CallbackQueue,s=function(){"webkitAudioContext"in window&&(this.audio=new webkitAudioContext,this.master=this.audio.createGainNode(),this.master.connect(this.audio.destination)),this.buffers={}};s.prototype.setGain=function(e){if(!this.audio)return;this.master.gain.value=e},s.prototype.getBuffer=function(e){var t=this.buffers[e];return t instanceof i?null:t||null},s.prototype.loadBuffer=function(e,t){if(e in this.buffers){var n=this.buffers[e];n instanceof i?n.add(t):t(this.buffers[e]);return}if(!this.audio)return;var r=new i(t);this.buffers[e]=r;var s=new XMLHttpRequest;s.open("GET",e,!0),s.responseType="arraybuffer",s.onload=function(){var t=this.audio.createBuffer(s.response,!0);this.buffers[e]=t,r.fire(t)}.bind(this),s.send()},s.prototype.playSound=function(e,t,n,r){var i=this.audio.createBufferSource();return i.buffer=e,i.connect(this.master),i.loop=t,i.gain.value=n,i.playbackRate.value=r===undefined?1:r,i.noteOn(0),i},n.exports=s}),window.require.register("views/game/horde",function(e,t,n){var r,i,s;s=t("../sprites").Viking,i=THREE.Vector2,n.exports=r=function(){function e(e,t,n){var r,o,u,a=this;this.engine=e,this.world=t,this.ship=n,o=10,this.inShip=!0,this.pos=new i,this.drum=null,e.audio.loadBuffer("sounds/drum41-mod.ogg",function(e){a.drum=e}),this.vikings=function(){var e,t;t=[];for(r=e=0;0<=o?e<o:e>o;r=0<=o?++e:--e)u=new s,u.horde=this,u.object.position.x=r/(o-1)*10-5,this.ship.object.add(u.object),t.push(u);return t}.call(this)}return e.prototype.update=function(e){var t,n,r,i,s,o,u,a,f,l,c,h,p,d,v,m,g;this.inShip&&this.pos.copy(this.ship.object.position),r=this.world.getSegmentAt(this.pos.x),this.inShip&&r.type!=="sea1"&&this.disembark(),d=this.vikings;for(o=0,l=d.length;o<l;o++)s=d[o],s.update(e);if(!this.inShip){this.pos.set(0,0),v=this.vikings;for(u=0,c=v.length;u<c;u++)s=v[u],this.pos.add(s.object.position);this.pos.multiplyScalar(1/this.vikings.length)}e.camera.position.x=this.pos.x+20,m=this.world.spawns;for(a=0,h=m.length;a<h;a++){i=m[a],n=Infinity,g=this.vikings;for(f=0,p=g.length;f<p;f++)s=g[f],t=s.object.position.x-i.object.position.x,Math.abs(t)<Math.abs(n)&&(n=t);i.vikingDistance(n)}},e.prototype.disembark=function(){var e,t,n,r;r=this.vikings;for(t=0,n=r.length;t<n;t++)e=r[t],e.disembark();return this.inShip=!1},e.prototype.onDrum=function(e){var t,n,r,i,s,o;this.drum&&(n=Math.random()*.05+(e?.8:.6),this.engine.audio.playSound(this.drum,!1,.5,n)),t=0,o=this.vikings;for(i=0,s=o.length;i<s;i++)r=o[i],t+=r.onDrum();if(this.inShip)return this.ship.onDrum(t/this.vikings.length)},e}()}),window.require.register("views/game/index",function(e,t,n){var r,i,s,o,u,a,f;i=t("./horde"),f=t("../sprites"),s=t("../util").KEYCODE,o=t("./world"),a=function(e){return e.keyCode<=255},u=function(e){return e.ctrlKey||e.altKey||e.metaKey},n.exports=r=function(){function e(e){this.world=new o,e.scene.add(this.world.object),this.world.buildBackground(),this.ship=new f.Ship,this.horde=new i(e,this.world,this.ship),e.scene.add(this.ship.object),this.world.buildForeground(),this.world.buildSpawns(),this.toggleKeys=!1,e.audio.loadBuffer("sounds/vikingtheme.ogg",function(t){return e.audio.playSound(t,!0,.05,1)})}return e.prototype.update=function(e){return this.world.update(e),this.ship.update(e),this.horde.update(e)},e.prototype.onKeyDown=function(e){var t;if(!a(e))return;if(u(e))return;return t=this.toggleKeys?s.A:s.L,e.keyCode===t&&(this.toggleKeys=!this.toggleKeys,this.horde.onDrum(this.toggleKeys)),e.preventDefault()},e}()}),window.require.register("views/game/world",function(e,t,n){var r,i,s;s=t("../sprites"),r=t("../sprites/tile"),n.exports=i=function(){function t(){var t,n,i,s,o,u,a;this.object=new THREE.Object3D,i=0,s=0,o=0;for(u=0,a=e.length;u<a;u++)t=e[u],n=new r(t.type),n.object.position.set(i,s,o),t.tile=n,t.left=i,i+=n.mesh.scale.x,t.right=i}var e;return e=[{type:"sea1"},{type:"sea1"},{type:"sea1"},{type:"sea1"},{type:"sea1"},{type:"sea1"},{type:"sea1"},{type:"sea1"},{type:"shore1"},{type:"land1",bg:s.Mountain,bgz:-10},{type:"land1"},{type:"land1"},{type:"land1",bg:s.Trees,bgz:-5},{type:"land1"},{type:"land1",spawnType:s.Giant},{type:"land1"},{type:"land1",bg:s.Mountain,bgz:-5},{type:"land1"},{type:"land1"},{type:"land1"},{type:"land1",spawnType:s.Giant},{type:"land1"},{type:"land1"},{type:"land1",bg:s.Trees},{type:"land1",bg:s.Trees,bgz:-5},{type:"land1"},{type:"land1",spawnType:s.Giant},{type:"land1"},{type:"land1",spawnType:s.Giant},{type:"land1"},{type:"land1"},{type:"land1"},{type:"land1"},{type:"land1"},{type:"land1",bg:s.Trees},{type:"land1",bg:s.Mountain,bgz:-5},{type:"land1",bg:s.Trees,bgz:-3},{type:"land1"},{type:"land1"},{type:"land1"},{type:"land1"},{type:"land1"},{type:"land1"},{type:"land1"},{type:"land1",bg:s.Trees},{type:"land1"},{type:"land1",bg:s.Trees,bgz:-3},{type:"land1"},{type:"land1"},{type:"land1"},{type:"land1"},{type:"land1"},{type:"land1",bg:s.Trees},{type:"land1",bg:s.Mountain,bgz:-5},{type:"land1",bg:s.Trees,bgz:-3},{type:"land1"},{type:"land1"},{type:"land1"},{type:"land1"},{type:"land1"},{type:"land1"},{type:"land1"},{type:"land1"},{type:"land1"},{type:"land1"},{type:"land1"},{type:"land1"},{type:"land1"},{type:"land1"},{type:"land1"}],t.prototype.buildBackground=function(){var t,n,i,s,o,u,a,f,l,c,h;a=0,f=-40;for(n=l=-1;l<10;n=++l)o=new r("sky"),i=2.1,o.mesh.scale.multiplyScalar(i),u=n*o.mesh.scale.x,o.object.position.set(u,a,f),this.object.add(o.object);for(c=0,h=e.length;c<h;c++)s=e[c],s.bg&&(t=new s.bg,t.object.position.x=(s.left+s.right)/2,t.object.position.z=s.bgz||-10,this.object.add(t.object))},t.prototype.buildForeground=function(){var t,n,i,s,o,u,a,f,l;s=0,o=0,u=0;for(t=a=-1;a>=-6;t=--a)i=new r(e[0].type),s-=i.mesh.scale.x,i.object.position.set(s,o,u),this.object.add(i.object);s=0;for(f=0,l=e.length;f<l;f++)n=e[f],this.object.add(n.tile.object)},t.prototype.buildSpawns=function(){var t,n,r,i;this.spawns=[];for(r=0,i=e.length;r<i;r++)t=e[r],t.spawnType&&(n=new t.spawnType,n.object.position.x=(t.left+t.right)/2,this.object.add(n.object),this.spawns.push(n))},t.prototype.getSegmentAt=function(t){var n,r,i,s;for(n=i=0,s=e.length;i<s;n=++i){r=e[n];if(r.right>t)return r}return null},t.prototype.update=function(e){var t,n,r,i,s;i=this.spawns,s=[];for(n=0,r=i.length;n<r;n++)t=i[n],s.push(t.update(e));return s},t}()}),window.require.register("views/home_view",function(e,t,n){var r,i,s,o,u,a,f,l={}.hasOwnProperty,c=function(e,t){function r(){this.constructor=e}for(var n in t)l.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e};r=t("./audio"),o=t("./view"),f=t("./templates/home"),i=t("./game"),a=function(){var e;return e=new THREE.WebGLRenderer({alpha:!1,antialias:!1,premultipliedAlpha:!1,clearColor:11193599}),e.autoClear=!1,e.sortObjects=!1,e.devicePixelRatio=1,e.setSize(window.innerWidth,window.innerHeight),e},u=function(e){var t,n,s,o,u,f,l,c;return l=a(),e.appendChild(l.domElement),s=new THREE.PerspectiveCamera(70,window.innerWidth/window.innerHeight,1,200),s.position.z=30,window.addEventListener("resize",function(){return s.aspect=window.innerWidth/window.innerHeight,s.updateProjectionMatrix(),l.setSize(window.innerWidth,window.innerHeight)}),c=new THREE.Scene,n=new r,o={audio:n,camera:s,scene:c},u=new i(o),document.addEventListener("keydown",function(e){return u.onKeyDown(e)}),f=0,t=function(e){var n;return requestAnimationFrame(t),e*=.001,n=Math.min(.1,e-f),f=e,o.time=e,o.deltaTime=n,u.update(o),l.render(c,s)},t(0)},n.exports=s=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return c(t,e),t.prototype.id="home-view",t.prototype.template=f,t.prototype.afterRender=function(){return u(this.el)},t}(o)}),window.require.register("views/sprites/giant",function(e,t,n){var r,i,s,o={}.hasOwnProperty,u=function(e,t){function r(){this.constructor=e}for(var n in t)o.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e};i=t("./sprite"),s=THREE.Vector2,n.exports=r=function(e){function n(){return n.__super__.constructor.apply(this,arguments)}var t;return u(n,e),n.prototype.textureUrls=["textures/Monsters/Giant/giant_1.png","textures/Monsters/Giant/giant_2.png","textures/Monsters/Giant/giant_3.png"],t={IDLE:0,ATTACK1:1,ATTACK2:2},n.prototype.setup=function(){return this.mesh.scale.set(10,10,1),this.mesh.position.y=5,this.state=t.IDLE,this.stateTime=0},n.prototype.update=function(e){this.stateTime+=e.deltaTime;switch(this.state){case t.ATTACK1:if(this.stateTime>2)return this.setState(t.ATTACK2);break;case t.ATTACK2:if(this.stateTime>2)return this.setState(t.IDLE)}},n.prototype.setState=function(e){return this.state=e,this.setAnimationFrame(e),this.stateTime=0},n.prototype.vikingDistance=function(e){if(-15<e&&e<0&&this.state===t.IDLE)return this.setState(t.ATTACK1)},n}(i)}),window.require.register("views/sprites/index",function(e,t,n){n.exports={Giant:t("./giant"),Ship:t("./ship"),Viking:t("./viking"),Mountain:t("./mountain"),Trees:t("./trees")}}),window.require.register("views/sprites/mountain",function(e,t,n){var r,i,s={}.hasOwnProperty,o=function(e,t){function r(){this.constructor=e}for(var n in t)s.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e};i=t("./sprite"),n.exports=r=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return o(t,e),t.prototype.textureUrl="textures/Tiles/Background/mountain.png",t.prototype.setup=function(){return this.mesh.scale.set(51.2,12,1),this.mesh.position.y=1},t}(i)}),window.require.register("views/sprites/ship",function(e,t,n){var r,i,s={}.hasOwnProperty,o=function(e,t){function r(){this.constructor=e}for(var n in t)s.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e};i=t("./sprite"),n.exports=r=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return o(t,e),t.prototype.textureUrl="textures/Ship/ship_1.png",t.prototype.setup=function(){return this.mesh.scale.set(15,15,1),this.mesh.position.y=5.5,this.object.position.x=-2,this.rollSpeed=0,this.moveSpeed=0},t.prototype.update=function(e){return this.object.position.x+=this.moveSpeed*e.deltaTime,this.object.position.x<0&&(this.object.position.x=0,this.moveSpeed=0),this.object.position.y=Math.sin(e.time*4)*.5-1.2,this.object.rotation.z+=this.rollSpeed*e.deltaTime,this.rollSpeed+=Math.sin(e.time*2.5)*.01,this.rollSpeed+=this.moveSpeed*.003,this.rollSpeed-=this.object.rotation.z*.2,this.rollSpeed*=Math.pow(.2,e.deltaTime),this.moveSpeed=(this.moveSpeed+3)*Math.pow(.2,e.deltaTime)-3},t.prototype.onDrum=function(e){return this.moveSpeed+=Math.pow(e,3)*10},t}(i)}),window.require.register("views/sprites/sprite",function(e,t,n){var r,i,s={}.hasOwnProperty,o=function(e,t){function r(){this.constructor=e}for(var n in t)s.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e};i=t("./sprite_material"),n.exports=r=function(e){function n(e){var n;this.materials=this.textureUrls?function(){var e,t,r,s;r=this.textureUrls,s=[];for(e=0,t=r.length;e<t;e++)n=r[e],s.push(i(n));return s}.call(this):[i(this.textureUrl)],this.matIndex=0,this.mesh=new THREE.Mesh(t,this.materials[this.matIndex]),this.object=new THREE.Object3D,this.object.add(this.mesh),this.setup()}var t;return o(n,e),t=new THREE.PlaneGeometry(1,1),n.prototype.setup=function(){},n.prototype.setAnimationFrame=function(e){return this.matIndex=e,this.mesh.material=this.materials[e]},n.prototype.animate=function(){return this.setAnimationFrame((this.matIndex+1)%this.materials.length)},n}(THREE.Mesh)}),window.require.register("views/sprites/sprite_material",function(e,t,n){var r,i,s;r={},s="varying vec4 eyePosition;\nvarying vec3 worldPosition;\nvarying vec2 vUv;\n\nvoid main() {\n  worldPosition = position;\n  eyePosition = modelViewMatrix * vec4(worldPosition, 1.0);\n  gl_Position = projectionMatrix * eyePosition;\n\n  vUv = uv;\n}",i="uniform sampler2D tColor;\n\nvarying vec4 eyePosition;\nvarying vec3 worldPosition;\nvarying vec2 vUv;\n\nvoid main() {\n  gl_FragColor = texture2D(tColor, vUv);\n}",n.exports=function(e){var t,n;return(t=r[e])?t:(n=THREE.ImageUtils.loadTexture(e),n.magFilter=THREE.NearestFilter,n.minFilter=THREE.NearestMipMapNearestFilter,r[e]=new THREE.ShaderMaterial({transparent:!0,depthTest:!1,uniforms:{tColor:{type:"t",value:n}},vertexShader:s,fragmentShader:i}))}}),window.require.register("views/sprites/tile",function(e,t,n){var r,i,s,o={}.hasOwnProperty,u=function(e,t){function r(){this.constructor=e}for(var n in t)o.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e};r=t("./sprite"),s=THREE.Vector2,n.exports=i=function(e){function n(e){this.type=t[e],this.textureUrls=this.type.urls,n.__super__.constructor.call(this)}var t;return u(n,e),t={sky:{urls:["textures/Tiles/Sky/sky.png"],width:512,height:480},sea1:{urls:["textures/Tiles/Sea/seatile1_1.png","textures/Tiles/Sea/seatile1_2.png"],width:64,height:480},shore1:{urls:["textures/Tiles/Shore/shoretile1_1.png","textures/Tiles/Shore/shoretile1_2.png"],width:128,height:480},land1:{urls:["textures/Tiles/Land/landtile1_1.png"],width:64,height:480}},n.prototype.setup=function(){return this.mesh.scale.set(this.type.width*.1,this.type.height*.1,1),this.mesh.position.x=this.mesh.scale.x*.5,this.object.position.z=-1},n}(r)}),window.require.register("views/sprites/trees",function(e,t,n){var r,i,s={}.hasOwnProperty,o=function(e,t){function r(){this.constructor=e}for(var n in t)s.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e};r=t("./sprite"),n.exports=i=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return o(t,e),t.prototype.textureUrl="textures/Tiles/Background/treegroup1.png",t.prototype.setup=function(){return this.mesh.scale.set(20,15,1),this.mesh.position.y=5},t}(r)}),window.require.register("views/sprites/viking",function(e,t,n){var r,i,s,o={}.hasOwnProperty,u=function(e,t){function r(){this.constructor=e}for(var n in t)o.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e};r=t("./sprite"),i=THREE.Vector2,n.exports=s=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return u(t,e),t.prototype.textureUrls=["textures/Vikings/viking_1.png","textures/Vikings/viking_2.png"],t.prototype.setup=function(){return this.mesh.scale.set(2,2,1),this.mesh.position.y=1,this.vel=new i,this.inShip=!0},t.prototype.updateInShip=function(e){},t.prototype.updateOnLand=function(e){var t,n,r;t=(Math.random()-.5)*50,t+=this.horde.pos.x-this.object.position.x,this.vel.x+=t*e.deltaTime,this.vel.x=(this.vel.x+2)*Math.pow(.2,e.deltaTime)-2,this.object.position.x+=this.vel.x*e.deltaTime,r=this.horde.world.getSegmentAt(this.object.position.x);if(r.type!=="land1"&&this.object.position.y<=0&&this.vel.y<=0&&this.object.position.x<r.right)return n=Math.random()*7+15,this.vel.x=n,this.vel.y=n},t.prototype.update=function(e){this.inShip?this.updateInShip(e):this.updateOnLand(e),this.vel.y-=200*e.deltaTime,this.object.position.y=Math.max(0,this.object.position.y+this.vel.y*e.deltaTime);if(Math.random()<e.deltaTime)return this.animate()},t.prototype.onDrum=function(){var e;return e=!1,this.object.position.y<=0&&(this.vel.y=Math.random()*7+15,e=!0),this.inShip||(this.vel.x+=Math.random()*10-1),e},t.prototype.disembark=function(){if(!this.inShip)return;return this.inShip=!1,this.object.parent.parent.add(this.object),this.object.position.copy(this.object.matrixWorld.getPosition())},t}(r)}),window.require.register("views/templates/home",function(e,t,n){n.exports=Handlebars.template(function(e,t,n,r,i){n=n||e.helpers;var s="",o,u=this;return s})}),window.require.register("views/util",function(e,t,n){var r,i,s;i={KEYCODE:{BACKSPACE:8,TAB:9,ENTER:13,SHIFT:16,CTRL:17,ALT:18,ESCAPE:27,SPACE:32,LEFT:37,UP:38,RIGHT:39,DOWN:40,DELETE:46,COMMA:188,PERIOD:190}};for(r=s=48;s<=126;r=++s)i.KEYCODE[String.fromCharCode(r)]=r;i.CallbackQueue=function(){function e(e){this.callbacks=e&&[e]||[]}return e.prototype.add=function(e){return this.callbacks.push(e)},e.prototype.fire=function(){var e,t,n,r,i;t=this.callbacks,this.callbacks=[],i=[];for(n=0,r=t.length;n<r;n++)e=t[n],i.push(e.apply(void 0,arguments));return i},e}(),n.exports=i}),window.require.register("views/view",function(e,t,n){var r,i=function(e,t){return function(){return e.apply(t,arguments)}},s={}.hasOwnProperty,o=function(e,t){function r(){this.constructor=e}for(var n in t)s.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e};t("lib/view_helper"),n.exports=r=function(e){function t(){return this.render=i(this.render,this),t.__super__.constructor.apply(this,arguments)}return o(t,e),t.prototype.template=function(){},t.prototype.getRenderData=function(){},t.prototype.render=function(){return this.$el.html(this.template(this.getRenderData())),this.afterRender(),this},t.prototype.afterRender=function(){},t}(Backbone.View)})