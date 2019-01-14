(function() {
	function materialPropicking() {
		initGridData = function() {
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			searchDataGrid(dgrid);
		},
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'materialPropicking_tab',
				dataType: 'json',
				singleSelect:false,
				columns: [[
                    {field : "CZ",width : 10,checkbox : true},
					{field: 'ALLOCATE_NO',title: '单号',width: 200,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  value + "</span>";}},      
					{field: 'BILL_TYPE_NM',title: '单据类别',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				    {field: 'STATUS_NM',title: '单据状态',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},	   
				    {field: 'CRT_ID',title: '创建人',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'CRT_DT',title: '创建时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
				]],
				onClickRow: function (index,row) {
		        	OpenFrameAttribute(row.ALLOCATE_NO);
		        	OpenFrameSnAttribute(row.ALLOCATE_NO);
					$("#header-bottom").html(row.ALLOCATE_NO);
		        },
			}
			initGridView(reqData, gridList);
			dataGrid.datagrid({"onLoadSuccess":function(data){
			    var instoreNo = "";
			    if(data.rows.length>0){
	        		$(this).datagrid('selectRow',0);
	        		if(checkNotEmpty(data.rows[0].ALLOCATE_NO)){
	        			instoreNo = data.rows[0].ALLOCATE_NO;
	        		}
			    }else if(data.rows.length == 0){
			    	instoreNo='#'
			    }
			    OpenFrameAttribute(instoreNo);
			    OpenFrameSnAttribute(instoreNo);
			    $('#header-bottom').html(instoreNo);
			}}).datagrid('loadData', jsonData);
		},
		/*底部的关联表格*/   
		OpenFrameAttribute = function(instoreNo){
			var tabName = 'materialPropickingbottom_tab';
			var dgridOp = $('#'+tabName).datagrid('options');
			if(!dgridOp) return;
			var reqDataA = {
				IFS: 'WMS_AL00024',
				ALLOCATE_NO: instoreNo,
				pageIndex: dgridOp.pageNumber,
				pageSize: dgridOp.pageSize	
			}
			dialogDataGrid('/iPlant_ajax', tabName, reqDataA);
			dialogEditorDataGrid = function(tabName,reqDataA, jsonData) {
				var columnsTab,edDataGrid,messageInfo;
				columnsTab=[
						{field: 'MATERIAL_ID',title: '物料编码',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},  
						{field: 'MATERIAL_NAME',title: '物料名称',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
						{field: 'SUPPLIER_NAME',title: '供应商名称',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					    {field: 'ALLOCATE_QTY',title: '调拨数量',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					    {field: 'STORE_NAME',title: '调出仓库',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
						{field: 'IN_STORE_NAME',title: '调入仓库',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					    //{field: 'LOT_NO',title: '批次号',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					    //{field: 'SERIAL_TOTAL_NUM',title: '条码总数',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
						{ field: 'UNIT_ID', title: '单位编码', width: 0 ,align:'center',hidden:true}
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
		},
		/*底部的关联表格*/   
		OpenFrameSnAttribute = function(instoreNo){
			var tabName = 'materialPropickingSnbottom_tab';
			var dgridOp = $('#'+tabName).datagrid('options');
			if(!dgridOp) return;
			var reqDataA = {
				IFS: 'WMS_AL00025',
				ALLOCATE_NO: instoreNo,
				pageIndex: dgridOp.pageNumber,
				pageSize: dgridOp.pageSize	
			}
		//	dialogDataGrid1('/iPlant_ajax', tabName, reqDataA);
			dialogEditorDataGrid1 = function(tabName,reqDataA, jsonData) {
				var columnsTab,edDataGrid,messageInfo;
				columnsTab=[
						{field: 'SERIAL_NUMBER',title: '物料标签',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},  
						{field: 'MATERIAL_ID',title: '物料编码',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},  
						{field: 'MATERIAL_NAME',title: '物料名称',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
						{field: 'QTY',title: '数量',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
						{field: 'UNIT_NAME',title: '单位',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
						{field: 'SUPPLIER_NAME',title: '供应商名称',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
						{field: 'CUST_NO',title: '客户代号',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
						{field: 'CARTON_NO',title: '外箱号',width: 300,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
						{field: 'STORE_NAME',title: '调出仓库',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					    {field: 'AREA_NAME',title: '调出区域',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					    {field: 'SHELF_NAME',title: '调出货架',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
						{field: 'LOCATION_NAME',title: '调出货位',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
						{field: 'IN_STORE_NAME',title: '调入仓库',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					    {field: 'IN_AREA_NAME',title: '调入区域',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					    {field: 'IN_SHELF_NAME',title: '调入货架',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
						{field: 'IN_LOCATION_NAME',title: '调入货位',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					    {field: 'LOT_NO',title: '批次号',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					    {field: 'ALLOCATE_ID',title: '调拨上架人',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
						{field: 'ALLOCATE_DT',title: '调拨上架时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
				];
				var gridLists = {
					name: tabName,
					dataType: 'json',
					singleSelect:true,
					columns: [columnsTab]
				}
				initEditorDataGridView1(reqDataA, gridLists);
				$('#'+tabName).datagrid('loadData', jsonData);
			}
			myDataGrid('/iPlant_ajax', tabName, reqDataA,dialogEditorDataGrid1);

		},
		setQueryNull=function() {//置空查询输入框
			$('#queryInstoreNo').textbox('setValue',""),
	    	//$('#qStore').combobox('setValue',"N/A"),
	    	$('#qProDtBegin').datebox('setValue',""),
	    	$('#qProDtEnd').datebox('setValue',"");
	    },
		searchDataGrid=function(dgrid){/*查询*/
	    	var queryInstoreNo = $('#queryInstoreNo').textbox('getValue'),qProDtBegin =$('#qProDtBegin').datebox('getValue'),qProDtEnd =$('#qProDtEnd').datebox('getValue');
	    	if(queryInstoreNo=="N/A"){
	    		queryInstoreNo = "";
		    }
	    	var reqData = {
	    		ALLOCATE_NO: queryInstoreNo,
	    		queryCrtDtBegin: qProDtBegin,
	    		queryCrtDtEnd: qProDtEnd,
		        pageIndex:dgrid.pageNumber,
                pageSize:dgrid.pageSize,
		        IFS:'WMS_AL00023'
			}
			reqGridData('/iPlant_ajax', 'materialPropicking_tab', reqData);
		}
	    
	    printDataTemplet=function(){
			var checkedItems = $('#materialPropicking_tab').datagrid('getSelections'), num = 0,templetId = "";
			$.each(checkedItems, function (index, item) { num++;});
			if (num < 1) {
				commonShowMessage('请选择成品入库单进行打印！');
				return false;
			}else {
				for(var i=0;i<checkedItems.length;i++){
					if (templetId==""){
						templetId=checkedItems[i].ALLOCATE_NO;
					}else {
						templetId=checkedItems[i].ALLOCATE_NO+","+templetId;
					}
				}
				addTabIndex('调拨单打印', "/Warehouse/system/templet/report/AllicationDesignReport.html?templetId="+templetId);
			}
			/*var row = $("#propickingOut_tab").datagrid("getSelected");
	        if (row) {
	        	templetId = row.PRODPICKING_NO;
				addTabIndex('领料单打印', "/Warehouse/system/templet/report/DesignReport.html?templetId="+templetId);
	        }*/
		}
		
	};
	materialPropicking.prototype = {
		init: function() {
			$(function() {
				/*初始化全局变量对象*/
			    dataGrid = $('#materialPropicking_tab');
				initGridData();
			    dateValid("qProDtBegin","qProDtEnd","2");
				//限制输入英文单引号
		        $("input",$("#queryInstoreNo").next("span")).keydown(function(e){
		   		   if(e.keyCode==222){
		 				if(e.preventDefault){ e.preventDefault(); }else{ e.returnValue = false;}      
		 			}
		   	   });
		       $('#btnReset').click(function(){ setQueryNull();});
		       $('#btnSearch').click(function() {	
					var dgrid = dataGrid.datagrid('options');
					searchDataGrid(dgrid);
		       });
		       $('#btnPrint').click(function(){ printDataTemplet();});
			});
		}
	};
	var mp = new materialPropicking();
	mp.init();
})();