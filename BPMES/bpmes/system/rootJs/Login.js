(function () {
    function Login() { 
    	checkUserName=function () {
            if ($("#UserName").val().length == 0) {
                $(".nameText").css("color", "red").text("用户名不为空");
                $.messager.alert('提示', "用户名不为空");
                return false;
            }
            else {
                var reg = /^[A-Za-z0-9_]{0,9}$/;
                if (!reg.test($('#UserName').val())) {
                    $(".nameText").css("color", "red").text("格式不正确（由数字/字母组成0-9个字符）");
                    $.messager.alert('提示', "用户名不正确");
                    return false;
                }
                else {
                    $(".nameText").css("color", "red").text("");
                    return true;
                };
            };
        },
        checkUserPwd=function () {
            if ($('#PassWord').val().length == 0) {
                $(".passText").css("color", "red").text("密码不为空");
                $.messager.alert('提示', "密码不为空");
                return false;
            }
            else {
                $(".passText").css("color", "red").text("");
                return true;
            }
        },
        caneclLogin = function(){
        	window.location.href = "Login.html";
        },
//        defaultPage = function(sysBel){
//        	window.location.href = "Default.html?userName="+$.cookie('UserName')+"&cdId="+'1'+"&sysBel="+sysBel;
//        }
        defaultPage = function(sysBel){
        	//if(sysBel=='s1erp'){
        	//	window.location.href = "https://www.iworker.cn/outside/oauth_login/oauth_login_apply/action:token_login?client_id=9535700&client_secret=affa205ba92d484f9b16f8f9774247ce&access_token=e93d7821-ce02-4d94-84f2-ea1bc83336ad&refresh_token=a698f259-3ef9-4303-8125-2e9db5ed73f3 "
        	//}else{
        		window.location.href = "Default.html?userName="+$.cookie('UserName')+"&cdId="+'1'+"&sysBel="+sysBel;
        	//}       	
        }
    }
    Login.prototype = {
    	init: function () {
        	$(function () {
        		var remmberUserName = $.cookie('remmberUserName'),divMain = $("#divMain"),divMainLogin = $("#divMainLogin"),divMainPortal = $("#divMainPortal");
        		if(remmberUserName == 'true'){
        			$('#checkUserName').prop('checked','checked');
        			var UserName = $.cookie('UserName');
        			$('#UserName').attr("value",UserName);
        		}else{
        			$('#checkUserName').prop('checked','');
        		}
        	    $(".submitForm").click(function () {
        	        if (checkUserName() && checkUserPwd()) {
        	            var data = {
        	                USE_CD: $('#UserName').val(),
        	                PW: $('#PassWord').val(),
        	                IFS: 'D000037',
        	                reqType:'WEB'
        	            };
        	            $.ajax({
        	                type: "POST",
        	                url: 'iPlant_login',
        	                dataType: "json",
        	                data: data,
        	                success: function (data) {
        	                	if (data.IRETCODE == 0) {
        	                		if($('#checkUserName').is(':checked')){
        	                			checkinfo = 'true'
        	                		}else{
        	                			checkinfo = 'false'
        	                		}
        	                		$.cookie('remmberUserName',checkinfo);
        	                    	$.cookie('UserName',$('#UserName').val());
        	                    	divMainLogin.hide();
        	                    	divMainPortal.text("");// 清空数据
        	                    	var ajaxParamPortal = {
    	                                url: '/iPlant_ajax',
    	                                dataType: 'JSON',
    	                                data: {
    	                                    IFS: 'D000070'
    	                                },
    	                                successCallBack:function(data){
	    	                               	 //加载列表
	    	                               	 var dataList,childData=[],str;
	    	                               	 if(data.RESPONSE.length>0){
	    	                               		dataList =  data.RESPONSE[0].RESPONSE_DATA;
	    	                               		console.log(dataList);
	    	                               		if(dataList.length>0){
	    	                               			$.each(dataList, function(i, item){
		    	                                       	 var lastNum = 0;
		    	                                       	 if(dataList.length>12){
		    	                                       		 lastNum = 12;
		    	                                       	 }else{
		    	                                       		 lastNum = dataList.length-1;
		    	                                       	 }
		    	                                       	 if(dataList.length==1){
		    	                                       		 str="<table align=center style='width=800px;'><tbody><tr><td width=100px><a href='#' onclick=defaultPage('"+item.DICT_IT+"')><img src='common/RootImages/"+item.DICT_IT+".png'/><br/>&nbsp;"+item.DICT_IT_NM+"</a></td></tr></tbody></table>";
		    	                                       	 }else{
		    	                                       		if(i<16){
		    	                                       		 	if(i==0){
		    	                             			   			str="<table align=center style='width=800px;'><tbody><tr><td width=100px><a href='#' onclick=defaultPage('"+item.DICT_IT+"')><img src='common/RootImages/"+item.DICT_IT+".png'/><br/>&nbsp;"+item.DICT_IT_NM+"</a></td>";			                             			   		 	
		    	                                       		 	}else if(i%6===0 && i!=0){
		    	                             			   			str = str+"</tr><tr><td width=100px><a href='#' onclick=defaultPage('"+item.DICT_IT+"')><img src='common/RootImages/"+item.DICT_IT+".png'/><br/>&nbsp;"+item.DICT_IT_NM+"</a></td>";
			                             			   		 	}else if(lastNum ==i){
		    	                             			   		 	str = str+"<td width=100px><a href='#' onclick=defaultPage('"+item.DICT_IT+"')><img src='common/RootImages/"+item.DICT_IT+".png'/><br/>&nbsp;"+item.DICT_IT_NM+"</a></td></tr></tbody></table>";
			                             			   		 	}else{
		    	                             			   		 	str = str+"<td width=100px><a href='#' onclick=defaultPage('"+item.DICT_IT+"')><img src='common/RootImages/"+item.DICT_IT+".png'/><br/>&nbsp;"+item.DICT_IT_NM+"</a></td>";
			                             			   		 	}
			                                       	 		}
		    	                                       	 }
    	                                        	})
    	                               			}else{
    	                               				if($.cookie('UserName')=="admin"){
    	                               					str="<table align=center style='width=500px;'><tbody><tr><td width=100px><a href='#' onclick=defaultPage('s1')><img src='common/RootImages/SYS.png'/><br/>&nbsp;系统管理</a></td></tr></tbody></table>";
    	                               				}
    	                               			}
	                                        	str = str+"<a href='javascript:void(0)' onclick='caneclLogin()'><div style='padding:16px 0;text-align:center;margin-top:15px;margin-left:370px;width:114px;height:51px;background:url(common/RootImages/cancelLogin.png) no-repeat;'><font style='' color='#FFF' size='3'>退  出</font></div></a>";
    	                               	 		str=str+"<span id='QRcode2' ><img src='common/RootImages/QRcode2.png' height='80px' width='80px'/></span>";
	    	                               	 }
    	                               	 	divMainPortal.append(str); // 添加Html内容，不能用Text 或 Val
    	                                }
    	                           };
    	                           iplantAjaxRequest(ajaxParamPortal);
        	                    }
        	                	else if(data.IRETCODE==1){
        	                		$.messager.alert('提示', '密码错误','error');
        	                	}
        	                	else if(data.IRETCODE==2){
        	                    	$.messager.alert('提示', '用户不存在','error');
        	                    }
        	                	else if(data.IRETCODE==3){
        	                		$.messager.alert('提示', '用户已登录','error');
        	                	}
        	                	else if(data.USE_YN=='N'){
        	                		$.messager.alert('提示', '用户未启用','error');
        	                	}
        	                },
        	                error:function(e){
        	                	$.messager.alert('提示', '用户名或密码错误','error');
        	                }
        	            });
        	        }
        	    });       	   
        	    $(window).keydown(function(event){ 
					if(event.keyCode==13){ 
						$(".submitForm").click(); 
					}
				});
        	    $("#LanguageCombox").combobox({
        	    	onSelect: function (r) {
        	    		if(window.easyloader){
        	    		}
        	    		else{
        	    		}
        	    	}
        	    });//dfdfdsfd
//      	    $('.text').each(function(){  
//			        var txt = $(this).val();  
//			        $(this).focus(function(){  
//			        if(txt === $(this).val()) $(this).val("");  
//			        }).blur(function(){  
//			         if($(this).val() == "") $(this).val(txt);  
//			        });  
//			     }) 
				$("#see_pwd_btn").click(function() {
//					alert('ll');
		            var obj=$(this);
//		            obj.prop('src',RootImages/passwordbox_open.png);
		            var ch_reg_pwd = $("#PassWord");  
		            var objImg = $("#see_pwd_on");
		            if (obj.attr("data-flag") != 1) { 
		            	ch_reg_pwd.attr('type','text');
		            	objImg.attr('src','common/RootImages/passwordbox_open.png');
 
		                obj.addClass("see_pwd_on").attr("data-flag", 1);  
		            } else {
		            	objImg.attr('src','common/RootImages/passwordbox_close.png');
						ch_reg_pwd.attr('type','password');
		                obj.removeClass("see_pwd_on").attr("data-flag", "");  
		            }  
		        })
        	});
        }
    }
    var login = new Login();
    login.init();
})();




















