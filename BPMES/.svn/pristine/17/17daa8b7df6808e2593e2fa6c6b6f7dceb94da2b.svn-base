/* 启动时加载 */
/*
 */
(function() {
	function TrayInfo2() {
		var dataWAREHOUSE = new Array();
			dataWAREHOUSE = [];
		var dataSTORE = new Array();
			dataSTORE = [];
		var dataSHELF = new Array();
			dataSHELF = [];
		var dataPOSITION = new Array();
			dataPOSITION = [];
		
		/**初始化公司combobox内容*/
		initGridData = function() {
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			var reqData = {
				IFS: 'WMS_C000011',
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'TaryInfo_tab', reqData);
		}
		
		//仓库下拉框查询
		var WAREHOUSE = {
			
                url: "/iPlant_ajax",
                dataType: "JSON",
                data: {IFS: "WMS_B000006"},
                successCallBack: function(a) {
                	var op = a.RESPONSE[0].RESPONSE_DATA;
                	
                    $.each(op,function(n,obj) {
                    	dataWAREHOUSE.push({'value':obj.WAREHOUSE_ID,'text':obj.WAREHOUSE_NAME});
				    });  
                },
                errorCallBack: function() {
                    $.messager.alert("提示", '请联系管理员，查询失败！')
                }
            };
			iplantAjaxRequest(WAREHOUSE)	
		

	    //储区下拉框查询
		var STORE = {
                url: "/iPlant_ajax",
                dataType: "JSON",
                data: {IFS: "WMS_C000008"},
                successCallBack: function(a) {
                	var op = a.RESPONSE[0].RESPONSE_DATA;
                	
                    $.each(op,function(n,obj) {
                    	dataSTORE.push({'value':obj.STORE_ID,'text':obj.STORE_NAME});
				    });  
                },
                errorCallBack: function() {
                    $.messager.alert("提示", '请联系管理员，查询失败！')
                }
            };
			iplantAjaxRequest(STORE)	
		
		//货架下拉框查询	
		var SHELF = {
                url: "/iPlant_ajax",
                dataType: "JSON",
                data: {IFS: "WMS_C000009"},
                successCallBack: function(a) {
                	var op = a.RESPONSE[0].RESPONSE_DATA;
                    $.each(op,function(n,obj) {
                    	dataSHELF.push({'value':obj.SHELF_ID,'text':obj.SHELF_NAME});
				    });  
                },
                errorCallBack: function() {
                    $.messager.alert("提示", '请联系管理员，查询失败！')
                }
            };
			iplantAjaxRequest(SHELF)		
			
		//货位下拉框查询	
		var POSITION = {
                url: "/iPlant_ajax",
                dataType: "JSON",
                data: {IFS: "WMS_C0000010"},
                successCallBack: function(a) {
                	var op = a.RESPONSE[0].RESPONSE_DATA;
                    $.each(op,function(n,obj) {
                    	dataPOSITION.push({'value':obj.POSITION_ID,'text':obj.POSITION_NAME});
				    });  
                },
                errorCallBack: function() {
                    $.messager.alert("提示", '请联系管理员，查询失败！')
                }
            };
			iplantAjaxRequest(POSITION)	
					
	singleWareNotice =function(){
			$('#singleWareNoticeDetail').datagrid({
                /*fitColumns:true,*/
                singleSelect:true,
                rownumbers:true,
                loadMsg:'',
                title:'物料信息',
//                height:'auto',
				columns:[[					
					{field:'MATERIA_ID',title:'物料编号',width:120,align:'center'},
					{field:'MATERIA_NAME',title:'物料名称',width:150,align:'center'},
					{field:'WAREHOUSE_ID',title:'仓库<span style="color:red">*</span>',width:150,align:'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.STORE_ID  || value)+ "</span>";},
						   editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataWAREHOUSE,
							   onHidePanel : function() {
	                               myprodValue = $(this).combobox('getText');  
	                               myprodName=$(this).combobox('getValue');
						            var row = $('#singleWareNoticeDetail').datagrid('getSelected');
							        if (row) {
							            var i=$('#singleWareNoticeDetail').datagrid('getRowIndex',row);
							            var td=$('.datagrid-body .datagrid-row td[field="STORE_ID"]')[i];
							            var div = $(td).find('input')[0];
							            
							            ajaxParam={
					                            url:'/iPlant_ajax',
					                            data:{
					                                IFS:'WMS_B00020',
					                                WAREHOUSE_ID:myprodName,
					                            },
					                            successCallBack:function(data){
					                            	var rowCollection=createSourceObj(data);
					                               //初始化货架关联数据
					                            	$(div).combobox({
				                                	   data:rowCollection,
				                                       valueField:'STORE_ID',  
				                                       textField:'STORE_NAME',
				                                   });                                                                                   
					                            }
				                           }
				                           iplantAjaxRequest(ajaxParam);
							              
							        }
							    },  
						   }}},
					{field:'STORE_ID',title:'储区<span style="color:red">*</span>',width:150,align:'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.STORE_ID  || value)+ "</span>";},
						   editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataSTORE,
							   onHidePanel : function() {
	                               myprodValue = $(this).combobox('getText');  
	                               myprodName=$(this).combobox('getValue');
						            var row = $('#singleWareNoticeDetail').datagrid('getSelected');
							        if (row) {
							            var i=$('#singleWareNoticeDetail').datagrid('getRowIndex',row);
							            var td=$('.datagrid-body .datagrid-row td[field="SHELF_ID"]')[i];
							            var div = $(td).find('input')[0];
							            
							            ajaxParam={
					                            url:'/iPlant_ajax',
					                            data:{
					                                IFS:'WMS_B000018',
					                                STORE_ID:myprodName,
					                            },
					                            successCallBack:function(data){
					                            	var rowCollection=createSourceObj(data);
					                               //初始化货架关联数据
					                            	$(div).combobox({
				                                	   data:rowCollection,
				                                       valueField:'SHELF_ID',  
				                                       textField:'SHELF_NAME',
				                                   });                                                                                   
					                            }
				                           }
				                           iplantAjaxRequest(ajaxParam);
							              
							        }
							    },  
						   }}},
					{field:'SHELF_ID',title:'货架<span style="color:red">*</span>',width:150,align:'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.SHELF_ID  || value)+ "</span>";},
							   editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataSHELF,
								   onHidePanel : function() {
		                               myprodValue = $(this).combobox('getText');  
		                               myprodName=$(this).combobox('getValue');
							            var row = $('#singleWareNoticeDetail').datagrid('getSelected');
								        if (row) {
								            var i=$('#singleWareNoticeDetail').datagrid('getRowIndex',row);
								            var td=$('.datagrid-body .datagrid-row td[field="POSITION_ID"]')[i];
								            var div = $(td).find('input')[0];
								            
								            ajaxParam={
						                            url:'/iPlant_ajax',
						                            data:{
						                                IFS:'WMS_B00028',
						                                SHELF_ID:myprodName,
						                            },
						                            successCallBack:function(data){
						                            	var rowCollection=createSourceObj(data);
						                               //初始化货架关联数据
						                            	$(div).combobox({
					                                	   data:rowCollection,
					                                       valueField:'POSITION_ID',  
					                                       textField:'POSITION_NAME',
					                                   });                                                                                   
						                            }
					                           }
					                           iplantAjaxRequest(ajaxParam);
								        }
								    },  
					 }}},				
					{field:'POSITION_ID',title:'货位<span style="color:red">*</span>',width:150,align:'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.POSITION_ID  || value)+ "</span>";},
								   editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataPOSITION,
									   
						 }}},												   
					{field:'PURCHASE_NUMBER',title:'订单数量',width:100,align:'center'},
					{field:'UNIT_NAME',title:'单位',width:100,align:'center'},
					{field:'SUP_NM',title:'供应商',width:150,align:'center'},
				]],
//				data:[
//					{ MATERIA_ID:'',MATERIA_NAME:'',STORE_ID:'',SHELF_ID:'',POSITION_ID:'',PURCHASE_NUMBER:'',UNIT_ID:'',SUPPLIER_ID:''},
//				],
				/**进入编辑模式的操作*/
			     onBeforeEdit:function(index,row){
			    	 showmessage.html('');
			    	 row.editing = true;
			    	 row.edited = false;
			    	 oldRow = JSON.stringify(row).replace(reg,'\"\"');
			    	 $(this).datagrid('refreshRow', index);
			     },

		        /**单击进入编辑模式*/
			    onClickRow: function (index, row) {
			    	$('#singleWareNoticeDetail').datagrid('beginEdit',index);
				},
					});
				},
		initWareHeader =function(){
			$('#wareHeaderDetail').datagrid({
            	title:'订单表头',
                loadMsg:'',
                height:'280px',
                columns:[[
						{field:'AHeader',title:'订单编号',width:100,align:'center',editor:'text'},
						{field:'BHeader',title:'单据日期',width:150,align:'center',editor:'datetimebox'},
						{field:'CHeader',title:'供应商编码',width:150,align:'center',editor:'text'},		
						{field:'DHeader',title:'供应商名称',width:150,align:'center',editor:'text'},
						{field:'EHeader',title:'联系人',width:100,align:'center',editor:'text'},
						{field:'FHeader',title:'联系电话',width:100,align:'center',editor:'text'},
						{field:'GHeader',title:'制单人',width:100,align:'center',editor:'text'},
						{field:'HHeader',title:'预计到账日期',width:100,align:'center',editor:'text',hidden:true},
                ]],
                
            });
		}
		
		wareHeader =function(){
			           
						var orderID = $("#orderID").textbox('getValue');						
						var supplierId = $("#supplierId").textbox('getValue');
						var materialId = $("#materialId").textbox('getValue');
						var beginDate = $("#beginDate").datetimebox('getValue');
						var stopDate = $("#stopDate").datetimebox('getValue');
	                    var rowCollection2=[];
	                    var ajaxParam2 = {
	                        url: '/iPlant_ajax',
	                        data: {
	                			IFS: 'WMS_C000025',	                		
	                			ORDER_ID:orderID,
	                			SUPPLIER_ID:supplierId,
	                			MATERIA_ID:materialId,
	                			START_DATE:beginDate,
	                			END_DATE:stopDate,
	
	                        },
	                        successCallBack: function(data) {
	                            var rowNum = 0;
	                            for(var i=0;i<data.RESPONSE["0"].RESPONSE_DATA.length;i++){
	                            	rowCollection2.push({
	                            		AHeader:data.RESPONSE["0"].RESPONSE_DATA[i].ORDER_ID,
	                            		BHeader:data.RESPONSE["0"].RESPONSE_DATA[i].CREATE_DATE,
	                            		CHeader:data.RESPONSE["0"].RESPONSE_DATA[i].SUPPLIER_ID,
	                            		DHeader:data.RESPONSE["0"].RESPONSE_DATA[i].SUP_NM,
	                            		EHeader:data.RESPONSE["0"].RESPONSE_DATA[i].CT_MN,
	                            		FHeader:data.RESPONSE["0"].RESPONSE_DATA[i].PN_NB,
	                            		GHeader:data.RESPONSE["0"].RESPONSE_DATA[i].EMP_NM,
	                            		HHeader:data.RESPONSE["0"].RESPONSE_DATA[i].P_DELIVE_DATE,
	                            	});
	                            }
	                            
	                            $('#wareHeaderDetail').datagrid({
	                            	title:'订单表头',
	                                data:rowCollection2,
	                                columns:[[
											{field:'AHeader',title:'订单编号',width:100,align:'center',editor:'text'},
											{field:'BHeader',title:'单据日期',width:150,align:'center',editor:'datetimebox'},
											{field:'CHeader',title:'供应商编码',width:100,align:'center',editor:'text'},		
											{field:'DHeader',title:'供应商名称',width:100,align:'center',editor:'text'},
											{field:'EHeader',title:'联系人',width:100,align:'center',editor:'text'},
											{field:'FHeader',title:'联系电话',width:100,align:'center',editor:'text'},
											{field:'GHeader',title:'制单人',width:100,align:'center',editor:'text'},
											{field:'HHeader',title:'预计到货日期',width:100,align:'center',editor:'datetimebox',hidden:true},
	                                ]], 
	                            });
	                            expanddata(); 
	                        }
	                    }
	                    iplantAjaxRequest(ajaxParam2);   
	}	
		expanddata = function(){
			
            $('#wareHeaderDetail').datagrid({
                view: detailview,
                detailFormatter:function(index,row){
                    return '<div style="padding:2px"><table id="'+'cctabID'+index+'" class="ddv"></table></div>';
                },
                onExpandRow: function(index,row){
                	tbID=index;
                	var rowCollection=[];
                	var ddv = $(this).datagrid('getRowDetail',index).find('table.ddv');
                	var ORDER2='1';
                	
                    var ajaxParam = {
                        url: '/iPlant_ajax',
                        data: {
                        	ORDER_ID:row.AHeader,
                        	/*SUPPLIER_ID:row.CHeader,*/
                            IFS: 'WMS_C000032'
                        },
                        successCallBack: function(data) {
                            var rowNum = 0;
                            for(var i=0;i<data.RESPONSE["0"].RESPONSE_DATA.length;i++){
                            	rowCollection.push({
                            		Atd:data.RESPONSE["0"].RESPONSE_DATA[i].MATERIA_ID,
                            		Btd:data.RESPONSE["0"].RESPONSE_DATA[i].ITEM_NM,
                            		Ctd:data.RESPONSE["0"].RESPONSE_DATA[i].PURCHASE_NUMBER,
                            		Dtd:data.RESPONSE["0"].RESPONSE_DATA[i].DELIVE_NUMBER,
                            		Etd:data.RESPONSE["0"].RESPONSE_DATA[i].UNIT_ID,
                            		Ftd:data.RESPONSE["0"].RESPONSE_DATA[i].UNIT_NAME
                            	});
                            }
                            var jsonData = {
                                total: rowNum,
                                rows: rowCollection
                            }                           
                            ddv.datagrid({
                            	title:'订单明细',
                                data:rowCollection,
                                fitColumns:true,
                                rownumbers:true,
                                loadMsg:'',
                                columns:[[                                      
										{field:'Atd',title:'物料编号',width:100,align:'center',editor:'text'},
										{field:'Btd',title:'物料名称',width:100,align:'center',editor:'text'},
										{field:'Ctd',title:'订单数量',width:100,align:'center',editor:'numberbox'},
										{field:'Dtd',title:'到货数量',width:100,align:'center',editor:'numberbox'},
										{field:'Etd',title:'单位',width:100,align:'center',editor:'text'},
										{field:'Ftd',title:'单位名称',width:100,align:'center',editor:'text'},
                                ]],
                                data:rowCollection,
                                onResize:function(){
                                    $('#wareHeaderDetail').datagrid('fixDetailRowHeight',index);
                                },
                                onLoadSuccess:function(){
                                    setTimeout(function(){
                                        $('#wareHeaderDetail').datagrid('fixDetailRowHeight',index);
                                    },0);
                                }
                            });
                            $('#wareHeaderDetail').datagrid('fixDetailRowHeight',index);                           
                        }
                    }
                    iplantAjaxRequest(ajaxParam);
                    }
            })
        }
		
		getSerchData =function(){
			var index =$('#wareHeaderDetail').datagrid('getRowIndex', $("#wareHeaderDetail").datagrid('getSelected'));
			var myId ='cctabID'+index;
			console.log(index);
			var headData=$('#wareHeaderDetail').datagrid('getSelected');
			var row = $('#wareHeaderDetail').datagrid('getSelected');
			$("#orderId").textbox("setValue",row.AHeader);  		//获取订单表头采购单号		
			$("#orderID").textbox("setValue",row.AHeader);
			$('#createrId').textbox("setValue",row.GHeader); 		//获取订单表头制单人
			$('#createDate').datetimebox("setValue",row.BHeader); 	//获取订单表头单据日期
			$('#pDiliveDate').datetimebox("setValue",row.HHeader); 	//获取订单表头预计到货日期
			var detailData=$('#'+myId).datagrid('getData');
			console.log(detailData);
			
/*			if(detailData.length <1){
				$.messager.alert('提示', "请选择要导入的数据");
				return;
			}
			*/
			$('#queryTab2').dialog('close');
			for(var i=0; i<detailData.rows.length;i++){
				$('#singleWareNoticeDetail').datagrid('insertRow',{
					index: 0,	// 索引从0开始
					row: {
						MATERIA_ID: detailData.rows[i].Atd,
						MATERIA_NAME: detailData.rows[i].Btd,
						WAREHOUSE_ID:"",
						STORE_ID:"",
						SHELF_ID:"",
						POSITION_ID:"",
						PURCHASE_NUMBER:detailData.rows[i].Ctd,
						DELIVE_NUMBER:detailData.rows[i].Dtd,   
						UNIT_NAME:detailData.rows[i].Ftd,
						SUP_NM:row.DHeader
					}
				});
			}
			
		}
		
		var editIndex = undefined;
		endEditing = function(){
			if (editIndex == undefined){return true}
			if(unitType==0){
        		if ($('#singleWareNoticeDetail').datagrid('validateRow', editIndex)){
					$('#singleWareNoticeDetail').datagrid('endEdit', editIndex);
					editIndex = undefined;
					return true;
				} else {
					return false;
				}	
        	}
			
		}
		
		onClickRow =function(index, field){
            if (editIndex != index){
            	if (endEditing()){
    				if(unitType==0){
    					$('#singleWareNoticeDetail').datagrid('selectRow', index).datagrid('beginEdit', index);
		                var ed = $('#singleWareNoticeDetail').datagrid('getEditor', {index:index,field:field});
		                if (ed){
		                    ($(ed.target).data('textbox') ? $(ed.target).textbox('textbox') : $(ed.target)).focus();
		                }
		                editIndex = index;
    				}
    			}
            }
        }
		
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'TaryInfo_tab',
				dataType: 'json',
				columns: [[
					{field: 'CHECKIN_ID',title: '入库单号',width: 100,align: 'center'}, 
					{field: 'ORDER_ID',title: '订单编号',width: 100,align: 'center'},
					{field: 'PURCHASE_NUMBER',title: '订单数量',width: 80,align: 'center'},
					{field: 'DELIVE_NUMBER',title: '到货数量',width: 80,align: 'center'},
					{field: 'MATERIA_ID',title: '物料编码',width: 100,align: 'center'},
					{field: 'ITEM_NM',title: '物料名称',width: 150,align: 'center'},
					{field: 'WAREHOUSE_NAME',title: '仓库',width: 150,align: 'center'},
					{field: 'STORE_NAME',title: '储区',width: 150,align: 'center'},
					{field: 'SHELF_NAME',title: '货架',width: 150,align: 'center'},
					{field: 'POSITION_NAME',title: '货位',width: 150,align: 'center'},
					{field: 'UNIT_NAME',title: '计量单位',width: 100,align: 'center'},
					{field: 'EMP_NM',title: '制单人',width: 100,align: 'center'},
					{field: 'SUP_NM',title: '供应商',width: 150,align: 'center'}, 
					{field: 'CT_MN',title: '联系人',width: 100,align: 'center'},
					{field: 'PN_NB',title: '联系电话',width: 150,align: 'center'},
					{field: 'P_DELIVE_DATE',title: '预计到账日期',width: 150,align: 'center'},
					{field: 'CHECK_IN_DATE',title: '入库通知日期',width: 150,align: 'center'},
					{field: 'CREATE_DATE',title: '单据日期',width: 150,align: 'center'},
					
				]],				
								
				   /**进入编辑模式的操作*/
			     onBeforeEdit:function(index,row){
			    	 showmessage.html('');
			    	 row.editing = true;
			    	 row.edited = false;
			    	 oldRow = JSON.stringify(row).replace(reg,'\"\"');
			    	 $(this).datagrid('refreshRow', index);
			     },
			     /**编辑模式进入之后的操作*/
			     onAfterEdit:function(index,row){
			    	 /**判断是否进行数据变更*/
			    	 var temp = JSON.stringify(row).replace(reg,'\"\"');
			    	 if(temp!=oldRow){
			    		 row.edited = true;
			    	 }
			    	 row.editing = false;
			    	 $(this).datagrid('refreshRow', index);
			     },
		        onCancelEdit:function(index,row){
		            row.editing = false;
		            $(this).datagrid('refreshRow', index);
		        },
		        /**单击进入编辑模式*/
			    onClickRow: function (index, row) {
		       /* *//**双击进入编辑模式*//*
		        onDblClickRow: function (index, row) {*/
			    	if (editIndex != index){
			    		var ed,fc,editorFt;
		
			    	}
	            }
			}
			initGridView(reqData, gridList);
			dataGrid.datagrid('loadData', jsonData);
		}
		
		
		
		//清空表单数据
		setDataNull =function(){
			$("#orderId").textbox("setValue",'');  		
			$("#orderID").textbox("setValue",'');
			$('#createrId').textbox("setValue",''); 		
			$('#createDate').datetimebox("setValue",''); 	
			$('#pDiliveDate').datetimebox("setValue",''); 
			$("#ORDER_ID").textbox('setValue','');
		    $("#MATERIA_ID").combobox('setValue','');
			$('#START_DATE').datetimebox('setValue','');		
		    $('#END_DATE').datetimebox('setValue','');
		    $('#ITEM_NM').textbox('setValue','');
		    $('#SUP_NM').textbox('setValue','');
			$('#CT_MN').textbox('setValue','');
			$('#PN_NB').textbox('setValue','');
			/*$('#ORDER_ID').textbox('setValue','');*/
			var item = $('#singleWareNoticeDetail').datagrid('getRows');
            if (item) {
                for (var i = item.length - 1; i >= 0; i--) {
                    var index = $('#singleWareNoticeDetail').datagrid('getRowIndex', item[i]);
                    $('#singleWareNoticeDetail').datagrid('deleteRow', index);
                }
            }
            var item2 = $('#wareHeaderDetail').datagrid('getRows');
            if (item2) {
                for (var i = item2.length - 1; i >= 0; i--) {
                    var index = $('#wareHeaderDetail').datagrid('getRowIndex', item[i]);
                    $('#wareHeaderDetail').datagrid('deleteRow', index);
                }
            }
        }
				
		var unitUse;
		var unitList =[];
		
		//保存前的校验
		checkDataValid = function() {
        	 var target = true,
        	 a = $("#orderId").textbox('getValue'),
        	 b = $("#pDiliveDate").datetimebox('getValue'),
             c = $("#checkInId").textbox('getValue'),
        	 d= $("#checkInDate").datetimebox('getValue')
        	 if ("" == a || "" == b ||""==d) {
        		$.messager.alert("提示", "请添加必选信息");
            	target=false;
        	 }else {
        		return target;
        	}
       }
		
		//保存新增入库通知单
        singleSavaWareNotice =function(){
        	var myIndex = $('#singleWareNoticeDetail').datagrid('getRowIndex',$('#singleWareNoticeDetail').datagrid('getSelected'));
        	console.log(myIndex);
        	$('#singleWareNoticeDetail').datagrid('endEdit',myIndex);
        	var orderId=$("#orderId").textbox("getValue");  		//获取订单表头采购单号		
			var createrId=$('#createrId').textbox("getValue"); 		//获取订单表头制单人
			var createDate=$('#createDate').datetimebox("getValue"); 	//获取订单表头单据日期
			var pDiliveDate=$('#pDiliveDate').datetimebox("getValue"); 	//获取订单表头预计到货
			var checkInId=$('#checkInId').textbox("getValue");          //获取订单表头入库单号
			var checkInDate=$('#checkInDate').datetimebox("getValue"); 	
        	if(!checkDataValid()){
				return false;
			}
        	var ccList =$('#singleWareNoticeDetail').datagrid('getRows');//[][]数据
        	for(var i=0;i<ccList.length;i++){
        		$('#singleWareNoticeDetail').datagrid('endEdit',i);
        	}
        	var sendList =$('#singleWareNoticeDetail').datagrid('getRows');
        	//校验物料信息
        	for(var i=0;i<sendList.length;i++){
        		if(sendList[i].WAREHOUSE_ID == "" || sendList[i].WAREHOUSE_ID == null){
        			$.messager.alert('提示', "请选择仓库");
        			$('#singleWareNoticeDetail').datagrid('beginEdit',i);
    				return;
        		}
        		if(sendList[i].STORE_ID == "" || sendList[i].STORE_ID == null){
        			$.messager.alert('提示', "请选择储区");
        			$('#singleWareNoticeDetail').datagrid('beginEdit',i);
    				return;
        		}
        		if(sendList[i].SHELF_ID == "" || sendList[i].SHELF_ID == null){
        			$.messager.alert('提示', "请选择货架");
        			$('#singleWareNoticeDetail').datagrid('beginEdit',i);
    				return;
        		}
        		if(sendList[i].POSITION_ID == "" || sendList[i].POSITION_ID == null){
        			$.messager.alert('提示', "请选择货位");
        			$('#singleWareNoticeDetail').datagrid('beginEdit',i);
    				return;
        		}
        		unitList[i]={
        			CHECKIN_ID:checkInId,     
        			CHECK_IN_DATE:checkInDate,
        			ORDER_ID:orderId,                               //采购单号 	 
        			CREATER_ID:createrId,							//制单人
        			CREATE_DATE:createDate,							//制单日期
        			DELIVE_NUMBER:sendList[i].DELIVE_NUMBER,        //到货数量
        			P_DILIVE_DATE:pDiliveDate,						//预计到货日期
    				MATERIA_ID: sendList[i].MATERIA_ID,         	//物料编码
    				MATERIA_NAME: sendList[i].MATERIA_NAME,			//物料名称
    				WAREHOUSE_ID:sendList[i].WAREHOUSE_ID,			//仓库编码
    				STORE_ID: sendList[i].STORE_ID,          		//储区编码
    				SHELF_ID:sendList[i].SHELF_ID,           		//货架编码
    				POSITION_ID:sendList[i].POSITION_ID,       	 	//货位编码
    				PURCHASE_NUMBER:sendList[i].PURCHASE_NUMBER,    //采购数量
    				UNIT_NAME:sendList[i].UNIT_NAME,				//计量单位
    				SUP_NM:sendList[i].SUP_NM           			//供应商编码 
                };
            }
        	console.log(unitList);
            var reqData ={
                    IFS :'WMS_C000012',
                    list :unitList,
            };
			
			var susMsg='';
			var errorMsg='';
			
				susMsg='添加成功';
				errorMsg='添加失败,请联系管理员';
				
			
            var ajaxParam = {
                 url: '/iPlant_ajax',
                 dataType: 'JSON',
                 data: reqData,
                 successCallBack:function(data){
                    if($.messager.alert('提示', susMsg)){
                         $('#insertTab').dialog('close');
                         initGridData();     
                    }
                 },
                 errorCallBack:function(){
                     $.messager.alert('提示', errorMsg);
                 }   
            };
            iplantAjaxRequest(ajaxParam);
		}				
		
		validSelectedData = function (gridName,type) {
            var checkedItems = $('#' + gridName).datagrid('getSelections');
            var num = 0;
            $.each(checkedItems, function (index, item) {
               num++;
            });
            if (type == 'Update') {
                if (num != 1) {
                    return false;
                }
            }
            else {
                if (num <= 0) {
                    return false;
                }
            }
            return true;
        },
		
        
        getWorkOrder =function(){
            var workOrderData='';
            var ajaxParam={
                url:'/iPlant_ajax',
                data:{
                      IFS:'WMS_C000026',
                },
                successCallBack:function(data){
                    var rowNum=0
                    if(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS){
                        rowNum=parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
                        workOrderData=data.RESPONSE["0"].RESPONSE_DATA[0];
                    }
                    $('#checkInId').textbox('setValue',workOrderData.ORDER_ID).textbox('readonly').textbox({ required: true });                                                                         
                }
            } 
            iplantAjaxRequest(ajaxParam); 
        }
        
        
        //刪除入库通知单
		deleteWareNotice = function () {
            var isSelectedData = validSelectedData('TaryInfo_tab', 'Delete');
            if (!isSelectedData) {
                $.messager.alert('提示', '请选择一条数据进行删除');
                return;
            }
            var checkedItems = $('#TaryInfo_tab').datagrid('getSelections');
            //确认提示框
            var delCnt=0;
            var exceptionCode='';
            if(checkedItems==0){

            }
            $.messager.confirm("确认框", "您确定要删除您所选择的数据?", function (r) {
           	 if(r==true){
           		 $.each(checkedItems, function (index, item) {
           			 delCnt++;
                   	 var ajaxParam = {
                                url: '/iPlant_ajax',
                                dataType: 'JSON',
                                data: {
                                	CHECKIN_ID: item.CHECKIN_ID,
						            IFS:'WMS_C000014'	
                                },
                                successCallBack:function(data){
                                	initGridData();
                                }
                         };
                        iplantAjaxRequest(ajaxParam);
                   }
           		 );
           	 }
            });     
       },
       
		/**插入一个新的空白行*/
		insertDataGrid=function (){
			var row = dataGrid.datagrid('getSelected');
			if (row){
				var index = dataGrid.datagrid('getRowIndex', row);
			} else {
				index = 0;
				editIndex = 0;
			}
			dataGrid.datagrid('insertRow', {
				index: index,
				row:{}
			});
			/**新增一个字段判断是否为新增*/
			var rowEdit = dataGrid.datagrid('getRows')[index];
			rowEdit.editType='add';
			dataGrid.datagrid('selectRow',index);
			dataGrid.datagrid('beginEdit',index);
			if (editIndex != index){
				if (endEditing(dataGrid)){
					dataGrid.datagrid('selectRow', index).datagrid('beginEdit', index);
					editIndex = index;
				} else {
					dataGrid.datagrid('selectRow', editIndex);
				}
			}else{
				endEditing(dataGrid);
			}
		}
	}

//条件查询
conditionQuery =function(){
		var dgrid = dataGrid.datagrid('options');
		var queryORDER_ID = $("#queryORDER_ID").textbox('getValue');
		var invoicesDATE = $("#invoicesDATE").datebox('getValue');
		var querySUPPLIER_ID = $("#querySUPPLIER_ID").textbox('getValue');
		
		var reqData = {
			ORDER_ID:queryORDER_ID,
			invoicesDATE:invoicesDATE,
			SUPPLIER_ID:querySUPPLIER_ID,		
			IFS: 'WMS_C000011',
			pageIndex: 1,
			pageSize: dgrid.pageSize
		
		};
		reqGridData('../iPlant_ajax', 'TaryInfo_tab', reqData);
	}
	
//高级查询
serchInfomation  =function(){
	  var ORDER_ID = $("#ORDER_ID").textbox('getValue');
	  var MATERIA_ID = $("#MATERIA_ID").combobox('getValue');
	  var START_DATE = $('#START_DATE').datetimebox('getValue');		
      var END_DATE = $('#END_DATE').datetimebox('getValue');
      var ITEM_NM=$('#ITEM_NM').textbox('getValue');
      var SUP_NM=$('#SUP_NM').textbox('getValue');
	  var CT_MN=$('#CT_MN').textbox('getValue');
	  var PN_NB=$('#PN_NB').textbox('getValue');

      var reqData ={
		ORDER_ID:ORDER_ID,
		MATERIA_ID:MATERIA_ID,
		START_DATE:START_DATE,
		END_DATE :END_DATE,
		ITEM_NM :ITEM_NM,
		SUP_NM :SUP_NM,
		CT_MN:CT_MN,
		PN_NB:PN_NB,
		IFS:'WMS_C000011',
        pageIndex:1,
        pageSize:$('#TaryInfo_tab').datagrid('options').pageSize
      };
      reqGridData('../iPlant_ajax',"TaryInfo_tab",reqData);
      $('#queryTab').dialog('close'); 
}
	
//初始化查询
initSearchMateriaId=function(){
	var ajaxParam={
        url: '/iPlant_ajax',
        data: { IFS: 'Z000007' },
        successCallBack: function (data) {
            var array = new Array();
            array.push({ "id": "", "text": "全部"});
            for (var i = 0; i < data.RESPONSE[0].RESPONSE_DATA.length; i++) {
                array.push({ "id": data.RESPONSE[0].RESPONSE_DATA[i].ITEM_CD, "text": data.RESPONSE[0].RESPONSE_DATA[i].ITEM_NM });
            }
            $('#MATERIA_ID').combobox({
                data: array,
                valueField: 'id',
                textField: 'text'
            });         
        }
    };
	
       iplantAjaxRequest(ajaxParam);
}

//采购单号下拉框查询
initSearchOrderId=function(){
	var ajaxParam={
        url: '/iPlant_ajax',
        data: { IFS: 'WMS_C000002' },
        successCallBack: function (data) {
            var array = new Array();
            array.push({ "id": "", "text": "全部"});
            for (var i = 0; i < data.RESPONSE[0].RESPONSE_DATA.length; i++) {
                array.push({ "id": data.RESPONSE[0].RESPONSE_DATA[i].ORDER_ID, "text": data.RESPONSE[0].RESPONSE_DATA[i].ORDER_ID });
            }
            console.log(array);
            $('#ORDER_ID').combobox({
                data: array,
                valueField: 'id',
                textField: 'text'
            });          
        }
    };
	
       iplantAjaxRequest(ajaxParam);
}

//关闭新增弹出框
closeInsertDialog=function(){
	$("#beginDate").datetimebox('getValue','');
	$("#stopDate").datetimebox('getValue','');
	$("#orderID").textbox('getValue','');
	$("#supplierId").textbox('setValue','');
	$("#materialId").textbox('setValue','');
	$('#insertTab').dialog('close');	
}

//关闭采购订单选择框
closeQueryDialog =function(){
	$("#beginDate").datetimebox('getValue','');
	$("#stopDate").datetimebox('getValue','');
	$("#orderID").textbox('getValue','');
	$("#supplierId").textbox('setValue','');
	$("#materialId").textbox('setValue','');
	$('#queryTab2').dialog('close');	
}

//关闭弹出框	
closeDialog =function(){
	
    $('#ORDER_ID').textbox('getValue','');
    $('#MATERIA_ID').combobox('getValue','');
    $('#START_DATE').datetimebox('setValue','');
    $('#END_DATE').datetimebox('setValue','');
 	$('#ITEM_NM').textbox('getValue','');
 	$('#SUP_NM').textbox('getValue','');
 	$('#CT_MN').textbox('getValue','');
	$('#PN_NB').textbox('getValue','');
    $('#P_DELIVE_DATE').datetimebox('setValue','');
    $('#queryTab').dialog('close');	
	}

	TrayInfo2.prototype = {
		init: function() {
			$(function() {
				//初始化全局变量对象
				dataGrid = $('#TaryInfo_tab');
				dataWAREHOUSE=[],dataFactory=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				dataSTORE=[],dataFactory=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				dataSHELF=[],dataFactory=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				dataPOSITION=[],dataFactory=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");				
				serachData=[];
				initGridData();
				singleWareNotice();								
				initSearchMateriaId();
				
				$('#btnAdd').click(function() {					
					$('#insertTab').dialog('open').dialog('setTitle', "入库通知单");
					getWorkOrder();
					setDataNull();
					$('#createDate').datetimebox({   
		        	    editable:false  
		        	});
		        	$('#pDiliveDate').datetimebox({   
		        	    editable:false  
		        	});
		        	$('#checkInDate').datetimebox({   
		        	    editable:false  
		        	});
				
				});
			    //查询条件
				$('#btnSearch').click(function () {
					conditionQuery();
					       
                });
				//高级查询条件
				$('#btnGaoSearch').click(function () {
					initSearchOrderId();
					setDataNull();
				    $('#queryTab').dialog('open').dialog('setTitle', "高级查询");	
				   
				//删除	       
                });
				$('#btnDelete').click(function(){
					deleteWareNotice();
	            });
				//保存
				$('.save').click(function() {
					saveDataGrid();
				});
				//导出Excel
				$('#btnExprt').click(function(){
                	var now = new Date();
                    var year =now.getFullYear();
                	var reqData = {
                			IFS:'WMS_C000011',
                            pageIndex:1,
                            pageSize:10
                	}
                	createTable('tbWMSReport','入库单导出','TaryInfo_tab',reqData);
                });
				
			});
		}
	}
	var fcfo = new TrayInfo2();
	var tbID = "";
	fcfo.init();
})();

