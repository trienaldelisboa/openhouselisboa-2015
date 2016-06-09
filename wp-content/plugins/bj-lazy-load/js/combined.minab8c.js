(function($,win,doc,undefined){$.fn.sonar=function(distance,full){if(typeof distance==="boolean"){full=distance;distance=undefined}return $.sonar(this[0],distance,full)};var body=doc.body,$win=$(win),onScreenEvent="scrollin",offScreenEvent="scrollout",detect=function(elem,distance,full){if(elem){body||(body=doc.body);var parentElem=elem,elemTop=0,bodyHeight=body.offsetHeight,screenHeight=win.innerHeight||doc.documentElement.clientHeight||body.clientHeight||0,scrollTop=doc.documentElement.scrollTop||win.pageYOffset||body.scrollTop||0,elemHeight=elem.offsetHeight||0;if(!elem.sonarElemTop||elem.sonarBodyHeight!==bodyHeight){if(parentElem.offsetParent){do{elemTop+=parentElem.offsetTop}while(parentElem=parentElem.offsetParent)}elem.sonarElemTop=elemTop;elem.sonarBodyHeight=bodyHeight}distance=distance===undefined?0:distance;return!(elem.sonarElemTop+(full?0:elemHeight)<scrollTop-distance)&&!(elem.sonarElemTop+(full?elemHeight:0)>scrollTop+screenHeight+distance)}},pollQueue={},pollActive=0,pollId,poll=function(){pollId&&clearTimeout(pollId);pollId=setTimeout(function(){var elem,elems,screenEvent,options,detected,i,l;for(screenEvent in pollQueue){elems=pollQueue[screenEvent];for(i=0,l=elems.length;i<l;i++){options=elems[i];elem=options.elem;detected=detect(elem,options.px,options.full);if(screenEvent===offScreenEvent?!detected:detected){if(!options.tr){if(elem["_"+screenEvent]){$(elem).triggerHandler(screenEvent);options.tr=1}else{elems.splice(i,1);i--;l--}}}else{options.tr=0}}}},0)},removeSonar=function(elem,screenEvent){elem["_"+screenEvent]=0},addSonar=function(elem,options){var distance=options.px,full=options.full,screenEvent=options.evt,parent=win,detected=detect(elem,distance,full),triggered=0;elem["_"+screenEvent]=1;if(screenEvent===offScreenEvent?!detected:detected){setTimeout(function(){$(elem).triggerHandler(screenEvent===offScreenEvent?offScreenEvent:onScreenEvent)},0);triggered=1}pollQueue[screenEvent].push({elem:elem,px:distance,full:full,tr:triggered});if(!pollActive){$win.bind("scroll",poll);pollActive=1}};$.sonar=detect;pollQueue[onScreenEvent]=[];$.event.special[onScreenEvent]={add:function(handleObj){var data=handleObj.data||{},elem=this;if(!elem[onScreenEvent]){addSonar(this,{px:data.distance,full:data.full,evt:onScreenEvent})}},remove:function(handleObj){removeSonar(this,onScreenEvent)}};pollQueue[offScreenEvent]=[];$.event.special[offScreenEvent]={add:function(handleObj){var data=handleObj.data||{},elem=this;if(!elem[offScreenEvent]){addSonar(elem,{px:data.distance,full:data.full,evt:offScreenEvent})}},remove:function(handleObj){removeSonar(this,offScreenEvent)}}})(jQuery,window,document);var BJLL=BJLL||{};!function($){function bj_lazy_load_init(){var threshold=200;"undefined"!=typeof BJLL.threshold&&(threshold=parseInt(BJLL.threshold)),$(".lazy-hidden").not(".data-lazy-ready").one("scrollin.bj_lazy_load",{distance:threshold},function(){var $el=$(this),data_lazy_type=$el.attr("data-lazy-type");if("image"==data_lazy_type){var imgurl=$el.attr("data-lazy-src");if("yes"==BJLL.load_responsive||"yes"==BJLL.load_hidpi){var l=document.createElement("a");if(l.href=$el.attr("data-lazy-src"),!l.hostname.length||l.hostname==window.location.hostname){var loadimgwidth=parseInt($el.css("width"));window.devicePixelRatio>1&&"yes"==BJLL.load_hidpi&&(loadimgwidth=Math.ceil(window.devicePixelRatio*loadimgwidth));var srcimgurl=$el.attr("data-lazy-src");"undefined"!=typeof BJLL.site_url&&"undefined"!=typeof BJLL.network_site_url&&(srcimgurl=srcimgurl.replace(BJLL.site_url,BJLL.network_site_url)),imgurl=BJLL.thumb_base+encodeURIComponent(srcimgurl)+"&w="+loadimgwidth}}$el.hide().attr("src",imgurl).removeClass("lazy-hidden").fadeIn()}else"iframe"==data_lazy_type&&$el.replaceWith(bj_lazy_load_base64_decode($el.attr("data-lazy-src")))}).addClass("data-lazy-ready")}function bj_lazy_load_base64_decode(data){var o1,o2,o3,h1,h2,h3,h4,bits,b64="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",i=0,ac=0,dec="",tmp_arr=[];if(!data)return data;data+="";do h1=b64.indexOf(data.charAt(i++)),h2=b64.indexOf(data.charAt(i++)),h3=b64.indexOf(data.charAt(i++)),h4=b64.indexOf(data.charAt(i++)),bits=h1<<18|h2<<12|h3<<6|h4,o1=bits>>16&255,o2=bits>>8&255,o3=255&bits,tmp_arr[ac++]=64==h3?String.fromCharCode(o1):64==h4?String.fromCharCode(o1,o2):String.fromCharCode(o1,o2,o3);while(i<data.length);return dec=tmp_arr.join("")}$(document).on("ready",bj_lazy_load_init),"yes"==BJLL.infinite_scroll&&$(window).on("scroll",bj_lazy_load_init),$(window).on("resize",function(){$(document).trigger("scroll")})}(jQuery);