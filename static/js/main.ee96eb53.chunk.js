(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{26:function(e,n,t){e.exports=t(54)},31:function(e,n,t){},33:function(e,n,t){e.exports=t.p+"static/media/logo.5d5d9eef.svg"},34:function(e,n,t){},54:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(1),i=t.n(o),c=(t(31),t(13)),s=t.n(c),l=t(19),u=t(20),f=t(21),h=t(24),p=t(22),g=t(4),d=t(25),m=(t(33),t(34),t(23)),b=t.n(m),w=t(5),v=t.n(w),y=t(41),C=y.GifFrame,k=(y.GifUtil,y.GifCodec),x=function(e){function n(e){var t;return Object(u.a)(this,n),(t=Object(h.a)(this,Object(p.a)(n).call(this,e))).framesChange=function(e){var n=parseInt(e.target.value);n<=0&&(n=1),t.setState({frames:n})},t.delayChange=function(e){var n=parseInt(e.target.value);n<=0&&(n=1),t.setState({delay:n})},t.rainbowChange=function(e){var n=e.target.checked;t.setState({rainbow:n})},t.regenerate=function(e){return e.preventDefault(),t.onDrop(t.state.images),!1},t.state={images:[],previews:[],frames:10,delay:10,rainbow:!1},t.onDrop=t.onDrop.bind(Object(g.a)(t)),t}return Object(d.a)(n,e),Object(f.a)(n,[{key:"onDrop",value:function(e){var n=this;this.setState({images:e}),Promise.all(e.map(function(e){return n.hypify(e,n.state.frames,n.state.delay)})).then(function(e){n.setState({previews:e})})}},{key:"hypify",value:function(){var e=Object(l.a)(s.a.mark(function e(n,t,a){var r,o,i,c,l,u,f,h,p,g,d,m,b,w,y;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("Hypifying with ".concat(t," frames and ").concat(a," delay")),r=[],e.t0=v.a,e.next=5,n.arrayBuffer();case 5:return e.t1=e.sent,e.next=8,e.t0.read.call(e.t0,e.t1);case 8:return(o=e.sent).scaleToFit(1,1),i=o.getPixelColor(0,0),e.t2=v.a,e.next=14,n.arrayBuffer();case 14:return e.t3=e.sent,e.next=17,e.t2.read.call(e.t2,e.t3);case 17:c=e.sent,l=v.a.intToRGBA(i),u=l.r,f=l.g,h=l.b,Math.max(u,f,h)-Math.min(u,f,h)<30&&(console.log("not vibrant enough, adding red"),c.color([{apply:"red",params:[100]}])),p=c.getWidth(),g=c.getHeight(),c.posterize(16),d=0;case 23:if(!(d<t)){e.next=36;break}return m=new C(p,g,{delayCentisecs:a}),r.push(m),b=360/t,this.state.rainbow||(b*=d),c.color([{apply:"hue",params:[b]}]),m.bitmap.data=c.bitmap.data.slice(),e.next=32,c.getBase64Async("image/png");case 32:console.log("done frame ".concat(d,"/").concat(t));case 33:d++,e.next=23;break;case 36:return w=new k,e.next=39,w.encodeGif(r,{loops:0});case 39:return y=e.sent,e.abrupt("return","data:image/gif;base64,"+btoa(String.fromCharCode.apply(null,y.buffer)));case 41:case"end":return e.stop()}},e,this)}));return function(n,t,a){return e.apply(this,arguments)}}()},{key:"render",value:function(){return r.a.createElement("div",null,this.state.previews.length>0?r.a.createElement("form",null,r.a.createElement("label",null,"Number of Frames:",r.a.createElement("input",{type:"number",name:"frames",placeholder:"10",onChange:this.framesChange})),r.a.createElement("label",null,"Frame delay (in centiseconds):",r.a.createElement("input",{type:"number",name:"delay",placeholder:"10",onChange:this.delayChange})),r.a.createElement("label",null,"Rainbow:",r.a.createElement("input",{type:"checkbox",name:"rainbow",onChange:this.rainbowChange})),r.a.createElement("button",{type:"submit",name:"submit",onClick:this.regenerate},"Regenerate")):null,r.a.createElement(b.a,{withIcon:!0,buttonText:"Choose images",onChange:this.onDrop,imgExtension:[".jpg",".gif",".png",".gif"],maxFileSize:5242880}),this.state.previews.map(function(e,n){return r.a.createElement("img",{key:"image-".concat(n),width:"128",height:"128",src:e})}))}}]),n}(r.a.Component),E=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function j(e,n){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var t=e.installing;null!=t&&(t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),n&&n.onUpdate&&n.onUpdate(e)):(console.log("Content is cached for offline use."),n&&n.onSuccess&&n.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}i.a.render(r.a.createElement(x,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/hypemoji",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var n="".concat("/hypemoji","/service-worker.js");E?(function(e,n){fetch(e).then(function(t){var a=t.headers.get("content-type");404===t.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):j(e,n)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(n,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")})):j(n,e)})}}()}},[[26,1,2]]]);
//# sourceMappingURL=main.ee96eb53.chunk.js.map