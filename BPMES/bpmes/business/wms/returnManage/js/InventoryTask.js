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
				    {field: 'AREA_NAME',title: '盘点区域',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'SHELF_NAME',title: '盘点货架',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'LOCATION_NAME',title: '盘点货位',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				    {field: 'INVENTORY_BEGIN',title: '盘点开始时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				    {field: 'INVENTORY_END',title: '盘点结束时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				    //{field: 'INVENTORY_STATUS_NM',title: '盘点状态',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				    {field: 'CRT_NM',title: '制单人',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				    {field: 'CRT_DT',title: '制单时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
				    
				]],
				onClickRow: function (index,row) {
		        	OpenFrameAttribute(row.INVENTORY_NO);
		        	OpenFrameSnAttribute(row.INVENTORY_NO);
					$("#header-bottom").html(row.INVENTORY_NO);
					if(row.STATUS_NM=="新建"){
	            		$("#btnDelete").css("display","");
	            	}else{//判断按钮是否可用
	            		$("#btnDelete").css("display","none");
	            	}
		        },
			}
			initGridView(reqData, gridList);
			dataGrid.datagrid({"onLoadSuccess":function(data){
			    var inventoryNo = "";
			    if(data.rows.length>0){
	        		$(this).datagrid('selectRow',0);
	        		if(checkNotEmpty(data.rows[0].INVENTORY_NO)){
	        			inventoryNo = data.rows[0].INVENTORY_NO;
	        		}
	        		if(data.rows[0].STATUS_NM=="新建"){
	            		$("#btnDelete").css("display","");
	            	}else{//判断按钮是否可用
	            		$("#btnDelete").css("display","none");
	            	}
			    }
			    OpenFrameAttribute(inventoryNo);
			    OpenFrameSnAttribute(inventoryNo);
			    $('#header-bottom').html(inventoryNo);
			}}).datagrid('loadData', jsonData);
		},
		/*底部的关联表格*/   
		OpenFrameAttribute = function(inventoryNo){
			var tabName = 'InventoryTaskbottom_tab';
			var dgridOp = $('#'+tabName).datagrid('options');
			if(!dgridOp) return;
			var reqDataA = {
				IFS: 'WMS_ITD00004',
				INVENTORY_NO: inventoryNo,
				pageIndex: dgridOp.pageNumber,
				pageSize: dgridOp.pageSize	
			}
			dialogDataGrid('/iPlant_ajax', tabName, reqDataA);
			dialogEditorDataGrid = function(tabName,reqDataA, jsonData) {
				var columnsTab,edDataGrid,messageInfo;
				columnsTab=[
						{field: 'MATERIAL_ID',title: '物料编码',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},  
						{field: 'MATERIAL_NAME',title: '物料名称',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
						{field: 'BEFORE_QTY',title: '盘前数量',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					    {field: 'INVENTORY_QTY',title: '盘点数量',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
						{field: 'CUST_NO',title: '客户代码',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					    {field: 'CUST_NAME',title: '客户名称',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					    {field: 'SUPPLIER_ID',title: '供应商编码',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
						{field: 'SUPPLIER_NAME',title: '供应商名称',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					    {field: 'SPEC_MODEL',title: '规格型号',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					    {field: 'UNIT_NAME',title: '单位名称',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
						{field: 'STORE_NAME',title: '仓库',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
						{field: 'AREA_NAME',title: '区域',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
						{field: 'SHELF_NAME',title: '货架',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
						{field: 'LOCATION_NAME',title: '货位',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
						{field: 'CRT_NM',title: '操作人员',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
						{field: 'CRT_DT',title: '操作时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
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
		OpenFrameSnAttribute = function(inventoryNo){
			var tabName = 'InventoryTaskSnbottom_tab';
			var dgridOp = $('#'+tabName).datagrid('options');
			if(!dgridOp) return;
			var reqDataA = {
				IFS: 'WMS_ITD00003',
				INVENTORY_NO: inventoryNo,
				pageIndex: dgridOp.pageNumber,
				pageSize: dgridOp.pageSize	
			}			
			dialogEditorDataGrid1 = function(tabName,reqDataA, jsonData) {
				var columnsTab,edDataGrid,messageInfo;
				columnsTab=[
					        {field: 'CARTON_NO',title: '外箱条码',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},    
	                        {field: 'SERIAL_NUMBER',title: '物料标签',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},      
							{field: 'MATERIAL_ID',title: '物料编码',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},  
							{field: 'MATERIAL_NAME',title: '物料名称',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
							{field: 'CUST_NO',title: '客户代码',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
						    {field: 'CUST_NAME',title: '客户名称',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
						    {field: 'BEFORE_QTY',title: '盘前数量',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
						    {field: 'INVENTORY_QTY',title: '盘点数量',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
						    {field: 'STORE_NAME',title: '仓库',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
							{field: 'AREA_NAME',title: '区域',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
							{field: 'SHELF_NAME',title: '货架',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
							{field: 'LOCATION_NAME',title: '货位',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
						    {field: 'SUPPLIER_ID',title: '供应商编码',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
							{field: 'SUPPLIER_NAME',title: '供应商名称',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
						    {field: 'SPEC_MODEL',title: '规格型号',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
						    {field: 'UNIT_NAME',title: '单位名称',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
							{field: 'LOT_NO',title: '批号',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
							{field: 'ARRIVAL_DATE',title: '收货日期',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
							{field: 'PRODUCT_DATE',title: '生产日期',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
							{field: 'VALIDITY_DATE',title: '有效期',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
							{field: 'CRT_NM',title: '操作人员',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
							{field: 'CRT_DT',title: '操作时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
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
	    //查询盘点任务编号
		getInventoryTaskId =function(){
	        var workOrderData='';
	        var ajaxParam={
	            url:'/iPlant_ajax',
	            data:{
	                  IFS:'WMS_ITD00001',
	            },
	            successCallBack:function(data){
	                var rowNum=0
	                if(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS){
	                    rowNum=parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
	                    workOrderData=data.RESPONSE["0"].RESPONSE_DATA[0];
	                }
	                $('#txtInventoryTaskId').textbox('setValue',workOrderData.INVENTORY_TASK_ID).textbox('readonly').textbox({ required: true }); 
	                
	            }
	        } 
	        iplantAjaxRequest(ajaxParam); 
	    },
	    deleteInvTask = function(){//删除
       		var isSelectedData = validSelectedData('InventoryTask_tab', 'Delete');
            if (!isSelectedData) {
            	commonShowMessage('提示', '请选择一条数据进行删除');
                return;
            }
            var selectData =$('#InventoryTask_tab').datagrid('getSelected');
       	 	$.messager.confirm('确认框', '您确定要删除您所选择的数据?', function (r) {
                if(r==true){
		        	reqData ={ IFS :'WMS_ITD00006',INVENTORY_NO:selectData.INVENTORY_NO};
		            var ajaxParam = {
		                 url: '/iPlant_ajax',
		                 dataType: 'JSON',
		                 data: reqData,
		                 successCallBack:function(data){
		                	 commonShowMessage('删除成功');
		                	 initGridData();
		                 },
		                 errorCallBack:function(){
		                	 commonShowMessage('删除失败，请联系管理员');
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
	    saveInvTask = function(){
			if(!checkForm()) return;
			var InvStore=$('#InvStore').combobox('getValue');
			if (InvStore == ""){
				InvStore ="N/A";
			}
			var InvArea=$('#InvArea').combobox('getValue');
			if (InvArea == "" || InvArea == "全部"){
				InvArea ="N/A";
			}
			var InvShelf=$('#InvShelf').combobox('getValue');
			if (InvShelf == "" || InvShelf == "全部"){
				InvShelf ="N/A";
			}
			var InvLocation=$('#InvLocation').combobox('getValue');
			if (InvLocation == "" || InvLocation == "全部"){
				InvLocation ="N/A";
			}
			var ajaxParam = {
					url: '/iPlant_ajax',
					dataType: 'JSON',
					data: {
						InventoryTaskId: $('#txtInventoryTaskId').textbox('getText'),
						InvPlanId: $('#InvPlanId').combobox('getValue'),
						InvStore:InvStore ,
						InvArea: InvArea,
						InvShelf: InvShelf,
						InvLocation:InvLocation ,
						IFS: 'WMS_ITD00005'
					},
					
					successCallBack: function(data) {
						var susMsg=getReturnMsg(data);
						commonShowMessage('新增成功');
						$('#enditTab').dialog('close');
            			initGridData();
	                
					},
					errorCallBack: function() {
						commonShowMessage('新增失败');
					}
						
				};
				iplantAjaxRequest(ajaxParam);
				
		},
	    //清空表格
		setDataNull = function () {           
	        $('#InvArea').combobox('setValue','');   
	        $('#InvShelf').combobox('setValue','');  
	        $('#InvLocation').combobox('setValue','');  
	        $('#enditTab').dialog('close');
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
//打开弹出看 弹出框的操作为修改和新增
function closeOpen(param) {			//param用于判断是修改还是新增操作
	$("#InsertUpdate").val(param);
	getInventoryTaskId();
	$('#txtInventoryTaskId').textbox('textbox').attr('readonly',false);
	$('#txtInventoryTaskId').textbox('textbox').attr('disabled',false);
	setDataNull();
	// 打开弹出框时加载下拉框的数据，级联操作，可使用循环遍历json数据绑定下拉框
	//var arr=ajaxquery("WMS_C000007","");	//查询出原料、成品、控制品仓库的信息
	var InvPlanNo=ajaxquery("WMS_ITD00013","");	//查询出所有盘点计划id
	
	
	
		$('#InvStore').combobox({    
		    valueField:'STORE_ID',    
		    textField:'STORE_NAME' ,
		    editable:false
		}); 
		$('#InvArea').combobox({    
		    valueField:'AREA_ID',    
		    textField:'AREA_NAME',
		    editable:false
		}); 
		$('#InvShelf').combobox({    
		    valueField:'SHELF_ID',    
		    textField:'SHELF_NAME',
		    editable:false
		}); 
		$('#InvLocation').combobox({    
		    valueField:'LOCATION_ID',    
		    textField:'LOCATION_NAME',
		    editable:false
		}); 
		$('#InvPlanId').combobox({    
		    valueField:'INVENTORY_ID',    
		    textField:'INVENTORY_ID',
		    editable:false
		}); 
		
		
		//$('#InvStore').combobox("loadData", arr);
		$('#InvPlanId').combobox("loadData", InvPlanNo);
		  
		
		if(param==1){	//==1为新增   ==2为修改
			$('#enditTab').dialog('open');
			
			$('#InvPlanId').combobox('select',InvPlanNo[0].INVENTORY_ID);
            $("#InvStore").combobox("clear");
            //仓库
            var store=ajaxquery("WMS_C000007","STORE_ID:"+InvPlanNo[0].INVENTORY_STORE+"");
            $('#InvStore').combobox("loadData", store);
            
            if(store.length>7){
            	$('#InvStore').combobox({panelHeight:200})
			}else{
				$('#InvStore').combobox({panelHeight:'auto'})
			}
            $('#InvStore').combobox('select',store[0].STORE_ID);
            
            $("#InvArea").combobox("clear");
            var dataArea = [];  var dataShelfs = [];  var dataAllocations = [];
            dataArea.push({"AREA_ID":"N/A","AREA_NAME":"全部"});
            var op=ajaxquery("WMS_C000008","STORE_ID:"+store[0].STORE_ID+"");
            $.each(op,function(n,obj) {
            	dataArea.push({'AREA_ID':obj.AREA_ID,'AREA_NAME':obj.AREA_NAME});
		    });
            //区域
            $('#InvArea').combobox("loadData",dataArea );
           
            if(dataArea.length>7){
            	$('#InvArea').combobox({panelHeight:200})
			}else{
				$('#InvArea').combobox({panelHeight:'auto'})
			}
            $('#InvArea').combobox('select',dataArea[0].AREA_NAME);
            //货架
            dataShelfs.push({"SHELF_ID":"N/A","SHELF_NAME":"全部"});
            $('#InvShelf').combobox("loadData",dataShelfs );
            
            if(dataShelfs.length>7){
            	$('#InvShelf').combobox({panelHeight:200})
			}else{
				$('#InvShelf').combobox({panelHeight:'auto'})
			}
            $('#InvShelf').combobox('select',dataShelfs[0].SHELF_NAME);
            //货位
            dataAllocations.push({"LOCATION_ID":"N/A","LOCATION_NAME":"全部"});
            $('#InvLocation').combobox("loadData",dataAllocations);
            
            if(dataAllocations.length>7){
            	$('#InvLocation').combobox({panelHeight:200})
			}else{
				$('#InvLocation').combobox({panelHeight:'auto'})
			}
            $('#InvLocation').combobox('select',dataAllocations[0].LOCATION_NAME);
		}else if(param==2){
			updateLoad();
		}
}

function ajaxquery(id, b) {
	var arr = new Array();
	var d = {
		IFS : id,
		reqType : "WEB"
	};
	reqParam = b.split(",");
	if ("" != reqParam) for (var e = 0; e < reqParam.length; e++) {			//当无输入参数时，此判断不会进入循环将不会进入
    var f = reqParam[e].toString().replace('"', ""),
    g = f.substring(0, f.indexOf(":")).toString(),
    h = f.indexOf(":") + 1,								
    i = f.substring(h).toString();
    d[g] = i
} 
	var c = "";
	null != d && (c = '{"REQ":[{"REQ_DATA":' + JSON.stringify(d) + "}]}");
	var w = 1;
	$.ajax({
		async : false,
		type : "POST",
		url : "../../../iPlant_ajax",
		dataType : "json",
		data : {
			reqStr : c
		},
		success : function(data) {
			arr = data.RESPONSE[0].RESPONSE_DATA;
		}
	});
	return arr;
}

//联动
function view() {
	 $("#InvPlanId").combobox({  
	    	onHidePanel: function () {  
	            var newPtion =  $("#InvPlanId").numberbox("getValue");
	            var store=ajaxquery("WMS_ITD00014","INVENTORY_ID:"+newPtion+"");
	            $('#InvStore').combobox("loadData", store);
	            
	            if(store.length>7){
	            	$('#InvStore').combobox({panelHeight:200})
				}else{
					$('#InvStore').combobox({panelHeight:'auto'})
				}
	            $('#InvStore').combobox('select',store[0].STORE_ID);
	            $("#InvArea").combobox("clear");
	            $("#InvShelf").combobox("clear");
	            $("#InvLocation").combobox("clear");
	            var dataAreas = [];
	            dataAreas.push({"AREA_ID":"N/A","AREA_NAME":"全部"});
	            var op=ajaxquery("WMS_C000008","STORE_ID:"+store[0].STORE_ID+"");
	            $.each(op,function(n,obj) {
	            	dataAreas.push({'AREA_ID':obj.AREA_ID,'AREA_NAME':obj.AREA_NAME});
			    });
	            //区域
	            $('#InvArea').combobox("loadData",dataAreas );
	            
	            if(dataAreas.length>7){
	            	$('#InvArea').combobox({panelHeight:200})
				}else{
					$('#InvArea').combobox({panelHeight:'auto'})
				}
	            $('#InvArea').combobox('select',dataAreas[0].AREA_NAME);
	            var dataShelfs = [];  var dataAllocations = [];
	            //货架
	            dataShelfs.push({"SHELF_ID":"N/A","SHELF_NAME":"全部"});
	            $('#InvShelf').combobox("loadData",dataShelfs );
	            
	            if(dataShelfs.length>7){
	            	$('#InvShelf').combobox({panelHeight:200})
				}else{
					$('#InvShelf').combobox({panelHeight:'auto'})
				}
	            $('#InvShelf').combobox('select',dataShelfs[0].SHELF_NAME);
	            //货位
	            dataAllocations.push({"LOCATION_ID":"N/A","LOCATION_NAME":"全部"});
	            $('#InvLocation').combobox("loadData",dataAllocations);
	            
	            if(dataAllocations.length>7){
	            	$('#InvLocation').combobox({panelHeight:200})
				}else{
					$('#InvLocation').combobox({panelHeight:'auto'})
				}
	            $('#InvLocation').combobox('select',dataAllocations[0].LOCATION_NAME);
	            
	        }  
	    }); 
/*	 $("#InvStore").combobox({  
	    	onHidePanel: function () {  
	            var newPtion =  $("#InvStore").numberbox("getValue");
	            $("#InvArea").combobox("clear");
	            $('#InvArea').combobox("loadData", ajaxquery("WMS_C000008","STORE_ID:"+newPtion+""));
	        }  
	    }); */
	    $("#InvArea").combobox({  
	    	onHidePanel: function () {  
	            var newPtion =  $("#InvArea").numberbox("getValue");
	            $("#InvShelf").combobox("clear");
	            var dataShelf = [];
	            dataShelf.push({"SHELF_ID":"N/A","SHELF_NAME":"全部"});
	            var op=ajaxquery("WMS_C000009","AREA_ID:"+newPtion+"");
	            $.each(op,function(n,obj) {
	            	dataShelf.push({'SHELF_ID':obj.SHELF_ID,'SHELF_NAME':obj.SHELF_NAME});
			    });
	            $('#InvShelf').combobox("loadData",dataShelf );
	            
	            if(dataShelf.length>7){
	            	$('#InvShelf').combobox({panelHeight:200})
				}else{
					$('#InvShelf').combobox({panelHeight:'auto'})
				}
	            $('#InvShelf').combobox('select',dataShelf[0].SHELF_NAME);
	            
	            
	          //货位
	            var dataAllocations = [];
	            dataAllocations.push({"LOCATION_ID":"N/A","LOCATION_NAME":"全部"});
	            $('#InvLocation').combobox("loadData",dataAllocations);
	            
	            if(dataAllocations.length>7){
	            	$('#InvLocation').combobox({panelHeight:200})
				}else{
					$('#InvLocation').combobox({panelHeight:'auto'})
				}
	            $('#InvLocation').combobox('select',dataAllocations[0].LOCATION_NAME);
	        }  
	    }); 
	    $("#InvShelf").combobox({  
	    	onHidePanel: function () {  
	            var newPtion =  $("#InvShelf").numberbox("getValue");
	            $("#InvLocation").combobox("clear");
	            var dataLocation = [];
	            dataLocation.push({"LOCATION_ID":"N/A","LOCATION_NAME":"全部"});
	            var op=ajaxquery("WMS_C0000010","SHELF_ID:"+newPtion+"");
	            $.each(op,function(n,obj) {
	            	dataLocation.push({'LOCATION_ID':obj.LOCATION_ID,'LOCATION_NAME':obj.LOCATION_NAME});
			    });	
	            $('#InvLocation').combobox("loadData",dataLocation);
	            
	            if(dataLocation.length>7){
	            	$('#InvLocation').combobox({panelHeight:200})
				}else{
					$('#InvLocation').combobox({panelHeight:'auto'})
				}
	            $('#InvLocation').combobox('select',dataLocation[0].LOCATION_NAME);
	        }  
	    }); 
	 
}
