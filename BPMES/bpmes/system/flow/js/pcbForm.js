/* 启动时加载 */
/*
 */
(function() {
	function pcbForm() {
		initGridData = function() {
			smtInitFlow();
		},
		bindGridData = function(reqData, jsonData) {
			var grid = {
				name : 'pcbWorkFlow_tab',
				dataType : 'json',
				columns : [[{field : 'proDefName',title : '名称',width : 200,align : 'center'},
				            {field : 'proDefKey',title : 'KEY',width : 100,align : 'center'},
				            {field : 'version',title : '版本号',width : 60,align : 'center'},
				            {field : 'proXml',title : 'XML',width : 200,align : 'center',formatter:function(value,row,index){return "<a href='#' style='text-decoration:none;' onclick=showInfo('"+row.proDefId+"','xml') >"+value+"</a>"}},
				            {field : 'proDiagram',title : '图片',width : 200,align : 'center',formatter:function(value,row,index){return "<a href='#' style='text-decoration:none;' onclick=showInfo('"+row.proDefId+"','image') >"+value+"</a>"}},
				            {field : 'depTime',title : '部署时间',width : 200,align : 'center'},
				            {field : 'suspended',title : '是否挂起',width : 100,align : 'center',
				            	formatter : function(value, row, index) {
									if (value=="true") {return "<a href='#' style='text-decoration:none;' onclick=statusFlow('"+row.proDefId+"','active') >激活</a>";
									} else { return "<a href='#' style='text-decoration:none;' onclick=statusFlow('"+row.proDefId+"','suspend') >挂起</a>";
							}}},
				            {field : 'code',title : '',width : 100,align : 'center',hidden:true}
						]],
				onDblClickRow: function(index,row){
					
			    }
			}
			initGridView(reqData, grid);
			$('#pcbWorkFlow_tab').datagrid('loadData', jsonData);
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

	pcbForm.prototype = {
		init : function() {
			$(function() {
				initGridData();
				$('.more').click(function() {
					nextFlow();
				});
			});
		}
	}
	var mwf = new pcbForm();
	mwf.init();
})();
