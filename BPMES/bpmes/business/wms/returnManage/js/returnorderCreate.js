(function(){
	function returnOrderCreate(){
		
		bindGridData=function (reqData,jsonData){
			 var grid = {
		    		  name: exports.gridName,
		              dataType: 'json',
		              singleSelect:true,
		              columns:[[
		                    { field: 'APPLY', title: '审核', width: 50 ,align:'center',formatter:function(value){if(value=='WORDERSTATUS-01')
		                    	{ return "<img href='javascript:void(0)' style='cursor:pointer;' class='easyui-linkbutton' src='../../../common/RootImages/apply.png'/>"}else{ return "<img href='javascript:void(0)' class='easyui-linkbutton' src='../../../common/RootImages/apply_over.png'/>"}}},    
							{ field: 'RETURN_NO', title: '退料单号', width: 150 ,align:'center'},
					   		{ field: 'SOURCE_NO', title: '制令单号', width: 150 ,align:'center'},
					   		{ field: 'BILL_TYPE', title: '单据类别', width: 80 ,align:'center'},
					   		{ field: 'STATUS', title: '单据状态', width: 120 ,align:'center',hidden:true},
					   		{ field: 'STATUS_NM', title: '单据状态', width: 120 ,align:'center'},
					   		{ field: 'CRT_DT', title: '制单时间', width: 200 ,align:'center'},
					   		{ field: 'CRT_ID', title: '制单人', width: 100 ,align:'center'},
					   		{ field: 'ADT_DT', title: '审核时间', width: 200 ,align:'center'},
					   		{ field: 'ADT_ID', title: '审核人', width: 100 ,align:'center'},
			            ]],
			            /*onDblClickRow: function(index,row){
			            	if(row.STATUS=="WORDERSTATUS-01"){
			            		modifyDataPo();
			            	}
			            },*/
			            onClickRow: function(index,row){
			            	returnNo=row.RETURN_NO;
			            	if(row.STATUS=="WORDERSTATUS-01"){//判断按钮是否可用
			            		$("#btnDelete").css("display","");
			            		$("#btnUpdate").css("display","");
			            		$("#btnPrint").css("display","none");
			            	}else{
			            		$("#btnDelete").css("display","none");
			            		$("#btnUpdate").css("display","none");
			            		$("#btnPrint").css("display","");
			            	}
			            	initDataPropicking(row.RETURN_NO);
			            	$('#propickingNoShow').html(row.RETURN_NO);
					    },
					    onClickCell : function (index,field,value) {/**单击进入编辑模式*/
				        	var grid = $('#'+exports.gridName),rows = grid.datagrid('getRows'),row = rows[index];
				        	grid.datagrid('clearSelections'),grid.datagrid('selectRow',index);
				        	if(field=='APPLY'){
			        			if(row.STATUS=="WORDERSTATUS-01"){
			        				$.messager.confirm('确认框','您确定要审核通过该领料单?',function(r){
			        					if (r == true) {
			        						applyDataPo(row);
			        					}
			        				});
			        			}
				        	}
				        }
		    	  	}
		        	initGridView(reqData,grid);
		        	$('#'+exports.gridName).datagrid({"onLoadSuccess":function(data){
		        		var propickingNo = "#";
					    if(data.rows.length>0){
			        		$(this).datagrid('selectRow',0);
			        		if(checkNotEmpty(data.rows[0].RETURN_NO)){
			        			propickingNo = data.rows[0].RETURN_NO;
	 		        		}
					    }
					    initDataPropicking(propickingNo);
					    $('#propickingNoShow').html(propickingNo);
					}}).datagrid('loadData', jsonData);
		};
	    function applyDataPo(row){
	    	var reqData = {IFS:"WMS_RE00015",returnNo:row.RETURN_NO};
	    	var ajaxParam = {
   	             url: '/iPlant_ajax',
   	             dataType: 'JSON',
   	             data: reqData,
   	             successCallBack:function(data){
   	            	commonShowMessage("审核通过！"),
   	                initReturnOrder();
   	             },
   	             errorCallBack:function(){
   	            	commonShowMessage("审核操作失败！");
   	             }
   	         };
   	         iplantAjaxRequest(ajaxParam);
	    };
		function initDataPropicking(propickingNo){
			var tabName = exports.gridDetailName;
			var dgridOp = $('#'+tabName).datagrid('options');
			if(!dgridOp) return;
			if(!checkNotEmpty(propickingNo)){
				propickingNo = "N/O";
			}
			var reqData = {
				IFS: 'WMS_RE00010',
				propickingNo: propickingNo,
				pageIndex: dgridOp.pageNumber,
				pageSize: dgridOp.pageSize	
			}
			dialogDataGrid('/iPlant_ajax', tabName, reqData);
			dialogEditorDataGrid = function(tabName,reqData, jsonData) {
				var columnsTab=[
				    { field: 'SERIAL_NUMBER', title: '物料条码', width: 200 ,align:'center'},
				    { field: 'INSTORE_NO', title: '入库单号', width: 200 ,align:'center'},
				    { field: 'MATERIAL_ID', title: '物料编码', width: 200 ,align:'center'},
				    { field: 'MATERIAL_NAME', title: '物料名称', width: 200 ,align:'center'},
				    { field: 'SUPPLIER_ID', title: '供应商编码', width: 200 ,align:'center',hidden:true},
				    { field: 'SUPPLIER_NAME', title: '供应商名称', width: 200 ,align:'center'},
				    { field: 'RETURN_QTY', title: '退料数量', width: 100 ,align:'center'},
				    { field: 'UNIT_NAME', title: '单位', width: 140 ,align:'center'},
				    { field: 'LOT_NO', title: '批次号', width: 100 ,align:'center'},
				    { field: 'STORE_NAME', title: '仓库编码', width: 140 ,align:'center'},
				    { field: 'AREA_NAME', title: '区域编码', width: 140 ,align:'center'},
				    { field: 'SHELF_NAME', title: '货架编码', width: 140 ,align:'center'},
				    { field: 'LOCATION_NAME', title: '货位编码', width: 140 ,align:'center'},
				    { field: 'UNIT_ID', title: '单位编码', width: 0 ,align:'center',hidden:true}
				];
				var gridLists = {
					name: tabName,
					dataType: 'json',
					singleSelect:true,
					columns: [columnsTab],
					onClickCell : function (index,field,value) {/**单击进入编辑模式*/
			        	var grid = $('#'+tabName),rows = grid.datagrid('getRows'),row = rows[index];
			        	grid.datagrid('clearSelections'),grid.datagrid('selectRow',index);
			        }
				}
				initEditorDataGridView(reqData, gridLists);
				$('#'+tabName).datagrid('loadData', jsonData);
			}
		};
		function queryMoInfoByCondition(){
			var tabName = exports.gridMoName,dgrid = $('#'+tabName).datagrid('options');
			//var comboType=$("#queryMaterialType").combobox("getValue");
			var monoData=$("#queryMONO").textbox("getValue");
			var beginDate=$("#queryDialogBegin").datebox("getValue");
			var endDate=$("#queryDialogEnd").datebox("getValue");
			if(!dgrid) return;
			var reqData={};
			reqData ={
			        pageIndex:1,
			        pageSize:10,
			        IFS:'WMS_RE00012',
			        MO_NO:monoData,
			        beginDate:beginDate,
				    endDate:endDate	
			 };
			var dialogEditorDataGrid1 = function(tabName,reqData, jsonData) {
				var columnsTab=[
					{field : "CZ",width : 10,checkbox : true},
				    { field: 'MO_NO', title: '制令单号', width: 200 ,align:'center'},
				    { field: 'SERIAL_NUMBER', title: '物料条码', width: 200 ,align:'center'},
				    //{ field: 'SURPLUS_ID', title: '结存ID', width: 200 ,align:'center'},
				    { field: 'MATERIAL_ID', title: '物料编码', width: 140 ,align:'center'},
				    { field: 'MATERIAL_NAME', title: '物料名称', width: 140 ,align:'center'},
				    { field: 'QTY', title: '剩余数量', width: 120 ,align:'center'},
				    { field: 'SUPPLIER_ID', title: '供应商编码', width: 100 ,align:'center',hidden:true},
				    { field: 'SUPPLIER_NAME', title: '供应商名称', width: 140 ,align:'center'},
				    { field: 'SPEC_MODEL', title: '规格型号', width: 100 ,align:'center',hidden:true},
				    { field: 'UNIT_ID', title: '单位ID', width: 100 ,align:'center',hidden:true},
				    { field: 'UNIT_NAME', title: '单位名称', width: 140 ,align:'center'},
				    { field: 'STORE_ID', title: '仓库编码', width: 140 ,align:'center',hidden:true},
				    { field: 'STORE_NAME', title: '仓库名称', width: 140 ,align:'center'},
				    { field: 'PENDING', title: '类型', width: 140 ,align:'center'},
				    { field: 'ARRIVAL_DATE', title: '入库时间', width: 200 ,align:'center'}
				];
				
				var gridLists = {
					name: tabName,
					dataType: 'json',
					singleSelect:false,
					columns: [columnsTab],
					onDblClickRow: function(index,row){
						
						var grid = $('#'+tabName);
						grid.datagrid('clearSelections'),grid.datagrid('selectRow',index);
						selectMoDataOk();
		            }
				}
				initEditorDataGridView1(reqData, gridLists);
				$('#'+tabName).datagrid('loadData', jsonData);
			}
			myDataGrid('/iPlant_ajax', tabName, reqData,dialogEditorDataGrid1);
		};
		function selectMoDataOk(){
			var selected = $('#'+exports.gridMoName).datagrid("getSelections"),rows = fmDataGrid.datagrid('getRows');
	    	if(selected.length>0){
	    		for(var i=0;i<selected.length;i++){
	    			if(rows.length>0){
    					if(compareSelectDataGrid(selected[i],rows)){
    						if(!sameMoPickOrder(selected[i],rows)){
    							showMessage.html("<font color=red>提示：请选择同一工单物料信息！</font>");
    				    		return false;
    						}else {
    							setDataGridValue(selected[i],i);
							}
    					}
	    			}else{
	    				setDataGridValue(selected[i],i);
	    			}
		    	}
	    		showMessage.html("");
	    	}else{
	    		showMessage.html("<font color=red>提示：请选择工单退料信息！</font>");
	    		return false;
	    	}
		};
		function setDataGridValue(data,num){
			fmDataGrid.datagrid("insertRow", {row: {index: num,
				SOURCE_NO:data.MO_NO,SERIAL_NUMBER:data.SERIAL_NUMBER,MATERIAL_ID:data.MATERIAL_ID,MATERIAL_NAME:data.MATERIAL_NAME,RETURN_QTY:data.QTY,SUPPLIER_ID:data.SUPPLIER_ID,
				SUPPLIER_NAME:data.SUPPLIER_NAME,SPEC_MODEL:data.SPEC_MODEL,STORE_ID:data.STORE_ID,STORE_NAME:data.STORE_NAME,AREA_ID:data.AREA_ID,SHELF_ID:data.SHELF_ID,LOCATION_ID:data.LOCATION_ID,
				UNIT_ID:data.UNIT_ID,UNIT_NAME:data.UNIT_NAME,PENDING:data.PENDING,ARRIVAL_DATE:data.ARRIVAL_DATE}});
	    	editIndex = num;
		};
		function compareSelectDataGrid(selected,rows){
			var target = true;
	    	if(rows.length>0){
	    		for(var i=0;i<rows.length;i++){
	    			if(selected.MO_NO==rows[i].SOURCE_NO && selected.MATERIAL_ID==rows[i].MATERIAL_ID && selected.SERIAL_NUMBER==rows[i].SERIAL_NUMBER
	    			&&selected.STORE_ID==rows[i].STORE_ID && selected.STORE_NAME==rows[i].STORE_NAME && selected.AREA_ID==rows[i].AREA_ID && selected.SHELF_ID==rows[i].SHELF_ID && selected.LOCATION_ID==rows[i].LOCATION_ID){
	    				target = false;
	    	    	}
		    	}
	    	}
	    	return target;
		};
		function sameMoPickOrder(selected,rows){
			var target = true;
	    	if(rows.length>0){
	    		for(var i=0;i<rows.length;i++){
	    			if(selected.MO_NO != rows[i].SOURCE_NO){
	    				target = false;
	    	    	}
		    	}
	    	}
	    	return target;
		};
		function delMoDataList(){
			var rows = fmDataGrid.datagrid('getRows'),row = fmDataGrid.datagrid('getSelected'),rowIndex = fmDataGrid.datagrid('getRowIndex', row);
	    	fmDataGrid.datagrid('deleteRow',rowIndex);
		};
		function initPickGridData(propickingNo){
			var columns = [
							{ field: 'SOURCE_NO', title: '制令单号', width: 200 ,align:'center'},
							{ field: 'SERIAL_NUMBER', title: '物料条码', width: 200 ,align:'center'},
							{ field: 'MATERIAL_ID', title: '物料编码', width: 140 ,align:'center'},
							{ field: 'MATERIAL_NAME', title: '物料名称', width: 140 ,align:'center'},
							{ field: 'RETURN_QTY', title: '退料数量', width: 120 ,align:'center'},
								/*  <font color=red>*</font> ,editor:{type:'validatebox',options:{required:true,validType:['numberInteger']}}},*/
							{ field: 'SUPPLIER_ID', title: '供应商编码', width: 100 ,align:'center',hidden:true},
						    { field: 'SUPPLIER_NAME', title: '供应商名称', width: 140 ,align:'center'},
						    { field: 'SPEC_MODEL', title: '规格型号', width: 120 ,align:'center',hidden:true},
						    { field: 'UNIT_ID', title: '单位ID', width: 140 ,align:'center',hidden:true},
						    { field: 'UNIT_NAME', title: '单位名称', width: 140 ,align:'center'},
						    { field: 'STORE_ID', title: '仓库编码', width: 140 ,align:'center',hidden:true},
						    { field: 'PENDING', title: '类型', width: 140 ,align:'center'},
						    { field: 'ARRIVAL_DATE', title: '入库时间', width: 200 ,align:'center'}
		                ];
			if(checkNotEmpty(propickingNo)){
				var tabName = exports.gridFromMoName;
				var dgridOp = $('#'+tabName).datagrid('options');
				if(!dgridOp) return;
				var reqData = {
					IFS: 'WMS_RE00010',
					propickingNo: propickingNo
				}
				var dialogEditorDataGrid = function(tabName,reqData, jsonData) {
					var columnsTab;
					var gridLists = {
						name: tabName,
						dataType: 'json',
						singleSelect:true,
						columns: [columns],
						onEndEdit:function(index,row){}, /**结束编辑模式的操作*/
						onBeforeEdit:function(index,row){/**进入编辑模式的操作*/
					    	 $(this).datagrid('refreshRow', index);
					    },
					    onAfterEdit:function(index,row){ /**编辑模式进入之后的操作*/
					    	 $(this).datagrid('refreshRow', index);   
					    },
				        onCancelEdit:function(index,row){
				            $(this).datagrid('refreshRow', index);
				        }
					    //String pickNo=request.getParameter("templetId");	
					    /*,
				        onClickCell: function (index,field,value) {*//**单击进入编辑模式*//*
				        	var grid = $('#'+tabName),rows = grid.datagrid('getRows'),row = rows[index];
				        	grid.datagrid('clearSelections'),grid.datagrid('selectRow',index);
				        	if(field=="RETURN_QTY"){
				        		fmDataGrid.datagrid('selectRow', index).datagrid('beginEdit', index);
				        		editIndex = index;
				        	}else{
				        		endEditing(fmDataGrid);
				        	}
				        }*/
					}
					initEditorDataGridView(reqData, gridLists);
					$('#'+tabName).datagrid('loadData', jsonData);
				}
				myDataGrid('/iPlant_ajax', tabName, reqData,dialogEditorDataGrid);
	    	}
			else
			{
	    		var fromMoName = $('#'+exports.gridFromMoName).datagrid({
	                url : '',  
	                title : '',  
	                pagination : false,  
	                fit : true,  
	                border : false,  
	                idField : 'id',  
	                striped: false,   
	                rownumbers:true,  
	                fitcolumns:true, 
	                singleSelect:true,  
	                columns : [columns],
				    onEndEdit:function(index,row){}, /**结束编辑模式的操作*/
					onBeforeEdit:function(index,row){/**进入编辑模式的操作*/
				    	 $(this).datagrid('refreshRow', index);
				    },
				    onAfterEdit:function(index,row){ /**编辑模式进入之后的操作*/
				    	 $(this).datagrid('refreshRow', index);
				    },
			        onCancelEdit:function(index,row){
			            $(this).datagrid('refreshRow', index);
			        },
			        onClickCell: function (index,field,value) {/**单击进入编辑模式*/
			        	if(field=="pickQty"){
			        		fmDataGrid.datagrid('selectRow', index).datagrid('beginEdit', index);
			        		editIndex = index;
			        	}else{
			        		endEditing(fmDataGrid);
			        	}
			        }
	            });
	    	}
		};
		function initReturnOrder(){
			var returnOrder=$("#queryReturnOrder").textbox("getValue"),beginDate=$("#queryBeginDate").datebox("getValue"),endDate=$("#queryEndDate").datebox("getValue");
			var dgrid=$('#'+exports.gridName).datagrid('options');
		    if(!dgrid) return;
		    if(returnOrder=="N/A"){
		    	returnOrder = "";
		    };
		    var reqData ={
		    		RETURN_NO: returnOrder,
		    		beginDate: beginDate,
		    		endDate: endDate,
			        pageIndex:dgrid.pageNumber,
	                pageSize:dgrid.pageSize,
			        IFS:'WMS_RE00009'
			    };
			reqGridData('/iPlant_ajax',exports.gridName,reqData);
			$.messager.progress('close');
		};
		function checkDataValid(){
			endEditing(fmDataGrid);
	    	var rows = fmDataGrid.datagrid('getRows'),target = false;
	    	if(rows.length>0){
	    		for(var i=0;i<rows.length;i++){
	    			if(checkNotEmpty(rows[i].RETURN_QTY)){
	    				if(rows[i].RETURN_QTY!="0"){
	    					showMessage.html("");
		    				target = true;
	    				}else{
	    					showMessage.html("<font color=red>提示：退料数量不能为0！</font>");
	    					return false;
	    				}
	    			}else{
	    				showMessage.html("<font color=red>提示：退料数量不能为空！</font>");
	    				return false;
	    			}
	    		}
	    	}else{
	    		showMessage.html("<font color=red>提示：请选择工单退料数据！</font>");
	    		return false;
	    	}
	    	return target;
		};
		saveReturnOrderDialog=function (){
			if(checkDataValid()){
	    		var inserted = fmDataGrid.datagrid('getChanges', "inserted");
	            var updated = fmDataGrid.datagrid('getChanges', "updated");
	            var arrInsert = new Array(),reqList = "",reqData = {},reqPickInfo = {}, propickingNo = "",billType = "",sourceNo = "",storeId = "",status = "WORDERSTATUS-01",materialId = "";
	            if(opType=="add"){
	            	ifs = "WMS_RE00013",susMsg = "新增领料单成功！",errorMsg = "新增领料单失败，请联系管理员！";
	            	var list='';
	            	for(var i=0;i<inserted.length;i++){
	            		list=list+(inserted[i].MATERIAL_ID==null?'':inserted[i].MATERIAL_ID)+'!'
	            				 +(inserted[i].MATERIAL_NAME==null?'':inserted[i].MATERIAL_NAME)+'!'
	            				 +(inserted[i].UNIT_ID==null?'':inserted[i].UNIT_ID)+'!'
	            				 +(inserted[i].UNIT_NAME==null?'':inserted[i].UNIT_NAME)+'!'
	            				 +(inserted[i].RETURN_QTY==null?'':inserted[i].RETURN_QTY)+'!'
	            				 +(inserted[i].SERIAL_NUMBER==null?'':inserted[i].SERIAL_NUMBER)+'!'
	            				 +(inserted[i].STORE_ID==null?'':inserted[i].STORE_ID)+'!'
	            				 +(inserted[i].AREA_ID==null?'':inserted[i].AREA_ID)+'!'
	            				 +(inserted[i].SHELF_ID==null?'':inserted[i].SHELF_ID)+'!'
	            				 +(inserted[i].LOCATION_ID==null?'':inserted[i].LOCATION_ID)+'|';
	            	}
	            	list=list.substring(0,list.length-1); 
	            	var ajacMaterial = {
            			url: '/iPlant_ajax',
	       	            dataType: 'JSON',
	       	            data: {IFS:ifs,orderList:list,sourceNo:inserted[0].SOURCE_NO,returnType:'WEB'},
	       	            successCallBack:function(data){//验证物料信息是否存在
	       	            	console.log(data);
	       	            	commonShowMessage(susMsg),
	       	            	setDataNull(),
	       	            	initReturnOrder();
	       	            },
	       	            errorCallBack:function(){
	       	            	commonShowMessage(errorMsg);
	       	            }
	            	};
	            	iplantAjaxRequest(ajacMaterial);
	            }else if(opType=="modify"){
	            	ifs = "WMS_RE00031",susMsg = "修改领料单成功！",errorMsg = "修改领料单失败，请联系管理员！",reqData = {IFS:ifs};
	            	var list='';
	            	endEditingAll(fmDataGrid);
	            	var modifyData = fmDataGrid.datagrid('getRows');
	            	for(var i=0;i<modifyData.length;i++){
	            		list=list+(modifyData[i].MATERIAL_ID==null?'':modifyData[i].MATERIAL_ID)+'!'
	            				 +(modifyData[i].MATERIAL_NAME==null?'':modifyData[i].MATERIAL_NAME)+'!'
	            				 +(modifyData[i].UNIT_ID==null?'':modifyData[i].UNIT_ID)+'!'
	            				 +(modifyData[i].UNIT_NAME==null?'':modifyData[i].UNIT_NAME)+'!'
	            				 +(modifyData[i].RETURN_QTY==null?'':modifyData[i].RETURN_QTY)+'!'
	            				 +(modifyData[i].SERIAL_NUMBER==null?'':modifyData[i].SERIAL_NUMBER)+'!'
	            				 +(modifyData[i].STORE_ID==null?'':modifyData[i].STORE_ID)+'!'
	            				 +(modifyData[i].AREA_ID==null?'':modifyData[i].AREA_ID)+'!'
	            				 +(modifyData[i].SHELF_ID==null?'':modifyData[i].SHELF_ID)+'!'
	            				 +(modifyData[i].LOCATION_ID==null?'':modifyData[i].LOCATION_ID)+'|';
	            	}
	            	list=list.substring(0,list.length-1); 
	            	var ajacMaterial = {
            			url: '/iPlant_ajax',
	       	            dataType: 'JSON',
	       	            data: {IFS:ifs,orderList:list,returnNo:prodpickingNo,sourceNo:modifyData[0].SOURCE_NO},
	       	            successCallBack:function(data){//验证物料信息是否存在
	       	            	console.log(data);
	       	            	commonShowMessage(susMsg),
	       	            	setDataNull(),
	       	            	initReturnOrder();
	       	            },
	       	            errorCallBack:function(){
	       	            	commonShowMessage(errorMsg);
	       	            }
	            	};
	            	iplantAjaxRequest(ajacMaterial);
	            }
	    	}
		};
		function setDataNull(){
			opType="",
	    	$('#searchoDialog').dialog('close'),
	    	$("#showMessageInfo").html(""),
	    	$.messager.progress('close');
		};
		function setQueryNull(){
			$("#queryReturnOrder").textbox("setValue","");
			$("#queryBeginDate").datebox("setValue","");
			$("#queryEndDate").datebox("setValue","");
		};
		function setQueryMoNull(){
			
		};
		function addReturnOrderInfo(){
			opType="add";
	    	$.messager.progress({title: '请等待',msg: '数据加载中...',text: '正在进行中...'});
			$("#searchoDialog").dialog("open").dialog('setTitle', "退料单新增");
			//$('#queryMaterialType').combobox('setValue',returnTypes[0].id);
			queryMoInfoByCondition();
			initPickGridData("aa");
		};
		function deleteReturnOrderInfo(){
			var isSelectedData = validSelectedData('#'+exports.gridName, 'Delete');
            if (!isSelectedData) {
            	commonShowMessage('提示', '请选择一条数据进行删除');
                return;
            }
            var selectData =$('#'+exports.gridName).datagrid('getSelected');
       	 	$.messager.confirm('确认框', '您确定要删除您所选择的数据?', function (r) {
                if(r==true){
		        	reqData ={ IFS :'WMS_RE00014',returnNo:selectData.RETURN_NO};
		            var ajaxParam = {
		                 url: '/iPlant_ajax',
		                 dataType: 'JSON',
		                 data: reqData,
		                 successCallBack:function(data){
		                	 commonShowMessage('删除成功');
		                	 initReturnOrder();
		                 },
		                 errorCallBack:function(){
		                	 commonShowMessage('删除失败，请联系管理员');
		                 }   
		            };
		            iplantAjaxRequest(ajaxParam);
                }
       	 	})    
		};
		function updateReturnOrderInfo(){
			var checkedItems = $('#' + exports.gridName).datagrid('getSelections'), num = 0;
			$.each(checkedItems, function (index, item) { num++;});
			if (num != 1) {
				commonShowMessage('请选择一条数据进行修改！');
				return false;
			}
			var row = $("#"+exports.gridName).datagrid("getSelected");
	        if (row) {
	        	opType="modify",prodpickingNo = row.RETURN_NO;
	 			$("#searchoDialog").dialog("open").dialog('setTitle', "退料单修改");
	 			queryMoInfoByCondition();
				initPickGridData(prodpickingNo);
	        }
		};
		/*function initCombobox(){
			returnTypes=[];
			returnTypes.push({"id":"all","text":"全部"},{"id":"serialNumber","text":"带条码结存物料"},{"id":"source","text":"库内剩余退料"});
			$("#queryMaterialType").combobox({
				data:returnTypes,
				valueField:"id",
	            textField: "text"
			});
		};*/
		function initButton(){
			var arrInsert = new Array();
			arrInsert.push('MO81020077');
			arrInsert.push('MO7C200025');
			iplantAjaxRequest( {
				url: '/iPlant_ajax',
				
				data: {IFS:'WMS_RE00041',monolist:arrInsert},
				successCallBack: function (data) {
					var rowCollection = createSourceObj(data);
					
				}
			});
			iplantAjaxRequest( {
				url: '/iPlant_ajax',
				data: {IFS:'WMS_RE00009'},
				successCallBack: function (data) {
					var rowCollection = createSourceObj(data);
					var status=rowCollection[0].STATUS;
			        if(status=="WORDERSTATUS-01"){//判断按钮是否可用
	            		$("#btnDelete").css("display","");
	            		$("#btnUpdate").css("display","");
	            		$("#btnPrint").css("display","none");
	            	}else{
	            		$("#btnDelete").css("display","none");
	            		$("#btnUpdate").css("display","none");
	            		$("#btnPrint").css("display","");
	            	}
				}
			});
		};
		var exports={
			gridName:'returnOrder_tab',
		    gridDetailName:'returnOrderDetail_tab',
		    gridMoName:'returnMonoDialog_tab',
		    gridFromMoName:'addReturnOrderDialog_tab',
		    title:'退料单',
		    initReturnOrder:initReturnOrder,
		    setQueryNull:setQueryNull,
		    addReturnOrderInfo:addReturnOrderInfo,
		    deleteReturnOrderInfo:deleteReturnOrderInfo,
		    updateReturnOrderInfo:updateReturnOrderInfo,
		    selectMoDataOk:selectMoDataOk,
		    delMoDataList:delMoDataList,
			saveReturnOrderDialog:saveReturnOrderDialog,
			//initCombobox:initCombobox,
			initButton:initButton,
			queryMoInfoByCondition:queryMoInfoByCondition,
			setDataNull:setDataNull
		};
		return exports;
	};
	$(function(){
		var myFun=returnOrderCreate();
		showMessage = $("#showMessageInfo"),opType="",fmDataGrid = $('#'+myFun.gridFromMoName),editIndex = undefined,returnNo="",prodpickingNo = "";
		dateValid("queryDialogBegin","queryDialogEnd",2);
		myFun.initReturnOrder();
		//myFun.initCombobox();
		myFun.initButton();
		window.setDataNull=myFun.setDataNull;
		$("#btnSearch").click(function(){myFun.initReturnOrder();});
		$("#btnReset").click(function(){myFun.setQueryNull();});
		$("#btnAdd").click(function(){myFun.addReturnOrderInfo();});
		$("#btnDelete").click(function(){myFun.deleteReturnOrderInfo();});
		$("#btnUpdate").click(function(){myFun.updateReturnOrderInfo();});
		$("#btnMoAdd").click(function(){myFun.selectMoDataOk();});
		$("#btnMoDelete").click(function(){myFun.delMoDataList();});
		$("#btnSearchMo").click(function(){myFun.queryMoInfoByCondition();});
		$("#btnResetMo").click(function(){myFun.setQueryMoNull();});
		$(".panel-tool-close").click(function(){myFun.setDataNull();});
  })
})();


