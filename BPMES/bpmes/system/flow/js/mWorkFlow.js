/* 启动时加载 */
/*
 */
(function() {
	function mWorkFlow() {
		initGridData = function() {
			queryFlow();
		},
		bindGridData = function(reqData, jsonData) {
			var grid = {
				name : 'mworkflow_tab',
				dataType : 'json',
				columns : [[{field : 'MODEL_ID',title : 'ID',width : 100,align : 'center'},
				            {field : 'MODEL_NAME',title : '名称',width : 150,align : 'center'},
				            {field : 'MODEL_KEY',title : 'KEY',width : 120,align : 'center'},
				            {field : 'MODEL_VERSION',title : '版本号',width : 60,align : 'center'},
				            {field : 'MODEL_CREATETIME',title : '创建时间',width : 200,align : 'center'},
				            {field : 'MODEL_LASTUPDATETIME',title : '最后更新时间',width : 200,align : 'center'},
				            {field : 'MODEL_METAINFO',title : '元数据',width : 400,align : 'center'}
						]],
				onDblClickRow: function(index,row){
					
			    }
			}
			initGridView(reqData, grid);
			$('#mworkflow_tab').datagrid('loadData', jsonData);
		},
		
		queryFlow = function(){
			var dgrid = $('#mworkflow_tab').datagrid('options');
			if (!dgrid)
				return;
			var reqData = {
				IFS : 'ACT0000',
				ACT_TYPE:'listModel',
				MODEL_KEY:$('#queryFlowKey').textbox("getValue"),
				MODEL_NAME:$('#queryFlowName').textbox("getValue"),
				pageIndex: 0,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'mworkflow_tab', reqData);
		},
		
		saveFlow = function() {
			var flowName = $('#flowName').textbox('getValue'),
			flowKey = $('#flowKey').textbox('getValue'),
			flowDes = $('#flowDes').textbox('getValue'),
			IFServerNo = "ACT0000",enble=false;
			if(checkNotEmpty(flowName) && checkNotEmpty(flowKey)){
				enble = true;
			}else{
				$("#showSaveInfo").html("<font color=red>提示:名称和key不能为空!</font>");
			}
			if(enble){
				var ajaxParam = {
					url: '/iPlant_ajax',
					dataType: 'JSON',
					data: {
						MODEL_NAME:flowName,
						MODEL_KEY: flowKey,
						MODEL_DESCRIPTION: flowDes,
						ACT_TYPE:'newModel',
						IFS: IFServerNo
					},
					successCallBack: function(data) {
						$('#editTab').dialog('close');
						var modelId = data.RESPONSE[0].RESPONSE_DATA[0].MODEL_ID;
						setDataNull();
						initGridData();
						//进入流程设计器
						//addTabIndex('流程设计', "common/processDesigner/wf/designer/index.html?modelId="+modelId);
						addTabIndex('流程设计', "/iTaurus/activiti-editor/modeler.html?modelId="+modelId);
					},
					errorCallBack: function(errorMsg) {
						$("#showMessageInfo").html('<font color=red>提示:'+errorMsg+'</font>');
						//$.messager.alert('提示', errorMsg);
					}
				};
				iplantAjaxRequest(ajaxParam);
			}
		},
		
		editFlow = function() {
			var modelId,moveIds = [],num = 0;;
			var checkedItems = $('#mworkflow_tab').datagrid('getSelections');
			$.each(checkedItems, function(index, item) {
				moveIds.push(item.moveid);
				num++;
			});
			if(num != 1) {
				$("#showMessageInfo").html('<font color=red>提示:请选择一条数据进行修改</font>');
				//$.messager.alert('提示', '请选择一条数据进行修改');
				return false;
			}
			var row = $("#mworkflow_tab").datagrid("getSelected");
			if(row) {
				modelId = row.MODEL_ID;
				//addTabIndex('流程设计', "common/processDesigner/wf/designer/index.html?id="+modelId);
				addTabIndex('流程设计', "/iTaurus/activiti-editor/modeler.html?modelId="+modelId);
			}
		},
		
		removeFlow = function() {
			var modelId,moveIds = [],num = 0,IFServerNo='ACT0000';
			var checkedItems = $('#mworkflow_tab').datagrid('getSelections');
			$.each(checkedItems, function(index, item) {
				moveIds.push(item.moveid);
				num++;
			});
			if(num != 1) {
				$("#showMessageInfo").html('<font color=red>提示:请选择一条数据进行删除!</font>');
				//$.messager.alert('提示', '请选择一条数据进行修改');
				return false;
			}
			var row = $("#mworkflow_tab").datagrid("getSelected");
			if(row) {
				var delCnt=0;
	            $.messager.confirm('确认框', '您确定要删除您所选择的数据?', function (r) {
	            	 if(r==true){
	            		 $.each(checkedItems, function (index, item) {
	            			 delCnt++;
	                    	 var ajaxParam = {
	                                 url: '/iPlant_ajax',
	                                 dataType: 'JSON',
	                                 data: {
	                                	ACT_TYPE:'removeModel',
	                                	MODEL_ID:row.MODEL_ID,
	                 					IFS: IFServerNo
	                                 },
	                                 successCallBack:function(data){
	                                 	 if(delCnt==checkedItems.length){
		                              	 	if(data.RESPONSE["0"].RESPONSE_HDR.MSG_CODE=='0'){
		                              	 		/*$.messager.alert('提示', '删除成功!','',function(){
			                                	    initGridData();
			                                     });*/
		                              	 		$("#showMessageInfo").html('<font color=red>提示:删除成功!</font>');
		                              	 		initGridData();
		                              	 	}else{
		                              	 		$("#showMessageInfo").html('<font color=red>提示:删除失败,此数据正在使用!</font>');
		                              	 		//$.messager.alert('提示','删除失败,此数据正在使用!')
		                              	 	}
		                                     
		                            	 }
	                         		},
	                         		errorCallBack:function(data){
	                         			if(delCnt==checkedItems.length){
	                         				$("#showMessageInfo").html('<font color=red>提示:删除失败,服务器无响应!</font>');
	                         				//$.messager.alert('提示','删除失败,服务器无响应!');
	                         			}
	                         		}
	                          };
	                         iplantAjaxRequest(ajaxParam);
	                     });
	            	 }
	             });  
			}
		},
		
		deployFlow = function() {
			var modelId,moveIds = [],num = 0,IFServerNo='ACT0000';
			var checkedItems = $('#mworkflow_tab').datagrid('getSelections');
			$.each(checkedItems, function(index, item) {
				moveIds.push(item.moveid);
				num++;
			});
			if(num != 1) {
				$("#showMessageInfo").html('<font color=red>提示:请选择一条数据进行部署!</font>');
				//$.messager.alert('提示', '请选择一条数据进行修改');
				return false;
			}
			var row = $("#mworkflow_tab").datagrid("getSelected");
			if(row) {
				var ajaxParam = {
                        url: '/iPlant_ajax',
                        dataType: 'JSON',
                        data: {
                       	ACT_TYPE:'deployModel',
                       	MODEL_ID:row.MODEL_ID,
        				IFS: IFServerNo
                    },
                    successCallBack:function(data){
                    	if(data.RESPONSE["0"].RESPONSE_HDR.MSG_CODE=='0'){
                 	 		$("#showMessageInfo").html('<font color=red>提示:部署成功!</font>');
                 	 		//$.messager.alert('提示', '部署成功!','',function(){
                 	 		initGridData();
                        //});	
                 	 	}else{
                 	 		$("#showMessageInfo").html('<font color=red>提示:部署失败,此数据正在使用!</font>');
                 	 		//$.messager.alert('提示','部署失败,此数据正在使用!')
                 	 	}
            		},
            		errorCallBack:function(data){
            			if(delCnt==checkedItems.length){
            				$("#showMessageInfo").html('<font color=red>提示:部署失败,服务器无响应!</font>');
            				//$.messager.alert('提示','部署失败,服务器无响应!');
            			}
            		}
                 };
                iplantAjaxRequest(ajaxParam);
			}
		},
		
		exportFlow = function() {
			var modelId,moveIds = [],num = 0,IFServerNo='ACT0000';
			var checkedItems = $('#mworkflow_tab').datagrid('getSelections');
			$.each(checkedItems, function(index, item) {
				moveIds.push(item.moveid);
				num++;
			});
			if(num != 1) {
				$("#showMessageInfo").html('<font color=red>提示:请选择一条数据进行导出!</font>');
				//$.messager.alert('提示', '请选择一条数据进行修改');
				return false;
			}
			var row = $("#mworkflow_tab").datagrid("getSelected");
			if(row) {
				var url = getRootPath_web() + '/model?method=export&MODEL_ID=' + row.MODEL_ID;
				var form=$("<form>");//定义一个form表单
				form.attr("style","display:none");
				form.attr("target","");
				form.attr("method","post");
				form.attr("action",url);
				var input1=$("<input>");
				input1.attr("type","hidden");
				input1.attr("name","exportData");
				input1.attr("value",(new Date()).getMilliseconds());
				$("body").append(form);//将表单放置在web中
				form.append(input1);

				form.submit();
			}
		},
		
		setDataNull = function () {
            $('#flowName').textbox('setValue',''),
            $('#flowKey').textbox('setValue',''),
            $('#flowDes').textbox('setValue',''),
            $('#showMessageInfo').html(""),
            $('#showSaveInfo').html("");
		},
		
		addStation = function() {
    	   $("#editTab").dialog("open").dialog('setTitle', '创建模版');
		}
	}

	mWorkFlow.prototype = {
		init : function() {
			$(function() {
				initGridData();
				$('.add').click(function() {
					addStation();
				});
				
				$('.search').click(function() {
					queryFlow();
				});
				
				$('.save').click(function() {
					saveFlow();
				});
				$('.edit').click(function() {
					editFlow();
				});
				
				$('.delete').click(function() {
					removeFlow();
				});
				
				$('#btnDeploy').click(function() {
					deployFlow();
				});
				
				$('#btnExport').click(function() {
					exportFlow();
				});
				
				$('.panel-tool-close').click(function() {
					setDataNull();
					$('#editTab').dialog('close');
				});
			});
		}
	}
	var mwf = new mWorkFlow();
	mwf.init();
})();
