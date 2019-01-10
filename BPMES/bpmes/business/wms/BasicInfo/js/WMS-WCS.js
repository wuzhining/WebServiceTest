
(function() {
	function application() {	
		getSelectedCondtion = function() {	
			 //查询货架信息
			iplantAjaxRequest({
				url : '/iPlant_ajax',
				data : {
					IFS : 'WMS_B00073'	,
					WAREHOUSE_ID:'C0001'
				},
				successCallBack : function(data) {
					var array = new Array();
					array.push({
						"id" : "",
						"text" : "全部"
					});
					var rowCollection = createSourceObj(data);
					for (var i = 0; i < rowCollection.length; i++) {
						array.push({
							"id" : rowCollection[i].SHELF_ID,
							"text" : rowCollection[i].SHELF_NAME
						});
					}

					//绑定货架信息下拉框
					$('#cxSHELF_ID').combobox({
						data : array,
						valueField : 'id',
						textField : 'text'
					});
				}
			});
		},
		initGridData = function() {
			    var dgrid = $('#WMSWCSlink_tab').datagrid('options');
				if(!dgrid) return;
				var reqData = {
					IFS: 'WMS_B00061',
					pageIndex: 1,
					pageSize: dgrid.pageSize
				}
				reqGridData('/iPlant_ajax', 'WMSWCSlink_tab', reqData);
				
			},
			bindGridData = function(reqData, jsonData) {
				var grid = {
					name: 'WMSWCSlink_tab',
					dataType: 'json',
					columns: [
						[
							{
								
								field: 'TEMP_ID',
								title: 'ID',								
								width: 100,
								hidden:true,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'SHELF_ID',
								title: '',
								hidden:true,
								width: 150,								
								align: 'center',formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'SHELF_NAME',
								title: '货架名称',
								width: 150,								
								align: 'center',formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'ROW_ID',
								title: '货位所在行',
								width: 150,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'COLUMN_ID',
								title: '货位所在列',
								width: 150,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'BARCODE',
								title: 'RFID值',
								width: 150,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'DIRECT',
								title: '出入库方向',
								width: 150,
								align: 'center',
								formatter: function (value, row, index) {
		                               if (value == 'IN') {
		                                   return '上架';
		                               }
		                               else {
		                                   return '下架';
		                               }
		                           }
							},{
								field: 'OPERATE_STATUS',
								title: '操作状态',
								width: 150,
								align: 'center',
								formatter: function (value, row, index) {
		                               if (value == '0') {
		                                   return '未处理';
		                               }
		                               if (value == '1') {
		                                   return '成功';
		                               }
		                               else {
		                                   return '失败';
		                               }
		                           }
							},{
								field: 'DATA_STATUS',
								title: '数据处理状态',
								width: 150,
								align: 'center',
								formatter: function (value, row, index) {
		                               if (value == '0') {
		                                   return '未处理';
		                               }		                               
		                               if(value == '1'){
		                                   return '已处理';
		                               }
		                               else{
		                            	 return '';
		                               }
		                           }
							},{
								field: 'DETAIL',
								title: '备注',
								width: 150,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'CREATE_TIME',
								title: '创建时间',
								width: 200,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}								
							},{
								field: 'UPDATE_TIME',
								title: '修改时间',
								width: 200,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}
								}, 

						]
					],
					onDblClickRow: function(index,row){							
				    	 CompanyOpttype=1;
				    	 $("#enditTab").dialog("open").dialog('setTitle', '修改仓储出入库中间表信息');
				    	 checkFun();
				    	    $('#txtTEMP_ID').textbox('setValue', row.TEMP_ID==null?'':row.TEMP_ID);
				    	    $('#txtSHELF_NAME').combobox('setValue', row.SHELF_ID==null?'':row.SHELF_ID);
							$('#txtSHELF_NAME').combobox('setText', row.SHELF_NAME==null?'':row.SHELF_NAME);							
							$('#txtROW_ID').combobox('setValue', row.ROW_ID==null?'':row.ROW_ID);
							$('#txtCOLUMN_ID').combobox('setValue', row.COLUMN_ID==null?'':row.COLUMN_ID);							
							$('#txtDIRECT').combobox('setValue', row.DIRECT==null?'':row.DIRECT);
							$('#txtOPERATE_STATUS').combobox('setValue', row.OPERATE_STATUS==null?'':row.OPERATE_STATUS);
							$('#txtDATA_STATUS').combobox('setValue', row.DATA_STATUS==null?'':row.DATA_STATUS);
							$('#txtDETAIL').textbox('setValue', row.DETAIL==null?'':row.DETAIL);
							$('#txtBarcode').textbox('setValue', row.BARCODE==null?'':row.BARCODE);
				     }
				}
				initGridView(reqData, grid);
				$('#WMSWCSlink_tab').datagrid('loadData', jsonData);
			}
			checkFun = function (){
				
				var qx = getUpdateRight();
				if(qx=="Y"){
					 $('#txtTEMP_ID').textbox('textbox').attr('disabled', true);			    	 
			    	 $('#txtSHELF_NAME').combobox('textbox').attr('disabled', false);			    	 
			    	 $('#txtROW_ID').combobox('textbox').attr('disabled', false);
			    	 $('#txtCOLUMN_ID').combobox('textbox').attr('disabled', false);			    	
			    	 $('#txtDIRECT').combobox('textbox').attr('disabled', false);
			    	 $('#txtOPERATE_STATUS').combobox('textbox').attr('disabled', false);
			    	 $('#txtDATA_STATUS').combobox('textbox').attr('disabled', false);
			    	 $('#txtDETAIL').textbox('textbox').attr('disabled', false);	
			    	 $('#txtBarcode').textbox('textbox').attr('disabled', false);
			    	 $('#saveID').show();
			    	 $('#cancleID').show();
				}else{
					CompanyOpttype=2;
					 $('#txtTEMP_ID').textbox('textbox').attr('disabled', true);			    	 
			    	 $('#txtSHELF_NAME').combobox('textbox').attr('disabled', false);
			    	 $('#txtROW_ID').combobox('textbox').attr('disabled', false);
			    	 $('#txtCOLUMN_ID').combobox('textbox').attr('disabled', false);
			    	 $('#txtDIRECT').combobox('textbox').attr('disabled', false);
			    	 $('#txtOPERATE_STATUS').combobox('textbox').attr('disabled', false);
			    	 $('#txtDATA_STATUS').combobox('textbox').attr('disabled', false);		    	
			    	 $('#txtDETAIL').textbox('textbox').attr('disabled', false);
			    	 $('#txtBarcode').textbox('textbox').attr('disabled', false);
			    	 $('#saveID').hide();
//			    	 $('#cancleID').hide();
				}
				 
			}		
		setDataNull = function () {           
              $('#txtTEMP_ID').textbox('setValue','');              
          }
		getDataBySearch = function(){
				var dgrid = $('#WMSWCSlink_tab').datagrid('options');
				if(!dgrid) return;
				var cxTEMP_ID = $('#cxTEMP_ID').val();
				var cxSHELF_NAME= $('#cxSHELF_ID').combobox("getText");
				var cxROW_ID= $('#cxROW_ID').combobox("getValue");
				var cxDIRECT= $('#cxDIRECT').combobox("getValue");
				var cxOPERATE_STATUS= $('#cxOPERATE_STATUS').combobox("getValue");
				var cxDATA_STATUS= $('#cxDATA_STATUS').combobox("getValue");
				var reqData = {
						TEMP_ID: cxTEMP_ID,
						SHELF_NAME: cxSHELF_NAME,	
						ROW_ID: cxROW_ID,	
						DIRECT: cxDIRECT,	
						OPERATE_STATUS: cxOPERATE_STATUS,	
						DATA_STATUS: cxDATA_STATUS,	
					IFS: 'WMS_B00061',
					pageIndex: 1,
					pageSize: dgrid.pageSize
				}
				reqGridData('/iPlant_ajax', 'WMSWCSlink_tab',reqData);
			}
			/* 修改商品移动信息 */	
		var staCategory;
		updateStation = function() {
			var checkedItems = $('#WMSWCSlink_tab').datagrid('getSelections');
			var moveIds = [];			
			var num = 0;
			$.each(checkedItems, function(index, item) {
				moveIds.push(item.moveid);
				num++;
			});
			if(num != 1) {
				$.messager.alert('提示', '请选择一条数据进行修改');
				return false;
			}
			var row = $("#WMSWCSlink_tab").datagrid("getSelected");			
			if(row) {
				$("#searchCondition").dialog("close");
				$("#enditTab").dialog("open").dialog('setTitle', '编辑仓储出入库中间表信息');
				$('#txtTEMP_ID').textbox('textbox').attr('readonly', true);
				$('#txtTEMP_ID').textbox('textbox').attr('disabled', true);
				$('#txtTEMP_ID').textbox('setValue', row.TEMP_ID==null?'':row.TEMP_ID);	
				$('#txtSHELF_NAME').combobox('setValue', row.SHELF_ID==null?'':row.SHELF_ID);
				$('#txtSHELF_NAME').combobox('setText', row.SHELF_NAME==null?'':row.SHELF_NAME);
				$('#txtROW_ID').combobox('setValue', row.ROW_ID==null?'':row.ROW_ID);
				$('#txtCOLUMN_ID').combobox('setValue', row.COLUMN_ID==null?'':row.COLUMN_ID);
				$('#txtBarcode').textbox('setValue', row.BARCODE==null?'':row.BARCODE);
				$('#txtDIRECT').combobox('setValue', row.DIRECT==null?'':row.DIRECT);
				$('#txtOPERATE_STATUS').combobox('setValue', row.OPERATE_STATUS==null?'':row.OPERATE_STATUS);
				$('#txtDATA_STATUS').combobox('setValue', row.DATA_STATUS==null?'':row.DATA_STATUS);
				$('#txtDETAIL').textbox('setValue', row.DETAIL==null?'':row.DETAIL);
				CompanyOpttype = 1;
			}
			checkFun();
		}
		validSelectedData = function (gridName,type) {
            var checkedItems = $(gridName).datagrid('getSelections');
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
        deleteStation = function () {
             var isSelectedData = validSelectedData('#WMSWCSlink_tab', 'Delete');
             if (!isSelectedData) {
                 $.messager.alert('提示', '请选择一条数据进行删除');
                 return;
             }
             var checkedItems = $('#WMSWCSlink_tab').datagrid('getSelections');
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
                                     IFS: 'WMS_B00064',
                                     TEMP_ID: item.TEMP_ID,
                                 },
                                 successCallBack:function(data){
                                 	 if(delCnt==checkedItems.length){
	                              	 	if(data.RESPONSE["0"].RESPONSE_HDR.MSG_CODE=='0'){
	                              	 		$.messager.alert('提示', '删除成功!','',function(){
	                                	      initGridData();
	                                     });	
	                              	 	}else{
	                              	 		$.messager.alert('提示','删除失败,此数据正在使用!')
	                              	 	}
	                                     
	                            	 }
                         		},
                         		errorCallBack:function(data){
                         			if(delCnt==checkedItems.length){
                         				$.messager.alert('提示','删除失败,服务器无响应!');
                         			}
                         		}
                          };
                         iplantAjaxRequest(ajaxParam);
                     });
            	 }
             });      
        }, 
        dataArr={},
        getApplyOrder =function(){
            var workOrderData='';
            var ajaxParam={
                url:'/iPlant_ajax',
                data:{
                      IFS:'WMS_B00065',
                },
                successCallBack:function(data){
                    var rowNum=0
                    if(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS){
                        rowNum=parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
                        workOrderData=data.RESPONSE["0"].RESPONSE_DATA[0];
                    }
                    $('#txtTEMP_ID').textbox('setValue',workOrderData.TEMP_ID).textbox('readonly').textbox({ required: true });                                                                         
                }
            } 
            iplantAjaxRequest(ajaxParam); 
        }
		/* 添加商品移动信息 */
		addStation = function() {
        	CompanyOpttype = 0;
        	getApplyOrder();
        	checkFun();
        	$('#txtTEMP_ID').textbox('textbox').attr('readonly',false);
			$('#txtTEMP_ID').textbox('textbox').attr('disabled',false);			
			$("#enditTab").dialog("open").dialog('setTitle', '仓储出入库中间表信息添加');
			$("#fmStation").form("clear");			
		}
        /*验证修改内容是否重复*/
        saveUpdateValidate = function() {
			var checkedItems = $('#WMSWCSlink_tab').datagrid('getSelections');
			row = checkedItems[0];
			if (row.TEMP_ID) {
				if ($('#txtTEMP_ID').textbox('getValue') != (row.TEMP_ID==null?'':row.TEMP_ID)						
						||$('#txtSHELF_NAME').combobox('getValue') != (row.SHELF_NAME==null?'':row.SHELF_NAME)						
						||$('#txtROW_ID').combobox('getValue') != (row.ROW_ID==null?'':row.ROW_ID)
						||$('#txtCOLUMN_ID').combobox('getValue') != (row.COLUMN_ID==null?'':row.COLUMN_ID)						
						||$('#txtDIRECT').combobox('getValue') != (row.DIRECT==null?'':row.DIRECT)
						||$('#txtOPERATE_STATUS').combobox('getValue') != (row.OPERATE_STATUS==null?'':row.OPERATE_STATUS)
						||$('#txtDATA_STATUS').combobox('getValue') != (row.DATA_STATUS==null?'':row.DATA_STATUS)
						||$('#txtDETAIL').textbox('getValue') != (row.DETAIL==null?'':row.DETAIL)
						||$('#txtBarcode').textbox('getValue') != (row.BARCODE==null?'':row.BARCODE)) {
					return true;
				} else {
					return false;
				}
			}
		}
		savaStation = function() {
			var IFServerNo = '';
			var reqData = [];
		    if(CompanyOpttype == 0) {
		    var ajaxParam = {
						url: '/iPlant_ajax',
						dataType: 'JSON',
						data: {
							TEMP_ID: $('#txtTEMP_ID').val(),	
							SHELF_ID: $('#txtSHELF_NAME').combobox('getValue'),
							SHELF_NAME: $('#txtSHELF_NAME').combobox('getText'),
							ROW_ID: $('#txtROW_ID').combobox('getValue'),
							COLUMN_ID: $('#txtCOLUMN_ID').combobox('getValue'),
							DIRECT: $('#txtDIRECT').combobox('getValue'),
							OPERATE_STATUS: $('#txtOPERATE_STATUS').combobox('getValue'),
							DATA_STATUS: $('#txtDATA_STATUS').combobox('getValue'),
							DETAIL: $('#txtDETAIL').val(),
							BARCODE: $('#txtBarcode').val(),
							IFS: 'WMS_B00062'
						},
						successCallBack: function(data) {
							var susMsg=getReturnMsg(data);
		                	$.messager.alert("提示",susMsg,"",function(){
		            			reqGridData('/iPlant_ajax','WMSWCSlink_tab',{IFS:'WMS_B00061'});
		            			$('#enditTab').dialog('close');
		            			setDataNull();
		            			initGridData();
		            			var reqData = {
		            					SHELF_ID: $('#txtSHELF_NAME').combobox('getValue'),
		            					ROW_ID: $('#txtROW_ID').combobox('getValue'),
		            					COLUMN_ID: $('#txtCOLUMN_ID').combobox('getValue'),
									    STATUS: 'PST01.02',
									    BARCODE: 'N',
										IFS: 'WMS_B00078'
									}
								   universalAccess('/iPlant_ajax',reqData);
		            		});
						},
						errorCallBack: function() {
							$.messager.alert('提示', errorMsg);
						}
							
					};
					iplantAjaxRequest(ajaxParam);
			} else if(CompanyOpttype == 1) {
				if (!saveUpdateValidate()) {
					$.messager.alert("提示", '内容没有更新，请修改')
					return false;
				}
				//修改 应wcs要求 修改功能为先删除 在新增
				//删除
				 var ajaxParam = {
                         url: '/iPlant_ajax',
                         dataType: 'JSON',
                         data: {
                             IFS: 'WMS_B00064',
                             TEMP_ID: $('#txtTEMP_ID').val(),
                         },
                         successCallBack:function(data){
                        	//获得当前序列
            				 var TEMP_ID=null;
            				 var ajaxParam={
            			                url:'/iPlant_ajax',
            			                data:{
            			                      IFS:'WMS_B00065',
            			                },
            			                
            			                successCallBack:function(data){
            			                    var rowNum=0
            			                    if(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS){
            			                        rowNum=parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
            			                        workOrderData=data.RESPONSE["0"].RESPONSE_DATA[0];
            			                    }
            			                    TEMP_ID=workOrderData.TEMP_ID;
            			                    //新增
            			                    var ajaxParam = {
            			    						url: '/iPlant_ajax',
            			    						dataType: 'JSON',
            			    						data: {
            			    							TEMP_ID: TEMP_ID,	
            			    							SHELF_ID: $('#txtSHELF_NAME').combobox('getValue'),
            			    							SHELF_NAME: $('#txtSHELF_NAME').combobox('getText'),
            			    							ROW_ID: $('#txtROW_ID').combobox('getValue'),
            			    							COLUMN_ID: $('#txtCOLUMN_ID').combobox('getValue'),
            			    							DIRECT: $('#txtDIRECT').combobox('getValue'),
            			    							OPERATE_STATUS: $('#txtOPERATE_STATUS').combobox('getValue'),
            			    							DATA_STATUS: $('#txtDATA_STATUS').combobox('getValue'),
            			    							DETAIL: $('#txtDETAIL').val(),
            			    							BARCODE: $('#txtBarcode').val(),
            			    							IFS: 'WMS_B00062'
            			    						},
            			    						successCallBack: function(data) {
            			    							var susMsg=getReturnMsg(data);
            			    		                	$.messager.alert("提示",susMsg,"",function(){
            			    		            			reqGridData('/iPlant_ajax','WMSWCSlink_tab',{IFS:'WMS_B00061'});
            			    		            			$('#enditTab').dialog('close');
            			    		            			setDataNull();
            			    		            			initGridData();
            			    		            			var reqData = {
            			    		            					SHELF_ID: $('#txtSHELF_NAME').combobox('getValue'),
            			    		            					ROW_ID: $('#txtROW_ID').combobox('getValue'),
            			    		            					COLUMN_ID: $('#txtCOLUMN_ID').combobox('getValue'),
            			    									    STATUS: 'PST01.02',
            			    									    BARCODE: 'N',
            			    										IFS: 'WMS_B00078'
            			    									}
            			    								   universalAccess('/iPlant_ajax',reqData);
            			    		            		});
            			    						},
            			    						errorCallBack: function() {
            			    							$.messager.alert('提示', errorMsg);
            			    						}
            			    							
            			    					};
            			    					iplantAjaxRequest(ajaxParam);
            			                    
            			                }
            			            } 
            			            iplantAjaxRequest(ajaxParam); 
                 		},
                 		errorCallBack:function(data){
                 			if(delCnt==checkedItems.length){
                 				$.messager.alert('提示','删除失败,服务器无响应!');
                 			}
                 		}
                  };
				 iplantAjaxRequest(ajaxParam);
				 
				 
				 //alert(TEMP_ID);
				 
				
				/*var ajaxParam = {
						url: '/iPlant_ajax',
						dataType: 'JSON',
						data: {
							TEMP_ID: $('#txtTEMP_ID').val(),	
							SHELF_ID: $('#txtSHELF_NAME').combobox('getValue'),
							SHELF_NAME: $('#txtSHELF_NAME').combobox('getText'),
							ROW_ID: $('#txtROW_ID').combobox('getValue'),
							COLUMN_ID: $('#txtCOLUMN_ID').combobox('getValue'),
							DIRECT: $('#txtDIRECT').combobox('getValue'),
							OPERATE_STATUS: $('#txtOPERATE_STATUS').combobox('getValue'),
							DATA_STATUS: $('#txtDATA_STATUS').combobox('getValue'),
							DETAIL: $('#txtDETAIL').val(),
							BARCODE: $('#txtBarcode').val(),
							IFS: 'WMS_B00063'
						},
						successCallBack: function(data) {
							var susMsg=getReturnMsg(data);
		                	$.messager.alert("提示",susMsg,"",function(){
		            			reqGridData('/iPlant_ajax','WMSWCSlink_tab',{IFS:'WMS_B00061'});
		            			$('#enditTab').dialog('close');
		            			setDataNull();
		            			initGridData();
		            			var reqData = {
		            					SHELF_ID: $('#txtSHELF_NAME').combobox('getValue'),
		            					ROW_ID: $('#txtROW_ID').combobox('getValue'),
		            					COLUMN_ID: $('#txtCOLUMN_ID').combobox('getValue'),
									    STATUS: 'PST01.02',
									    BARCODE: 'N',
										IFS: 'WMS_B00078'
									}
								   universalAccess('/iPlant_ajax',reqData);
		            		});
						},
						errorCallBack: function() {
							$.messager.alert('提示', errorMsg);
						}
							
					};
					iplantAjaxRequest(ajaxParam);*/
			} else {
				IFServerNo = 'WMS_B00061'
			}
			var susMsg = '',
				errorMsg = '';
			if(CompanyOpttype == 0) {
				susMsg = '添加成功';
				errorMsg = '添加失败,请联系管理员';
			} else {
				susMsg = '更新成功';
				errorMsg = '更新失败,请联系管理员';
			}
			if(!checkForm()) return;
//			var ajaxParam = {
//				url: '/iPlant_ajax',
//				dataType: 'JSON',
//				data: {
//					TEMP_ID: $('#txtTEMP_ID').val(),	
//					SHELF_ID: $('#txtSHELF_NAME').combobox('getValue'),
//					SHELF_NAME: $('#txtSHELF_NAME').combobox('getText'),
//					ROW_ID: $('#txtROW_ID').combobox('getValue'),
//					COLUMN_ID: $('#txtCOLUMN_ID').combobox('getValue'),
//					DIRECT: $('#txtDIRECT').combobox('getValue'),
//					OPERATE_STATUS: $('#txtOPERATE_STATUS').combobox('getValue'),
//					DATA_STATUS: $('#txtDATA_STATUS').combobox('getValue'),
//					DETAIL: $('#txtDETAIL').val(),
//					BARCODE: $('#txtBarcode').val(),
//					IFS: IFServerNo
//				},
//				successCallBack: function(data) {
//					var susMsg=getReturnMsg(data);
//                	$.messager.alert("提示",susMsg,"",function(){
//            			reqGridData('/iPlant_ajax','WMSWCSlink_tab',{IFS:'WMS_B00061'});
//            			$('#enditTab').dialog('close');
//            			setDataNull();
//            			initGridData();
//            			var reqData = {
//            					SHELF_ID: $('#txtSHELF_NAME').combobox('getValue'),
//            					ROW_ID: $('#txtROW_ID').combobox('getValue'),
//            					COLUMN_ID: $('#txtCOLUMN_ID').combobox('getValue'),
//							    STATUS: 'PST01.03',
//							    BARCODE: 'N',
//								IFS: 'WMS_B00078'
//							}
//						   universalAccess('/iPlant_ajax',reqData);
//            		});
//				},
//				errorCallBack: function() {
//					$.messager.alert('提示', errorMsg);
//				}
//					
//			};
//			iplantAjaxRequest(ajaxParam);
			
		}
		
			
	};
	application.prototype = {
		init: function() {
			$(function() {
				//货架信息
				iplantAjaxRequest( {
	    			url: '/iPlant_ajax',
	    			data: {IFS:'WMS_B00073',WAREHOUSE_ID:'C0001'},
	    			successCallBack: function (data) {
	    				var rowCollection = createSourceObj(data);
	    				for(var i=0; i<rowCollection.length;i++){
	    					warhouseType.push({"id":rowCollection[i].SHELF_ID,"text":rowCollection[i].SHELF_NAME});
	    					
	    				}
	    				
	    				$('#txtSHELF_NAME').combobox({
							data : warhouseType,
							valueField : 'id',
							textField : 'text',
//							onSelect: function (record) {
//							  shelfid=record.id;
//							  getcombobox();
//							}
						});	  
	    			
	    			}
	    		});
				var CompanyOpttype; //0：新增   1:编辑
				getSelectedCondtion();
				initGridData();							
				$('#btnSearch').click(function() {
					getDataBySearch();
				});				
				$('.add').click(function() {					
					setDataNull();
					addStation();
				});
				$('#btnUpdate').click(function() {	
					updateStation();
				});
				$('.save').click(function() {
					savaStation();
				});
				$('#btnDelete').click(function(){
	                deleteStation();
	            });
				$('.close').click(function() {
					setDataNull();
					$('#enditTab').dialog('close');
				});
				$('.panel-tool-close').click(function() {
					setDataNull();
				});
			});
		}
	}
	var fcfo = new application();
	var warhouseType=[];
	fcfo.init();
})();