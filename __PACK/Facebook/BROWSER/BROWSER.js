Facebook.Comments=CLASS({preset:function(){"use strict";return IFRAME},init:function(cls,inner,self,params){"use strict";var href=params.href,colorscheme=params.colorscheme===undefined?"dark":params.colorscheme,width=params.width,height,el=self.getEl();if(width===undefined){width=550}height=16;self.setSrc("//www.facebook.com/plugins/comments.php?href="+encodeURIComponent(href)+"&width="+width+"&height="+height+"&colorscheme="+colorscheme+"&appId="+CONFIG.Facebook.appId);self.addStyle({width:width,height:height})}});Facebook.LikeButton=CLASS({preset:function(){"use strict";return IFRAME},init:function(cls,inner,self,params){"use strict";var href=params.href,layout=params.layout===undefined?"standard":params.layout,action=params.action===undefined?"like":params.action,isShowShareButton=params.isShowShareButton===undefined?true:params.isShowShareButton,isShowFaces=params.isShowFaces===undefined?true:params.isShowFaces,colorscheme=params.colorscheme===undefined?"dark":params.colorscheme,width=params.width,height,el=self.getEl();if(layout==="standard"){if(width===undefined){width=450}height=35;if(isShowFaces===true){height=80}}if(layout==="button_count"){if(width===undefined){width=160}height=20}if(layout==="box_count"){if(width===undefined){width=65}height=86}self.setSrc("//www.facebook.com/plugins/like.php?href="+encodeURIComponent(href)+"&width="+width+"&height="+height+"&colorscheme="+colorscheme+"&layout="+layout+"&action="+action+"&show_faces="+isShowFaces+"&share="+isShowShareButton+"&appId="+CONFIG.Facebook.appId);self.addStyle({width:width,height:height})}});Facebook.ProfileImg=CLASS({preset:function(){"use strict";return IMG},init:function(cls,inner,self,params){"use strict";var id=params.id,type=params.type;self.setSrc("http://graph.facebook.com/"+id+"/picture"+(type===undefined?"":"?type="+type))}});Facebook.checkSigned=METHOD({run:function(m,callbacks){"use strict";var signed=callbacks.signed,unsigned=callbacks.unsigned;if(CONFIG.Facebook!==undefined){FB.getLoginStatus(function(response){if(response.status==="connected"){FB.api("/me",function(response){FB.api({method:"fql.query",query:"SELECT uid, name FROM user WHERE uid IN (SELECT uid2 FROM friend WHERE uid1 = me())"},function(friendInfos){response.friends=friendInfos;if(signed!==undefined){signed(response)}})})}else if(unsigned!==undefined){unsigned()}})}}});Facebook.init=OBJECT({init:function(){"use strict";if(CONFIG.Facebook!==undefined){FB.init({appId:CONFIG.Facebook.appId,channelUrl:"//"+CONFIG.Facebook.domain+"/Facebook/R/channel.html",cookie:true})}}});Facebook.invite=METHOD({run:function(m,params){"use strict";var message=params.message,display=params.display;FB.ui({method:"apprequests",message:message,display:display},function(response){})}});Facebook.share=METHOD({run:function(m,params){"use strict";var href=params.href,display=params.display;FB.ui({method:"feed",display:display,link:href},function(response){})}});Facebook.signIn=METHOD({run:function(m,scope,_callbacks){"use strict";var callbacks=_callbacks===undefined?scope:_callbacks,signed=callbacks.signed,unsigned=callbacks.unsigned;if(_callbacks===undefined){scope=undefined}FB.getLoginStatus(function(response){if(response.status==="connected"){FB.api("/me",function(response){signed(response)})}else if(response.status==="not_authorized"){FB.login(function(response){if(response.status==="connected"){FB.api("/me",function(response){FB.api({method:"fql.query",query:"SELECT uid, name FROM user WHERE uid IN (SELECT uid2 FROM friend WHERE uid1 = me())"},function(friendInfos){response.friends=friendInfos;signed(response)})})}else if(unsigned!==undefined){unsigned()}},{scope:scope})}else{FB.login(function(response){if(response.status==="connected"){FB.api("/me",function(response){FB.api({method:"fql.query",query:"SELECT uid, name FROM user WHERE uid IN (SELECT uid2 FROM friend WHERE uid1 = me())"},function(friendInfos){response.friends=friendInfos;signed(response)})})}else if(unsigned!==undefined){unsigned()}},{scope:scope})}})}});Facebook.signOut=METHOD({run:function(m,callback){"use strict";if(global.FB!==undefined&&FB.getAuthResponse()!==undefined&&FB.getAuthResponse()!==null){FB.logout(function(response){if(callback!==undefined){callback()}})}}});var fbRoot=document.createElement("div");fbRoot.id="fb-root";document.body.appendChild(fbRoot);(function(d){var js,id="facebook-jssdk",ref=d.getElementsByTagName("script")[0];if(d.getElementById(id)){return}js=d.createElement("script");js.id=id;js.async=true;js.src="//connect.facebook.net/en_US/all.js";ref.parentNode.insertBefore(js,ref)})(document);