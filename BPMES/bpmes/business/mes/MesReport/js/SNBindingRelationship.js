/* 启动时加载 */
/*订单查询
 */
(function() {
	function factoryInfo() {
		initGridData = function() {
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			var Search_WONO = $('#Search_WONO').textbox('getValue');
			var Search_SN = $('#Search_SN').textbox('getValue');
			var Search_Item = $('#Search_Item').textbox('getValue');
			var Search_Time = $('#Search_Time').datebox('getValue');
			var reqData = {
				IFS: 'MES_R0088',
				WO_NO: Search_WONO,
				BAR_CODE: Search_SN,
				ITEM_CD: Search_Item,
				CRT_DT: Search_Time,
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'SNBindingRelationship_tab', reqData);
		},
		
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'SNBindingRelationship_tab',
				dataType: 'json',
				columns: [[
					{field: 'FCT_NM',title: '工厂名称',width: 130,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" +value+ "</span>";}},
					{field: 'BIND_NO',title: '绑定唯一码',width: 140,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" +value+ "</span>";}},
					{field: 'MO_NO',title: '工单编号',width: 130,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" +value+ "</span>";}},
					{field: 'WO_NO',title: '作业指示号',width: 140,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" +value+ "</span>";}},
					{field: 'ITEM_CD',title: '物料编码',width: 130,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" +value+ "</span>";}},
					{field: 'ITEM_NM',title: '物料名称',width: 130,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" +value+ "</span>";}},
					{field: 'BAR_CODE',title: '产品SN',width: 120,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" +value+ "</span>";}},
					{field: 'CRT_ID',title: '创建人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'CRT_DT',title: '创建时间',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'UPT_ID',title: '修改人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'UPT_DT',title: '修改时间',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}} 
				]],
			}
			initGridView(reqData, gridList);
			dataGrid.datagrid('loadData', jsonData);
		}
		
		/*查询*/
		searchDataGrid=function(dgrid){
		   initGridData();
		}
	}
		
     
     
     
	factoryInfo.prototype = {
		init: function() {
			$(function() {
				
				/*初始化全局变量对象*/
				dataGrid = $('#SNBindingRelationship_tab'),showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				initGridData();
				
				$('#btnSearch').click(function() {
					searchDataGrid();					/*调用查询*/
				});
				
				$('#btnExprt').click(function(){						
				 	var now = new Date();
                    var year =now.getFullYear();
                	var reqData = {
                	   IFS:'MES_R0088'
                	}
                	createTable('tbIMESReport','SN绑定关系报表','SNBindingRelationship_tab',reqData);
                });
			});
		}
	}
	var fcfo = new factoryInfo();
	fcfo.init();
})();