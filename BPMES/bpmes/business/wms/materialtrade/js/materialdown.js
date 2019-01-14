/* 启动时加载 */
/*
 */
(function() {
	function factoryInfo() {
		initGridData = function() {
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			var SOURCE_NO = $('#SOURCE_NO').textbox('getValue');
			var reqData = {
				IFS: 'WMS_TE00017',
				SOURCE_NO:SOURCE_NO,
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'materialdown_tab', reqData);
		},
		
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'materialdown_tab',
				dataType: 'json',
				singleSelect:true,
				columns: [[
					{field: 'SOURCE_NO',title: '领料单号',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				    {field: 'BILL_TYPE',title: '单据类别',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				    {field: 'STATUSNM',title: '单据状态',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				    {field: 'CRT_ID',title: '操作员',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'CRT_DT',title: '操作时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
						]],
		        /**单击进入编辑模式*/
				onClickRow: function (index,row) {
		        	OpenFrameAttribute(row.SOURCE_NO);
					$("#header-bottom").html(row.SOURCE_NO);
		        },
			}
			initGridView(reqData, gridList);
			dataGrid.datagrid({"onLoadSuccess":function(data){
				var SOURCE_NO= "#";
				 if(data.rows.length>0){
					 $(this).datagrid('selectRow',0);
					 if(checkNotEmpty(data.rows[0].SOURCE_NO)){
						 SOURCE_NO = data.rows[0].SOURCE_NO;
					 }
				 }
				 OpenFrameAttribute(SOURCE_NO);
				 $('#header-bottom').html(SOURCE_NO);
				
			   
			}}).datagrid('loadData', jsonData);
		}
		
	}
	/*底部的关联表格*/   
	OpenFrameAttribute = function(SOURCE_NO){
		var tabName = 'materialdownbottom_tab';
		var dgridOp = $('#'+tabName).datagrid('options');
		if(!dgridOp) return;
		var reqDataA = {
			IFS: 'WMS_TE00018',
			SOURCE_NO: SOURCE_NO,
			pageIndex: 1,
			pageSize: dgridOp.pageSize	
		}
		dialogDataGrid('/iPlant_ajax', tabName, reqDataA);
		dialogEditorDataGrid = function(tabName,reqDataA, jsonData) {
			var columnsTab,edDataGrid,messageInfo;
			columnsTab=[
			        {field: 'SERIAL_NUMBER',title: '物料条码',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},  
					{field: 'MATERIAL_ID',title: '物料编码',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},  
					{field: 'MATERIAL_NAME',title: '物料名称',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'SUPPLIER_NAME',title: '供应商名称',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				    {field: 'SPEC_MODEL',title: '规格型号',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'OFF_QTY',title: '下架数量',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				    {field: 'LOT_NO',title: '批号',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
				    
				    ];

			var gridLists = {
				name: tabName,
				dataType: 'json',
				singleSelect:true,
				columns: [columnsTab]
			}
			initEditorDataGridView(reqDataA, gridLists);
			$('#'+tabName).datagrid('loadData', jsonData);
		}
	}
	
	//置空查询输入框
	setQueryNull=function() {
    	  $('#SOURCE_NO').textbox('setValue',"");
	      
    }

	/*检索*/
	searchDataGrid=function(dgrid){
		initGridData();
	}
	
	factoryInfo.prototype = {
		init: function() {
			$(function() {
				//限制输入英文单引号
		        $("input",$("#SOURCE_NO").next("span")).keydown(function(e){
		   		   if(e.keyCode==222){
		 				if(e.preventDefault){
		                     e.preventDefault();
		                 }
		 				else
		 				{
		         			e.returnValue = false;
		                 }      
		 			}
		   	   });
		        
		        $('#btnResets').click(function(){
		            setQueryNull();
		        });
			/*var ajaxParam3={
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
                        $('#querywarehousename').combobox({
                            data:arr,
                            valueField:'id',
                            textField:'text',
                            panelWidth:150
                        });
                    }
             }
            iplantAjaxRequest(ajaxParam3);		*/
			 	
				/*初始化全局变量对象*/
				dataGrid = $('#materialdown_tab'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
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