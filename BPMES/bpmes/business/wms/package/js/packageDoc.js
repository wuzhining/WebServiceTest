
(function() {
	function application() {		
		initGridData = function() {
			    var dgrid = $('#wms_containerdoc_tab').datagrid('options');
				if(!dgrid) return;
				var reqData = {
					IFS: 'WMS_B00086',
					pageIndex: 1,
					pageSize: dgrid.pageSize
				}
				reqGridData('/iPlant_ajax', 'wms_containerdoc_tab', reqData);
				
			},
			bindGridData = function(reqData, jsonData) {
				var grid = {
					name: 'wms_containerdoc_tab',
					dataType: 'json',
					columns: [
						[
							{
								
								field: 'CONTDOC_ID',
								title: '标签ID',								
								width: 80,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}
							}, {
								field: 'CONTAINER_ID',
								title: '包装箱ID',
								width: 80,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}
							},
							 {
								field: 'DOC_ID',
								title: '标签',
								width: 100,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}
							},
							 {
								field: 'CONTDOC_SEQ',
								title: '标签序列号',
								width: 100,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'CONTDOC_CREATEBY',
								title: '创建人',
								width: 100,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}
							}, {
								field: 'CONTDOC_CREATEDT',
								title: '创建时间',
								width: 100,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}								
							}, {
								field: 'CONTDOC_MODIFYBY',
								title: '修改人',
								width: 100,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}
							}, {
								field: 'CONTDOC_MODIFYDT',
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
				    	 $("#enditTab").dialog("open").dialog('setTitle', '修改包装箱标签');
				    	 checkFun();
				    	    $('#txtCONTDOC_ID').textbox('setValue', row.CONTDOC_ID==null?'':row.CONTDOC_ID);
							$('#txtCONTAINER_ID').textbox('setValue', row.CONTAINER_ID==null?'':row.CONTAINER_ID);
							$('#txtDOC_ID').textbox('setValue', row.DOC_ID==null?'':row.DOC_ID);
							$('#txtCONTDOC_SEQ').textbox('setValue', row.CONTDOC_SEQ==null?'':row.CONTDOC_SEQ);
				     }
				}
				initGridView(reqData, grid);
				$('#wms_containerdoc_tab').datagrid('loadData', jsonData);
			}
			checkFun = function (){
				var qx = getUpdateRight();
				if(qx=="Y"){
					 $('#txtCONTDOC_ID').textbox('textbox').attr('disabled', true);   	
			    	 $('#saveID').show();
			    	 $('#cancleID').show();
				}else{
					CompanyOpttype=2;
					 $('#txtCONTDOC_ID').textbox('textbox').attr('disabled', true);
			    	 $('#saveID').hide();
//			    	 $('#cancleID').hide();
				} 
			}
		setDataNull = function () {           
              $('#txtCONTDOC_ID').textbox('setValue','');              
          }
		getDataBySearch = function(){
				var dgrid = $('#wms_containerdoc_tab').datagrid('options');
				if(!dgrid) return;
				var cxDOC_ID = $('#DOC_ID').val();
//				alert(cxDOC_ID);
				var reqData = {
						DOC_ID: cxDOC_ID,					
					IFS: 'WMS_B00086',
					pageIndex: 1,
					pageSize: dgrid.pageSize
				}
				reqGridData('/iPlant_ajax', 'wms_containerdoc_tab',reqData);
			}
			/* 修改包装标签信息 */			
		updateStation = function() {
			var checkedItems = $('#wms_containerdoc_tab').datagrid('getSelections');
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
			var row = $("#wms_containerdoc_tab").datagrid("getSelected");
			if(row) {				
//				$("#searchCondition").dialog("close");
				$("#enditTab").dialog("open").dialog('setTitle', '编辑包装箱标签');
				$('#txtCONTDOC_ID').textbox('textbox').attr('readonly', true);
				$('#txtCONTDOC_ID').textbox('textbox').attr('disabled', true);
				$('#txtCONTDOC_ID').textbox('setValue', row.CONTDOC_ID==null?'':row.CONTDOC_ID);
				$('#txtCONTAINER_ID').textbox('setValue', row.CONTAINER_ID==null?'':row.CONTAINER_ID);
				$('#txtDOC_ID').textbox('setValue', row.DOC_ID==null?'':row.DOC_ID);
				$('#txtCONTDOC_SEQ').textbox('setValue', row.CONTDOC_SEQ==null?'':row.CONTDOC_SEQ);
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
             var isSelectedData = validSelectedData('#wms_containerdoc_tab', 'Delete');
             if (!isSelectedData) {
                 $.messager.alert('提示', '请选择一条数据进行删除');
                 return;
             }
             var checkedItems = $('#wms_containerdoc_tab').datagrid('getSelections');
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
                                     IFS: 'WMS_B00089',
                                     CONTDOC_ID: item.CONTDOC_ID,
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
                      IFS:'WMS_B00090',
                },
                successCallBack:function(data){
                    var rowNum=0
                    if(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS){
                        rowNum=parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
                        workOrderData=data.RESPONSE["0"].RESPONSE_DATA[0];
                    }
                    $('#txtCONTDOC_ID').textbox('setValue',workOrderData.CONTDOC_ID).textbox('readonly').textbox({ required: true });                                                                         
                }
            } 
            iplantAjaxRequest(ajaxParam); 
        }
		/* 添加包装标签信息 */
		addStation = function() {
        	CompanyOpttype = 0;
        	getApplyOrder();
        	checkFun();
        	$('#txtCONTDOC_ID').textbox('textbox').attr('readonly',false);
			$('#txtCONTDOC_ID').textbox('textbox').attr('disabled',false);
			$("#enditTab").dialog("open").dialog('setTitle', '包装标签信息添加');
			$("#fmStation").form("clear");			
		}
        /*验证修改内容是否重复*/
        saveUpdateValidate = function() {
			var checkedItems = $('#wms_containerdoc_tab').datagrid('getSelections');
			row = checkedItems[0];
			if (row.CONTDOC_ID) {
				if ($('#txtCONTDOC_ID').textbox('getValue') != (row.CONTDOC_ID==null?'':row.CONTDOC_ID)
						|| $('#txtCONTAINER_ID').textbox('getValue') != (row.CONTAINER_ID==null?'':row.CONTAINER_ID)						
						|| $('#txtCONTDOC_SEQ').textbox('getValue') != (row.CONTDOC_SEQ==null?'':row.CONTDOC_SEQ)
						|| $('#txtDOC_ID').textbox('getValue') != (row.DOC_ID==null?'':row.DOC_ID)) {
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
				IFServerNo = 'WMS_B00087'
			} else if(CompanyOpttype == 1) {
				if (!saveUpdateValidate()) {
					$.messager.alert("提示", '内容没有更新，请修改')
					return false;
				}
				IFServerNo = 'WMS_B00088'
			} else {
				IFServerNo = 'WMS_B00086'
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
					CONTDOC_ID: $('#txtCONTDOC_ID').val(),
					CONTAINER_ID: $('#txtCONTAINER_ID').val(),
					DOC_ID: $('#txtDOC_ID').val(),
					CONTDOC_SEQ: $('#txtCONTDOC_SEQ').val(),								
					IFS: IFServerNo
				},
				successCallBack: function(data) {
					var susMsg=getReturnMsg(data);
                	$.messager.alert("提示",susMsg,"",function(){
            			reqGridData('/iPlant_ajax','wms_containerdoc_tab',{IFS:'WMS_B00086'});
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