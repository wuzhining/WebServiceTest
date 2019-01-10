/* 启动时加载 */
/*
 */
(function() {
	function factoryInfo() {
		initGridData = function() {
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			var Search_LineCd = $('#Search_LineCd').textbox('getValue');
			var Search_WC = $('#Search_WC').textbox('getValue');
			var Search_Item = $('#Search_Item').textbox('getValue');
			var Search_Moder = $('#Search_Moder').textbox('getValue');
			var Search_Time = $('#Search_Time').datebox('getValue');
			var reqData = {
				IFS: '',
				LINE_CD: Search_LineCd,
				WC_CD: Search_WC,
				ITEM_CD: Search_Item,
				MODER_CD: Search_Moder,
				CRT_DT: Search_Time,
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'DefectiveProduct_tab', reqData);
		},		
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'DefectiveProduct_tab',
				dataType: 'json',
				columns: [[
					{field: 'FCT_NM',title: '工厂名称',width: 120,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" +value+ "</span>";}},
			        {field: 'CRT_ID',title: '创建人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'CRT_DT',title: '创建时间',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'UPT_ID',title: '修改人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'UPT_DT',title: '修改时间',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
				]]
			}
			initGridMultiView(reqData, gridList);
			dataGrid.datagrid('loadData', jsonData);
		},
     /*查询*/
	searchDataGrid=function(dgrid){
	   initGridData();
	}
	
	}
	factoryInfo.prototype = {
		init: function() {
			$(function() {
				dataGrid = $('#DefectiveProduct_tab');
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
                	   IFS:''
                	}
                	createTable('tbIMESReport','次品日报表','DefectiveProduct_tab',reqData);
                });
			});
		}
	}
	var fcfo = new factoryInfo();
	fcfo.init();
})();