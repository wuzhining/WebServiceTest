(function () {
    function outsourcing() {
      pageConfig={
          gridName:'npickingOut_tab',
          gridInfoName:'npickingOutInfo_tab',
          gridMoName:'moDataList_tab',
          gridFromMoName:'pickOrderFromMo_tab',
          title:'委外领料单',
      },
      initGridData=function(){
    	  selectStore();
    	  queryDataByCondition();
      },
      bindGridData = function (reqData,jsonData) {
    	  var grid = {
    		  name: pageConfig.gridName,
              dataType: 'json',
              singleSelect:false,
              columns:[[
                    {field : "CZ",width : 10,checkbox : true},
					{ field: 'NPICKING_NO', title: '领料单号', width: 150 ,align:'center'},
			   		{ field: 'SOURCE_NO', title: '委外单号', width: 150 ,align:'center'},
			   		{ field: 'BILL_TYPE_NM', title: '单据类别', width: 80 ,align:'center'},
			   		{ field: 'STATUS_NM', title: '状态', width: 120 ,align:'center'},
			   		{ field: 'STORE_NAME', title: '所属仓库', width: 120 ,align:'center'},
			   		{ field: 'DEPARTMENT_NAME', title: '领料部门', width: 120 ,align:'center'},
			   		{ field: 'CRT_DT', title: '制单时间', width: 200 ,align:'center'},
			   		{ field: 'CRT_NM', title: '制单人', width: 100 ,align:'center'},
			   		{ field: 'ADT_DT', title: '领料时间', width: 200 ,align:'center'},
			   		{ field: 'ADT_NM', title: '领料人', width: 100 ,align:'center'},
			   		{ field: 'STORE_ID', title: '所属仓库', width: 120 ,align:'center',hidden:true},
			   		{ field: 'STATUS', title: '状态编码', width: 0 ,align:'center',hidden:true},
			   		{ field: 'DEPARTMENT_ID', title: '状态编码', width: 0 ,align:'center',hidden:true},
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
	            		$("#btnPrint").css("display","none");
	            	}else{//判断按钮是否可用
	            		$("#btnDelete").css("display","none");
	            		$("#btnUpdate").css("display","none");
	            		$("#btnPrint").css("display","");
	            	}
	            	initDataNpicking(row.NPICKING_NO);
	            	$('#npickingNoShow').html(row.NPICKING_NO);
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
        		var npickingNo = "#";
			    if(data.rows.length>0){
	        		$(this).datagrid('selectRow',0);
	        		if(checkNotEmpty(data.rows[0].NPICKING_NO)){
	        			npickingNo = data.rows[0].NPICKING_NO;
	        		}
			    }
			    initDataNpicking(npickingNo);
			    $('#npickingNoShow').html(npickingNo);
			}}).datagrid('loadData', jsonData);
		},
	    setDataNull = function () {
			opType="",
	    	$('#searchoDialog').dialog('close');
	    	$('#qTwNo').textbox('setValue',"");
	    	$('#qMoStore').combobox('setValue',"");
	    	$('#qMoDtBegin').datebox('setValue',"");
	    	$('#qMoDtEnd').datebox('setValue',"");
	    	$("#showMessageInfo").html("");
	    	console.log(fmDataGrid);
	    	var item = fmDataGrid.datagrid('getRows'); 
	    	clearDataGrid(item);
	    	//fmDataGrid.datagrid("loadData", { total: 0, rows: [] });
	    },
	    setQueryNull = function () {
	    	$('#qNpickingNo').textbox('setValue',""),
	    	$('#qStore').combobox('setValue',"N/A"),
	    	$('#qProDtBegin').datebox('setValue',""),
	    	$('#qProDtEnd').datebox('setValue',"");
	    },
	    setQueryMoNull = function () {
	    	$('#qTwNo').textbox('setValue',""),
	    	$('#qMoStore').combobox('setValue',"N/A"),
	    	$('#qMaterialId').textbox('setValue',""),
	    	$('#qMoDtBegin').datebox('setValue',""),
	    	$('#qMoDtEnd').datebox('setValue',""),
	    	$("#showMessageInfo").html("");
	    },
	    queryDataByCondition = function(){
		    var dgrid=$('#'+pageConfig.gridName).datagrid('options');
		    if(!dgrid) return;
		    var qNpickingNo = $('#qNpickingNo').textbox('getValue'),qStore = $('#qStore').combobox('getValue'),qProDtBegin =$('#qProDtBegin').datebox('getValue'),qProDtEnd =$('#qProDtEnd').datebox('getValue');
		    if(qStore=="N/A"){qStore = "";}
		    var reqData ={
		    	qNpickingNo: qNpickingNo,
		    	billType: "WOUTSTORE-05",
		    	qStore: qStore,
		    	qProDtBegin: qProDtBegin,
		        qProDtEnd: qProDtEnd,
		        pageIndex:dgrid.pageNumber,
                pageSize:dgrid.pageSize,
		        IFS:'NP000001'
		    };
		    reqGridData('/iPlant_ajax',pageConfig.gridName,reqData);
		    $.messager.progress('close');
	    },
	    initDataNpicking = function(npickingNo){
			var tabName = pageConfig.gridInfoName;
			var dgridOp = $('#'+tabName).datagrid('options');
			if(!dgridOp) return;
			if(!checkNotEmpty(npickingNo)){ npickingNo = "N/O"; }
			var reqData = {
				IFS: 'NP000002',
				npickingNo: npickingNo,
				pageIndex: dgridOp.pageNumber,
				pageSize: dgridOp.pageSize	
			}
			dialogDataGrid('/iPlant_ajax', tabName, reqData);
			dialogEditorDataGrid = function(tabName,reqData, jsonData) {
				var columnsTab=[
				    { field: 'MATERIAL_ID', title: '物料编码', width: 200 ,align:'center'},
				    { field: 'MATERIAL_NAME', title: '物料名称', width: 200 ,align:'center'},
				    { field: 'SUPPLIER_ID', title: '供应商编码', width: 200 ,align:'center'},
				    { field: 'SUPPLIER_NAME', title: '供应商名称', width: 200 ,align:'center'},
				    { field: 'NPICKING_QTY', title: '应领数量', width: 100 ,align:'center'},
				    { field: 'QTY_RTN', title: '已领数量', width: 100 ,align:'center'},
				    { field: 'UNIT_NAME', title: '单位', width: 200 ,align:'center'},
				    { field: 'LOT_NO', title: '批次号', width: 100 ,align:'center'},
				    { field: 'ITM', title: '项次', width: 80 ,align:'center'},
				    { field: 'ARRIVAL_DATE', title: '来料时间', width: 100 ,align:'center'},
				    { field: 'PRODUCT_DATE', title: '生产时间', width: 100 ,align:'center'},
				    { field: 'VALIDITY_DATE', title: '保质期', width: 100 ,align:'center'},
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
			var checkedItems = $('#' + pageConfig.gridName).datagrid('getSelections'), num = 0,npickingNo = "",storeId = "";
			$.each(checkedItems, function (index, item) { num++;});
			if (num != 1) {
				commonShowMessage('请选择一条数据进行修改！');
				return false;
			}
			var row = $("#"+pageConfig.gridName).datagrid("getSelected");
	        if (row) {
	        	opType="modify",npickingNo = row.NPICKING_NO,storeId = row.STORE_ID;
	 			$("#searchoDialog").dialog("open").dialog('setTitle', "领料单修改");
	 			queryMoDataByCondition();
				initPickGridData(npickingNo);
				fmDataGrid.storeId = storeId;
	        }
	    },
	    queryMoDataByCondition = function(){
		    var tabName = pageConfig.gridMoName,dgrid = $('#'+tabName).datagrid('options');
		    if(!dgrid) return;
		    var qTwNo = $('#qTwNo').textbox('getValue');
		    var qMaterialId = $('#qMaterialId').textbox('getValue');
		    var qMoStore = $('#qMoStore').combobox('getValue');
		    var qMoDtBegin =$('#qMoDtBegin').datebox('getValue');
		    var qMoDtEnd =$('#qMoDtEnd').datebox('getValue');
		    if(qMoStore=="N/A"){ qMoStore="";}
		    var reqData ={
		    	url: ERP_URL,
		    	qTwNo: qTwNo,
		    	qMoStore: qMoStore,
		    	qMaterialId: qMaterialId,
		    	qMoDtBegin: qMoDtBegin,
		    	qMoDtEnd: qMoDtEnd,
		        pageIndex:dgrid.pageNumber,
		        pageSize:dgrid.pageSize,
		        IFS:'SQL00003',
		        reqType:"APP"
		    };
		    dialogWarehouseDataGrid = function(tabName,reqData, jsonData) {
				var columnsTab;
				columnsTab=[
					{field : "CZ",width : 10,checkbox : true},
				    { field: 'TW_NO', title: '委外单号', width: 140 ,align:'center'},
				    { field: 'ITM', title: '项次', width: 100 ,align:'center'},
				    { field: 'PARTQTY', title: '领料数量', width: 80 ,align:'center'},
				    { field: 'PARTWH', title: '领料仓编码', width: 100 ,align:'center'},
				    { field: 'MATERIAL_ID', title: '物料编码', width: 140 ,align:'center'},
				    { field: 'MATERIAL_NAME', title: '物料名称', width: 140 ,align:'center'},
				    { field: 'QTY', title: '需委外数量', width: 80 ,align:'center'},
				    { field: 'TW_DATE', title: '委外日期', width: 120 ,align:'center',formatter: function (value,row,index) {return '<span title='+value+'>'+value.substring(0,10)+'</span>' }},
				    { field: 'QTY_RTN', title: '已缴库存数量', width: 90 ,align:'center'},
				    { field: 'R_STORE', title: '成品入库仓', width: 140 ,align:'center'},
				    { field: 'BOM_NO', title: 'BOM编码', width: 140 ,align:'center'},
				    { field: 'Warehouse_NO', title: '健大代号', width: 140 ,align:'center'},
				    { field: 'CRT_ID', title: '开单人', width: 100 ,align:'center'},
				    { field: 'BILL_TYPE', title: '单据类型', width: 80 ,align:'center'}
				];
				var gridLists = {
					name: tabName,
					dataType: 'json',
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
		    myDataGrid(ERP_URL, tabName, reqData,dialogWarehouseDataGrid);
		},
	    initPickGridData = function(npickingNo){
	    	var columns = [
				{ field: 'SOURCE_NO', title: '委外单号', width: 140 ,align:'center'},
				{ field: 'PARTQTY', title: '领料数量<font color=red>*</font>', width: 80 ,align:'center',editor:{type:'validatebox',options:{required:true,validType:['numberFloat']}}},
				{ field: 'PARTWH', title: '领料仓编码', width: 180 ,align:'center',editor:{type:'combobox',options:{valueField:'value',textField:'text',data:storeList,required:true,editable:false}}},
				{ field: 'MATERIAL_ID', title: '物料编码', width: 140 ,align:'center'},
				{ field: 'MATERIAL_NAME', title: '物料名称', width: 140 ,align:'center'},
				{ field: 'QTY', title: '需生产数量', width: 0 ,align:'center',hidden:true},
				{ field: 'QTY_RTN', title: '已缴库数量', width: 0 ,align:'center',hidden:true},
				{ field: 'BOM_NO', title: 'BOM代号', width: 0 ,align:'center',hidden:true},
				{ field: 'TW_DATE', title: '委外日期', width: 0 ,align:'center',formatter: function (value,row,index) {return '<span title='+formatDate(value)+'>'+formatDate(value)+'</span>' },hidden:true},
				{ field: 'R_STORE', title: '成品入库仓', width: 0 ,align:'center',hidden:true},
				{ field: 'Warehouse_NO', title: '健大代号', width: 0 ,align:'center',hidden:true},
				{ field: 'CRT_ID', title: '开单人', width: 0 ,align:'center',hidden:true},
				{ field: 'ITM', title: '项次', width: 0 ,align:'center',hidden:true},
				{ field: 'BILL_TYPE', title: '单据类型', width: 0 ,align:'center'},
				{ field: 'NPICKINGNO', title: '领料单号', width: 0 ,align:'center',hidden:true}
            ];
	    	var tabName = pageConfig.gridFromMoName;
	    	if(checkNotEmpty(npickingNo)){
				var dgridOp = $('#'+tabName).datagrid('options');
				if(!dgridOp) return;
				var reqData = {
					IFS: 'NP000003',
					npickingNo: npickingNo
				}
				dialogDataGrid('/iPlant_ajax', tabName, reqData);
				dialogEditorDataGrid = function(tabName,reqData, jsonData) {
					var gridLists = {
						name: tabName,
						pagination : false,
						dataType: 'json',
						columns: [columns],
						onEndEdit:function(index,row){/**结束编辑模式的操作*/
							var ed = $(this).datagrid('getEditor', {index: index,field: 'PARTWH'});
					    	row.PARTWH = $(ed.target).combobox('getValue');
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
				        	if(field=="PARTQTY" || field=="PARTWH"){
				        		fmDataGrid.datagrid('selectRow', index).datagrid('beginEdit', index);
				        		editIndex = index;
				        	}else{
				        		endEditing(fmDataGrid);
				        	}
				        }
					}
					initEditorDataGridView(reqData, gridLists);
					console.log(jsonData);
					fmDataGrid.npickingNo = npickingNo;
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
				    onEndEdit:function(index,row){
				    	var ed = $(this).datagrid('getEditor', {index: index,field: 'PARTWH'});
				    	row.PARTWH = $(ed.target).combobox('getValue');
				    }, 
					onBeforeEdit:function(index,row){ $(this).datagrid('refreshRow', index);},
				    onAfterEdit:function(index,row){ $(this).datagrid('refreshRow', index);},
			        onCancelEdit:function(index,row){ $(this).datagrid('refreshRow', index);},
			        onClickCell: function (index,field,value) {/**单击进入编辑模式*/
			        	var grid = $('#'+tabName),rows = grid.datagrid('getRows'),row = rows[index];
			        	grid.datagrid('clearSelections'),grid.datagrid('selectRow',index);
			        	if(field=="PARTQTY"  || field=="PARTWH"){
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
    							showMessage.html("<font color=red>提示：请选择同一委外物料信息！</font>");
    				    		return false;
    						}
    					}
	    			}else{
	    				setDataGridValue(selected[i],i);
	    			}
		    	}
	    		showMessage.html("");
	    	}else{
	    		showMessage.html("<font color=red>提示：请选择委外领料信息！</font>");
	    		return false;
	    	}
	    },
	    setDataGridValue = function(data,num){
	    	var npickingNo = "";
	    	if(checkNotEmpty(fmDataGrid.npickingNo)){
	    		npickingNo = fmDataGrid.npickingNo;
	    	}
	    	fmDataGrid.datagrid("insertRow", {row: {index: num,SOURCE_NO:data.TW_NO,PARTQTY:0,PARTWH:data.PARTWH,MATERIAL_ID:data.MATERIAL_ID,MATERIAL_NAME:data.MATERIAL_NAME,QTY:data.QTY,QTY_RTN:data.QTY_RTN,BOM_NO:data.BOM_NO,TW_DATE:data.TW_DATE,R_STORE:data.R_STORE,Warehouse_NO:data.Warehouse_NO,CRT_ID:data.CRT_ID,ITM:data.ITM,BILL_TYPE:data.BILL_TYPE,NPICKINGNO:npickingNo}});
	    	editIndex = num;
	    },
	    compareSelectDataGrid = function(selected,rows){
	    	var target = true;
	    	if(rows.length>0){
	    		for(var i=0;i<rows.length;i++){
	    			if(selected.TW_NO==rows[i].SOURCE_NO && selected.MATERIAL_ID==rows[i].MATERIAL_ID){
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
	    			if(selected.TW_NO != rows[i].SOURCE_NO){
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
	    			if(selected.PARTWH != rows[i].PARTWH){
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
	    	var rows = fmDataGrid.datagrid('getRows'),target = false;
	    	if(rows.length>0){
	    		for(var i=0;i<rows.length;i++){
	    			if(checkNotEmpty(rows[i].PARTQTY)){
	    				if(rows[i].PARTQTY!="0"){
	    					showMessage.html("");
		    				target = true;
	    				}else{
	    					showMessage.html("<font color=red>提示：领料数量不能为0！</font>");
	    					return false;
	    				}
	    			}else{
	    				showMessage.html("<font color=red>提示：领料数量不能为空！</font>");
	    				return false;
	    			}
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
	    		showMessage.html("<font color=red>提示：请选择委外领料数据！</font>");
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
	            var arrInsert = new Array(),arrUpdate = new Array(),arrDelete = new Array(),reqList = "",reqData = {},reqPickInfo = {}, npickingNo = "",billType = "",sourceNo = "",storeId = "",status = "WORDERSTATUS-01",materialIds = "",departmentId="N/A",susMsg = "",errorMsg = "",storeId = "",modifyStore = false;
	            if(opType=="add"){
	            	ifs = "NP000004",susMsg = "新增委外年领料单成功！",errorMsg = "新增委外领料单失败，请联系管理员！";
	            	if(inserted.length>0){
	            		billType = "WOUTSTORE-05",sourceNo = inserted[0].SOURCE_NO,storeId = inserted[0].PARTWH;
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
	          	       	            	npickingNo = data.RESPONSE[0].RESPONSE_DATA[0].PRODPICKINGNO;
	          	       	            	console.log(data.RESPONSE[0].RESPONSE_DATA[0].PRODPICKINGNO);
	          	       	            	reqData = {IFS:ifs,npickingNo:npickingNo,billType:billType,sourceNo:sourceNo,departmentId:departmentId,storeId:storeId,status:status};
	          	       	            	reqPickInfo = {IFS:"NP000005",npickingNo:npickingNo,list:arrInsert};
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
	            	npickingNo = fmDataGrid.npickingNo,storeId = fmDataGrid.storeId;
	            	susMsg = "变更委外领料单成功！",errorMsg = "变更委外领料单失败，请联系管理员！";
	            	if(inserted.length>0){
	            		for(var i=0;i<inserted.length;i++){
	                		arrInsert.push(inserted[i]);
	                		if(i==0){
	                			materialIds = inserted[i].MATERIAL_ID
	                			//判断仓库id是否改变
	                			if(storeId!=inserted[i].PARTWH){
	                				storeId = inserted[i].PARTWH;
	                				modifyStore = true;
	                			}
	                		}else{
	                			materialIds = materialIds +","+inserted[i].MATERIAL_ID;
	                		}
	                	}
	            		//susMsg = "新增委外领料单明细成功！",errorMsg = "新增委外领料单明细失败，请联系管理员！";
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
          	       	            	reqPickInfo = {IFS:"NP000005",npickingNo:npickingNo,list:arrInsert};
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
	            	}
	            	if(modifyStore){
	            		var ajacMaterial = {
        	    			url: '/iPlant_ajax',
        	   	            dataType: 'JSON',
        	   	            data: {IFS:"NP000009",storeId:storeId,npickingNo:npickingNo},
        	   	            successCallBack:function(data){
        	   	            	commonShowMessage(susMsg);
        	   	            },
        	   	            errorCallBack:function(){
        	   	            	commonShowMessage(errorMsg);
        	   	            }
        	        	};
        	        	iplantAjaxRequest(ajacMaterial);
	            	}
	            	if(deleted.length>0){
	            		for(var i=0;i<deleted.length;i++){
	            			arrDelete.push(deleted[i]);
	                	}
	            		//susMsg = "删除领料单成功！",errorMsg = "删除委外领料单失败，请联系管理员！";
	            		reqPickInfo = {IFS:"NP000007",list:arrDelete};
	            		deletePropickingInfo(reqPickInfo,susMsg,errorMsg);
	            	}
	            	if(updated.length>0){
	            		for(var i=0;i<updated.length;i++){
	            			arrUpdate.push(updated[i]);
	                	}
	            		//susMsg = "修改领料单成功！",errorMsg = "修改委外领料单失败，请联系管理员！";
	            		reqPickInfo = {IFS:"NP000006",list:arrUpdate};
	            		modifyPropickingInfo(reqPickInfo,susMsg,errorMsg);
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
    		    			 reqPickInfo.IFS = "NP000006";
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
		    		    			 commonShowMessage("新增委外单信息失败，请联系管理员！");
		    		    		 }
		    		    	 };
		    		    	 iplantAjaxRequest(ajaxMo);
    		    		 },
    		    		 errorCallBack:function(){
    		    			 commonShowMessage("新增委外领料单明细失败，请联系管理员！");
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
	    			 reqPickInfo.IFS = "NP000006";
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
	   		    			 commonShowMessage("新增委外单信息失败，请联系管理员！");
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
		        	reqData ={ IFS :'NP000008',npickingNo:selectData.NPICKING_NO};
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
        applyDataPo = function(row){//不用
	    	var reqData = {IFS:"PO000011",npickingNo:row.NPICKING_NO,status:'WORDERSTATUS-02',tdType:"web"};
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
	    selectStore = function(){//初始化仓库信息
	    	var reqStore = {
	            url: "/iPlant_ajax",
	            dataType: "JSON",
	            data: {IFS: "WMS_B00030",storeType:'WSTORE-01'},
	            successCallBack: function(a) {
	            	dataStore = [];
	            	storeList = []
	            	dataStore.push({"value":"N/A","text":"全部"});
	            	var op = a.RESPONSE[0].RESPONSE_DATA;
	                $.each(op,function(n,obj) {
	                	dataStore.push({'value':obj.STORE_ID,'text':obj.STORE_NAME});
	                	storeList.push({'value':obj.STORE_ID,'text':obj.STORE_ID+"|"+obj.STORE_NAME});
				    }); 
	                var qStore = $("#qStore"),qMoStore = $("#qMoStore");
	                qStore.combobox('loadData',dataStore),
	                qMoStore.combobox('loadData',dataStore);
	                if(dataStore.length>7){
	                	qStore.combobox({panelHeight:200}),
	                	qMoStore.combobox({panelHeight:200});
					}else{
						qStore.combobox({panelHeight:'auto'}),
						qMoStore.combobox({panelHeight:'auto'});
					}
	                if(dataStore.length>0){
	                	qStore.combobox('select',dataStore[0].value),
	                	qMoStore.combobox('select',dataStore[0].value);
	                }
	            },
	            errorCallBack: function() {
	            	commonShowMessage("提示：请联系管理员，查询失败！");
	            }
	        };
		    iplantAjaxRequest(reqStore);
		}
	    
	    printDataTemplet=function(){
			var checkedItems = $('#npickingOut_tab').datagrid('getSelections'), num = 0,templetId = "";
			$.each(checkedItems, function (index, item) { num++;});
			if (num < 1) {
				commonShowMessage('请选择托外领料单进行打印！');
				return false;
			}else {
				for(var i=0;i<checkedItems.length;i++){
					if (templetId==""){
						templetId=checkedItems[i].NPICKING_NO;
					}else {
						templetId=checkedItems[i].NPICKING_NO+","+templetId;
					}
				}
				 
				 Report.LoadDataFromURL("../../../system/temple/report/reportData/sql/outsourcing.jsp?npicking_no="+templetId+"");
				//显示弹出窗口打印
				 Report.Print(true);
				 
				 
				 /*不显示打印弹出窗口直接打印代码
				  * var print = Report.Printer.PrinterName;
				 Report.Printer.PrinterName = print;
				 Report.Print(false);*/
				 
				 
				//addTabIndex('托外领料单打印', "/Warehouse/system/templet/report/OutPickingDesignReport.html?templetId="+templetId);
			}
			/*var row = $("#propickingOut_tab").datagrid("getSelected");
	        if (row) {
	        	templetId = row.PRODPICKING_NO;
				addTabIndex('领料单打印', "/Warehouse/system/templet/report/DesignReport.html?templetId="+templetId);
	        }*/
		}
    }    
    outsourcing.prototype = {
        init: function () {
            $(function () {
            	showMessage = $("#showMessageInfo"),opType="",fmDataGrid = $('#'+pageConfig.gridFromMoName),editIndex = undefined,storeList = [];
            	initGridData();
            	$('#btnSearch').click(function(){ var dgrid=$('#'+pageConfig.gridName).datagrid('options'); dgrid.pageNumber = 1;queryDataByCondition(); });
            	$('#btnSearchMo').click(function(){ var dgrid=$('#'+pageConfig.gridMoName).datagrid('options'); dgrid.pageNumber = 1,queryMoDataByCondition(); });
            	$('#btnReset').click(function(){ setQueryNull();  });
            	$('#btnResetMo').click(function(){ setQueryMoNull();  });
            	$('#btnAdd').click(function(){ addDataPo();  });
            	$('#btnUpdate').click(function(){ modifyDataMo();  });
            	$('#btnMoAdd').click(function(){ selectMoDataOk();  });
            	$('#btnMoDelete').click(function(){ delMoDataList();  });
            	$('#btnDelete').click(function(){ deletePropickingData();  });
            	$('.panel-tool-close').click(function(){ setDataNull();  });
            	$('#btnPrint1').click(function(){ printDataTemplet();});
            });
        }
	}
    var os = new outsourcing();
    os.init();
})();
