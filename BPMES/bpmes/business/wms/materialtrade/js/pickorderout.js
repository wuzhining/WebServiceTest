(function () {
    function pickOrderOut() {
      pageConfig={
          gridName:'propickingOut_tab',
          gridInfoName:'propickingOutInfo_tab',
          gridMoName:'moDataList_tab',
          gridFromMoName:'pickOrderFromMo_tab',
          title:'领料出库单',
      },
      initGridData=function(){
    	  
    	  var dgrid=$('#'+pageConfig.gridName).datagrid('options');
		  if(!dgrid) return;
		  var reqData = {
				IFS: 'PO000001',
				billType: "WOUTSTORE-01",
				qStatus: 'WORDERSTATUS-01',
				pageIndex:dgrid.pageNumber,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'propickingOut_tab', reqData);
//    	  selectStatus();
      },
      bindGridData = function (reqData,jsonData) {
    	  var grid = {
    		  name: pageConfig.gridName,
              dataType: 'json',
              singleSelect:false,
              columns:[[
                    {field : "CZ",width : 10,checkbox : true},    
                    /*{ field: 'APPLY', title: '审核', width: 50 ,align:'center',formatter:function(value){if(value=='WORDERSTATUS-01'){ return "<img href='javascript:void(0)' style='cursor:pointer;' class='easyui-linkbutton' src='../../../common/RootImages/apply.png'/>"}else{ return "<img href='javascript:void(0)' class='easyui-linkbutton' src='../../../common/RootImages/apply_over.png'/>"}}},*/
					{ field: 'PRODPICKING_NO', title: '领料单号', width: 150 ,align:'center'},
			   		{ field: 'SOURCE_NO', title: '制令单号', width: 150 ,align:'center'},
			   		{ field: 'BILL_TYPE_NM', title: '单据类别', width: 80 ,align:'center'},
			   		{ field: 'STATUS_NM', title: '状态', width: 120 ,align:'center'},
			   		{ field: 'STORE_ID', title: '所属仓库', width: 120 ,align:'center',hidden:true},
			   		{ field: 'STORE_NAME', title: '所属仓库', width: 120 ,align:'center'},
			   		{ field: 'CRT_DT', title: '制单时间', width: 200 ,align:'center'},
			   		{ field: 'CRT_NM', title: '制单人', width: 100 ,align:'center'},
			   		{ field: 'ADT_DT', title: '领料时间', width: 200 ,align:'center'},
			   		{ field: 'ADT_NM', title: '领料人', width: 100 ,align:'center'},
			   		{ field: 'STATUS', title: '状态编码', width: 0 ,align:'center',hidden:true},
			   		{ field: 'CRT_ID', title: '制单人ID', width: 0 ,align:'center',hidden:true},
			   		{ field: 'ADT_ID', title: '领料人ID', width: 0 ,align:'center',hidden:true}
	            ]],
	            onDblClickRow: function(index,row){
	            	if(row.STATUS=="WORDERSTATUS-01"){
	            		modifyDataMo();
	            	}
	            },
	            onClickRow: function(index,row){
	            	 if(row.STATUS=="WORDERSTATUS-01"){
	            		$("#btnDelete").css("display","");
	            		$("#btnUpdate").css("display","");
	            		//$("#btnPrint").css("display","none");
	            	}else{//判断按钮是否可用
	            		$("#btnDelete").css("display","none");
	            		$("#btnUpdate").css("display","none");
	            		//$("#btnPrint").css("display","");
	            	}
	            	initDataPropicking(row.PRODPICKING_NO);
	            	$('#prodpickingNoShow').html(row.PRODPICKING_NO);
			    },
			    onClickCell : function (index,field,value) {/**单击进入编辑模式*/
		        	var grid = $('#'+pageConfig.gridName),rows = grid.datagrid('getRows'),row = rows[index];
		        	grid.datagrid('clearSelections'),grid.datagrid('selectRow',index);
	        		/*if(field=='APPLY'){
	        			if(row.STATUS=="WORDERSTATUS-01"){
	        				$.messager.confirm('确认框','您确定要审核通过该领料单?',function(r){
	        					if (r == true) {
	        						applyDataPo(row);
	        					}
	        				});
	        			}
		        	}*/
		        }
    	  	}
        	initGridView(reqData,grid);
        	$('#'+pageConfig.gridName).datagrid({"onLoadSuccess":function(data){
        		var prodpickingNo = "#";
			    if(data.rows.length>0){
	        		$(this).datagrid('selectRow',0);
	        		if(checkNotEmpty(data.rows[0].PRODPICKING_NO)){
	        			prodpickingNo = data.rows[0].PRODPICKING_NO;
	        		}
			    }
			    initDataPropicking(prodpickingNo);
			    $('#prodpickingNoShow').html(prodpickingNo);
			}}).datagrid('loadData', jsonData);
		},
	    setDataNull = function () {
			opType="",
	    	$('#searchoDialog').dialog('close');
	    	$('#qMoNo').textbox('setValue',"");
	    	//$('#qMoStore').combobox('setValue',"");
	    	$('#qMoDtBegin').datebox('setValue',"");
	    	$('#qMoDtEnd').datebox('setValue',"");
	    	$("#showMessageInfo").html("");
	    	console.log(fmDataGrid);
	    	var item = fmDataGrid.datagrid('getRows'); 
	    	clearDataGrid(item);
	    	//fmDataGrid.datagrid("loadData", { total: 0, rows: [] });
	    },
	    setQueryNull = function () {
	    	$('#qProdpickingNo').textbox('setValue',""),
	    	$('#qStore').combobox('setValue',"N/A"),
	    	$('#qStatus').combobox('setValue',"WORDERSTATUS-01"),
	    	$('#qPeople').textbox('setValue',""),
	    	$('#qProDtBegin').datebox('setValue',""),
	    	$('#qProDtEnd').datebox('setValue',"");
	    },
	    setQueryMoNull = function () {
	    	$('#qMoNo').textbox('setValue',""),
	    	//$('#qMoStore').combobox('setValue',"N/A"),
	    	$('#qMaterialId').textbox('setValue',""),
	    	$('#qMoDtBegin').datebox('setValue',""),
	    	$('#qMoDtEnd').datebox('setValue',""),
	    	$("#showMessageInfo").html("");
	    },
	    queryDataByCondition = function(){
		    var dgrid=$('#'+pageConfig.gridName).datagrid('options');
		    if(!dgrid) return;
		    var qProdpickingNo = $('#qProdpickingNo').textbox('getValue');
		    var qPeople = $('#qPeople').textbox('getValue');
		    var qStore = $('#qStore').combobox('getValue');
		    var qStatus = $('#qStatus').combobox('getValue');
		    var qProDtBegin =$('#qProDtBegin').datebox('getValue');
		    var qProDtEnd =$('#qProDtEnd').datebox('getValue');
		    
		    if(qStore=="N/A"){qStore = "";}
		    if(qStatus=="N/A"){qStatus = "";}
		    var reqData ={
		    	qProdpickingNo: qProdpickingNo,
		    	billType: "WOUTSTORE-01",
		    	qStore: qStore,
		    	qPeople: qPeople,
		    	qStatus: qStatus,
		    	qProDtBegin: qProDtBegin,
		        qProDtEnd: qProDtEnd,
		        pageIndex:dgrid.pageNumber,
                pageSize:dgrid.pageSize,
		        IFS:'PO000001'
		    };
		    reqGridData('/iPlant_ajax',pageConfig.gridName,reqData);
		    $.messager.progress('close');
	    },
	    initDataPropicking = function(prodpickingNo){
			var tabName = pageConfig.gridInfoName;
			var dgridOp = $('#'+tabName).datagrid('options');
			if(!dgridOp) return;
			if(!checkNotEmpty(prodpickingNo)){ prodpickingNo = "N/O"; }
			var reqData = {
				IFS: 'PO000002',
				prodpickingNo: prodpickingNo,
				pageIndex: dgridOp.pageNumber,
				pageSize: dgridOp.pageSize	
			}
			dialogDataGrid('/iPlant_ajax', tabName, reqData);
			dialogEditorDataGrid = function(tabName,reqData, jsonData) {
				var columnsTab=[
				    { field: 'MATERIAL_ID', title: '物料编码', width: 200 ,align:'center'},
				    { field: 'MATERIAL_NAME', title: '物料名称', width: 200 ,align:'center'},
				    { field: 'VERSION_V', title: '版本号', width: 200 ,align:'center'},
				    { field: 'SUPPLIER_ID', title: '供应商编码', width: 200 ,align:'center'},
				    { field: 'SUPPLIER_NAME', title: '供应商名称', width: 200 ,align:'center'},
				    { field: 'PRODPICKING_QTY', title: '领料数量', width: 100 ,align:'center'},
				    { field: 'PICKED_QTY', title: '已领数量', width: 100 ,align:'center'},
				    { field: 'UNIT_NAME', title: '单位', width: 200 ,align:'center'},
				    { field: 'LOT_NO', title: '批次号', width: 100 ,align:'center'},
				    { field: 'ITM', title: '项次', width: 80 ,align:'center'},
				    { field: 'ARRIVAL_DATE', title: '来料时间', width: 100 ,align:'center'},
				    { field: 'KITTING_STORE', title: '线边仓', width: 100 ,align:'center'},
				    { field: 'KITTING_QTY', title: '线边仓数量', width: 100 ,align:'center'},
				    { field: 'KITTING_STATUS', title: '线边仓状态', width: 100 ,align:'center'},
				    { field: 'UNIT_ID', title: '单位编码', width: 0 ,align:'center',hidden:true}
				];
				var gridLists = {
					name: tabName,
					dataType: 'json',
					columns: [columnsTab],
					onClickCell : function (index,field,value) {/**单击进入编辑模式*/
			        	var grid = $('#'+tabName),rows = grid.datagrid('getRows'),row = rows[index];
			        	grid.datagrid('clearSelections'),grid.datagrid('selectRow',index);
			        }
				}
				initEditorDataGridView(reqData, gridLists);
				$('#'+tabName).datagrid('loadData', jsonData);
			}
	    },
	    addDataPo = function(){
	    	opType="add";
			$("#searchoDialog").dialog("open").dialog('setTitle', "领料单新增");
			queryMoDataByCondition();
			initPickGridData("");
	    },
	    modifyDataMo = function(){
			var checkedItems = $('#' + pageConfig.gridName).datagrid('getSelections'), num = 0,prodpickingNo = "";
			$.each(checkedItems, function (index, item) { num++;});
			if (num != 1) {
				commonShowMessage('请选择一条数据进行修改！');
				return false;
			}
			var row = $("#"+pageConfig.gridName).datagrid("getSelected");
	        if (row) {
	        	opType="modify",prodpickingNo = row.PRODPICKING_NO,storeId = row.STORE_ID;
	 			$("#searchoDialog").dialog("open").dialog('setTitle', "领料单修改");
	 			queryMoDataByCondition();
				initPickGridData(prodpickingNo);
				fmDataGrid.storeId = storeId;
	        }
	    },
	    queryMoDataByCondition = function(){
		    var tabName = pageConfig.gridMoName,dgrid = $('#'+tabName).datagrid('options');
		    if(!dgrid) return;
		    var qMoNo = $('#qMoNo').textbox('getValue');
		    var qMaterialId = $('#qMaterialId').textbox('getValue');
		    //var qMoStore = $('#qMoStore').combobox('getValue');
		    var qMoDtBegin =$('#qMoDtBegin').datebox('getValue');
		    var qMoDtEnd =$('#qMoDtEnd').datebox('getValue');
		   // if(qMoStore=="N/A"){ qMoStore="";}
		    var reqData ={
		    	url: MES_URL,
		    	qMoNo: qMoNo,
		    	billType: "WOUTSTORE-01",
		    	//qMoStore: qMoStore,
		    	qMaterialId: qMaterialId,
		    	qMoDtBegin: qMoDtBegin,
		    	qMoDtEnd: qMoDtEnd,
		        pageIndex:dgrid.pageNumber,
		        pageSize:dgrid.pageSize,
		        IFS:'W0000044',
		        reqType:"APP"
		    };
		    dialogWarehouseDataGrid = function(tabName,reqData, jsonData) {
				var columnsTab;
				columnsTab=[
					{field : "CZ",width : 10,checkbox : true},
				    { field: 'MO_NO', title: '作业指示号', width: 140 ,align:'center'},
				    { field: 'WO_NO', title: '工单号', width: 140 ,align:'center'},
				    { field: 'MATERIAL_ID', title: '物料编码', width: 140 ,align:'center'},
				    { field: 'MATERIAL_NAME', title: '物料名称', width: 140 ,align:'center'},
				    { field: 'VERSION_V', title: '版本号', width: 140 ,align:'center'},
				    { field: 'PRO_QTY', title: '需生产数量', width: 90 ,align:'center'},
				    //{ field: 'FIN_QTY', title: '已缴库数量', width: 90 ,align:'center'},
				    //{ field: 'YQTY', title: '已领数量', width: 90 ,align:'center'},
				    //{ field: 'PICK_QTY', title: '应领数量', width: 80 ,align:'center'},
				    { field: 'T_STORE_ID', title: '领料仓编码', width: 100 ,align:'center'},
				    { field: 'MO_DATE', title: '制令日期', width: 120 ,align:'center',formatter: function (value,row,index) {return '<span title='+value+'>'+value.substring(0,10)+'</span>' }},
				    //{ field: 'P_STORE_ID', title: '成品入库仓', width: 140 ,align:'center'},
				    //{ field: 'BOM_NO', title: 'BOM编码', width: 140 ,align:'center'},
				    //{ field: 'Warehouse_NO', title: '健大代号', width: 140 ,align:'center'},
				    //{ field: 'CUSTOM_NO', title: '客户代号', width: 140 ,align:'center'},
				    //{ field: 'MODEL_NO', title: '模具代号', width: 140 ,align:'center'},
				    //{ field: 'DEPT_CD', title: '部门', width: 100 ,align:'center'},
				    { field: 'CRT_ID', title: '开单人', width: 100 ,align:'center'}
				    //{ field: 'ITM', title: '项次', width: 100 ,align:'center'},
				    //{ field: 'BILL_TYPE', title: '单据类型', width: 80 ,align:'center'}
				];
				var gridLists = {
					name: tabName,
					dataType: 'jsonp',
					columns: [columnsTab],
					onDblClickRow: function(index,row){
						var grid = $('#'+tabName);
						grid.datagrid('clearSelections'),grid.datagrid('selectRow',index);
						selectMoDataOk();
		            }
				}
				initWarehouseDataGridView(reqData, gridLists);
				$('#'+tabName).datagrid('loadData', jsonData);
			}
		    myDataGrid(MES_URL, tabName, reqData,dialogWarehouseDataGrid);
	    },
	    initPickGridData = function(prodpickingNo){
	    	var columns = [
				{ field: 'SOURCE_NO', title: '制令单号', width: 140 ,align:'center'},
				{ field: 'WO_NO', title: '工单号', width: 140 ,align:'center'},
				{ field: 'MATERIAL_ID', title: '物料代号', width: 140 ,align:'center'},
				{ field: 'MATERIAL_NAME', title: '物料名称', width: 140 ,align:'center'},
				{ field: 'VERSION_V', title: '版本号', width: 140 ,align:'center'},
				{ field: 'PRO_QTY', title: '领料数量<font color=red>*</font>', width: 80 ,align:'center',editor:{type:'validatebox',options:{required:true,validType:['numberFloat']}}},
				{ field: 'T_STORE_ID', title: '领料仓代号', width: 180 ,align:'center',editor:{type:'combobox',options:{valueField:'value',textField:'text',data:storeList,required:true,editable:false}}},
				//{ field: 'PRO_QTY', title: '需生产数量', width: 0 ,align:'center',hidden:true},
				//{ field: 'YQTY', title: '已领数量', width: 0 ,align:'center',hidden:true},
				//{ field: 'PICKED_QTY', title: '应领数量', width: 0 ,align:'center',hidden:true},
				//{ field: 'YQTY', title: '已领数量', width: 0 ,align:'center',hidden:true},
				//{ field: 'FIN_QTY', title: '已缴库数量', width: 0 ,align:'center',hidden:true},
				{ field: 'MO_DATE', title: '制令日期', width: 0 ,align:'center',formatter: function (value,row,index) {return '<span title='+formatDate(value)+'>'+formatDate(value)+'</span>' },hidden:true},
				//{ field: 'P_STORE_ID', title: '成品入库仓', width: 0 ,align:'center',hidden:true},
				//{ field: 'BOM_NO', title: 'BOM编码', width: 140 ,align:'center'},
				//{ field: 'Warehouse_NO', title: '健大代号', width: 0 ,align:'center',hidden:true},
				//{ field: 'CUSTOM_NO', title: '客户代号', width: 0 ,align:'center',hidden:true},
				//{ field: 'MODEL_NO', title: '模具代号', width: 0 ,align:'center',hidden:true},
				//{ field: 'DEPT_CD', title: '部门', width: 0 ,align:'center',hidden:true},
				{ field: 'CRT_ID', title: '开单人', width: 0 ,align:'center',hidden:true}
				//{ field: 'ITM', title: '项次', width: 0 ,align:'center',hidden:true},
				//{ field: 'BILL_TYPE', title: '单据类型', width: 0 ,align:'center'},
				//{ field: 'PRODPICKING_NO', title: '领料单号', width: 0 ,align:'center',hidden:true}
            ];
	    	var tabName = pageConfig.gridFromMoName;
	    	if(checkNotEmpty(prodpickingNo)){
				var dgridOp = $('#'+tabName).datagrid('options');
				if(!dgridOp) return;
				var reqData = {
					IFS: 'PO000010',
					prodpickingNo: prodpickingNo
				}
				dialogDataGrid('/iPlant_ajax', tabName, reqData);
				dialogEditorDataGrid = function(tabName,reqData, jsonData) {
					var gridLists = {
						name: tabName,
						pagination : false,
						dataType: 'json',
						columns: [columns],
						onEndEdit:function(index,row){ /**结束编辑模式的操作*/
							var ed = $(this).datagrid('getEditor', {index: index,field: 'T_STORE_ID'});
					    	 row.T_STORE_ID = $(ed.target).combobox('getValue');
						},
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
				        	var grid = $('#'+tabName),rows = grid.datagrid('getRows'),row = rows[index];
				        	grid.datagrid('clearSelections'),grid.datagrid('selectRow',index);
				        	if(field=="PRO_QTY" || field=="T_STORE_ID" ){
				        		fmDataGrid.datagrid('selectRow', index).datagrid('beginEdit', index);
				        		editIndex = index;
				        	}else{
				        		endEditing(fmDataGrid);
				        	}
				        }
					}
					initEditorDataGridView(reqData, gridLists);
					console.log(jsonData);
					fmDataGrid.prodpickingNo = prodpickingNo;
					fmDataGrid.datagrid('loadData', jsonData);
				}
	    	}else{
	    		var fromMoName = fmDataGrid.datagrid({
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
	                onEndEdit:function(index,row){ /**结束编辑模式的操作*/
						var ed = $(this).datagrid('getEditor', {index: index,field: 'T_STORE_ID'});
				    	 row.T_STORE_ID = $(ed.target).combobox('getValue');
					},
					onBeforeEdit:function(index,row){ $(this).datagrid('refreshRow', index);},
				    onAfterEdit:function(index,row){ $(this).datagrid('refreshRow', index);},
			        onCancelEdit:function(index,row){ $(this).datagrid('refreshRow', index);},
			        onClickCell: function (index,field,value) {/**单击进入编辑模式*/
			        	var grid = $('#'+tabName),rows = grid.datagrid('getRows'),row = rows[index];
			        	grid.datagrid('clearSelections'),grid.datagrid('selectRow',index);
			        	if(field=="PRO_QTY" || field=="T_STORE_ID"){
			        		fmDataGrid.datagrid('selectRow', index).datagrid('beginEdit', index);
			        		editIndex = index;
			        	}else{
			        		endEditing(fmDataGrid);
			        	}
			        }
	            });
	    	}
	    },
	    formatDate = function(d){
	    	var str = "";
	    	if(checkNotEmpty(d)){
	    		str = d.substring(0,10);
	    	}
	    	return str;
	    },
	    clearDataGrid = function(item){  
    	   //获取当前页的记录数  
		   for (var i = item.length - 1; i >= 0; i--) {    
		       var index = fmDataGrid.datagrid('getRowIndex', item[i]);    
		       fmDataGrid.datagrid('deleteRow', index);    
		   }    
	    },  
	    selectMoDataOk = function(){
	    	var selected = $('#'+pageConfig.gridMoName).datagrid("getSelections"),rows = fmDataGrid.datagrid('getRows');
	    	if(selected.length>0){
	    		for(var i=0;i<selected.length;i++){
	    			if(rows.length>0){
    					if(compareSelectDataGrid(selected[i],rows)){
    						if(sameMoPickOrder(selected[i],rows)){
    							if(samePickStore(selected[i],rows)){
    								setDataGridValue(selected[i],i);
    							}else{
    								showMessage.html("<font color=red>提示：请选择同一领料仓库信息！</font>");
        				    		return false;
    							}
    						}else{
    							showMessage.html("<font color=red>提示：请选择同一工单物料信息！</font>");
    				    		return false;
    						}
    					}
	    			}else{
	    				setDataGridValue(selected[i],i);
	    			}
		    	}
	    		showMessage.html("");
	    	}else{
	    		showMessage.html("<font color=red>提示：请选择工单领料信息！</font>");
	    		return false;
	    	}
	    },
	    setDataGridValue = function(data,num){
	    	var prodpickingNo = "";
	    	if(checkNotEmpty(fmDataGrid.prodpickingNo)){
	    		prodpickingNo = fmDataGrid.prodpickingNo;
	    	}
	    	if(checkNotEmpty(data.T_STORE_ID)){
	    		fmDataGrid.datagrid
	    		("insertRow",
	    		{row: 
	    		{index: num,SOURCE_NO:data.MO_NO,WO_NO:data.WO_NO,PRO_QTY:data.PRO_QTY,MATERIAL_ID:data.MATERIAL_ID,MATERIAL_NAME:data.MATERIAL_NAME,MO_DATE:data.MO_DATE,T_STORE_ID:data.T_STORE_ID,VERSION_V:data.VERSION_V
	    			
	    			//SOURCE_NO:data.MO_NO,PRO_QTY:data.PRO_QTY,FIN_QTY:data.FIN_QTY,PICK_QTY:0,PICKED_QTY:data.PICK_QTY,BILL_TYPE:data.BILL_TYPE,BOM_NO:data.BOM_NO,MATERIAL_ID:data.MATERIAL_ID,MATERIAL_NAME:data.MATERIAL_NAME,MO_DATE:data.MO_DATE,P_STORE_ID:data.P_STORE_ID,Warehouse_NO:data.Warehouse_NO,CUSTOM_NO:data.CUSTOM_NO,MODEL_NO:data.MODEL_NO,DEPT_CD:data.DEPT_CD,CRT_ID:data.CRT_ID,ITM:data.ITM,T_STORE_ID:data.T_STORE_ID,PRODPICKING_NO:prodpickingNo,PRO_QTY:data.PRO_QTY,YQTY:data.YQTY
	    			}});
		    	editIndex = num;
		    	
	    	}else{
	    		showMessage.html("<font color=red>提示：领料仓库不能为空！</font>");
				return false;
	    	}
	    },
	    compareSelectDataGrid = function(selected,rows){
	    	var target = true;
	    	if(rows.length>0){
	    		for(var i=0;i<rows.length;i++){
	    			if(selected.MO_NO==rows[i].SOURCE_NO && selected.MATERIAL_ID==rows[i].MATERIAL_ID){
	    				target = false;
	    	    	}
		    	}
	    	}
	    	return target;
	    },
	    sameMoPickOrder = function(selected,rows){
	    	var target = true;
	    	if(rows.length>0){
	    		for(var i=0;i<rows.length;i++){
	    			if(selected.MO_NO != rows[i].SOURCE_NO){
	    				target = false;
	    	    	}
		    	}
	    	}
	    	return target;
	    },
	    samePickStore = function(selected,rows){
	    	var target = true;
	    	if(rows.length>0){
	    		for(var i=0;i<rows.length;i++){
	    			if(selected.T_STORE_ID != rows[i].T_STORE_ID){
	    				target = false;
	    	    	}
		    	}
	    	}
	    	return target;
	    },
	    delMoDataList = function(){
	    	var rows = fmDataGrid.datagrid('getRows'),row = fmDataGrid.datagrid('getSelected'),rowIndex = fmDataGrid.datagrid('getRowIndex', row);
	    	fmDataGrid.datagrid('deleteRow',rowIndex);
	    },
	    compareSelectStore = function(rows){
	    	var target = true;
	    	if(rows.length>1){
	    		for(var i=0;i<rows.length;i++){
	    			console.log(rows[i].T_STORE_ID);
	    			if(rows[0].T_STORE_ID!=rows[i].T_STORE_ID){
	    				target = false;
	    	    	}
		    	}
	    	}
	    	return target;
	    },
	    checkDataValid = function(){
	    	endEditing(fmDataGrid);
	    	var rows = fmDataGrid.datagrid('getRows'),target = false,number=0;
	    	if(rows.length>0){
	    		for(var i=0;i<rows.length;i++){
	    	/*		if(checkNotEmpty(rows[i].PICK_QTY)){
	    				if(rows[i].pickQty!="0"){
	    					number = rows[i].PICKED_QTY-rows[i].YQTY;
	    					if(rows[i].PICK_QTY<=number){
	    						showMessage.html("");
			    				target = true;
	    					}else{
	    						showMessage.html("<font color=red>提示：领料数量不能大于应领数量！</font>");
		    					return false;
	    					}
	    				}else{
	    					showMessage.html("<font color=red>提示：领料数量不能为0！</font>");
	    					return false;
	    				}
	    			}else{
	    				showMessage.html("<font color=red>提示：领料数量不能为空！</font>");
	    				return false;
	    			}*/
	    		}
	    		if(rows.length>1){
	    			if(compareSelectStore(rows)){
	    				showMessage.html("");
	    				target = true;
	    			}else{
    					showMessage.html("<font color=red>提示：领料仓库要为同一仓库！</font>");
    					return false;
    				}
	    		}
	    	}else{
	    		showMessage.html("<font color=red>提示：请选择工单领料数据！</font>");
	    		return false;
	    	}
	    	return target;
	    },
	    checkMaterialInfo = function(materialId){
	    	var target = false;
	    	if(checkNotEmpty(materialId)){
				var ajacMaterial = {
	    			url: '/iPlant_ajax',
	   	            dataType: 'JSON',
	   	            data: {IFS:"PO000009",materialId:materialId},
	   	            successCallBack:function(data){//验证物料信息是否存在
	   	            	console.log(data);
	   	            	var rs = data.RESPONSE[0].RESPONSE_DATA;
	   	            	if(rs.length>0){
	   	            		target = true;
	   	            	}else{
	   	            		showMessage.html("<font color=red>提示：物料编码："+materialId+" 物料信息没有同步！</font>");
	   	            		target = false;
	   	            	}
	   	            	return target;
	   	            },
	   	            errorCallBack:function(){
	   	            	commonShowMessage("物料信息数据有问题，请联系管理员！");
	   	            }
	        	};
	        	iplantAjaxRequest(ajacMaterial);
			}else{
				return target;
			}
	    },
	    checkMaterialInfoList = function(material){
	    	if(checkNotEmpty(material)){
	    		for(var i=0;i<material.length;i++){
            		if(!checkMaterialInfo(material[i].MATERIAL_ID)){
            			return false;
            		}
            	}
	    	}
	    	return true;
	    },
	    savePickOrderOut = function(){//
	    	if(checkDataValid()){
	    		//获取到数据进行保存   billType = WOUTSTORE-01
	    		var inserted = fmDataGrid.datagrid('getChanges', "inserted");
	            var updated = fmDataGrid.datagrid('getChanges', "updated");
	            var deleted = fmDataGrid.datagrid('getChanges', "deleted");
	            var arrInsert = new Array(),arrUpdate = new Array(),arrDelete = new Array(),reqList = "",reqData = {},reqPickInfo = {}, prodpickingNo = "",billType = "",sourceNo = "",storeId = "",status = "WORDERSTATUS-01",materialIds = "",VERSION_V="",storeId = "",modifyStore = false;
	            if(opType=="add"){
	            	ifs = "PO000003",susMsg = "新增领料单成功！",errorMsg = "新增领料单失败，请联系管理员！";
	            	if(inserted.length>0){
	            		billType = "WOUTSTORE-01",sourceNo = inserted[0].SOURCE_NO,VERSION_V=inserted[0].VERSION_V,WONO=inserted[0].WO_NO,storeId = inserted[0].T_STORE_ID;
	            		for(var i=0;i<inserted.length;i++){
	                		arrInsert.push(inserted[i]);
	                		if(i==0){
	                			materialIds = inserted[i].MATERIAL_ID
	                		}else{
	                			materialIds = materialIds +","+inserted[i].MATERIAL_ID;
	                		}
	                	}
	            	}
	            	var ajacMaterial = {
    	    			url: '/iPlant_ajax',
    	   	            dataType: 'JSON',
    	   	            data: {IFS:"PO000009",materialIds:materialIds},
    	   	            successCallBack:function(data){//验证物料信息是否存在
    	   	            	var rs = data.RESPONSE[0].RESPONSE_DATA[0];
    	   	            	if(rs.STATUS=="NOEXIST"){
    	   	            		showMessage.html("<font color=red>提示：物料编码："+rs.MESSAGE+" 物料信息没有同步！</font>");
    	   	            		return false;
    	   	            	}else if(rs.STATUS=="EXIST"){
    	   	            		var ajaxPick = {//获取领料单编号
	          	       	             url: '/iPlant_ajax',
	          	       	             dataType: 'JSON',
	          	       	             data: {IFS:"PO000000"},
	          	       	             successCallBack:function(data){
	          	       	            	prodpickingNo = data.RESPONSE[0].RESPONSE_DATA[0].PRODPICKINGNO;
	          	       	            	reqData = {IFS:ifs,prodpickingNo:prodpickingNo,billType:billType,sourceNo:sourceNo,WONO:WONO,storeId:storeId,status:status};
	          	       	            	reqPickInfo = {IFS:"PO000004",prodpickingNo:prodpickingNo,list:arrInsert};
	          	       	            	savePropickingData(reqData,reqPickInfo,susMsg,errorMsg);
	          	       	             },
	          	       	             errorCallBack:function(){
	          	       	            	 commonShowMessage("请求错误，请联系管理员！");
	          	       	             }
	          	       	        };
    	   	            		iplantAjaxRequest(ajaxPick);
    	   	            	}else {
    	   	            		showMessage.html("<font color=red>提示：物料验证错误，请联系管理员！</font>");
    	   	            		return false;
    	   	            	}
    	   	            },
    	   	            errorCallBack:function(){
    	   	            	commonShowMessage("物料信息数据有问题，请联系管理员！");
    	   	            }
    	        	};
    	        	iplantAjaxRequest(ajacMaterial);
	            }else if(opType=="modify"){
	            	prodpickingNo = fmDataGrid.prodpickingNo,storeId = fmDataGrid.storeId;
	            	console.log("prodpickingNo="+prodpickingNo);
	            	if(inserted.length>0){
	            		for(var i=0;i<inserted.length;i++){
	                		arrInsert.push(inserted[i]);
	                		if(i==0){
	                			materialIds = inserted[i].MATERIAL_ID;
	                			if(storeId!=inserted[i].MATERIAL_ID){
	                				storeId = inserted[i].T_STORE_ID;
	                				modifyStore = true;
	                			}
	                		}else{
	                			materialIds = materialIds +","+inserted[i].MATERIAL_ID;
	                		}
	                	}
	            		susMsg = "新增领料单明细成功！",errorMsg = "新增领料单明细失败，请联系管理员！";
	            		var ajacMaterial = {
        	    			url: '/iPlant_ajax',
        	   	            dataType: 'JSON',
        	   	            data: {IFS:"PO000009",materialIds:materialIds},
        	   	            successCallBack:function(data){//验证物料信息是否存在
        	   	            	var rs = data.RESPONSE[0].RESPONSE_DATA[0];
        	   	            	if(rs.STATUS=="NOEXIST"){
        	   	            		showMessage.html("<font color=red>提示：物料编码："+rs.MESSAGE+" 物料信息没有同步！</font>");
        	   	            		return false;
        	   	            	}else if(rs.STATUS=="EXIST"){
          	       	            	reqPickInfo = {IFS:"PO000004",prodpickingNo:prodpickingNo,list:arrInsert};
          	       	            	savePropickingInfoData(reqPickInfo,susMsg,errorMsg);
        	   	            	}else {
        	   	            		showMessage.html("<font color=red>提示：物料验证错误，请联系管理员！</font>");
        	   	            		return false;
        	   	            	}
        	   	            },
        	   	            errorCallBack:function(){
        	   	            	commonShowMessage("物料信息数据有问题，请联系管理员！");
        	   	            }
        	        	};
        	        	iplantAjaxRequest(ajacMaterial);
        	        	if(modifyStore){
    	            		var ajacMaterial = {
            	    			url: '/iPlant_ajax',
            	   	            dataType: 'JSON',
            	   	            data: {IFS:"PO000016",storeId:storeId,prodpickingNo:prodpickingNo},
            	   	            successCallBack:function(data){
            	   	            	commonShowMessage(susMsg);
            	   	            },
            	   	            errorCallBack:function(){
            	   	            	commonShowMessage(errorMsg);
            	   	            }
            	        	};
            	        	iplantAjaxRequest(ajacMaterial);
    	            	}
	            	}
	            	if(updated.length>0){
	            		for(var i=0;i<updated.length;i++){
	            			arrUpdate.push(updated[i]);
	                	}
	            		susMsg = "修改领料单成功！",errorMsg = "修改领料单失败，请联系管理员！";
	            		reqPickInfo = {IFS:"PO000006",list:arrUpdate};
	            		modifyPropickingInfo(reqPickInfo,susMsg,errorMsg);
	            	}
	            	if(deleted.length>0){
	            		for(var i=0;i<deleted.length;i++){
	            			arrDelete.push(deleted[i]);
	                	}
	            		susMsg = "删除领料单成功！",errorMsg = "删除领料单失败，请联系管理员！";
	            		reqPickInfo = {IFS:"PO000007",list:arrDelete};
	            		deletePropickingInfo(reqPickInfo,susMsg,errorMsg);
	            	}
	            }
	    	}
	    },
	    savePropickingData = function(reqData,reqPickInfo,susMsg,errorMsg){
	    	 var ajaxParam = {//保存领料单信息
	    		 url: '/iPlant_ajax',
	    		 dataType: 'JSON',
	    		 data: reqData,
	    		 successCallBack:function(data){
	    			 var ajaxPickInfo = {//保存领料单明细信息
    		    		 url: '/iPlant_ajax',
    		    		 dataType: 'JSON',
    		    		 data: reqPickInfo,
    		    		 successCallBack:function(data){//保存领料但信息成功之后保存指令单信息
    		    			 reqPickInfo.IFS = "PO000005";
    		    			 var ajaxMo = {
		    		    		 url: '/iPlant_ajax',
		    		    		 dataType: 'JSON',
		    		    		 data: reqPickInfo,
		    		    		 successCallBack:function(data){//保存制令单信息
		    		    			 commonShowMessage(susMsg),
		    		    			 setDataNull(),
		    		    			 initGridData();
		    		    		 },
		    		    		 errorCallBack:function(){
		    		    			 commonShowMessage("新增制令单信息失败，请联系管理员！");
		    		    		 }
		    		    	 };
		    		    	 iplantAjaxRequest(ajaxMo);
    		    		 },
    		    		 errorCallBack:function(){
    		    			 commonShowMessage("新增领料单明细失败，请联系管理员！");
    		    		 }
    		    	 };
    		    	 iplantAjaxRequest(ajaxPickInfo);
	    		 },
	    		 errorCallBack:function(){
	    			 commonShowMessage(errorMsg);
	    		 }
	    	 };
	    	 iplantAjaxRequest(ajaxParam);
	    },
	    savePropickingInfoData = function(reqPickInfo,susMsg,errorMsg){
			 var ajaxPickInfo = {//保存领料单明细信息
	    		 url: '/iPlant_ajax',
	    		 dataType: 'JSON',
	    		 data: reqPickInfo,
	    		 successCallBack:function(data){//保存领料但信息成功之后保存指令单信息
	    			 reqPickInfo.IFS = "PO000005";
	    			 var ajaxMo = {
	   		    		 url: '/iPlant_ajax',
	   		    		 dataType: 'JSON',
	   		    		 data: reqPickInfo,
	   		    		 successCallBack:function(data){//保存制令单信息
	   		    			 commonShowMessage(susMsg),
	   		    			 setDataNull(),
	   		    			 initGridData();
	   		    		 },
	   		    		 errorCallBack:function(){
	   		    			 commonShowMessage("新增制令单信息失败，请联系管理员！");
	   		    		 }
	   		    	 };
	   		    	 iplantAjaxRequest(ajaxMo);
	    		 },
	    		 errorCallBack:function(){
	    			 commonShowMessage("新增领料单明细失败，请联系管理员！");
	    		 }
	    	 };
	    	 iplantAjaxRequest(ajaxPickInfo);
	    },
	    modifyPropickingInfo = function(reqPickInfo,susMsg,errorMsg){
	    	var ajaxPickInfo = {//保存领料单明细信息
	    		 url: '/iPlant_ajax',
	    		 dataType: 'JSON',
	    		 data: reqPickInfo,
	    		 successCallBack:function(data){
	    			 commonShowMessage(susMsg),
	    			 setDataNull(),
	    			 initGridData();
	    		 },
	    		 errorCallBack:function(){
	    			 commonShowMessage("修改领料单明细失败，请联系管理员！");
	    		 }
	    	 };
	    	 iplantAjaxRequest(ajaxPickInfo);
	    },
	    deletePropickingInfo = function(reqPickInfo,susMsg,errorMsg){
	    	var ajaxPickInfo = {//删除领料单明细信息
	    		 url: '/iPlant_ajax',
	    		 dataType: 'JSON',
	    		 data: reqPickInfo,
	    		 successCallBack:function(data){
	    			 commonShowMessage(susMsg),
	    			 setDataNull(),
	    			 initGridData();
	    		 },
	    		 errorCallBack:function(){
	    			 commonShowMessage("删除领料单明细失败，请联系管理员！");
	    		 }
	    	 };
	    	 iplantAjaxRequest(ajaxPickInfo);
	    },
	    deletePropickingData = function(){//删除未审核领料单及相关信息
       		var isSelectedData = validSelectedData(pageConfig.gridName, 'Delete');
            if (!isSelectedData) {
            	commonShowMessage('提示', '请选择一条数据进行删除');
                return;
            }
            var selectData =$('#'+pageConfig.gridName).datagrid('getSelected');
       	 	$.messager.confirm('确认框', '您确定要删除您所选择的数据?', function (r) {
                if(r==true){
		        	reqData ={ IFS :'PO000008',prodpickingNo:selectData.PRODPICKING_NO};
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
        applyDataPo = function(row){
	    	var reqData = {IFS:"PO000011",prodpickingNo:row.PRODPICKING_NO,status:'WORDERSTATUS-02',tdType:"web"};
	    	var ajaxParam = {
   	             url: '/iPlant_ajax',
   	             dataType: 'JSON',
   	             data: reqData,
   	             successCallBack:function(data){
   	            	commonShowMessage("审核通过！"),
   	                initGridData();
   	             },
   	             errorCallBack:function(){
   	            	commonShowMessage("审核操作失败！");
   	             }
   	         };
   	         iplantAjaxRequest(ajaxParam);
	    },
	    
//	    selectStore = function(){//初始化仓库信息
//	    	var reqStore = {
//	            url: "/iPlant_ajax",
//	            dataType: "JSON",
//	            data: {IFS: "WMS_B00030",storeType:'WSTORE-01'},
//	            successCallBack: function(a) {
//	            	dataStore = [];
//	            	storeList = [];
//	            	dataStore.push({"value":"N/A","text":"全部"});
//	            	var op = a.RESPONSE[0].RESPONSE_DATA;
//	                $.each(op,function(n,obj) {
//	                	dataStore.push({'value':obj.STORE_ID,'text':obj.STORE_NAME});
//	                	storeList.push({'value':obj.STORE_ID,'text':obj.STORE_ID+"|"+obj.STORE_NAME});
//				    }); 
//	                var qStore = $("#qStore"),qMoStore = $("#qMoStore");
//	                qStore.combobox('loadData',dataStore),
//	                qMoStore.combobox('loadData',dataStore);
//	                if(dataStore.length>7){
//	                	qStore.combobox({panelHeight:200}),
//	                	qMoStore.combobox({panelHeight:200});
//					}else{
//						qStore.combobox({panelHeight:'auto'}),
//						qMoStore.combobox({panelHeight:'auto'});
//					}
//	                if(dataStore.length>0){
//	                	qStore.combobox('select',dataStore[0].value),
//	                	qMoStore.combobox('select',dataStore[0].value);
//	                }
//	            },
//	            errorCallBack: function() {
//	            	commonShowMessage("提示：请联系管理员，查询失败！");
//	            }
//	        };
//		    iplantAjaxRequest(reqStore);
//		},
		
//		 selectStatus = function(){//初始化仓库信息
//	    	var reqStatus = {
//	            url: "/iPlant_ajax",
//	            dataType: "JSON",
//	            data: {IFS: "WMS_B000151"},
//	            successCallBack: function(a) {
//	            	dataStatus = [];
//	            	dataStatus.push({"value":"N/A","text":"全部"});
//	            	var op = a.RESPONSE[0].RESPONSE_DATA;
//	                $.each(op,function(n,obj) {
//	                	dataStatus.push({'value':obj.DICT_IT,'text':obj.DICT_IT_NM});
//				    }); 
//	                var qStatus = $("#qStatus");
//	                qStatus.combobox('loadData',dataStatus);
//	                if(dataStatus.length>7){
//	                	qStatus.combobox({panelHeight:200});
//					}else{
//						qStatus.combobox({panelHeight:'auto'});
//					}
//	                if(dataStatus.length>0){
//	                	qStatus.combobox('select',dataStatus[1].value);
//	                	
//	                	status=dataStatus[1].value;
//	                	console.log(dataStatus[1].value);
//	                }
//	            },
//	            errorCallBack: function() {
//	            	commonShowMessage("提示：请联系管理员，查询失败！");
//	            }
//	        };
//		    iplantAjaxRequest(reqStatus);
//		},
		
		printDataTemplet=function(){
			var checkedItems = $('#propickingOut_tab').datagrid('getSelections'), num = 0,templetId = "";
			$.each(checkedItems, function (index, item) { num++;});
			if (num < 1) {
				commonShowMessage('请选择领料单进行打印！');
				return false;
			}else {
				for(var i=0;i<checkedItems.length;i++){
					if (templetId==""){
						templetId=checkedItems[i].PRODPICKING_NO;
					}else {
						templetId=checkedItems[i].PRODPICKING_NO+","+templetId;
					}
				}
				 
			     
				 Report.LoadDataFromURL("/Warehouse/system/temple/report/reportData/sql/pickorderout.jsp?prodpicking_no="+templetId+"");
				 //显示弹出窗口打印
				 Report.Print(true);
				 
				 
				 /*不显示打印弹出窗口直接打印代码
				  * var print = Report.Printer.PrinterName;
				 Report.Printer.PrinterName = print;
				 Report.Print(false);*/
				 
				 
				//addTabIndex('领料单打印', "/Warehouse/system/templet/report/DesignReport.html?report=MOD201808061539421.grf&data="+checkedItems);
			}
			//var row = $("#propickingOut_tab").datagrid("getSelected");
	        //if (row) {
	        	//templetId = row.PRODPICKING_NO;
				//addTabIndex('领料单打印', "/Warehouse/system/templet/report/DesignReport.html?templetId="+templetId);
	        //}
		}
    }    
    pickOrderOut.prototype = {
        init: function () {
            $(function () {
            	
            	iplantAjaxRequest( {
	    			url: '/iPlant_ajax',
	    			data: {IFS:'WMS_B000151'},
	    			successCallBack: function (a) {
	    				dataStatus = [];
		            	dataStatus.push({"value":"N/A","text":"全部"});
		            	var op = a.RESPONSE[0].RESPONSE_DATA;
		                $.each(op,function(n,obj) {
		                	dataStatus.push({'value':obj.DICT_IT,'text':obj.DICT_IT_NM});
					    }); 
		                var qStatus = $("#qStatus");
		                qStatus.combobox('loadData',dataStatus);
		                if(dataStatus.length>7){
		                	qStatus.combobox({panelHeight:200});
						}else{
							qStatus.combobox({panelHeight:'auto'});
						}
		                if(dataStatus.length>0){
		                	qStatus.combobox('select',dataStatus[0].value);
		                	
		                	status=dataStatus[0].value;
		                }
	    			}
	    		});
            	
            	iplantAjaxRequest( {
	    			url: '/iPlant_ajax',
	    			data: {IFS: "WMS_B00030",storeType:'WSTORE-01',storeTypes:'WSTORE-03'},
	    			successCallBack: function (a) {
	    				dataStore = [];
		            	storeList = [];
		            	dataStore.push({"value":"N/A","text":"全部"});
		            	var op = a.RESPONSE[0].RESPONSE_DATA;
		                $.each(op,function(n,obj) {
		                	dataStore.push({'value':obj.STORE_ID,'text':obj.STORE_NAME});
		                	storeList.push({'value':obj.STORE_ID,'text':obj.STORE_ID+"|"+obj.STORE_NAME});
					    }); 
		                var qStore = $("#qStore");//,qMoStore = $("#qMoStore");
		                qStore.combobox('loadData',dataStore);
		                //qMoStore.combobox('loadData',dataStore);
		                if(dataStore.length>7){
		                	qStore.combobox({panelHeight:200});
		                	//qMoStore.combobox({panelHeight:200});
						}else{
							qStore.combobox({panelHeight:'auto'});
							//qMoStore.combobox({panelHeight:'auto'});
						}
		                if(dataStore.length>0){
		                	qStore.combobox('select',dataStore[0].value);
		                	//qMoStore.combobox('select',dataStore[0].value);
		                }
	    			}
	    		});
            	
            	showMessage = $("#showMessageInfo"),opType="",fmDataGrid = $('#'+pageConfig.gridFromMoName),editIndex = undefined,storeList = [];
            	//selectStore();
          	    //selectStatus();
            	initGridData();
            	$('#btnSearch').click(function(){ var dgrid=$('#'+pageConfig.gridName).datagrid('options'); dgrid.pageNumber = 1;queryDataByCondition(); });
            	$('#btnSearchMo').click(function(){ var dgrid=$('#'+pageConfig.gridMoName).datagrid('options'); dgrid.pageNumber = 1,queryMoDataByCondition(); });
            	$('#btnReset').click(function(){ setQueryNull();  });
            	$('#btnResetMo').click(function(){ setQueryMoNull();  });
            	$('#btnAdd').click(function(){ addDataPo();  });
            	$('#btnUpdate').click(function(){ modifyDataMo();  });
            	$('#btnPrint').click(function(){ printDataTemplet();});
            	$('#btnMoAdd').click(function(){ selectMoDataOk();  });
            	$('#btnMoDelete').click(function(){ delMoDataList();  });
            	$('#btnDelete').click(function(){ deletePropickingData();  });
            	$('.panel-tool-close').click(function(){ setDataNull();  });
            });
        }
	}
    var poo = new pickOrderOut();
    var status='';
    poo.init();
})();
