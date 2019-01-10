
(function() {
	function application() {
		//初始化表格 INSPECTIONTEMPLATEID
		initGridData = function() {
			    var dgrid = $('#productWConf_tab').datagrid('options');
				if(!dgrid) return;
				var reqData = {
					IFS: 'WMS_QHold002',
					pageIndex: 1,
					pageSize: dgrid.pageSize
				};
				reqGridData('/iPlant_ajax', 'productWConf_tab', reqData);
				
			},
			bindGridData = function(reqData, jsonData) {
				var gridList = {
					name: 'productWConf_tab',
					dataType: 'json',
					//singleSelect:false,
					columns: [
						[
							{
								field: 'OPERATETYPE',
								title: '操作类型',
								width: 150,
								align: 'center',formatter: function (value) {
					           	if(value == '1'){
                                return "<span title='" + 'Hold' + "'>" + 'Hold' + "</span>";
								}
								else{
									return "<span title='" + 'UnHold' + "'>" + 'UnHold' + "</span>";
								}
							}
							},{
								field: 'OBJECTTYPE',
								title: '对象类型',
								width: 150,
								align: 'center',formatter: function (value) {
								if(value =='1')
									return "<span title='" + '工单' + "'>" + '工单' + "</span>";
								else if(value == '2')
                                return "<span title='" + '产品' + "'>" + '产品' + "</span>";
								else if(value == '3')
	                               return "<span title='" + '物料' + "'>" + '物料' + "</span>";
								else if(value == '4')
	                                return "<span title='" + '在制品序列号' + "'>" + '在制品序列号' + "</span>";
									
								}
							},{
								field: 'OBJECTCODE',
								title: '对象编号',
								width: 150,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field : 'CRT_ID',
								title : '操作人',
								width : 150,
								align : 'center',formatter : function(value) {
								if(value != null)
								return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'UPT_DT',
								title: '操作时间',
								width: 150,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field : 'HOLDORUNHOLDCAUSE',
								title : '历史原因',
								width : 200,
								align : 'center',formatter : function(value) {
								if(value != null)
								return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'OBJECTSTATUS',
								title: '历史操作类型',
								width: 150,
								align: 'center',formatter: function (value) {
					           	if(value == '1'){
                                return "<span title='" + 'Hold' + "'>" + 'Hold' + "</span>";
								}
								else{
									return "<span title='" + 'UnHold' + "'>" + 'UnHold' + "</span>";
								}
							}
							
							},{
								field: 'REMARK',
								title: '原因说明',
								width: 220,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							}
						]
					]
				};
				initGridView(reqData, gridList);
				$('#productWConf_tab').datagrid('loadData', jsonData);
			};
		
        dataArr={},
		//置空查询输入框
		setQueryNull=function() {
    		$('#txtSPCProjectName').textbox('setValue',"");
    		$('#STATUS').combobox('setValue',"");
		};
		getDataBySearch = function(project,status){
			var dgrid = $('#productWConf_tab').datagrid('options');
			if(!dgrid) return;
			var reqData = {
				OBJECTCODE:project,
				OBJECTTYPE: status,
				IFS: 'WMS_QHold002',
				pageIndex: 1,
				pageSize: dgrid.pageSize
			};
			reqGridData('/iPlant_ajax', 'productWConf_tab',reqData);
		};
//        ObjectNum = function() {
//        	var STATUS = $("#STATUS").combobox('getValue');
//        	if (STATUS == '0') {
//        		$.messager.alert('提示', '请选择具体的对象类型');
//        		return;
//        	}
//        	$("#addObjectNum").dialog("open").dialog('setTitle', '选择对象编号窗口');
//        	
//        	var tabName = 'tableObject';
//			var dgridOp = $('#'+tabName).datagrid('options');
//			if(!dgridOp) return;
//			var reqDataA = {
//				IFS: 'Z000007',
//				pageIndex: 1,
//				pageSize: dgridOp.pageSize
//			}
//			dialogDataGrid('/iPlant_ajax', tabName, reqDataA);
//			dialogEditorDataGrid = function(tabName,reqDataA, jsonData) {
//				var gridLists = {
//						name :tabName,
//						dataType : 'json',
//						columns : [[
//						      {field:'ITEM_CD',title: '供应商编码',width: 230,align: 'center',formatter: function (value,row) {if (value != null) return "<span title='" + value + "'>" + value + "</span>";}},
//						      {field:'ITEM_NM',title: '供应商名称',width: 200,align: 'center',formatter: function (value) {if (value != null) return "<span title='" + value + "'>" + value + "</span>";}},
//						 ]],
//						 onDblClickRow: function(index,row){
//							 $("#txtSPCProjectName").textbox('setValue',row.ITEM_CD);
//							 $("#addObjectNum").dialog('close');
//				         }
//					}
//				initEditorDataGridView(reqDataA, gridLists);
//				$('#'+tabName).datagrid('loadData', jsonData);
//			};
//        };
			
	};
	application.prototype = {
		init: function() {
			$(function() {			
				initGridData(); 
				
				$('#btnResets').click(function(){
		            setQueryNull();
		        });
				
//				$('#search .icon-search').click(function () {
//					ObjectNum();
//				});
				$('#btnSearch').click(function () {
					var project=$('#txtSPCProjectName').val();
		    		var status = $('#STATUS').combobox('getValue');
					getDataBySearch(project,status);
				});
			});
		}
	}
	var fcfo = new application();
	fcfo.init();
})();