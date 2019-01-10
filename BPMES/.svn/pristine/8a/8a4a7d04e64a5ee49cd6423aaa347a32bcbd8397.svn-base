/* 启动时加载 */
/*
 */
(function() {
	function factoryInfo() {
		initGridData = function(OLD_NO) {
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			var reqData = {
				IFS: 'ST00072',
		        OLD_NO: OLD_NO,
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'ShopMaterialSplit_tab', reqData);
		},
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'ShopMaterialSplit_tab',
				dataType: 'json',
				columns: [[
					{field: 'FCT_NM',title: '工厂名称',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" + value+ "</span>";}},
					{field: 'FCT_CD',title: '工厂编码',width: 10,hidden:true,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" + value+ "</span>";}},
					{field: 'WC_CD',title: '车间编码',width: 80,hidden:true,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" + value+ "</span>";}},
					{field: 'ITEM_CD',title: '物料编码',width: 80,hidden:true,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" + value+ "</span>";}},
					{field: 'SUPPLIER_ID',title: '车间编码',width: 80,hidden:true,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" + value+ "</span>";}},
					{field: 'SN_NUMBER',title: '车间编码',width: 80,hidden:true,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" + value+ "</span>";}},
					{field: 'PRODUCT_DATE',title: '车间编码',width: 80,hidden:true,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" + value+ "</span>";}},
					{field: 'LINE_CD',title: '产线编码',width: 10,hidden:true,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'LINE_NM',title: '产线名称',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'MO_NO',title: '工单号',width: 140,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				    {field: 'WO_NO',title: '作业指示编号',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'MAT_CD',title: '物料编码',width: 130,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  value+ "</span>";}},
					{field: 'MAT_NM',title: '物料名称',width: 130,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  value+ "</span>";}},
					{field: 'OLD_NO',title: '旧物料唯一码',width: 130,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  value+ "</span>";}},
					{field: 'PSN_NO',title: '新物料唯一码',width: 130,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  value+ "</span>";}},
					{field: 'PSN_QTY',title: '拆分数量<span style="color:red">*</span>',width: 85,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'numberbox', options:{precision:0,min:1}}, 
		            	   formatter:function(value,row,index){ return formatNumber(value,0); }}
				]],
				/**结束编辑模式的操作*/
			     onEndEdit:function(index,row){
			     },
			     /**进入编辑模式的操作*/
				onBeforeEdit:function(index,row){
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
		        onClickCell: function (index,field,value) {
		        	var tabName,dialogName,titleName,rowEdit,editem,editorFt,itemCd,reqData,dgrid;
		        	var rows = dataGrid.datagrid('getRows'),row = rows[index];
		        	if (editIndex != index){
	    	    		var ed,fc,editorFt;
	    	    		if(editIndex!=undefined){
	    					/**判断是否为新增行，并验证新增工厂编码重复*/
	    	    			rowEdit = dataGrid.datagrid('getRows')[editIndex],editem = $(this).datagrid('getEditor', {index: editIndex,field: 'PSN_QTY'}),editorFt = editem.target,itemCd = editorFt.val();
	    	    			if(checkNotEmpty(rowEdit.editType)){
	    	    				if(rowEdit.editType=='update'){
	    	    					if(checkNotEmpty(itemCd)){
	    	    						
	    			    			}
	    	    				}else{
	    	    					addDatagridEditor(dataGrid,index);
	    	    				}
	    	    			}else{
	    			    		 addDatagridEditor(dataGrid,index);
	    	    			}
	    	    		}else{
	    	    			addDatagridEditor(dataGrid,index);
	    	    		}
	    	    	}
		        },
		        /**单击进入编辑模式*/
			}
			initGridView(reqData, gridList);
			dataGrid.datagrid('loadData', jsonData);
		}
	}
	
	/*根据作业指示编码查询作业工单信息*/
	searchMO_NO = function(dgrid){
		$('#showMessageInfo').html('');
		search_MaterialWO_NO = $('#searchentersn').textbox('getValue');
		if(search_MaterialWO_NO==null || search_MaterialWO_NO==''){
			$.messager.alert("提示", '请扫描物料唯一码！')
			$("#fmStation").form("clear");
			return;
		}
		PSNNO = search_MaterialWO_NO;
		var ajaxParam = {
			data: {
				url: '/iPlant_ajax',
				IFS: 'ST00072',
				PSN_NO: search_MaterialWO_NO
			},
			successCallBack:function(data){
				var rowCollection=createSourceObj(data); 
				if(rowCollection.length <= 0){
					$.messager.alert("提示", '该物料唯一码不存在或已进行拆分，请重新输入！')
					$("#fmStation").form("clear");
					return;
				}else{
					if(rowCollection.length > 1){
						$("#fmStation").form("clear");
					}else{
						$("#workOrder").textbox('setValue',rowCollection[0].MO_NO);					/*生产订单号1b*/
						$("#WoNoCode").textbox('setValue',rowCollection[0].WO_NO);					/*生产订单号1b*/
						$("#MaterialCode").textbox('setValue',rowCollection[0].MAT_CD);			/*物料编码1b*/
						$("#PlanProductCount").textbox('setValue',rowCollection[0].PLAN_PO_QTY);	/*作业指示计划量1*/
						$("#Line_Cd").textbox('setValue',rowCollection[0].LINE_NM);				/*产线名称*/
						$("#workState").textbox('setValue',rowCollection[0].WO_STATE_NM);				/*工单状态1b*/
						$("#MaterialName").textbox('setValue',rowCollection[0].MAT_NM);			/*物料名称1*/
						$("#PROGRAM_NM").textbox('setValue',rowCollection[0].PSN_QTY);			/*发料数量*/
					}
				}
            }
		};
		iplantAjaxRequest(ajaxParam);
	},
	
	/*QuerySN() 物料拆分*/
	QuerySN = function (){
		var SPLIT_QTY = $('#PANEL_QTY').textbox('getValue');
		if(SPLIT_QTY<=0 || SPLIT_QTY=='' || SPLIT_QTY==null){
			$.messager.alert("提示", '拆分数需大于零且不能为空！')
			$('#PANEL_QTY').textbox('setValue','');
			return;
		}else{
			if(search_MaterialWO_NO==null || search_MaterialWO_NO==''){
				$.messager.alert("提示", '请扫描物料唯一码！')
				$('#PANEL_QTY').textbox('setValue','');
				return;
			}
			var ajaxParamPsn = {
				data: {
					url: '/iPlant_ajax',
					IFS: 'ST00072',
					PSN_NO: search_MaterialWO_NO
				},
				successCallBack:function(data){
					var rowCollection=createSourceObj(data); 
					if(rowCollection.length <= 0){
						$.messager.alert("提示", '物料唯一码不存在，请重新输入！')
						$("#fmStation").form("clear");
						return;
					}else{
						console.log("SPLIT_QTY="+SPLIT_QTY);
						for(var i=0;i<SPLIT_QTY;i++){
							console.log("for   "+i);
							var arr = {
							    FCT_NM: rowCollection[0].FCT_NM,
								FCT_CD: rowCollection[0].FCT_CD,
								LINE_CD: rowCollection[0].LINE_CD,
								LINE_NM: rowCollection[0].LINE_NM,
								MO_NO: rowCollection[0].MO_NO,
								WO_NO: rowCollection[0].WO_NO,
								MAT_NM: rowCollection[0].MAT_NM,
								MAT_CD: rowCollection[0].MAT_CD,
								OLD_NO: rowCollection[0].OLD_NO,
								PSN_NO: rowCollection[0].PSN_NO,
								WC_CD: rowCollection[0].WC_CD,
								PSN_QTY:'0',
								SUPPLIER_ID: rowCollection[0].SUPPLIER_ID,
								SN_NUMBER: rowCollection[0].SN_NUMBER,
								PRODUCT_DATE: rowCollection[0].PRODUCT_DATE,
								ITEM_CD: rowCollection[0].ITEM_CD
							}
							$('#ShopMaterialSplit_tab').datagrid('insertRow',{index:i,row:arr});
						}
					}
	            }
			};
			iplantAjaxRequest(ajaxParamPsn);
		}
	}
	
	/*拆分后保存操作*/
	SaveSplit = function(){
		var edDataGrid = $('#ShopMaterialSplit_tab');
		var rowNum = 0;
		var PSN_QTY = 0;
		var OLD_QTY = parseInt($("#PROGRAM_NM").textbox('getValue'));
         if (endEditing(edDataGrid)){
        	if (edDataGrid.datagrid('getChanges').length>0) {
                var updated = edDataGrid.datagrid('getChanges');
                /**装载数据*/
                arrUpdate = new Array();
                if(updated.length>0){
                	var num = 0;
                	for(var m=0;m<updated.length;m++){
                		if(parseInt(updated[m].PSN_QTY)==0){
            				console.log("--=="+num++);
            			}
                		if(updated[m].edited){
                			arrUpdate.push(updated[m]);
        	        		PSN_QTY +=parseInt(updated[m].PSN_QTY);
        	        		console.log(m+"--"+updated[m].PSN_QTY);
                		}
                	}
                	console.log("num="+num);
                	console.log("PSN_QTY="+PSN_QTY);
                	console.log("arrUpdate="+arrUpdate);
                	
                	if(num > 0){
                		$.messager.alert("提示", '拆分数量是必输项且不能为零！');
                    	return;
                	}else if(OLD_QTY != PSN_QTY){
                		$.messager.alert("提示", '拆分数量必须大于等于发料数量！');
                    	return;
                	}
                	
                	ArrSave = [];
                	for(var m=0;m<updated.length;m++){
                		var ajaxQuery = {
                            url: '/iPlant_ajax',
                            dataType: 'JSON',
                            async:false, 
                            data: {
                                IFS: 'ST00110'
                            },
                            successCallBack: function (data) {
                            	var rowCollection=createSourceObj(data); 
                            	var NEW_NO = rowCollection[0].PSN_NO;
                            	console.log("NEW_NO="+NEW_NO);
                            	ArrSave.push({PSN_NO:NEW_NO,OLD_NO:search_MaterialWO_NO,
                            		FCT_CD:updated[m].FCT_CD,LINE_CD:updated[m].LINE_CD,MO_NO:updated[m].MO_NO,WO_NO:updated[m].WO_NO,
                            		MAT_CD:updated[m].MAT_CD,WC_CD:updated[m].WC_CD,PSN_QTY:updated[m].PSN_QTY,STOCK_QTY:updated[m].PSN_QTY,TOT_QTY:updated[m].PSN_QTY,ITEM_CD:updated[m].ITEM_CD});
                            },
                            errorCallBack: function (data) {
                            	$.messager.alert("提示", '拆分失败！');
                                return;
                            }
                        };
                		iplantAjaxRequest(ajaxQuery);
                	}
                	PrintList = [];
                	var arrList = new Array();
                	arrList.push({PSN_NO:search_MaterialWO_NO});
                	console.log("arrList"+arrList);
                	var ajaxSaveQuery = {
            			url: '/iPlant_ajax',
                        dataType: 'JSON',
                        data:{
                        	FUN: 'insertSmtReceivingStock',   
                        	list: ArrSave,
                        	IFS: 'GW00066'        
                        },
                        successCallBack : function (data){
                        	 var ajaxDelete = {
                    			url: '/iPlant_ajax',
                                dataType: 'JSON',
                                data:{
                                	list: arrList,
                                	IFS: 'ST00075'        
                                },
                                successCallBack : function (data){
                                	initGridData(search_MaterialWO_NO);
                                	$('#showMessageInfo').html('<font color=red>拆分成功！</font>');
                                	var updateds = $('#ShopMaterialSplit_tab').datagrid('getRows'); /*获取左表所有已扫描部件的数据*/
                                	for (var i = 0; i < updateds.length; i++) {
                                		PrintList.push({
                							"SN" : updateds[i].PSN_NO,
                							"ProductNo" : updateds[i].MAT_CD,
                							"SUPNO" : updateds[i].SUPPLIER_ID,
                							"RN" : i + 1,
                							"PTime" : updateds[i].PRODUCT_DATE,
                							"LOTNO" : updateds[i].SN_NUMBER,
                							"NUM" : updateds[i].PSN_QTY
                						});
                					}
                                	barcodePrint(PrintList);              /*调用打印方法*/
                                }
                            };
                    		iplantAjaxRequest(ajaxDelete);
                        }
                    };
            		iplantAjaxRequest(ajaxSaveQuery);
                }else{
                	$.messager.alert("提示", '拆分数量是必输项！');
                	return;
                }
            }else{
            	$.messager.alert("提示", '没有进行变更！');
            }
		}else{
			$.messager.alert("提示", '请输入必填项！');
			return;
		}
	}
	
	/*打印共通方法*/
	barcodePrint = function(PrintList) {
		var url = getRootPath_web() + "/iPlant_printer", barCodeStr = "";
		barCodeStr = {
			"labName" : "mes01.lab",
			"barCodeList" : PrintList
		};
		// 提交打印信息给socketservice，socketsevice服务下发给socketclient客户端调用打印机打印
		if (PrintList.length > 0) {
			zbSocketPrinter(barCodeStr);
		} else {
			$.messager.alert("提示", "请选择打印数据！")
		}
	},
	
	factoryInfo.prototype = {
		init: function() {
			$(function() {
				/*初始化全局变量对象*/
				dataGrid = $('#ShopMaterialSplit_tab'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				search_MaterialWO_NO = 'A';
				initGridData(search_MaterialWO_NO);
				
				/*根据作业指示编码查询作业工单信息*/
				$('#searchentersn').textbox('textbox').keydown(function (e) {
			         if (e.keyCode == 13) {
			        	 searchMO_NO();
			         }
			     });
				
	        	 $('#SplitRerelease').click(function(){
	        		 QuerySN();
			     });
				
				$('#Rerelease').click(function(){
					SaveSplit();
				});
				
			});
		}
	}
	var fcfo = new factoryInfo(); var PSNNO,search_MaterialWO_NO,ArrSave,PrintList;
	fcfo.init();
})();