/* 启动时加载 */
/*
 */
(function() {
	function smtForm() {
		initGridData = function() {
			smtInitFlow();
		},
		smtInitFlow = function(){
			
		},
		nextFlow = function() {
			var IFServerNo='ACT0000',smtkey="smt_flow",barCode = $("barCode").textbox("getValue");
			if(!checkNotEmpty(barCode)){
				$("#showMessageInfo").html('<font color=red>提示:请输入条码!</font>');
				return false;
			}else{
				startRunFlow(smtkey);//启动流程
				var ajaxParam = {//提交表单进入下一节点
	                    url: '/iPlant_ajax',
	                    dataType: 'JSON',
	                    data: {
	                   	ACT_TYPE:'listStartedProcessInstances',
	                   	
	    				IFS: IFServerNo
	                },
	                successCallBack:function(data){
	                	if(data.RESPONSE["0"].RESPONSE_HDR.MSG_CODE=='0'){
	             	 		$("#showMessageInfo").html('<font color=red>提示:完成成功!</font>');
	             	 		//业务处理
	             	 		var busParam = {
                                url: '/iPlant_ajax',
                                dataType: 'JSON',
                                data: {
	                                BAR_CODE:barCode,
	                               	FLOW_KEY:smtkey,
	                               	CD:autoCreateCode("ACT"),
	                				IFS: "FLOW0002"
	                            },
	                            successCallBack:function(data){
	                            	if(data.RESPONSE["0"].RESPONSE_HDR.MSG_CODE=='0'){
	                         	 		$("#showMessageInfo").html('<font color=red>提示:完成成功!</font>');
	                         	 	}else{
	                         	 		$("#showMessageInfo").html('<font color=red>提示:完成失败,此数据正在使用!</font>');
	                         	 	}
	                    		},
	                    		errorCallBack:function(data){
	                    			if(delCnt==checkedItems.length){
	                    				$("#showMessageInfo").html('<font color=red>提示:完成失败,服务器无响应!</font>');
	                    			}
	                    		}
	                         };
	                        iplantAjaxRequest(busParam);
	             	 	}else{
	             	 		$("#showMessageInfo").html('<font color=red>提示:完成失败,此数据正在使用!</font>');
	             	 	}
	        		},
	        		errorCallBack:function(data){
	        			if(delCnt==checkedItems.length){
	        				$("#showMessageInfo").html('<font color=red>提示:完成失败,服务器无响应!</font>');
	        			}
	        		}
	             };
	            iplantAjaxRequest(ajaxParam);
			}
		}
	}

	smtForm.prototype = {
		init : function() {
			$(function() {
				initGridData();
				$('.more').click(function() {
					nextFlow();
				});
			});
		}
	}
	var mwf = new smtForm();
	mwf.init();
})();
