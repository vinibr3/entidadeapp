(function(){var t,e,n,r,i,a,o,c,l,s,u,h,f,d,p,g,b,y=[].slice,m=function(t,e){function n(){this.constructor=t}for(var r in e)v.call(e,r)&&(t[r]=e[r]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},v={}.hasOwnProperty;if(b=this,f=b.document,r={api:"https://api.github.com",anchorClass:"github-button",iconClass:"octicon",icon:"octicon-mark-github",scriptId:"github-bjs"},(r.script=f.getElementById(r.scriptId))&&(r.url=r.script.src.replace(/[^\/]*([?#].*)?$/,"")),o=function(){function t(){}var e;return t.flatten=function(t){var e,n;return e=function(t,r){var i,a,o,c,l,s;switch(Object.prototype.toString.call(t)){case"[object Object]":for(c in t)s=t[c],e(s,r?r+"."+c:c);break;case"[object Array]":for(i=o=0,l=t.length;l>o;i=++o)a=t[i],e(a,r+"["+i+"]");break;default:n[r]=t}},n={},e(t,""),n},t.expand=function(t){var n,r,i,a,o,c;a=[];for(n in t){for(c=t[n],i=n.match(/((?!\[\d+\])[^.])+|\[\d+\]/g),o=a,r=0;i.length;)null==o[r]&&(o[r]=i[0]===e(i[0])?{}:[]),o=o[r],r=e(i.shift());o[r]=c}return a[0]},e=function(t){var e;return(e=t.match(/^\[(\d+)\]$/))?Number(e[1]):t},t}(),s=function(){function t(){}return t.stringify=function(t){var e,n,r;n=[];for(e in t)r=t[e],n.push(e+"="+(null!=r?r:""));return n.join("&")},t.parse=function(t){var e,n,r,i,a,o,c,l;for(i={},o=t.split("&"),e=0,r=o.length;r>e;e++)a=o[e],""!==a&&(c=a.split("="),n=c[0],l=2<=c.length?y.call(c,1):[],""!==n&&(i[n]=l.join("=")));return i},t}(),l=function(){function t(){}return t.encode=function(t){return"#"+encodeURIComponent(s.stringify(o.flatten(t)))},t.decode=function(t){return null==t&&(t=f.location.hash),o.expand(s.parse(decodeURIComponent(t.replace(/^#/,""))))||{}},t}(),a=function(){function t(t){this.$=t}var e,n;return t.prototype.on=function(){var t,n,r,i,a,o,c;for(r=2<=arguments.length?y.call(arguments,0,a=arguments.length-1):(a=0,[]),i=arguments[a++],t=function(t){return function(e){return i.call(t,e||b.event)}}(this),o=0,c=r.length;c>o;o++)n=r[o],e(this.$,n,t)},t.prototype.once=function(){var t,r,i,a,o,c,l;for(i=2<=arguments.length?y.call(arguments,0,o=arguments.length-1):(o=0,[]),a=arguments[o++],t=function(e){return function(r){var o,c,l;for(c=0,l=i.length;l>c;c++)o=i[c],n(e.$,o,t);return a.call(e,r||b.event)}}(this),c=0,l=i.length;l>c;c++)r=i[c],e(this.$,r,t)},e=function(t,e,n){t.addEventListener?t.addEventListener(""+e,n):t.attachEvent("on"+e,n)},n=function(t,e,n){t.removeEventListener?t.removeEventListener(""+e,n):t.detachEvent("on"+e,n)},t}(),i=function(t){function e(t,e){this.$=t&&1===t.nodeType?t:f.createElement(t),e&&e.call(this,this.$)}var n,r,i,a;return m(e,t),e.prototype.addClass=function(t){r(this.$,t)||n(this.$,t)},e.prototype.removeClass=function(t){r(this.$,t)&&a(this.$,t)},e.prototype.hasClass=function(t){return r(this.$,t)},n=function(t,e){t.className+=" "+e},a=function(t,e){t.className=(" "+t.className+" ").replace(i," ").replace(" "+e+" ","").replace(/^ | $/,"")},r=function(t,e){return(" "+t.className+" ").replace(i," ").indexOf(" "+e+" ")>=0},i=/[ \t\n\f\r]+/g,e}(a),c=function(t){function e(t){e.__super__.constructor.call(this,"iframe",function(e){var n,r,i,a;r={allowtransparency:!0,scrolling:"no",frameBorder:0};for(n in r)a=r[n],e.setAttribute(n,a);i={border:"none",height:"0",width:"1px"};for(n in i)a=i[n],e.style[n]=a;t&&t.call(this,e)})}var n,r;return m(e,t),e.prototype.html=function(t){var e;try{e=this.$.contentWindow.document,e.open(),e.write(t),e.close()}catch(n){}},e.prototype.load=function(t){this.$.src=t},e.prototype.size=function(){var t,e,n,i,a,o;try{return n=this.$.contentWindow.document,a=n.documentElement,t=n.body,a.style.overflow=t.style.overflow=b.opera?"scroll":"visible",o=t.scrollWidth,i=t.scrollHeight,t.getBoundingClientRect&&(t.style.display="inline-block",e=t.getBoundingClientRect(),o=Math.max(o,r(e.width)),i=Math.max(i,r(e.height)),t.style.display=""),a.style.overflow=t.style.overflow="",{width:o+"px",height:i+"px"}}catch(c){}},e.prototype.resize=function(t){var e,n,r;n=null!=t?t:this.size()||{},r=n.width,e=n.height,r&&(this.$.style.width=r),e&&(this.$.style.height=e)},n=b.devicePixelRatio||1,r=function(t){return n>1?Math.ceil(Math.round(t*n)/n*2)/2||0:Math.ceil(t)},e}(i),t=function(){function t(){}return t.parse=function(t){var e,n,r,i;return{href:t.href,text:t.getAttribute("data-text")||t.textContent||t.innerText||"",data:{count:{api:(e=t.getAttribute("data-count-api"))&&~e.indexOf("#")?e.replace(/^(?!\/)/,"/"):void 0,href:t.getAttribute("data-count-href")||t.href,aria:{label:(r=t.getAttribute("data-count-aria-label"))?r:void 0}},style:(i=t.getAttribute("data-style"))?i:void 0,icon:(n=t.getAttribute("data-icon"))?n:void 0},aria:{label:(r=t.getAttribute("aria-label"))?r:void 0}}},t}(),e=function(t){function e(t,n,a){var o;e.__super__.constructor.call(this,n),o=function(e){return function(){var n;n=e.size(),e.once("load",function(){this.resize(n),a&&a.call(this,this.$)}),e.load(r.url+"buttons.html"+t)}}(this),this.once("load",function(){(n=this.$.contentWindow.callback)?new i(n.script,function(t){this.on("load","error",o),t.readyState&&this.on("readystatechange",function(){/i/.test(t.readyState)||o()})}):o()}),this.html('<!DOCTYPE html>\n<html>\n<head>\n<meta charset="utf-8">\n<title></title>\n<link rel="stylesheet" href="'+r.url+'assets/css/buttons.css">\n<script>document.location.hash = "'+t+'";</script>\n</head>\n<body>\n<script src="'+r.script.src+'"></script>\n</body>\n</html>')}return m(e,t),e}(c),n=function(){function t(t){t&&t.data&&(f.body.className=t.data.style||"",c&&t.href&&(c.href=t.href,l.test(c.href)&&(c.href=t.href=t.data.count.href="#")),new e(t,function(t){f.body.appendChild(t)}),new n(t.data.count,function(t){f.body.appendChild(t)}),c&&c.removeAttribute("href"))}var e,n,a,c,l;return e=function(t){function e(t,e){new a(t.href,function(n){n.className="button",t.aria.label&&n.setAttribute("aria-label",t.aria.label),new i("i",function(e){e=f.createElement("i"),e.className=(t.data.icon||r.icon)+(r.iconClass?" "+r.iconClass:""),e.setAttribute("aria-hidden","true"),n.appendChild(e)}),new i("span",function(t){t.appendChild(f.createTextNode(" ")),n.appendChild(t)}),new i("span",function(e){t.text&&e.appendChild(f.createTextNode(t.text)),n.appendChild(e)}),e&&e(n)})}return m(e,t),e}(i),n=function(t){function e(t,e){t&&t.api&&new a(t.href,function(n){n.className="count",new i("b",function(t){n.appendChild(t)}),new i("i",function(t){n.appendChild(t)}),new i("span",function(a){var c;n.appendChild(a),c=function(){var e,n;return n=t.api.split("#")[0],e=s.parse(n.split("?").slice(1).join("?")),e.callback="callback",n.split("?")[0]+"?"+s.stringify(e)}(),new i("script",function(i){var l;i.async=!0,i.src=""+r.api+c,b.callback=function(r){var i;b.callback=null,200===r.meta.status&&(i=o.flatten(r.data)[t.api.split("#").slice(1).join("#")],"[object Number]"===Object.prototype.toString.call(i)&&(i=(""+i).replace(/\B(?=(\d{3})+(?!\d))/g,",")),a.appendChild(f.createTextNode(" "+i+" ")),t.aria.label&&n.setAttribute("aria-label",t.aria.label.replace("#",i)),e&&e(n))},b.callback.script=i,this.on("error",function(){b.callback=null}),i.readyState&&this.on("readystatechange",function(){"loaded"===i.readyState&&i.children&&"loading"===i.readyState&&(b.callback=null)}),l=f.getElementsByTagName("head")[0],l.insertBefore(i,l.firstChild)})})})}return m(e,t),e}(i),a=function(t){function e(t,n){e.__super__.constructor.call(this,"a",function(e){c&&(e.href=t,l.test(e.href)&&(e.href="#"),"#"===e.getAttribute("href")&&(e.target="_self"),e.href=e.cloneNode().href),n&&n(e)})}return m(e,t),e}(i),c=f.getElementsByTagName("base")[0],l=/^javascript:/i,t}(),r.script)for(h=f.querySelectorAll?f.querySelectorAll("a."+r.anchorClass):function(){var t,e,n,a;for(n=f.getElementsByTagName("a"),a=[],t=0,e=n.length;e>t;t++)u=n[t],new i(u).hasClass(r.anchorClass)&&a.push(u);return a}(),d=function(n){new e(l.encode(t.parse(n)),function(t){f.body.appendChild(t)},function(t){n.parentNode.insertBefore(t,n),n.parentNode.removeChild(n)})},p=0,g=h.length;g>p;p++)u=h[p],d(u);else new n(l.decode())}).call(this);
//# sourceMappingURL=buttons.js.map