/* 启动时加载 */
/*
 */
(function() {
	function fileTypeInfo() {
		initGridData = function() {
			var dgrid = $('#FileTypeinfo_tab').datagrid('options');
			if (!dgrid)
				return;
			var reqData = {
				IFS : 'T000048',
				pageIndex : 1,
				pageSize : dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'FileTypeinfo_tab', reqData);
		}, 
		dataArr = {};
		bindGridData = function(reqData, jsonData) {
			var grid = {
				name : 'FileTypeinfo_tab',
				dataType : 'json',
				columns : [ [
				{
					field : 'DM_SN',
					title : '档案编号',
					width : 100,
					align : 'center'
				}, {
					field : 'DM_NM',
					title : '档案名称',
					width : 200,
					align : 'center',
					editor : {
						type : 'text',
						options : {
							required : true 
						}
					}
				}, {
					field : 'DM_RM',
					title : '备注',
					width : 200,
					align : 'center',
					editor : {
						type : "text",
						options : {
							required : false
						}
					}
				}, {
					field : 'CRT_ID',
					title : '创建人',
					width : 100,
					align : 'center'
				}, {
					field : 'CRT_DT',
					title : '创建时间',
					width : 200,
					align : 'center'
				}, {
					field : 'UPT_ID',
					title : '修改人',
					width : 100,
					align : 'center'
				}, {
					field : 'UPT_DT',
					title : '修改时间',
					width : 200,
					align : 'center'
				} ] ],
				onDblClickRow: function(index,row){	
			    	 CompanyOpttype=1;
			    	 $("#enditTab").dialog("open").dialog('setTitle', '修改档案类别信息');
			    	 checkFun();
			    	    $('#txtFileNum').textbox('setValue', row.DM_SN==null?'':row.DM_SN);
						$('#txtFileNam').textbox('setValue', row.DM_NM==null?'':row.DM_NM);
						$('#txtRemarks').textbox('setValue', row.DM_RM==null?'':row.DM_RM);
			     }
			}
			initGridView(reqData, grid);
			$('#FileTypeinfo_tab').datagrid('loadData', jsonData);
		},
		getDataBySearch = function() {
			var dgrid = $('#FileTypeinfo_tab').datagrid('options');
			if (!dgrid)
				return;
			var cxFileNum = $('#cxFileNum').textbox('getValue');
			var cxFileName = $('#cxFileName').textbox('getValue');
			var reqData = {
					DM_SN : cxFileNum,
					DM_NM : cxFileName,
					IFS : 'T000048',
					pageIndex : 1,
					pageSize : dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'FileTypeinfo_tab', reqData);
		},
		getFileOrdr=function(){
			// 维修单号
			iplantAjaxRequest({
				url : '/iPlant_ajax',
				data : {
					IFS : 'T000052',
				},
				successCallBack : function(data) {
					var needata = data.RESPONSE[0].RESPONSE_DATA[0].DM_SN;
					$("#txtFileNum").textbox('setValue',data.RESPONSE[0].RESPONSE_DATA[0].DM_SN).textbox('readonly').textbox({require:ture});
				}
			});
		},
		checkFun=function(){
			var qx = getUpdateRight();
			if(qx=="Y"){
				 $('#txtFileNum').textbox('textbox').attr('disabled', true);
		    	 $('#txtFileNam').textbox('textbox').attr('disabled', false);
		    	 $('#txtRemarks').textbox('textbox').attr('disabled', false);
		    	 $('#saveID').show();
		    	 $('#cancleID').show();
			}else{
				CompanyOpttype=2;
				$('#txtFileNum').textbox('textbox').attr('disabled', true);
		    	 $('#txtFileNam').textbox('textbox').attr('disabled', false);
		    	 $('#txtRemarks').textbox('textbox').attr('disabled', false);
		    	 $('#saveID').hide();
//		    	 $('#cancleID').hide();
			}
		},
		addFunction=function(){
			CompanyOpttype=0;
			getFileOrdr();
			checkFun();
			$('#txtFileNum').textbox('textbox').attr('readonly',
					false);
			$('#txtFileNum').textbox('textbox').attr('disabled',
					false);
			$("#enditTab").dialog("open").dialog('setTitle', '档案类别信息添加');
			$("#fmFileType").form("clear");	
		},
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
		/* 保存按钮 */
		savaStation=function(){
			var IFServerNo='';
			var reqData=[];
			if(CompanyOpttype==0){
				IFServerNo = 'T000049'
			}else if(CompanyOpttype == 1) {
				if (!saveUpdateValidate()) {
					$.messager.alert("提示", '内容没有更新，请修改')
					return false;
				}
				IFServerNo = 'T000050'
			} else {
				IFServerNo = 'T000048'
			}
			var susMsg ='',
			errorMsg = '';
			if(CompanyOpttype == 0) {
				susMsg = '添加成功';
				errorMsg = '添加失败,请联系管理员';
			} else {
				susMsg = '更新成功';
				errorMsg = '更新失败,请联系管理员';
			}
			var ajaxParam = {
					url: '/iPlant_ajax',
					dataType: 'JSON',
					data: {
						DM_RM: $('#txtRemarks').val(),
						DM_SN: $('#txtFileNum').val(),
						DM_NM: $('#txtFileNam').textbox('getValue'),
						IFS: IFServerNo
					},
					successCallBack: function(data) {
						var susMsg=getReturnMsg(data);
	                	$.messager.alert("提示",susMsg,"",function(){
	            			reqGridData('/iPlant_ajax','FileTypeinfo_tab',{IFS:'T000048'});
	            			$('#enditTab').dialog('close');
	            		});
					},
					errorCallBack: function() {
						$.messager.alert('提示', errorMsg);
					}
				};
				iplantAjaxRequest(ajaxParam);
		},
		deleteFunction=function(){
        	var isSelectedData = validSelectedData('#FileTypeinfo_tab', 'Delete');
             if (!isSelectedData) {
                 $.messager.alert('提示', '请选择一条数据进行删除');
                 return;
             }
             var checkedItems = $('#FileTypeinfo_tab').datagrid('getSelections');
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
                                     IFS: 'T000051',
                                     DM_SN: item.DM_SN,
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
        /*验证修改内容是否重复*/
		saveUpdateValidate=function(){
			var checkedItems = $('#FileTypeinfo_tab').datagrid('getSelections');
			row = checkedItems[0];
			if (row.DM_SN) {
				if ($('#txtFileNum').textbox('getValue') != (row.DM_SN==null?'':row.DM_SN)
						|| $('#txtFileNam').textbox('getValue') != (row.DM_NM==null?'':row.DM_NM)
						|| $('#txtRemarks').textbox('getValue') != (row.DM_RM==null?'':row.DM_RM)) {
					return true;
				} else {
					return false;
				}
			}
		},
        updateFunction=function(){
        	var checkedItems = $('#FileTypeinfo_tab').datagrid('getSelections');
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
			
			var row = $("#FileTypeinfo_tab").datagrid("getSelected");
			if(row) {
				$("#searchCondition").dialog("close");
				$("#enditTab").dialog("open").dialog('setTitle', '修改档案类别信息');
				$('#txtFileNum').textbox('textbox').attr('readonly', true);
				$('#txtFileNum').textbox('textbox').attr('disabled', true);
				$('#txtFileNum').textbox('setValue', row.DM_SN==null?'':row.DM_SN);
				$('#txtFileNam').textbox('setValue', row.DM_NM==null?'':row.DM_NM);
				$('#txtRemarks').textbox('setValue', row.DM_RM==null?'':row.DM_RM);				
				CompanyOpttype = 1;				
			}
			checkFun();
        }		
	}
	fileTypeInfo.prototype = {
		init : function() {
			$(function() {
				initGridData();
				var CompanyOpttype;
				$('#btnSearch').click(function() {
					getDataBySearch();
				});
				$('#btnAdd').click(function() {
					addFunction();
				});
				$('#btnDelete').click(function() {
					deleteFunction();
//					deleteDataGrid('FileTypeinfo_tab','DM_SN','T000051','showMessageInfo');
				});
				 $('#btnUpdate').click(function() {
					 updateFunction();
				 });
			});
		}
	}
	var fileType = new fileTypeInfo();
	fileType.init();
})();
