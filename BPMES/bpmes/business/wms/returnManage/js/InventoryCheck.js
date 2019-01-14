(function() {
	function InventoryTask() {
		initGridData = function() {
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			searchDataGrid(dgrid);
		},
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'InventoryTask_tab',
				dataType: 'json',
				singleSelect:true,
				columns: [[
					{field: 'INVENTORY_NO',title: '盘点单号',width: 150,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  value + "</span>";}},      
					{field: 'BILL_TYPE_NM',title: '单据类别',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				    {field: 'INVENTORY_ID',title: '来源计划ID',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				    {field: 'STATUS_NM',title: '单据状态',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				    {field: 'STORE_NAME',title: '盘点仓库',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				    {field: 'STORE_ID',title: '盘点仓库编码',width: 80,hidden:true,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				    {field: 'AREA_NAME',title: '盘点区域',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'SHELF_NAME',title: '盘点货架',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'LOCATION_NAME',title: '盘点货位',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				    {field: 'INVENTORY_BEGIN',title: '盘点开始时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				    {field: 'INVENTORY_END',title: '盘点结束时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				    {field: 'INVENTORY_STATUS_NM',title: '盘点状态',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				    {field: 'CRT_NM',title: '制单人',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				    {field: 'CRT_DT',title: '制单时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
				    
				]],
				onClickRow: function (index,row) {
					OpenFrameInStoreAttribute(row.STORE_ID,row.INVENTORY_BEGIN);
					OpenFrameOutStoreAttribute(row.STORE_ID,row.INVENTORY_BEGIN);
					OpenFrameReturnAttribute(row.STORE_ID,row.INVENTORY_BEGIN);
					OpenFrameReturnMatAttribute(row.STORE_ID,row.INVENTORY_BEGIN);
					OpenFrameAllocationAttribute(row.STORE_ID,row.INVENTORY_BEGIN);
					if(row.STATUS_NM=="新建"){
	            		$("#btnApply").css("display","");
	            	}else{//判断按钮是否可用
	            		$("#btnApply").css("display","none");
	            	}
					if(row.STATUS_NM=="处理中"){
	            		$("#btnUpdate").css("display","");
	            		if(row.INVENTORY_STATUS_NM != "已执行"){
	            			$("#btnUpdates").css("display","");
	            		}else{
	            			$("#btnUpdates").css("display","none");
	            		}
	            	}else{//判断按钮是否可用
	            		$("#btnUpdate").css("display","none");
	            		$("#btnUpdates").css("display","none");
	            	}
					
		        	//OpenFrameSnAttribute(row.INVENTORY_NO);
					//$("#header-bottom").html(row.INVENTORY_NO);
		        },
			}
			initGridView(reqData, gridList);
			dataGrid.datagrid({"onLoadSuccess":function(data){
			    var STORE_ID = "";
			    var INVENTORY_BEGIN = "";
			    if(data.rows.length>0){
	        		$(this).datagrid('selectRow',0);
	        		if(checkNotEmpty(data.rows[0].INVENTORY_NO)){
	        			STORE_ID = data.rows[0].STORE_ID;
	        			INVENTORY_BEGIN = data.rows[0].INVENTORY_BEGIN;
	        		}
	        		if(data.rows[0].STATUS_NM=="新建"){
	            		$("#btnApply").css("display","");
	            	}else{//判断按钮是否可用
	            		$("#btnApply").css("display","none");
	            	}
					if(data.rows[0].STATUS_NM=="处理中"){
	            		$("#btnUpdate").css("display","");
	            		if(data.rows[0].INVENTORY_STATUS_NM != "已执行"){
	            			$("#btnUpdates").css("display","");
	            		}else{
	            			$("#btnUpdates").css("display","none");
	            		}
	            	}else{//判断按钮是否可用
	            		$("#btnUpdate").css("display","none");
	            		$("#btnUpdates").css("display","none");
	            	}
				    OpenFrameInStoreAttribute(STORE_ID,INVENTORY_BEGIN);
				    OpenFrameOutStoreAttribute(STORE_ID,INVENTORY_BEGIN);
				    OpenFrameReturnAttribute(STORE_ID,INVENTORY_BEGIN);
				    OpenFrameReturnMatAttribute(STORE_ID,INVENTORY_BEGIN);
				    OpenFrameAllocationAttribute(STORE_ID,INVENTORY_BEGIN);
			    }
			    
			    //OpenFrameSnAttribute(inventoryNo);
			    //$('#header-bottom').html(inventoryNo);
			}}).datagrid('loadData', jsonData);
		},
		/*底部的关联表格*/   
		OpenFrameInStoreAttribute = function(storeId,BeginDate){
			var tabName = 'CheckIn_tab';
			var dgridOp = $('#'+tabName).datagrid('options');
			if(!dgridOp) return;
			var reqDataA = {
				IFS: 'WMS_ITD00021',
				STROE_ID: storeId,
				STARTDATE: BeginDate,

				pageIndex: dgridOp.pageNumber,
				pageSize: dgridOp.pageSize	
			}
			dialogDataGrid('/iPlant_ajax', tabName, reqDataA);
			dialogEditorDataGrid = function(tabName,reqDataA, jsonData) {
				var columnsTab,edDataGrid,messageInfo;
				columnsTab=[
						{field: 'BILL_ID',title: '单号',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},  
						{field: 'BILL_TYPE_NM',title: '单据类型',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
						{field: 'STAUTS_NM',title: '单据状态',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
						{field: 'CRT_DT',title: '创建时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
					 
					    
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
		OpenFrameOutStoreAttribute = function(storeId,BeginDate){
			var tabName = 'CheckOut_tab';
			var dgridOp = $('#'+tabName).datagrid('options');
			if(!dgridOp) return;
			var reqDataA = {
				IFS: 'WMS_ITD00023',
				STROE_ID: storeId,
				STARTDATE: BeginDate,

				pageIndex: dgridOp.pageNumber,
				pageSize: dgridOp.pageSize	
			}
			dialogDataGrid('/iPlant_ajax', tabName, reqDataA);
			dialogEditorDataGrid = function(tabName,reqDataA, jsonData) {
				var columnsTab,edDataGrid,messageInfo;
				columnsTab=[
						{field: 'BILL_ID',title: '单号',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},  
						{field: 'BILL_TYPE_NM',title: '单据类型',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
						{field: 'STAUTS_NM',title: '单据状态',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
						{field: 'CRT_DT',title: '创建时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
					 
					    
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
		OpenFrameReturnAttribute = function(storeId,BeginDate){
			var tabName = 'Return_tab';
			var dgridOp = $('#'+tabName).datagrid('options');
			if(!dgridOp) return;
			var reqDataA = {
				IFS: 'WMS_ITD00024',
				STROE_ID: storeId,
				STARTDATE: BeginDate,

				pageIndex: dgridOp.pageNumber,
				pageSize: dgridOp.pageSize	
			}
			dialogDataGrid('/iPlant_ajax', tabName, reqDataA);
			dialogEditorDataGrid = function(tabName,reqDataA, jsonData) {
				var columnsTab,edDataGrid,messageInfo;
				columnsTab=[
						{field: 'BILL_ID',title: '单号',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},  
						{field: 'BILL_TYPE_NM',title: '单据类型',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
						{field: 'STAUTS_NM',title: '单据状态',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
						{field: 'CRT_DT',title: '创建时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
					 
					    
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
		OpenFrameReturnMatAttribute = function(storeId,BeginDate){
			var tabName = 'ReturnMat_tab';
			var dgridOp = $('#'+tabName).datagrid('options');
			if(!dgridOp) return;
			var reqDataA = {
				IFS: 'WMS_ITD00029',
				STROE_ID: storeId,
				STARTDATE: BeginDate,

				pageIndex: dgridOp.pageNumber,
				pageSize: dgridOp.pageSize	
			}
			dialogDataGrid('/iPlant_ajax', tabName, reqDataA);
			dialogEditorDataGrid = function(tabName,reqDataA, jsonData) {
				var columnsTab,edDataGrid,messageInfo;
				columnsTab=[
						{field: 'BILL_ID',title: '单号',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},  
						{field: 'BILL_TYPE_NM',title: '单据类型',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
						{field: 'STAUTS_NM',title: '单据状态',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
						{field: 'CRT_DT',title: '创建时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
					 
					    
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
		OpenFrameAllocationAttribute = function(storeId,BeginDate){
			var tabName = 'Allocation_tab';
			var dgridOp = $('#'+tabName).datagrid('options');
			if(!dgridOp) return;
			var reqDataA = {
				IFS: 'WMS_ITD00025',
				STROE_ID: storeId,
				STARTDATE: BeginDate,

				pageIndex: dgridOp.pageNumber,
				pageSize: dgridOp.pageSize	
			}
			dialogDataGrid('/iPlant_ajax', tabName, reqDataA);
			dialogEditorDataGrid = function(tabName,reqDataA, jsonData) {
				var columnsTab,edDataGrid,messageInfo;
				columnsTab=[
						{field: 'BILL_ID',title: '单号',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},  
						{field: 'BILL_TYPE_NM',title: '单据类型',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
						{field: 'STAUTS_NM',title: '单据状态',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
						{field: 'CRT_DT',title: '创建时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
					 
					    
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

	    CheckInv = function(){//审核盘点任务
       		var isSelectedData = validSelectedData('InventoryTask_tab', 'Check');
            if (!isSelectedData) {
            	commonShowMessage('提示', '请选择一条数据进行审核');
                return;
            }
            var selectData =$('#InventoryTask_tab').datagrid('getSelected');
       	 	$.messager.confirm('确认框', '是否进行审核?', function (r) {
                if(r==true){
		        	reqData ={ IFS :'WMS_ITD00026',INVENTORY_NO:selectData.INVENTORY_NO};
		            var ajaxParam = {
		                 url: '/iPlant_ajax',
		                 dataType: 'JSON',
		                 data: reqData,
		                 successCallBack:function(data){
		                	 commonShowMessage('审核成功');
		                	 initGridData();
		                 },
		                 errorCallBack:function(){
		                	 commonShowMessage('审核失败，请联系管理员');
		                 }   
		            };
		            iplantAjaxRequest(ajaxParam);
                }
       	 	})    
	    },
	    CheckEnd = function(){//盘点任务结束
       		var isSelectedData = validSelectedData('InventoryTask_tab', 'Check');
            if (!isSelectedData) {
            	commonShowMessage('提示', '请选择一条数据进行');
                return;
            }
            var selectData =$('#InventoryTask_tab').datagrid('getSelected');
       	 	$.messager.confirm('确认框', '是否结束当前盘点?', function (r) {
                if(r==true){
		        	reqData ={ IFS :'WMS_ITD00027',INVENTORY_NO:selectData.INVENTORY_NO};
		            var ajaxParam = {
		                 url: '/iPlant_ajax',
		                 dataType: 'JSON',
		                 data: reqData,
		                 successCallBack:function(data){
		                	 commonShowMessage('结束成功');
		                	 initGridData();
		                 },
		                 errorCallBack:function(){
		                	 commonShowMessage('结束失败，请联系管理员');
		                 }   
		            };
		            iplantAjaxRequest(ajaxParam);
                }
       	 	})    
	    },
	    InvBreakeven = function(){//盘点任务盈亏结算
       		var isSelectedData = validSelectedData('InventoryTask_tab', 'Check');
            if (!isSelectedData) {
            	commonShowMessage('提示', '请选择一条数据进行');
                return;
            }
            var selectData =$('#InventoryTask_tab').datagrid('getSelected');
       	 	$.messager.confirm('确认框', '是否开始盈亏结算?', function (r) {
                if(r==true){
		        	reqData ={ IFS :'WMS_ITD00028',INVENTORY_NO:selectData.INVENTORY_NO};
		            var ajaxParam = {
		                 url: '/iPlant_ajax',
		                 dataType: 'JSON',
		                 data: reqData,
		                 successCallBack:function(data){
		                	 commonShowMessage('盈亏结算成功');
		                	 initGridData();
		                 },
		                 errorCallBack:function(){
		                	 commonShowMessage('结算失败，请联系管理员');
		                 }   
		            };
		            iplantAjaxRequest(ajaxParam);
                }
       	 	})    
	    },
	    validSelectedData = function (gridName,type) {
            var checkedItems = $('#' + gridName).datagrid('getSelections'),num = 0;
            $.each(checkedItems, function (index, item) { num++;});
            if (type == 'modify') {
                if (num != 1) { return false;}
            } else {
                if (num <= 0) { return false;}
            }
            return true;
        },


		setQueryNull=function() {//置空查询输入框
			$('#InventoryTaskNo').textbox('setValue',""),
	    	$('#qStore').combobox('setValue',""),
	    	$('#qProDtBegin').datebox('setValue',""),
	    	$('#qProDtEnd').datebox('setValue',"");
	    },
		searchDataGrid=function(dgrid){/*查询*/
	    	var InventoryTaskNo = $('#InventoryTaskNo').textbox('getValue'),qStore = $('#qStore').combobox('getValue'),qProDtBegin =$('#qProDtBegin').datebox('getValue'),qProDtEnd =$('#qProDtEnd').datebox('getValue');
	    	if(InventoryTaskNo=="N/A"){
	    		InventoryTaskNo = "";
		    }
	    	var reqData = {
	    		InventoryTaskNo: InventoryTaskNo,
		    	qStore: qStore,
		    	qProDtBegin: qProDtBegin,
		        qProDtEnd: qProDtEnd,
		        pageIndex:dgrid.pageNumber,
                pageSize:dgrid.pageSize,
		        IFS:'WMS_ITD00002'
			}
			reqGridData('/iPlant_ajax', 'InventoryTask_tab', reqData);
		},
		selectStore = function(){//初始化仓库信息
	    	var reqStore = {
	            url: "/iPlant_ajax",
	            dataType: "JSON",
	            data: {IFS: "WMS_B00030",storeType:'WSTORE-01'},
	            successCallBack: function(a) {
	            	dataStore = [];
	            	dataStore.push({"value":"","text":"全部"});
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
		}
	};
	InventoryTask.prototype = {
		init: function() {
			$(function() {
				var storeId="";
				/*初始化全局变量对象*/
			    dataGrid = $('#InventoryTask_tab');
				initGridData();
			    selectStore();
			    dateValid("qProDtBegin","qProDtEnd","2");
				//限制输入英文单引号
		        $("input",$("#InventoryTaskNo").next("span")).keydown(function(e){
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
	var mp = new InventoryTask();
	mp.init();
})();




