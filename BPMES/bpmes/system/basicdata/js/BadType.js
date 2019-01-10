
(function() {
	function dictItem() {
		pageConfig = {
			dictCD : windowPageConfig.dictCode || 'CBR01',
			gridName : windowPageConfig.gridName || 'badType_tab',
			txtDictCode : windowPageConfig.txtDictCode || 'txtBadCode',
			txtDictName : windowPageConfig.txtDictName || 'txtBadName',
			cbUsed : windowPageConfig.windowPageConfig || 'cbUsedFlag',
			dictRemark : windowPageConfig.dictRemark || 'txtDictRemark',
			title : windowPageConfig.title || '不良类别',
			gcDictCD : windowPageConfig.gcDictCD || '不良类别编号',
			gcDictName : windowPageConfig.gcDictName || '不良类别名称'
		}
		initGridData = function() {
			var dgrid = $('#' + pageConfig.gridName).datagrid('options');
			if (!dgrid) return;
			var reqData = {
				IFS : 'B000151',
				//IFS : 'D000008',
				DICT_CD : pageConfig.dictCD,
				pageIndex : 1,
				pageSize : dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', pageConfig.gridName, reqData);
		}
		bindGridData = function(reqData, jsonData) {
			var grid = {
				name : pageConfig.gridName,
				dataType : 'json',
				columns : [[ 
//				           { field : "CZ",width : 10,checkbox : true}, 
				           { field : 'DICT_IT',title : pageConfig.gcDictCD,width : 200,align : 'center'}, 
				           { field : 'DICT_IT_NM',title : pageConfig.gcDictName,width : 200,align : 'center'},
				           { field : 'DICT_RM',title : '备注',width : 200,align : 'center'}, 
				           { field : 'USE_YN',title : '是否启用',width : 200,align : 'center',
					         formatter : function(value, row, index) {
						        if (value == 'Y') {
							       return '启用';
						        } 
						        else {
						    	    return '未启用';
						        }
					         }
				           }, 
				           { field : 'CRT_ID',title : '创建人',width : 200,align : 'center'}, 
				           { field : 'CRT_DT',title : '创建时间',width : 150,align : 'center'}, 
				           { field : 'UPT_ID',title : '修改人',width : 200,align : 'center'}, 
				           { field : 'UPT_DT',title : '修改时间',width : 200,align : 'center'}
				         ]]
			}
			initGridView(reqData, grid);
			$('#' + pageConfig.gridName).datagrid('loadData', jsonData);
		}
		OptType = 0, 
		getOptType = function() {
			return this.OptType;
		} 
		setOptType = function(value) {
			this.OptType = value;
		}
		/* 数据有效性验证 */
		checkDataValid = function() {
			/* 数据不能为空验证 */
			var dictCode = $('#' + pageConfig.txtDictCode).val();
			if (dictCode == '') {
		     	return false;
			}
			var dictName = $('#' + pageConfig.txtDictName).val();
			if (dictName == '') {
				//$('#' + pageConfig.txtDictName).textbox({required : true});
				return false;
			}
			return true;
		}
		/*是否存在输入的字典项*/
		existDictItem = function(dictCode) {
			var rowNum, tpm = $('#' + pageConfig.txtDictCode);
			if (OptType == 0) {
				if(/[　，。、！？：“”［］——（）…！＠＃￥＆＊＋＞＜；：‘\u4e00-\u9fa5\s\n\r\t]+/.test($('#' + pageConfig.txtDictCode).textbox('getText'))){
		        	$.messager.alert('提示', pageConfig.gcDictCD+"不能是中文和非法字符，请重新输入。","",function(){
		        		$('#' + pageConfig.txtDictCode).textbox('setValue', '');
		        	});
		        	return;
		        }
				if (tpm.val() != undefined && tpm.val() != ''&& tpm.val() != null) {
					if (dictCode != undefined && dictCode != ''&& dictCode != null) {
						if (tpm.textbox('getValue') != undefined && tpm.textbox('getValue') != '' && tpm.textbox('getValue') != null){
							var ajaxParam = {
								url : '/iPlant_ajax',
								dataType : 'JSON',
								data : {
									IFS : 'B000151',
									DICT_CD : pageConfig.dictCD,
									DICT_IT:dictCode,
									pageIndex : 1,
									pageSize : 10
								},
								successCallBack : function(data) {
									rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
									if (rowNum > 0) {
										$.messager.alert('提示','您输入的'+pageConfig.gcDictCD+'['+ dictCode+ ']已有相同,请重新输入!');
										tpm.textbox('setValue', '');
										return false;
									} 
									else {
										return 1;
									}
								}
							};
							iplantAjaxRequest(ajaxParam);
						}
					}
				}
			}
		}
		/*修改时,验证是否修改任何内容*/
		saveUpdateValidate = function() {
			var checkedItems = $('#'+windowPageConfig.gridName).datagrid('getSelections');
			row = checkedItems[0];
			if (row.DICT_IT) {
				var isUserYn = 'N';
				if ($('#'+pageConfig.cbUsed).is(':checked')) {
					isUserYn = "Y";
				} 
				else {
					isUserYn = "N";
				}
				if ($('#'+pageConfig.txtDictName).val() != (row.DICT_IT_NM==null?'':row.DICT_IT_NM)
					|| $('#'+pageConfig.dictRemark).val() !=(row.DICT_RM==null?'':row.DICT_RM)
					|| isUserYn != (row.USE_YN==null?'N':row.USE_YN)) {
					return true;
				} 
				else {
					return false;
				}
			}
		}
		setDataNull = function() {
			$('#' + pageConfig.txtDictCode).textbox('setValue', '');
			$('#' + pageConfig.txtDictName).textbox('setValue', '');
			$('#' + pageConfig.dictRemark).textbox('setValue', '');
		}
		validSelectedData = function(gridName, type){
			var checkedItems = $('#' + gridName).datagrid('getSelections');
			var num = 0;
			$.each(checkedItems, function(index, item) {
				num++;
			});
			if (type == 'Update') {
				if (num != 1) {
					return false;
				}
			} 
			else{
				if (num <= 0){
					return false;
			    }
			}
			return true;
		}
		updateDictItem = function() {
			var isSelectedData = validSelectedData(pageConfig.gridName,'Update');
			if (!isSelectedData) {
				   $.messager.alert('提示', '请选择一条数据进行修改');
				   return;
			}
			var row = $("#" + pageConfig.gridName).datagrid("getSelected");
			setOptType(1);
			if (row){
				$("#enditTab").dialog("open").dialog('setTitle','编辑' + pageConfig.title + '维护');
				$('#' + pageConfig.txtDictCode).textbox('textbox').attr('readonly', true);
				$('#' + pageConfig.txtDictCode).textbox('textbox').attr('disabled', true);
				$('#' + pageConfig.txtDictCode).textbox('setValue',row.DICT_IT);
				$('#' + pageConfig.txtDictName).textbox('setValue',row.DICT_IT_NM);
				$('#' + pageConfig.dictRemark).textbox('setValue',row.DICT_RM);
				if (row.USE_YN == "Y") {
					$('#' + pageConfig.cbUsed).prop('checked','checked');
				} 
				else{
					$('#' + pageConfig.cbUsed).prop('checked', '');
				}
			}
		}
		deleteDictItem=function(){
			var isSelectedData = validSelectedData(pageConfig.gridName,'Delete');
			if (!isSelectedData) {
				 $.messager.alert('提示', '请选择一条数据进行删除');
				 return;
			}
			var checkedItems = $('#' + pageConfig.gridName).datagrid('getSelections');
			// 确认提示框
		    var delCnt = 0;
		    var exceptionCode = '';
		    $.messager.confirm('确认框','您确定要删除您所选择的数据?',
		      function(r){
		    	  if(r==true){
		    		 $.each(checkedItems,function(index,item){
		    			 delCnt++;
		    			 var ajaxParam = {
		    				 url : '/iPlant_ajax',
			    			 dataType : 'JSON',
			    			 data:{
			    				 IFS : 'B000087',
			    				 DICT_IT : item.DICT_IT
			    			 },
			    			 successCallBack : function(data){
			    				 if(data.RESPONSE["0"].RESPONSE_DATA[0].STATUS == '1') { 
			    					exceptionCode += ','+ item.DICT_IT;
			    					exceptionCode = exceptionCode.substring(1);
			    					if (exceptionCode) {
		    						      susMsg = pageConfig.gcDictCD+ exceptionCode + '被使用，不能删除，请联系管理员';
								    }
			    					if ($.messager.alert('提示',susMsg)){
		    						      initGridData();
		    					    }
			    				 }
			    				 else
			    				 {
			    					 var ajaxParam = {
			    					     url: '/iPlant_ajax',
			    					     dataType: 'JSON',
			    					     data:{
			    						   IFS:'B000153',
			    						   DICT_IT:item.DICT_IT
			    					     },
			    					     async:false,
			    					     successCallBack:function(data){
	    					        	    if (delCnt == checkedItems.length) {
	    							            var susMsg = '删除成功';
	    							            if ($.messager.alert('提示',susMsg)){
	    								           initGridData();
	    								        }
	    							        }
	    					             }
			    					 }
			    					 iplantAjaxRequest(ajaxParam);
			    				 }
			    			 }
		    			 }
		    			 iplantAjaxRequest(ajaxParam);
		    		 });
		    	  }
		      });
		}
		addDictItem = function() {
			
			$('#' + pageConfig.txtDictCode).textbox('textbox').attr('readonly',false);
			$('#' + pageConfig.txtDictCode).textbox('textbox').attr('disabled',false);
			$("#enditTab").dialog("open").dialog('setTitle',pageConfig.title + '维护');
			$("#fmCompany").form("clear");
			$('#' + pageConfig.cbUsed).prop('checked','checked');
			setOptType(0);
			/*
			 * $('#' +pageConfig.txtDictCode).textbox('setValue', ccCount); 
			 * $('#' +pageConfig.txtDictCode).textbox('readonly', true);
		    */
		}
		saveDictItem = function() {
			// 校验
			if ($("#" + pageConfig.txtDictName).val() == null || $("#" + pageConfig.txtDictName).val() == "") {
					 $.messager.alert('提示', "请输入" + pageConfig.gcDictName+ "。");
					 return;
			}
			var IFServerNo = '', isUsed = '';
			if ($("input[name='postingdate']").is(':checked'))
				 isUsed = 'Y';
			else
				 isUsed = 'N';
			var reqData = {
				DICT_IT : $("#" + pageConfig.txtDictCode).val(), // 字典代码
				DICT_IT_NM : $("#" + pageConfig.txtDictName).val(), // 字典名称
				DICT_CD : pageConfig.dictCD, // 字典项
				DICT_RM : $('#' + pageConfig.dictRemark).val(), // 备注
				USE_YN : isUsed
			}
			var optType = getOptType();
			// 新增
			if (optType == 0) {
				IFServerNo = 'B000152', 
				$.extend(reqData, {
					CRT_ID : '',
					CRT_IP : '',
					IFS : IFServerNo
				});
			}
			// 修改
			else if (optType == 1) {
				if (!saveUpdateValidate()) {
					$.messager.alert("提示", '内容没有更新，请修改')
					return false;
				}
				IFServerNo = 'B000154', 
				reqData = $.extend(reqData, {
					CRT_ID : '',
					CRT_IP : '',
					/*UPT_ID : '',
					UPT_IP : '',*/
					IFS : IFServerNo
				});
			}
			var susMsg = '', errorMsg = '';
			if (optType == 0) {
				susMsg = '添加成功';
				errorMsg = '添加失败,请联系管理员';
			} 
			else{
				susMsg = '更新成功';
				errorMsg = '更新失败,请联系管理员';
			}
			var ajaxParam = {
				url : '/iPlant_ajax',
				dataType : 'JSON',
				data : reqData,
				successCallBack : function(data) {
					if (data.RESPONSE[0].RESPONSE_HDR.MSG_CODE == '-1007') {
						susMsg = data.RESPONSE[0].RESPONSE_HDR.MSG_TEXT;
					}
					if ($.messager.alert('提示', susMsg)) {
						  $('#enditTab').dialog('close');
						  setDataNull();
						  initGridData();
					}
				},
				errorCallBack : function() {
					$.messager.alert('提示', errorMsg);
				}
			};
			iplantAjaxRequest(ajaxParam);
		}
		addID = function(data) {
			var arr = data.split(".");
			var i = parseInt(arr[1]) + 1;
			if (i < 10) {
				return pageConfig.dictCD + ".00" + i;
			} 
			else if (i < 100) {
				return pageConfig.dictCD + ".0" + i;
			} 
			else {
				return pageConfig.dictCD + "." + i;
			}
		}
		addCCID = function(data) {
			var arr = data.split(".");
			var i = parseInt(arr[1]) + 1;
			if (i < 10) {
				return pageConfig.dictCD + ".0" + i;
			} 
			else{
				return pageConfig.dictCD + "." + i;
			}
		}
	 }
	 dictItem.prototype = {
		init:function() {
			$(function() {
				$("body")[0].onkeydown = keyPress;
                $("body")[0].onkeyup = keyRelease;
				initGridData();
				$('#btnFreshen').click(function() {
					initGridData();
				});
				$('.add').click(function() {
					addDictItem();
				});
				$('.update').click(function() {
					updateDictItem();
				});
				$('.save').click(function() {
					saveDictItem();
				});
				$('.close').click(function() {
					setDataNull();
					$('#enditTab').dialog('close');
				});
				$('.panel-tool-close').click(function() {
					setDataNull();
				});
				$('.delete').click(function() {
					deleteDictItem();
				});
				$("input",$("#"+pageConfig.txtDictCode).next("span")).blur(function(){
				    var dictCode = $("#"+pageConfig.txtDictCode).val();
				    existDictItem(dictCode);
			    });
				//判断输入文字的长度
//				$("input", $("#" + pageConfig.txtDictCode).next("span")).keyup(function() {
//					checkInputLength('#' + pageConfig.txtDictCode, 20);
//				})
//
//				$("input", $("#" + pageConfig.txtDictName).next("span")).keyup(function() {
//					checkInputLength('#' + pageConfig.txtDictName, 50);
//				})
//
//                $("#" + pageConfig.dictRemark).textbox('textbox').bind("keyup", function() {
//					checkInputLength('#' + pageConfig.dictRemark, 200);
//				})
			});
		}
	}
	var dict = new dictItem();
	dict.init();

})();
