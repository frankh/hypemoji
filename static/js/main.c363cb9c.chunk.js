(this.webpackJsonphypemoji=this.webpackJsonphypemoji||[]).push([[0],{121:function(e,t,n){},122:function(e,t,n){},143:function(e,t){},145:function(e,t){},266:function(e,t,n){"use strict";n.r(t);var a=n(2),r=n.n(a),s=n(113),i=n.n(s),o=(n(121),n(37)),c=n(3),u=n(28),l=n(4),p=n(5),h=n(0),f=n(10),m=n(9),b=(n(122),n(116)),d=n(35),g=n.n(d),j=n(115),x=n(36),v=n(1),y=n(8),O=function(e){Object(f.a)(n,e);var t=Object(m.a)(n);function n(e){var a;return Object(l.a)(this,n),(a=t.call(this,e)).framesChange=function(e){var t=parseInt(e.target.value);(t<=0||!t)&&(t=10),a.setState({frames:t})},a.delayChange=function(e){var t=parseInt(e.target.value);t<=0&&(t=1),a.setState({delay:t})},a.rainbowChange=function(e){var t=e.target.checked;a.setState({rainbow:t})},a.regenerate=function(e){return e.preventDefault(),a.onDrop(a.state.images),!1},a.state={images:[],previews:[],frames:10,delay:10,rainbow:!1,progresses:[]},a.onDrop=a.onDrop.bind(Object(h.a)(a)),document.onpaste=function(e){for(var t=e.clipboardData.items,n=0;n<t.length;n++)if(0===t[n].type.indexOf("image")){var r=t[n].getAsFile();a.onDrop([r])}},a}return Object(p.a)(n,[{key:"sleep",value:function(e){return new Promise((function(t){return setTimeout(t,e)}))}},{key:"onDrop",value:function(e){var t=this;this.setState({images:e,progresses:e.map((function(){return 0}))}),setTimeout((function(){Promise.all(e.map((function(e,n){return t.hypify(n,e,t.state.frames,t.state.delay)}))).then((function(e){t.setState({previews:e}),t.setState({progresses:[]})}))}))}},{key:"progress",value:function(){var e=Object(u.a)(Object(c.a)().mark((function e(t,n){var a;return Object(c.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(a=this.state.progresses)[t]=n,this.setState({progresses:a}),e.next=5,this.sleep(1);case 5:case"end":return e.stop()}}),e,this)})));return function(t,n){return e.apply(this,arguments)}}()},{key:"hypify",value:function(){var e=Object(u.a)(Object(c.a)().mark((function e(t,n,a,r){var s,i,u,l,p,h,f,m,b,d,j,y,O,w,k,C,D;return Object(c.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(s=[],"image/gif"!==n.type){e.next=14;break}return i=new x.GifCodec,e.t0=i,e.t1=Uint8Array,e.next=7,n.arrayBuffer();case 7:return e.t2=e.sent,e.t3=new e.t1(e.t2),e.next=11,e.t0.decodeGif.call(e.t0,e.t3);case 11:u=e.sent,a=u.frames.length,s=u.frames;case 14:return console.log("Hypifying with ".concat(a," frames and ").concat(r," delay")),e.next=17,this.progress(t,0);case 17:return e.t4=g.a,e.next=20,n.arrayBuffer();case 20:return e.t5=e.sent,e.next=23,e.t4.read.call(e.t4,e.t5);case 23:return(l=e.sent).resize(1,1),p=l.getPixelColor(0,0),e.next=28,this.progress(t,.05);case 28:return e.t6=g.a,e.next=31,n.arrayBuffer();case 31:return e.t7=e.sent,e.next=34,e.t6.read.call(e.t6,e.t7);case 34:return((h=e.sent).getWidth()>=128||h.getHeight()>=128)&&h.scaleToFit(128,128),f=g.a.intToRGBA(p),m=f.r,b=f.g,d=f.b,Math.max(m,b,d)-Math.min(m,b,d)<30&&(console.log("not vibrant enough, adding red"),h.color([{apply:"red",params:[100]}])),e.next=40,this.progress(t,.07);case 40:j=h.getWidth(),y=h.getHeight(),O=0;case 42:if(!(O<a)){e.next=56;break}return w=void 0,k=360/a,void 0===s[O]?(w=new x.GifFrame(j,y,{delayCentisecs:r}),s.push(w)):(w=s[O],h=new g.a(Object(o.a)({},w.bitmap)),k=k*O%360),this.state.rainbow||(k=k*O%360),h.color([{apply:"hue",params:[k]}]),w.bitmap.data=h.bitmap.data.slice(),e.next=51,h.getBase64Async("image/png");case 51:return e.next=53,this.progress(t,(O+1)/a);case 53:O++,e.next=42;break;case 56:return C=new x.GifCodec,x.GifUtil.quantizeDekker(s),e.next=61,C.encodeGif(s,{loops:0});case 61:return D=e.sent,e.next=64,this.progress(t,1);case 64:return e.abrupt("return","data:image/gif;base64,"+v.Buffer.from(D.buffer).toString("base64"));case 65:case"end":return e.stop()}}),e,this)})));return function(t,n,a,r){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this;return Object(y.jsxs)("div",{children:[Object(y.jsx)("div",{className:"header",children:Object(y.jsx)("h1",{children:"Hypemoji"})}),Object(y.jsxs)("div",{onPaste:this.onPaste,children:[this.state.previews.length>0?Object(y.jsxs)("form",{children:[Object(y.jsxs)("label",{children:["Number of Frames:",Object(y.jsx)("input",{type:"number",name:"frames",min:"2",max:"100",placeholder:"10",onChange:this.framesChange})]}),Object(y.jsxs)("label",{children:["Frame delay (in centiseconds):",Object(y.jsx)("input",{type:"number",name:"delay",min:"2",placeholder:"10",onChange:this.delayChange})]}),Object(y.jsxs)("label",{children:["Rainbow:",Object(y.jsx)("input",{type:"checkbox",name:"rainbow",onChange:this.rainbowChange})]}),Object(y.jsx)("button",{type:"submit",name:"submit",onClick:this.regenerate,children:"Regenerate"})]}):null,Object(y.jsx)(b.a,{onDrop:this.onDrop,multiple:!0,children:function(e){var t=e.getRootProps,n=e.getInputProps;return Object(y.jsxs)("div",Object(o.a)(Object(o.a)({className:"dropzone"},t()),{},{children:[Object(y.jsx)("p",{children:"Drag image here, paste from clipboard, or click to select"}),Object(y.jsx)("input",Object(o.a)({},n()))]}))}}),Object(y.jsxs)("div",{className:"result",children:[(this.state.progresses||[]).map((function(e,t){return Object(y.jsx)(j.a,{percent:100*e},"line_".concat(t))})),this.state.previews.map((function(t,n){return Object(y.jsx)("a",{href:t,download:"".concat(e.state.images[n].name.split(".").slice(0,-1).join(".")),children:Object(y.jsx)("img",{alt:"hype emoji",src:t})},"image-".concat(n))}))]})]})]})}}]),n}(r.a.Component),w=O;Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(Object(y.jsx)(w,{}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[266,1,2]]]);
//# sourceMappingURL=main.c363cb9c.chunk.js.map