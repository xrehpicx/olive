(this.webpackJsonpolive=this.webpackJsonpolive||[]).push([[0],{79:function(e,t,n){},80:function(e,t){function n(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}n.keys=function(){return[]},n.resolve=n,e.exports=n,n.id=80},81:function(e,t,n){},86:function(e,t,n){"use strict";n.r(t);var c=n(2),o=n(0),i=n.n(o),a=n(10),r=n.n(a),s=(n(79),n(65)),l=n(123),u=n(49),d=n(38),j=n(16),b=n(57),f=n.n(b),p=n(66),v=Object(o.createContext)({});function h(e){var t=e.children,n=Object(o.useState)(null),i=Object(j.a)(n,2),a=i[0],r=i[1],s=Object(o.useState)(null),l=Object(j.a)(s,2),d=l[0],b=l[1],h=Object(o.useState)(!1),g=Object(j.a)(h,2),O=g[0],m=g[1],x=Object(o.useState)("main"),y=Object(j.a)(x,2),w=y[0],k=y[1],C=Object(o.useState)([]),S=Object(j.a)(C,2),P=S[0],N=S[1];return Object(o.useEffect)((function(){if(d&&O){var e=function(e){console.log(e),"message"===e.type?N&&N((function(t){return[].concat(Object(u.a)(t),[e[e.type]])})):"event"===e.type&&"messages"===e.event&&k("messages")};return d.on("data",e),function(){d.off("data",e)}}}),[O,d]),Object(o.useEffect)((function(){if(console.log("peer con set:",d,O),d&&!O){var e=function(){console.log("connected"),m(!0)};return d.on("open",e),function(){d.off("open",e)}}}),[d,O]),Object(o.useEffect)((function(){if(d){var e=function(){console.log("disconnected"),m(!1),b(null)},t=function(e){console.log("err",e),m(!1),b(null)};return d.on("close",e),d.on("error",t),function(){d.off("close",e),d.off("error",t)}}}),[d]),Object(o.useEffect)((function(){var e=new f.a(Object(p.a)(5),{host:"ciapeer.herokuapp.com",secure:!0}),t=function(t){r(e),console.log(t)},n=function(e){"unavailable-id"===e.type&&window.location.reload()},c=function(e){console.log("getting connection from",e.peer),b(e)};return e.on("open",t),e.on("error",n),e.on("connection",c),function(){e.off("open",t),e.off("error",n),e.off("connection",c)}}),[]),Object(c.jsx)(v.Provider,{value:{peer:a,peerConnection:d,messages:P,setPeerConnection:b,peerconState:O,setPeerconState:m,setMessage:N,pullPage:w,setPullPage:k},children:t})}var g=n(12),O=(n(81),n(62)),m=n.n(O),x=n(50),y=n.n(x),w=n(64),k=n.n(w),C=n(53),S=n.n(C),P=n(124),N=n(121),E=n(63),F=n.n(E),T=n(122);function I(e){return new Promise((function(t,n){navigator.clipboard?navigator.clipboard.writeText(e).then((function(){t(e)}),(function(e){n(e)})):t(function(e){var t=document.createElement("textarea");t.value=e,t.style.top="0",t.style.left="0",t.style.position="fixed",document.body.appendChild(t),t.focus(),t.select();try{var n=document.execCommand("copy")?"successful":"unsuccessful";console.log("Fallback: Copying text command was "+n)}catch(c){console.error("Fallback: Oops, unable to copy",c)}document.body.removeChild(t)}(e))}))}var W=n(125);function D(){var e=Object(o.useContext)(v),t=e.peer,n=e.peerConnection,i=e.peerconState,a=e.pullPage,r=e.setPullPage,s=Object(o.useState)(0),l=Object(j.a)(s,2),u=l[0],b=l[1],f=Object(o.useState)(!1),p=Object(j.a)(f,2),h=p[0],O=p[1],m=Object(g.c)(0),x=Object(g.d)(m,[-100,0],["#0077ff","#161922"]),y=Object(o.useCallback)((function(e){switch(e){case 0:r("main");break;case 1:r("connect");break;case 2:t&&I(t.id),navigator.share&&t&&navigator.share({text:t.id}),r("main");break;case 3:r("about");break;case 4:r("messages"),null===n||void 0===n||n.send({type:"event",event:"messages"})}}),[t,n,r]);return Object(o.useEffect)((function(){i&&r("connect")}),[i,r]),Object(o.useEffect)((function(){i||"messages"!==a||y(0)}),[a,i,y]),Object(c.jsxs)(g.b.div,{style:{background:i&&"messages"!==a?x:""},className:"home",children:[Object(c.jsx)(g.a,{children:h&&u>0?Object(c.jsx)(_,Object(d.a)({},{pullState:u})):""}),Object(c.jsx)(g.b.header,{drag:"messages"!==a&&"y",style:{y:m},onDragStart:function(){i||(O(!0),b(0))},onDragEnd:function(){i||O(!1),y(u)},onDrag:function(e,n){var c=-n.offset.y;t&&!i?c>250&&c<400?b(1):c>=400&&c<500?b(2):c>=500&&c<550?b(3):c<=250&&b(0):t&&i&&c>=400&&c<500&&b(4)},dragConstraints:{top:0,bottom:0},children:t?"main"===a?Object(c.jsx)(J,Object(d.a)({},{shade:h,pullState:u,peer:t})):"about"===a?Object(c.jsx)(B,{}):"connect"===a?Object(c.jsx)(z,{}):"messages"===a?Object(c.jsx)(L,{setPullPage:r}):Object(c.jsx)(c.Fragment,{}):Object(c.jsx)(g.b.div,{className:"connecting-loader",initial:{opacity:0,height:0,y:0,background:"#0077ff"},animate:{opacity:1,height:"auto",background:"coral",y:0},exit:{opacity:0,height:0},children:Object(c.jsx)(g.b.p,{initial:{opacity:0},animate:{opacity:1},transition:{repeat:1/0,repeatType:"reverse",stiffness:.2,damping:.5},children:"Assigning ID..."})})})]})}function L(e){var t=e.setPullPage;return Object(c.jsxs)(g.b.div,{animate:{opacity:1,height:window.innerHeight,background:"#161922"},className:"messages",children:[Object(c.jsx)(U,{}),Object(c.jsx)(M,{setPullPage:t}),Object(c.jsx)(A,{})]})}function U(){var e=Object(o.useContext)(v).peerConnection;return Object(c.jsxs)("header",{children:[Object(c.jsx)("h2",{children:"Olive"}),Object(c.jsxs)("p",{children:["Connected to ",null===e||void 0===e?void 0:e.peer]})]})}function A(){var e=Object(o.useContext)(v),t=e.peerConnection,n=e.setMessage,i=Object(o.useState)(!1),a=Object(j.a)(i,2),r=a[0],s=a[1],l=Object(o.useRef)(""),b=Object(o.useRef)(),f=Object(o.useCallback)((function(){if(r){var e,c,o;console.log(l.current.trim());var i={text:l.current.trim()};null===t||void 0===t||t.send({message:i,type:"message"}),n&&n((function(e){return[].concat(Object(u.a)(e),[Object(d.a)(Object(d.a)({},i),{},{sent:!0})])})),(null===(e=b.current)||void 0===e?void 0:e.value)&&(b.current.value=""),(null===(c=b.current)||void 0===c?void 0:c.focus)&&(null===(o=b.current)||void 0===o||o.focus())}}),[t,r,n]);return Object(o.useEffect)((function(){function e(e){"Enter"!==e.key||e.shiftKey||f()}return window.addEventListener("keypress",e),function(){window.removeEventListener("keypress",e)}}),[f]),Object(c.jsxs)("div",{className:"message-input",children:[Object(c.jsx)(W.a,{inputRef:b,fullWidth:!0,autoFocus:!0,multiline:!0,onChange:function(e){l.current=e.target.value,l.current.trim()?s(!0):s(!1)},inputProps:{style:{caretColor:"#0077ff",color:"white"}}}),Object(c.jsx)(m.a,{style:{color:"#0077ff",opacity:r?1:.5},onClick:f})]})}function M(e){e.setPullPage;var t=Object(o.useContext)(v).messages;return Object(c.jsx)("div",{className:"messages-container",children:null===t||void 0===t?void 0:t.map((function(e,t){return Object(c.jsx)(R,{message:e},t)})).reverse()})}function R(e){var t=e.message;return Object(c.jsx)("div",{className:t.sent?"message sent-message":"message",children:Object(c.jsx)("p",{children:t.text})})}function z(){var e=Object(o.useState)(""),t=Object(j.a)(e,2),n=t[0],i=t[1],a=Object(o.useContext)(v),r=a.peer,s=a.peerConnection,l=a.peerconState,u=a.setPeerConnection,d=Object(o.useState)(""),b=Object(j.a)(d,2),f=b[0],p=b[1];function h(e){console.log("connecting to:",e);var t=null===r||void 0===r?void 0:r.connect(e);console.log(t),u&&u(t);var n=setInterval((function(){var c,o,i,a,r,s;console.log("checking connetionState",null===t||void 0===t||null===(c=t.peerConnection)||void 0===c?void 0:c.connectionState),(null===t||void 0===t||null===(o=t.peerConnection)||void 0===o?void 0:o.connectionState)&&"failed"===(null===t||void 0===t||null===(i=t.peerConnection)||void 0===i?void 0:i.connectionState)?(t.close(),u&&u(void 0),h(e),clearInterval(n)):((null===t||void 0===t||null===(a=t.peerConnection)||void 0===a?void 0:a.connectionState)&&"connected"===(null===t||void 0===t||null===(r=t.peerConnection)||void 0===r?void 0:r.connectionState)||!(null===t||void 0===t||null===(s=t.peerConnection)||void 0===s?void 0:s.connectionState))&&clearInterval(n)}),2e3)}return Object(o.useEffect)((function(){navigator.clipboard.readText().then((function(e){5===e.length&&i(e)})).catch((function(){}))}),[]),Object(o.useEffect)((function(){if(!s||!l){var e=setInterval((function(){n||navigator.clipboard.readText().then((function(e){return 5===e.length&&(i(e),!0)})).catch((function(){}))}),2e3);return function(){return clearInterval(e)}}}),[n,s,l]),Object(c.jsxs)(g.b.div,{initial:{opacity:0},animate:{opacity:1,height:l&&s?300:n?400:300,background:"#0077ff"},className:"connect-page",children:[Object(c.jsx)("div",{className:"pull-up-indicator",style:{position:"static"},children:l?Object(c.jsx)(g.b.span,{initial:{y:5},animate:{y:-5},transition:{repeat:1/0,repeatType:"reverse",stiffness:.2,damping:.5},children:"pull up to message"}):Object(c.jsx)(c.Fragment,{})}),Object(c.jsxs)("header",{children:[Object(c.jsx)("h2",{children:l&&s?"Connected to ".concat(s.peer):"Connect to ID"}),Object(c.jsx)(y.a,{})]}),l&&s?Object(c.jsx)(c.Fragment,{}):Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)(P.a,{id:"partnerid",label:"partner id",defaultValue:"",InputProps:{style:{caretColor:"white",color:"white"}},autoFocus:!0,variant:"outlined",color:"secondary",onChange:function(e){p(e.target.value)}}),Object(c.jsx)(N.a,{disabled:!(5===f.length),variant:"text",color:"secondary",onClick:function(){return h(f)},children:"connect"})]}),n||l&&s?Object(c.jsx)("div",{className:"quick-connect",children:Object(c.jsxs)(T.a,{disabled:!(l||!s),onClick:function(){l&&s?s.close():h(n)},variant:"extended",style:l&&s?{background:"coral",color:"white"}:{},children:[l&&s?Object(c.jsx)(c.Fragment,{}):Object(c.jsx)(F.a,{}),Object(c.jsx)("p",{children:l||s?!l&&s?"connecting to ".concat(s.peer):"disconnect from ".concat(s&&s.peer):"connect to ".concat(n)})]})}):Object(c.jsx)(c.Fragment,{})]})}function B(){return Object(c.jsxs)(g.b.div,{initial:{opacity:0},animate:{opacity:1,height:120,background:"coral"},className:"about",children:[Object(c.jsxs)("header",{children:[Object(c.jsx)("h2",{children:"whats this?"}),Object(c.jsx)(S.a,{})]}),Object(c.jsx)("p",{children:"just a ux experiment and also u can use this to watch youtube with like one other person"})]})}function J(e){var t=e.shade,n=(e.pullState,e.peer);return Object(c.jsxs)(g.b.div,{initial:{opacity:0,height:0},animate:{opacity:1,height:200},className:"peer-id",children:[Object(c.jsx)("div",{className:"pull-up-indicator",children:Object(c.jsx)(g.b.span,{initial:{y:5},animate:{y:-5},transition:{repeat:1/0,repeatType:"reverse",stiffness:.2,damping:.5},children:t?"drag to select":"pull up"})}),Object(c.jsx)("p",{style:{fontSize:"1rem"},children:"you are"}),Object(c.jsx)("h3",{style:{fontSize:"2rem",fontWeight:600},children:null===n||void 0===n?void 0:n.id}),Object(c.jsx)("span",{className:"version",children:"v0.0.1"}),Object(c.jsx)("span",{style:{fontSize:".8rem",opacity:.8},children:"pull down to come back"})]})}function _(e){var t=e.pullState,n=Object(o.useContext)(v),i=n.peerConnection,a=n.peerconState;return Object(c.jsxs)(g.b.div,{initial:{opacity:0,y:100},exit:{opacity:0,y:200},animate:{opacity:1,y:0},className:"shade-menu",children:[Object(c.jsxs)("div",{style:{background:3===t?"var(--accent)":""},className:"menu-item",children:[Object(c.jsx)("p",{children:"what is this?"}),Object(c.jsx)(S.a,{})]}),Object(c.jsxs)("div",{style:{background:2===t?"var(--accent)":""},className:"menu-item",children:[Object(c.jsx)("p",{children:"share id"}),Object(c.jsx)(k.a,{})]}),i?Object(c.jsxs)("div",{style:{background:a?"var(--accent)":"coral"},className:"menu-item",children:[Object(c.jsx)("p",{children:a?"connected to ".concat(i.peer):"connecting to ".concat(i.peer)}),Object(c.jsx)(y.a,{})]}):Object(c.jsxs)("div",{style:{background:1===t?"var(--accent)":""},className:"menu-item",children:[Object(c.jsx)("p",{children:"connect with"}),Object(c.jsx)(y.a,{})]})]})}var q=function(){var e=Object(s.a)({palette:{primary:{main:"#0077ff"},secondary:{main:"#ffff"}}});return Object(c.jsx)(l.a,{theme:e,children:Object(c.jsx)(h,{children:Object(c.jsx)(D,{})})})},H=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function K(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}var V=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,126)).then((function(t){var n=t.getCLS,c=t.getFID,o=t.getFCP,i=t.getLCP,a=t.getTTFB;n(e),c(e),o(e),i(e),a(e)}))};r.a.render(Object(c.jsx)(i.a.StrictMode,{children:Object(c.jsx)(q,{})}),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/olive",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/olive","/service-worker.js");H?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var c=n.headers.get("content-type");404===n.status||null!=c&&-1===c.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):K(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://cra.link/PWA")}))):K(t,e)}))}}(),V()}},[[86,1,2]]]);
//# sourceMappingURL=main.c6ef70de.chunk.js.map