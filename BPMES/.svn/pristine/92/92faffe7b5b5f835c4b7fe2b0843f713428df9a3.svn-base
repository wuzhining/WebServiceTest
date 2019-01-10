
(function() {
	function application() {		
		initGridData = function() {
			    var dgrid = $('#TaryInfo_tab').datagrid('options');
				if(!dgrid) return;
				var reqData = {
					IFS: 'WMS_B000002',
					pageIndex: 1,
					pageSize: dgrid.pageSize
				}
				reqGridData('/iPlant_ajax', 'TaryInfo_tab', reqData);
				
			},
			bindGridData = function(reqData, jsonData) {
				var grid = {
					name: 'TaryInfo_tab',
					dataType: 'json',
					columns: [
						[
							{
								
								field: 'TRAY_ID',
								title: '托盘编码',								
								width: 150,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}
							}, {
								field: 'TRAY_NAME',
								title: '托盘名称',
								width: 100,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field : 'ENABLE',
								title : '是否启用',
								width : 100,
								align : 'center',
								formatter : function(value, row, index) {
									if (value == 'Y') {
										return '启用';
									} else {
										return '未启用';
									}
								}
							},{
								field: 'NOTE',
								title: '备注',
								width: 100,
								align: 'center',								
								formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'CREATER_NAME',
								title: '创建人',
								width: 100,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}
							}, {
								field: 'CREATE_DATE',
								title: '创建时间',
								width: 200,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}								
							}, {
								field: 'UPDATER_NAME',
								title: '修改人',
								width: 100,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}
							}, {
								field: 'UPDATE_DATE',
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
				    	 $("#enditTab").dialog("open").dialog('setTitle', '修改托盘信息');
				    	 checkFun();
				    	    $('#txtTRAY_ID').textbox('setValue', row.TRAY_ID==null?'':row.TRAY_ID);
							$('#txtTRAY_NAME').textbox('setValue', row.TRAY_NAME==null?'':row.TRAY_NAME);
							$('#txtENABLE').val(row.ENABLE);
							$('#txtNOTE').textbox('setValue', row.NOTE==null?'':row.NOTE);
							if ("Y" == row.ENABLE) {
								$('#txtENABLE').prop('checked', 'checked');
						 } else {
								$('#txtENABLE').prop('checked', '');
						 }							
				     }
				}
				initGridView(reqData, grid);
				$('#TaryInfo_tab').datagrid('loadData', jsonData);
			}
			checkFun = function (){
				var qx = getUpdateRight();
				if(qx=="Y"){
					 $('#txtTRAY_ID').textbox('textbox').attr('disabled', true);
			    	 $('#txtTRAY_NAME').textbox('textbox').attr('disabled', false);
			    	 $('#txtNOTE').textbox('textbox').attr('disabled', false);		    	
			    	 $('#saveID').show();
			    	 $('#cancleID').show();
				}else{
					CompanyOpttype=2;
					 $('#txtTRAY_ID').textbox('textbox').attr('disabled', true);
			    	 $('#txtTRAY_NAME').textbox('textbox').attr('disabled', false);
			    	 $('#txtNOTE').textbox('textbox').attr('disabled', false);
			    	 $('#saveID').hide();
//			    	 $('#cancleID').hide();
				}
				 
			}		
		setDataNull = function () {           
              $('#txtTRAY_ID').textbox('setValue','');              
          }
		getDataBySearch = function(){
				var dgrid = $('#TaryInfo_tab').datagrid('options');
				if(!dgrid) return;
				var cxwarehouseDesType_id = $('#queryTRAY_ID').val();
				var cxwarehouseDesType_name = $('#queryTRAY_NAME').val();				
				var reqData = {
					WAREHOUSE_TYPE_ID: cxwarehouseDesType_id,
					WAREHOUSE_TYPE_NAME: cxwarehouseDesType_name,					
					IFS: 'WMS_B000002',
					pageIndex: 1,
					pageSize: dgrid.pageSize
				}
				reqGridData('/iPlant_ajax', 'TaryInfo_tab',reqData);
			}
			/* 修改商品移动信息 */			
		updateStation = function() {
			var checkedItems = $('#TaryInfo_tab').datagrid('getSelections');
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
			var row = $("#TaryInfo_tab").datagrid("getSelected");
			if(row) {				
				$("#searchCondition").dialog("close");
				$("#enditTab").dialog("open").dialog('setTitle', '编辑托盘信息');
				$('#txtTRAY_ID').textbox('textbox').attr('readonly', true);
				$('#txtTRAY_ID').textbox('textbox').attr('disabled', true);
				$('#txtTRAY_ID').textbox('setValue', row.TRAY_ID==null?'':row.TRAY_ID);
				$('#txtTRAY_NAME').textbox('setValue', row.TRAY_NAME==null?'':row.TRAY_NAME);
				$('#txtENABLE').val(row.ENABLE);
				$('#txtNOTE').textbox('setValue', row.NOTE==null?'':row.NOTE);
				CompanyOpttype = 1;	
				if ("Y" == row.ENABLE) {
					$('#txtENABLE').prop('checked', 'checked');
				} else {
					$('#txtENABLE').prop('checked', '');
				}
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
             var isSelectedData = validSelectedData('#TaryInfo_tab', 'Delete');
             if (!isSelectedData) {
                 $.messager.alert('提示', '请选择一条数据进行删除');
                 return;
             }
             var checkedItems = $('#TaryInfo_tab').datagrid('getSelections');
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
                                     IFS: 'WMS_B000005',
                                     TRAY_ID: item.TRAY_ID,
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
                      IFS:'WMS_B00055',
                },
                successCallBack:function(data){
                    var rowNum=0
                    if(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS){
                        rowNum=parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
                        workOrderData=data.RESPONSE["0"].RESPONSE_DATA[0];
                    }
                    $('#txtTRAY_ID').textbox('setValue',workOrderData.TRAY_ID).textbox('readonly').textbox({ required: true });                                                                         
                }
            } 
            iplantAjaxRequest(ajaxParam); 
        }
		/* 添加商品移动信息 */
		addStation = function() {
        	CompanyOpttype = 0;
        	getApplyOrder();
        	checkFun();
        	$('#txtTRAY_ID').textbox('textbox').attr('readonly',false);
			$('#txtTRAY_ID').textbox('textbox').attr('disabled',false);
			$("#enditTab").dialog("open").dialog('setTitle', '托盘信息添加');
			$("#fmStation").form("clear");			
		}
        /*验证修改内容是否重复*/
        saveUpdateValidate = function() {
			var checkedItems = $('#TaryInfo_tab').datagrid('getSelections');
			row = checkedItems[0];
			if (row.TRAY_ID) {
				var isUserYn = 'N';
				if ($('#txtENABLE').is(':checked')) {
					isUserYn = "Y";
				} else {
					isUserYn = "N";
				}
				if ($('#txtTRAY_ID').textbox('getValue') != (row.TRAY_ID==null?'':row.TRAY_ID)
						|| $('#txtTRAY_NAME').textbox('getValue') != (row.TRAY_NAME==null?'':row.TRAY_NAME)						
						|| isUserYn != row.USE_YN
						|| $('#txtNOTE').textbox('getValue') != (row.NOTE==null?'':row.NOTE)) {
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
				IFServerNo = 'WMS_B000003'
			} else if(CompanyOpttype == 1) {
				if (!saveUpdateValidate()) {
					$.messager.alert("提示", '内容没有更新，请修改')
					return false;
				}
				IFServerNo = 'WMS_B000004'
			} else {
				IFServerNo = 'WMS_B000002'
			}
		    var useYn = '';
			if ($('#txtENABLE').is(':checked')) {
				useYn = "Y";
			} else {
				useYn = "N";
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
			var ajaxParam = {
				url: '/iPlant_ajax',
				dataType: 'JSON',
				data: {
					TRAY_ID: $('#txtTRAY_ID').val(),
					TRAY_NAME: $('#txtTRAY_NAME').val(),
					ENABLE: useYn,
  				    NOTE: $('#txtNOTE').val(),									
					IFS: IFServerNo
				},
				successCallBack: function(data) {
					var susMsg=getReturnMsg(data);
                	$.messager.alert("提示",susMsg,"",function(){
            			reqGridData('/iPlant_ajax','TaryInfo_tab',{IFS:'WMS_B000002'});
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
		
			
	};
	application.prototype = {
		init: function() {
			$(function() {			
				var CompanyOpttype; //0：新增   1:编辑
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
	fcfo.init();
})();