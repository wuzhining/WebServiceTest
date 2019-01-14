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
    	  selectStore();
    	  queryDataByCondition();
      },
      bindGridData = function (reqData,jsonData) {
    	  var grid = {
    		  name: 'propickingOut_tab',
              dataType: 'json',
              singleSelect:true,
              columns:[[
                    /*{ field: 'APPLY', title: '审核', width: 50 ,align:'center',formatter:function(value){if(value=='WORDERSTATUS-01'){ return "<img href='javascript:void(0)' style='cursor:pointer;' class='easyui-linkbutton' src='../../../common/RootImages/apply.png'/>"}else{ return "<img href='javascript:void(0)' class='easyui-linkbutton' src='../../../common/RootImages/apply_over.png'/>"}}},*/
					{ field: 'SHIPPING_NO', title: '出库单号', width: 200 ,align:'center'},
			   		{ field: 'BILL_TYPE', title: '单据类别', width: 100 ,align:'center'},
			   		{ field: 'STATUSNM', title: '单据类别', width: 100 ,align:'center',hidden:true},

			   		{ field: 'STATUS', title: '状态', width: 100 ,align:'center'},
			   		{ field: 'CRT_ID', title: '制单人', width: 200 ,align:'center'},
			   		{ field: 'CRT_DT', title: '制单时间', width: 200 ,align:'center'},
			   		{ field: 'CUST_NO', title: '客户代码', width: 200 ,align:'center'}

	            ]],
	            onClickRow: function(index,row){
	            	 if(row.STATUSNM=="WORDERSTATUS-01"){
	            		$("#btnDelete").css("display","");
	            		$("#btnUpdate").css("display","");
	            		$("#btnPrint").css("display","none");
	            	}else{//判断按钮是否可用
	            		$("#btnDelete").css("display","none");
	            		$("#btnUpdate").css("display","none");
	            		$("#btnPrint").css("display","");
	            	}
	            	initDataPropicking(row.SHIPPING_NO);
	            	initDatashippingsnPropicking(row.SHIPPING_NO);

	            	$('#prodpickingNoShow').html(row.SHIPPING_NO);
			    },
			    onClickCell : function (index,field,value) {/**单击进入编辑模式*/
		        	var grid = $('#'+pageConfig.gridName),rows = grid.datagrid('getRows'),row = rows[index];
		        	grid.datagrid('clearSelections'),grid.datagrid('selectRow',index);
		        }
    	  	}
        	initGridView(reqData,grid);
        	$('#'+pageConfig.gridName).datagrid({"onLoadSuccess":function(data){
        		var prodpickingNo = "#";
			    if(data.rows.length>0){
	        		$(this).datagrid('selectRow',0);
	        		if(checkNotEmpty(data.rows[0].SHIPPING_NO)){
	        			prodpickingNo = data.rows[0].SHIPPING_NO;
	        		}
			    }
			    initDataPropicking(prodpickingNo);
			    initDatashippingsnPropicking(prodpickingNo);
			    $('#prodpickingNoShow').html(prodpickingNo);
			}}).datagrid('loadData', jsonData);
		},
	    setDataNull = function () {
			opType="",
	    	$('#searchoDialog').dialog('close');
	    	$('#qMoNo').textbox('setValue',"");
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
	    	$('#qProdpickingNo').textbox('setValue',""),
	    	$('#qProDtBegin').datebox('setValue',""),
	    	$('#qProDtEnd').datebox('setValue',"");
	    },
	    
	    deleteOutputBill = function () {
            var isSelectedData = validSelectedData('propickingOut_tab', 'Delete');
            if (!isSelectedData) {
                //$.messager.alert('提示', '请选择一条数据进行删除');
                $.messager.show({
	         	    title:'提示',
	         	    msg:"请选择一条数据进行删除",
	         	    //showType:'show',
	         	    showType:'slide',
	         	    showSpeed:'8600',
	         	    style:{
	         	    	left:document.body.clientWidth-250, // 与左边界的距离
	         	    	top:document.body.clientHeight-100 // 与顶部的距离
	         	    }
	         	});
                
                return;
            }
            var checkedItems = $('#propickingOut_tab').datagrid('getSelections');
            //确认提示框
            var delCnt=0;
            $.messager.confirm('确认框', '您确定要删除您所选择的数据?', function (r) {
           	 if(r==true){
           		 $.each(checkedItems, function (index, item) {
           			 delCnt++;
                   	 var ajaxParam = {
                                url: '/iPlant_ajax',
                                dataType: 'JSON',
                                data: {
                                    IFS: 'WMS_ZX00040',
                                    SHIPPING_NO: item.SHIPPING_NO,
                                },
                                successCallBack:function(data){
                                	 if(delCnt==checkedItems.length){
	                              	 	if(data.RESPONSE["0"].RESPONSE_HDR.MSG_CODE=='0'){
	                              	 	 $.messager.show({
	                     	         	    title:'提示',
	                     	         	    msg:'删除成功!',
	                     	         	    //showType:'show',
	                     	         	    showType:'slide',
	                     	         	    showSpeed:'8600',
	                     	         	    style:{
	                     	         	    	left:document.body.clientWidth-250, // 与左边界的距离
	                     	         	    	top:document.body.clientHeight-100 // 与顶部的距离
	                     	         	    }
	                     	         	});
	                                	      initGridData();
	                              	 	}else{
	                              	 		$.messager.show({
		                     	         	    title:'提示',
		                     	         	    msg:'删除失败!',
		                     	         	    //showType:'show',
		                     	         	    showType:'slide',
		                     	         	    showSpeed:'8600',
		                     	         	    style:{
		                     	         	    	left:document.body.clientWidth-250, // 与左边界的距离
		                     	         	    	top:document.body.clientHeight-100 // 与顶部的距离
		                     	         	    }
		                     	         	});
	                              	 	}
	                                     
	                            	 }
                        		},
                        		errorCallBack:function(data){
                        			if(delCnt==checkedItems.length){
                        				$.messager.show({
	                     	         	    title:'提示',
	                     	         	    msg:'删除失败,服务器无响应!',
	                     	         	    //showType:'show',
	                     	         	    showType:'slide',
	                     	         	    showSpeed:'8600',
	                     	         	    style:{
	                     	         	    	left:document.body.clientWidth-250, // 与左边界的距离
	                     	         	    	top:document.body.clientHeight-100 // 与顶部的距离
	                     	         	    }
	                     	         	});
                        			}
                        		}
                         };
                        iplantAjaxRequest(ajaxParam);
                    });
           	 }
            });      
       },
       
	    setQueryMoNull = function () {
	    	$('#qshSHIPPINGNO').textbox('setValue',""),
	    	$('#qMoDtBegin').datebox('setValue',""),
	    	$('#qMoDtEnd').datebox('setValue',""),
	    	$('#PRDNO').textbox('setValue',""),
	    	$("#showMessageInfo").html("");
	    },
	    queryDataByCondition = function(){
		    var dgrid=$('#'+pageConfig.gridName).datagrid('options');
		    if(!dgrid) return;
		    var qshSHIPPINGNO = $('#qProdpickingNo').textbox('getValue'),qProDtBegin =$('#qProDtBegin').datebox('getValue'),qProDtEnd =$('#qProDtEnd').datebox('getValue');
		    var reqData ={
		    	BILL_TYPE: 'WOUTSTORE-08',
		        qshSHIPPINGNO: qshSHIPPINGNO,
		    	qProDtBegin: qProDtBegin,
		        qProDtEnd: qProDtEnd,
		        pageIndex:dgrid.pageNumber,
                pageSize:dgrid.pageSize,
		        IFS:'WMS_ZX00068'
		    };
		    reqGridData('/iPlant_ajax','propickingOut_tab',reqData);
	    },
	    initDataPropicking = function(prodpickingNo){ 
			var tabName = pageConfig.gridInfoName;
			var dgridOp = $('#'+tabName).datagrid('options');
			if(!dgridOp) return;
			//if(!checkNotEmpty(prodpickingNo)){ prodpickingNo = "N/O"; }
			var reqData = {
				IFS: 'WMS_ZX00024',
				qshSHIPPINGNO: prodpickingNo,
				pageIndex: dgridOp.pageNumber,
				pageSize: dgridOp.pageSize	
			}
			dialogDataGrid('/iPlant_ajax', tabName, reqData);
			dialogEditorDataGrid = function(tabName,reqData, jsonData) {
				var columnsTab=[
				  //  { field: 'SHIPPING_NO', title: '出货单号', width: 200 ,align:'center'},
				    { field: 'SO_NO', title: '借出单号', width: 200 ,align:'center'},
				   // { field: 'ITM', title: '项次', width: 200 ,align:'center'},
				    //{ field: 'TOTAL_CARTON', title: '总箱数', width: 200 ,align:'center'},
				    { field: 'SHIPPING_QTY', title: '出库数量', width: 100 ,align:'center'},

				    { field: 'MATERIAL_ID', title: '物料编码', width: 200 ,align:'center'},
				    { field: 'MATERIAL_NAME', title: '物料名称', width: 200 ,align:'center'},
				    { field: 'CUST_NO', title: '客户代码', width: 100 ,align:'center'}/*,
				    { field: 'LOCATION_NAME', title: '货位名称', width: 200 ,align:'center'},
				    { field: 'SHELF_NAME', title: '货架名称', width: 200 ,align:'center'},
				    { field: 'STORE_NAME', title: '仓库名称', width: 200 ,align:'center'},
				    { field: 'AREA_NAME', title: '区域名称', width: 200 ,align:'center'}*/
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
	    },
	    initDatashippingsnPropicking = function(prodpickingNo){ 
			var tabName = 'propickingOutInfosn_tab';
			var dgridOp = $('#'+tabName).datagrid('options');
			if(!dgridOp) return;
			//if(!checkNotEmpty(prodpickingNo)){ prodpickingNo = "Nm/O"; }
			var reqData = {
				IFS: 'WMS_ZX00044',
				qshSHIPPINGNO: prodpickingNo,
				pageIndex: dgridOp.pageNumber,
				pageSize: dgridOp.pageSize	
			}
			dialogEditorDataGrid1 = function(tabName,reqData, jsonData) {
				var columnsTab=[
				    { field: 'SERIAL_NUMBER', title: '标签', width: 200 ,align:'center'},
				    { field: 'MATERIAL_ID', title: '物料编码', width: 200 ,align:'center'},
				    { field: 'MATERIAL_NAME', title: '物料名称', width: 200 ,align:'center'},
				    { field: 'CUST_NO', title: '客户代码', width: 200 ,align:'center'},
				    { field: 'QTY', title: '数量', width: 100 ,align:'center'},
				    { field: 'LOCATION_NAME', title: '货位名称', width: 200 ,align:'center'},
				    { field: 'SHELF_NAME', title: '货架名称', width: 200 ,align:'center'},
				    { field: 'STORE_NAME', title: '仓库名称', width: 200 ,align:'center'},
				    { field: 'AREA_NAME', title: '区域名称', width: 200 ,align:'center'}
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
			myDataGrid('/iPlant_ajax', tabName, reqData,dialogEditorDataGrid1);
	    },
	    addDataPo = function(){
	    	$('#qshSHIPPINGNO').textbox('setValue','');
	    	$('#PRDNO').textbox('setValue','');
	    	$('#qMoDtBegin').datebox('setValue','');
	    	$('#qMoDtEnd').datebox('setValue','');
	    	opType="add";
			$("#searchoDialog").dialog("open").dialog('setTitle', "出库单新增");
			queryMoDataByCondition();
			initPickGridData("");
	    },
	    
	    modifyDataMo = function(){
			var checkedItems = $('#propickingOut_tab').datagrid('getSelections'), num = 0,soNo = "";
			$.each(checkedItems, function (index, item) { num++;});
			if (num != 1) {
				commonShowMessage('请选择一条数据进行修改！');
				return false;
			}
			var row = $("#propickingOut_tab").datagrid("getSelected");
	        if (row) {
	        	opType="modify",soNo = row.SHIPPING_NO;
		    	$('#qshSHIPPINGNO').textbox('setValue','');
		    	$('#PRDNO').textbox('setValue','');
		    	$('#qMoDtBegin').datebox('setValue','');
		    	$('#qMoDtEnd').datebox('setValue','');
	 			$("#searchoDialog").dialog("open").dialog('setTitle', "出库单修改");
	 			queryMoDataByCondition();
				initPickGridData(soNo);
	        }
	    },
	    deleteno=function(){
	    	var isSelectedData = validSelectedData('propickingOut_tab', 'Delete');
	    	var selectData =$('#'+pageConfig.gridName).datagrid('getSelected');
            if (!isSelectedData) {
            	commonShowMessage('提示', '请选择一条数据进行删除');
                return;
            }
            $.messager.confirm('确认框', '您确定要删除您所选择的数据?', function (r) {
            	if(r==true){
            		
	    			 reqData ={ IFS :'WMS_ZX00040',SHIPPING_NO:selectData.SHIPPING_NO};
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
	    	});  	
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
	    selectStore = function(){//初始化仓库信息
	    	var reqStore = {
	            url: "/iPlant_ajax",
	            dataType: "JSON",
	            data: {IFS: "WMS_B00030",storeType:'WSTORE-01'},
	            successCallBack: function(a) {
	            	//dataStore = [];
	            	storeList = []
	            	//dataStore.push({"value":"N/A","text":"全部"});
	            	var op = a.RESPONSE[0].RESPONSE_DATA;
	                $.each(op,function(n,obj) {
	                	//dataStore.push({'value':obj.STORE_ID,'text':obj.STORE_NAME});
	                	storeList.push({'value':obj.STORE_ID,'text':obj.STORE_ID+"|"+obj.STORE_NAME});
				    }); 
	                //var qStore = $("#qStore"),qMoStore = $("#qMoStore");
	               // qStore.combobox('loadData',dataStore),
	               // qMoStore.combobox('loadData',dataStore);
	             /*   if(dataStore.length>7){
	                	qStore.combobox({panelHeight:200}),
	                	qMoStore.combobox({panelHeight:200});
					}else{
						qStore.combobox({panelHeight:'auto'}),
						qMoStore.combobox({panelHeight:'auto'});
					}
	                if(dataStore.length>0){
	                	qStore.combobox('select',dataStore[0].value),
	                	qMoStore.combobox('select',dataStore[0].value);
	                }*/
	            },
	            errorCallBack: function() {
	            	commonShowMessage("提示：请联系管理员，查询失败！");
	            }
	        };
		    iplantAjaxRequest(reqStore);
		},
	    queryMoDataByCondition0 = function(){
		    var tabName = 'moDataList_tab',dgrid = $('#'+tabName).datagrid('options');
		    if(!dgrid) return;
		    var qshSHIPPINGNO = $('#qshSHIPPINGNO').textbox('getValue');
		    var qMoDtBegin =$('#qMoDtBegin').datebox('getValue');
		    var qMoDtEnd =$('#qMoDtEnd').datebox('getValue');
		    var PRDNO =$('#PRDNO').textbox('getValue');
		    var reqData ={
		    		BORROW_TYPE:'WBORROWTYPE-02',
			    	BORROW: qshSHIPPINGNO,
			    	MATERIAL_ID: PRDNO,
			    	queryCrtDtBegin: qMoDtBegin,
			    	queryCrtDtEnd: qMoDtEnd,
			        pageIndex:dgrid.pageNumber,
			        pageSize:dgrid.pageSize,
			        B_FLAG:'0',
			        ADT_STATUS:'1',
			        IFS:'WMS_ZX00057'
			    };
		    //dialogWarehouseGrid(ERP_URL, tabName, reqData);
		     dialogDataGrid('/iPlant_ajax', tabName, reqData);
		    //dialogWarehouseDataGrid = function(tabName,reqData, jsonData) {
		     dialogEditorDataGrid = function(tabName,reqData, jsonData) {
		    	
				var columnsTab;
				columnsTab=[
                    {field : "CZ",width : 10,checkbox : true},
					{ field: 'BORROW', title: '单据编号', width: 150 ,align:'center'},
			   		{ field: 'BORROW_TYPE', title: '单据类别', width: 150 ,align:'center',hidden:true},

			   		{ field: 'BORROW_TYPE_NM', title: '单据类别', width: 150 ,align:'center'},
			   		{ field: 'MATERIAL_ID', title: '物料编码', width: 150 ,align:'center'},
			   		{ field: 'MATERIAL_NAME', title: '物料名称', width: 120 ,align:'center'},
			   		
			   		
			   		{ field: 'QTY', title: '数量', width: 100 ,align:'center'},
			   		{ field: 'CUST_NO', title: '客户代码', width: 80 ,align:'center'},
			   		{ field: 'CUST_NAME', title: '客户名称', width: 100 ,align:'center'},
			   		{ field: 'STORE_ID', title: '仓库编码', width: 80 ,align:'center'},
			   		{ field: 'UNIT_NAME', title: '单位名称', width: 100 ,align:'center'},
			   		{ field: 'LOT_NO', title: 'LOT号', width: 120 ,align:'center'},
			   		{ field: 'CRT_NM', title: '制单人', width: 80 ,align:'center'},
			   		/*{ field: 'CRT_ID', title: '制单人', width: 80 ,align:'center',hidden:true},
			   		{ field: 'CRT_DT', title: '制单时间', width: 100 ,align:'center'},*/
			   		{ field: 'SUPPLIER_ID', title: '供应商编码', width: 150 ,align:'center'},
			   		{ field: 'SUPPLIER_NAME', title: '供应商名称', width: 150 ,align:'center'}
			   		
				];
				var gridLists = {
					name: 'moDataList_tab',
					dataType: 'json',
					columns: [columnsTab],
					onDblClickRow: function(index,row){
						var grid = $('#'+tabName);
						grid.datagrid('clearSelections'),grid.datagrid('selectRow',index);
						selectMoDataOk();
		            }
				}
				//initWarehouseDataGridView(reqData, gridLists);initEditorDataGridView
				initEditorDataGridView(reqData, gridLists);
				
				$('#'+tabName).datagrid('loadData', jsonData);
			}
	    },
	    dialogDataGrid0= function (url, gridId, reqData) {
	    /*	if(tbId==""){
	    		tbId=gridId;
	    	}*/
	        var ajaxParam = {
	            url: url,
	            data: reqData,
	            successCallBack: function (data) {
	                if (data) {
	                    if(data.RESPONSE.length>0){
	                    	var rowNum = 0
	                        if(!data.RESPONSE["0"].RESPONSE_HDR) rowNum=0;
	                        else if (data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS) {
	                            rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
	                        }
	                    }
	                    if (rowNum == 0) {
	                       	if(data.RESPONSE["0"].RESPONSE_HDR.MSG_CODE==='SESSION过期或是不存在'){
	                    		$.messager.confirm('确认框', '长时间未操作，请重新登陆', function (r) {
									if(r==true){
	                     	   			window.top.location.href="/Warehouse/Login.html";
	                     	  		}
									return false;
								})
	                     	}
	                    }
	                    var rowCollection = createSourceObj(data);
	                    var jsonData = {
	                        total: rowNum,
	                        rows: rowCollection,
	                        IFS: reqData.IFS,
	                        gridId: gridId
	                    }
	                    for(var p in reqData){
	                    	var name=p;//属性名称 
	                    	if(name=="pageIndex" || name =="pageSize" || name=="rows" || name=="total" ||name=="originalRows"){
	                    		continue;
	                    	}
	                    	var value=reqData[p];//属性对应的值 
	                    	jsonData[name]=reqData[p]; 
	                    }
	                    dialogEditorDataGrid0(gridId,reqData, jsonData);
	                }
	            }
	        }
	        iplantAjaxRequest(ajaxParam);
	    },
	    queryMoDataByCondition = function(){
		    var tabName = pageConfig.gridMoName,dgrid = $('#'+tabName).datagrid('options');
		    if(!dgrid) return;
		    var qshSHIPPINGNO = $('#qshSHIPPINGNO').textbox('getValue');
		    var qMoDtBegin =$('#qMoDtBegin').datebox('getValue');
		    var qMoDtEnd =$('#qMoDtEnd').datebox('getValue');
		    var PRDNO =$('#PRDNO').textbox('getValue');
		    var reqData ={
		    		BORROW_TYPE:'WBORROWTYPE-02',
			    	BORROW: qshSHIPPINGNO,
			    	MATERIAL_ID: PRDNO,
			    	queryCrtDtBegin: qMoDtBegin,
			    	queryCrtDtEnd: qMoDtEnd,
			        pageIndex:dgrid.pageNumber,
			        pageSize:dgrid.pageSize,
			        B_FLAG:'0',
			        ADT_STATUS:'1',
			        IFS:'WMS_ZX00057'
			    };
		    dialogDataGrid('/iPlant_ajax', tabName, reqData);
		    dialogEditorDataGrid = function(tabName,reqData, jsonData) {
				var columnsTab;
				columnsTab=[
				            {field : "CZ",width : 10,checkbox : true},
							{ field: 'BORROW', title: '单据编号', width: 150 ,align:'center'},
					   		{ field: 'BORROW_TYPE', title: '单据类别', width: 150 ,align:'center',hidden:true},

					   		{ field: 'BORROW_TYPE_NM', title: '单据类别', width: 150 ,align:'center'},
					   		{ field: 'MATERIAL_ID', title: '物料编码', width: 150 ,align:'center'},
					   		{ field: 'MATERIAL_NAME', title: '物料名称', width: 120 ,align:'center'},
					   		
					   		
					   		{ field: 'QTY', title: '数量', width: 100 ,align:'center'},
					   		{ field: 'CUST_NO', title: '客户代码', width: 80 ,align:'center'},
					   		{ field: 'CUST_NAME', title: '客户名称', width: 100 ,align:'center'},
					   		{ field: 'STORE_ID', title: '仓库编码', width: 80 ,align:'center'},
					   		{ field: 'UNIT_NAME', title: '单位名称', width: 100 ,align:'center'},
					   		{ field: 'LOT_NO', title: 'LOT号', width: 120 ,align:'center'},
					   		{ field: 'CRT_NM', title: '制单人', width: 80 ,align:'center'},
					   		{ field: 'SUPPLIER_ID', title: '供应商编码', width: 150 ,align:'center'},
					   		{ field: 'SUPPLIER_NAME', title: '供应商名称', width: 150 ,align:'center'}
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
				initEditorDataGridView(reqData, gridLists);
				$('#'+tabName).datagrid('loadData', jsonData);
			}
	    },
	    initPickGridData = function(npickingNo){
	    	var columns = [
                         { field: 'OS_NO', title: '借出单号', width: 160 ,align:'center'},
                         { field: 'QTY', title: '领料数量<font color=red>*</font>', width: 80 ,align:'center',editor:{type:'validatebox',options:{required:true,validType:['numberFloat']}}},
                         { field: 'STORE_ID', title: '领料仓编码', width: 180 ,align:'center',editor:{type:'combobox',options:{valueField:'value',textField:'text',data:storeList,required:true,editable:false}}},

                         { field: 'CUST_NO', title: '客户代码', width: 100 ,align:'center'},
                         { field: 'CUST_NAME', title: '客户名称', width: 150 ,align:'center'},
                         { field: 'MATERIAL_ID', title: '物料编码', width: 150 ,align:'center'},
                         { field: 'MATERIAL_NAME', title: '物料名称', width: 150,align:'center'},
                         { field: 'SHIPPING_NO', title: '出库单号', width: 0,align:'center',hidden:true}
                         ];
	    	var tabName = pageConfig.gridFromMoName;
	    	if(checkNotEmpty(npickingNo)){
				var dgridOp = $('#'+tabName).datagrid('options');
				if(!dgridOp) return;
				var reqData = {
						IFS: 'WMS_ZX00071',
					    SHIPPING_NO: npickingNo,
					    pageIndex:dgridOp.pageNumber,
		                pageSize:dgridOp.pageSize,
					}
				dialogDataGrid0('/iPlant_ajax', tabName, reqData);
				dialogEditorDataGrid0 = function(tabName,reqData, jsonData) {
					var gridLists = {
						name: tabName,
						pagination : false,
						dataType: 'json',
						columns: [columns],
						onEndEdit:function(index,row){/**结束编辑模式的操作*/
							var ed = $(this).datagrid('getEditor', {index: index,field: 'STORE_ID'});
					    	row.STORE_ID = $(ed.target).combobox('getValue');
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
				        	if(field=="QTY" || field=="STORE_ID"){
				        		fmDataGrid.datagrid('selectRow', index).datagrid('beginEdit', index);
				        		editIndex = index;
				        	}else{
				        		endEditing(fmDataGrid);
				        	}
				        }
					}
					initEditorDataGridView(reqData, gridLists);
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
				    	var ed = $(this).datagrid('getEditor', {index: index,field: 'STORE_ID'});
				    	row.STORE_ID = $(ed.target).combobox('getValue');
				    }, 
					onBeforeEdit:function(index,row){ $(this).datagrid('refreshRow', index);},
				    onAfterEdit:function(index,row){ $(this).datagrid('refreshRow', index);},
			        onCancelEdit:function(index,row){ $(this).datagrid('refreshRow', index);},
			        onClickCell: function (index,field,value) {/**单击进入编辑模式*/
			        	var grid = $('#'+tabName),rows = grid.datagrid('getRows'),row = rows[index];
			        	grid.datagrid('clearSelections'),grid.datagrid('selectRow',index);
			        	if(field=="QTY"  || field=="STORE_ID"){
			        		fmDataGrid.datagrid('selectRow', index).datagrid('beginEdit', index);
			        		editIndex = index;
			        	}else{
			        		endEditing(fmDataGrid);
			        	}
			        }
	            });
	    	}
	    },
	    initPickGridData0 = function(prodpickingNo){
	    	var columns = [
				{ field: 'OS_NO', title: '借出单号', width: 160 ,align:'center'},
				{ field: 'QTY', title: '领料数量<font color=red>*</font>', width: 80 ,align:'center',editor:{type:'validatebox',options:{required:true,validType:['numberFloat']}}},
				{ field: 'STORE_ID', title: '领料仓编码', width: 180 ,align:'center',editor:{type:'combobox',options:{valueField:'value',textField:'text',data:storeList,required:true,editable:false}}},

				{ field: 'CUST_NO', title: '客户代码', width: 100 ,align:'center'},
				{ field: 'CUST_NAME', title: '客户名称', width: 150 ,align:'center'},

				//{ field: 'BIL_TYPE', title: '单据类型', width: 140 ,align:'center'},
				//{ field: 'OS_DD', title: '订单日期', width: 140 ,align:'center'},
				//{ field: 'ITM', title: '项次', width: 100 ,align:'center'},
				{ field: 'MATERIAL_ID', title: '物料编码', width: 150 ,align:'center'},
				{ field: 'MATERIAL_NAME', title: '物料名称', width: 150,align:'center'},
				{ field: 'SHIPPING_NO', title: '出库单号', width: 0,align:'center',hidden:true}
				
				/*{ field: 'BOMNO', title: 'BOM代号', width: 0 ,align:'center',hidden:true},
				{ field: 'MODATE', title: '制令日期', width: 0 ,align:'center',formatter: function (value,row,index) {return '<span title='+formatDate(value)+'>'+formatDate(value)+'</span>' },hidden:true},
				{ field: 'PSTOREID', title: '成品入库仓', width: 0 ,align:'center',hidden:true},
				{ field: 'WarehouseNO', title: '健大代号', width: 0 ,align:'center',hidden:true},
				{ field: 'CUSTOMNO', title: '客户代号', width: 0 ,align:'center',hidden:true},
				{ field: 'MODELNO', title: '模具代号', width: 0 ,align:'center',hidden:true},
				{ field: 'DEPTCD', title: '部门', width: 0 ,align:'center',hidden:true},
				{ field: 'CRTID', title: '开单人', width: 0 ,align:'center',hidden:true},
				{ field: 'ITEMNUM', title: '项次', width: 0 ,align:'center',hidden:true},
				{ field: 'BILLTYPE', title: '单据类型', width: 0 ,align:'center'},
				{ field: 'PRODPICKINGNO', title: '领料单号', width: 0 ,align:'center',hidden:true}*/
            ];
	    	if(checkNotEmpty(prodpickingNo)){
				var tabName = 'pickOrderFromMo_tab';
				var dgridOp = $('#'+tabName).datagrid('options');
				if(!dgridOp) return;
				var reqData = {
					IFS: 'WMS_ZX00071',
				    SHIPPING_NO: prodpickingNo,
				    pageIndex:dgridOp.pageNumber,
	                pageSize:dgridOp.pageSize,
				}
				dialogDataGrid('/iPlant_ajax', tabName, reqData);
				dialogEditorDataGrid = function(tabName,reqData, jsonData) {
					var gridLists = {
						name: 'pickOrderFromMo_tab',
						//pagination : false,
						dataType: 'json',
						columns: [columns],
						onEndEdit:function(index,row){
							var ed = $(this).datagrid('getEditor', {index: index,field: 'STORE_ID'});
					    	row.STORE_ID = $(ed.target).combobox('getValue');
						}, /**结束编辑模式的操作*/
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
				        	if(field=="QTY" || field=="STORE_ID"){
				        		//fmDataGrid.datagrid('selectRow', index).datagrid('beginEdit', index);
				        		$('#'+tabName).datagrid('selectRow', index).datagrid('beginEdit', index);
				        		editIndex = index;
				        	}else{
				        		endEditing($('#'+tabName));
				        	}
				        }
					}
					initEditorDataGridView(reqData, gridLists);
					//fmDataGrid.prodpickingNo = prodpickingNo;
					//fmDataGrid.datagrid('loadData', jsonData);
					$('#'+tabName).datagrid('loadData', jsonData);
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
				    	var ed = $(this).datagrid('getEditor', {index: index,field: 'STORE_ID'});
				    	row.STORE_ID = $(ed.target).combobox('getValue');
				    }, 
					onBeforeEdit:function(index,row){ $(this).datagrid('refreshRow', index);},
				    onAfterEdit:function(index,row){ $(this).datagrid('refreshRow', index);},
			        onCancelEdit:function(index,row){ $(this).datagrid('refreshRow', index);},
			        onClickCell: function (index,field,value) {/**单击进入编辑模式*/
			        	if(field=="QTY"||field=="STORE_ID"){
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
    						if(samePickStoreid(selected[i],rows)){
    						if(sameMoPickOrder(selected[i],rows)){
    								setDataGridValue(selected[i],i);
    					 }
    						else{
    							
    	    					    showMessage.html("<font color=red>提示：已勾选过得借出单，不会重复出现在列表！</font>");
    	     			    		return false; 
    	    					 
    						}
    					}else{
    						showMessage.html("<font color=red>提示：请选择同一领料仓库信息！</font>");
				    		return false;
    					}
    					}
    					else{
    						showMessage.html("<font color=red>提示：请选择客户代码相同信息！</font>");
    			    		return false;
    					}
	    			}else{
	    				setDataGridValue(selected[i],i);
	    			}
		    	}
	    		showMessage.html("");
	    	}else{
	    		showMessage.html("<font color=red>提示：请选择销售订单信息！</font>");
	    		return false;
	    	}
	    },
	    setDataGridValue = function(data,num){
	    	var prodpickingNo = "";
	    	if(checkNotEmpty(fmDataGrid.prodpickingNo)){
	    		prodpickingNo = fmDataGrid.prodpickingNo;
	    	}
	    	fmDataGrid.datagrid("insertRow", {row: {index: num,OS_NO:data.BORROW,QTY:data.QTY,CUST_NO:data.CUST_NO,CUST_NAME:data.CUST_NAME,MATERIAL_ID:data.MATERIAL_ID,MATERIAL_NAME:data.MATERIAL_NAME,STORE_ID:data.STORE_ID}});
	    	editIndex = num;
	    },
	    compareSelectDataGrid = function(selected,rows){
	    	var target = true;
	    	if(rows.length>0){
	    		for(var i=0;i<rows.length;i++){
	    			if(selected.CUST_NO!=rows[i].CUST_NO ){
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
	    			if(selected.BORROW == rows[i].OS_NO/*&&selected.CUST_NO==rows[i].CUST_NO&&selected.MATERIAL_ID == rows[i].MATERIAL_ID&&selected.MATERIAL_NAME == rows[i].MATERIAL_NAME*/){
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
	    			if(selected.PRD_NO != rows[i].PRD_NO){
	    				target = false;
	    	    	}
		    	}
	    	}
	    	return target;
	    },
	    samePickStoreid = function(selected,rows){
	    	var target = true;
	    	if(rows.length>0){
	    		for(var i=0;i<rows.length;i++){
	    			if(selected.STORE_ID != rows[i].STORE_ID){
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
	    checkDataValid = function(){
	    	endEditing(fmDataGrid);
	    	var rows = fmDataGrid.datagrid('getRows'),target = false;
	    	if(rows.length>0){
	    		for(var i=0;i<rows.length;i++){
	    			if(checkNotEmpty(rows[i].QTY)){
	    				if(rows[i].QTY!="0"){
	    					showMessage.html("");
		    				target = true;
	    				}else{
	    					showMessage.html("<font color=red>提示：数量不能为0！</font>");
	    					return false;
	    				}
	    			}else{
	    				showMessage.html("<font color=red>提示：数量不能为空！</font>");
	    				return false;
	    			}
	    		}
	    	}else{
	    		showMessage.html("<font color=red>提示：请选择销售单数据！</font>");
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
            		if(!checkMaterialInfo(material[i].MATERIALID)){
            			return false;
            		}
            	}
	    	}
	    	return true;
	    },
	    
	    savePickOrderOut=function(){
	    	endEditing(fmDataGrid);
	    	var row0 = $("#"+pageConfig.gridName).datagrid("getSelected");
	    	var inserted = fmDataGrid.datagrid('getChanges', "inserted");
            var updated = fmDataGrid.datagrid('getChanges', "updated");
            var deleted = fmDataGrid.datagrid('getChanges', "deleted");
	    	var rows = fmDataGrid.datagrid('getRows');
	    	var id='';
	    	var ids='';
	    	var row='';
	    	var arrInsert = new Array();arrUpdate = new Array();arrDelete = new Array();
	    	 if(opType=="add"){
	    	if(inserted.length>0){
	    	for(var i=0;i<inserted.length;i++){
	    		 var qty=inserted[i].QTY;
	    		 var ITM=inserted[i].ITM;
				 row=inserted[i].OS_NO+','+inserted[i].QTY+','+inserted[i].CUST_NO+','+inserted[i].CUST_NAME+','+inserted[i].STORE_ID+','+inserted[i].MATERIAL_ID+','+inserted[i].MATERIAL_NAME;
				 if(i==(inserted.length-1)){
					 id=id+row;
				 }
				 else{
					 id=id+row+"|";	 
				    }
			     }
	    	
	    	var ajaxparam={
					 url: '/iPlant_ajax',
	                 dataType: 'JSON',
	                 data: {
	 
	                	 INPUTINSERTS: id,
	                	 INPUTUPDATE:'',
	                	 SHIPPINGNO:'N',
	                	 ADDORUPDATE:'ADD',
	                	 IFS: 'WMS_ZX00069'
	                 },
	                 successCallBack: function (data) {
	         	    	$('#searchoDialog').dialog('close');
	         	    	commonShowMessage('出货单新增成功');
	         	    	 queryDataByCondition();
	                     return;
	                 }
			};
	    	iplantAjaxRequest(ajaxparam);
	    	}
	     }
	     if(opType=="modify"){
	    	   // var SHIPPINGNO= inserted[0].SHIPPING_NO;
	    		if(inserted.length>0){
	    	    	for(var i=0;i<inserted.length;i++){
	    	    		 var qty=inserted[i].QTY;
	    	    		 var ITM=inserted[i].ITM;
	    				 row=inserted[i].OS_NO+','+inserted[i].QTY+','+inserted[i].CUST_NO+','+inserted[i].CUST_NAME+','+inserted[i].STORE_ID+','+inserted[i].MATERIAL_ID+','+inserted[i].MATERIAL_NAME;
	    				 if(i==(inserted.length-1)){
	    					 id=id+row;
	    				 }
	    				 else{
	    					 id=id+row+"|";	 
	    				    }
	    			     }
	    	    	
	    	    	var ajaxparam={
	    					 url: '/iPlant_ajax',
	    	                 dataType: 'JSON',
	    	                 data: {
	    	 
	    	                	 INPUTINSERTS: id,
	    	                	 INPUTUPDATE:'',
	    	                	 ADDORUPDATE:'ADD',
	    	                	 SHIPPINGNO:row0.SHIPPING_NO,
	    	                	 IFS: 'WMS_ZX00069'
	    	                 },
	    	                 successCallBack: function (data) {
	    	         	    	$('#searchoDialog').dialog('close');
	    	         	    	 queryDataByCondition();
	    	                     return;
	    	                 }
	    			};
	    	    	iplantAjaxRequest(ajaxparam);
	    	    	}
	    		if(updated.length>0){
	    	    	for(var i=0;i<updated.length;i++){
	    	    		 var qty=updated[i].QTY;
	    	    		 var ITM=updated[i].ITM;
	    				 row=updated[i].OS_NO+','+updated[i].QTY+','+updated[i].CUST_NO+','+updated[i].CUST_NAME+','+updated[i].STORE_ID+','+updated[i].MATERIAL_ID+','+updated[i].MATERIAL_NAME;
	    				 if(i==(updated.length-1)){
	    					 ids=ids+row;
	    				 }
	    				 else{
	    					 ids=ids+row+"|";	 
	    				    }
	    			     }
	    	    	
	    	    	var ajaxparam={
	    					 url: '/iPlant_ajax',
	    	                 dataType: 'JSON',
	    	                 data: {
	    	 
	    	                	 INPUTINSERTS: '',
	    	                	 INPUTUPDATE:ids,
	    	                	 ADDORUPDATE:'UPDATE',
	    	                	 SHIPPINGNO:row0.SHIPPING_NO,
	    	                	 IFS: 'WMS_ZX00069'
	    	                 },
	    	                 successCallBack: function (data) {
	    	         	    	$('#searchoDialog').dialog('close');
	    	         	    	 queryDataByCondition();
	    	                     return;
	    	                 }
	    			};
	    	    	iplantAjaxRequest(ajaxparam);
	    	    	}
	    		if(deleted.length>0){
	    	    	for(var i=0;i<deleted.length;i++){
	    	    		arrDelete.push(deleted[i]);
	    			     }
	    	    	
	    	    	var ajaxparam={
	    					 url: '/iPlant_ajax',
	    	                 dataType: 'JSON',
	    	                 data: {
	    	 
	    	                	 IFS:"WMS_ZX00045",list:arrDelete,SHIPPINGNO:row0.SHIPPING_NO
	    	                 },
	    	                 successCallBack: function (data) {
	    	         	    	$('#searchoDialog').dialog('close');
	    	         	    	 queryDataByCondition();
	    	                     return;
	    	                 }
	    			};
	    	    	iplantAjaxRequest(ajaxparam);
	    	    	}
	    		$('#searchoDialog').dialog('close'); 
	    		commonShowMessage('出货单修改成功');
	        }	
	    
	    }
	   
	    validSelectedData = function (gridName,type) {
            var checkedItems = $('#' + gridName).datagrid('getSelections'),num = 0;
            $.each(checkedItems, function (index, item) { num++;});
            if (type == 'modify') {
                if (num != 1) { return false;}
            } else {
                if (num <= 0) { return false;}
            }
            return true;
        }
      
	
    }    
    pickOrderOut.prototype = {
        init: function () {
            $(function () {
            	showMessage = $("#showMessageInfo"),opType="",fmDataGrid = $('#'+pageConfig.gridFromMoName),editIndex = undefined,storeList=[];
            	initGridData();
            	$('#btnSearch').click(function(){ var dgrid=$('#'+pageConfig.gridName).datagrid('options'); dgrid.pageNumber = 1;queryDataByCondition(); });
            	$('#btnSearchMo').click(function(){ var dgrid=$('#'+pageConfig.gridMoName).datagrid('options'); dgrid.pageNumber = 1,queryMoDataByCondition(); });
            	$('#btnReset').click(function(){ setQueryNull();  });
            	$('#btnResetMo').click(function(){ setQueryMoNull();  });
            	$('#btnAdd').click(function(){ addDataPo();  });
            	$('#btnDelete').click(function(){ deleteno();  });
            	$('#btnUpdate').click(function(){ modifyDataMo();  });
            	$('#btnMoAdd').click(function(){ selectMoDataOk();  });
            	$('#btnMoDelete').click(function(){ delMoDataList();  });
            	$('#btnDelete').click(function(){ deleteOutputBill();  });
            	$('.panel-tool-close').click(function(){ setDataNull();  });
            });
        }
	}
    var poo = new pickOrderOut();
    poo.init();
})();
