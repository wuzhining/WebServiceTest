
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
				    	 $("#enditTab").dialog("open").dialog('setTitle', '编辑抽样规则信息');
				    	 QueryMember(row);
				    	 checkFun();
				    	    $('#txtRuleName').textbox('setValue', row.RULENAME==null?'':row.RULENAME);				
							$('#txtRuleDescription').textbox('setValue',row.RULEDESCRIPTION==null?'':row.RULEDESCRIPTION);
							$('#ddlRuleType').combobox('setValue',row.AQLRULETYPEID==null?'':row.AQLRULETYPEID);
							$('#txtRuleId').textbox('setValue',row.AQLRULEID==null?'':row.AQLRULEID);
					}
				};
				initGridView(reqData, grid);
				$('#warehouseType_tab').datagrid('loadData', jsonData);
			};
			
			//列表查询
			function QueryMember(row){
	            var ajaxParam = {
	    				url: '/iPlant_ajax',
	    				dataType: 'JSON',
	    				data: {
	    					AQLRULEID:row.AQLRULEID,
	    					IFS: 'WMS_AQL0009'
	    				},
	    				successCallBack: function(data) {
	                    	var length1=data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS;
	                    	 for (var i = 0; i < length1; i++) {
	                    		 $($(".SamplingValue")[i]).numberbox('setValue',data.RESPONSE["0"].RESPONSE_DATA[i].SAMPLINGVALUE);
	                    		 $($(".ACValue")[i]).numberbox('setValue',data.RESPONSE["0"].RESPONSE_DATA[i].ACVALUE);
	                    		 $($(".REValue")[i]).numberbox('setValue',data.RESPONSE["0"].RESPONSE_DATA[i].REVALUE);
	                    		 $($(".hdALQRuleMemberId")[i]).val(data.RESPONSE["0"].RESPONSE_DATA[i].AQLRULEMEMBERID);
	                    	 }
	    				}
	    			};
	    			iplantAjaxRequest(ajaxParam);
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
              $('#fmStation').form("clear");
              $("#ddlRuleType").combobox('setValue','1');
              $(".SamplingValue").numberbox('setValue','0');
              $(".REValue").numberbox('setValue','0');
              $(".ACValue").numberbox('setValue','0');
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
				$("#enditTab").dialog("open").dialog('setTitle', '编辑抽样规则信息');
				QueryMember(row);
		    	$('#txtRuleName').textbox('setValue', row.RULENAME==null?'':row.RULENAME);				
		    	$('#txtRuleDescription').textbox('setValue',row.RULEDESCRIPTION==null?'':row.RULEDESCRIPTION);
				$('#ddlRuleType').combobox('setValue',row.AQLRULETYPEID==null?'':row.AQLRULETYPEID);
				$('#txtRuleId').textbox('setValue',row.AQLRULEID==null?'':row.AQLRULEID);
				CompanyOpttype = 1;	
			}
			checkFun();
		};
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
	                                	  	 $.each(checkedItems, function (index, item) {
	                                 			 delCnt++;
	                                         	 var ajaxParam = {
	                                                      url: '/iPlant_ajax',
	                                                      dataType: 'JSON',
	                                                      data: {
	                                                          IFS: 'WMS_AQL0012',
	                                                          AQLRULEID: item.AQLRULEID,
	                                                      }
	                                         	 };
	                                              iplantAjaxRequest(ajaxParam);
	                                          });
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
			$("#enditTab").dialog("open").dialog('setTitle', '添加抽样规则信息');
//			$("#fmStation").form("clear");
			$("#ddlRuleType").combobox('setValue','1');
		};
        /*验证修改内容是否重复*/
//        saveUpdateValidate = function() {
//			var checkedItems = $('#warehouseType_tab').datagrid('getSelections');
//			row = checkedItems[0];
//				if ($('#txtRuleName').val() != (row.RULENAME==null?'':row.RULENAME)||
//					$('#ddlRuleType').combobox('getValue') != (row.AQLRULETYPEID==null?'':row.AQLRULETYPEID)||
//					$('#txtRuleDescription').val() != (row.RULEDESCRIPTION==null?'':row.RULEDESCRIPTION)
//					)
//				{
//					return true;
//				} else {
//					return false;
//				}
//		};

		savaStation = function() {
			var IFServerNo = '';
			var reqData = [];
		    if(CompanyOpttype == 0) {
				IFServerNo = 'WMS_AQL0003';
			} else if(CompanyOpttype == 1) {
//				if (!saveUpdateValidate()) {
//					$.messager.alert("提示", '内容没有更新，请修改')
//					return false;
//				}
				IFServerNo = 'WMS_AQL0002';
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
					RULENAME: $('#txtRuleName').val(),
					RULEDESCRIPTION: $('#txtRuleDescription').val(),
					AQLRULETYPEID: $('#ddlRuleType').combobox('getValue'),
					AQLRULEID:$('#txtRuleId').val(),
					IFS: IFServerNo
				},
				successCallBack: function(data) {
					var susMsg=getReturnMsg(data);
					var json=JSON.stringify(data);
					var jsArr = JSON.parse(json);
					var jsa = eval(jsArr);
					var jsa2 = eval(jsa.RESPONSE);
					var AqlID=(jsa2[0].RESPONSE_DATA[0].ID);
					var n= 1+ +AqlID;
					saveMember (n,IFServerNo);
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
			
		};
		
		function saveMember (AqlID,IFServerNo){
            var length = $(".hdALQRuleMemberId").length;
            var params  =new Array(), param = {};
            for (var i = 0; i < length; i++) {
                param = {};
                param.AQLRULEMEMBERID=$($(".hdALQRuleMemberId")[i]).val();
                param.AQLRULEID = AqlID;
                param.LOTLETTER = $($(".LotLetter")[i]).textbox('getValue');
                param.SAMPLINGVALUE = $($(".SamplingValue")[i]).numberbox('getValue');
                param.ACVALUE = $($(".ACValue")[i]).numberbox('getValue');
                param.REVALUE = $($(".REValue")[i]).numberbox('getValue');
                params.push(param);
            }
            if(IFServerNo == 'WMS_AQL0002'){
            	 var ajaxParam = {
          				url: '/iPlant_ajax',
          				dataType: 'JSON',
          				data: {
          					list:params,
          					IFS: 'WMS_AQL0010'
          				}
          			};
            }else if(IFServerNo == 'WMS_AQL0003'){
            	 var ajaxParam = {
         				url: '/iPlant_ajax',
         				dataType: 'JSON',
         				data: {
         					list:params,
         					IFS: 'WMS_AQL0011'
         				}
         			};
            }
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
	};
	var fcfo = new application();
	fcfo.init();
})();