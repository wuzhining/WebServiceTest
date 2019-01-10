/* 启动时加载 */
/*
 */
(function() {
	function factoryInfo() {
		initGridData = function() {
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
            var querybarcode =$('#querybarcode').textbox('getValue');
			var reqData = {
				IFS: 'WMS_B00069',
                BARCODE:querybarcode,
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'WarehouseStock_tab', reqData);
		},
		
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'WarehouseStock_tab',
				dataType: 'json',
				 columns: [ 
	                          [
	                           {"title":"","colspan":3},
	                           {"title":"来料录入","colspan":2},  
	                           {"title":"物料入库","colspan":4},
	                           {"title":"物料出库","colspan":4}
	                           ],  
	                          [
	                           {"field":"BARCODE","title":"唯一码","width": "150",align: 'center',"rowspan":1},  
	                           {"field":"MATERIA_ID","title":"物料编码","width": "150",align: 'center',"rowspan":1},  
	                           {"field":"MATERIA_NAME","title":"物料名称","width": "150",align: 'center',"rowspan":1},
	                           {"field":"SUPPLIER_NAME","title":"供应商","width": "100",align: 'center',"rowspan":1},  
	                           {"field":"LAILIAOSUM","title":"来料数","width": "100",align: 'center',"rowspan":1},  
	                           {"field":"WAREHOUSE_NAME","title":"仓库名称","width": "150",align: 'center',"rowspan":1},  
	                           {"field":"RUKUNUM","title":"入库数量","width": "100",align: 'center',"rowspan":1},  
	                           {"field":"RUKUMEM","title":"入库人","width": "100",align: 'center',"rowspan":1},  
	                           {"field":"INTIME","title":"入库时间","width": "150",align: 'center',"rowspan":1},
	                           {"field":"FALIAOMO","title":"发料工单","width": "100",align: 'center',"rowspan":1},  
	                           {"field":"CHUKUNUM","title":"出库数量","width": "100",align: 'center',"rowspan":1},  
	                           {"field":"CHUKUMEM","title":"出库人","width": "100",align: 'center',"rowspan":1},  
	                           {"field":"OUTTIME","title":"出库时间","width": "150",align: 'center',"rowspan":1}
						]],
		        /**单击进入编辑模式*/
				onClickRow: function (index,row) {
		        	Open('MESfaliao_tab',row.BARCODE,row.FALIAOMO,row.MATERIA_ID,'WMS_B00070');
		        	Open('MESproduct_tab',row.BARCODE,row.FALIAOMO,row.MATERIA_ID,'WMS_B00071');
		        	Open('MESfinish_tab',row.BARCODE,row.FALIAOMO,row.MATERIA_ID,'WMS_B00072');
		        },
			};
			initGridView(reqData, gridList);
			dataGrid.datagrid({"onLoadSuccess":function(data){
			    $(this).datagrid('selectRow',0);
			    Open('MESfaliao_tab',data.rows[0].BARCODE,data.rows[0].FALIAOMO,data.rows[0].MATERIA_ID,'WMS_B00070');
			    Open('MESproduct_tab',data.rows[0].BARCODE,data.rows[0].FALIAOMO,data.rows[0].MATERIA_ID,'WMS_B00071');
			    Open('MESfinish_tab',data.rows[0].BARCODE,data.rows[0].FALIAOMO,data.rows[0].MATERIA_ID,'WMS_B00072');
			}}).datagrid('loadData', jsonData);
		}
		
	};
	/*底部的关联表格*/  
	Open = function(tabName,BARCODE,FALIAOMO,MATERIA_ID,ifs){
		var dgridOp = $('#'+tabName).datagrid('options');
		if(!dgridOp) return;
		var reqData = {
			IFS: ifs,
			MO_NO: FALIAOMO,
			MAT_CD: MATERIA_ID,
			pageIndex: 1,
			pageSize: dgridOp.pageSize	
		}
		dialogDataGrid('/iPlant_ajax', tabName, reqData);
		dialogEditorDataGrid = function(tabName,reqData, jsonData) {
			var columnsTab,edDataGrid,messageInfo;
			//MES工单发料
			if(tabName=='MESfaliao_tab'){
				columnsTab=[
					{field: 'LINGLIAOMO',title: '领料工单',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{required:true, validType:['length[1,50]','specialTextCharacter']}}},  
					{field: 'LINGLIAOSUM',title: '领料数',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{required:true, validType:['length[1,50]','specialTextCharacter']}}}];
			}
			//MES工单生产
			else if(tabName=='MESproduct_tab'){
				columnsTab=[
					{field: 'MO',title: '工单号',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{required:true, validType:['length[1,50]','specialTextCharacter']}}},  
					{field: 'FDNO',title: '飞达号',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{required:true, validType:['length[1,50]','specialTextCharacter']}}},
					{field: 'ZWNO',title: '栈位',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{required:true, validType:['length[1,50]','specialTextCharacter']}}},
					{field: 'SHANGLIAOSUM',title: '上料数',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{required:true, validType:['length[1,400]','specialTextCharacter']}}},
				    {field: 'SHANGLIAOMEM',title: '上料人',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
				          options:{required:true, validType:['length[1,400]','specialTextCharacter']}}},
				    {field: 'SHANGLIAOTIME',title: '上料时间',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					      options:{required:true, validType:['length[1,400]','specialTextCharacter']}}}];
			}
			//MES工单完工
			else if(tabName=='MESfinish_tab'){
				columnsTab=[
					{field: 'TUILIAOMO',title: '退料工单',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{required:true, validType:['length[1,50]','specialTextCharacter']}}},  
					{field: 'TUILIAOSUM',title: '退料数',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{required:true, validType:['length[1,50]','specialTextCharacter']}}},
					{field: 'TUILIAOMEM',title: '退料人',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{required:true, validType:['length[1,50]','specialTextCharacter']}}},
					{field: 'TUILIAOTIME',title: '退料时间',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{required:true, validType:['length[1,400]','specialTextCharacter']}}}];
			}
			var gridLists = {
				name: tabName,
				dataType: 'json',
				columns: [columnsTab]
			}
			initEditorDataGridView(reqData, gridLists);
			$('#'+tabName).datagrid('loadData', jsonData);
		}
	};

	
	/*检索*/
	searchDataGrid=function(dgrid){
		initGridData();
	}
	
	factoryInfo.prototype = {
		init: function() {
			$(function() {	
				/*初始化全局变量对象*/
				dataGrid = $('#WarehouseStock_tab'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				initGridData();
				$('#btnSearch').click(function() {	
					var dgrid = dataGrid.datagrid('options');
					searchDataGrid(dgrid);
				});
			});
		}
	}
	var fcfo = new factoryInfo();
	fcfo.init();
})();