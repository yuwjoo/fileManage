import{c as Qe,b as fe,d as E,u as j,a as _,p as ae,o as c,e as b,w as f,r as D,n as F,f as a,g as q,h as Y,i as ie,j as W,k as P,l as te,m as Xe,q as xe,s as T,t as ee,v as B,x as en,y as le,z as se,A as N,B as k,C as nn,D as on,E as Oe,F as tn,G as ln,H as sn,I as re,J as z,K as ye,L as Z,M as pe,N as _e,O as ue,P as ve,Q as an,R as rn,S as de,T as Te,U as cn,V as Re,W as un,X as dn,Y as pn}from"./index-8bb7f2fd.js";import{_ as K,m as oe,c as fn,E as M,u as mn,a as U,b as De,d as Pe,e as vn,f as _n,g as hn,O as gn,h as J,i as wn,j as bn,k as Me,l as yn,n as Ke,o as Ve,C as Cn,p as In,q as Ae,r as En,w as Fe,s as $n,F as kn,t as Sn,v as Tn,L as Rn,x as ce,U as he,y as ge,I as we,z as Fn,A as Nn,B as Bn,D as On,G as Dn,H as Pn,J as Mn,K as Kn,M as Vn,N as An,P as Ln,Q as zn,R as Gn,S as Hn}from"./editResourceDialog-6899bdec.js";import{_ as Un}from"./close-ee9cc43d.js";const jn=e=>["",...Qe].includes(e),Le=Symbol("rowContextKey"),Yn=["start","center","end","space-around","space-between","space-evenly"],Jn=["top","middle","bottom"],Wn=fe({tag:{type:String,default:"div"},gutter:{type:Number,default:0},justify:{type:String,values:Yn,default:"start"},align:{type:String,values:Jn}}),Zn=E({name:"ElRow"}),qn=E({...Zn,props:Wn,setup(e){const n=e,t=j("row"),o=_(()=>n.gutter);ae(Le,{gutter:o});const u=_(()=>{const l={};return n.gutter&&(l.marginRight=l.marginLeft=`-${n.gutter/2}px`),l}),d=_(()=>[t.b(),t.is(`justify-${n.justify}`,n.justify!=="start"),t.is(`align-${n.align}`,!!n.align)]);return(l,s)=>(c(),b(Y(l.tag),{class:F(a(d)),style:q(a(u))},{default:f(()=>[D(l.$slots,"default")]),_:3},8,["class","style"]))}});var Qn=K(qn,[["__file","/home/runner/work/element-plus/element-plus/packages/components/row/src/row.vue"]]);const Xn=ie(Qn),xn=fe({tag:{type:String,default:"div"},span:{type:Number,default:24},offset:{type:Number,default:0},pull:{type:Number,default:0},push:{type:Number,default:0},xs:{type:W([Number,Object]),default:()=>oe({})},sm:{type:W([Number,Object]),default:()=>oe({})},md:{type:W([Number,Object]),default:()=>oe({})},lg:{type:W([Number,Object]),default:()=>oe({})},xl:{type:W([Number,Object]),default:()=>oe({})}}),eo=E({name:"ElCol"}),no=E({...eo,props:xn,setup(e){const n=e,{gutter:t}=P(Le,{gutter:_(()=>0)}),o=j("col"),u=_(()=>{const l={};return t.value&&(l.paddingLeft=l.paddingRight=`${t.value/2}px`),l}),d=_(()=>{const l=[];return["span","offset","pull","push"].forEach(v=>{const h=n[v];te(h)&&(v==="span"?l.push(o.b(`${n[v]}`)):h>0&&l.push(o.b(`${v}-${n[v]}`)))}),["xs","sm","md","lg","xl"].forEach(v=>{te(n[v])?l.push(o.b(`${v}-${n[v]}`)):Xe(n[v])&&Object.entries(n[v]).forEach(([h,$])=>{l.push(h!=="span"?o.b(`${v}-${h}-${$}`):o.b(`${v}-${$}`))})}),t.value&&l.push(o.is("guttered")),[o.b(),l]});return(l,s)=>(c(),b(Y(l.tag),{class:F(a(d)),style:q(a(u))},{default:f(()=>[D(l.$slots,"default")]),_:3},8,["class","style"]))}});var oo=K(no,[["__file","/home/runner/work/element-plus/element-plus/packages/components/col/src/col.vue"]]);const to=ie(oo),lo=E({name:"ElContainer"}),so=E({...lo,props:{direction:{type:String}},setup(e){const n=e,t=xe(),o=j("container"),u=_(()=>n.direction==="vertical"?!0:n.direction==="horizontal"?!1:t&&t.default?t.default().some(l=>{const s=l.type.name;return s==="ElHeader"||s==="ElFooter"}):!1);return(d,l)=>(c(),T("section",{class:F([a(o).b(),a(o).is("vertical",a(u))])},[D(d.$slots,"default")],2))}});var ao=K(so,[["__file","/home/runner/work/element-plus/element-plus/packages/components/container/src/container.vue"]]);const ro=E({name:"ElAside"}),io=E({...ro,props:{width:{type:String,default:null}},setup(e){const n=e,t=j("aside"),o=_(()=>n.width?t.cssVarBlock({width:n.width}):{});return(u,d)=>(c(),T("aside",{class:F(a(t).b()),style:q(a(o))},[D(u.$slots,"default")],6))}});var ze=K(io,[["__file","/home/runner/work/element-plus/element-plus/packages/components/container/src/aside.vue"]]);const co=E({name:"ElFooter"}),uo=E({...co,props:{height:{type:String,default:null}},setup(e){const n=e,t=j("footer"),o=_(()=>n.height?t.cssVarBlock({height:n.height}):{});return(u,d)=>(c(),T("footer",{class:F(a(t).b()),style:q(a(o))},[D(u.$slots,"default")],6))}});var Ge=K(uo,[["__file","/home/runner/work/element-plus/element-plus/packages/components/container/src/footer.vue"]]);const po=E({name:"ElHeader"}),fo=E({...po,props:{height:{type:String,default:null}},setup(e){const n=e,t=j("header"),o=_(()=>n.height?t.cssVarBlock({height:n.height}):{});return(u,d)=>(c(),T("header",{class:F(a(t).b()),style:q(a(o))},[D(u.$slots,"default")],6))}});var He=K(fo,[["__file","/home/runner/work/element-plus/element-plus/packages/components/container/src/header.vue"]]);const mo=E({name:"ElMain"}),vo=E({...mo,setup(e){const n=j("main");return(t,o)=>(c(),T("main",{class:F(a(n).b())},[D(t.$slots,"default")],2))}});var Ue=K(vo,[["__file","/home/runner/work/element-plus/element-plus/packages/components/container/src/main.vue"]]);const _o=ie(ao,{Aside:ze,Footer:Ge,Header:He,Main:Ue});ee(ze);ee(Ge);const ho=ee(He),go=ee(Ue),wo=fe({style:{type:W([String,Array,Object])},currentTabId:{type:W(String)},defaultCurrentTabId:String,loop:Boolean,dir:{type:String,values:["ltr","rtl"],default:"ltr"},orientation:{type:W(String)},onBlur:Function,onFocus:Function,onMousedown:Function}),{ElCollection:bo,ElCollectionItem:yo,COLLECTION_INJECTION_KEY:Ce,COLLECTION_ITEM_INJECTION_KEY:Co}=fn("RovingFocusGroup"),Ie=Symbol("elRovingFocusGroup"),je=Symbol("elRovingFocusGroupItem"),Io={ArrowLeft:"prev",ArrowUp:"prev",ArrowRight:"next",ArrowDown:"next",PageUp:"first",Home:"first",PageDown:"last",End:"last"},Eo=(e,n)=>{if(n!=="rtl")return e;switch(e){case M.right:return M.left;case M.left:return M.right;default:return e}},$o=(e,n,t)=>{const o=Eo(e.key,t);if(!(n==="vertical"&&[M.left,M.right].includes(o))&&!(n==="horizontal"&&[M.up,M.down].includes(o)))return Io[o]},ko=(e,n)=>e.map((t,o)=>e[(o+n)%e.length]),Ee=e=>{const{activeElement:n}=document;for(const t of e)if(t===n||(t.focus(),n!==document.activeElement))return},Ne="currentTabIdChange",Be="rovingFocusGroup.entryFocus",So={bubbles:!1,cancelable:!0},To=E({name:"ElRovingFocusGroupImpl",inheritAttrs:!1,props:wo,emits:[Ne,"entryFocus"],setup(e,{emit:n}){var t;const o=B((t=e.currentTabId||e.defaultCurrentTabId)!=null?t:null),u=B(!1),d=B(!1),l=B(null),{getItems:s}=P(Ce,void 0),y=_(()=>[{outline:"none"},e.style]),v=p=>{n(Ne,p)},h=()=>{u.value=!0},$=U(p=>{var C;(C=e.onMousedown)==null||C.call(e,p)},()=>{d.value=!0}),S=U(p=>{var C;(C=e.onFocus)==null||C.call(e,p)},p=>{const C=!a(d),{target:G,currentTarget:V}=p;if(G===V&&C&&!a(u)){const I=new Event(Be,So);if(V==null||V.dispatchEvent(I),!I.defaultPrevented){const R=s().filter(w=>w.focusable),O=R.find(w=>w.active),A=R.find(w=>w.id===a(o)),r=[O,A,...R].filter(Boolean).map(w=>w.ref);Ee(r)}}d.value=!1}),i=U(p=>{var C;(C=e.onBlur)==null||C.call(e,p)},()=>{u.value=!1}),g=(...p)=>{n("entryFocus",...p)};ae(Ie,{currentTabbedId:en(o),loop:le(e,"loop"),tabIndex:_(()=>a(u)?-1:0),rovingFocusGroupRef:l,rovingFocusGroupRootStyle:y,orientation:le(e,"orientation"),dir:le(e,"dir"),onItemFocus:v,onItemShiftTab:h,onBlur:i,onFocus:S,onMousedown:$}),se(()=>e.currentTabId,p=>{o.value=p??null}),mn(l,Be,g)}});function Ro(e,n,t,o,u,d){return D(e.$slots,"default")}var Fo=K(To,[["render",Ro],["__file","/home/runner/work/element-plus/element-plus/packages/components/roving-focus-group/src/roving-focus-group-impl.vue"]]);const No=E({name:"ElRovingFocusGroup",components:{ElFocusGroupCollection:bo,ElRovingFocusGroupImpl:Fo}});function Bo(e,n,t,o,u,d){const l=N("el-roving-focus-group-impl"),s=N("el-focus-group-collection");return c(),b(s,null,{default:f(()=>[k(l,nn(on(e.$attrs)),{default:f(()=>[D(e.$slots,"default")]),_:3},16)]),_:3})}var Oo=K(No,[["render",Bo],["__file","/home/runner/work/element-plus/element-plus/packages/components/roving-focus-group/src/roving-focus-group.vue"]]);const Do=E({components:{ElRovingFocusCollectionItem:yo},props:{focusable:{type:Boolean,default:!0},active:{type:Boolean,default:!1}},emits:["mousedown","focus","keydown"],setup(e,{emit:n}){const{currentTabbedId:t,loop:o,onItemFocus:u,onItemShiftTab:d}=P(Ie,void 0),{getItems:l}=P(Ce,void 0),s=De(),y=B(null),v=U(i=>{n("mousedown",i)},i=>{e.focusable?u(a(s)):i.preventDefault()}),h=U(i=>{n("focus",i)},()=>{u(a(s))}),$=U(i=>{n("keydown",i)},i=>{const{key:g,shiftKey:p,target:C,currentTarget:G}=i;if(g===M.tab&&p){d();return}if(C!==G)return;const V=$o(i);if(V){i.preventDefault();let R=l().filter(O=>O.focusable).map(O=>O.ref);switch(V){case"last":{R.reverse();break}case"prev":case"next":{V==="prev"&&R.reverse();const O=R.indexOf(G);R=o.value?ko(R,O+1):R.slice(O+1);break}}Oe(()=>{Ee(R)})}}),S=_(()=>t.value===a(s));return ae(je,{rovingFocusGroupItemRef:y,tabIndex:_(()=>a(S)?0:-1),handleMousedown:v,handleFocus:h,handleKeydown:$}),{id:s,handleKeydown:$,handleFocus:h,handleMousedown:v}}});function Po(e,n,t,o,u,d){const l=N("el-roving-focus-collection-item");return c(),b(l,{id:e.id,focusable:e.focusable,active:e.active},{default:f(()=>[D(e.$slots,"default")]),_:3},8,["id","focusable","active"])}var Mo=K(Do,[["render",Po],["__file","/home/runner/work/element-plus/element-plus/packages/components/roving-focus-group/src/roving-focus-item.vue"]]);const me=Symbol("elDropdown"),{ButtonGroup:Ko}=Pe,Vo=E({name:"ElDropdown",components:{ElButton:Pe,ElButtonGroup:Ko,ElScrollbar:vn,ElDropdownCollection:_n,ElTooltip:hn,ElRovingFocusGroup:Oo,ElOnlyChild:gn,ElIcon:J,ArrowDown:wn},props:bn,emits:["visible-change","click","command"],setup(e,{emit:n}){const t=ye(),o=j("dropdown"),{t:u}=tn(),d=B(),l=B(),s=B(null),y=B(null),v=B(null),h=B(null),$=B(!1),S=[M.enter,M.space,M.down],i=_(()=>({maxHeight:Me(e.maxHeight)})),g=_(()=>[o.m(O.value)]),p=_(()=>yn(e.trigger)),C=De().value,G=_(()=>e.id||C);se([d,p],([m,H],[x])=>{var $e,ke,Se;($e=x==null?void 0:x.$el)!=null&&$e.removeEventListener&&x.$el.removeEventListener("pointerenter",L),(ke=m==null?void 0:m.$el)!=null&&ke.removeEventListener&&m.$el.removeEventListener("pointerenter",L),(Se=m==null?void 0:m.$el)!=null&&Se.addEventListener&&H.includes("hover")&&m.$el.addEventListener("pointerenter",L)},{immediate:!0}),ln(()=>{var m,H;(H=(m=d.value)==null?void 0:m.$el)!=null&&H.removeEventListener&&d.value.$el.removeEventListener("pointerenter",L)});function V(){I()}function I(){var m;(m=s.value)==null||m.onClose()}function R(){var m;(m=s.value)==null||m.onOpen()}const O=Ke();function A(...m){n("command",...m)}function L(){var m,H;(H=(m=d.value)==null?void 0:m.$el)==null||H.focus()}function r(){}function w(){const m=a(y);p.value.includes("hover")&&(m==null||m.focus()),h.value=null}function Q(m){h.value=m}function X(m){$.value||(m.preventDefault(),m.stopImmediatePropagation())}function ne(){n("visible-change",!0)}function Ze(m){(m==null?void 0:m.type)==="keydown"&&y.value.focus()}function qe(){n("visible-change",!1)}return ae(me,{contentRef:y,role:_(()=>e.role),triggerId:G,isUsingKeyboard:$,onItemEnter:r,onItemLeave:w}),ae("elDropdown",{instance:t,dropdownSize:O,handleClick:V,commandHandler:A,trigger:le(e,"trigger"),hideOnClick:le(e,"hideOnClick")}),{t:u,ns:o,scrollbar:v,wrapStyle:i,dropdownTriggerKls:g,dropdownSize:O,triggerId:G,triggerKeys:S,currentTabId:h,handleCurrentTabIdChange:Q,handlerMainButtonClick:m=>{n("click",m)},handleEntryFocus:X,handleClose:I,handleOpen:R,handleBeforeShowTooltip:ne,handleShowTooltip:Ze,handleBeforeHideTooltip:qe,onFocusAfterTrapped:m=>{var H,x;m.preventDefault(),(x=(H=y.value)==null?void 0:H.focus)==null||x.call(H,{preventScroll:!0})},popperRef:s,contentRef:y,triggeringElementRef:d,referenceElementRef:l}}});function Ao(e,n,t,o,u,d){var l;const s=N("el-dropdown-collection"),y=N("el-roving-focus-group"),v=N("el-scrollbar"),h=N("el-only-child"),$=N("el-tooltip"),S=N("el-button"),i=N("arrow-down"),g=N("el-icon"),p=N("el-button-group");return c(),T("div",{class:F([e.ns.b(),e.ns.is("disabled",e.disabled)])},[k($,{ref:"popperRef",role:e.role,effect:e.effect,"fallback-placements":["bottom","top"],"popper-options":e.popperOptions,"gpu-acceleration":!1,"hide-after":e.trigger==="hover"?e.hideTimeout:0,"manual-mode":!0,placement:e.placement,"popper-class":[e.ns.e("popper"),e.popperClass],"reference-element":(l=e.referenceElementRef)==null?void 0:l.$el,trigger:e.trigger,"trigger-keys":e.triggerKeys,"trigger-target-el":e.contentRef,"show-after":e.trigger==="hover"?e.showTimeout:0,"stop-popper-mouse-event":!1,"virtual-ref":e.triggeringElementRef,"virtual-triggering":e.splitButton,disabled:e.disabled,transition:`${e.ns.namespace.value}-zoom-in-top`,teleported:e.teleported,pure:"",persistent:"",onBeforeShow:e.handleBeforeShowTooltip,onShow:e.handleShowTooltip,onBeforeHide:e.handleBeforeHideTooltip},sn({content:f(()=>[k(v,{ref:"scrollbar","wrap-style":e.wrapStyle,tag:"div","view-class":e.ns.e("list")},{default:f(()=>[k(y,{loop:e.loop,"current-tab-id":e.currentTabId,orientation:"horizontal",onCurrentTabIdChange:e.handleCurrentTabIdChange,onEntryFocus:e.handleEntryFocus},{default:f(()=>[k(s,null,{default:f(()=>[D(e.$slots,"dropdown")]),_:3})]),_:3},8,["loop","current-tab-id","onCurrentTabIdChange","onEntryFocus"])]),_:3},8,["wrap-style","view-class"])]),_:2},[e.splitButton?void 0:{name:"default",fn:f(()=>[k(h,{id:e.triggerId,ref:"triggeringElementRef",role:"button",tabindex:e.tabindex},{default:f(()=>[D(e.$slots,"default")]),_:3},8,["id","tabindex"])])}]),1032,["role","effect","popper-options","hide-after","placement","popper-class","reference-element","trigger","trigger-keys","trigger-target-el","show-after","virtual-ref","virtual-triggering","disabled","transition","teleported","onBeforeShow","onShow","onBeforeHide"]),e.splitButton?(c(),b(p,{key:0},{default:f(()=>[k(S,re({ref:"referenceElementRef"},e.buttonProps,{size:e.dropdownSize,type:e.type,disabled:e.disabled,tabindex:e.tabindex,onClick:e.handlerMainButtonClick}),{default:f(()=>[D(e.$slots,"default")]),_:3},16,["size","type","disabled","tabindex","onClick"]),k(S,re({id:e.triggerId,ref:"triggeringElementRef"},e.buttonProps,{role:"button",size:e.dropdownSize,type:e.type,class:e.ns.e("caret-button"),disabled:e.disabled,tabindex:e.tabindex,"aria-label":e.t("el.dropdown.toggleDropdown")}),{default:f(()=>[k(g,{class:F(e.ns.e("icon"))},{default:f(()=>[k(i)]),_:1},8,["class"])]),_:1},16,["id","size","type","class","disabled","tabindex","aria-label"])]),_:3})):z("v-if",!0)],2)}var Lo=K(Vo,[["render",Ao],["__file","/home/runner/work/element-plus/element-plus/packages/components/dropdown/src/dropdown.vue"]]);const zo=E({name:"DropdownItemImpl",components:{ElIcon:J},props:Ve,emits:["pointermove","pointerleave","click","clickimpl"],setup(e,{emit:n}){const t=j("dropdown"),{role:o}=P(me,void 0),{collectionItemRef:u}=P(Cn,void 0),{collectionItemRef:d}=P(Co,void 0),{rovingFocusGroupItemRef:l,tabIndex:s,handleFocus:y,handleKeydown:v,handleMousedown:h}=P(je,void 0),$=Ae(u,d,l),S=_(()=>o.value==="menu"?"menuitem":o.value==="navigation"?"link":"button"),i=U(g=>{const{code:p}=g;if(p===M.enter||p===M.space)return g.preventDefault(),g.stopImmediatePropagation(),n("clickimpl",g),!0},v);return{ns:t,itemRef:$,dataset:{[In]:""},role:S,tabIndex:s,handleFocus:y,handleKeydown:i,handleMousedown:h}}}),Go=["aria-disabled","tabindex","role"];function Ho(e,n,t,o,u,d){const l=N("el-icon");return c(),T(_e,null,[e.divided?(c(),T("li",re({key:0,role:"separator",class:e.ns.bem("menu","item","divided")},e.$attrs),null,16)):z("v-if",!0),Z("li",re({ref:e.itemRef},{...e.dataset,...e.$attrs},{"aria-disabled":e.disabled,class:[e.ns.be("menu","item"),e.ns.is("disabled",e.disabled)],tabindex:e.tabIndex,role:e.role,onClick:n[0]||(n[0]=s=>e.$emit("clickimpl",s)),onFocus:n[1]||(n[1]=(...s)=>e.handleFocus&&e.handleFocus(...s)),onKeydown:n[2]||(n[2]=pe((...s)=>e.handleKeydown&&e.handleKeydown(...s),["self"])),onMousedown:n[3]||(n[3]=(...s)=>e.handleMousedown&&e.handleMousedown(...s)),onPointermove:n[4]||(n[4]=s=>e.$emit("pointermove",s)),onPointerleave:n[5]||(n[5]=s=>e.$emit("pointerleave",s))}),[e.icon?(c(),b(l,{key:0},{default:f(()=>[(c(),b(Y(e.icon)))]),_:1})):z("v-if",!0),D(e.$slots,"default")],16,Go)],64)}var Uo=K(zo,[["render",Ho],["__file","/home/runner/work/element-plus/element-plus/packages/components/dropdown/src/dropdown-item-impl.vue"]]);const Ye=()=>{const e=P("elDropdown",{}),n=_(()=>e==null?void 0:e.dropdownSize);return{elDropdown:e,_elDropdownSize:n}},jo=E({name:"ElDropdownItem",components:{ElDropdownCollectionItem:En,ElRovingFocusItem:Mo,ElDropdownItemImpl:Uo},inheritAttrs:!1,props:Ve,emits:["pointermove","pointerleave","click"],setup(e,{emit:n,attrs:t}){const{elDropdown:o}=Ye(),u=ye(),d=B(null),l=_(()=>{var i,g;return(g=(i=a(d))==null?void 0:i.textContent)!=null?g:""}),{onItemEnter:s,onItemLeave:y}=P(me,void 0),v=U(i=>(n("pointermove",i),i.defaultPrevented),Fe(i=>{if(e.disabled){y(i);return}const g=i.currentTarget;g===document.activeElement||g.contains(document.activeElement)||(s(i),i.defaultPrevented||g==null||g.focus())})),h=U(i=>(n("pointerleave",i),i.defaultPrevented),Fe(i=>{y(i)})),$=U(i=>{if(!e.disabled)return n("click",i),i.type!=="keydown"&&i.defaultPrevented},i=>{var g,p,C;if(e.disabled){i.stopImmediatePropagation();return}(g=o==null?void 0:o.hideOnClick)!=null&&g.value&&((p=o.handleClick)==null||p.call(o)),(C=o.commandHandler)==null||C.call(o,e.command,u,i)}),S=_(()=>({...e,...t}));return{handleClick:$,handlePointerMove:v,handlePointerLeave:h,textContent:l,propsAndAttrs:S}}});function Yo(e,n,t,o,u,d){var l;const s=N("el-dropdown-item-impl"),y=N("el-roving-focus-item"),v=N("el-dropdown-collection-item");return c(),b(v,{disabled:e.disabled,"text-value":(l=e.textValue)!=null?l:e.textContent},{default:f(()=>[k(y,{focusable:!e.disabled},{default:f(()=>[k(s,re(e.propsAndAttrs,{onPointerleave:e.handlePointerLeave,onPointermove:e.handlePointerMove,onClickimpl:e.handleClick}),{default:f(()=>[D(e.$slots,"default")]),_:3},16,["onPointerleave","onPointermove","onClickimpl"])]),_:3},8,["focusable"])]),_:3},8,["disabled","text-value"])}var Je=K(jo,[["render",Yo],["__file","/home/runner/work/element-plus/element-plus/packages/components/dropdown/src/dropdown-item.vue"]]);const Jo=E({name:"ElDropdownMenu",props:$n,setup(e){const n=j("dropdown"),{_elDropdownSize:t}=Ye(),o=t.value,{focusTrapRef:u,onKeydown:d}=P(kn,void 0),{contentRef:l,role:s,triggerId:y}=P(me,void 0),{collectionRef:v,getItems:h}=P(Sn,void 0),{rovingFocusGroupRef:$,rovingFocusGroupRootStyle:S,tabIndex:i,onBlur:g,onFocus:p,onMousedown:C}=P(Ie,void 0),{collectionRef:G}=P(Ce,void 0),V=_(()=>[n.b("menu"),n.bm("menu",o==null?void 0:o.value)]),I=Ae(l,v,u,$,G),R=U(A=>{var L;(L=e.onKeydown)==null||L.call(e,A)},A=>{const{currentTarget:L,code:r,target:w}=A;if(L.contains(w),M.tab===r&&A.stopImmediatePropagation(),A.preventDefault(),w!==a(l)||!Tn.includes(r))return;const X=h().filter(ne=>!ne.disabled).map(ne=>ne.ref);Rn.includes(r)&&X.reverse(),Ee(X)});return{size:o,rovingFocusGroupRootStyle:S,tabIndex:i,dropdownKls:V,role:s,triggerId:y,dropdownListWrapperRef:I,handleKeydown:A=>{R(A),d(A)},onBlur:g,onFocus:p,onMousedown:C}}}),Wo=["role","aria-labelledby"];function Zo(e,n,t,o,u,d){return c(),T("ul",{ref:e.dropdownListWrapperRef,class:F(e.dropdownKls),style:q(e.rovingFocusGroupRootStyle),tabindex:-1,role:e.role,"aria-labelledby":e.triggerId,onBlur:n[0]||(n[0]=(...l)=>e.onBlur&&e.onBlur(...l)),onFocus:n[1]||(n[1]=(...l)=>e.onFocus&&e.onFocus(...l)),onKeydown:n[2]||(n[2]=pe((...l)=>e.handleKeydown&&e.handleKeydown(...l),["self"])),onMousedown:n[3]||(n[3]=pe((...l)=>e.onMousedown&&e.onMousedown(...l),["self"]))},[D(e.$slots,"default")],46,Wo)}var We=K(Jo,[["render",Zo],["__file","/home/runner/work/element-plus/element-plus/packages/components/dropdown/src/dropdown-menu.vue"]]);const qo=ie(Lo,{DropdownItem:Je,DropdownMenu:We}),Qo=ee(Je),Xo=ee(We),xo=fe({modelValue:{type:[Boolean,String,Number],default:!1},disabled:{type:Boolean,default:!1},loading:{type:Boolean,default:!1},size:{type:String,validator:jn},width:{type:[String,Number],default:""},inlinePrompt:{type:Boolean,default:!1},inactiveActionIcon:{type:ce},activeActionIcon:{type:ce},activeIcon:{type:ce},inactiveIcon:{type:ce},activeText:{type:String,default:""},inactiveText:{type:String,default:""},activeValue:{type:[Boolean,String,Number],default:!0},inactiveValue:{type:[Boolean,String,Number],default:!1},activeColor:{type:String,default:""},inactiveColor:{type:String,default:""},borderColor:{type:String,default:""},name:{type:String,default:""},validateEvent:{type:Boolean,default:!0},beforeChange:{type:W(Function)},id:String,tabindex:{type:[String,Number]},value:{type:[Boolean,String,Number],default:!1},label:{type:String,default:void 0}}),et={[he]:e=>ue(e)||ve(e)||te(e),[ge]:e=>ue(e)||ve(e)||te(e),[we]:e=>ue(e)||ve(e)||te(e)},nt=["onClick"],ot=["id","aria-checked","aria-disabled","aria-label","name","true-value","false-value","disabled","tabindex","onKeydown"],tt=["aria-hidden"],lt=["aria-hidden"],st=["aria-hidden"],be="ElSwitch",at=E({name:be}),rt=E({...at,props:xo,emits:et,setup(e,{expose:n,emit:t}){const o=e,u=ye(),{formItem:d}=Fn(),l=Ke(),s=j("switch");(r=>{r.forEach(w=>{Dn({from:w[0],replacement:w[1],scope:be,version:"2.3.0",ref:"https://element-plus.org/en-US/component/switch.html#attributes",type:"Attribute"},_(()=>{var Q;return!!((Q=u.vnode.props)!=null&&Q[w[2]])}))})})([['"value"','"model-value" or "v-model"',"value"],['"active-color"',"CSS var `--el-switch-on-color`","activeColor"],['"inactive-color"',"CSS var `--el-switch-off-color`","inactiveColor"],['"border-color"',"CSS var `--el-switch-border-color`","borderColor"]]);const{inputId:v}=Nn(o,{formItemContext:d}),h=Bn(_(()=>o.loading)),$=B(o.modelValue!==!1),S=B(),i=B(),g=_(()=>[s.b(),s.m(l.value),s.is("disabled",h.value),s.is("checked",I.value)]),p=_(()=>[s.e("label"),s.em("label","left"),s.is("active",!I.value)]),C=_(()=>[s.e("label"),s.em("label","right"),s.is("active",I.value)]),G=_(()=>({width:Me(o.width)}));se(()=>o.modelValue,()=>{$.value=!0}),se(()=>o.value,()=>{$.value=!1});const V=_(()=>$.value?o.modelValue:o.value),I=_(()=>V.value===o.activeValue);[o.activeValue,o.inactiveValue].includes(V.value)||(t(he,o.inactiveValue),t(ge,o.inactiveValue),t(we,o.inactiveValue)),se(I,r=>{var w;S.value.checked=r,o.validateEvent&&((w=d==null?void 0:d.validate)==null||w.call(d,"change").catch(Q=>Pn()))});const R=()=>{const r=I.value?o.inactiveValue:o.activeValue;t(he,r),t(ge,r),t(we,r),Oe(()=>{S.value.checked=I.value})},O=()=>{if(h.value)return;const{beforeChange:r}=o;if(!r){R();return}const w=r();[Te(w),ue(w)].includes(!0)||Mn(be,"beforeChange must return type `Promise<boolean>` or `boolean`"),Te(w)?w.then(X=>{X&&R()}).catch(X=>{}):w&&R()},A=_(()=>s.cssVarBlock({...o.activeColor?{"on-color":o.activeColor}:null,...o.inactiveColor?{"off-color":o.inactiveColor}:null,...o.borderColor?{"border-color":o.borderColor}:null})),L=()=>{var r,w;(w=(r=S.value)==null?void 0:r.focus)==null||w.call(r)};return an(()=>{S.value.checked=I.value}),n({focus:L,checked:I}),(r,w)=>(c(),T("div",{class:F(a(g)),style:q(a(A)),onClick:pe(O,["prevent"])},[Z("input",{id:a(v),ref_key:"input",ref:S,class:F(a(s).e("input")),type:"checkbox",role:"switch","aria-checked":a(I),"aria-disabled":a(h),"aria-label":r.label,name:r.name,"true-value":r.activeValue,"false-value":r.inactiveValue,disabled:a(h),tabindex:r.tabindex,onChange:R,onKeydown:rn(O,["enter"])},null,42,ot),!r.inlinePrompt&&(r.inactiveIcon||r.inactiveText)?(c(),T("span",{key:0,class:F(a(p))},[r.inactiveIcon?(c(),b(a(J),{key:0},{default:f(()=>[(c(),b(Y(r.inactiveIcon)))]),_:1})):z("v-if",!0),!r.inactiveIcon&&r.inactiveText?(c(),T("span",{key:1,"aria-hidden":a(I)},de(r.inactiveText),9,tt)):z("v-if",!0)],2)):z("v-if",!0),Z("span",{ref_key:"core",ref:i,class:F(a(s).e("core")),style:q(a(G))},[r.inlinePrompt?(c(),T("div",{key:0,class:F(a(s).e("inner"))},[r.activeIcon||r.inactiveIcon?(c(),b(a(J),{key:0,class:F(a(s).is("icon"))},{default:f(()=>[(c(),b(Y(a(I)?r.activeIcon:r.inactiveIcon)))]),_:1},8,["class"])):r.activeText||r.inactiveText?(c(),T("span",{key:1,class:F(a(s).is("text")),"aria-hidden":!a(I)},de(a(I)?r.activeText:r.inactiveText),11,lt)):z("v-if",!0)],2)):z("v-if",!0),Z("div",{class:F(a(s).e("action"))},[r.loading?(c(),b(a(J),{key:0,class:F(a(s).is("loading"))},{default:f(()=>[k(a(On))]),_:1},8,["class"])):r.activeActionIcon&&a(I)?(c(),b(a(J),{key:1},{default:f(()=>[(c(),b(Y(r.activeActionIcon)))]),_:1})):r.inactiveActionIcon&&!a(I)?(c(),b(a(J),{key:2},{default:f(()=>[(c(),b(Y(r.inactiveActionIcon)))]),_:1})):z("v-if",!0)],2)],6),!r.inlinePrompt&&(r.activeIcon||r.activeText)?(c(),T("span",{key:1,class:F(a(C))},[r.activeIcon?(c(),b(a(J),{key:0},{default:f(()=>[(c(),b(Y(r.activeIcon)))]),_:1})):z("v-if",!0),!r.activeIcon&&r.activeText?(c(),T("span",{key:1,"aria-hidden":!a(I)},de(r.activeText),9,st)):z("v-if",!0)],2)):z("v-if",!0)],14,nt))}});var it=K(rt,[["__file","/home/runner/work/element-plus/element-plus/packages/components/switch/src/switch.vue"]]);const ct=ie(it);const ut={viewBox:"0 0 1024 1024",width:"1.2em",height:"1.2em"},dt=Z("path",{fill:"currentColor",d:"M160 448a32 32 0 0 1-32-32V160.064a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V416a32 32 0 0 1-32 32H160zm448 0a32 32 0 0 1-32-32V160.064a32 32 0 0 1 32-32h255.936a32 32 0 0 1 32 32V416a32 32 0 0 1-32 32H608zM160 896a32 32 0 0 1-32-32V608a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32v256a32 32 0 0 1-32 32H160zm448 0a32 32 0 0 1-32-32V608a32 32 0 0 1 32-32h255.936a32 32 0 0 1 32 32v256a32 32 0 0 1-32 32H608z"},null,-1),pt=[dt];function ft(e,n){return c(),T("svg",ut,[...pt])}const mt={name:"ep-menu",render:ft},vt={fill:"currentColor",width:"1.2em",height:"1.2em",viewBox:"-2 -2 14 14"},_t=Z("path",{d:"M 0,5 10,5 10,6 0,6 Z"},null,-1),ht=[_t];function gt(e,n){return c(),T("svg",vt,[...ht])}const wt={name:"iconfont-minimize",render:gt},bt={fill:"currentColor",width:"1.2em",height:"1.2em",viewBox:"-2 -2 14 14"},yt=Z("path",{d:"m 2,1e-5 0,2 -2,0 0,8 8,0 0,-2 2,0 0,-8 z m 1,1 6,0 0,6 -1,0 0,-5 -5,0 z m -2,2 6,0 0,6 -6,0 z"},null,-1),Ct=[yt];function It(e,n){return c(),T("svg",bt,[...Ct])}const Et={name:"iconfont-restore",render:It},$t={fill:"currentColor",width:"1.2em",height:"1.2em",viewBox:"-2 -2 14 14"},kt=Z("path",{d:"M 0,0 0,10 10,10 10,0 Z M 1,1 9,1 9,9 1,9 Z"},null,-1),St=[kt];function Tt(e,n){return c(),T("svg",$t,[...St])}const Rt={name:"iconfont-maximize",render:Tt};function Ft(){const e=cn(),n=B(!1);return e.isAvailable&&e.listener("windowChangeMaximize",t=>n.value=t,{immediate:!0}),_(()=>{const t=[];return e.isAvailable&&(t.push({icon:wt,title:"最小化",onclick:()=>e.action("windowMinimize")}),n.value?t.push({icon:Et,title:"还原",onclick:()=>e.action("windowRestore")}):t.push({icon:Rt,title:"最大化",onclick:()=>e.action("windowMaximize")}),t.push({icon:Un,title:"关闭",onclick:()=>e.action("windowClose")})),t})}function Nt(){const e=[{icon:Kn,title:"新建资源",command:"addResource"},{icon:Vn,title:"管理分类",command:"manageCategory"}];function n(t){var o,u;switch(t){case"addResource":(o=Ln.value)==null||o.open();break;case"manageCategory":(u=An.value)==null||u.open();break}}return{menuList:e,handleCommand:n}}const Bt=E({__name:"headerContent",setup(e){const{menuList:n,handleCommand:t}=Nt(),o=Ft(),u=zn();return(d,l)=>{const s=mt,y=J,v=Qo,h=Xo,$=qo,S=to,i=ct,g=Xn;return c(),b(g,{class:"header-content"},{default:f(()=>[k(S,{class:"header-content-column",span:8},{default:f(()=>[k($,{trigger:"click",onCommand:a(t)},{dropdown:f(()=>[k(h,null,{default:f(()=>[(c(!0),T(_e,null,Re(a(n),(p,C)=>(c(),b(v,{key:C,icon:p.icon,command:p.command},{default:f(()=>[dn(de(p.title),1)]),_:2},1032,["icon","command"]))),128))]),_:1})]),default:f(()=>[k(y,{class:"header-content-column__button"},{default:f(()=>[k(s)]),_:1})]),_:1},8,["onCommand"])]),_:1}),k(S,{class:"header-content-column",span:16},{default:f(()=>[k(i,{class:"header-content-column__button header-content-column__switch",modelValue:a(u),"onUpdate:modelValue":l[0]||(l[0]=p=>un(u)?u.value=p:null),size:"small","active-icon":a(Gn),"inactive-icon":a(Hn)},null,8,["modelValue","active-icon","inactive-icon"]),(c(!0),T(_e,null,Re(a(o),(p,C)=>(c(),b(y,{class:"header-content-column__button header-content-column__control",title:p.title,key:C,onClick:p.onclick},{default:f(()=>[(c(),b(Y(p.icon)))]),_:2},1032,["title","onClick"]))),128))]),_:1})]),_:1})}}});const Vt=E({__name:"layout",setup(e){return(n,t)=>{const o=ho,u=N("router-view"),d=go,l=_o;return c(),b(l,{class:"layout"},{default:f(()=>[k(o,{class:"layout-header",height:"40px"},{default:f(()=>[k(Bt)]),_:1}),k(d,{class:"layout-main"},{default:f(()=>[k(u,null,{default:f(({Component:s})=>[(c(),b(pn,null,[(c(),b(Y(s)))],1024))]),_:1})]),_:1})]),_:1})}}});export{Vt as default};