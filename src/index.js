module.exports=function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t){const n=e=>/^\{\{.*\}\}$/.test(e),o=e=>"[object Function]"==={}.toString.call(e)?e.toString():"string"==typeof e?e:"object"==typeof e?JSON.stringify(e,(e,t)=>"function"==typeof t?t.toString():t):String(e),r=e=>e.charAt(0).toUpperCase()+e.slice(1),s=e=>{let t=Array.isArray(e)?[]:{};if(e&&"object"==typeof e)for(const n in e)e.hasOwnProperty(n)&&(e[n]&&"object"==typeof e[n]?t[n]=s(e[n]):t[n]=e[n]);return t},a=e=>{const t=e.toString();return{params:t.match(/\([^\(\)]*\)/)[0].slice(1,-1),content:t.slice(t.indexOf("{")+1,t.lastIndexOf("}"))}},c=(e,t)=>{if("string"==typeof e)return n(e)?t?e.slice(1,-1):e.slice(2,-2):t?e:`'${e}'`;if("function"==typeof e){const{params:t,content:n}=a(e);return`(${t}) => {${n}}`}return"object"==typeof e?`${JSON.stringify(e)}`:e},i=e=>{const t=new RegExp("this.state","g");return e.replace(t,"state")},p=(e,t)=>{let n=!1;return e.forEach(e=>{e.import===t&&(n=!0)}),n};e.exports={isExpression:n,toString:o,transComponentsMap:(e={})=>{if(!e||!Array.isArray(e.list))return[];return e.list.reduce((e,t)=>{const n=t.name;if(!e[n]){try{let e=JSON.parse(t.dependence);e&&(t.packageName=e.package),t.dependenceVersion||(t.dependenceVersion="*"),/^\d/.test(t.dependenceVersion)&&(t.dependenceVersion="^"+t.dependenceVersion)}catch(e){}e[n]=t}return e},{})},line2Hump:e=>e=(e=e.replace(/[_|-](\w)/g,(e,t)=>t.toUpperCase())).charAt(0).toUpperCase()+e.slice(1),existImport:p,toUpperCaseStart:r,parseStyle:(e,t,n)=>{for(let o in e)switch(o){case"fontSize":case"marginTop":case"marginBottom":case"paddingTop":case"paddingBottom":case"height":case"top":case"bottom":case"width":case"maxWidth":case"left":case"right":case"paddingRight":case"paddingLeft":case"marginLeft":case"marginRight":case"lineHeight":case"borderBottomRightRadius":case"borderBottomLeftRadius":case"borderTopRightRadius":case"borderTopLeftRadius":case"borderRadius":e[o]=parseInt(e[o])*t,n&&e[o]&&(e[o]=`${e[o]}${n}`)}return e},deepClone:s,parseDataSource:(e,t)=>{const r=e.id,{uri:s,method:i,params:l}=e.options,u=e.type;let d,m={};switch(u){case"fetch":d="import {fetch} from 'whatwg-fetch';",p(t,d)||t.push({import:d,package:"whatwg-fetch",version:"^3.0.0"}),m={method:i};break;case"jsonp":d="import {fetchJsonp} from 'fetch-jsonp';",p(t,d)||t.push({import:d,package:"fetch-jsonp",version:"^1.1.3"})}Object.keys(e.options).forEach(t=>{-1===["uri","method","params"].indexOf(t)&&(m[t]=o(e.options[t]))});let f=null===($=m)||"[object Object]"!==Object.prototype.toString.call($)||Object.keys($).length?",":"";var $;m=l?`${o(m).slice(0,-1)} ${f} body: ${n(l)?c(l):o(l)}}`:o(m);let h=`{\n  return ${u}(${c(s)}, ${o(m)})\n    .then((response) => response.json())\n`;if(e.dataHandler){const{params:t,content:n}=a(e.dataHandler);h+=`.then((${t}) => {${n}})\n    .catch((e) => {\n      console.log('error', e);\n    })\n  `}return h+="}",{value:`function ${r}() ${h}`,imports:t}},parseFunction:a,parseLoop:(e,t,r,s)=>{let a,c=t&&t[0]||"item",i=t&&t[1]||"index";Array.isArray(e)?a=o(e):n(e)&&(a=e.slice(2,-2));const p=r.match(/^<.+?\s/)[0].length;r=`${r.slice(0,p)} key={${i}}${r.slice(p)}`;const l=new RegExp(`this.${c}`,"g");r=r.replace(l,c);let u=a;return a.match(/this\.state\./)&&(u=`state.${a.split(".").pop()}`),{hookState:[],value:`${u}.map((${c}, ${i}) => {\n      return (${r});\n    })`}},parseCondition:(e,t)=>"boolean"==typeof e?`${e} && ${t}`:"string"==typeof e?`${(e=e.replace(/this\./,"")).slice(2,-2)} && ${t}`:void 0,parseProps:c,parseState:e=>`const [state, set${r("state")}] = useState(${o(JSON.parse(e))||null});`,parseLifeCycles:(e,t)=>{let n=[];return!e.lifeCycles._constructor&&t&&(e.lifeCycles._constructor="function _constructor() {}"),Object.keys(e.lifeCycles).forEach(o=>{let{params:r,content:s}=a(e.lifeCycles[o]);switch(s=i(s),o){case"_constructor":t.push(s),n.unshift(`\n          // constructor\n          useState(()=>{\n            ${t.join("\n")}\n          })\n        `);break;case"componentDidMount":n.push(`\n          // componentDidMount\n          useEffect(()=>{\n            ${s}\n          }, [])\n        `);break;case"componentDidUpdate":n.push(`\n          // componentDidUpdate\n          useEffect(()=>{\n            ${s}\n          })\n        `);break;case"componentWillUnMount":n.push(`\n          // componentWillUnMount\n          useEffect(()=>{\n            return ()=>{\n              ${s}\n            }\n          }, [])\n        `)}}),n},replaceState:i,generateCSS:e=>{let t="";for(let o in e){t+=`.${o} {`;for(let r in e[o])t+=`${n=r,n.split(/(?=[A-Z])/).join("-").toLowerCase()}: ${e[o][r]};\n`;t+="}"}var n;return t},getText:e=>{let t="";const n=e=>{"text"===e.componentName.toLowerCase()&&(t+=c(e.props.text||e.text,!0).replace(/\{/g,"${")),e.children&&Array.isArray(e.children)&&e.children.map(e=>{n(e)})};return n(e),t}}},function(e,t,n){const{exportMod:o,exportPage:r}=n(2),{line2Hump:s,transComponentsMap:a}=n(0);e.exports=function(e,t){const n=[],c=750/(t.responsive&&t.responsive.width||750),i=a(t.componentsMap);t.scale=c,t.componentsMap=i,function e(t){const{json:o,scale:r,index:a}=t;switch(o.componentName.toLowerCase()){case"block":o.fileName=o.fileName||`block_${o.id.slice(0,6)}`||`block_${a}`,o.smart&&o.smart.layerProtocol&&o.smart.layerProtocol.module&&o.smart.layerProtocol.module.type&&(o.fileName=o.smart.layerProtocol.module.type.replace(/[@|\/]/g,"")),o.fileName="index"===o.fileName?o.fileName:s(o.fileName),n.push(o)}o.children&&o.children.length>0&&Array.isArray(o.children)&&o.children.forEach((t,n)=>{e({json:t,scale:r,index:n})})}({json:e,scale:c});let p=[];if(n.length>0&&n.forEach(e=>{const n=o(e,t);p=p.concat(n)}),"Page"===e.componentName){const n=r(e,t);p=p.concat(n)}return{panelDisplay:p,noTemplate:!0}}},function(e,t,n){const o=n(3),r=n(4);e.exports={exportMod:o,exportPage:r}},function(e,t,n){const{toString:o,existImport:r,parseLoop:s,parseStyle:a,deepClone:c,parseFunction:i,parseProps:p,parseState:l,parseLifeCycles:u,replaceState:d,parseCondition:m,generateCSS:f,parseDataSource:$,line2Hump:h,getText:x}=n(0);e.exports=function(e,t){const{prettier:n,scale:y,componentsMap:g}=t,b=e.fileName;let S=[],k=[];const j={},C={},N=[];let w=null,v=[];const O=[];let I=[];const E=[],A=e=>{let t=g[e]||{},n=t.package||t.packageName||e;n&&["view","image","text","picture"].indexOf(n.toLowerCase())>=0&&(n=`rax-${n.toLowerCase()}`);const o=`import ${e} from '${n}'`;r(S,o)||S.push({import:o,package:n,version:t.dependenceVersion||"*"})},P=e=>{const t=e.componentName,n=e.componentName.toLowerCase(),o=e.props&&e.props.className,r=o?` className="${o}"`:"";let i;o&&(j[o]=a(e.props.style,y),C[o]=a(c(e.props.style),y,"rpx"));let l="";switch(Object.keys(e.props).forEach(t=>{-1===["className","style","text","src","key"].indexOf(t)&&(l+=` ${t}={${p(e.props[t])}}`),"text"!==n&&["text"].includes(t)&&(l+=` ${t}={${p(e.props[t])}}`),0===["onClick"].indexOf(t)&&(l+=` accessible={true} role="link" aria-label={\`${x(e)}\`}`)}),"link"!==n||l.match("accessible")||(l+=` accessible={true} aria-label={\`${x(e)}\`}`),n){case"text":A("Text");let n=p(e.props.text||e.text,!0);n.match(/this\.props/)&&(n=n.replace(/this\./,"")),i=`<Text${r}${l}>${n||""}</Text>`;break;case"image":if(A("Image"),l.match("onClick")||(l+=" aria-hidden={true}"),e.props.source&&e.props.source.uri)i=`<Image${r}${l} />`;else{let t=p(e.props.src);t=t&&`source={{uri: ${t}}}`||"",i=`<Image${r}${l} ${t} />`}break;case"div":case"view":case"page":case"block":case"component":A("View"),i=e.children&&e.children.length?`<View${r}>${T(e.children)}</View>`:`<View${r} />`;break;default:A(e.componentName),i=e.children&&e.children.length&&Array.isArray(e.children)?`<${t}${r}${l}>${T(e.children)}</${t}>`:"string"==typeof e.children?`<${t}${r}${l} >${e.children}</${t}>`:`<${t}${r}${l} />`}if(e.loop){const t=s(e.loop,e.loopArgs,i,w);i=t.value,v=v.concat(t.hookState)}return i=d(i),e.condition&&(i=m(e.condition,i)),(e.loop||e.condition)&&(i=`{${i}}`),i},T=e=>{let t="";const n=e.fileName||e.id;if(Array.isArray(e))e.forEach(e=>{t+=T(e)});else{const r=e.componentName.toLowerCase();if(-1!==["page"].indexOf(r)||n===b){const t=[];if(e.state&&(t.push(`state = ${o(e.state)}`),w=o(e.state)),e.methods&&Object.keys(e.methods).forEach(t=>{const{params:n,content:o}=i(e.methods[t]);O.push(`function ${t}(${n}) {${o}}`)}),e.dataSource&&Array.isArray(e.dataSource.list)&&(e.dataSource.list.forEach(e=>{"boolean"==typeof e.isInit&&e.isInit?E.push(`${e.id}();`):"string"==typeof e.isInit&&E.push(`if (${p(e.isInit)}) { ${e.id}(); }`);const t=$(e,S);O.push(t.value),S=t.imports}),e.dataSource.dataHandler)){const{params:t,content:n}=i(e.dataSource.dataHandler);O.push(`const dataHandler = (${t}) => {${n}}`),E.push("dataHandler()")}e.lifeCycles&&(I=u(e,E)),w&&v.push(l(w))}else if(-1!==["block"].indexOf(r)){let o="";Object.keys(e.props).forEach(t=>{-1===["className","style","text","src","key"].indexOf(t)&&(o+=` ${t}={${p(e.props[t])}}`)}),t+=`<${h(n)} ${o} />`,k.push({import:`import ${h(n)} from '../${n}';`})}else t+=P(e)}return t};t.utils&&Object.keys(t.utils).forEach(e=>{N.push(`const ${e} = ${t.utils[e]}`)}),T(e);const V={parser:"css"},L=P(e),M=L.match("dispatch"),H=n.format(`\n    'use strict';\n    import { createElement, useState, useEffect, memo } from 'rax';\n    ${S.map(e=>e.import).join("\n")}\n    ${k.map(e=>e.import).join("\n")}\n    ${M?"import { IndexContext } from '../../context';":""}\n\n    import styles from './${b}.css';\n\n    ${N.join("\n")}\n    export default memo((props) => {\n      ${v.join("\n")}\n      ${M?"const { state: { txt }, dispatch} = useContext(IndexContext);":""}\n      ${I.join("\n")}\n      ${O.join("\n")}\n      ${L.match(/^\{true\ \&\& /)?`return (<View>${L}</View>)`:`return (${L})`}\n    });\n  `,{parser:"babel",printWidth:120,singleQuote:!0});return[{panelName:`${b}.jsx`,panelValue:H,panelType:"js",panelImports:S},{panelName:`${b}.css`,panelValue:n.format(`${f(j)}`,V),panelType:"css"},{panelName:`${b}.rpx.css`,panelValue:n.format(`${f(C)}`,V),panelType:"css"}]}},function(e,t,n){const{toString:o,existImport:r,parseLoop:s,parseStyle:a,deepClone:c,parseFunction:i,parseProps:p,parseState:l,parseLifeCycles:u,replaceState:d,parseCondition:m,generateCSS:f,parseDataSource:$,line2Hump:h,getText:x}=n(0);e.exports=function(e,t){const{prettier:n,scale:y,componentsMap:g}=t,b=e.fileName||e.id;let S=[],k=[];const j={},C={},N=[];let w=null,v=[];const O=[];let I=[];const E=[],A=e=>{let t=g[e]||{},n=t.package||t.packageName||e;n&&["view","image","text","picture"].indexOf(n.toLowerCase())>=0&&(n=`rax-${n.toLowerCase()}`);const o=`import ${e} from '${n}'`;r(S,o)||S.push({import:o,package:n,version:t.dependenceVersion||"*"})},P=e=>{const t=e.componentName,n=e.componentName.toLowerCase(),o=e.props&&e.props.className,r=o?` className="${o}"`:"";let i;o&&(j[o]=a(e.props.style,y),C[o]=a(c(e.props.style),y,"rpx"));let l="";switch(Object.keys(e.props).forEach(t=>{-1===["className","style","text","src","key"].indexOf(t)&&(l+=` ${t}={${p(e.props[t])}}`),"text"!==n&&["text"].includes(t)&&(l+=` ${t}={${p(e.props[t])}}`),0===["onClick"].indexOf(t)&&(l+=` accessible={true} aria-label={\`${x(e)}\`}`)}),"link"!==n||l.match("accessible")||(l+=` accessible={true} role="link" aria-label={\`${x(e)}\`}`),n){case"text":A("Text");const n=p(e.props.text||e.text,!0);i=`<Text${r}${l}>${n||""}</Text>`;break;case"image":if(A("Image"),l.match("onClick")||(l+=" aria-hidden={true}"),e.props.source&&e.props.source.uri)i=`<Image${r}${l} />`;else{let t=p(e.props.src);t=t&&`source={{uri: ${t}}}`||"",i=`<Image${r}${l} ${t} />`}break;case"div":case"view":case"page":case"block":case"component":A("View"),i=e.children&&e.children.length?`<View${r}${l}>${T(e.children)}</View>`:`<View${r}${l} />`;break;default:A(e.componentName),i=e.children&&e.children.length&&Array.isArray(e.children)?`<${t}${r}${l}>${T(e.children)}</${t}>`:"string"==typeof e.children?`<${t}${r}${l} >${e.children}</${t}>`:`<${t}${r}${l} />`}if(e.loop){const t=s(e.loop,e.loopArgs,i,w);i=t.value,v=v.concat(t.hookState)}return i=d(i),e.condition&&(i=m(e.condition,i)),(e.loop||e.condition)&&(i=`{${i}}`),i},T=e=>{let t="";if(Array.isArray(e))e.forEach(e=>{t+=T(e)});else{const n=e.componentName.toLowerCase();if(-1!==["page"].indexOf(n)){const t=[];if(e.state&&(t.push(`state = ${o(e.state)}`),w=o(e.state)),e.methods&&Object.keys(e.methods).forEach(t=>{const{params:n,content:o}=i(e.methods[t]);O.push(`function ${t}(${n}) {${o}}`)}),e.dataSource&&Array.isArray(e.dataSource.list)&&(e.dataSource.list.forEach(e=>{"boolean"==typeof e.isInit&&e.isInit?E.push(`${e.id}();`):"string"==typeof e.isInit&&E.push(`if (${p(e.isInit)}) { ${e.id}(); }`);const t=$(e,S);O.push(t.value),S=t.imports}),e.dataSource.dataHandler)){const{params:t,content:n}=i(e.dataSource.dataHandler);O.push(`const dataHandler = (${t}) => {${n}}`),E.push("dataHandler()")}e.lifeCycles&&(I=u(e,E)),w&&v.push(l(w))}else if(-1!==["block"].indexOf(n)){const n=e.fileName||e.id;let o="";Object.keys(e.props).forEach(t=>{-1===["className","style","text","src","key"].indexOf(t)&&(o+=` ${t}={${p(e.props[t])}}`)}),t+=`<${h(n)} ${o} />`,k.push({import:`import ${h(n)} from './${n}';`})}else t+=P(e)}return t};t.utils&&Object.keys(t.utils).forEach(e=>{N.push(`const ${e} = ${t.utils[e]}`)}),T(e);const V={parser:"babel",printWidth:120,singleQuote:!0},L={parser:"css"},M=P(e),H=n.format("import { createElement, createContext, useReducer } from 'rax';\n\n    const initState = {\n      txt: 'click me' // Get data, trigger proactively useEffect\n    };\n    \n    function UserReducer(state, action) {\n      switch (action.type) {\n        case 'changeTxt':\n          return {\n            ...state,\n            txt: `click me ${action.payload.val}`\n          };\n        default:\n          return state;\n      }\n    }\n    \n    const IndexContext = createContext();\n    \n    const IndexProvider = props => {\n      const [state, dispatch] = useReducer(UserReducer, initState);\n      return (\n        <IndexContext.Provider value={{ state, dispatch }}>\n          {props.children}\n        </IndexContext.Provider>\n      );\n    };\n    \n    export { IndexContext, IndexProvider };\n  ",V),R=M.match("dispatch");return[{panelName:`${b}.jsx`,panelValue:n.format(`\n    'use strict';\n    import { createElement, useState, useEffect } from 'rax';\n    ${S.map(e=>e.import).join("\n")}\n    ${k.map(e=>e.import).join("\n")}\n    import { ${R?"IndexContext, IndexProvider":"IndexProvider"} } from './context';\n    import styles from './${b}.css';\n\n    ${N.join("\n")}\n    export default function Page() {\n      ${v.join("\n")}\n      ${R?"const { state: { txt }, dispatch} = useContext(IndexContext);":""}\n\n      ${I.join("\n")}\n      \n      ${O.join("\n")}\n      return (<IndexProvider>${M}</IndexProvider>)\n    };\n  `,V),panelType:"js",panelImports:S.concat(k)},{panelName:"context.jsx",panelValue:H,panelType:"js",panelImports:[]},{panelName:`${b}.css`,panelValue:n.format(`${f(j)}`,L),panelType:"css"},{panelName:`${b}.rpx.css`,panelValue:n.format(`${f(C)}`,L),panelType:"css"}]}}]);