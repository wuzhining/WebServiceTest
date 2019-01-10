
(function() {
	function application() {	
		getSelectedCondtion = function() {	
		 //查询货架信息
			iplantAjaxRequest({
				url : '/iPlant_ajax',
				data : {
					IFS : 'WMS_B00073'	,
					WAREHOUSE_ID:'C0002'
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
					IFS: 'WMS_B00074',
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
								
								field: 'CP_ID',
								title: 'ID',								
								width: 100,
								hidden:true,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'SHELF_ID',
								title: '成品货架编号',
								width: 150,	
								hidden:true,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'SHELF_NAME',
								title: '成品货架名称',
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
		                                   return '待处理';
		                               }
		                               if (value == '1') {
		                                   return '已处理';
		                               }
		                               if (value == '2') {
		                                   return '处理中';
		                               }
		                               else {
		                                   return '失败';
		                               }
		                           }
							},{
								field: 'CRT_NM',
								title: '创建人',
								width: 150,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'CRT_TIME',
								title: '创建时间',
								width: 200,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}								
							},{
								field: 'UP_TIME',
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
				    	 $("#enditTab").dialog("open").dialog('setTitle', '修改成品仓出入库中间表信息');
				    	 checkFun();
				    	    $('#txtCP_ID').textbox('setValue', row.CP_ID==null?'':row.CP_ID);							
				    	    $('#txtSHELF_NAME').combobox('setValue', row.SHELF_ID==null?'':row.SHELF_ID);
							$('#txtSHELF_NAME').combobox('setText', row.SHELF_NAME==null?'':row.SHELF_NAME);							
							$('#txtROW_ID').combobox('setValue', row.ROW_ID==null?'':row.ROW_ID);
							$('#txtCOLUMN_ID').combobox('setValue', row.COLUMN_ID==null?'':row.COLUMN_ID);							
							$('#txtDIRECT').combobox('setValue', row.DIRECT==null?'':row.DIRECT);
							$('#txtOPERATE_STATUS').combobox('setValue', row.OPERATE_STATUS==null?'':row.OPERATE_STATUS);
				     }
				}
				initGridView(reqData, grid);
				$('#WMSWCSlink_tab').datagrid('loadData', jsonData);
			}
			checkFun = function (){
				var qx = getUpdateRight();
				if(qx=="Y"){
					 $('#txtCP_ID').textbox('textbox').attr('disabled', true);			    	 
			    	 $('#txtSHELF_NAME').combobox('textbox').attr('disabled', false);			    	 
			    	 $('#txtROW_ID').combobox('textbox').attr('disabled', false);
			    	 $('#txtCOLUMN_ID').combobox('textbox').attr('disabled', false);			    	
			    	 $('#txtDIRECT').combobox('textbox').attr('disabled', false);
			    	 $('#txtOPERATE_STATUS').combobox('textbox').attr('disabled', false);
			    	 $('#saveID').show();
			    	 $('#cancleID').show();
				}else{
					CompanyOpttype=2;
					 $('#txtCP_ID').textbox('textbox').attr('disabled', true);			    	 
			    	 $('#txtSHELF_NAME').combobox('textbox').attr('disabled', false);
			    	 $('#txtROW_ID').combobox('textbox').attr('disabled', false);
			    	 $('#txtCOLUMN_ID').combobox('textbox').attr('disabled', false);
			    	 $('#txtDIRECT').combobox('textbox').attr('disabled', false);
			    	 $('#txtOPERATE_STATUS').combobox('textbox').attr('disabled', false);
			    	 $('#saveID').hide();
//			    	 $('#cancleID').hide();
				}
				 
			}		
		setDataNull = function () {           
              $('#txtCP_ID').textbox('setValue','');              
          }
		getDataBySearch = function(){
				var dgrid = $('#WMSWCSlink_tab').datagrid('options');
				if(!dgrid) return;
				var cxSHELF_NAME= $('#cxSHELF_ID').combobox("getValue");
				var cxROW_ID= $('#cxROW_ID').combobox("getValue");
				var cxDIRECT= $('#cxDIRECT').combobox("getValue");
				var cxOPERATE_STATUS= $('#cxOPERATE_STATUS').combobox("getValue");
				var reqData = {
						SHELF_NAME: cxSHELF_NAME,
						ROW_ID: cxROW_ID,	
						DIRECT: cxDIRECT,	
						OPERATE_STATUS: cxOPERATE_STATUS,
					IFS: 'WMS_B00074',
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
				$("#enditTab").dialog("open").dialog('setTitle', '编辑成品仓出入库中间表信息');
				$('#txtCP_ID').textbox('textbox').attr('readonly', true);
				$('#txtCP_ID').textbox('textbox').attr('disabled', true);
				$('#txtCP_ID').textbox('setValue', row.TEMP_ID==null?'':row.TEMP_ID);				
				$('#txtSHELF_NAME').combobox('setValue', row.SHELF_ID==null?'':row.SHELF_ID);
				$('#txtSHELF_NAME').combobox('setText', row.SHELF_NAME==null?'':row.SHELF_NAME);
				$('#txtROW_ID').combobox('setValue', row.ROW_ID==null?'':row.ROW_ID);
				$('#txtCOLUMN_ID').combobox('setValue', row.COLUMN_ID==null?'':row.COLUMN_ID);
				$('#txtDIRECT').combobox('setValue', row.DIRECT==null?'':row.DIRECT);
				$('#txtOPERATE_STATUS').combobox('setValue', row.OPERATE_STATUS==null?'':row.OPERATE_STATUS);
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
                                     IFS: 'WMS_B00077',
                                     CP_ID: item.CP_ID,
                                 },
                                 successCallBack:function(data){
                                 	 if(delCnt==checkedItems.length){
	                              	 	if(data.RESPONSE["0"].RESPONSE_HDR.MSG_CODE=='0'){
	                              	 		var reqData = {
	                            					TEMP_ID: item.CP_ID,
	                            					IFS: 'WMS_B00064'
	                							}
	                						   universalAccess('/iPlant_ajax',reqData); 
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
                    $('#txtCP_ID').textbox('setValue',workOrderData.TEMP_ID).textbox('readonly').textbox({ required: true });                                                                         
                }
            } 
            iplantAjaxRequest(ajaxParam); 
        }
           
        //货位列下拉
        getcolcombobox =function(){
             var ajaxParam={
                 url:'/iPlant_ajax',
                 data:{
                       IFS:'WMS_B00073',
                       SHELF_ID:shelfid
                 },
                 successCallBack:function(data){
                	 colid=[];
                	 var rowCollection=createSourceObj(data);
                	 for(var i=1 ;i<=rowCollection[0].COL_ID ;i++){
                		 colid.push({"id":i,"text":i});
                	 }
                	 console.log(colid);
                     $('#txtCOLUMN_ID').combobox({
							data: colid,
							valueField : 'id',
							textField : 'text'
						});	 
                     
                 }
             } 
             iplantAjaxRequest(ajaxParam);    
        }
        
        //货位行下拉
        getrowcombobox =function(){
            var ajaxParam={
                url:'/iPlant_ajax',
                data:{
                      IFS:'WMS_B00073',
                      SHELF_ID:shelfid
                },
                successCallBack:function(data){
                	rowid=[];
               	 var rowCollection=createSourceObj(data);
               	 for(var i=1 ;i<=rowCollection[0].ROW_ID ;i++){
               		rowid.push({"id":i,"text":i});
               	 }
                    $('#txtROW_ID').combobox({
							data: rowid,
							valueField : 'id',
							textField : 'text'
						});	 
                    
                }
            } 
            iplantAjaxRequest(ajaxParam);    
       }
        
		/* 添加商品移动信息 */
		addStation = function() {
        	CompanyOpttype = 0;
        	getApplyOrder();
        	checkFun();
        	$('#txtCP_ID').textbox('textbox').attr('readonly',false);
			$('#txtCP_ID').textbox('textbox').attr('disabled',false);
			$("#enditTab").dialog("open").dialog('setTitle', '成品仓出入库中间表信息添加');
			$("#fmStation").form("clear");			
		}
        /*验证修改内容是否重复*/
        saveUpdateValidate = function() {
			var checkedItems = $('#WMSWCSlink_tab').datagrid('getSelections');
			row = checkedItems[0];
			if (row.CP_ID) {
				if ($('#txtCP_ID').textbox('getValue') != (row.CP_ID==null?'':row.CP_ID)						
						||$('#txtSHELF_NAME').combobox('getText') != (row.SHELF_NAME==null?'':row.SHELF_NAME)						
						||$('#txtROW_ID').combobox('getValue') != (row.ROW_ID==null?'':row.ROW_ID)
						||$('#txtCOLUMN_ID').combobox('getValue') != (row.COLUMN_ID==null?'':row.COLUMN_ID)						
						||$('#txtDIRECT').combobox('getValue') != (row.DIRECT==null?'':row.DIRECT)
						||$('#txtOPERATE_STATUS').combobox('getValue') != (row.OPERATE_STATUS==null?'':row.OPERATE_STATUS)) {
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
							CP_ID: $('#txtCP_ID').val(),	
							SHELF_ID: $('#txtSHELF_NAME').combobox('getValue'),
							SHELF_NAME: $('#txtSHELF_NAME').combobox('getText'),
							ROW_ID: $('#txtROW_ID').combobox('getValue'),
							COLUMN_ID: $('#txtCOLUMN_ID').combobox('getValue'),
							DIRECT: $('#txtDIRECT').combobox('getValue'),
							OPERATE_STATUS: $('#txtOPERATE_STATUS').combobox('getValue'),
							IFS: 'WMS_B00075'
						},
						successCallBack: function(data) {
							var susMsg=getReturnMsg(data);
		                	$.messager.alert("提示",susMsg,"",function(){
		            			reqGridData('/iPlant_ajax','WMSWCSlink_tab',{IFS:'WMS_B00074'});
		            			var reqData = {
		            					TEMP_ID: $('#txtCP_ID').val(),	
		            					SHELF_ID: $('#txtSHELF_NAME').combobox('getValue'),
		            					SHELF_NAME: $('#txtSHELF_NAME').combobox('getText'),
		            					ROW_ID: $('#txtROW_ID').combobox('getValue'),
		            					COLUMN_ID: $('#txtCOLUMN_ID').combobox('getValue'),
		            					DIRECT: $('#txtDIRECT').combobox('getValue'),
		            					OPERATE_STATUS: $('#txtOPERATE_STATUS').combobox('getValue'),
		            					IFS: 'WMS_B00062'
									}
								   universalAccess('/iPlant_ajax',reqData);
		            			$('#enditTab').dialog('close');
		            			setDataNull();
		            			initGridData();
		            		});
						},
						errorCallBack: function() {
							$.messager.alert('提示', errorMsg);
						}
							
					};
					iplantAjaxRequest(ajaxParam);
			} 
		    else if(CompanyOpttype == 1) {
				if (!saveUpdateValidate()) {
					$.messager.alert("提示", '内容没有更新，请修改')
					return false;
				}
				var ajaxParam = {
						url: '/iPlant_ajax',
						dataType: 'JSON',
						data: {
							CP_ID: $('#txtCP_ID').val(),	
							SHELF_ID: $('#txtSHELF_NAME').combobox('getValue'),
							SHELF_NAME: $('#txtSHELF_NAME').combobox('getText'),
							ROW_ID: $('#txtROW_ID').combobox('getValue'),
							COLUMN_ID: $('#txtCOLUMN_ID').combobox('getValue'),
							DIRECT: $('#txtDIRECT').combobox('getValue'),
							OPERATE_STATUS: $('#txtOPERATE_STATUS').combobox('getValue'),
							IFS: 'WMS_B00076'
						},
						successCallBack: function(data) {
							var susMsg=getReturnMsg(data);
		                	$.messager.alert("提示",susMsg,"",function(){
		            			reqGridData('/iPlant_ajax','WMSWCSlink_tab',{IFS:'WMS_B00074'});
		            			var reqData = {
		            					TEMP_ID: $('#txtCP_ID').val(),	
		            					SHELF_ID: $('#txtSHELF_NAME').combobox('getValue'),
		            					SHELF_NAME: $('#txtSHELF_NAME').combobox('getText'),
		            					ROW_ID: $('#txtROW_ID').combobox('getValue'),
		            					COLUMN_ID: $('#txtCOLUMN_ID').combobox('getValue'),
		            					DIRECT: $('#txtDIRECT').combobox('getValue'),
		            					OPERATE_STATUS: $('#txtOPERATE_STATUS').combobox('getValue'),
		            					IFS: 'WMS_B00063'
									}
								   universalAccess('/iPlant_ajax',reqData);
		            			$('#enditTab').dialog('close');
		            			setDataNull();
		            			initGridData();
		            		});
						},
						errorCallBack: function() {
							$.messager.alert('提示', errorMsg);
						}
							
					};
					iplantAjaxRequest(ajaxParam);
			} else {
				IFServerNo = 'WMS_B00074'
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
//					CP_ID: $('#txtCP_ID').val(),	
//					SHELF_ID: $('#txtSHELF_NAME').combobox('getValue'),
//					SHELF_NAME: $('#txtSHELF_NAME').combobox('getText'),
//					ROW_ID: $('#txtROW_ID').combobox('getValue'),
//					COLUMN_ID: $('#txtCOLUMN_ID').combobox('getValue'),
//					DIRECT: $('#txtDIRECT').combobox('getValue'),
//					OPERATE_STATUS: $('#txtOPERATE_STATUS').combobox('getValue'),
//					IFS: IFServerNo
//				},
//				successCallBack: function(data) {
//					var susMsg=getReturnMsg(data);
//                	$.messager.alert("提示",susMsg,"",function(){
//            			reqGridData('/iPlant_ajax','WMSWCSlink_tab',{IFS:'WMS_B00074'});
//            			var reqData = {
//            					TEMP_ID: $('#txtCP_ID').val(),	
//            					SHELF_ID: $('#txtSHELF_NAME').combobox('getValue'),
//            					SHELF_NAME: $('#txtSHELF_NAME').combobox('getText'),
//            					ROW_ID: $('#txtROW_ID').combobox('getValue'),
//            					COLUMN_ID: $('#txtCOLUMN_ID').combobox('getValue'),
//            					DIRECT: $('#txtDIRECT').combobox('getValue'),
//            					OPERATE_STATUS: $('#txtOPERATE_STATUS').combobox('getValue'),
//            					IFS: 'WMS_B00062'
//							}
//						   universalAccess('/iPlant_ajax',reqData);
//            			$('#enditTab').dialog('close');
//            			setDataNull();
//            			initGridData();
//            		});
//				},
//				errorCallBack: function() {
//					$.messager.alert('提示', errorMsg);
//				}
//					
//			};
//			iplantAjaxRequest(ajaxParam);
//			
		}
		
			
	};
	application.prototype = {
		init: function() {
			$(function() {
				//货架信息
				iplantAjaxRequest( {
	    			url: '/iPlant_ajax',
	    			data: {IFS:'WMS_B00073',WAREHOUSE_ID:'C0002'},
	    			successCallBack: function (data) {
	    				var rowCollection = createSourceObj(data);
	    				for(var i=0; i<rowCollection.length;i++){
	    					warhouseType.push({"id":rowCollection[i].SHELF_ID,"text":rowCollection[i].SHELF_NAME});
	    					arrList[rowCollection.id]=rowCollection;
	    				}
	    				
	    				$('#txtSHELF_NAME').combobox({
							data : warhouseType,
							valueField : 'id',
							textField : 'text',
							onSelect: function (record) {
							  shelfid=record.id;
							  getcolcombobox();
							  getrowcombobox();
							}
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
	var shelfid=[];
	var colid=[];
	var rowid=[];
	var arrList={};
	fcfo.init();
})();