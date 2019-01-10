
(function() {
	function application() {		
		initGridData = function() {
			    var dgrid = $('#wms_containerlev_tab').datagrid('options');
				if(!dgrid) return;
				var reqData = {
					IFS: 'WMS_B00091',
					pageIndex: 1,
					pageSize: dgrid.pageSize
				}
				reqGridData('/iPlant_ajax', 'wms_containerlev_tab', reqData);
				
			},
			bindGridData = function(reqData, jsonData) {
				var grid = {
					name: 'wms_containerlev_tab',
					dataType: 'json',
					columns: [
						[
							{
								
								field: 'CONTPACKLEV_ID',
								title: '内容ID',								
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
								field: 'CONTPACKLEV_PACK',
								title: '包装类型',
								width: 80,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}
							},
							 {
								field: 'CONTPACKLEV_VALUE',
								title: '包装内容',
								width: 200,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}
							}, {
								field: 'CONTPACKLEV_REVISION',
								title: '版本',
								width: 80,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}
							}, {
								field: 'CONTPACKLEV_PRODORD',
								title: '工单',
								width: 100,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}
							}, {
								field: 'CONTPACKLEV_MINQTY',
								title: '最小数量',
								width: 80,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}
							}, {
								field: 'CONTPACKLEV_MAXQTY',
								title: '最大数量',
								width: 80,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'CONTPACKLEV_CREATEBY',
								title: '创建人',
								width: 100,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}
							}, {
								field: 'CONTPACKLEV_CREATEDT',
								title: '创建时间',
								width: 100,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}								
							}, {
								field: 'CONTPACKLEV_MODIFYBY',
								title: '修改人',
								width: 100,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}
							}, {
								field: 'CONTPACKLEV_MODIFYDT',
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
				    	 $("#enditTab").dialog("open").dialog('setTitle', '修改包装内容');
				    	 checkFun();
				    	    $('#txtCONTPACKLEV_ID').textbox('setValue', row.CONTPACKLEV_ID==null?'':row.CONTPACKLEV_ID);
							$('#txtCONTAINER_ID').textbox('setValue', row.CONTAINER_ID==null?'':row.CONTAINER_ID);
							$('#txtCONTPACKLEV_PACK').textbox('setValue', row.CONTPACKLEV_PACK==null?'':row.CONTPACKLEV_PACK);
							$('#txtCONTPACKLEV_VALUE').textbox('setValue', row.CONTPACKLEV_VALUE==null?'':row.CONTPACKLEV_VALUE);
							$('#txtCONTPACKLEV_REVISION').textbox('setValue', row.CONTPACKLEV_REVISION==null?'':row.CONTPACKLEV_REVISION);
							$('#txtCONTPACKLEV_PRODORD').textbox('setValue', row.CONTPACKLEV_PRODORD==null?'':row.CONTPACKLEV_PRODORD);
							$('#txtCONTPACKLEV_MINQTY').textbox('setValue', row.CONTPACKLEV_MINQTY==null?'':row.CONTPACKLEV_MINQTY);
							$('#txtCONTPACKLEV_MAXQTY').textbox('setValue', row.CONTPACKLEV_MAXQTY==null?'':row.CONTPACKLEV_MAXQTY);
				     }
				}
				initGridView(reqData, grid);
				$('#wms_containerlev_tab').datagrid('loadData', jsonData);
			}
			checkFun = function (){
				var qx = getUpdateRight();
				if(qx=="Y"){
					 $('#txtCONTPACKLEV_ID').textbox('textbox').attr('disabled', true);   	
			    	 $('#saveID').show();
			    	 $('#cancleID').show();
				}else{
					CompanyOpttype=2;
					 $('#txtCONTPACKLEV_ID').textbox('textbox').attr('disabled', true);
			    	 $('#saveID').hide();
//			    	 $('#cancleID').hide();
				} 
			}
		setDataNull = function () {           
              $('#txtCONTPACKLEV_ID').textbox('setValue','');              
          }
		getDataBySearch = function(){
				var dgrid = $('#wms_containerlev_tab').datagrid('options');
				if(!dgrid) return;
				var cxCONTPACKLEV_VALUE = $('#CONTPACKLEV_VALUE').val();
//				alert(cxDOC_ID);
				var reqData = {
						CONTPACKLEV_VALUE: cxCONTPACKLEV_VALUE,					
					IFS: 'WMS_B00091',
					pageIndex: 1,
					pageSize: dgrid.pageSize
				}
				reqGridData('/iPlant_ajax', 'wms_containerlev_tab',reqData);
			}
			/* 修改包装标签信息 */			
		updateStation = function() {
			var checkedItems = $('#wms_containerlev_tab').datagrid('getSelections');
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
			var row = $("#wms_containerlev_tab").datagrid("getSelected");
			if(row) {				
//				$("#searchCondition").dialog("close");
				$("#enditTab").dialog("open").dialog('setTitle', '编辑包装箱内容');
				$('#txtCONTPACKLEV_ID').textbox('textbox').attr('readonly', true);
				$('#txtCONTPACKLEV_ID').textbox('textbox').attr('disabled', true);
				$('#txtCONTPACKLEV_ID').textbox('setValue', row.CONTPACKLEV_ID==null?'':row.CONTPACKLEV_ID);
				$('#txtCONTAINER_ID').textbox('setValue', row.CONTAINER_ID==null?'':row.CONTAINER_ID);
				$('#txtCONTPACKLEV_PACK').textbox('setValue', row.CONTPACKLEV_PACK==null?'':row.CONTPACKLEV_PACK);
				$('#txtCONTPACKLEV_VALUE').textbox('setValue', row.CONTPACKLEV_VALUE==null?'':row.CONTPACKLEV_VALUE);
				$('#txtCONTPACKLEV_REVISION').textbox('setValue', row.CONTPACKLEV_REVISION==null?'':row.CONTPACKLEV_REVISION);
				$('#txtCONTPACKLEV_PRODORD').textbox('setValue', row.CONTPACKLEV_PRODORD==null?'':row.CONTPACKLEV_PRODORD);
				$('#txtCONTPACKLEV_MINQTY').textbox('setValue', row.CONTPACKLEV_MINQTY==null?'':row.CONTPACKLEV_MINQTY);
				$('#txtCONTPACKLEV_MAXQTY').textbox('setValue', row.CONTPACKLEV_MAXQTY==null?'':row.CONTPACKLEV_MAXQTY);
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
             var isSelectedData = validSelectedData('#wms_containerlev_tab', 'Delete');
             if (!isSelectedData) {
                 $.messager.alert('提示', '请选择一条数据进行删除');
                 return;
             }
             var checkedItems = $('#wms_containerlev_tab').datagrid('getSelections');
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
                                     IFS: 'WMS_B00094',
                                     CONTPACKLEV_ID: item.CONTPACKLEV_ID,
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
                      IFS:'WMS_B00095',
                },
                successCallBack:function(data){
                    var rowNum=0
                    if(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS){
                        rowNum=parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
                        workOrderData=data.RESPONSE["0"].RESPONSE_DATA[0];
                    }
                    $('#txtCONTPACKLEV_ID').textbox('setValue',workOrderData.CONTPACKLEV_ID).textbox('readonly').textbox({ required: true });                                                                         
                }
            } 
            iplantAjaxRequest(ajaxParam); 
        }
		/* 添加包装标签信息 */
		addStation = function() {
        	CompanyOpttype = 0;
        	getApplyOrder();
        	checkFun();
        	$('#txtCONTPACKLEV_ID').textbox('textbox').attr('readonly',false);
			$('#txtCONTPACKLEV_ID').textbox('textbox').attr('disabled',false);
			$("#enditTab").dialog("open").dialog('setTitle', '包装箱内容添加');
			$("#fmStation").form("clear");			
		}
        /*验证修改内容是否重复*/
        saveUpdateValidate = function() {
			var checkedItems = $('#wms_containerlev_tab').datagrid('getSelections');
			row = checkedItems[0];
			if (row.CONTPACKLEV_ID) {
				if ($('#txtCONTPACKLEV_ID').textbox('getValue') != (row.CONTPACKLEV_ID==null?'':row.CONTPACKLEV_ID)
						|| $('#txtCONTAINER_ID').textbox('getValue') != (row.CONTAINER_ID==null?'':row.CONTAINER_ID)						
						|| $('#txtCONTPACKLEV_PACK').textbox('getValue') != (row.CONTPACKLEV_PACK==null?'':row.CONTPACKLEV_PACK)
						|| $('#txtCONTPACKLEV_VALUE').textbox('getValue') != (row.CONTPACKLEV_VALUE==null?'':row.CONTPACKLEV_VALUE)
						|| $('#txtCONTPACKLEV_REVISION').textbox('getValue') != (row.CONTPACKLEV_REVISION==null?'':row.CONTPACKLEV_REVISION)
						|| $('#txtCONTPACKLEV_PRODORD').textbox('getValue') != (row.CONTPACKLEV_PRODORD==null?'':row.CONTPACKLEV_PRODORD)
						|| $('#txtCONTPACKLEV_MINQTY').textbox('getValue') != (row.CONTPACKLEV_MINQTY==null?'':row.CONTPACKLEV_MINQTY)
						|| $('#txtCONTPACKLEV_MAXQTY').textbox('getValue') != (row.CONTPACKLEV_MAXQTY==null?'':row.CONTPACKLEV_MAXQTY)) {
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
				IFServerNo = 'WMS_B00092'
			} else if(CompanyOpttype == 1) {
				if (!saveUpdateValidate()) {
					$.messager.alert("提示", '内容没有更新，请修改')
					return false;
				}
				IFServerNo = 'WMS_B00093'
			} else {
				IFServerNo = 'WMS_B00091'
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
					CONTPACKLEV_ID: $('#txtCONTPACKLEV_ID').val(),
					CONTAINER_ID: $('#txtCONTAINER_ID').val(),
					CONTPACKLEV_PACK: $('#txtCONTPACKLEV_PACK').val(),
					CONTPACKLEV_VALUE: $('#txtCONTPACKLEV_VALUE').val(),	
					CONTPACKLEV_REVISION: $('#txtCONTPACKLEV_REVISION').val(),
					CONTPACKLEV_PRODORD: $('#txtCONTPACKLEV_PRODORD').val(),
					CONTPACKLEV_MINQTY: $('#txtCONTPACKLEV_MINQTY').val(),
					CONTPACKLEV_MAXQTY: $('#txtCONTPACKLEV_MAXQTY').val(),
					IFS: IFServerNo
				},
				successCallBack: function(data) {
					var susMsg=getReturnMsg(data);
                	$.messager.alert("提示",susMsg,"",function(){
            			reqGridData('/iPlant_ajax','wms_containerlev_tab',{IFS:'WMS_B00091'});
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