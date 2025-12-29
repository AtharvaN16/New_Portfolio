3861:function(e,
t,
l){
let r;
l.d(t,
{
Z:function(){
return sz
},
x:function(){
return sT
}
});
var n=l(5893),
s=l(6010),
a=l(8583),
i=l(7294),
o=l(5103),
c=l(7313),
d=l.n(c),
u=l(3493),
m=l.n(u);
let p={
leading:!1,
trailing:!0
};
var h=function(e){
let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:200,
l=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],
r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:p;
return(0,
i.useCallback)(m()(e,
t,
r),
l)
},
f=function(e){
let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],
l=arguments.length>2&&void 0!==arguments[2]&&arguments[2],
r=(0,
i.useRef)({

});
(0,
i.useEffect)(()=>{
let n=()=>{
l?r.current.width!==window.innerWidth&&(r.current.width=window.innerWidth,
e()):e()
};
return window.addEventListener("resize",
n,
{
passive:!0
}),
t&&n(),
r.current.width=window.innerWidth,
()=>{
window.removeEventListener("resize",
n)
}
},
[e,
l])
};
let x=(0,
o.cn)(!1),
v=()=>{
let e=(0,
a.b9)(x),
t=(0,
i.useRef)(null);
f(h(()=>{
let l=window.innerWidth<d().md;
t.current!==l&&(t.current=l,
e(t.current))
},
200),
!0,
!0)
};
function g(){
return(0,
a.Dv)(x)
}var w=l(990),
b=l(4450),
j=l.n(b),
y=l(4486),
N=l.n(y);
l(2729);
var k=l(5470),
C=l.n(k);
function Z(){
return!!navigator.maxTouchPoints&&navigator.maxTouchPoints>2&&/MacIntel/.test(navigator.platform)
}let R=C().mobile||C().tablet||Z();
C().tablet||Z();
let S=C().mobile,
_={
mouse:{
x:0,
y:0
},
current:{
x:void 0,
y:void 0
},
last:{
x:void 0,
y:void 0
},
ease:.14,
fx:{
diff:0,
acc:0,
velocity:0
},
fy:{
diff:0,
acc:0,
velocity:0
}
},
L=[],
M=()=>{
let e=(0,
i.useRef)();
return(0,
i.useEffect)(()=>{
if(!R){
let e=e=>{
let t=e.detail&&e.detail.pageX?e.detail:e;
_.mouse.x=t.pageX,
_.mouse.y=t.pageY-(window.pageYOffset||document.documentElement.scrollTop),
_.current.x=t.pageX,
_.current.y=t.pageY-(window.pageYOffset||document.documentElement.scrollTop)
};
return window.addEventListener("mousemove",
e,
{
passive:!0
}),
window.addEventListener("dragover",
e,
{
passive:!0
}),
window.addEventListener("keenslider_mousemove",
e,
{
passive:!0
}),
()=>{
window.removeEventListener("mousemove",
e),
window.removeEventListener("dragover",
e),
window.removeEventListener("keenslider_mousemove",
e)
}
}
},
[]),
(0,
i.useEffect)(()=>{
if(!R){
let t=()=>{
void 0!==_.current.x&&(void 0===_.last.x?(_.last.x=_.current.x,
_.last.y=_.current.y):(_.last.x=j()(_.last.x,
_.current.x,
_.ease),
_.last.y=j()(_.last.y,
_.current.y,
_.ease)),
_.fx.diff=_.current.x-_.last.x,
_.fx.acc=_.fx.diff/window.innerWidth,
_.fx.velocity=+_.fx.acc,
_.fy.diff=_.current.y-_.last.y,
_.fy.acc=_.fy.diff/window.innerWidth,
_.fy.velocity=+_.fy.acc,
e.current&&(e.current.style.transform="translate(".concat(_.last.x,
"px,
 ").concat(_.last.y,
"px)")),
N()(L,
e=>e(_)))
};
return w.ZP.ticker.add(t),
()=>{
w.ZP.ticker.remove(t)
}
}
},
[]),
(0,
n.jsx)("div",
{
id:"cursor",
className:"z-cursor pointer-events-none fixed top-0 left-0",
ref:e
})
},
T="font-mono uppercase leading-[1.125] text-[1.2rem] tracking-[0.04em]",
E=(0,
i.forwardRef)((e,
t)=>{
let{
as:l="span",
className:r,
wrap:a=!0,
children:o,
...c
}=e,
d=(0,
s.Z)(r,
T);
return a?(0,
n.jsx)(l,
{
className:d,
...c,
ref:t,
children:o
}):i.Children.map(o,
e=>i.cloneElement(e,
{
...e.props,
className:(0,
s.Z)(d,
e.props.className)
}))
});
var P=function(){
let e=(0,
i.useRef)(!0);
return e.current?(e.current=!1,
!0):e.current
},
z=function(e,
t,
l){
let r=P();
(0,
i.useEffect)(()=>r?()=>l&&l():e(),
t)
},
B=function(){
arguments.length>0&&void 0!==arguments[0]&&arguments[0],
arguments.length>1&&void 0!==arguments[1]&&arguments[1];
let[e,
t]=(0,
i.useState)({
width:window.innerWidth,
height:window.innerHeight
});
return(0,
i.useEffect)(()=>{
{
let e=()=>{
t({
width:window.innerWidth,
height:window.innerHeight
})
};
return window.addEventListener("resize",
e),
()=>{
window.removeEventListener("resize",
e)
}
}
},
[]),
e
};
let A=(0,
o.cn)(!1);
(0,
o.cn)("text hello world"),
(0,
o.cn)({
background:"black",
color:"white"
});
var H=l(9693),
O=l.n(H),
D=l(9332);
function V(){
let e=document.body,
t=document.documentElement,
l=Math.max(e.scrollHeight,
e.offsetHeight,
t.clientHeight,
t.scrollHeight,
t.offsetHeight);
return l
}function I(e){
let t=(0,
i.useCallback)(()=>{
var t;
return null==e?void 0:null===(t=e.current)||void 0===t?void 0:t.restart()
},
[]);
(0,
i.useEffect)(()=>{
t&&t()
},
[t])
}function F(e){
(0,
i.useEffect)(()=>{
function t(t){
27===t.keyCode&&e(!1)
}return document.addEventListener("keydown",
t,
!1),
()=>[document.removeEventListener("keydown",
t,
!1)]
},
[e])
}let q=i.useLayoutEffect;
var W=function(e,
t,
l){
let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[],
n=(0,
i.useRef)(w.ZP.timeline({
paused:!0
}));
return q(()=>{
if(l)return;
e(n.current,
t);
let r=n.current;
return()=>{
null==r||r.clear(),
null==r||r.kill()
}
},
null!=r?r:[]),
n.current
};
function Y(){
let e=e=>{

},
t=e=>{

};
return[e,
t]
}let G=(0,
s.Z)(T,
"inline-flex justify-center border-current cursor-pointer transition-colors ease-out-expo"),
K=(0,
i.forwardRef)((e,
t)=>{
let{
invertTheme:l=!1,
className:r,
as:a="button",
padding:i="py-2 px-4",
border:o=!0,
borderHover:c=!1,
rounded:d=!0,
overlay:u=!1,
invert:m=!1,
...p
}=e;
return(0,
n.jsx)(a,
{
ref:t,
className:(0,
s.Z)(G,
d&&"rounded-full",
(o||c)&&"border",
c&&m?"border-background":"border-foreground",
u&&"text-foreground",
i,
m&&"text-foreground bg-background hover:bg-foreground hover:text-background hover:border-foreground",
l&&"text-background bg-foreground hover:bg-background hover:text-foreground hover:border-foreground",
r),
...p
})
}),
U=(0,
i.forwardRef)((e,
t)=>{
let[l,
r]=Y();
return(0,
n.jsx)(K,
{
onMouseOver:l,
onMouseLeave:r,
ref:t,
...e
})
});
var X=l(1664),
J=l.n(X),
$=l(7361),
Q=l.n($);
function ee(e){
let{
slug:t,
_type:l
}=e,
r=O()(["page"!==l?l:null,
function(e){
let t=Q()(e,
["slug"],
Q()(e,
["current"],
e));
if("home"!==t)return t
}(t)]);
return"/".concat(r.join("/"))
}var et=l(1163);
let el=e=>e&&(e.indexOf("http")>=0||e.indexOf("tel:")>=0||e.indexOf("mailto:")>=0),
er=(0,
i.forwardRef)((e,
t)=>{
let{
children:l,
...r
}=e,
[s,
a]=Y();
return(0,
n.jsx)(en,
{
onMouseOver:s,
onMouseLeave:a,
ref:t,
...r,
children:l
})
}),
en=(0,
i.forwardRef)((e,
t)=>{
let{
openInNewTab:l=!0,
nonLinkTag:r="span",
className:a,
link:o,
to:c,
children:d,
showText:u=!0,
scroll:m=!1,
prefetch:p=!0,
queryParams:h,
...f
}=e,
x=(0,
et.useRouter)(),
{
url:v,
text:g,
hash:w,
query:b,
noFollow:j
}=(0,
i.useMemo)(()=>{
var e;
return c?{
url:c
}:o?(e={
...o,
query:h||o.query
}).linkType?"external"===e.linkType?e:{
text:Q()(e,
["text"],
Q()(e,
["page",
"title"])),
url:e.page?ee(e.page,
null==e?void 0:e.subpageSlug):"",
hash:Q()(e,
["pageAnchor"]),
query:e.query?function(e){
let t=new URLSearchParams(e);
return Object.fromEntries(t)
}(e.query):null,
subpageSlug:(null==e?void 0:e.subpageSlug)||null
}:{
text:Q()(e,
["title"]),
url:ee(e),
hash:Q()(e,
["pageAnchor"])
}:{

}
},
[o,
h,
c]);
return el(v)?(0,
n.jsxs)("a",
{
href:v,
target:l?"_blank":"",
rel:l?"noreferrer noopener ".concat(j?"nofollow":""):"",
...f,
className:a,
ref:t,
children:[u&&g,
d]
}):v?(0,
n.jsxs)(J(),
{
href:{
pathname:w?v+"#"+w:v,
query:b
},
scroll:m,
prefetch:!!p&&void 0,
...f,
className:(0,
s.Z)(a,
x.asPath===v?"is-active":""),
ref:t,
children:[u&&g,
d]
}):(0,
n.jsxs)(r,
{
...f,
className:a,
ref:t,
children:[u&&g,
d]
})
});
function es(e){
let{
stroke:t="currentColor",
...l
}=e;
return(0,
n.jsxs)("svg",
{
width:"1rem",
height:"1rem",
viewBox:"0 0 10 10",
fill:"none",
xmlns:"http://www.w3.org/2000/svg",
...l,
children:[(0,
n.jsx)("path",
{
d:"M4.25023 7.50047C6.04529 7.50047 7.50047 6.04529 7.50047 4.25023C7.50047 2.45518 6.04529 1 4.25023 1C2.45518 1 1 2.45518 1 4.25023C1 6.04529 2.45518 7.50047 4.25023 7.50047Z",
stroke:t,
strokeWidth:"1.00007",
strokeLinecap:"round",
strokeLinejoin:"round"
}),
(0,
n.jsx)("path",
{
d:"M9.00133 9.00133L6.82617 6.82617",
stroke:t,
strokeWidth:"1.00007",
strokeLinecap:"square",
strokeLinejoin:"round"
})]
})
}en.displayName="Link";
var ea=l(290),
ei=l.n(ea),
eo=l(3279),
ec=l.n(eo),
ed=l(1609),
eu=l.n(ed),
em=l(6546),
ep=l.n(em),
eh=l(1629),
ef=l.n(eh),
ex=l(6833),
ev=l.n(ex),
eg=l(7116),
ew=l(9961),
eb=l(8066),
ej=l.n(eb);
let ey={

},
eN=new class{
set(e,
t,
l){
let r="".concat(this.sessionKey,
"-").concat(e),
n={
path:t,
y:isNaN(l)?0:l
};
ey[r]=n
}get(e,
t){
let l="".concat(this.sessionKey,
"-").concat(e),
r=null;
if(!(r=ey[l]))return 0;
let{
path:n,
y:s
}=r;
return t===n&&s?s:0
}constructor(e){
this.sessionKey=e
}
}("site"),
ek=!1;
w.ZP.registerPlugin(ep());
let eC=(0,
i.createContext)(),
eZ=(0,
o.cn)(!1);
class eR{
constructor(e,
t){
this.pause=()=>{
this.paused||(this.paused=!0,
this.scrollY=window.scrollY)
},
this.resume=()=>{
this.paused=!1
},
this.scrollTop=e=>this.paused?this.scrollY:(e&&window.scrollTo(0,
e),
window.scrollY),
this.getBoundingClientRect=()=>({
top:0,
left:0,
width:window.innerWidth,
height:window.innerHeight
}),
this.id=e,
this.paused=t,
this.scrollY=0
}
}let eS=new eR("dialog"),
e_=new eR("page-wrapper");
function eL(e){
let{
page:t,
children:l
}=e,
r=(0,
a.Dv)(eZ),
s=(0,
i.useRef)(),
o=(0,
i.useRef)({
scrollListeners:[],
pause:()=>{
var e;
null===(e=s.current)||void 0===e||e.stop()
},
resume:()=>{
var e;
null===(e=s.current)||void 0===e||e.start()
},
setScroll:e=>{
var t;
null===(t=s.current)||void 0===t||t.setScroll(e)
}
}),
c=(0,
et.useRouter)(),
d=(0,
i.useCallback)(e=>{
s.current&&(s.current.stop(),
s.current.setScroll(e),
s.current.start())
},
[]),
{
set:u
}=function(e,
t){
let l=(0,
et.useRouter)();
return(0,
i.useEffect)(()=>{
l.beforePopState(e=>(e.options.scroll=!1,
e.options.popState=!0,
!0));
let e=()=>{
ek=!0
},
t=()=>{
ej()(()=>{
ek=!1
},
250)
};
return l.events.on("routeChangeStart",
e),
l.events.on("routeChangeComplete",
t),
l.events.on("routeChangeError",
t),
()=>{
l.events.off("routeChangeStart",
e),
l.events.off("routeChangeComplete",
t),
l.events.on("routeChangeError",
t)
}
},
[]),
(0,
i.useEffect)(()=>{
var e;
let l=null==window?void 0:null===(e=window.history)||void 0===e?void 0:e.state;
if((null==l?void 0:l.key)&&l.options.popState){
let e=eN.get(l.key,
l.as)||0;
ef()(()=>t(e)),
ej()(()=>t(e),
5)
}else t(0),
ej()(()=>t(0),
5)
},
[t,
e]),
(0,
i.useMemo)(()=>({
get:()=>{
var e,
t;
return eN.get(null===(e=window.history.state)||void 0===e?void 0:e.key,
null===(t=window.history.state)||void 0===t?void 0:t.as)||0
},
set:e=>{
if(!ek){
var t;
let l=null==window?void 0:null===(t=window.history)||void 0===t?void 0:t.state;
l&&eN.set(l.key,
l.as,
e)
}
}
}),
[])
}(t,
d);
(0,
i.useEffect)(()=>{
ep().scrollerProxy(document.getElementById(eS.id),
eS),
ep().scrollerProxy(document.getElementById(e_.id),
e_);
let e=new ew.Z({
orientation:"vertical",
gestureOrientation:"vertical",
duration:1.5,
smoothWheel:!0,
wheelMultiplier:1,
touchMultiplier:2,
smoothTouch:!1,
wheelEventsTarget:document.body
}),
t=t=>{
e.raf(1e3*t)
};
w.ZP.ticker.add(t),
w.ZP.ticker.lagSmoothing(0),
o.current.lenis=e;
let l=e=>{
u(e.scroll),
ep().update(),
N()(o.current.scrollListeners,
t=>{
t(e)
})
};
return e.on("scroll",
l),
s.current=e,
()=>{
e.off("scroll",
l),
e.destroy(),
w.ZP.ticker.remove(t)
}
},
[u]);
let[m,
p]=(0,
i.useState)();
return q(()=>{
if(o.current.lenis&&m&&!(m.indexOf("=")>=0))try{
let e=document.querySelector(m);
e&&o.current.lenis.scrollTo(e,
{
offset:0
})
}catch(e){

}
},
[o.current.lenis,
m]),
q(()=>{
let e=window.location.hash;
if(e){
var t;
p(null===(t=e.split("&"))||void 0===t?void 0:t[0])
}
},
[c]),
(0,
i.useEffect)(()=>{
r?s.current.stop():s.current.start()
},
[r,
s]),
(0,
n.jsx)(eC.Provider,
{
value:o,
children:l
})
}function eM(){
let e=(0,
i.useContext)(eC);
(0,
i.useEffect)(()=>{
var t,
l;
null==e||null===(t=e.current)||void 0===t||null===(l=t.lenis)||void 0===l||l.scrollTo(0,
{
immediate:!0
})
},
[])
}var eT=l(4818);
let eE=(0,
o.cn)(!1),
eP=(0,
o.cn)({
pages:[],
activeIndex:0,
pageToLoad:null
}),
ez=(0,
o.cn)({
pages:[],
activeIndex:0,
pageToLoad:null
}),
eB=e=>{
let t=eA(e),
l=eH(e),
r=eO(e);
return(0,
i.useMemo)(()=>(0,
o.cn)(e=>{
var n;
return(null===(n=e(t))||void 0===n?void 0:n[e(l)])||e(r)
}),
[l,
r,
t])
},
eA=e=>(0,
i.useMemo)(()=>(0,
eT.R)(e,
e=>e.prop("pages")),
[e]),
eH=e=>(0,
i.useMemo)(()=>(0,
eT.R)(e,
e=>e.prop("activeIndex")),
[e]),
eO=e=>(0,
i.useMemo)(()=>(0,
eT.R)(e,
e=>e.prop("pageToLoad")),
[e]),
eD=e=>{
let t=(0,
a.Dv)(eA(e)),
l=(0,
a.b9)(eH(e)),
r=(0,
et.useRouter)(),
n=(0,
i.useRef)({
changingRoute:!1
});
return(0,
i.useEffect)(()=>{
let e=(e,
t)=>{
let{
shallow:l
}=t;
l||(n.changingRoute=!0)
},
t=(e,
t)=>{
let{
shallow:l
}=t;
l||(n.changingRoute=!1)
};
return r.events.on("routeChangeStart",
e),
r.events.on("routeChangeError",
t),
r.events.on("routeChangeComplete",
t),
()=>{
r.events.off("routeChangeStart",
e),
r.events.off("routeChangeError",
t),
r.events.off("routeChangeComplete",
t)
}
},
[]),
(0,
i.useCallback)(e=>{
if(n.changingRoute)return;
let s=t.indexOf(e);
l(s),
r.asPath!==ee(e)&&r.replace(ee(e),
null,
{
shallow:!0,
scroll:!1
})
},
[t,
l])
};
var eV=l(6269),
eI=l(928),
eF=l.n(eI),
eq=l(6885),
eW=l.n(eq),
eY=l(7650);
let eG=e=>{
let{
contentAtom:t,
page:l
}=e,
r=sT(l),
s=eD(t),
o=(0,
a.Dv)(eE),
c=(0,
i.useRef)({
dialogOpen:!1
}),
d=function(e){
let t=(0,
i.useRef)(),
l=(0,
i.useContext)(e$),
r=(0,
eV.lV)((0,
i.useCallback)(e=>e(eE),
[]));
return(0,
i.useEffect)(()=>{
if(!t.current)return;
let n=new window.IntersectionObserver(async t=>{
var n;
let s=await r();
(null==l||!l.inDialog||s)&&((null==l?void 0:l.inDialog)||!s)&&(null==t?void 0:null===(n=t[0])||void 0===n?void 0:n.isIntersecting)&&e&&e()
},
{
rootMargin:"-50% 0px -50% 0px",
threshold:0
});
return n.observe(t.current),
()=>{
n.disconnect()
}
},
[null==l?void 0:l.inDialog,
r,
e]),
t
}((0,
i.useCallback)(()=>{
s(l)
},
[l]));
return(0,
i.useEffect)(()=>{
c.dialogOpen=o
},
[o]),
(0,
n.jsx)("div",
{
ref:d,
children:(0,
n.jsx)(r,
{
page:l
},
l._id)
})
};
function eK(e){
var t,
l;
let{
as:r="div",
contentAtom:s,
page:o
}=e,
c=eQ(),
[d,
u]=(0,
a.KO)(eA(s)),
m=(0,
i.useRef)(),
p=(0,
i.useMemo)(()=>c?d:[o,
...d],
[c,
o,
d]),
h=(null===(t=eF()(p))||void 0===t?void 0:t.next)||(null==o?void 0:o.next),
f=(0,
i.useCallback)(async()=>{
if(h&&!m.current){
m.current=!0;
try{
var e,
t,
l;
let r=ee(h),
n=await eW().router.pageLoader.getDataHref({
asPath:r,
href:r
}),
s=null===(e=await (await window.fetch(n)).json())||void 0===e?void 0:null===(t=e.pageProps)||void 0===t?void 0:null===(l=t.data)||void 0===l?void 0:l.page;
s&&(u(e=>[...e,
s]),
ep().refresh())
}finally{
m.current=!1
}
}
},
[p]);
return h?(0,
n.jsxs)(r,
{
className:"bg-white",
children:[null===(l=O()(p))||void 0===l?void 0:l.map(e=>(0,
n.jsx)(eG,
{
page:e,
contentAtom:s
},
e._id)),
h&&(0,
n.jsx)(eU,
{
onAppearInView:f
})]
}):null
}function eU(e){
let{
className:t,
onAppearInView:l,
options:r={

}
}=e,
a=(0,
i.useCallback)(e=>{
e&&(null==l||l())
},
[l]),
o={
threshold:0,
rootMargin:"0% 0px 50% 0px",
...r,
onChange:a
},
{
inView:c,
ref:d
}=(0,
eY.YD)(o);
return(0,
n.jsx)("div",
{
ref:d,
className:(0,
s.Z)(t,
"overflow-hidden border-y border-black/50 relative py-2")
})
}let eX=["article"],
eJ=["article"],
e$=i.createContext(),
eQ=()=>{
let e=(0,
i.useContext)(e$);
return null==e?void 0:e.inDialog
},
e0=e=>{
let{
children:t
}=e,
l=(0,
i.useMemo)(()=>({
inDialog:!0
}),
[]);
return(0,
n.jsx)(e$.Provider,
{
value:l,
children:t
})
};
function e1(e){
let{
parentPage:t
}=e,
l=(0,
i.useRef)(),
r=(0,
i.useRef)(),
s=(0,
a.b9)(eA(ez)),
o=(0,
a.Dv)(eO(ez)),
c=(0,
a.Dv)(eE),
d=(0,
a.b9)(eE),
u=(0,
i.useRef)({
y:0,
open:c
}),
m=(0,
i.useContext)(eC),
p=(0,
et.useRouter)();
(0,
i.useEffect)(()=>{
if(o){
if(u.current.open){
var e;
let t=S?window.innerHeight:"100vh",
n=w.ZP.timeline(),
a=window.scrollY;
return eS.pause(),
w.ZP.set(l.current,
{
position:"fixed",
left:0,
right:0,
height:t,
overflow:"hidden"
}),
w.ZP.set(r.current,
{
position:"absolute",
left:0,
right:0,
top:-a
}),
null==m||null===(e=m.current)||void 0===e||e.pause(),
window.scrollTo(0,
0),
n.to(l.current,
{
y:t,
duration:1.2,
ease:"expo.out",
onComplete:()=>{
s([o]),
w.ZP.set(r.current,
{
position:"static"
})
}
}),
n.to(l.current,
{
y:0,
duration:1.2,
ease:"expo.out",
onComplete:()=>{
var e;
w.ZP.set(l.current,
{
position:"relative",
height:"auto",
overflowY:"auto",
overflowX:"hidden"
}),
null==m||null===(e=m.current)||void 0===e||e.resume(),
eS.resume()
}
}),
()=>{
n.kill()
}
}s([o])
}
},
[o]),
(0,
i.useEffect)(()=>{
var e;
let t=window.scrollY,
n=R?window.innerHeight:"100vh";
u.current.open=c;
let a=w.ZP.timeline();
null==m||null===(e=m.current)||void 0===e||e.pause(),
eS.pause(),
e_.pause();
let i=u.current.y,
o=document.querySelector(".footer");
return c?(w.ZP.set("#page-wrapper",
{
position:"fixed",
left:0,
right:0,
top:-t
}),
w.ZP.set(l.current,
{
height:n,
overflow:"hidden"
}),
w.ZP.set(r.current,
{
position:"static"
}),
w.ZP.set(o,
{
display:"none"
})):(w.ZP.set(l.current,
{
position:"fixed",
left:0,
right:0,
height:n,
overflow:"hidden"
}),
w.ZP.set(r.current,
{
position:"absolute",
left:0,
right:0,
top:-t
})),
a.to(l.current,
{
y:c?0:n,
duration:c?1.2:.6,
ease:"expo.inOut",
onComplete:()=>{
var e,
t;
c?(w.ZP.set(l.current,
{
position:"relative",
height:"auto",
overflowY:"auto",
overflowX:"hidden"
}),
w.ZP.set(r.current,
{
position:"static"
}),
eS.resume(),
null==m||null===(e=m.current)||void 0===e||e.resume(),
ep().refresh()):(w.ZP.set("#page-wrapper",
{
position:"static"
}),
window.scrollTo(0,
i),
null==m||null===(t=m.current)||void 0===t||t.setScroll(i),
ej()(()=>{
var e;
e_.resume(),
null==m||null===(e=m.current)||void 0===e||e.resume(),
ep().refresh(),
w.ZP.set(o,
{
display:"flex"
})
},
300)),
c||s(void 0)
}
}),
c&&(u.current.y=t),
()=>{
a.kill()
}
},
[c]),
(0,
i.useEffect)(()=>{
if("errorPage"!==t._type&&!c){
let e=ee(t);
e!==p.asPath&&p.push("".concat(e).concat(window.location.search),
null,
{
shallow:!0,
scroll:!1
})
}
},
[c]);
let h=(0,
i.useCallback)(()=>{
c&&d(!1)
},
[c]);
return F(h),
(0,
n.jsx)(e0,
{
open:c,
children:(0,
n.jsx)("div",
{
id:"dialog",
className:"dialog fixed left-0 right-0 top-0 translate-y-static-screen z-dialog",
ref:l,
children:(0,
n.jsx)("div",
{
ref:r,
children:(0,
n.jsx)(eK,
{
contentAtom:ez
})
})
})
})
}function e2(){
let e=eQ();
return(0,
i.useCallback)(()=>document.getElementById(e?eS.id:e_.id),
[e])
}function e3(e,
t){
let l=(0,
a.b9)(lo),
r=e2();
q(()=>{
if(!e||void 0===t)return;
let n=w.ZP.timeline({
scrollTrigger:{
scroller:r(),
trigger:e.current,
start:()=>"top 40px",
end:()=>"bottom top",
scrub:!1,
invalidateOnRefresh:!0,
onEnter:()=>{
l(t)
},
onEnterBack:()=>{
l(t)
}
}
});
return()=>n.revert()
},
[l,
e,
t])
}let e6=(0,
i.forwardRef)((e,
t)=>{
let{
className:l,
children:r,
data:a
}=e,
o=(0,
i.useRef)(),
c=t||o,
{
backgroundColor:d,
foregroundColor:u
}=(0,
i.useMemo)(()=>{
let e=(null==a?void 0:a.color)||ev().white,
t=function(e){
switch(e){
case"light":return ev().white;
case"dark":return ev().black;
default:return null
}
}(null==a?void 0:a.textColor),
l=t||((0,
eg.DP)(e)?ev().white:ev().black);
return{
backgroundColor:e,
foregroundColor:l
}
},
[a]);
return e3(c,
null!=a&&!!a.color&&"#ffffff"===u),
(0,
n.jsx)("div",
{
className:(0,
s.Z)("bg-background text-foreground color-changer",
l),
style:{
"--background":d,
"--foreground":u
},
ref:c,
children:r
})
}),
e5=(0,
i.createContext)(void 0),
e4=(0,
i.forwardRef)((e,
t)=>{
let{
children:l,
className:r,
baseColor:o="#FFF",
updateMenuTextLight:c=!1
}=e,
d=(0,
i.useRef)(),
u=t||d,
[m,
p]=(0,
i.useState)(o),
h=(0,
a.b9)(lo);
return q(()=>{
let e=(0,
eg.GR)(m);
w.p8.set(u.current,
{
"--background":m,
"--foreground":e
}),
c&&h((0,
eg.DP)(m))
},
[m,
u,
h,
c]),
e3(u,
c?(0,
eg.DP)(m):void 0),
z(()=>{
let e=(0,
eg.GR)(m);
w.p8.to(u.current,
{
"--background":m,
"--foreground":e,
duration:.5,
ease:"expo.out"
}),
c&&h((0,
eg.DP)(m))
},
[m]),
(0,
n.jsx)(e5.Provider,
{
value:{
rootRef:u,
baseColor:o,
setBackgroundColor:p
},
children:(0,
n.jsx)("div",
{
ref:u,
className:(0,
s.Z)(r,
"bg-background text-foreground background-color-provider"),
children:l
})
})
});
var e8=l(5317);
let e7={
ease:e8.bJ.easeNone,
duration:.5,
autoAlpha:!0,
stagger:0,
disablePointerEvents:!1
},
e9={
...e7,
to:0
};
function te(e){
let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{

},
{
autoAlpha:l,
to:r,
ease:n,
duration:s,
clearProps:a,
stagger:i,
onStart:o,
disablePointerEvents:c
}={
...e9,
...t
},
d={

};
return c&&(d={
pointerEvents:"none"
}),
w.ZP.to(e,
{
stagger:i,
duration:s,
ease:n,
...d,
[l?"autoAlpha":"opacity"]:r,
clearProps:a||"",
onStart:o
})
}({
...e7
});
let tt=()=>{
let[e,
t]=(0,
i.useState)(!1),
l=(0,
i.useMemo)(()=>({
onMouseEnter:R?null:()=>t(!0),
onMouseLeave:R?null:()=>t(!1)
}),
[t]);
return{
eventListeners:l,
hovering:e
}
},
tl=e=>{
let{
onMouseEnter:t,
onMouseLeave:l
}=e,
r=(0,
i.useMemo)(()=>({
onMouseEnter:R?null:t,
onMouseLeave:R?null:l
}),
[t,
l]);
return{
eventListeners:r
}
};
var tr=l(9008),
tn=l.n(tr);
function ts(){
for(var e=arguments.length,
t=Array(e),
l=0;
l<e;
l++)t[l]=arguments[l];
return(0,
i.useCallback)(e=>{
t.forEach(t=>{
"function"==typeof t?t(e):t&&(t.current=e)
})
},
t)
}let ta=(0,
i.forwardRef)((e,
t)=>{
let{
preload:l,
children:r,
...s
}=e,
a=(0,
i.useRef)();
function o(e){
w.ZP.to(e,
{
opacity:1,
duration:.5,
ease:"power2.inOut"
})
}return(0,
i.useEffect)(()=>{
if(l)return;
let e=a.current.querySelector("img");
e&&((null==e?void 0:e.complete)?o(e):e.onload=()=>o(e))
},
[l]),
(0,
n.jsx)("div",
{
...s,
ref:ts(a,
t),
children:r
})
});
var ti=l(6803),
to=l.n(ti);
let tc=/^image-([a-f\d]+)-(\d+x\d+)-(\w+)$/,
td=e=>{
try{
let[,
t,
l,
r]=tc.exec(e),
[n,
s]=l.split("x").map(e=>parseInt(e,
10));
return{
assetId:t,
dimensions:{
width:n,
height:s
},
format:r
}
}catch(t){
throw Error('Could not parse image ID "'.concat(e,
'"'))
}
},
tu=e=>{
if(!e)return;
let{
width:t,
height:l
}=tm(e);
return t/l
},
tm=e=>{
let{
asset:t,
crop:l
}=e,
r=td(t._id||t._ref),
n=Q()(t,
["metadata",
"dimensions",
"width"])||r.dimensions.width,
s=Q()(t,
["metadata",
"dimensions",
"height"])||r.dimensions.height,
a=0,
i=0;
return l&&(a=Math.round(l.top*s),
i=Math.round(l.left*n),
n=Math.round(n*(1-(l.right+l.left))),
s=Math.round(s*(1-(l.top+l.bottom)))),
{
top:a,
left:i,
width:n,
height:s
}
},
tp=to()(null).projectId("68lp9qid").dataset("production"),
th=(e,
t,
l,
r)=>{
let n=Q()(e,
["metadata",
"dimensions",
"aspectRatio"]),
s=r||n;
return{
width:l,
needsCrop:!t&&s&&s!==n,
aspect:s
}
},
tf=(e,
t)=>{
if(!t)return e;
let l=new URL(e);
return l.pathname="".concat(l.pathname,
"/").concat(t),
l.toString()
},
tx=[320,
420,
640,
1024],
tv=[320,
420,
640,
1024,
1200,
1600,
1920,
2560,
3200,
7680];
function tg(e,
t){
let l=arguments.length>2&&void 0!==arguments[2]?arguments[2]:tv;
if(!e||!e.asset)return;
let{
asset:r
}=e,
n=td(r._id||r._ref),
s="svg"===n.format,
a=Q()(r,
["metadata",
"hasAlpha"]),
i=Q()(r,
["metadata",
"isOpaque"]),
o=Q()(r,
["metadata",
"palette"]),
c=[],
{
width:d,
height:u,
top:m,
left:p
}=tm(e),
h=tu(e),
f={
sourceAspect:h,
hasAlpha:a,
opaque:i,
vector:s,
palette:o,
sizes:c
},
x=l;
l[0]>d&&(x=[d]);
let v=x.map(e=>({
...th(r,
s,
e,
t||h)
}));
if(e.alt&&(f.alt=e.alt),
e.caption&&(f.title=e.caption),
e.attribution&&(f.credit=e.attribution),
e.hotspot){
let{
_type:t,
...l
}=e.hotspot;
f.hotspot={
type:t,
...l
}
}if(e.crop){
let{
_type:t,
...l
}=e.crop;
f.crop={
type:t,
...l
}
}if(s)c.push({
width:d,
height:u,
url:tf(tp.image(e.asset).url(),
e.asset.originalFilename)
});
else{
let t=tp.image(e.asset);
N()(v,
l=>{
let{
needsCrop:r,
aspect:n,
width:s
}=l;
if(s<=d){
e.crop&&(t=t.rect(p,
m,
d,
u)),
r&&(t=e.hotspot?t.fit("crop").crop("focalpoint").focalPoint(e.hotspot.x,
e.hotspot.y):t.fit("min"));
let l=t.width(s);
l=(l=l.height(Math.round(s/n))).auto("format");
let a={
width:s,
height:Math.round(s/n),
url:tf(l.url(),
e.asset.originalFilename)
};
c.push(a)
}
})
}return f
}let tw=(e,
t)=>e?t?"".concat((e.x-t.left)/(1-(t.left+t.right))*100,
"% ").concat((e.y-t.top)/(1-(t.top+t.bottom))*100,
"%"):"".concat(100*e.x,
"% ").concat(100*e.y,
"%"):"50% 50%",
tb=e=>{
let{
media:t,
srcSet:l,
sizes:r
}=e;
return(0,
n.jsx)("source",
{
media:t,
srcSet:l.map(e=>"".concat(e.url,
" ").concat(e.width,
"w")).join(),
sizes:r,
suppressHydrationWarning:!0
})
},
tj=(0,
i.forwardRef)((e,
t)=>{
let{
pictureClassName:l,
style:r,
className:s,
alt:a,
fallbackAlt:i,
srcSet:o,
mobileSrcSet:c,
preload:u,
imageSizes:m,
onLoad:p
}=e,
h=null==o?void 0:o.map(e=>"".concat(e.url,
" ").concat(e.width,
"w")).join(),
f=null==c?void 0:c.map(e=>"".concat(e.url,
" ").concat(e.width,
"w")).join();
return(0,
n.jsxs)("picture",
{
className:l,
children:[c&&o&&(0,
n.jsxs)(n.Fragment,
{
children:[(0,
n.jsx)(tb,
{
srcSet:c,
sizes:m,
media:"(max-width: ".concat(d().md-1,
"px)"),
lazy:!u
}),
(0,
n.jsx)(tb,
{
srcSet:o,
sizes:m,
media:"(min-width: ".concat(d().md,
"px)"),
lazy:!u
})]
}),
!c&&o&&(0,
n.jsx)(tb,
{
srcSet:o,
lazy:!u,
sizes:m
}),
(0,
n.jsx)("img",
{
ref:t,
sizes:m,
alt:a||i,
src:null==o?void 0:o[0].url,
loading:u?"eager":"lazy",
onLoad:p,
className:s,
style:r
}),
u&&(0,
n.jsxs)(tn(),
{
children:[c&&o&&(0,
n.jsxs)(n.Fragment,
{
children:[(0,
n.jsx)("link",
{
rel:"preload",
as:"image",
href:null==c?void 0:c[0].url,
imageSrcSet:f,
imageSizes:m,
media:"(max-width: ".concat(d().md-1,
"px)")
}),
(0,
n.jsx)("link",
{
rel:"preload",
as:"image",
href:o[0].url,
imageSrcSet:h,
imageSizes:m,
media:"(min-width: ".concat(d().md,
"px)")
})]
}),
!c&&o&&(0,
n.jsx)("link",
{
rel:"preload",
as:"image",
href:o[0].url,
imageSrcSet:h,
imageSizes:m
})]
})]
})
});
tj.displayName="Picture";
let ty=(0,
i.forwardRef)((e,
t)=>{
let{
className:l,
imageClassName:r,
aspect:a,
mobileAspect:o,
contain:c,
children:d,
image:u,
fallbackAlt:m,
mobileImage:p,
preload:h=!1,
showPreview:f=!0,
style:x,
imageSizes:v,
objectPosition:g,
widths:w=tv,
position:b="relative",
parallax:j=!1
}=e,
y=(0,
i.useMemo)(()=>tg(u,
!c&&a,
w),
[u,
c,
a]),
N=(0,
i.useMemo)(()=>p||o?tg(p||u,
!c&&o,
tx):null,
[p,
o,
u,
c]),
{
hotspot:k,
crop:C
}={
hotspot:Q()(u,
["hotspot"]),
crop:Q()(u,
["crop"])
},
Z=Q()(u,
["asset",
"metadata",
"palette",
"dominant",
"background"]),
R=Q()(y,
["sizes"]),
S=Q()(N,
["sizes"]),
_=Q()(u,
["alt"])||Q()(u,
["originalFilename"]),
L=o||Q()(N,
["sourceAspect"]),
M=a||(null==y?void 0:y.sourceAspect),
T=(0,
i.useMemo)(()=>({
...f&&Z?{
backgroundColor:Z
}:{

},
...x||{

}
}),
[x,
Z,
f]);
return(0,
n.jsxs)(ta,
{
className:(0,
s.Z)(l,
b,
"res-image w-full block overflow-hidden"),
ref:t,
style:T,
preload:h,
children:[!L&&(0,
n.jsx)("div",
{
style:{
paddingTop:"".concat(100/M,
"%")
}
}),
L&&(0,
n.jsxs)(n.Fragment,
{
children:[(0,
n.jsx)("div",
{
className:"block md:hidden",
style:{
paddingTop:"".concat(100/M,
"%")
}
}),
(0,
n.jsx)("div",
{
className:"hidden md:block",
style:{
paddingTop:"".concat(100/L,
"%")
}
})]
}),
!u&&(0,
n.jsx)("div",
{
className:(0,
s.Z)(r,
"absolute w-full h-full inset-0 bg-borderColor")
}),
u&&(0,
n.jsx)(tj,
{
className:(0,
s.Z)(r,
!h&&"opacity-0",
"absolute w-full h-full inset-0",
c?"object-contain":"object-cover",
j&&"scale-110"),
alt:_,
fallbackAlt:m,
srcSet:R,
mobileSrcSet:S,
preload:h,
imageSizes:v,
style:{
objectPosition:g||tw(k,
C)
}
}),
d]
})
});
ty.displayName="ResponsiveImage";
let tN=(0,
i.forwardRef)((e,
t)=>{
let{
as:l="section",
grid:r=!1,
noGutter:a,
noBottomMargin:i,
className:o,
width:c="w-auto",
...d
}=e,
u=(0,
s.Z)(c,
!i&&"mb-20 md:mb-16",
r&&tk,
!a&&"px-8 md:px-6 mx-auto");
return(0,
n.jsx)(l,
{
ref:t,
className:(0,
s.Z)(u,
o),
...d
})
}),
tk="grid grid-cols-12 md:grid-cols-4 gap-8";
function tC(e,
t){
let l=function(){
let e=eQ();
return(0,
i.useCallback)(()=>Math.floor(e?eS.scrollTop():e_.scrollTop()),
[e])
}(),
r=(0,
i.useContext)(eC);
(0,
i.useEffect)(()=>{
if(null==r?void 0:r.current){
let t=null==r?void 0:r.current,
n=()=>{
e({
scroll:l()
})
};
return t.scrollListeners.push(n),
()=>{
t.scrollListeners=t.scrollListeners.filter(e=>e!==n)
}
}
},
[e]),
(0,
i.useEffect)(()=>{
(null==r?void 0:r.current)&&t&&e(r.current.lenis)
},
[t,
e,
r])
}let tZ=(0,
i.forwardRef)((e,
t)=>{
let{
className:l,
dotStyle:r,
children:a,
truncate:o=!0,
firstRow:c=!1,
videoTag:d=!1
}=e,
[u,
m]=Y(),
[p,
h]=(0,
i.useState)(!1);
return tC(e=>{
c&&e&&e.scroll>20&&h(!0)
}),
(0,
n.jsx)("div",
{
className:l,
ref:t,
children:(0,
n.jsxs)(E,
{
className:(0,
s.Z)(c&&!p&&"opacity-0",
p&&"opacity-100",
"inline-flex relative self-start transition-opacity duration-[2000ms] ease-out-expo max-w-full",
o&&"items-center whitespace-pre",
!o&&"items-start"),
as:"div",
children:[d?(0,
n.jsx)("svg",
{
className:"absolute w-[0.8em] h-[0.8em] mt-[-0.1em] pointer-events-none [&_path]:fill-current",
width:"6",
height:"8",
viewBox:"0 0 6 8",
fill:"none",
xmlns:"http://www.w3.org/2000/svg",
children:(0,
n.jsx)("path",
{
d:"M6 4.00023L1.73996e-07 7.46434L4.76837e-07 0.536133L6 4.00023Z"
})
}):(0,
n.jsx)("div",
{
className:(0,
s.Z)("absolute w-[0.8em] h-[0.8em] bg-current mt-[-0.1em] pointer-events-none transition-colors",
!o&&"top-[0.2em]"),
style:r
}),
(0,
n.jsx)("span",
{
className:(0,
s.Z)("pl-[1.8rem]",
o&&"truncate",
!o&&"block"),
onMouseOver:u,
onMouseLeave:m,
children:a
})]
})
})
}),
tR={
h0:"text-[16rem] md:text-[5.2rem] tracking-[-0.02em] leading-[0.88] md:leading-[1] font-bold",
h1:"text-[9.6rem] md:text-[4.4rem] tracking-[-0.02em] leading-[1em] md:leading-[1] font-bold",
h2:"text-[6.26rem] md:text-[3.6rem] tracking-[-0.02em] leading-[1] font-bold",
h3:"text-[6.4rem] md:text-[2.4rem] leading-[1] font-bold",
h4:"text-[3.6rem] md:text-[2.4rem] leading-[1] font-bold",
h5:"text-[2.4rem] font-bold leading-[1]",
h6:"text-[2.4rem] md:text-[2rem] font-bold leading-[1]",
title24:"text-[2.4rem] leading-[1] font-bold md:text-[1.6rem] md:leading-[1.2]",
title32:"text-[3.2rem] leading-[1] font-bold",
title36:"text-[3.6rem] leading-[1] font-bold",
title52:"text-[5.2rem] md:text-[3.6rem] tracking-[-0.02em] leading-[1] font-bold",
title72:"text-[7.2rem] md:text-[3.2rem] tracking-[-0.02em] leading-[1] font-bold",
title96:"text-[9.6rem] md:text-[4.2rem] tracking-[-0.02em] leading-[1] font-bold",
title160:"text-[16rem] md:text-[5.2rem] lg:text-[10.2vw] tracking-[-0.02em] leading-[0.88] lg:leading-[1] font-bold"
},
tS={
title36:"md:!text-[3.6rem] md:!leading-[1] md:!font-bold",
title32:"md:!text-[3.2rem] md:!leading-[1] md:!font-bold",
title24:"md:!text-[2.4rem] md:!font-bold",
title20:"md:!text-[2.0rem] md:!font-bold",
title16:"md:!text-[1.6rem] md:!leading-[1.2] md:!font-bold"
},
t_=(0,
i.forwardRef)((e,
t)=>{
let{
as:l="h1",
tagStyle:r,
mdTagStyle:a,
className:i,
...o
}=e,
c=l;
return"h0"===l&&(c="h1"),
(0,
n.jsx)(c,
{
ref:t,
className:(0,
s.Z)(i,
"font-body ",
tR[r||l],
tS[a]),
...o
})
});
function tL(e,
t){
let{
imageRef:l
}=t;
(null==l?void 0:l.current)&&e.fromTo(l.current,
{
scale:1.05
},
{
scale:1,
duration:.35,
ease:"Power3.easeInOut"
},
0)
}let tM=(0,
i.forwardRef)((e,
t)=>{
let{
articles:l,
showPageType:r,
className:a
}=e,
o=(0,
i.useRef)(),
[c,
d]=(0,
i.useState)(-1),
{
setBackgroundColor:u,
baseColor:m
}=(0,
i.useContext)(e5),
p=(0,
i.useCallback)(e=>{
var t;
let r=(null===(t=l[e])||void 0===t?void 0:t.pageTheme)||m;
u(r),
d(e)
},
[l,
m,
u]),
h=(0,
i.useCallback)(()=>{
u(m),
d(-1)
},
[m,
u]);
return(0,
n.jsx)("div",
{
ref:t||o,
className:(0,
s.Z)(a),
children:l.map((e,
t)=>(0,
n.jsx)(tT,
{
showPageType:r,
isInactive:-1!==c&&c!==t,
data:e,
onMouseEnter:()=>p(t),
onMouseLeave:()=>h()
},
e._id))
})
}),
tT=(0,
i.forwardRef)((e,
t)=>{
let{
data:l,
className:r,
isInactive:o,
showPageType:c
}=e,
u=(0,
i.useRef)(),
{
title:m,
pageType:p,
category:h
}=l||{

},
f=!c&&(null==h?void 0:h.title)?null==h?void 0:h.title:p.replace("_",
" "),
x=(0,
i.useRef)(),
v=(0,
i.useRef)(),
g=t||u;
x.current=W(tL,
{
imageRef:v
},
R);
let[w,
b]=(0,
i.useState)(),
{
eventListeners:j
}=tl({
onMouseEnter:()=>{
var e;
b(!0),
null==x||null===(e=x.current)||void 0===e||e.play()
},
onMouseLeave:()=>{
var e;
b(!1),
null==x||null===(e=x.current)||void 0===e||e.reverse()
}
});
z(()=>{
o?te(g.current,
{
to:.15,
duration:.2
}):te(g.current,
{
to:1,
duration:.2
})
},
[o]);
let y=(null==l?void 0:l.featuredImage)||(null==l?void 0:l.image),
N=(0,
a.b9)(tW),
k=(0,
i.useCallback)(()=>{
N(!1)
},
[N]);
return(0,
n.jsx)(en,
{
ref:g,
link:l,
showText:!1,
...j,
onClick:k,
className:(0,
s.Z)("block article-list-item border-solid border-t pt-4 pb-6 border-current",
r),
children:(0,
n.jsxs)(tN,
{
as:"div",
grid:!0,
noBottomMargin:!0,
noGutter:!0,
className:(0,
s.Z)("md:gap-x-0"),
children:[(0,
n.jsxs)("div",
{
className:(0,
s.Z)("col-start-1 row-start-1 grid grid-cols-12 gap-x-8 col-span-12",
"md:col-span-8 md:flex md:flex-col-reverse md:justify-end md:w-full md:overflow-hidden"),
children:[(0,
n.jsx)(t_,
{
className:(0,
s.Z)("col-span-4 md:col-span-3 font-bold",
"lg:col-span-6"),
as:"h3",
tagStyle:"title32",
mdTagStyle:"title16",
children:m
}),
f&&(0,
n.jsx)(tZ,
{
className:(0,
s.Z)("col-start-7 col-span-2",
"md:mb-2",
"lg:col-start-8"),
dotStyle:{
color:w&&h?h.pageTheme:null
},
children:f
})]
}),
(0,
n.jsx)("div",
{
className:(0,
s.Z)("row-start-1 md:col-span-4 col-span-2 relative overflow-hidden col-end-13",
"md:ml-6 md:w-[12rem] md:shrink-0"),
children:y&&(0,
n.jsx)(ty,
{
ref:v,
image:y,
aspect:217/211,
mobileAspect:1,
contain:!1,
imageSizes:"(max-width: ".concat(d().md,
") 33vw,
 8rem")
})
})]
})
})
}),
tE=(0,
o.cn)(null);
function tP(){
return(0,
a.Dv)(tE)
}function tz(e){
let{
loading:t,
className:l,
...r
}=e,
{
loadMoreTitle:a
}=tP(),
o=(0,
i.useRef)({
tl:null,
isHovering:!1,
isLoading:!1
}),
c=(0,
i.useRef)(),
d=()=>{
o.current.tl.play(),
1===o.current.tl.progress()&&o.current.tl.restart()
};
return z(()=>{
o.current.isLoading=t,
t&&d(),
t||ep().refresh()
},
[t]),
(0,
i.useEffect)(()=>{
o.current.tl&&o.current.tl.kill();
let e=w.p8.timeline({
paused:!0,
onComplete:()=>{
(o.current.isHovering||o.current.isLoading)&&o.current.tl.restart()
}
});
return e.fromTo(c.current.children[0],
{
scale:1
},
{
scale:0,
duration:.3,
ease:"sine.inOut"
}),
e.to(c.current.children,
{
x:"-=1.4rem",
duration:1,
ease:"power3.out"
},
0),
e.fromTo(c.current.children[c.current.children.length-1],
{
scale:0
},
{
scale:1,
duration:.3,
ease:"sine.inOut"
},
0),
o.current.tl=e,
()=>e.revert()
},
[]),
(0,
n.jsxs)("button",
{
className:(0,
s.Z)("loadmore-btn relative -mx-8 md:-mx-6 bg-transparent transition-colors duration-300 ease-out-expo bg-yellow text-black w-screen flex flex-col gap-[16rem] p-8",
l),
onMouseEnter:()=>{
o.current.isHovering=!0,
d()
},
onMouseLeave:()=>{
o.current.isHovering=!1
},
...r,
children:[(0,
n.jsx)(t_,
{
tagStyle:"title32",
mdTagStyle:"title24",
as:"div",
children:a
}),
(0,
n.jsxs)("div",
{
className:"w-full flex justify-between",
children:[(0,
n.jsx)(K,
{
rounded:!1,
as:"div",
invert:!0,
className:"bg-transparent",
children:t?"Loading...":"Load More"
}),
(0,
n.jsxs)("div",
{
className:"flex gap-[0.5rem] self-end relative",
ref:c,
children:[(0,
n.jsx)("span",
{
className:"block w-[0.8rem] h-[0.8rem] bg-current"
}),
(0,
n.jsx)("span",
{
className:"block w-[0.8rem] h-[0.8rem] bg-current"
}),
(0,
n.jsx)("span",
{
className:"block w-[0.8rem] h-[0.8rem] bg-current"
}),
(0,
n.jsx)("span",
{
className:"block w-[0.8rem] h-[0.8rem] bg-current absolute right-[-1.3rem]"
})]
})]
})]
})
}function tB(e,
t){
let{
rootRef:l,
instructionTextRef:r
}=t;
(null==l?void 0:l.current)&&(e.set(l.current,
{
autoAlpha:1
}),
null==e||e.fromTo(l.current,
{
y:"100%"
},
{
y:0,
duration:.6,
ease:"expo.out",
onComplete:()=>{
var e;
let t=null==l?void 0:null===(e=l.current)||void 0===e?void 0:e.querySelector("input");
null==t||t.focus(),
null==t||t.click()
}
})),
(null==r?void 0:r.current)&&(null==e||e.fromTo(r.current,
{
y:20,
opacity:0
},
{
y:0,
opacity:1,
duration:.6,
ease:"expo.out"
},
"-=0.1"))
}function tA(e,
t){
let{
rootRef:l
}=t;
(null==l?void 0:l.current)&&(null==e||e.to(l.current,
{
y:"105%",
duration:.6,
ease:"expo.out"
}),
e.set(l.current,
{
autoAlpha:0
}))
}function tH(e){
let{
searchOpenAtom:t,
isInPerspective:l=!1,
baseColor:r=ev().white
}=e,
o=(0,
i.useRef)(),
c=(0,
i.useRef)(),
d=(0,
i.useRef)(),
u=(0,
i.useRef)(),
m=(0,
i.useRef)(),
p=(0,
i.useRef)(),
h=(0,
i.useRef)(),
f=(0,
i.useRef)(),
x=(0,
i.useRef)(),
v=(0,
i.useRef)(),
[w,
b]=(0,
a.KO)(t),
j=(0,
a.b9)(eZ),
y=g();
o.current=W(tB,
{
rootRef:p,
instructionTextRef:d
}),
c.current=W(tA,
{
rootRef:p
});
let N=(0,
i.useCallback)(()=>{
b(e=>!e)
},
[b]);
z(()=>{
var e,
t,
l,
r,
n;
w?(y||null==h||null===(e=h.current)||void 0===e||e.focus(),
j(!0),
null==c||null===(t=c.current)||void 0===t||t.kill(),
null==o||null===(l=o.current)||void 0===l||l.restart()):(j(!1),
null==o||null===(r=o.current)||void 0===r||r.kill(),
null==c||null===(n=c.current)||void 0===n||n.restart().then(()=>{
Z()
}))
},
[w]),
(0,
i.useEffect)(()=>{
var e;
let t=null==u?void 0:null===(e=u.current)||void 0===e?void 0:e.offsetHeight,
l=ep().create({
trigger:f.current,
pin:f.current,
scroller:m.current,
start:"top ".concat(t-1,
"px"),
end:"max",
pinSpacing:!1,
pinType:"fixed"
});
return()=>{
null==l||l.kill()
}
},
[y]),
F(b);
let[k,
C]=function(){
let e=(0,
a.b9)(t$),
[t,
l]=(0,
a.KO)(tG),
r=(0,
i.useCallback)(ec()(t=>e(t),
200,
{
leading:!1,
trailing:!0
}),
[]),
n=(0,
i.useCallback)(e=>{
l(e.target.value),
r(e.target.value)
},
[l,
r]);
return[t,
n]
}(),
Z=t3(),
R=(0,
a.Dv)(tX),
S=(0,
a.Dv)(tU),
_=null==S?void 0:S.hits,
L=null==S?void 0:S.nbHits,
M=L<=0,
[T,
P]=function(){
let e=(0,
a.Dv)(t$),
t=(0,
a.Dv)(tU),
l=(0,
a.Dv)(tX),
r=(0,
a.b9)(t0),
{
hits:n,
nbPages:s,
page:o
}=t||{

},
c=eu()(n)&&!!t.query,
d=e===t.query||!e&&!t.query,
u=o<s-1&&!c&&d,
m=(0,
i.useCallback)(()=>{
u&&!l&&r(o+1)
},
[u,
l]);
return[u,
m]
}(),
B=eu()(_)&&!!S.query;
(0,
i.useEffect)(()=>{
ef()(()=>ep().refresh())
},
[S]);
let A=(0,
i.useCallback)(e=>{
e.preventDefault()
},
[]);
return(0,
n.jsx)(e4,
{
baseColor:r,
ref:p,
className:(0,
s.Z)("search-overlay fixed inset-0 z-overlay overflow-hidden translate-y-full invisible"),
children:(0,
n.jsxs)("div",
{
ref:v,
className:"h-full absolute inset-0",
children:[(0,
n.jsx)("div",
{
ref:m,
className:"overflow-auto h-full absolute inset-0",
children:(0,
n.jsx)("div",
{
"data-lenis-prevent":!0,
children:(0,
n.jsx)("div",
{
className:"scroll-content",
children:(0,
n.jsxs)(tN,
{
className:"pt-[36rem] md:pt-[18rem]",
children:[(0,
n.jsxs)(tN,
{
ref:f,
grid:!0,
noGutter:!0,
noBottomMargin:!0,
className:"items-center py-4 bg-background relative z-1 md:flex md:flex-col-reverse md:items-start",
children:[(0,
n.jsx)(tV,
{
hits:_,
input:k,
noResults:M,
isInPerspective:l
}),
k&&!M&&(0,
n.jsxs)(E,
{
className:"col-end-13 col-span-3 text-right whitespace-nowrap",
children:[L,
" Results found"]
})]
}),
B&&(0,
n.jsx)(t_,
{
className:"mt-16",
as:"div",
tagStyle:"h2",
children:"No results found,
 please adjust filters or search term"
}),
_&&(0,
n.jsx)(tM,
{
articles:_,
showPageType:!1,
className:""
}),
T&&(0,
n.jsx)(tz,
{
onClick:P,
loading:R
})]
})
})
})
}),
(0,
n.jsx)("div",
{
ref:u,
className:"header absolute top-0 left-0 w-screen-without-scrollbar bg-background z-1",
children:(0,
n.jsxs)("div",
{
className:"relative px-8 pt-8 md:px-6",
children:[(0,
n.jsx)(tZ,
{
className:"",
children:k?"Search":"Type to begin searching"
}),
(0,
n.jsx)("form",
{
className:(0,
s.Z)("w-full"),
onSubmit:A,
children:(0,
n.jsxs)("div",
{
className:(0,
s.Z)("w-full relative border-b"),
children:[(0,
n.jsx)("label",
{
htmlFor:l?"search-perspective":"search",
className:"sr-only",
children:"Search"
}),
(0,
n.jsx)("input",
{
ref:h,
type:"text",
id:l?"search-perspective":"search",
value:k,
spellCheck:"false",
autoComplete:"off",
onChange:C,
className:(0,
s.Z)("font-bold w-full text-[7.2rem] h-[8.2rem] bg-background placeholder-foreground !outline-none",
"md:text-[3.6rem] md:h-[5.2rem]")
}),
(0,
n.jsx)("button",
{
type:"button",
onClick:Z,
className:"absolute right-0 bottom-6 hover:opacity-50 md:hidden",
children:(0,
n.jsx)(E,
{
children:"Clear"
})
})]
})
})]
})
}),
R&&(0,
n.jsx)(E,
{
className:"absolute bottom-8 right-8",
children:"Loading..."
}),
(0,
n.jsx)(U,
{
ref:x,
invertTheme:!0,
className:"expand-hitbox z-1 absolute top-[1.3rem] md:top-[1.9rem] right-[calc(2rem+var(--scrollbarWidth))]",
onClick:N,
"aria-label":"close",
rounded:!1,
border:!1,
children:"Close"
})]
})
})
}let tO=[{
slug:"article",
title:"Article"
},
{
slug:"video",
title:"Video"
},
{
slug:"podcast",
title:"Podcast"
}],
tD=[{
slug:"in_perspective",
title:"In Perspective"
}];
function tV(e){
let{
hits:t,
input:l,
noResults:r,
isInPerspective:o
}=e,
[c,
d]=(0,
a.KO)(t2),
u=o?tD:tO,
m=(0,
i.useCallback)(e=>{
if(!o){
if(c.find(t=>t.slug===e.slug)){
let t=[...c].filter(t=>t.slug!==e.slug);
d(t);
return
}d([...c,
e])
}
},
[o,
c,
d]);
return l&&!r&&t?(0,
n.jsx)("div",
{
className:"flex",
children:null==u?void 0:u.map(e=>(0,
n.jsx)(U,
{
as:"button",
className:(0,
s.Z)("whitespace-pre mr-2",
(!!(null==c?void 0:c.find(t=>t.slug===e.slug))||o)&&"bg-foreground text-background"),
rounded:!1,
"aria-label":e.title,
onClick:()=>m(e),
invert:!0,
children:e.title
},
e.slug))
}):null
}let tI={
hits:[],
nbHits:0,
query:""
},
tF=ei()("TWBJY8BFBI",
"6171bbe6ec932aebf6df2177bb70f5e9"),
tq=async(e,
t,
l,
r)=>{
let n=tF.initIndex("prod_swaddle"),
s=r.map(e=>"article"===e.slug?'pageType:"article" OR pageType:"feature_article"':"podcast"===e.slug?'pageType:"podcast" OR pageType:"podcast_series"':'pageType:"'.concat(e.slug,
'"')).join(" OR "),
a=r.find(e=>"in_perspective"===e.slug),
i=s.length>0?"AND (".concat(s,
")"):"",
o={
page:t,
hitsPerPage:l,
optionalWords:e,
filters:"NOT status:draft ".concat(i,
" ").concat(a?"":'AND NOT pageType:"in_perspective"')
};
return await n.search(e,
o)
},
tW=(0,
o.cn)(!1),
tY=(0,
o.cn)(!1),
tG=(0,
o.cn)(""),
tK=(0,
o.cn)(10),
tU=(0,
o.cn)(tI),
tX=(0,
o.cn)(!1),
tJ=(0,
o.cn)(""),
t$=(0,
o.cn)(e=>e(tJ),
async(e,
t,
l)=>{
t(tX,
!0),
t(tJ,
l),
t(tQ,
0);
let r=e(tK),
n=e(tY),
s=n?tD:e(t2);
try{
if(l){
let e=await tq(l,
0,
r,
s);
t(tU,
e)
}else t(tU,
tI)
}finally{
t(tX,
!1)
}
}),
tQ=(0,
o.cn)(0),
t0=(0,
o.cn)(e=>e(tQ),
async(e,
t,
l)=>{
let r=e(tX);
if(r)return;
t(tX,
!0),
t(tQ,
l);
let n=e(tK),
s=e(t$),
a=e(tU),
i=e(tY),
o=i?tD:e(t2);
try{
let e=await tq(s,
l,
n,
o);
t(tU,
{
...e,
hits:[...a.hits,
...e.hits]
})
}finally{
t(tX,
!1)
}
}),
t1=(0,
o.cn)([]),
t2=(0,
o.cn)(e=>e(t1),
async(e,
t,
l)=>{
let r=e(tX);
if(r)return;
t(tX,
!0),
t(t1,
l),
t(t0,
0),
t(tK,
10);
let n=e(t$);
try{
if(""===n){
t(tX,
!1);
return
}let e=await tq(n,
0,
10,
l);
t(tU,
{
...e,
hits:[...e.hits]
})
}finally{
t(tX,
!1)
}
}),
t3=()=>{
let e=(0,
a.b9)(tG),
t=(0,
a.b9)(t$),
l=(0,
a.b9)(t2);
return(0,
i.useCallback)(()=>{
e(""),
t(""),
l([])
},
[])
};
var t6=l(9752),
t5=l.n(t6);
let t4=e=>{
let{
condition:t,
wrapper:l,
wrapperProps:r={

},
children:s
}=e;
return t?(0,
n.jsx)(l,
{
...r,
children:s
}):s
},
t8=(0,
i.forwardRef)((e,
t)=>{
let{
themeClassName:l="text-white bg-black",
className:r="fixed inset-0 z-menu -translate-y-full overscroll-contain",
extraClasses:a=null,
overlay:i,
children:o,
...c
}=e;
return(0,
n.jsx)("div",
{
ref:t,
className:(0,
s.Z)(r,
a,
l,
i&&"z-overlay",
i?"overflow-auto":"overflow-hidden"),
...c,
children:o
})
}),
t7=(0,
o.cn)(!1),
t9=(0,
o.cn)("#000"),
le=(0,
o.cn)(null),
lt=(0,
o.cn)(!1),
ll=(0,
o.cn)(!1);
function lr(e,
t,
l,
r){
(0,
i.useEffect)(()=>{
if(l){
let l=l=>{
!e.current||e.current.contains(l.target)||r&&l.target.classList.contains(r)||t(l)
};
return document.addEventListener("mousedown",
l),
document.addEventListener("touchstart",
l),
()=>{
document.removeEventListener("mousedown",
l),
document.removeEventListener("touchstart",
l)
}
}
},
[e,
t,
l,
r])
}function ln(){
var e;
let{
mainMenuLinks:t,
socialLinks:l
}=tP(),
r=(0,
i.useRef)({
firstRun:!0
}),
o=(0,
i.useRef)(),
[c,
u]=(0,
a.KO)(t7),
[m,
p]=(0,
a.KO)(t9),
h=(0,
a.b9)(eZ),
[f,
x]=(0,
i.useState)([]),
v=t.slice(0,
t.length-1),
g=eF()(t);
(0,
i.useEffect)(()=>{
if(r.current.firstRun){
r.current.firstRun=!1;
return
}let e=window.innerWidth<d().md,
t=e?"y":"x",
l=e?"x":"y";
r.current.tl&&r.current.tl.kill();
let n=w.p8.timeline();
c?(h(!0),
p(ev().black),
w.p8.set(o.current,
{
background:ev().black,
color:(0,
eg.GR)(ev().black)
}),
n.fromTo(o.current,
{
[t]:"100%",
[l]:0
},
{
[t]:0,
[l]:0,
duration:1,
ease:"expo.out",
overwrite:!0
}),
n.fromTo(o.current.querySelectorAll("li"),
{
opacity:0
},
{
opacity:1,
duration:.6,
ease:"expo.out",
stagger:.05,
clearProps:"opacity"
},
.2)):(h(!1),
n.to(o.current,
{
[t]:e?"-100%":"100%",
[l]:0,
duration:.6,
ease:"expo.out",
overwrite:!0,
onComplete:()=>{
x([])
}
}),
n.to(o.current.querySelectorAll("li"),
{
opacity:0,
duration:.4,
ease:"expo.out"
},
0)),
r.current.tl=n,
document.body.style.overflow=c?"hidden":null
},
[c,
p,
h]),
(0,
i.useEffect)(()=>{
w.p8.to(o.current,
{
background:m,
color:(0,
eg.GR)(m),
duration:.3,
ease:"expo.out"
})
},
[m]);
let b=(0,
i.useCallback)(()=>{
u(!1)
},
[u]);
return lr(o,
b,
c,
".close-btn"),
(0,
n.jsxs)(n.Fragment,
{
children:[(0,
n.jsx)(t8,
{
ref:o,
extraClasses:"w-[calc(74.99vw-1.5rem)] md:w-full left-[unset] right-0 translate-y-0 upMd:translate-x-full md:-translate-y-full",
children:(0,
n.jsx)("div",
{
className:"overflow-auto h-full absolute inset-0 z-menu-content md:block",
children:(0,
n.jsx)("div",
{
"data-lenis-prevent":!0,
className:"h-full",
children:(0,
n.jsxs)(tN,
{
noBottomMargin:!0,
width:"w-full",
as:"nav",
className:"flex-grow h-full flex flex-col",
children:[(0,
n.jsx)(en,
{
onClick:b,
className:"pt-8 md:pt-6 mb-10 md:5 block w-fit",
link:{
href:"/"
},
children:(0,
n.jsx)(tZ,
{
className:"",
dotStyle:{
transition:"none"
},
children:(0,
n.jsx)(E,
{
children:"The Swdl"
})
})
}),
(0,
n.jsx)("div",
{
className:"flex flex-col ml-[-0.3rem] md:min-h-0 pb-8",
children:null==v?void 0:v.map(e=>{
var t;
return(0,
n.jsx)("ul",
{
className:"[&:not(:first-child)]:mt-16",
children:null==e?void 0:null===(t=e.links)||void 0===t?void 0:t.map(t=>{
var l;
return(0,
n.jsx)(li,
{
hoverHash:"".concat(e._key,
"-").concat(t._key),
menuItem:t,
onClick:b,
children:null==t?void 0:null===(l=t.link)||void 0===l?void 0:l.text
},
t._key)
})
},
e._key)
})
}),
(0,
n.jsxs)("div",
{
className:"grid grid-cols-12 md:grid-cols-4 gap-8 pb-8 flex-grow items-end",
children:[(0,
n.jsx)("ul",
{
className:"col-span-2",
children:null==g?void 0:null===(e=g.links)||void 0===e?void 0:e.map(e=>{
var t;
return(0,
n.jsx)(li,
{
mono:!0,
hoverHash:"".concat(g._key,
"-").concat(e._key),
menuItem:e,
onClick:b,
children:null==e?void 0:null===(t=e.link)||void 0===t?void 0:t.text
},
e._key)
})
}),
(0,
n.jsx)("ul",
{
className:"upMd:col-span-2",
children:null==l?void 0:l.map(e=>(0,
n.jsx)(li,
{
mono:!0,
menuItem:e,
hoverHash:"".concat(l._key,
"-").concat(e._key),
children:null==e?void 0:e.title
},
e._key))
})]
}),
(0,
n.jsx)(ls,
{
menuLinks:t,
renderedImages:f,
setRenderedImages:x
})]
})
})
})
}),
(0,
n.jsx)("button",
{
className:(0,
s.Z)("fixed inset-0 bg-transparent z-menuShadow",
!c&&"hidden")
})]
})
}function ls(e){
let{
menuLinks:t,
renderedImages:l,
setRenderedImages:r
}=e,
s=(0,
a.Dv)(le),
o=(0,
i.useRef)(),
c=(0,
i.useMemo)(()=>t5()(t.map(e=>e.links)).filter(e=>!!e.image),
[t]),
d=null==s?void 0:s.split("-")[1];
return(0,
i.useEffect)(()=>{
let e=null==c?void 0:c.find(e=>e._key===d);
e&&r([e])
},
[d]),
(0,
n.jsx)("div",
{
className:"absolute inset-0 overflow-hidden pointer-events-none md:!hidden",
ref:o,
children:null==l?void 0:l.map(e=>(0,
n.jsx)(la,
{
image:e.image
},
e._key))
})
}function la(e){
let{
image:t
}=e,
l=(0,
i.useRef)();
return q(()=>{
w.p8.fromTo(l.current.children[0],
{
scale:.9,
opacity:1
},
{
scale:1,
opacity:1,
duration:.6,
ease:"expo.out",
delay:.05
})
},
[]),
(0,
n.jsx)("div",
{
className:"absolute inset-0",
ref:l,
children:(0,
n.jsx)(ty,
{
className:"!fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-menu-content w-[25vw] opacity-0",
image:t,
imageSizes:"25vw"
})
})
}function li(e){
var t,
l;
let{
menuItem:r,
onClick:i,
className:o,
children:c,
hoverHash:d,
mono:u=!1
}=e,
[m,
p]=(0,
a.KO)(le),
h=(0,
a.b9)(t9),
f=(null==r?void 0:r.colour)||(null==r?void 0:null===(t=r.link)||void 0===t?void 0:null===(l=t.page)||void 0===l?void 0:l.pageTheme)||ev().black,
x=()=>{
R||(p(d),
h(f))
},
v=()=>{
R||(p(null),
h(ev().black))
},
g=(null==r?void 0:r._type)==="socialLink"?{
linkType:"external",
url:null==r?void 0:r.url
}:(null==r?void 0:r.link)||r;
return(0,
n.jsx)("li",
{
className:(0,
s.Z)(!u&&"font-bold text-[5.2rem] leading-none md:text-[4.2rem]",
"relative overflow-hidden",
(null===m||m===d)&&"z-floating-menu",
o),
children:(0,
n.jsx)(en,
{
link:g,
showText:!1,
className:(0,
s.Z)("inline-block pb-[0.1em] mb-[-0.1em] transition-opacity duration-300 ease-out-expo",
!!m&&m!==d&&"opacity-[15%]",
!!m&&m===d&&"opacity-100"),
onMouseLeave:v,
onMouseOver:x,
onClick:i,
"aria-label":c,
children:(0,
n.jsx)(t4,
{
condition:u,
wrapper:E,
children:c
})
})
})
}let lo=(0,
o.cn)(!1),
lc=(0,
o.cn)(!1);
function ld(e){
let{
page:t,
isSiteModeTSStudio:l
}=e;
return l?null:(0,
n.jsxs)(n.Fragment,
{
children:[(0,
n.jsx)(lm,
{
page:t
}),
(0,
n.jsx)(ln,
{

})]
})
}let lu=["podcast",
"video",
"in_perspective",
"feature_article"];
function lm(e){
var t,
l;
let{
page:r
}=e,
o=(0,
i.useRef)(),
c=(0,
i.useRef)(),
d=(0,
i.useRef)(),
[u,
m]=(0,
a.KO)(t7),
p=(0,
a.Dv)(tW),
[h,
f]=(0,
a.KO)(lt),
[x,
v]=(0,
a.KO)(ll),
g=(0,
a.Dv)(lo),
{
mainMenuLinks:b
}=tP(),
j=(0,
a.Dv)(lc),
[y,
N]=(0,
a.KO)(eE),
k=lu.includes(null==r?void 0:r.pageType),
C=k||u||y,
Z=(0,
a.b9)(tW),
R=(0,
i.useRef)(),
S=(0,
i.useRef)(),
_=(0,
i.useRef)(),
L=(0,
i.useRef)(),
M=(0,
i.useRef)();
R.current=W(lp,
{
headerRef:o,
logoRef:S,
menuButtonRef:_,
searchButtonRef:L,
stickyLeftMenuPortalRef:M
}),
I(R);
let T=(0,
i.useCallback)(()=>{
Z(e=>!e)
},
[Z]),
P=(0,
i.useCallback)(()=>{
if(k&&!u){
var e;
null==window||null===(e=window.history)||void 0===e||e.back();
return
}if(y){
N(!1);
return
}m(e=>!e)
},
[k,
y,
u,
m]),
B=(0,
i.useCallback)(()=>{
let e=V()-window.innerHeight;
f(window.scrollY>80||window.scrollY>e),
v(window.scrollY>e-window.innerHeight/2)
},
[v,
f]);
F(m),
z(()=>{
w.ZP.to(o.current,
{
yPercent:j?-100:0,
duration:.2,
ease:"sine.inOut"
})
},
[j]),
(0,
i.useEffect)(()=>(window.addEventListener("scroll",
B),
()=>{
window.removeEventListener("scroll",
B)
}),
[B]);
let A=(0,
D.usePathname)();
(0,
i.useEffect)(()=>{
f(!1)
},
[A,
f]);
let H=(0,
i.useRef)(),
O=(0,
i.useRef)();
return(0,
i.useEffect)(()=>{
var e,
t;
let l={
duration:.2,
ease:"sine.inOut"
},
r=H.current.offsetHeight+H.current.offsetTop+2,
n=!u&&!h&&!p;
w.ZP.to([H.current,
O.current],
{
y:n?0:-r,
pointerEvents:n?"all":"none",
...l
});
let s=n||x,
a=null===(e=null==S?void 0:null===(t=S.current)||void 0===t?void 0:t.getBoundingClientRect())||void 0===e?void 0:e.width;
w.ZP.to([M.current],
{
y:u?-r:s?0:r,
pointerEvents:"all",
...l
}),
u||w.ZP.to([M.current],
{
x:s?0:-a-20,
...l,
delay:x?.2:0
})
},
[x,
h,
u,
p]),
(0,
n.jsxs)(tN,
{
ref:o,
as:"header",
noBottomMargin:!0,
className:"z-floating-menu flex justify-between fixed pt-8 items-center md:pt-6 left-0 right-0 pointer-events-none",
children:[(0,
n.jsxs)("div",
{
ref:H,
className:"flex",
children:[(0,
n.jsx)(en,
{
ref:S,
link:{
href:"/"
},
style:{
opacity:0
},
className:(0,
s.Z)("mr-8 expand-hitbox",
g?"text-white":"text-black"),
children:(0,
n.jsx)(tZ,
{
children:"The Swdl"
})
}),
(0,
n.jsx)("div",
{
ref:M,
id:"stickyLeftMenu",
style:{
opacity:0
}
})]
}),
(0,
n.jsx)("div",
{
className:"absolute left-1/2 -translate-x-1/2",
children:(0,
n.jsx)("ul",
{
ref:O,
className:"flex md:hidden",
children:null===(t=b[0])||void 0===t?void 0:null===(l=t.links)||void 0===l?void 0:l.map(e=>{
var t,
l,
a,
i,
o;
return(0,
n.jsx)(E,
{
as:"li",
className:(0,
s.Z)("js-submenu-item overflow-hidden relative"),
style:{
opacity:0
},
children:(0,
n.jsx)(en,
{
link:e.link,
className:(0,
s.Z)(((null==e?void 0:null===(t=e.link)||void 0===t?void 0:null===(l=t.page)||void 0===l?void 0:l._id)===r._id||(null==r?void 0:null===(a=r.parentTag)||void 0===a?void 0:a._id)===(null==e?void 0:null===(i=e.link)||void 0===i?void 0:null===(o=i.page)||void 0===o?void 0:o._id))&&"is-active",
"mr-16 hover:opacity-50 pl-[1.6em]",
g?"text-white":"text-black",
"[&.is-active]:before:-translate-y-0 hover:before:-translate-y-0  before:transition-transform before:duration-500 before:ease-out-expo before:bg-current before:w-[0.8em] before:h-[0.8em] before:absolute before:left-0 before:top-[0.1em] before:-translate-y-[calc(100%+0.2em)]")
})
},
e._key)
})
})
}),
(0,
n.jsxs)("div",
{
className:"pointer-events-auto",
children:[!C&&(0,
n.jsxs)("nav",
{
className:(0,
s.Z)(" top-8 right-8 flex gap-[1px] z-floating-menu",
"md:top-6 md:right-6"),
ref:c,
children:[(0,
n.jsx)(K,
{
"aria-label":"Search",
ref:L,
rounded:!1,
invert:g,
invertTheme:!g,
onClick:T,
borderHover:!0,
className:"items-center px-3 relative expand-hitbox after:!right-0",
style:{
opacity:1===R.current.progress()?1:0
},
children:(0,
n.jsx)(es,
{

})
}),
(0,
n.jsx)(U,
{
ref:_,
invert:g,
invertTheme:!g,
borderHover:!0,
rounded:!1,
onClick:P,
className:"md:px-5 relative expand-hitbox after:!left-0",
style:{
opacity:1===R.current.progress()?1:0
},
children:"Menu"
})]
}),
C&&(0,
n.jsx)(U,
{
ref:d,
invert:!0,
className:"close-btn relative expand-hitbox",
onClick:P,
"aria-label":"close",
rounded:!1,
border:!1,
children:"Close"
})]
})]
})
}let lp=(e,
t)=>{
var l;
let{
headerRef:r,
logoRef:n,
menuButtonRef:s,
searchButtonRef:a,
stickyLeftMenuPortalRef:i
}=t,
o=null==r?void 0:null===(l=r.current)||void 0===l?void 0:l.querySelectorAll(".js-submenu-item"),
c=O()([null==n?void 0:n.current,
null==i?void 0:i.current,
o,
null==s?void 0:s.current,
null==a?void 0:a.current]);
e.fromTo(c,
{
y:-10,
opacity:0
},
{
y:0,
opacity:1,
duration:.6,
ease:"expo.out",
stagger:.05,
delay:.3
})
},
lh=e=>e.map(e=>e.children?e.children.filter(e=>"span"===e._type).map(e=>e.text).join(""):null),
lf=["article",
"featuredArticle"],
lx=to()(null).projectId("68lp9qid").dataset("production"),
lv=(e,
t)=>{
let{
seo:l={

},
title:r
}=t,
{
title:n,
siteUrl:s
}=e,
a="tag"===t._type?function(e){
e=e.toLowerCase().split(" ");
for(var t=0;
t<e.length;
t++)e[t]=e[t].charAt(0).toUpperCase()+e[t].slice(1);
return e.join(" ")
}(r):r,
o=(0,
i.useMemo)(()=>{
let e="".concat(s).concat(ee(t)),
r=a||n;
return r!==n&&(r="".concat(r,
" | ").concat(n)),
{
...l||{

},
meta_title:(null==l?void 0:l.meta_title)||a,
og_url:e,
canonical_url:e,
title:r,
category:l.category||("product"===t._type?"product":t.pageType)
}
},
[t]);
return o
};
function lg(e){
var t;
let{
site:l,
page:r,
variations:s
}=e,
{
siteTitle:a,
siteUrl:o
}=l,
{
seo:c={

}
}=r,
d=Q()(c,
["meta_image",
"asset"])||Q()(r,
["featuredImage",
"asset"]),
u=d&&lx.image(d).width(1200).height(630).url(),
m=lv(l,
r),
p=m.meta_description||(null==r?void 0:r.excerpt),
h=m.meta_title,
f=function(e){
let t=(0,
i.useMemo)(()=>{
var t;
if(!lf.includes(null==e?void 0:e.pageType))return null;
let l=null==e?void 0:null===(t=e.slices)||void 0===t?void 0:t.map(e=>"richText"!==e._type?null:lh(null==e?void 0:e.content)).join(" ");
return function(e){
var t,
l;
let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:200;
if(!e)return null;
let n=null===(t=null===(l=null==e?void 0:e.trim())||void 0===l?void 0:l.split(/\s+/))||void 0===t?void 0:t.length;
return Math.ceil(n/r)
}(l)
},
[e]);
return t
}(r),
x=null==r?void 0:null===(t=r.author)||void 0===t?void 0:t.name,
v=f?"".concat(f,
" Minute").concat(1!==f?"s":""):null;
return(0,
n.jsxs)(tn(),
{
children:[(0,
n.jsx)("title",
{
children:m.title
}),
s&&s.map(e=>{
let t="en-AU";
return(0,
n.jsx)("link",
{
rel:"alternate",
hrefLang:t,
href:"".concat(o).concat(ee(e)),
"data-rh":"true"
},
t)
}),
(0,
n.jsx)("meta",
{
property:"og:site_name",
content:a
}),
(0,
n.jsx)("meta",
{
name:"twitter:site",
content:a
}),
(0,
n.jsx)("meta",
{
name:"google-site-verification",
content:"Yz4CVFnLsEq5gYxC6nI9hw6wPGVuEIn9Hh_Tx01OtLQ"
}),
(0,
n.jsx)("meta",
{
name:"facebook-domain-verification",
content:"2jci4bhnq5nc99njsee7viw3n7203s"
}),
m.meta_keywords&&(0,
n.jsx)("meta",
{
name:"keywords",
content:m.meta_keywords
}),
m.og_url&&(0,
n.jsx)("meta",
{
property:"og:url",
content:m.og_url
}),
h&&(0,
n.jsx)("meta",
{
property:"title",
content:h
}),
h&&(0,
n.jsx)("meta",
{
property:"og:title",
content:h
}),
h&&(0,
n.jsx)("meta",
{
name:"twitter:title",
content:h
}),
p&&(0,
n.jsx)("meta",
{
name:"description",
content:p
}),
p&&(0,
n.jsx)("meta",
{
name:"og:description",
content:p
}),
p&&(0,
n.jsx)("meta",
{
name:"twitter:description",
content:p
}),
d&&(0,
n.jsxs)(n.Fragment,
{
children:[(0,
n.jsx)("meta",
{
property:"og:image",
content:u
}),
(0,
n.jsx)("meta",
{
property:"og:image:width",
content:1200
}),
(0,
n.jsx)("meta",
{
property:"og:image:height",
content:630
}),
(0,
n.jsx)("meta",
{
name:"twitter:image",
content:u
}),
(0,
n.jsx)("meta",
{
name:"twitter:image:src",
content:u
}),
(0,
n.jsx)("meta",
{
name:"twitter:image:tile_image:src",
content:u
})]
}),
x&&(0,
n.jsxs)(n.Fragment,
{
children:[(0,
n.jsx)("meta",
{
name:"twitter:label1",
content:"Written by"
}),
(0,
n.jsx)("meta",
{
name:"twitter:data1",
content:x
})]
}),
f&&(0,
n.jsxs)(n.Fragment,
{
children:[(0,
n.jsx)("meta",
{
name:"twitter:label2",
content:"Est. reading time"
}),
(0,
n.jsx)("meta",
{
name:"twitter:data2",
content:v
})]
}),
(0,
n.jsx)("meta",
{
name:"twitter:card",
content:"summary_large_image"
}),
(0,
n.jsx)("link",
{
rel:"canonical",
href:m.canonical_url
}),
(0,
n.jsx)("link",
{
rel:"apple-touch-icon",
sizes:"180x180",
href:"/apple-touch-icon.png"
}),
(0,
n.jsx)("link",
{
rel:"icon",
type:"image/png",
sizes:"32x32",
href:"/favicon-32x32.png"
}),
(0,
n.jsx)("link",
{
rel:"icon",
type:"image/png",
sizes:"16x16",
href:"/favicon-16x16.png"
}),
(0,
n.jsx)("link",
{
rel:"manifest",
href:"/site.webmanifest"
}),
(0,
n.jsx)("meta",
{
name:"msapplication-TileColor",
content:"#da532c"
}),
(0,
n.jsx)("meta",
{
name:"theme-color",
content:"#000"
})]
})
}let lw=e=>{
let{
...t
}=e;
return(0,
n.jsx)("svg",
{
width:"15",
height:"12",
viewBox:"0 0 15 12",
fill:"none",
xmlns:"http://www.w3.org/2000/svg",
...t,
children:(0,
n.jsx)("path",
{
fillRule:"evenodd",
clipRule:"evenodd",
d:"M4.7174 12C10.378 12 13.4736 7.38368 13.4736 3.38079C13.4736 3.2496 13.4708 3.11903 13.4648 2.98916C14.0656 2.56159 14.5879 2.02809 15 1.42063C14.4486 1.66171 13.8552 1.82426 13.2327 1.89752C13.868 1.52254 14.3558 0.929094 14.5859 0.221734C13.9912 0.568754 13.3328 0.821149 12.6319 0.957054C12.0703 0.368257 11.2705 0 10.3854 0C8.68577 0 7.30755 1.35666 7.30755 3.02912C7.30755 3.26688 7.33455 3.49804 7.3874 3.71983C4.82974 3.59329 2.56168 2.38774 1.04406 0.554805C0.779489 1.00236 0.627255 1.52254 0.627255 2.07735C0.627255 3.1284 1.17057 4.05617 1.99672 4.59891C1.49196 4.58364 1.01764 4.44711 0.602872 4.21997C0.60217 4.2326 0.60217 4.24536 0.60217 4.25862C0.60217 5.72593 1.66315 6.95077 3.07117 7.22855C2.81272 7.29773 2.54068 7.33511 2.25996 7.33511C2.0617 7.33511 1.86887 7.31576 1.6814 7.28045C2.07319 8.48399 3.20923 9.35981 4.55636 9.3845C3.50291 10.1971 2.17602 10.6813 0.73417 10.6813C0.485808 10.6813 0.240894 10.6673 0 10.6393C1.36206 11.4985 2.97919 12 4.7174 12Z",
fill:"currentColor"
})
})
},
lb=e=>{
let{
...t
}=e;
return(0,
n.jsxs)("svg",
{
width:"21",
height:"20",
viewBox:"0 0 21 20",
fill:"none",
xmlns:"http://www.w3.org/2000/svg",
...t,
children:[(0,
n.jsx)("path",
{
d:"M5.1124 5.9975C6.11939 5.9975 6.93573 5.18116 6.93573 4.17416C6.93573 3.16716 6.11939 2.35083 5.1124 2.35083C4.1054 2.35083 3.28906 3.16716 3.28906 4.17416C3.28906 5.18116 4.1054 5.9975 5.1124 5.9975Z",
fill:"currentColor"
}),
(0,
n.jsx)("path",
{
d:"M8.6574 7.37915V17.495H11.7982V12.4925C11.7982 11.1725 12.0466 9.89415 13.6832 9.89415C15.2974 9.89415 15.3174 11.4033 15.3174 12.5758V17.4958H18.4599V11.9483C18.4599 9.22332 17.8732 7.12915 14.6882 7.12915C13.1591 7.12915 12.1341 7.96832 11.7149 8.76248H11.6724V7.37915H8.6574ZM3.53906 7.37915H6.6849V17.495H3.53906V7.37915Z",
fill:"currentColor"
})]
})
},
lj=e=>{
let{
...t
}=e;
return(0,
n.jsx)("svg",
{
width:"21",
height:"20",
viewBox:"0 0 21 20",
fill:"none",
xmlns:"http://www.w3.org/2000/svg",
...t,
children:(0,
n.jsx)("path",
{
d:"M17.3621 7.79963L10.9616 11.8L4.56107 7.79963V6.1995L10.9616 10.1998L17.3621 6.1995V7.79963ZM17.3621 4.59937H4.56107C3.673 4.59937 2.96094 5.31142 2.96094 6.1995V15.8003C2.96094 16.2247 3.12952 16.6317 3.4296 16.9317C3.72969 17.2318 4.13669 17.4004 4.56107 17.4004H17.3621C17.7865 17.4004 18.1935 17.2318 18.4936 16.9317C18.7937 16.6317 18.9622 16.2247 18.9622 15.8003V6.1995C18.9622 5.77511 18.7937 5.36812 18.4936 5.06803C18.1935 4.76795 17.7865 4.59937 17.3621 4.59937Z",
fill:"currentColor"
})
})
},
ly=e=>{
let{
...t
}=e;
return(0,
n.jsxs)("svg",
{
width:"16",
height:"16",
viewBox:"0 0 16 16",
fill:"none",
xmlns:"http://www.w3.org/2000/svg",
...t,
children:[(0,
n.jsx)("path",
{
d:"M9.35581 8.03504C8.84387 7.52331 8.14966 7.23584 7.42581 7.23584C6.70197 7.23584 6.00775 7.52331 5.49581 8.03504L3.56519 9.96504C3.05324 10.477 2.76563 11.1713 2.76562 11.8953C2.76563 12.6194 3.05324 13.3137 3.56519 13.8257C4.07714 14.3376 4.77149 14.6252 5.4955 14.6252C6.21951 14.6252 6.91386 14.3376 7.42581 13.8257L8.39081 12.8607",
stroke:"currentColor",
strokeWidth:"1.5",
strokeLinecap:"round",
strokeLinejoin:"round"
}),
(0,
n.jsx)("path",
{
d:"M7.42969 9.96494C7.94163 10.4767 8.63584 10.7641 9.35969 10.7641C10.0835 10.7641 10.7777 10.4767 11.2897 9.96494L13.2203 8.03494C13.7323 7.52299 14.0199 6.82864 14.0199 6.10463C14.0199 5.38062 13.7323 4.68627 13.2203 4.17432C12.7084 3.66237 12.014 3.37476 11.29 3.37476C10.566 3.37476 9.87164 3.66237 9.35969 4.17432L8.39469 5.13932",
stroke:"currentColor",
strokeWidth:"1.5",
strokeLinecap:"round",
strokeLinejoin:"round"
})]
})
},
lN=()=>{
let[e,
t]=(0,
i.useState)(),
l=()=>{
let e;
let l="";
document.getSelection?l=(e=document.getSelection()).toString():document.selection&&(l=(e=document.selection.createRange()).text),
t({
text:l,
selection:e
})
};
return(0,
i.useEffect)(()=>(document.addEventListener("selectionchange",
l),
()=>{
document.removeEventListener("selectionchange",
l)
}),
[]),
e
};
function lk(){
let e=(0,
i.useRef)(),
t=(0,
i.useRef)(),
l=(0,
D.usePathname)(),
r=lN(),
s=null==r?void 0:r.text;
(0,
i.useEffect)(()=>{
t.current=window.location.href,
window.getSelection&&window.getSelection().empty&&window.getSelection().empty()
},
[l]);
let a=(0,
i.useMemo)(()=>{
var e,
t,
l;
if(!r&&!(null==r?void 0:r.selection))return!1;
let n=!1;
if(r&&(null==r?void 0:null===(e=r.text)||void 0===e?void 0:e.length)){
let e=null==r?void 0:null===(l=r.selection)||void 0===l?void 0:l.getRangeAt(0),
t=w.p8.utils.toArray(document.querySelectorAll(".share-tooltip"));
n=!!t.find(t=>t.contains(e.commonAncestorContainer))
}return r&&(null==r?void 0:null===(t=r.text)||void 0===t?void 0:t.length)&&n
},
[r]);
(0,
i.useEffect)(()=>{
let t=document.documentElement.scrollTop||document.body.scrollTop,
l=document.querySelector("body");
if(a){
let n=r.selection.getRangeAt(0),
s=n.getBoundingClientRect();
w.p8.set(e.current,
{
top:t+s.top-e.current.getBoundingClientRect().height-4,
left:s.left+s.width/2-l.getBoundingClientRect().width/15
})
}
},
[r]),
(0,
i.useEffect)(()=>{
w.p8.to(e.current,
{
autoAlpha:a?1:0,
scale:a?1:.5,
pointerEvents:a?"all":"none",
transformOrigin:"0% 100%",
duration:.3,
ease:"expo.out"
})
},
[a]);
let o="mailto:?body=".concat(s,
"%0D%0A%0D%0A").concat(t.current);
return(0,
n.jsx)(lC,
{
ref:e,
url:t.current,
emailLink:o,
className:"absolute opacity-0",
selectedText:s
})
}let lC=(0,
i.forwardRef)((e,
t)=>{
let{
url:l,
className:r,
selectedText:a,
emailLink:o
}=e,
[c,
d]=(0,
i.useState)(!1),
u={
target:"_blank",
rel:"noopener noreferrer nofollow",
className:"hover:opacity-50 transition-opacity ease-out-expo"
};
return(0,
i.useEffect)(()=>{
c&&setTimeout(()=>{
d(!1)
},
1e3)
},
[c]),
(0,
n.jsxs)("div",
{
className:(0,
s.Z)("text-black px-4 py-4 bg-yellow z-cursor flex flex-col gap-4",
r),
ref:t,
children:[(0,
n.jsx)(E,
{
children:c?"copied!":"share"
}),
(0,
n.jsxs)("div",
{
className:"flex gap-[3.2rem] items-center",
children:[(0,
n.jsx)("a",
{
...u,
href:"https://twitter.com/intent/tweet?text=".concat(a,
"%0D%0A%0D%0A").concat(l),
children:(0,
n.jsx)(lw,
{

})
}),
(0,
n.jsx)("a",
{
...u,
href:"https://www.linkedin.com/sharing/share-offsite/?url=".concat(l),
children:(0,
n.jsx)(lb,
{

})
}),
(0,
n.jsx)("a",
{
...u,
href:o,
children:(0,
n.jsx)(lj,
{

})
}),
(0,
n.jsx)("button",
{
className:u.className,
onClick:function(){
navigator.clipboard.writeText(a),
d(!0)
},
children:(0,
n.jsx)(ly,
{

})
})]
})]
})
}),
lZ=(0,
o.cn)(),
lR=(0,
o.cn)({

});
function lS(e){
let{
fill:t="currentColor",
...l
}=e;
return(0,
n.jsxs)("svg",
{
width:"1400",
height:"206",
viewBox:"0 0 1400 206",
fill:"none",
xmlns:"http://www.w3.org/2000/svg",
...l,
children:[(0,
n.jsxs)("g",
{
children:[(0,
n.jsx)("path",
{
d:"M413.806 181.353V24.0469L387.505 2.50488H534.041L544.311 49.5966H540.553L502.98 10.5205H437.102V89.1738H483.192L495.966 60.6181H499.724L513.751 124.743H509.994L483.192 97.4399H437.102V194.629H506.988L546.315 149.541H550.072L538.048 202.895H387.505L413.806 181.353Z",
fill:t
}),
(0,
n.jsx)("path",
{
d:"M200.641 181.353V24.0469L174.34 2.50488H250.238L223.936 24.0469V89.1738H316.617V24.0469L290.316 2.50488H366.464L340.163 24.0469V181.353L366.464 202.895H290.316L316.617 181.353V97.4399H223.936V181.353L250.238 202.895H174.34L200.641 181.353Z",
fill:t
}),
(0,
n.jsx)("path",
{
d:"M69.1347 181.353V10.5205H41.3305L3.75733 49.5966H0L10.27 2.50488H151.545L161.815 49.5966H158.058L120.234 10.5205H92.4301V181.353L118.731 202.895H42.8335L69.1347 181.353Z",
fill:t
})]
}),
(0,
n.jsxs)("g",
{
children:[(0,
n.jsx)("path",
{
d:"M1272.25 181.353V24.0469L1245.95 2.50488H1321.85L1295.55 24.0469V194.629L1356.92 194.88L1396.24 149.541H1400L1388.23 202.895H1245.95L1272.25 181.353Z",
fill:t
}),
(0,
n.jsx)("path",
{
d:"M1083.35 24.0469V181.353L1057.05 202.895H1127.19C1148.89 202.895 1168.01 198.888 1184.55 190.872C1201.25 182.856 1214.19 171.334 1223.37 156.305C1232.72 141.108 1237.4 123.24 1237.4 102.7C1237.4 82.1601 1232.72 64.3755 1223.37 49.3462C1214.19 34.1499 1201.25 22.5439 1184.55 14.5283C1168.01 6.51269 1148.89 2.50488 1127.19 2.50488H1057.05L1083.35 24.0469ZM1170.02 183.858C1157.16 191.039 1142.05 194.629 1124.68 194.629H1106.64V10.5205H1124.43C1141.8 10.5205 1156.99 14.1943 1170.02 21.542C1183.04 28.8896 1193.06 39.4936 1200.08 53.354C1207.09 67.2143 1210.6 83.663 1210.6 102.7C1210.6 121.737 1207.09 138.186 1200.08 152.046C1193.06 165.907 1183.04 176.511 1170.02 183.858Z",
fill:t
}),
(0,
n.jsx)("path",
{
d:"M799.205 24.0469L773.906 2.50489H844.293L824.254 24.0469L873.6 163.318L905.794 70.1369L888.981 23.108L864.599 2.34674H934.986L914.947 23.8887H914.91L963.776 163.318L1011.87 24.0469L990.327 2.50489H1042.18L1020.64 24.0469L958.265 202.895H953.255L910.083 82.1344L868.089 202.895H863.079L799.205 24.0469Z",
fill:t
}),
(0,
n.jsx)("path",
{
d:"M713.39 205.4C696.023 205.4 678.489 199.806 660.788 188.618L642.502 202.895V124.242H646.259C654.776 142.945 662.625 157.557 669.805 168.078C676.986 178.598 684.167 186.113 691.347 190.621C698.528 194.963 706.376 197.134 714.893 197.134C723.076 197.134 730.256 195.297 736.435 191.623C742.781 187.783 747.54 182.773 750.713 176.594C754.053 170.248 755.723 163.736 755.723 157.056C755.723 147.871 753.301 140.106 748.458 133.761C743.616 127.248 736.769 122.071 727.918 118.23L686.588 100.696C677.236 96.8554 669.555 92.8476 663.543 88.6728C657.531 84.331 652.855 79.2377 649.516 73.393C646.343 67.3813 644.756 60.2006 644.756 51.851C644.756 41.6645 647.595 32.647 653.273 24.7983C659.118 16.9497 666.716 10.8545 676.067 6.5127C685.419 2.1709 695.272 0 705.625 0C717.148 0 729.171 2.92236 741.695 8.76709L754.971 2.50489L769.249 66.6298H765.492C755.138 51.2666 746.538 39.4936 739.691 31.311C732.845 22.9614 726.416 17.0332 720.404 13.5264C714.559 9.85253 708.213 8.01562 701.367 8.01562C694.353 8.01562 688.007 9.51855 682.33 12.5244C676.819 15.3633 672.477 19.3711 669.304 24.5478C666.298 29.7246 664.795 35.5693 664.795 42.082C664.795 49.2627 666.883 55.2744 671.058 60.1171C675.399 64.7929 682.246 69.1347 691.598 73.1425L732.928 90.6767C747.29 97.0224 757.977 104.454 764.991 112.97C772.171 121.487 775.762 132.508 775.762 146.035C775.762 157.056 773.09 167.076 767.746 176.093C762.402 185.111 754.971 192.291 745.453 197.635C736.101 202.812 725.414 205.4 713.39 205.4Z",
fill:t
})]
})]
})
}function l_(e){
var t;
let{
page:l
}=e,
{
footerLinks:r,
secondaryFooterLinks:a,
socialLinks:o,
copyright:c
}=tP(),
d=(0,
i.useRef)(),
u=null==l?void 0:null===(t=l.footer)||void 0===t?void 0:t.footerColor;
e3(d,
"#ffffff"!==u);
let m=(0,
i.useMemo)(()=>[...r,
{
_key:"socialLinks",
links:o
}],
[r,
o]),
p=(0,
i.useMemo)(()=>{
let e=a.length;
return[a.slice(0,
e-1),
[{
_key:"copyright",
link:{
linkType:"external",
text:c.replace("{
YEAR
}",
new Date().getFullYear())
}
},
...a.slice(e-1,
e)]]
},
[a]);
return(0,
n.jsxs)(n.Fragment,
{
children:[(0,
n.jsx)("div",
{
className:"h-screen md:h-static-screen pointer-events-none opacity-0",
ref:d
}),
(0,
n.jsxs)("footer",
{
className:(0,
s.Z)("#ffffff"===u?"bg-background text-foreground":"bg-foreground text-background",
"overflow-hidden fixed bottom-0 left-0 right-0 h-screen md:h-static-screen pt-8 pb-5 flex flex-col justify-between footer"),
children:[m&&(0,
n.jsx)(tN,
{
as:"div",
grid:!0,
noBottomMargin:!0,
width:"w-full",
children:null==m?void 0:m.map(e=>{
var t;
return(0,
n.jsx)("ul",
{
className:"col-span-3 md:col-span-2",
children:null===(t=e.links)||void 0===t?void 0:t.map(e=>{
if("spacer"===e._type)return(0,
n.jsx)("li",
{
className:"h-[1.4em]"
},
"spacer");
let t=(null==e?void 0:e._type)==="socialLink"?{
_type:"link",
linkType:"external",
url:null==e?void 0:e.url,
text:null==e?void 0:e.title
}:(null==e?void 0:e.link)||e;
return(0,
n.jsx)("li",
{
children:(0,
n.jsx)(en,
{
link:t,
className:"text-24 font-bold leading-none mb-1 hover:opacity-50"
})
},
e._key)
})
},
e._key)
})
}),
p&&(0,
n.jsx)("div",
{
className:"mx-8 md:mx-6 md:grid md:grid-cols-2",
children:p.map((e,
t)=>(0,
n.jsx)("ul",
{
children:null==e?void 0:e.map(e=>(0,
n.jsx)("li",
{
className:(0,
s.Z)(""),
children:(0,
n.jsx)(en,
{
showText:!1,
link:e.link,
className:(0,
s.Z)("mb-1",
"copyright"!==e._key&&"hover:opacity-50",
"copyright"===e._key&&"upMd:hidden"),
children:(0,
n.jsx)(E,
{
children:e.link.text
})
})
},
e._key))
},
t))
}),
(0,
n.jsx)("div",
{
className:"flex flex-col md:flex-col-reverse",
children:(0,
n.jsx)(lS,
{
width:"100%",
height:"auto",
className:"px-8 md:px-6"
})
})]
})]
})
}var lL=l(5895);
let lM=(0,
o.cn)(""),
lT=(0,
o.cn)(e=>!!e(lM));
function lE(e,
t){
let{
rootRef:l
}=t;
(null==l?void 0:l.current)&&(null==e||e.fromTo(l.current,
{
yPercent:100
},
{
yPercent:0,
duration:.35,
ease:"Power3.easeInOut"
},
0))
}let lP=()=>{
let e=(0,
a.Dv)(lT),
t=(0,
a.Dv)(lM),
l=(0,
i.useRef)(),
r=(0,
i.useRef)();
return r.current=W(lE,
{
rootRef:l
}),
z(()=>{
var t,
l;
e?null==r||null===(t=r.current)||void 0===t||t.play():null==r||null===(l=r.current)||void 0===l||l.reverse()
},
[e]),
(0,
n.jsx)("div",
{
ref:l,
className:"fixed bottom-0 left-0 w-full z-podcastPlayer h-[52px] bg-black translate-y-full",
children:t&&(0,
n.jsx)(lL.Z,
{
dark:!0,
url:t
})
})
};
function lz(e,
t){
let[l,
r]=(0,
i.useState)(!1),
n=(0,
i.useMemo)(()=>new IntersectionObserver(e=>{
let[t]=e;
return r(t.isIntersecting)
}),
[]);
(0,
i.useEffect)(()=>{
if(e)return n.observe(e),
()=>n.disconnect()
},
[e,
n]),
(0,
i.useEffect)(()=>{
l&&t()
},
[l,
t])
}function lB(e){
if(!e)return null;
let t=Math.floor(e/60);
return(t=t>=10?t:"0"+t)+":"+(e=(e=Math.floor(e%60))>=10?e:"0"+e)
}var lA=l(9854),
lH=l.n(lA);
let lO={
leading:!1,
trailing:!0
};
var lD=function(e){
let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:200,
l=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],
r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:lO;
return(0,
i.useCallback)(ec()(e,
t,
r),
l)
},
lV=function(){
let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{
distance:50,
pageOffset:!1,
ease:.05
},
t=arguments.length>1?arguments[1]:void 0,
l=(0,
i.useContext)(eC),
r=(0,
i.useRef)({

}),
n=(0,
i.useRef)({
currentX:0,
currentY:0,
x:0,
y:0,
width:0
}),
s=(0,
i.useRef)(),
a=function(r,
s){
var a,
i;
let o=arguments.length>2&&void 0!==arguments[2]&&arguments[2],
c=null==l?void 0:null===(a=l.current)||void 0===a?void 0:null===(i=a.lenis)||void 0===i?void 0:i.scroll,
d={
x:s.x-r.x,
y:s.y-r.y-(s.pageOffset?c:0)
},
u=Math.atan2(d.x,
d.y),
m=Math.sqrt(d.x*d.x+d.y*d.y),
{
isHovering:p,
align:h
}=t.current,
f=t.current.isHovering?s.width/1.5:e.distance;
if(m<f){
s.stick=!0;
let e=-Math.sin(u)*m/2.5,
t=-Math.cos(u)*m/2.5,
l=p?w.ZP.utils.clamp("right"===h?-999:-10,
"right"===h?10:999,
e):e,
r=p?w.ZP.utils.clamp(-999,
10,
t):t;
n.current={
...n.current,
x:l,
y:r
}
}else m>f&&(!1===p||o)&&(s.stick=!1,
n.current={
...n.current,
x:0,
y:0
})
};
(0,
i.useEffect)(()=>{
if(!R){
let t=()=>{
if(s.current){
let{
x:t,
y:l,
currentX:r,
currentY:a
}=n.current,
i=j()(a,
l,
e.ease),
o=j()(r,
t,
e.ease);
s.current.style.transform="translate(".concat(lH()(o,
1),
"px,
 ").concat(lH()(i,
1),
"px)");
let c=s.current.querySelector(".popup-image");
c&&(c.style.transform="translate(".concat(lH()((t-o)*.2,
1),
"px,
 ").concat(lH()((l-i)*.2,
1),
"px)")),
n.current.currentX=o,
n.current.currentY=i
}
};
return w.ZP.ticker.add(t),
()=>{
w.ZP.ticker.remove(t)
}
}
},
[]),
(0,
i.useEffect)(()=>{
let e;
if(!R){
let t=t=>{
var n,
s;
clearTimeout(e),
e=setTimeout(function(){
a({
x:i.pageX,
y:o
},
r.current,
!0)
},
400);
let i=t.detail&&t.detail.pageX?t.detail:t,
o=i.pageY-(null==l?void 0:null===(n=l.current)||void 0===n?void 0:null===(s=n.lenis)||void 0===s?void 0:s.scroll);
a({
x:i.pageX,
y:o
},
r.current)
};
return window.addEventListener("mousemove",
t,
{
passive:!0
}),
window.addEventListener("dragover",
t,
{
passive:!0
}),
()=>{
window.removeEventListener("mousemove",
t),
window.removeEventListener("dragover",
t)
}
}
},
[]);
let o=(0,
i.useCallback)(()=>{
var t,
n;
let a=null==l?void 0:null===(t=l.current)||void 0===t?void 0:null===(n=t.lenis)||void 0===n?void 0:n.scroll;
if(s.current){
let t=s.current.getBoundingClientRect();
r.current={
x:t.left+t.width/2,
width:t.width,
y:(e.pageOffset?t.top+a:t.top)+t.height/2,
pageOffset:e.pageOffset
}
}
},
[]);
return f(lD(o,
200,
[])),
(0,
i.useEffect)(o),
s
};
function lI(e){
let{
plusIconRef:t,
dark:l
}=e;
return(0,
n.jsxs)("svg",
{
className:(0,
s.Z)(l?"outline-white":"outline-black",
"outline outline-1"),
width:"1.9rem",
height:"1.9rem",
viewBox:"0 0 19 19",
fill:"none",
xmlns:"http://www.w3.org/2000/svg",
ref:t,
children:[(0,
n.jsx)("rect",
{
width:"19",
height:"19",
fill:l?"black":"white"
}),
(0,
n.jsx)("path",
{
d:"M9.5 6.6499L9.5 12.3499",
stroke:l?"white":"black",
strokeLinecap:"square",
strokeLinejoin:"round"
}),
(0,
n.jsx)("path",
{
d:"M6.64844 9.5L12.3484 9.5",
stroke:l?"white":"black",
strokeLinecap:"square",
strokeLinejoin:"round"
})]
})
}function lF(e){
let{
dark:t,
className:l
}=e;
return(0,
n.jsxs)("svg",
{
className:l,
width:"2rem",
height:"2rem",
viewBox:"0 0 20 20",
fill:"none",
xmlns:"http://www.w3.org/2000/svg",
children:[(0,
n.jsx)("rect",
{
width:"20",
height:"20",
rx:"10",
fill:t?"black":"white"
}),
(0,
n.jsx)("path",
{
fillRule:"evenodd",
clipRule:"evenodd",
d:"M9.06457 7.52506L8.71101 7.17151L8.00391 7.87862L8.35746 8.23217L10.1252 9.99995L8.35746 11.7677L8.00391 12.1213L8.71101 12.8284L9.06457 12.4748L10.8324 10.7071L10.836 10.7107L11.5431 10.0036L11.5395 9.99995L11.1896 9.65006L10.8324 9.29285L9.06457 7.52506Z",
fill:t?"white":"black"
})]
})
}function lq(e){
let{
article:t,
tag:l,
loading:r,
popupRef:o,
dark:c,
align:d="right"
}=e,
u=(0,
a.b9)(l8),
m=(0,
a.b9)(l7),
p=(0,
i.useRef)(),
h=(0,
i.useRef)(),
f=(0,
i.useRef)(),
x=(0,
i.useRef)();
(0,
i.useEffect)(()=>{
var e;
let t=w.p8.timeline();
return t.add(function(e,
t){
if(e)return w.p8.fromTo(e,
{
opacity:0,
rotate:"4deg",
x:"left"===t?"-10%":"10%"
},
{
opacity:1,
rotate:"0deg",
x:"0%",
transformOrigin:"bottom left",
duration:.6,
ease:"expo.out"
})
}(p.current,
d),
0),
t.add(function(e,
t){
if(e)return w.p8.fromTo(e,
{
opacity:0,
rotate:"15deg",
scaleY:0
},
{
opacity:1,
rotate:"0deg",
scaleY:"100%",
duration:.4,
transformOrigin:"left"===t?"bottom left":"0% 100%",
ease:"expo.out"
})
}(h.current,
d),
0),
t.add(void((e=f.current)&&w.p8.fromTo(e,
{
scale:0,
rotate:"90deg"
},
{
scale:1,
rotate:"0deg",
duration:.8,
ease:"expo.out"
})),
0),
()=>{
t.revert(),
t.kill()
}
},
[r]);
let v=e=>{
e.preventDefault(),
m(l),
u(!0)
},
g="left"===d,
b=r?"Loading...":"Explore ".concat(null==l?void 0:l.title);
return(0,
n.jsxs)("div",
{
className:(0,
s.Z)("flex flex-col items-end cursor-pointer",
"left"===d&&"!items-start"),
ref:o,
onClick:v,
children:[!r&&(0,
n.jsx)("div",
{
className:"mb-[1rem] w-60 h-60 popup-image",
ref:h,
children:(0,
n.jsx)(ty,
{
image:null==t?void 0:t.featuredImage,
aspect:1,
imageSizes:"15rem"
})
}),
(0,
n.jsxs)("div",
{
className:"flex",
children:[g&&(0,
n.jsx)("div",
{
ref:f,
children:(0,
n.jsx)(lF,
{
dark:c
})
}),
(0,
n.jsx)("div",
{
className:(0,
s.Z)(g?"ml-px":"mr-px",
"relative flex items-center h-[2rem] rounded-full",
c?"bg-black text-white":"bg-white text-black"),
ref:p,
children:(0,
n.jsx)(E,
{
ref:x,
className:"px-4",
"aria-label":b,
children:b
})
}),
!g&&(0,
n.jsx)("div",
{
ref:f,
children:(0,
n.jsx)(lF,
{
dark:c
})
})]
})]
})
}function lW(e){
let{
dark:t
}=e,
l=(0,
i.useRef)();
return(0,
i.useEffect)(()=>{
var e;
(e=l.current)&&w.p8.fromTo(e,
{
scale:0,
rotate:"4deg"
},
{
scale:1,
rotate:"0deg",
duration:1.4,
ease:"expo.out"
})
},
[]),
(0,
n.jsx)("div",
{
className:(0,
s.Z)("flex items-center mr-px h-[2rem] rounded-full",
t?"bg-black text-white":"bg-white text-black"),
ref:l,
children:(0,
n.jsx)(E,
{
className:"px-4",
children:"More on this topic"
})
})
}function lY(e){
let{
onHoveringChanged:t,
currentArticle:l,
hint:r,
tag:s,
dark:o,
align:c="right",
className:d="expand-hitbox absolute flex bottom-8 right-8 z-article-preview"
}=e,
[u,
m]=(0,
i.useState)(!1),
[p,
h]=(0,
i.useState)(null),
[f,
x]=(0,
i.useState)(!1),
[v,
g]=(0,
i.useState)(),
b=(0,
i.useRef)(),
j=(0,
i.useRef)({
isHovering:!1,
align:c
}),
y=(0,
a.b9)(l8),
N=(0,
a.b9)(l7);
(0,
i.useEffect)(()=>{
j.current.isHovering=v
},
[v]);
let k=lV({
distance:50,
pageOffset:!1,
ease:.05
},
j),
C=(0,
i.useRef)(),
Z=(0,
i.useRef)({

}),
S=(0,
i.useCallback)(async()=>{
if(Z.current.timeoutId&&clearTimeout(Z.current.timeoutId),
m(!0),
g(!0),
null==t||t(!0),
!p)try{
var e;
x(!0);
let t=await fetch("/api/articles?tag=".concat(null==s?void 0:s._id,
"&limit=2")),
r=await t.json(),
n=(e=null==r?void 0:r.items)?e.filter(e=>{
if(null==l?void 0:l.podcastSeries){
var t,
r,
n,
s;
return e._id!==l._id&&(null===(t=e.podcastSeries)||void 0===t?void 0:null===(r=t.slug)||void 0===r?void 0:r.current)!==(null===(n=l.podcastSeries)||void 0===n?void 0:null===(s=n.slug)||void 0===s?void 0:s.current)
}return e._id!==l._id
}):[null];
h(n[0])
}catch(e){
throw Error('Could not retrieve article from tag ID "'.concat(null==s?void 0:s._id,
'"'))
}finally{
x(!1)
}
},
[p,
l,
s,
t]);
(0,
i.useEffect)(()=>{
v||b.current&&w.p8.fromTo(b.current,
{
scale:0
},
{
scale:1,
duration:1.2,
ease:"expo.out"
})
},
[v]),
(0,
i.useEffect)(()=>{
if(!u){
let e=setTimeout(()=>{
!function(e,
t){
let l=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"right";
e.current&&w.p8.to(e.current,
{
y:"8%",
rotate:"left"===l?"3deg":"-3deg",
opacity:0,
duration:.4,
transformOrigin:"left"===l?"bottom left":"bottom right",
ease:"expo.out",
onComplete:()=>{
t(!1)
}
})
}(C,
g,
c)
},
500);
return Z.current.timeoutId=e,
()=>{
clearTimeout(e)
}
}
},
[u,
c]);
let _=()=>{
m(!1),
null==t||t(!1)
},
L=(0,
i.useCallback)(e=>{
R&&(e.preventDefault(),
(null==s?void 0:s._id)&&(N(s),
y(!0)))
},
[S,
s]);
return(null==s?void 0:s._id)?(0,
n.jsxs)("div",
{
className:d,
onMouseEnter:S,
onMouseLeave:_,
onClick:L,
ref:k,
children:[v&&(0,
n.jsx)(lq,
{
article:p,
tag:s,
loading:f,
popupRef:C,
dark:!o,
align:c
}),
!v&&r&&(0,
n.jsx)(lW,
{
dark:o
}),
!v&&(0,
n.jsx)(lI,
{
plusIconRef:b,
dark:o
})]
}):null
}function lG(e){
let{
className:t
}=e;
return(0,
n.jsx)("svg",
{
className:t,
viewBox:"0 0 6 7",
fill:"none",
xmlns:"http://www.w3.org/2000/svg",
children:(0,
n.jsx)("path",
{
d:"M6 3.50023L1.73996e-07 6.96434L4.76837e-07 0.0361326L6 3.50023Z",
fill:"currentColor"
})
})
}l(6026),
l(9983);
var lK=l(2757),
lU=l.n(lK);
function lX(e){
let{
kicker:t,
title:l,
className:r,
tagStyle:a="title52",
mdTagStyle:o="title20",
...c
}=e,
{
inView:d,
ref:u
}=(0,
eY.YD)({
triggerOnce:!1
}),
m=(0,
i.useRef)(),
p=(0,
i.useRef)({
visible:!1
});
(0,
i.useEffect)(()=>{
let e=()=>{
p.current.split&&p.current.split.revert();
let e=new(lU())(m.current,
{
type:"lines,
 words",
linesClass:"split-line"
});
w.ZP.set(m.current,
{
opacity:1
}),
w.ZP.set(e.words,
{
opacity:p.current.visible?1:0
}),
p.current.split=e
};
return window.addEventListener("resize",
e),
e(),
()=>{
p.current.split.revert(),
p.current.split=null,
delete p.split
}
},
[]),
(0,
i.useEffect)(()=>{
if(d){
let e=p.current.split;
w.ZP.to(e.words,
{
opacity:1,
stagger:.1,
duration:1.8,
ease:"sine.out"
}),
p.current.visible=!0
}
},
[d]);
let h=ts(u,
m);
return(0,
n.jsxs)(n.Fragment,
{
children:[(0,
n.jsx)(t_,
{
as:"h2",
tagStyle:a,
mdTagStyle:o,
ref:h,
className:(0,
s.Z)("opacity-0",
r),
...c
}),
(0,
n.jsx)("h2",
{
className:"sr-only",
children:l
}),
t&&(0,
n.jsx)(tZ,
{
className:"mt-4",
children:t
})]
})
}function lJ(e){
let{
title:t,
isFeatureArticle:l,
className:r,
...a
}=e,
[o,
c]=(0,
i.useState)(!1);
tC(e=>{
e&&c(e.scroll>80)
});
let d=(0,
i.useRef)(),
u=(0,
i.useRef)({
visible:!1
});
(0,
i.useEffect)(()=>{
let e=()=>{
u.current.split&&u.current.split.revert();
let e=new(lU())(d.current,
{
type:"lines,
 words",
linesClass:"split-line"
});
w.ZP.set(d.current,
{
opacity:1
}),
w.ZP.set(e.words,
{
opacity:u.current.visible?1:0
}),
u.current.split=e
};
return window.addEventListener("resize",
e),
e(),
()=>{
u.current.split.revert(),
u.current.split=null,
delete u.split
}
},
[]),
(0,
i.useEffect)(()=>{
if(o){
let e=u.current.split;
w.ZP.to(e.words,
{
opacity:1,
stagger:.1,
duration:1.8,
ease:"sine.out"
}),
u.current.visible=!0
}
},
[o]);
let m=ts(d);
return(0,
n.jsxs)(n.Fragment,
{
children:[(0,
n.jsx)(t_,
{
as:"h2",
tagStyle:l?"h1":"h2",
ref:m,
className:(0,
s.Z)("opacity-0",
r),
...a,
children:t
}),
(0,
n.jsx)("h2",
{
className:"sr-only",
children:t
})]
})
}w.ZP.registerPlugin(lU());
let l$={
sm:"aspect-[467/790] md:aspect-[374/500]",
lg:"aspect-[3/2]",
square:"aspect-[453/583] md:aspect-[374/500]"
},
lQ={
square:()=>1,
sm:()=>453/463,
lg:()=>1.5,
overlay:e=>"video"===e?16/9:"in_perspective"===e?9/16:1
},
l0={
square:()=>1,
sm:()=>1,
lg:()=>1.5,
overlay:()=>372/398
},
l1={
square:"border aspect-[1/1] md:aspect-[1/1]",
sm:"aspect-[453/463] md:aspect-[1]",
lg:"aspect-[3/2] md:aspect-[3/2]"
},
l2=(0,
i.forwardRef)((e,
t)=>{
var l,
r;
let{
className:a,
size:o="sm",
article:c,
overlay:d,
index:u,
hasPreview:m,
headingStyle:p,
animateIn:h=!1,
isRelated:f=!1,
page:x
}=e,
{
title:v,
category:g,
tag:b,
kicker:j,
pageType:y,
podcastSeries:N,
episodeNumber:k,
videoShort:C,
videoCategory:Z
}=c||{

},
R=j||((null==x?void 0:x._type)==="category"&&b?null==b?void 0:b.title:null==g?void 0:g.title),
S="podcast"===y,
_="video"===y||"in_perspective"===y,
[L,
M]=(0,
i.useState)(!0),
T=(0,
i.useRef)(),
[P,
z]=(0,
i.useState)(!1),
B=null==C?void 0:null===(l=C.asset)||void 0===l?void 0:null===(r=l.data)||void 0===r?void 0:r.duration,
A=()=>(function(e,
t,
l){
if(l&&e)return w.p8.to(e,
{
opacity:1,
y:0,
delay:.08*(t%6),
ease:"expo.out",
duration:1.2
})
})(null==T?void 0:T.current,
u,
h);
(0,
i.useEffect)(()=>{
L&&M(!1)
},
[T,
L,
M]);
let{
eventListeners:H
}=tl({
onMouseEnter:()=>{
z(!0)
},
onMouseLeave:()=>{
z(!1)
}
});
lz(null==T?void 0:T.current,
A);
let O=(null==Z?void 0:Z.title)?Z.title:"Video";
return B&&(O+=" "+lB(B)),
(0,
n.jsx)("article",
{
className:(0,
s.Z)("article-tile",
a,
h&&"opacity-0 -translate-y-12"),
ref:t||T,
children:(0,
n.jsxs)(en,
{
link:c,
showText:!1,
className:(0,
s.Z)(!d&&l$[o]),
...H,
children:[(0,
n.jsx)(l3,
{
hasPreview:m,
article:c,
size:o,
isRelated:f,
overlay:d
}),
S&&(0,
n.jsxs)("div",
{
className:(0,
s.Z)("flex items-center gap-4 mb-5",
"md:mb-4"),
children:[(0,
n.jsx)(lG,
{
className:"block w-[7px]"
}),
!!k&&(0,
n.jsxs)(E,
{
className:" flex items-center",
children:["EP ",
k]
}),
!!N&&(0,
n.jsx)(E,
{
children:null==N?void 0:N.title
})]
}),
(!S&&R||f&&_)&&(0,
n.jsx)(tZ,
{
videoTag:_,
className:(0,
s.Z)(d&&"leading-[0.9]",
"mb-3 md:mb-3"),
delay:.2*(u%6),
dotStyle:{
color:P?null==g?void 0:g.pageTheme:null
},
children:_?O:R
}),
(0,
n.jsx)(t_,
{
className:(0,
s.Z)("lg"===o&&"w-full",
d&&"mt-4 mb-12 md:mb-4 order-1"),
as:"h3",
tagStyle:p||(f?"title24":"sm"===o)||("overlay"===o?"h5":"title32"),
mdTagStyle:"title24",
children:v
})]
})
})
});
function l3(e){
let{
article:t,
hasPreview:l,
size:r,
isRelated:s,
overlay:a
}=e,
{
featuredImage:i,
tag:o,
pageType:c,
podcastQuote:u,
videoShort:m
}=t||{

},
p="podcast"===c,
h=(null==i||!i.fill)&&("podcast"===c||"video"===c)||(null==i?void 0:i.fill)==="contain",
f=p?"square":r,
x=lQ[f](c),
v=l0[f](c);
return p&&!s&&u?(0,
n.jsx)(l6,
{
article:t,
size:a?"square":r,
hasPreview:l
}):"video"===c&&m?(0,
n.jsx)(l5,
{
article:t,
size:a?"square":r,
hasPreview:l
}):(0,
n.jsxs)("div",
{
className:"relative mb-3 overflow-hidden",
children:[(0,
n.jsx)(ty,
{
image:i,
aspect:x,
mobileAspect:v,
contain:h,
imageSizes:"(max-width: ".concat(d().md,
") 100vw,
 ").concat("sm"!==r?"50vw":"33vw")
}),
l&&(0,
n.jsx)(lY,
{
tag:o,
currentArticle:t
})]
})
}function l6(e){
let{
size:t,
article:l,
hasPreview:r
}=e,
{
featuredImage:a,
tag:i,
title:o,
podcastQuote:c
}=l||{

};
return(0,
n.jsxs)("div",
{
className:"relative mb-5 overflow-hidden aspect-square",
children:[(0,
n.jsxs)("div",
{
className:(0,
s.Z)(l1[t],
"text-white p-6"),
style:{
backgroundColor:ev().black
},
children:[(0,
n.jsx)(lX,
{
title:o,
tagStyle:"lg"===t?"title32":"title24",
mdTagStyle:"title20",
children:c
}),
(0,
n.jsx)(ty,
{
className:"!absolute bottom-5 !right-5 w-[16vw] md:w-[40vw]",
image:a,
aspect:1,
mobileAspect:1,
imageSizes:"(max-width: ".concat(d().md,
") 100vw,
 33vw")
})]
}),
r&&(0,
n.jsx)(lY,
{
tag:i,
currentArticle:l
})]
})
}function l5(e){
var t,
l,
r;
let{
size:a,
article:i,
hasPreview:o
}=e,
{
featuredImage:c,
tag:u,
videoBgColour:m
}=i||{

},
p=(null==c?void 0:null===(t=c.asset)||void 0===t?void 0:null===(l=t.metadata)||void 0===l?void 0:null===(r=l.dimensions)||void 0===r?void 0:r.aspectRatio)<1;
return(0,
n.jsxs)("div",
{
className:"relative mb-5 overflow-hidden group",
children:[(0,
n.jsxs)("div",
{
className:(0,
s.Z)(l1[a],
"text-white p-6"),
style:{
backgroundColor:m||ev().black
},
children:[(0,
n.jsxs)("div",
{
className:"absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-[1px]",
children:[(0,
n.jsx)(E,
{
className:"transition-colors duration-100 bg-white text-black px-3 py-[0.5rem] leading-none group-hover:bg-black group-hover:text-white",
children:"play"
}),
(0,
n.jsx)("div",
{
className:"transition-colors duration-100 bg-white text-black px-3 py-[0.5rem] shrink-0 flex items-center justify-center group-hover:bg-black group-hover:text-white",
children:(0,
n.jsx)(lG,
{
className:"w-[0.7rem]"
})
})]
}),
(0,
n.jsx)(ty,
{
className:(0,
s.Z)("!absolute inset-0",
p&&"[&_img]:!scale-[0.8]"),
image:c,
contain:p,
imageSizes:"(max-width: ".concat(d().md,
") 100vw,
 33vw"),
showPreview:!p
})]
}),
o&&(0,
n.jsx)(lY,
{
tag:u,
currentArticle:i
})]
})
}function l4(e){
let{
className:t="mt-[27.1rem] pb-32 grid gap-8 grid-cols-3 md:grid-cols-1",
articles:l,
setOverlayOpen:r,
getArticlesByTag:s
}=e,
a=(0,
i.useRef)(null);
return lz(a.current,
s),
(0,
n.jsxs)("div",
{
className:t,
"data-lenis-prevent":!0,
children:[(null==l?void 0:l.length)===0&&(0,
n.jsx)(E,
{
children:"Loading..."
}),
l&&(null==l?void 0:l.length)!==0&&l.map((e,
t)=>(0,
n.jsx)("div",
{
onClick:()=>r(!1),
children:(0,
n.jsx)(l2,
{
article:e,
index:t,
size:"overlay",
animateIn:!0,
overlay:!0
})
},
(null==e?void 0:e._id)+t)),
(0,
n.jsx)("div",
{
ref:a
})]
})
}let l8=(0,
o.cn)(!1),
l7=(0,
o.cn)(null);
function l9(){
let e=(0,
a.b9)(l8),
t=(0,
a.b9)(eZ),
l=(0,
a.Dv)(l7),
[r,
o]=(0,
i.useState)([]),
[c,
d]=(0,
i.useState)(!0),
u=(0,
i.useRef)(),
m=(0,
i.useRef)(),
p=(0,
i.useRef)({
index:0
}),
[h,
f]=(0,
i.useState)(!1);
(0,
i.useEffect)(()=>{
u.current&&w.p8.fromTo(u.current,
{
y:"101%"
},
{
y:"0%",
duration:.6,
ease:"expo.out"
})
},
[]);
let x=(0,
i.useCallback)(async()=>{
if(!p.current.loading)try{
f(!0);
let e=p.current.index;
p.current.loading=!0;
let t=await fetch("/api/articles?tag=".concat(null==l?void 0:l._id,
"&index=").concat(e,
"&limit=9")),
r=await t.json();
o(e=>[...e,
...r.items]),
p.current.index+=1
}catch(e){
throw Error('Could not retrieve articles from tag ID "'.concat(null==l?void 0:l._id,
'"'))
}finally{
f(!1),
p.current.loading=!1
}
},
[null==l?void 0:l._id]);
(0,
i.useEffect)(()=>{
if(!c){
t(!1),
u.current&&w.p8.to(u.current,
{
y:"101%",
duration:.6,
ease:"expo.out",
onComplete:()=>{
e(!1)
}
});
return
}t(!0),
x(null==l?void 0:l._id)
},
[c,
x,
l,
e,
t]);
let v=()=>{
d(!1)
};
F(d);
let{
styles:g,
className:b
}=(0,
eg.HG)();
return(0,
n.jsxs)("div",
{
className:(0,
s.Z)(b,
c?"":"pointer-events-none"),
style:g,
children:[(0,
n.jsx)(t8,
{
ref:u,
extraClasses:"p-8 md:p-6",
overlay:!0,
themeClassName:b,
children:(0,
n.jsxs)("div",
{
"data-lenis-prevent":!0,
children:[(0,
n.jsx)(tZ,
{
children:"More on"
}),
(0,
n.jsx)(t_,
{
as:"h2",
className:"mt-5 capitalize",
children:null==l?void 0:l.title
}),
(0,
n.jsx)(l4,
{
articles:r,
setOverlayOpen:d,
getArticlesByTag:x
})]
})
}),
h?(0,
n.jsx)(E,
{
className:(0,
s.Z)("fixed bottom-8 right-[calc(2rem+var(--scrollbarWidth))] z-overlay md:right-6"),
children:"loading..."
}):null,
(0,
n.jsx)(U,
{
ref:m,
invertTheme:!0,
className:"fixed top-8 right-[calc(2rem+var(--scrollbarWidth))] z-overlay md:right-6",
onClick:v,
"aria-label":"close",
rounded:!1,
border:!1,
children:"Close"
})]
})
}let re=e=>{
let{
page:t
}=e,
{
pageTheme:l,
errorPageMessage:r
}=null!=t?t:{

},
s=(0,
i.useRef)();
return(0,
n.jsx)(en,
{
ref:s,
link:"/",
showText:!1,
children:(0,
n.jsx)("div",
{
style:{
backgroundColor:l
},
className:"h-screen min-h-screen flex justify-center items-center",
children:r&&(0,
n.jsx)(E,
{
className:"leading-8 text-center whitespace-pre",
children:r
})
})
})
};
var rt=l(5161),
rl=l.n(rt),
rr=l(8863),
rn=l.n(rr);
function rs(e){
let{
isPaired:t
}=e;
return(0,
n.jsx)("div",
{
className:(0,
s.Z)("h-[1px] bg-current mb-7 mt-40 md:mt-24",
t&&"mt-7 mb-40 md:mb-24 md:mt-7")
})
}function ra(e){
let{
variables:t,
animation:l,
triggerRef:r,
scrollerRef:n,
pinRef:s,
endRef:a
}=e,
o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],
c=arguments.length>2&&void 0!==arguments[2]?arguments[2]:R,
d=(0,
i.useRef)(),
u=e2();
return(0,
i.useEffect)(()=>{
var e,
i,
o;
if(c)return;
let m=ep().create({
...t,
pin:null!==(e=null==s?void 0:s.current)&&void 0!==e?e:null,
endTrigger:null!==(i=null==a?void 0:a.current)&&void 0!==i?i:null,
trigger:null==r?void 0:r.current,
scroller:null!==(o=null==n?void 0:n.current)&&void 0!==o?o:u(),
animation:null!=l?l:null
});
return d.current=m,
()=>{
null==m||m.kill()
}
},
null!=o?o:[]),
d
}let ri="col-start-4 lg:col-start-3 lg:col-end-11 col-end-10 md:col-start-1 md:col-span-full",
ro="[&_ol]:list-decimal [&_ul]:list-disc [&_ol]:ml-10 [&_ul]:ml-10 [&_ul]:mt-[1.5em] [&_a]:font-normal [&_a]:underline [&_a:hover]:opacity-50 [&_.heading-6]:mb-2 [&_.heading]:font-bold [&>.rich-content-inner>p+.heading]:mt-24";
function rc(e){
let{
data:t
}=e,
{
text:l,
content:r,
paddingTopSize:a,
paddingBottomSize:i
}=t;
return(0,
n.jsx)("div",
{
className:(0,
s.Z)("rich-text-slice share-tooltip",
0===a?"":2===a?"pt-40":3===a?"pt-52":"pt-16 p",
0===i?"":1===i?"pb-16":2===i?"pb-40":"pb-52"),
children:(0,
n.jsx)(rz,
{
content:l||r,
innerClassName:"rich-content-inner grid grid-cols-12 gap-8 gap-y-0 px-8 mx-auto md:grid-cols-4 md:px-6",
className:(0,
s.Z)("text-24 md:text-18 leading-[1.25]",
"[&>.rich-content-inner>*:not(.rich-content-full-width)]:col-start-4 [&>.rich-content-inner>*:not(.rich-content-full-width)]:col-end-10 [&>.rich-content-inner>*:not(.rich-content-full-width)]:lg:col-start-3 [&>.rich-content-inner>*:not(.rich-content-full-width)]:lg:col-end-11 [&>.rich-content-inner>*:not(.rich-content-full-width)]:md:col-start-1 [&>.rich-content-inner>*:not(.rich-content-full-width)]:md:col-span-full [&>.rich-content-inner>.rich-content-full-width]:col-span-full [&>.rich-content-inner>p+p]:mt-[1.5em] [&>.rich-content-inner>:not(.rich-content-slice)+.rich-content-slice]:mt-[10rem] [&>.rich-content-inner>.rich-content-slice+:not(.rich-content-slide)]:mt-[10rem] ",
"[&_h1]:text-[7.2rem] md:[&_h1]:text-[4.4rem] [&_h1]:tracking-[-0.02rem] [&_h2]:text-[6.4rem] md:[&_h2]:text-[4rem] [&_h3]:text-[5.2rem] md:[&_h3]:text-[3.2rem] [&_h1]:tracking-[-0.02rem] [&_h4]:text-[3.2rem] md:[&_h4]:text-[2.4rem] [&_h5]:text-[2.4rem] md:[&_h5]:text-[1.8rem] [&_h6]:text-[1.6rem]",
ro)
})
})
}function rd(e){
let{
node:{
imagePosition:t,
image:l,
content:r
}
}=e,
a=(0,
i.useRef)(),
o=(0,
i.useRef)();
return ra({
triggerRef:a,
pinRef:a,
endRef:o,
variables:{
start:"center center",
end:"bottom bottom",
pinSpacing:!1
}
},
[]),
(0,
n.jsxs)(tN,
{
ref:o,
grid:!0,
noGutter:!0,
noBottomMargin:!0,
className:"rich-content-slice rich-content-full-width image-text medium:flex medium:flex-col",
children:[(0,
n.jsxs)("div",
{
className:(0,
s.Z)("col-start-4",
"col-span-6"),
children:[l&&(0,
n.jsx)(ty,
{
image:l,
imageSizes:"50vw"
}),
(null==l?void 0:l.caption)&&(0,
n.jsx)(E,
{
children:l.caption
})]
}),
(0,
n.jsx)("div",
{
className:(0,
s.Z)("row-start-1 col-span-2",
"left"===t?"col-end-13":"col-start-1",
"lg:col-span-3",
"medium:col-span-full"),
children:r&&(0,
n.jsx)("div",
{
ref:a,
className:(0,
s.Z)("text-[1.2rem] leading-[1.125] md:text-[1rem]",
ro,
"[&_p]:font-mono",
"[&_p]:mb-6"),
children:(0,
n.jsx)(rn(),
{
blocks:r
})
})
})]
})
}w.ZP.registerPlugin(lU());
let ru=function(e){
let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,
l=arguments.length>2&&void 0!==arguments[2]?arguments[2]:.7,
r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,
n=w.ZP.timeline();
return N()(e.blurElements,
(e,
s)=>{
n.to(e.element,
{
yPercent:0,
rotate:0,
opacity:1,
duration:t,
ease:"expo.out"
},
0===s?r:"-=".concat(l))
}),
n.eventCallback("onComplete",
()=>{
e.animatedIn=!0
}),
n
},
rm=(0,
i.forwardRef)((e,
t)=>{
let{
children:l,
onTimelineCreated:r,
duration:a=1,
stagger:o=.7,
delay:c=0,
text:d,
animateWhenInView:u=!0,
className:m,
revertOnComplete:p=!1
}=e,
h=(0,
i.useRef)(),
x=(0,
i.useRef)(),
[v,
g]=(0,
eY.YD)({
threshold:0,
triggerOnce:!0
}),
[b,
j,
y]=function(e){
let t=(0,
i.useRef)({

}),
l=t.current,
r=(0,
i.useCallback)(t=>{
l.split=new(lU())(t,
{
type:"lines,
 words",
linesClass:"split-line"
}),
w.ZP.set(l.split.words,
{
yPercent:0,
rotate:0,
opacity:0
}),
l.blurElements=l.split.words.map(e=>({
yPercent:0,
rotate:0,
element:e,
opacity:0
})),
t.classList.remove("pre-splittext"),
e||w.ZP.set(t,
{
opacity:1
}),
l.animatedIn?w.ZP.set(l.split.words,
{
yPercent:0,
rotate:0,
opacity:1
}):w.ZP.set(l.split.words,
{
yPercent:0,
rotate:0,
opacity:0
}),
l.el=t
},
[l]),
n=(0,
i.useCallback)(()=>{
l.split&&(l.split.revert(),
delete l.targets,
delete l.split)
},
[l]);
return[t,
r,
n]
}(u),
N=(0,
i.useCallback)(e=>{
if(y(),
j(h.current),
x.current&&x.current.kill(),
x.current=ru(b.current,
a,
o,
c),
!e&&b.current.animatedIn){
if(p){
y();
return
}x.current.pause()
}r&&r(x.current)
},
[y,
j,
r]);
return(0,
i.useEffect)(()=>{
N(!1)
},
[j]),
f(lD(()=>{
b.current.el&&N(!1)
},
150,
[N]),
!1,
!0),
(0,
i.useEffect)(()=>{
u&&g&&(w.ZP.set(h.current,
{
opacity:1
}),
x.current.restart())
},
[u,
g,
b,
j]),
(0,
i.useEffect)(()=>()=>{
y()
},
[y]),
(0,
n.jsxs)("div",
{
className:(0,
s.Z)(m,
"pre-splittext opacity-0 [&_.split-line]:overflow-hidden [&_.split-line]:pb-[0.12em] [&_.split-line]:mb-[-0.12em]"),
ref:ts(t,
v,
h),
children:[d,
l]
})
});
rm.displayName="SplitUpText";
let rp=e=>"h1"===e?"text-[9.6rem] md:text-[3.6rem]":"text-[6.4rem] md:text-[3.5rem]";
function rh(e){
let{
node:t
}=e,
{
attribution:l,
quote:r,
titleSize:a,
image:o
}=t,
c=(0,
i.useRef)(),
u=(0,
i.useRef)();
return q(()=>{
var e,
t,
l,
r;
if(!o||R||window.innerWidth<d().md)return;
let n=null===(e=null==c?void 0:null===(t=c.current)||void 0===t?void 0:t.children[0])||void 0===e?void 0:null===(l=e.getBoundingClientRect)||void 0===l?void 0:null===(r=l.call(e))||void 0===r?void 0:r.height,
s=w.ZP.timeline({
scrollTrigger:{
scroller:document.body,
trigger:c.current,
start:"top bottom",
end:"bottom top",
scrub:!0,
invalidateOnRefresh:!0
}
});
return s.fromTo(u.current,
{
y:()=>.2*window.innerWidth+.5*n,
ease:"linear"
},
{
y:()=>-(.3*window.innerWidth)
}),
()=>{
s.revert(),
s.kill()
}
},
[o]),
(0,
n.jsxs)("div",
{
ref:c,
className:"rich-content-slice rich-content-full-width w-full quote relative",
children:[(0,
n.jsx)("blockquote",
{
className:(0,
s.Z)(rp(a),
"font-bold leading-none",
!!o&&"upMd:min-h-[60vh]"),
children:(0,
n.jsx)(rm,
{
animateWhenInView:!0,
duration:.6,
stagger:.55,
delay:.25,
tag:"div",
children:r
})
}),
l&&(0,
n.jsx)(tZ,
{
delay:0,
className:"mt-24 md:mt-8",
truncate:!1,
children:l
}),
o&&(0,
n.jsx)(tN,
{
grid:!0,
noGutter:!0,
noBottomMargin:!0,
className:"upMd:mb-[-40vh] md:mt-8",
children:(0,
n.jsxs)("div",
{
ref:u,
className:(0,
s.Z)("column",
ri),
children:[o&&(0,
n.jsx)(ty,
{
image:o,
imageSizes:"(max-width: ".concat(d().md,
") 100vw,
 '50vw'
}")
}),
(null==o?void 0:o.caption)&&(0,
n.jsx)(E,
{
children:o.caption
})]
})
})]
})
}