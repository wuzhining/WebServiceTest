/* 启动时加载 */
/*
 */
(function() {
	function factoryInfo() {
		initGridData = function() {
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			var Search_WO = $('#Search_WO').textbox('getValue');
			var Search_PSN = $('#Search_PSN').textbox('getValue');
			var Search_ITEM = $('#Search_ITEM').textbox('getValue');
			var Search_MAT = $('#Search_MAT').textbox('getValue');
			var reqData = {
				IFS: 'ST00072',
				PSN_NO: Search_PSN,
				WO_NO: Search_WO,
				ITEM_CD: Search_ITEM,
				MAT_CD: Search_MAT,
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'ShopInventoryInformation_tab', reqData);
		},		
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'ShopInventoryInformation_tab',
				dataType: 'json',
				columns: [[
			        {field: 'FCT_NM',title: '工厂名称',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'WC_NM',title: '车间名称',width: 90,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'LINE_NM',title: '产线名称',width: 90,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'MO_NO',title: '工单编号',width: 130,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'WO_NO',title: '作业指示号',width: 140,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'ITEM_CD',title: '物料编码',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'ITEM_NM',title: '物料名称',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'MAT_CD',title: '原材料编码',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'MAT_NM',title: '原材料名称',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'PSN_NO',title: '物料唯一码',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'PSN_QTY',title: '发料数',width: 70,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'OLD_NO',title: '老物料唯一码',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'CRT_ID',title: '发料人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'CRT_DT',title: '发料时间',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'UPT_ID',title: '修改人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'UPT_DT',title: '修改时间',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
				]]
			}
			initGridView(reqData, gridList);
			//dataGrid.datagrid('loadData', jsonData);
			dataGrid.datagrid({
				onLoadSuccess: function(data) {
			        //所有列进行合并操作
			        //$(this).datagrid("autoMergeCells");
			       //指定列进行合并操作
			        $(this).datagrid("autoMergeCells", ['groupId', 'FCT_NM','WC_NM','LINE_NM','MO_NO','WO_NO','ITEM_CD']);
			    }
			}).datagrid('loadData', jsonData);
		},
     /*查询*/
	searchDataGrid=function(dgrid){
	   initGridData();
	}
	
	}
	factoryInfo.prototype = {
		init: function() {
			$(function() {
				dataGrid = $('#ShopInventoryInformation_tab');
				initGridData();
				/*查询*/
				$('#btnSearch').click(function() {	
					var dgrid = dataGrid.datagrid('options');
					searchDataGrid(dgrid);
				});
				/*导出*/
				$('#btnExprt').click(function(){						
				 	var now = new Date();
                    var year =now.getFullYear();
                	var reqData = {
                	   IFS:'ST00072'
                	}
                	createTable('tbIMESReport','车间物料报表','ShopInventoryInformation_tab',reqData);
                });
			});
		}
	}
	var fcfo = new factoryInfo();
	fcfo.init();
})();