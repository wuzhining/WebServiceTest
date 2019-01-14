(function() {
	function InventoryDetails() {
		initGridData = function() {
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			searchDataGrid(dgrid);
		},
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'InventoryDetails_tab',
				dataType: 'json',
				singleSelect:true,
				columns: [[
					{field: 'BILL_ID',title: '单号',width: 150,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  value + "</span>";}},      
					{field: 'BILL_TYPE_NM',title: '单据类型',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				    {field: 'SOURCE_NO',title: '盘点任务单',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				    {field: 'STATUSNM',title: '单据状态',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},	   
				    {field: 'CRT_ID',title: '创建人',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'CRT_DT',title: '创建时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				]],
				onClickRow: function (index,row) {
		        	OpenFrameAttribute(row.BILL_ID);
		        	OpenFrameSnAttribute(row.BILL_ID);
					$("#header-bottom").html(row.BILL_ID);
		        },
			}
			initGridView(reqData, gridList);
			dataGrid.datagrid({"onLoadSuccess":function(data){
			    var BILL_ID = "";
			    if(data.rows.length>0){
	        		$(this).datagrid('selectRow',0);
	        		if(checkNotEmpty(data.rows[0].BILL_ID)){
	        			BILL_ID = data.rows[0].BILL_ID;
	        		}
			    }
			    OpenFrameAttribute(BILL_ID);
			    OpenFrameSnAttribute(BILL_ID);
			    $('#header-bottom').html(BILL_ID);
			}}).datagrid('loadData', jsonData);
		},
		/*底部的关联表格*/   
		OpenFrameAttribute = function(BILL_ID){
			var tabName = 'InventoryDetailsbottom_tab';
			var dgridOp = $('#'+tabName).datagrid('options');
			if(!dgridOp) return;
			var reqDataA = {
				IFS: 'WMS_ITD00031',
				BILL_ID: BILL_ID,
				pageIndex: dgridOp.pageNumber,
				pageSize: dgridOp.pageSize	
			}
			dialogDataGrid('/iPlant_ajax', tabName, reqDataA);
			dialogEditorDataGrid = function(tabName,reqDataA, jsonData) {
				var columnsTab,edDataGrid,messageInfo;
				columnsTab=[
						{field: 'MATERIAL_ID',title: '物料编码',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},  
						{field: 'MATERIAL_NAME',title: '物料名称',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
						{field: 'SUPPLIER_NAME',title: '供应商名称',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					    {field: 'CUST_NAME',title: '客户名称',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					    {field: 'INOUTQTY',title: '应出（入）库数量',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
						{field: 'REALINOUTQTY',title: '实际出（入）库数量',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
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
		OpenFrameSnAttribute = function(BILL_ID){
			var tabName = 'InventoryDetailsSnbottom_tab';
			var dgridOp = $('#'+tabName).datagrid('options');
			if(!dgridOp) return;
			var reqDataA = {
				IFS: 'WMS_ITD00032',
				BILL_ID: BILL_ID,
				pageIndex: dgridOp.pageNumber,
				pageSize: dgridOp.pageSize	
			}
			//dialogDataGrid1('/iPlant_ajax', tabName, reqDataA);
			dialogEditorDataGrid1 = function(tabName,reqDataA, jsonData) {
				var columnsTab,edDataGrid,messageInfo;
				columnsTab=[
						{field: 'SERIAL_NUMBER',title: '物料标签',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},  
						{field: 'LAST_CARTON',title: '最外箱条码',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
						{field: 'MATERIAL_ID',title: '物料编码',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},  
						{field: 'MATERIAL_NAME',title: '物料名称',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
						{field: 'CUST_NO',title: '客户编码',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
						{field: 'QTY',title: '数量',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
						{field: 'SUPPLIER_NAME',title: '供应商名称',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
						{field: 'STORE_NAME',title: '仓库',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					    {field: 'AREA_NAME',title: '储区',width: 80,hidden:true,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					    {field: 'SHELF_NAME',title: '货架',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
						{field: 'LOCATION_NAME',title: '货位',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					    {field: 'LOT_NO',title: '批次号',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
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
			$('#InvDetailsNo').textbox('setValue',""),
	    	$('#qStore').combobox('setValue',"N/A"),
	    	$('#qProDtBegin').datebox('setValue',""),
	    	$('#qProDtEnd').datebox('setValue',"");
	    },
		searchDataGrid=function(dgrid){/*查询*/
	    	var InvDetailsNo = $('#InvDetailsNo').textbox('getValue'),qProDtBegin =$('#qProDtBegin').datebox('getValue'),qProDtEnd =$('#qProDtEnd').datebox('getValue');
	    	 
	    	var reqData = {
	    		InvDetailsNo: InvDetailsNo,
		    	qProDtBegin: qProDtBegin,
		        qProDtEnd: qProDtEnd,
		        pageIndex:dgrid.pageNumber,
                pageSize:dgrid.pageSize,
		        IFS:'WMS_ITD00030'
			}
			reqGridData('/iPlant_ajax', 'InventoryDetails_tab', reqData);
		}/*,
		selectStore = function(){//初始化仓库信息
	    	var reqStore = {
	            url: "/iPlant_ajax",
	            dataType: "JSON",
	            data: {IFS: "WMS_B00030",storeType:'WSTORE-01'},
	            successCallBack: function(a) {
	            	dataStore = [];
	            	dataStore.push({"value":"N/A","text":"全部"});
	            	var op = a.RESPONSE[0].RESPONSE_DATA;
	                $.each(op,function(n,obj) {
	                	dataStore.push({'value':obj.STORE_ID,'text':obj.STORE_NAME});
				    }); 
	                var qStore = $("#qStore");
	                qStore.combobox('loadData',dataStore);
	                if(dataStore.length>7){
	                	qStore.combobox({panelHeight:200});;
					}else{
						qStore.combobox({panelHeight:'auto'});;
					}
	                if(dataStore.length>0){
	                	qStore.combobox('select',dataStore[0].value);
	                }
	            },
	            errorCallBack: function() {
	            	commonShowMessage("提示：请联系管理员，查询失败！");
	            }
	        };
		    iplantAjaxRequest(reqStore);
		}*/
	};
	InventoryDetails.prototype = {
		init: function() {
			$(function() {
				/*初始化全局变量对象*/
			    dataGrid = $('#InventoryDetails_tab');
				initGridData();
			    dateValid("qProDtBegin","qProDtEnd","2");
				//限制输入英文单引号
		        $("input",$("#InvDetailsNo").next("span")).keydown(function(e){
		   		   if(e.keyCode==222){
		 				if(e.preventDefault){ e.preventDefault(); }else{ e.returnValue = false;}      
		 			}
		   	   });
		       $('#btnResetss').click(function(){ setQueryNull();});
		       $('#btnSearch').click(function() {	
					var dgrid = dataGrid.datagrid('options');
					searchDataGrid(dgrid);
		       });
			});
		}
	};
	var mp = new InventoryDetails();
	mp.init();
})();