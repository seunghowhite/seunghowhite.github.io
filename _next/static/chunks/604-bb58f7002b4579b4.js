"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[604],{8792:function(e,r,t){t.d(r,{default:function(){return n.a}});var o=t(5250),n=t.n(o)},3167:function(e,r,t){t.d(r,{W:function(){return o}});function o(){for(var e,r,t=0,o="",n=arguments.length;t<n;t++)(e=arguments[t])&&(r=function e(r){var t,o,n="";if("string"==typeof r||"number"==typeof r)n+=r;else if("object"==typeof r){if(Array.isArray(r)){var l=r.length;for(t=0;t<l;t++)r[t]&&(o=e(r[t]))&&(n&&(n+=" "),n+=o)}else for(o in r)r[o]&&(n&&(n+=" "),n+=o)}return n}(e))&&(o&&(o+=" "),o+=r);return o}},4848:function(e,r,t){t.d(r,{F:function(){return c},f:function(){return u}});var o=t(2265),n=(e,r,t,o,n,l,s,a)=>{let i=document.documentElement,d=["light","dark"];function c(r){(Array.isArray(e)?e:[e]).forEach(e=>{let t="class"===e,o=t&&l?n.map(e=>l[e]||e):n;t?(i.classList.remove(...o),i.classList.add(r)):i.setAttribute(e,r)}),a&&d.includes(r)&&(i.style.colorScheme=r)}if(o)c(o);else try{let e=localStorage.getItem(r)||t,o=s&&"system"===e?window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light":e;c(o)}catch(e){}},l=["light","dark"],s="(prefers-color-scheme: dark)",a="undefined"==typeof window,i=o.createContext(void 0),d={setTheme:e=>{},themes:[]},c=()=>{var e;return null!=(e=o.useContext(i))?e:d},u=e=>o.useContext(i)?o.createElement(o.Fragment,null,e.children):o.createElement(b,{...e}),p=["light","dark"],b=e=>{let{forcedTheme:r,disableTransitionOnChange:t=!1,enableSystem:n=!0,enableColorScheme:a=!0,storageKey:d="theme",themes:c=p,defaultTheme:u=n?"system":"light",attribute:b="data-theme",value:y,children:v,nonce:w,scriptProps:x}=e,[k,z]=o.useState(()=>f(d,u)),[C,S]=o.useState(()=>f(d)),E=y?Object.values(y):c,j=o.useCallback(e=>{let r=e;if(!r)return;"system"===e&&n&&(r=h());let o=y?y[r]:r,s=t?g(w):null,i=document.documentElement,d=e=>{"class"===e?(i.classList.remove(...E),o&&i.classList.add(o)):e.startsWith("data-")&&(o?i.setAttribute(e,o):i.removeAttribute(e))};if(Array.isArray(b)?b.forEach(d):d(b),a){let e=l.includes(u)?u:null,t=l.includes(r)?r:e;i.style.colorScheme=t}null==s||s()},[w]),T=o.useCallback(e=>{let r="function"==typeof e?e(k):e;z(r);try{localStorage.setItem(d,r)}catch(e){}},[k]),P=o.useCallback(e=>{S(h(e)),"system"===k&&n&&!r&&j("system")},[k,r]);o.useEffect(()=>{let e=window.matchMedia(s);return e.addListener(P),P(e),()=>e.removeListener(P)},[P]),o.useEffect(()=>{let e=e=>{e.key===d&&(e.newValue?z(e.newValue):T(u))};return window.addEventListener("storage",e),()=>window.removeEventListener("storage",e)},[T]),o.useEffect(()=>{j(null!=r?r:k)},[r,k]);let M=o.useMemo(()=>({theme:k,setTheme:T,forcedTheme:r,resolvedTheme:"system"===k?C:k,themes:n?[...c,"system"]:c,systemTheme:n?C:void 0}),[k,T,r,C,n,c]);return o.createElement(i.Provider,{value:M},o.createElement(m,{forcedTheme:r,storageKey:d,attribute:b,enableSystem:n,enableColorScheme:a,defaultTheme:u,value:y,themes:c,nonce:w,scriptProps:x}),v)},m=o.memo(e=>{let{forcedTheme:r,storageKey:t,attribute:l,enableSystem:s,enableColorScheme:a,defaultTheme:i,value:d,themes:c,nonce:u,scriptProps:p}=e,b=JSON.stringify([l,t,i,r,c,d,s,a]).slice(1,-1);return o.createElement("script",{...p,suppressHydrationWarning:!0,nonce:"undefined"==typeof window?u:"",dangerouslySetInnerHTML:{__html:"(".concat(n.toString(),")(").concat(b,")")}})}),f=(e,r)=>{let t;if(!a){try{t=localStorage.getItem(e)||void 0}catch(e){}return t||r}},g=e=>{let r=document.createElement("style");return e&&r.setAttribute("nonce",e),r.appendChild(document.createTextNode("*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}")),document.head.appendChild(r),()=>{window.getComputedStyle(document.body),setTimeout(()=>{document.head.removeChild(r)},1)}},h=e=>(e||(e=window.matchMedia(s)),e.matches?"dark":"light")},1367:function(e,r,t){t.d(r,{m6:function(){return Q}});let o=e=>{let r=a(e),{conflictingClassGroups:t,conflictingClassGroupModifiers:o}=e;return{getClassGroupId:e=>{let t=e.split("-");return""===t[0]&&1!==t.length&&t.shift(),n(t,r)||s(e)},getConflictingClassGroupIds:(e,r)=>{let n=t[e]||[];return r&&o[e]?[...n,...o[e]]:n}}},n=(e,r)=>{if(0===e.length)return r.classGroupId;let t=e[0],o=r.nextPart.get(t),l=o?n(e.slice(1),o):void 0;if(l)return l;if(0===r.validators.length)return;let s=e.join("-");return r.validators.find(({validator:e})=>e(s))?.classGroupId},l=/^\[(.+)\]$/,s=e=>{if(l.test(e)){let r=l.exec(e)[1],t=r?.substring(0,r.indexOf(":"));if(t)return"arbitrary.."+t}},a=e=>{let{theme:r,prefix:t}=e,o={nextPart:new Map,validators:[]};return u(Object.entries(e.classGroups),t).forEach(([e,t])=>{i(t,o,e,r)}),o},i=(e,r,t,o)=>{e.forEach(e=>{if("string"==typeof e){(""===e?r:d(r,e)).classGroupId=t;return}if("function"==typeof e){if(c(e)){i(e(o),r,t,o);return}r.validators.push({validator:e,classGroupId:t});return}Object.entries(e).forEach(([e,n])=>{i(n,d(r,e),t,o)})})},d=(e,r)=>{let t=e;return r.split("-").forEach(e=>{t.nextPart.has(e)||t.nextPart.set(e,{nextPart:new Map,validators:[]}),t=t.nextPart.get(e)}),t},c=e=>e.isThemeGetter,u=(e,r)=>r?e.map(([e,t])=>[e,t.map(e=>"string"==typeof e?r+e:"object"==typeof e?Object.fromEntries(Object.entries(e).map(([e,t])=>[r+e,t])):e)]):e,p=e=>{if(e<1)return{get:()=>void 0,set:()=>{}};let r=0,t=new Map,o=new Map,n=(n,l)=>{t.set(n,l),++r>e&&(r=0,o=t,t=new Map)};return{get(e){let r=t.get(e);return void 0!==r?r:void 0!==(r=o.get(e))?(n(e,r),r):void 0},set(e,r){t.has(e)?t.set(e,r):n(e,r)}}},b=e=>{let{separator:r,experimentalParseClassName:t}=e,o=1===r.length,n=r[0],l=r.length,s=e=>{let t;let s=[],a=0,i=0;for(let d=0;d<e.length;d++){let c=e[d];if(0===a){if(c===n&&(o||e.slice(d,d+l)===r)){s.push(e.slice(i,d)),i=d+l;continue}if("/"===c){t=d;continue}}"["===c?a++:"]"===c&&a--}let d=0===s.length?e:e.substring(i),c=d.startsWith("!"),u=c?d.substring(1):d;return{modifiers:s,hasImportantModifier:c,baseClassName:u,maybePostfixModifierPosition:t&&t>i?t-i:void 0}};return t?e=>t({className:e,parseClassName:s}):s},m=e=>{if(e.length<=1)return e;let r=[],t=[];return e.forEach(e=>{"["===e[0]?(r.push(...t.sort(),e),t=[]):t.push(e)}),r.push(...t.sort()),r},f=e=>({cache:p(e.cacheSize),parseClassName:b(e),...o(e)}),g=/\s+/,h=(e,r)=>{let{parseClassName:t,getClassGroupId:o,getConflictingClassGroupIds:n}=r,l=[],s=e.trim().split(g),a="";for(let e=s.length-1;e>=0;e-=1){let r=s[e],{modifiers:i,hasImportantModifier:d,baseClassName:c,maybePostfixModifierPosition:u}=t(r),p=!!u,b=o(p?c.substring(0,u):c);if(!b){if(!p||!(b=o(c))){a=r+(a.length>0?" "+a:a);continue}p=!1}let f=m(i).join(":"),g=d?f+"!":f,h=g+b;if(l.includes(h))continue;l.push(h);let y=n(b,p);for(let e=0;e<y.length;++e){let r=y[e];l.push(g+r)}a=r+(a.length>0?" "+a:a)}return a};function y(){let e,r,t=0,o="";for(;t<arguments.length;)(e=arguments[t++])&&(r=v(e))&&(o&&(o+=" "),o+=r);return o}let v=e=>{let r;if("string"==typeof e)return e;let t="";for(let o=0;o<e.length;o++)e[o]&&(r=v(e[o]))&&(t&&(t+=" "),t+=r);return t},w=e=>{let r=r=>r[e]||[];return r.isThemeGetter=!0,r},x=/^\[(?:([a-z-]+):)?(.+)\]$/i,k=/^\d+\/\d+$/,z=new Set(["px","full","screen"]),C=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,S=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,E=/^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,j=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,T=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,P=e=>G(e)||z.has(e)||k.test(e),M=e=>H(e,"length",V),G=e=>!!e&&!Number.isNaN(Number(e)),N=e=>H(e,"number",G),A=e=>!!e&&Number.isInteger(Number(e)),I=e=>e.endsWith("%")&&G(e.slice(0,-1)),L=e=>x.test(e),O=e=>C.test(e),_=new Set(["length","size","percentage"]),W=e=>H(e,_,J),$=e=>H(e,"position",J),R=new Set(["image","url"]),K=e=>H(e,R,D),q=e=>H(e,"",B),F=()=>!0,H=(e,r,t)=>{let o=x.exec(e);return!!o&&(o[1]?"string"==typeof r?o[1]===r:r.has(o[1]):t(o[2]))},V=e=>S.test(e)&&!E.test(e),J=()=>!1,B=e=>j.test(e),D=e=>T.test(e),Q=function(e){let r,t,o;let n=function(s){return t=(r=f([].reduce((e,r)=>r(e),e()))).cache.get,o=r.cache.set,n=l,l(s)};function l(e){let n=t(e);if(n)return n;let l=h(e,r);return o(e,l),l}return function(){return n(y.apply(null,arguments))}}(()=>{let e=w("colors"),r=w("spacing"),t=w("blur"),o=w("brightness"),n=w("borderColor"),l=w("borderRadius"),s=w("borderSpacing"),a=w("borderWidth"),i=w("contrast"),d=w("grayscale"),c=w("hueRotate"),u=w("invert"),p=w("gap"),b=w("gradientColorStops"),m=w("gradientColorStopPositions"),f=w("inset"),g=w("margin"),h=w("opacity"),y=w("padding"),v=w("saturate"),x=w("scale"),k=w("sepia"),z=w("skew"),C=w("space"),S=w("translate"),E=()=>["auto","contain","none"],j=()=>["auto","hidden","clip","visible","scroll"],T=()=>["auto",L,r],_=()=>[L,r],R=()=>["",P,M],H=()=>["auto",G,L],V=()=>["bottom","center","left","left-bottom","left-top","right","right-bottom","right-top","top"],J=()=>["solid","dashed","dotted","double","none"],B=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],D=()=>["start","end","center","between","around","evenly","stretch"],Q=()=>["","0",L],U=()=>["auto","avoid","all","avoid-page","page","left","right","column"],X=()=>[G,L];return{cacheSize:500,separator:":",theme:{colors:[F],spacing:[P,M],blur:["none","",O,L],brightness:X(),borderColor:[e],borderRadius:["none","","full",O,L],borderSpacing:_(),borderWidth:R(),contrast:X(),grayscale:Q(),hueRotate:X(),invert:Q(),gap:_(),gradientColorStops:[e],gradientColorStopPositions:[I,M],inset:T(),margin:T(),opacity:X(),padding:_(),saturate:X(),scale:X(),sepia:Q(),skew:X(),space:_(),translate:_()},classGroups:{aspect:[{aspect:["auto","square","video",L]}],container:["container"],columns:[{columns:[O]}],"break-after":[{"break-after":U()}],"break-before":[{"break-before":U()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:[...V(),L]}],overflow:[{overflow:j()}],"overflow-x":[{"overflow-x":j()}],"overflow-y":[{"overflow-y":j()}],overscroll:[{overscroll:E()}],"overscroll-x":[{"overscroll-x":E()}],"overscroll-y":[{"overscroll-y":E()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:[f]}],"inset-x":[{"inset-x":[f]}],"inset-y":[{"inset-y":[f]}],start:[{start:[f]}],end:[{end:[f]}],top:[{top:[f]}],right:[{right:[f]}],bottom:[{bottom:[f]}],left:[{left:[f]}],visibility:["visible","invisible","collapse"],z:[{z:["auto",A,L]}],basis:[{basis:T()}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["wrap","wrap-reverse","nowrap"]}],flex:[{flex:["1","auto","initial","none",L]}],grow:[{grow:Q()}],shrink:[{shrink:Q()}],order:[{order:["first","last","none",A,L]}],"grid-cols":[{"grid-cols":[F]}],"col-start-end":[{col:["auto",{span:["full",A,L]},L]}],"col-start":[{"col-start":H()}],"col-end":[{"col-end":H()}],"grid-rows":[{"grid-rows":[F]}],"row-start-end":[{row:["auto",{span:[A,L]},L]}],"row-start":[{"row-start":H()}],"row-end":[{"row-end":H()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":["auto","min","max","fr",L]}],"auto-rows":[{"auto-rows":["auto","min","max","fr",L]}],gap:[{gap:[p]}],"gap-x":[{"gap-x":[p]}],"gap-y":[{"gap-y":[p]}],"justify-content":[{justify:["normal",...D()]}],"justify-items":[{"justify-items":["start","end","center","stretch"]}],"justify-self":[{"justify-self":["auto","start","end","center","stretch"]}],"align-content":[{content:["normal",...D(),"baseline"]}],"align-items":[{items:["start","end","center","baseline","stretch"]}],"align-self":[{self:["auto","start","end","center","stretch","baseline"]}],"place-content":[{"place-content":[...D(),"baseline"]}],"place-items":[{"place-items":["start","end","center","baseline","stretch"]}],"place-self":[{"place-self":["auto","start","end","center","stretch"]}],p:[{p:[y]}],px:[{px:[y]}],py:[{py:[y]}],ps:[{ps:[y]}],pe:[{pe:[y]}],pt:[{pt:[y]}],pr:[{pr:[y]}],pb:[{pb:[y]}],pl:[{pl:[y]}],m:[{m:[g]}],mx:[{mx:[g]}],my:[{my:[g]}],ms:[{ms:[g]}],me:[{me:[g]}],mt:[{mt:[g]}],mr:[{mr:[g]}],mb:[{mb:[g]}],ml:[{ml:[g]}],"space-x":[{"space-x":[C]}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":[C]}],"space-y-reverse":["space-y-reverse"],w:[{w:["auto","min","max","fit","svw","lvw","dvw",L,r]}],"min-w":[{"min-w":[L,r,"min","max","fit"]}],"max-w":[{"max-w":[L,r,"none","full","min","max","fit","prose",{screen:[O]},O]}],h:[{h:[L,r,"auto","min","max","fit","svh","lvh","dvh"]}],"min-h":[{"min-h":[L,r,"min","max","fit","svh","lvh","dvh"]}],"max-h":[{"max-h":[L,r,"min","max","fit","svh","lvh","dvh"]}],size:[{size:[L,r,"auto","min","max","fit"]}],"font-size":[{text:["base",O,M]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:["thin","extralight","light","normal","medium","semibold","bold","extrabold","black",N]}],"font-family":[{font:[F]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractions"],tracking:[{tracking:["tighter","tight","normal","wide","wider","widest",L]}],"line-clamp":[{"line-clamp":["none",G,N]}],leading:[{leading:["none","tight","snug","normal","relaxed","loose",P,L]}],"list-image":[{"list-image":["none",L]}],"list-style-type":[{list:["none","disc","decimal",L]}],"list-style-position":[{list:["inside","outside"]}],"placeholder-color":[{placeholder:[e]}],"placeholder-opacity":[{"placeholder-opacity":[h]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"text-color":[{text:[e]}],"text-opacity":[{"text-opacity":[h]}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[...J(),"wavy"]}],"text-decoration-thickness":[{decoration:["auto","from-font",P,M]}],"underline-offset":[{"underline-offset":["auto",P,L]}],"text-decoration-color":[{decoration:[e]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:_()}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",L]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",L]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-opacity":[{"bg-opacity":[h]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:[...V(),$]}],"bg-repeat":[{bg:["no-repeat",{repeat:["","x","y","round","space"]}]}],"bg-size":[{bg:["auto","cover","contain",W]}],"bg-image":[{bg:["none",{"gradient-to":["t","tr","r","br","b","bl","l","tl"]},K]}],"bg-color":[{bg:[e]}],"gradient-from-pos":[{from:[m]}],"gradient-via-pos":[{via:[m]}],"gradient-to-pos":[{to:[m]}],"gradient-from":[{from:[b]}],"gradient-via":[{via:[b]}],"gradient-to":[{to:[b]}],rounded:[{rounded:[l]}],"rounded-s":[{"rounded-s":[l]}],"rounded-e":[{"rounded-e":[l]}],"rounded-t":[{"rounded-t":[l]}],"rounded-r":[{"rounded-r":[l]}],"rounded-b":[{"rounded-b":[l]}],"rounded-l":[{"rounded-l":[l]}],"rounded-ss":[{"rounded-ss":[l]}],"rounded-se":[{"rounded-se":[l]}],"rounded-ee":[{"rounded-ee":[l]}],"rounded-es":[{"rounded-es":[l]}],"rounded-tl":[{"rounded-tl":[l]}],"rounded-tr":[{"rounded-tr":[l]}],"rounded-br":[{"rounded-br":[l]}],"rounded-bl":[{"rounded-bl":[l]}],"border-w":[{border:[a]}],"border-w-x":[{"border-x":[a]}],"border-w-y":[{"border-y":[a]}],"border-w-s":[{"border-s":[a]}],"border-w-e":[{"border-e":[a]}],"border-w-t":[{"border-t":[a]}],"border-w-r":[{"border-r":[a]}],"border-w-b":[{"border-b":[a]}],"border-w-l":[{"border-l":[a]}],"border-opacity":[{"border-opacity":[h]}],"border-style":[{border:[...J(),"hidden"]}],"divide-x":[{"divide-x":[a]}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":[a]}],"divide-y-reverse":["divide-y-reverse"],"divide-opacity":[{"divide-opacity":[h]}],"divide-style":[{divide:J()}],"border-color":[{border:[n]}],"border-color-x":[{"border-x":[n]}],"border-color-y":[{"border-y":[n]}],"border-color-s":[{"border-s":[n]}],"border-color-e":[{"border-e":[n]}],"border-color-t":[{"border-t":[n]}],"border-color-r":[{"border-r":[n]}],"border-color-b":[{"border-b":[n]}],"border-color-l":[{"border-l":[n]}],"divide-color":[{divide:[n]}],"outline-style":[{outline:["",...J()]}],"outline-offset":[{"outline-offset":[P,L]}],"outline-w":[{outline:[P,M]}],"outline-color":[{outline:[e]}],"ring-w":[{ring:R()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:[e]}],"ring-opacity":[{"ring-opacity":[h]}],"ring-offset-w":[{"ring-offset":[P,M]}],"ring-offset-color":[{"ring-offset":[e]}],shadow:[{shadow:["","inner","none",O,q]}],"shadow-color":[{shadow:[F]}],opacity:[{opacity:[h]}],"mix-blend":[{"mix-blend":[...B(),"plus-lighter","plus-darker"]}],"bg-blend":[{"bg-blend":B()}],filter:[{filter:["","none"]}],blur:[{blur:[t]}],brightness:[{brightness:[o]}],contrast:[{contrast:[i]}],"drop-shadow":[{"drop-shadow":["","none",O,L]}],grayscale:[{grayscale:[d]}],"hue-rotate":[{"hue-rotate":[c]}],invert:[{invert:[u]}],saturate:[{saturate:[v]}],sepia:[{sepia:[k]}],"backdrop-filter":[{"backdrop-filter":["","none"]}],"backdrop-blur":[{"backdrop-blur":[t]}],"backdrop-brightness":[{"backdrop-brightness":[o]}],"backdrop-contrast":[{"backdrop-contrast":[i]}],"backdrop-grayscale":[{"backdrop-grayscale":[d]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[c]}],"backdrop-invert":[{"backdrop-invert":[u]}],"backdrop-opacity":[{"backdrop-opacity":[h]}],"backdrop-saturate":[{"backdrop-saturate":[v]}],"backdrop-sepia":[{"backdrop-sepia":[k]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":[s]}],"border-spacing-x":[{"border-spacing-x":[s]}],"border-spacing-y":[{"border-spacing-y":[s]}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["none","all","","colors","opacity","shadow","transform",L]}],duration:[{duration:X()}],ease:[{ease:["linear","in","out","in-out",L]}],delay:[{delay:X()}],animate:[{animate:["none","spin","ping","pulse","bounce",L]}],transform:[{transform:["","gpu","none"]}],scale:[{scale:[x]}],"scale-x":[{"scale-x":[x]}],"scale-y":[{"scale-y":[x]}],rotate:[{rotate:[A,L]}],"translate-x":[{"translate-x":[S]}],"translate-y":[{"translate-y":[S]}],"skew-x":[{"skew-x":[z]}],"skew-y":[{"skew-y":[z]}],"transform-origin":[{origin:["center","top","top-right","right","bottom-right","bottom","bottom-left","left","top-left",L]}],accent:[{accent:["auto",e]}],appearance:[{appearance:["none","auto"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",L]}],"caret-color":[{caret:[e]}],"pointer-events":[{"pointer-events":["none","auto"]}],resize:[{resize:["none","y","x",""]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":_()}],"scroll-mx":[{"scroll-mx":_()}],"scroll-my":[{"scroll-my":_()}],"scroll-ms":[{"scroll-ms":_()}],"scroll-me":[{"scroll-me":_()}],"scroll-mt":[{"scroll-mt":_()}],"scroll-mr":[{"scroll-mr":_()}],"scroll-mb":[{"scroll-mb":_()}],"scroll-ml":[{"scroll-ml":_()}],"scroll-p":[{"scroll-p":_()}],"scroll-px":[{"scroll-px":_()}],"scroll-py":[{"scroll-py":_()}],"scroll-ps":[{"scroll-ps":_()}],"scroll-pe":[{"scroll-pe":_()}],"scroll-pt":[{"scroll-pt":_()}],"scroll-pr":[{"scroll-pr":_()}],"scroll-pb":[{"scroll-pb":_()}],"scroll-pl":[{"scroll-pl":_()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",L]}],fill:[{fill:[e,"none"]}],"stroke-w":[{stroke:[P,M,N]}],stroke:[{stroke:[e,"none"]}],sr:["sr-only","not-sr-only"],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-s","border-w-e","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-s","border-color-e","border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]}}})}}]);