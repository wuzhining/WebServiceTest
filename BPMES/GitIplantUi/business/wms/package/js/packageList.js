
(function() {
	function application() {		
		initGridData = function() {
			    var dgrid = $('#wms_container_tab').datagrid('options');
				if(!dgrid) return;
				var reqData = {
					IFS: 'WMS_B00081',
					pageIndex: 1,
					pageSize: dgrid.pageSize
				}
				reqGridData('/iPlant_ajax', 'wms_container_tab', reqData);
				
			},
			bindGridData = function(reqData, jsonData) {
				var grid = {
					name: 'wms_container_tab',
					dataType: 'json',
					columns: [
						[
							{
								
								field: 'CONTAINER_ID',
								title: '包装箱ID',								
								width: 80,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}
							}, {
								field: 'CONTAINER_NAME',
								title: '包装箱名称',
								width: 100,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}
							},
							 {
								field: 'CONTAINER_LENGTH',
								title: '长',
								width: 50,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}
							},
							 {
								field: 'CONTAINER_WIDTH',
								title: '宽',
								width: 50,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}
							},
							 {
								field: 'CONTAINER_HEIGHT',
								title: '高',
								width: 50,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}
							},
							 {
								field: 'CONTAINER_SELFWEIGHT',
								title: '自重',
								width: 100,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}
							},
							 {
								field: 'CONTAINER_MAXFILLWEIGHT',
								title: '最大装货重量',
								width: 100,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}
							},
							{
								field : 'CONTAINER_STATUS',
								title : '是否能用',
								width : 100,
								align : 'center',
								formatter : function(value, row, index) {
									if (value == 'Y') {
										return '能用';
									} else {
										return '不能用';
									}
								}
							},
							{
								field : 'CONTAINER_MIXSHOPORDERS',
								title : '是否工单混合包装',
								width : 120,
								align : 'center',
								formatter : function(value, row, index) {
									if (value == 'Y') {
										return '是';
									} else {
										return '不是';
									}
								}
							},
							{
								field : 'CONTAINER_MIXITEMS',
								title : '是否产品混合包装',
								width : 120,
								align : 'center',
								formatter : function(value, row, index) {
									if (value == 'Y') {
										return '是';
									} else {
										return '不是';
									}
								}
							},
							{
								field: 'CONTAINER_DESC',
								title: '描述',
								width: 150,
								align: 'center',								
								formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'CONTAINER_CREATEBY',
								title: '创建人',
								width: 100,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}
							}, {
								field: 'CONTAINER_CREATEDT',
								title: '创建时间',
								width: 100,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}								
							}, {
								field: 'CONTAINER_MODIFYBY',
								title: '修改人',
								width: 100,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}
							}, {
								field: 'CONTAINER_MODIFYDT',
								title: '修改时间',
								width: 100,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}
								}, 

						]
					],
					onDblClickRow: function(index,row){	
				    	 CompanyOpttype=1;
				    	 $("#enditTab").dialog("open").dialog('setTitle', '修改包装箱列表');
				    	 checkFun();
				    	    $('#txtCONTAINER_ID').textbox('setValue', row.CONTAINER_ID==null?'':row.CONTAINER_ID);
							$('#txtCONTAINER_NAME').textbox('setValue', row.CONTAINER_NAME==null?'':row.CONTAINER_NAME);
							$('#txtCONTAINER_LENGTH').textbox('setValue', row.CONTAINER_LENGTH==null?'':row.CONTAINER_LENGTH);
							$('#txtCONTAINER_WIDTH').textbox('setValue', row.CONTAINER_WIDTH==null?'':row.CONTAINER_WIDTH);
							$('#txtCONTAINER_HEIGHT').textbox('setValue', row.CONTAINER_HEIGHT==null?'':row.CONTAINER_HEIGHT);
							$('#txtCONTAINER_SELFWEIGHT').textbox('setValue', row.CONTAINER_SELFWEIGHT==null?'':row.CONTAINER_SELFWEIGHT);
							$('#txtCONTAINER_MAXFILLWEIGHT').textbox('setValue', row.CONTAINER_MAXFILLWEIGHT==null?'':row.CONTAINER_MAXFILLWEIGHT);
							$('#txtCONTAINER_STATUS').val(row.CONTAINER_STATUS);
							$('#txtCONTAINER_MIXSHOPORDERS').val(row.CONTAINER_MIXSHOPORDERS);
							$('#txtCONTAINER_MIXITEMS').val(row.CONTAINER_MIXITEMS);
							$('#txtCONTAINER_DESC').textbox('setValue', row.CONTAINER_DESC==null?'':row.CONTAINER_DESC);
							if ("Y" == row.CONTAINER_STATUS) {
								$('#txtCONTAINER_STATUS').prop('checked', 'checked');
						 } else {
								$('#txtCONTAINER_STATUS').prop('checked', '');
						 }		
							if ("Y" == row.CONTAINER_MIXSHOPORDERS) {
								$('#txtCONTAINER_MIXSHOPORDERS').prop('checked', 'checked');
						 } else {
								$('#txtCONTAINER_MIXSHOPORDERS').prop('checked', '');
						 }	
							if ("Y" == row.CONTAINER_MIXITEMS) {
								$('#txtCONTAINER_MIXITEMS').prop('checked', 'checked');
						 } else {
								$('#txtCONTAINER_MIXITEMS').prop('checked', '');
						 }	
				     }
				}
				initGridView(reqData, grid);
				$('#wms_container_tab').datagrid('loadData', jsonData);
			}
			checkFun = function (){
				var qx = getUpdateRight();
				if(qx=="Y"){
					 $('#txtCONTAINER_ID').textbox('textbox').attr('disabled', true);   	
			    	 $('#saveID').show();
			    	 $('#cancleID').show();
				}else{
					CompanyOpttype=2;
					 $('#txtCONTAINER_ID').textbox('textbox').attr('disabled', true);
			    	 $('#saveID').hide();
//			    	 $('#cancleID').hide();
				} 
			}
		setDataNull = function () {           
              $('#txtCONTAINER_ID').textbox('setValue','');              
          }
		getDataBySearch = function(){
				var dgrid = $('#wms_container_tab').datagrid('options');
				if(!dgrid) return;
				var cxCONTAINER_NAME = $('#CONTAINER_NAME').val();
//				alert(cxCONTAINER_NAME);
				var reqData = {
						CONTAINER_NAME: cxCONTAINER_NAME,					
					IFS: 'WMS_B00081',
					pageIndex: 1,
					pageSize: dgrid.pageSize
				}
				reqGridData('/iPlant_ajax', 'wms_container_tab',reqData);
			}
			/* 修改商品移动信息 */			
		updateStation = function() {
			var checkedItems = $('#wms_container_tab').datagrid('getSelections');
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
			var row = $("#wms_container_tab").datagrid("getSelected");
			if(row) {				
//				$("#searchCondition").dialog("close");
				$("#enditTab").dialog("open").dialog('setTitle', '编辑包装列表信息');
				$('#txtCONTAINER_ID').textbox('textbox').attr('readonly', true);
				$('#txtCONTAINER_ID').textbox('textbox').attr('disabled', true);
				$('#txtCONTAINER_ID').textbox('setValue', row.CONTAINER_ID==null?'':row.CONTAINER_ID);
				$('#txtCONTAINER_NAME').textbox('setValue', row.CONTAINER_NAME==null?'':row.CONTAINER_NAME);
				$('#txtCONTAINER_LENGTH').textbox('setValue', row.CONTAINER_LENGTH==null?'':row.CONTAINER_LENGTH);
				$('#txtCONTAINER_WIDTH').textbox('setValue', row.CONTAINER_WIDTH==null?'':row.CONTAINER_WIDTH);
				$('#txtCONTAINER_HEIGHT').textbox('setValue', row.CONTAINER_HEIGHT==null?'':row.CONTAINER_HEIGHT);
				$('#txtCONTAINER_SELFWEIGHT').textbox('setValue', row.CONTAINER_SELFWEIGHT==null?'':row.CONTAINER_SELFWEIGHT);
				$('#txtCONTAINER_MAXFILLWEIGHT').textbox('setValue', row.CONTAINER_MAXFILLWEIGHT==null?'':row.CONTAINER_MAXFILLWEIGHT);
				$('#txtCONTAINER_STATUS').val(row.CONTAINER_STATUS);
				$('#txtCONTAINER_MIXSHOPORDERS').val(row.CONTAINER_MIXSHOPORDERS);
				$('#txtCONTAINER_MIXITEMS').val(row.CONTAINER_MIXITEMS);
				$('#txtCONTAINER_DESC').textbox('setValue', row.CONTAINER_DESC==null?'':row.CONTAINER_DESC);
				CompanyOpttype = 1;	
				if ("Y" == row.CONTAINER_STATUS) {
					$('#txtCONTAINER_STATUS').prop('checked', 'checked');
			 } else {
					$('#txtCONTAINER_STATUS').prop('checked', '');
			 }		
				if ("Y" == row.CONTAINER_MIXSHOPORDERS) {
					$('#txtCONTAINER_MIXSHOPORDERS').prop('checked', 'checked');
			 } else {
					$('#txtCONTAINER_MIXSHOPORDERS').prop('checked', '');
			 }	
				if ("Y" == row.CONTAINER_MIXITEMS) {
					$('#txtCONTAINER_MIXITEMS').prop('checked', 'checked');
			 } else {
					$('#txtCONTAINER_MIXITEMS').prop('checked', '');
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
             var isSelectedData = validSelectedData('#wms_container_tab', 'Delete');
             if (!isSelectedData) {
                 $.messager.alert('提示', '请选择一条数据进行删除');
                 return;
             }
             var checkedItems = $('#wms_container_tab').datagrid('getSelections');
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
                                     IFS: 'WMS_B00084',
                                     CONTAINER_ID: item.CONTAINER_ID,
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
                      IFS:'WMS_B00085',
                },
                successCallBack:function(data){
                    var rowNum=0
                    if(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS){
                        rowNum=parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
                        workOrderData=data.RESPONSE["0"].RESPONSE_DATA[0];
                    }
                    $('#txtCONTAINER_ID').textbox('setValue',workOrderData.CONTAINER_ID).textbox('readonly').textbox({ required: true });                                                                         
                }
            } 
            iplantAjaxRequest(ajaxParam); 
        }
		/* 添加包装信息信息 */
		addStation = function() {
        	CompanyOpttype = 0;
        	getApplyOrder();
        	checkFun();
        	$('#txtCONTAINER_ID').textbox('textbox').attr('readonly',false);
			$('#txtCONTAINER_ID').textbox('textbox').attr('disabled',false);
			$("#enditTab").dialog("open").dialog('setTitle', '包装列表信息添加');
			$("#fmStation").form("clear");			
		}
        /*验证修改内容是否重复*/
        saveUpdateValidate = function() {
			var checkedItems = $('#wms_container_tab').datagrid('getSelections');
			row = checkedItems[0];
			if (row.CONTAINER_ID) {
				var isUserYn = 'N';
				if ($('#txtCONTAINER_STATUS').is(':checked')) {
					isUserYn = "Y";
				} else {
					isUserYn = "N";
				}
				if ($('#txtCONTAINER_ID').textbox('getValue') != (row.CONTAINER_ID==null?'':row.CONTAINER_ID)
						|| $('#txtCONTAINER_NAME').textbox('getValue') != (row.CONTAINER_NAME==null?'':row.CONTAINER_NAME)						
						|| isUserYn != row.USE_YN
						|| $('#txtCONTAINER_DESC').textbox('getValue') != (row.CONTAINER_DESC==null?'':row.CONTAINER_DESC)) {
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
				IFServerNo = 'WMS_B00082'
			} else if(CompanyOpttype == 1) {
				if (!saveUpdateValidate()) {
					$.messager.alert("提示", '内容没有更新，请修改')
					return false;
				}
				IFServerNo = 'WMS_B00083'
			} else {
				IFServerNo = 'WMS_B00081'
			}
		    var useYn = '';
		    var useYn1 = '';
		    var useYn2 = '';
			if ($('#txtCONTAINER_STATUS').is(':checked')) {
				useYn = "Y";
			} else {
				useYn = "N";
			}
			if ($('#txtCONTAINER_MIXSHOPORDERS').is(':checked')) {
				useYn1 = "Y";
			} else {
				useYn1 = "N";
			}
			if ($('#txtCONTAINER_MIXITEMS').is(':checked')) {
				useYn2 = "Y";
			} else {
				useYn2 = "N";
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
					CONTAINER_ID: $('#txtCONTAINER_ID').val(),
					CONTAINER_NAME: $('#txtCONTAINER_NAME').val(),
					CONTAINER_LENGTH: $('#txtCONTAINER_LENGTH').val(),
					CONTAINER_WIDTH: $('#txtCONTAINER_WIDTH').val(),
					CONTAINER_HEIGHT: $('#txtCONTAINER_HEIGHT').val(),
					CONTAINER_SELFWEIGHT: $('#txtCONTAINER_SELFWEIGHT').val(),
					CONTAINER_MAXFILLWEIGHT: $('#txtCONTAINER_MAXFILLWEIGHT').val(),
					CONTAINER_STATUS: useYn,
					CONTAINER_MIXSHOPORDERS: useYn1,
					CONTAINER_MIXITEMS: useYn2,
					CONTAINER_DESC: $('#txtCONTAINER_DESC').val(),									
					IFS: IFServerNo
				},
				successCallBack: function(data) {
					var susMsg=getReturnMsg(data);
                	$.messager.alert("提示",susMsg,"",function(){
            			reqGridData('/iPlant_ajax','wms_container_tab',{IFS:'WMS_B00081'});
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
					//bindCombogrid();
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