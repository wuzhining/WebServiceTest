/* 启动时加载 */
/*
 */
(function() {
	function rWorkFlow() {
		initGridData = function() {
			var dgrid = $('#rWorkFlow_tab').datagrid('options');
			if (!dgrid)
				return;
			var reqData = {
				IFS : 'ACT0000',
				ACT_TYPE:'processAllList',
				pageIndex: 0,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'rWorkFlow_tab', reqData);
		},
		bindGridData = function(reqData, jsonData) {
			var grid = {
				name : 'rWorkFlow_tab',
				dataType : 'json',
				columns : [[{field : 'type',title : '类型',width : 150,align : 'center'},
				            {field : 'userId',title : '发起人',width : 150,align : 'center'},
				            {field : 'applyTime',title : '申请时间',width : 120,align : 'center'},
				            {field : 'startTime',title : '开始时间',width : 120,align : 'center'},
				            {field : 'endTime',title : '结束时间',width : 120,align : 'center'},
				            {field : 'name',title : '当前节点',width : 200,align : 'center',formatter:function(value,row,index){return "<a href='#' style='text-decoration:none;' onclick=showInfo('"+row.proDefId+"','image') >"+value+"</a>"}},
				            {field : 'createTime',title : '任务创建时间',width : 200,align : 'center'},
				            {field : 'suspended',title : '流程状态',width : 100,align : 'center',
				            	formatter : function(value, row, index) {
									if (value=="true") {return "<a href='#' style='text-decoration:none;' onclick=statusFlow('"+row.proDefId+"','active') >激活</a>";
									} else { return "<a href='#' style='text-decoration:none;' onclick=statusFlow('"+row.proDefId+"','suspend') >挂起</a>";
							}}},
				            {field : 'assignee',title : '当前处理人',width : 100,align : 'center'}
						]],
				onDblClickRow: function(index,row){
					
			    }
			}
			initGridView(reqData, grid);
			$('#rWorkFlow_tab').datagrid('loadData', jsonData);
		},
		
		statusFlow = function(id,status) {
			var num = 0,IFServerNo='ACT0000',msg="激活";
			if(status=="suspend"){
				msg="挂起";
			}
			var ajaxParam = {
                url: '/iPlant_ajax',
                dataType: 'JSON',
                data: {
	               	ACT_TYPE:'statusProcess',
	               	processDefinitionId:id,
	               	status:status,
					IFS: IFServerNo
	            },
	            successCallBack:function(data){
	            	if(data.RESPONSE["0"].RESPONSE_HDR.MSG_CODE=='0'){
	         	 		$("#showMessageInfo").html("<font color=red>提示:"+msg+"操作成功!</font>");
	         	 		initGridData();
	         	 	}else{
	         	 		$("#showMessageInfo").html("<font color=red>提示:"+msg+"操作失败,此数据正在使用!</font>");
	         	 	}
	    		},
	    		errorCallBack:function(data){
    				$("#showMessageInfo").html("<font color=red>提示:"+msg+"操作失败,服务器无响应!</font>");
	    		}
			};
            iplantAjaxRequest(ajaxParam);
		}
	}

	rWorkFlow.prototype = {
		init : function() {
			$(function() {
				initGridData();
			});
		}
	}
	var mwf = new rWorkFlow();
	mwf.init();
})();
