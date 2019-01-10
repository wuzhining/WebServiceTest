/* 启动时加载 */
/*
 */
(function() {
	function factoryInfo() {
		initGridData = function() {
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			var querywarehouseid = $('#querywarehouseid').combobox('getValue');
            var querymateriaid = $('#querymateriaid').textbox('getValue');
            var querymaterianame =$('#querymaterianame').textbox('getValue');
            var querybarcode =$('#querybarcode').textbox('getValue');
			var reqData = {
				IFS: 'WMS_B00068',
				WAREHOUSE_ID:querywarehouseid,
                MATERIA_ID:querymateriaid,
                MATERIA_NAME:querymaterianame,
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
				columns: [[
					{field: 'MATERIA_ID',title: '物料编号',width: 200,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.MATERIA_ID || value)+ "</span>";},editor:{type:'validatebox',
			        	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},      
					{field: 'MATERIA_NAME',title: '物料名称',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{validType:['length[1,30]','specialTextCharacter']}}},
				    {field:'ITEM_SIZE',title:'规格型号',width:400,align:'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
							   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
					{field: 'STOCK',title: '库存总数量',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{ validType:['length[1,30]','specialTextCharacter']}}}
						]],
		        /**单击进入编辑模式*/
				onClickRow: function (index,row) {
		        	OpenFrameAttribute(row.MATERIA_ID);
					$("#header-bottom").html(row.MATERIA_NAME);
		        },
			}
			initGridView(reqData, gridList);
			dataGrid.datagrid({"onLoadSuccess":function(data){
			    $(this).datagrid('selectRow',0);
			    OpenFrameAttribute(data.rows[0].MATERIA_ID);
			    $('#header-bottom').html(data.rows[0].MATERIA_NAME+':');
			}}).datagrid('loadData', jsonData);
		}
		
	}
	/*底部的关联表格*/   
	OpenFrameAttribute = function(MATERIA_ID){
		var tabName = 'WarehouseStockbottom_tab';
		var dgridOp = $('#'+tabName).datagrid('options');
		var querywarehouseid = $('#querywarehouseid').textbox('getValue');
		var querybarcode =$('#querybarcode').textbox('getValue');
		if(!dgridOp) return;
		var reqDataA = {
			IFS: 'WMS_B00067',
			WAREHOUSE_ID:querywarehouseid,
			BARCODE:querybarcode,
			MATERIA_ID: MATERIA_ID,
			pageIndex: 1,
			pageSize: dgridOp.pageSize	
		}
		dialogDataGrid('/iPlant_ajax', tabName, reqDataA);
		dialogEditorDataGrid = function(tabName,reqDataA, jsonData) {
			var columnsTab,edDataGrid,messageInfo;
			columnsTab=[
					{field: 'WAREHOUSE_ID',title: '仓库编号',width: 200,hidden:true,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{required:true, validType:['length[1,50]','specialTextCharacter']}}},  
					{field: 'WAREHOUSE_NAME',title: '仓库名称',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{required:true, validType:['length[1,50]','specialTextCharacter']}}},
					{field: 'SN_NUMBER',title: '批次号',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{required:true, validType:['length[1,50]','specialTextCharacter']}}},
					{field: 'BARCODE',title: '唯一码',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{required:true, validType:['length[1,400]','specialTextCharacter']}}},
				    {field: 'PACKNUMBER',title: '库存量',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
				          options:{required:true, validType:['length[1,400]','specialTextCharacter']}}},
				    {field: 'CREATE_ID',title: '创建人',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					      options:{required:true, validType:['length[1,400]','specialTextCharacter']}}},
				    {field: 'CREATE_DATE',title: '创建时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					      options:{required:true, validType:['length[1,400]','specialTextCharacter']}}}];

			var gridLists = {
				name: tabName,
				dataType: 'json',
				columns: [columnsTab]
			}
			initEditorDataGridView(reqDataA, gridLists);
			$('#'+tabName).datagrid('loadData', jsonData);
		}
	}

	/*检索*/
	searchDataGrid=function(dgrid){
		initGridData();
	}
	
	factoryInfo.prototype = {
		init: function() {
			$(function() {
			var ajaxParam3={
                    url:'/iPlant_ajax',
                    data:{
                        IFS:'WMS_B000006',
                    },
                    successCallBack:function(data){
                        var rowCollection=createSourceObj(data);
                        var arr = [];
                        arr.push({"id":"", "text":"全部"});
                        for(var i=0; i< rowCollection.length; i++){
                        	arr.push({"id":rowCollection[i].WAREHOUSE_ID, "text":rowCollection[i].WAREHOUSE_NAME});
                        }
                        $('#querywarehouseid').combobox({
                            data:arr,
                            valueField:'id',
                            textField:'text',
                            panelWidth:150
                        });
                    }
             }
            iplantAjaxRequest(ajaxParam3);		
			 	
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