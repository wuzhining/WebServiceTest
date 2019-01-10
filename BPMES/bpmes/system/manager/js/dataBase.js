(function () {
    function menuManage() {

  	/**置空查询输入框**/
      setQueryNull = function (types) {
  		if(types==1){
        	  $('#M_serverName').textbox('setValue',""),
      	      $('#M_UserName').textbox('setValue',""),
      	      $('#M_Password').textbox('setValue',"");
          	  $('#M_dataBase').textbox('setValue',"");
  		} else if(types==2){
	      	  $('#B_serverName').textbox('setValue',""),
	  	      $('#B_UserName').textbox('setValue',""),
	  	      $('#B_Password').textbox('setValue',"");
	      	  $('#B_dataBase').textbox('setValue',"");
  			
  		}else if(types==3){
	      	  $('#E_serverName').textbox('setValue',""),
	  	      $('#E_UserName').textbox('setValue',""),
	  	      $('#E_Password').textbox('setValue',"");
	      	  $('#E_dataBase').textbox('setValue',"");
  		 }

       };
       
       
       /*数据有效性验证*/
       testConnection = function (types) {
               /*数据不能为空验证*/
    	   
    		   var dataBaseName =$('#dataBase').textbox('getValue');
               var M_serverName =$('#M_serverName').textbox('getValue');
               var M_UserName =$('#M_UserName').textbox('getValue');
               var M_Password =$('#M_Password').textbox('getValue');
               var M_dataBase =$('#M_dataBase').textbox('getValue');
               
               var B_serverName =$('#B_serverName').textbox('getValue');
               var B_UserName =$('#B_UserName').textbox('getValue');
               var B_Password =$('#B_Password').textbox('getValue');
               var B_dataBase =$('#B_dataBase').textbox('getValue');
               
               
               var E_serverName =$('#E_serverName').textbox('getValue');
               var E_UserName =$('#E_UserName').textbox('getValue');
               var E_Password =$('#E_Password').textbox('getValue');
               var E_dataBase =$('#E_dataBase').textbox('getValue');
               
               if(dataBaseName==''){
            	   $.messager.alert('提示','请选择数据库名称');
            	   return
               }else{
            	   
            	   if(types==1){
            		   
    	               if (M_serverName == ''||M_UserName==''||M_Password==''||M_dataBase=='') {
    		                  // $('#'+pageConfig.MenuModuleCode).textbox({ required: true });
    	                        $.messager.alert('提示','请输入必选添加信息');
    		                   return false;
    		               }else {
    		            	   $.messager.alert('提示','MES数据库连接成功！');
    		            	   return true;
    		               }
    		              
            		   
            	   }else if(types==2){
    	               if (B_serverName == ''||B_UserName==''||B_Password==''||B_dataBase=='') {
	                        $.messager.alert('提示','请输入必选添加信息');
 		                   return false;
 		               }else {
		            	   $.messager.alert('提示','报表数据库连接成功！');
		            	   return true;
		               }
 		                     		 
            	   }else if(types==3){
    	               if (E_serverName == ''||E_UserName==''||E_Password==''||E_dataBase=='') {
	                        $.messager.alert('提示','请输入必选添加信息');
  		                   return false;
  		               }else {
		            	   $.messager.alert('提示','ERP数据库连接成功！');
		            	   return true;
		               }    

            	   }          	   
	               
               }
       }
       
    }
    menuManage.prototype = {
        init: function () {
            $(function () {

				/*测试连接数据库*/
            	$('#M_TestConnection').click(function(){
            		var types=1;
            		testConnection(types);
                });
            	
				/*测试连接数据库*/
            	$('#B_TestConnection').click(function(){
            		var types=2;
            		testConnection(types);
                });
            	
				/*测试连接数据库*/
            	$('#E_TestConnection').click(function(){
            		var types=3;
            		testConnection(types);
                });

                
				/*清空表单数据*/
            	$('#M_Reset').click(function(){
            		var types=1;
                    setQueryNull(types);
                });
				/*清空表单数据*/
            	$('#B_Reset').click(function(){
            		var types=2;
                    setQueryNull(types);
                });
				/*清空表单数据*/
            	$('#E_Reset').click(function(){
            		var types=3;
                    setQueryNull(types);
                });
                
                

                $("input",$("#MenuModuleName").next("span")).keyup(function(){
                  checkInputLength('MenuModuleName',30);
                })
                $("input",$("#MenuModuleLink").next("span")).keyup(function(){
                  checkInputLength('MenuModuleLink',200);
                })
                $("input",$("#MenuModuleEName").next("span")).keyup(function(){
                  checkInputLength('MenuModuleEName',30);
                })
                $("input",$("#pictureLink").next("span")).keyup(function(){
                  checkInputLength('pictureLink',20);
                })
              //限制输入英文单引号
				$("input",$("#MenuModuleCode").next("span")).keydown(function(e){
	          		   if(e.keyCode==222){
	        				if(e.preventDefault){
	                            e.preventDefault();
	                        }
	                		else
	                		{
	                			e.returnValue = false;
	                        }      
	        			}
	          	   });
				$("input",$("#MenuModuleName").next("span")).keydown(function(e){
	          		   if(e.keyCode==222){
	        				if(e.preventDefault){
	                            e.preventDefault();
	                        }
	                		else
	                		{
	                			e.returnValue = false;
	                        }      
	        			}
	          	   });
				$("input",$("#MenuModuleLink").next("span")).keydown(function(e){
	          		   if(e.keyCode==222){
	        				if(e.preventDefault){
	                            e.preventDefault();
	                        }
	                		else
	                		{
	                			e.returnValue = false;
	                        }      
	        			}
	          	   });
				$("input",$("#MenuModuleEName").next("span")).keydown(function(e){
	          		   if(e.keyCode==222){
	        				if(e.preventDefault){
	                            e.preventDefault();
	                        }
	                		else
	                		{
	                			e.returnValue = false;
	                        }      
	        			}
	          	   });
				$("input",$("#pictureLink").next("span")).keydown(function(e){
	          		   if(e.keyCode==222){
	        				if(e.preventDefault){
	                            e.preventDefault();
	                        }
	                		else
	                		{
	                			e.returnValue = false;
	                        }      
	        			}
	          	   });				
            });
        }
    }
    var pCode = new menuManage();
    pCode.init();
})();
