OVERRIDE({origin:TABLE,func:function(origin){"use strict";global.TABLE=CLASS({preset:function(){return origin},init:function(cls,inner,self,params){var childs=params===undefined?undefined:params.childs,tbody=DOM({tag:"tbody"}).appendTo(self),append,prepend,removeAllChilds,getChilds;self.append=append=function(node){tbody.append(node)};if(childs!==undefined){EACH(childs,function(child,i){append(child)})}self.prepend=prepend=function(node){tbody.prepend(node)};self.removeAllChilds=removeAllChilds=function(){tbody.removeAllChilds()};self.getChilds=getChilds=function(){return tbody.getChilds()}}})}});