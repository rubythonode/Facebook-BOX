RUN(function(){"use strict";var loadFixScript=function(name){document.write('<script src="/UPPERCASE/R/BROWSER_FIX/IE/'+name+'.js"><'+"/"+"script>")};global.IE={};/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(navigator.userAgent);IE.version=parseInt(RegExp.$1,10);loadFixScript("INFO");if(RUN(function(){var canvas=document.createElement("canvas");return canvas.getContext===undefined||canvas.getContext("2d")===undefined})===true){loadFixScript("LIB/fxcanvas/jooscript");loadFixScript("LIB/fxcanvas/fxcanvas");loadFixScript("LIB/fxcanvas/flash_backend");loadFixScript("DOM/CANVAS");loadFixScript("CONTEXT");loadFixScript("INFO_NO_CANVAS")}if(IE.version<=6){loadFixScript("LIB/iepngfix/iepngfix_tilebg")}loadFixScript("E");loadFixScript("EVENT_LOW");if(global.innerWidth===undefined){loadFixScript("WIN_WIDTH")}if(global.innerHeight===undefined){loadFixScript("WIN_HEIGHT")}loadFixScript("ADD_STYLE");if(IE.version<=8){loadFixScript("DOM/IMG")}if(IE.version<=7){loadFixScript("DOM/IFRAME")}if(IE.version<=7){loadFixScript("CLEAR_BOTH")}if(IE.version<=8){loadFixScript("COPY/COPY_DATA");loadFixScript("COPY/COPY_ARRAY");loadFixScript("PACK_DATA");loadFixScript("UNPACK_DATA")}if(IE.version<=7){loadFixScript("DOM/TABLE")}if(IE.version<=8){loadFixScript("DOM/TD")}if(IE.version<=8){loadFixScript("ANIMATE");loadFixScript("KEYFRAME")}if(IE.version<=7){loadFixScript("CLOSE_WIN")}});