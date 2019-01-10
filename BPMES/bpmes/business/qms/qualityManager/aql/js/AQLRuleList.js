
(function() {
	function application() {		
		initGridData = function() {
			    var dgrid = $('#warehouseType_tab').datagrid('options');
				if(!dgrid) return;
				var reqData = {
					IFS: 'WMS_AQL0001',
					pageIndex: 1,
					pageSize: dgrid.pageSize
				}
				
				reqGridData('/iPlant_ajax', 'warehouseType_tab', reqData);
				
			},
			bindGridData = function(reqData, jsonData) {
				var grid = {
					name: 'warehouseType_tab',
					dataType: 'json',
					columns: [
						[ {
							
							field: 'AQLRULEID',
							title: '编号',			
							hidden:true,
							width: 100,
							align: 'center',formatter: function (value) {
				           	if(value != null)
            return "<span title='" + value + "'>" + value + "</span>";}
						},{
							field: 'RULENAME',
							title: '规则名',
							width: 200,
							align: 'center',								
							formatter: function (value) {
				           	if(value != null)
            return "<span title='" + value + "'>" + value + "</span>";}
						},
							{
								field: 'AQLRULETYPEID',
								title: '类别名称',								
								width: 100,
								align: 'center',formatter: function (value) {
					           	if(value != null){
					           		if(value==1){
					           			return "<span title='" + '正常' + "'>" + '正常' + "</span>";
					           		}else if(value==2){
					           			return "<span title='" + '加严' + "'>" + '加严' + "</span>";
				           			}else if(value==3){
					           			return "<span title='" + '放宽' + "'>" + '放宽' + "</span>";
					           		}
					           	}
					           }
						}, {
								field: 'RULEDESCRIPTION',
								title: '描述',
								width: 200,
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
							},
							  {
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
				    	 $('#txtGROUPNAME').textbox('textbox').attr('readonly', true);
						 $('#txtGROUPNAME').textbox('textbox').attr('disabled', true);
				    	 $("#enditTab").dialog("open").dialog('setTitle', '修改仓库类别信息');
				    	 checkFun();
				    	    $('#txtGROUPNAME').textbox('setValue', row.GROUPNAME==null?'':row.GROUPNAME);				
							$('#txtITEMGROUPID').textbox('setValue',row.ITEMGROUPID==null?'':row.ITEMGROUPID);
							$("#txtGROUPDESC").val(row.GROUPDESC==null?'':row.GROUPDESC);
							
					}
				};
				initGridView(reqData, grid);
				$('#warehouseType_tab').datagrid('loadData', jsonData);
			};
			checkFun = function (){
				var qx = getUpdateRight();
				if(qx=="Y"){
			    	 $('#saveID').show();
			    	 $('#cancleID').show();
				}else{
					CompanyOpttype=2;
			    	 $('#saveID').hide();
				};
			};
		setDataNull = function () {           
              $('#txtGROUPNAME').textbox('setValue','');      
              $("#txtGROUPDESC").val("");
          };
         //查询
		getDataBySearch = function(){
				var dgrid = $('#warehouseType_tab').datagrid('options');
				if(!dgrid) return;
				var cxRuleName = $('#cxRuleName').val();
				var reqData = {
						RULENAME: cxRuleName,				
					IFS: 'WMS_AQL0001',
					pageIndex: 1,
					pageSize: dgrid.pageSize
				};
				reqGridData('/iPlant_ajax', 'warehouseType_tab',reqData);
			};
			/* 修改商品移动信息 */			
		updateStation = function() {
			var checkedItems = $('#warehouseType_tab').datagrid('getSelections');
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
			var row = $("#warehouseType_tab").datagrid("getSelected");
			if(row) {				
				$("#searchCondition").dialog("close");
				$("#enditTab").dialog("open").dialog('setTitle', '编辑仓库类别信息');
				$('#txtGROUPNAME').textbox('textbox').attr('readonly', true);
				$('#txtGROUPNAME').textbox('textbox').attr('disabled', true);
				$('#txtITEMGROUPID').textbox('setValue',row.ITEMGROUPID==null?'':row.ITEMGROUPID);
				$('#txtGROUPNAME').textbox('setValue', row.GROUPNAME==null?'':row.GROUPNAME);
				$("#txtGROUPDESC").val(row.GROUPDESC==null?'':row.GROUPDESC);
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
             var isSelectedData = validSelectedData('#warehouseType_tab', 'Delete');
             if (!isSelectedData) {
                 $.messager.alert('提示', '请选择一条数据进行删除');
                 return;
             }
             var checkedItems = $('#warehouseType_tab').datagrid('getSelections');
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
                                     IFS: 'WMS_AQL0004',
                                     AQLRULEID: item.AQLRULEID,
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
        
		/* 添加商品移动信息 */
		addStation = function() {
        	CompanyOpttype = 0;
        	checkFun();
			$("#enditTab").dialog("open").dialog('setTitle', '产品类型信息添加');
			$('#txtGROUPNAME').textbox('textbox').attr("disabled", false);
			$('#txtGROUPNAME').textbox('textbox').attr('readonly', false);
			$("#fmStation").form("clear");
		}
        /*验证修改内容是否重复*/
        saveUpdateValidate = function() {
			var checkedItems = $('#warehouseType_tab').datagrid('getSelections');
			row = checkedItems[0];
				if ($('#txtGROUPDESC').val() != (row.GROUPDESC==null?'':row.GROUPDESC)) 
				{
					return true;
				} else {
					return false;
				}
		}
		savaStation = function() {
			
			var IFServerNo = '';
			var reqData = [];
		    if(CompanyOpttype == 0) {
				IFServerNo = 'WMS_PR00003';
			} else if(CompanyOpttype == 1) {
				if (!saveUpdateValidate()) {
					$.messager.alert("提示", '内容没有更新，请修改')
					return false;
				}
				IFServerNo = 'WMS_PR00002';
			} else {
				IFServerNo = 'WMS_AQL0001';
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
					GROUPNAME: $('#txtGROUPNAME').val(),
					GROUPDESC: $('#txtGROUPDESC').val(),
					ITEMGROUPID:$('#txtITEMGROUPID').val(),
					IFS: IFServerNo
				},
				successCallBack: function(data) {
					var susMsg=getReturnMsg(data);
                	$.messager.alert("提示",susMsg,"",function(){
            			reqGridData('/iPlant_ajax','warehouseType_tab',{IFS:'WMS_AQL0001'});
            			$('#enditTab').dialog('close');
            			setDataNull();
            			initGridData();
            		});
                	$('#enditTab').dialog('close');
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
				$('#btnClean').click(function() {
					$('#cxRuleName').textbox('setValue',"");
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