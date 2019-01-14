(function() {
	var et;
	var arr=[];
	function dictItem() {
		pageConfig = {
			dictCD : windowPageConfig.dictCode || 'CCT01',
			gridName : windowPageConfig.gridName || 'dict_tab',  //分页
			/*txtDictCode : windowPageConfig.txtDictCode || 'txtDictCode',  //接口ID
*/			txtDictName : windowPageConfig.txtDictName || 'txtDictName',  //参数名称
			txtMethod	: windowPageConfig.txtMethod   || 'txtMethod',
			/*cbUsed : windowPageConfig.cbUsed || 'cbUsed',*/
			/*dictRemark : windowPageConfig.dictRemark || 'createDates', */
			title : windowPageConfig.title || '参数',
			gcDictCD : windowPageConfig.gcDictCD || '参数ID',
			gcDictName : windowPageConfig.gcDictName || '参数名称'
		}
		//初始化
		initGridData = function(eqName) {
			var dgrid = $('#' + pageConfig.gridName).datagrid('options');
			if (!dgrid) return;
			var reqData = {
				IFS : 'SCD00005',
				name: eqName,
				pageIndex : 1,
				pageSize : dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', pageConfig.gridName, reqData);
		}
		
		test1 = function(){//调用模糊查询
			var eqName=$("#cin").val();//按接口名称查
			initGridData(eqName);
		}
		
		clean = function(){//清空
			$("#cin").textbox('setValue');
		}
		
		
		bindGridData = function(reqData, jsonData) {
			var grid = {  //数据表格列名
				name : 'listType_tab',
				dataType : 'json',
				//singleSelect:false,
				columns : [[ 
				           { field : "CZ",width : 10,checkbox : true}, 
				           { field : 'PARAM_ID',title : pageConfig.gcDictCD,width : 200,align : 'center'},  //接口ID
				           { field : 'PARAM_NAME',title : '参数名称',width : 200,align : 'center'},  
				           { field : 'PARAM_DESC',title : '参数描述',width : 200,align : 'center'},
				           { field : 'PARAM_VALAREA',title : '参数取值',width : 200,align : 'center'},
				           { field : 'PARAM_CREATOR',title : '创建者',width : 200,align : 'center'},
				           { field : 'PARAM_CREATDATE',title : '创建日期',width : 200,align : 'center'},
				           {field : 'PARAM_MODIFIER',title : '修改者',width : 200,align : 'center'},
				           {field : 'PARAM_MODIFYDATE',title : '修改日期',width : 200,align : 'center'},
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
		/*checkDataValid = function() {
			 数据不能为空验证 
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
		}*/
		
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
						if (tpm.textbox('getValue') != undefined && tpm.textbox('getValue') != '' && tpm.textbox('getValue') != null){  /*正则表达式*/
							var ajaxParam = {
								url : '/iPlant_ajax',
								dataType : 'JSON',
								data : {
									IFS : 'D000008',
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
			var row = checkedItems[0];
			if (row.PARAM_ID) {  
				if($('#'+pageConfig.txtDictName).val() == row.PARAM_NAME  //参数名称
				   && $("#paraVal").val() ==row.PARAM_VALAREA//参数取值
				   && $("#paraDescribe").val()== row.PARAM_DESC   //参数描述
			       && $("#paraType").val()==row.PARAM_TYPE   //参数类型
				){
					return true;	
				}
				else {
					return false;
				}
			}
		}
		setDataNull = function() {  //修改保存设值为空
			$('#' + pageConfig.txtDictName).textbox('setValue', '');
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
		
		checks = function (checkedItems){
			$("#enditTab").dialog("open").dialog('setTitle', '<font color=\"white\">查看监控参数信息</font>');
    		$('#paraName').textbox('setValue',checkedItems[0].PARAM_NAME);  //参数名称
    		$('#paraVal').textbox('setValue',checkedItems[0].PARAM_VALAREA);  //参数取值
    		$('#paraType').textbox('setValue',checkedItems[0].PARAM_TYPE);   //参数类型
    		$('#paraDescribe').textbox('setValue',checkedItems[0].PARAM_DESC);  //参数描述
    		
		}
		
		
		//查看功能
		checkDictItem = function() {
			setOptType(2);
			var checkedItems = $('#listType_tab').datagrid('getChecked');//获取选中行信息
			 if(checkedItems.length==0){
	        	 $.messager.alert('提示', '请选择一行数据进行查看！');
		            return;
	        }else{
	        	if(checkedItems.length==1){
	        		checks(checkedItems);
	        	}else if(checkedItems.length>1){
	        		
        			$.messager.confirm('提示', '您已选择多行记录，程序将只查看您选择的第一条记录！是否继续？',function(r){
        				if(r){
        					checks(checkedItems);
        				}
        			})
        			}
	        }
		}
		
		//修改
		updateDictItem = function() {
			var isSelectedData = validSelectedData(pageConfig.gridName,'Update');
			if (!isSelectedData) {
				   $.messager.alert('提示', '请选择一条数据进行修改');
				   return;
			}
			var row = $("#" + pageConfig.gridName).datagrid("getSelected");
			setOptType(1);
			if (row){
				$("#enditTab").dialog("open").dialog('setTitle','修改' + pageConfig.title + '信息');
				$('#' + pageConfig.txtDictName).textbox('setValue',row.PARAM_NAME);//参数名称
			    $("#paraDescribe").textbox('setValue',row.PARAM_DESC);//参数描述
				$('#paraVal').textbox('setValue',row.PARAM_VALAREA);//参数取值
				$('#paraType').textbox('setValue',row.PARAM_TYPE);//参数类型
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
		   var arrUpdate = new Array();
		    $.messager.confirm('确认框','您确定要删除您所选择的数据?',
		      function(r){
		    	  if(r==true){
		    		 $.each(checkedItems,function(index,item){
		    			 delCnt++;
		    			 arrUpdate.push({PARAM_ID:item.PARAM_ID});
		    			 var ajaxParam = {
		    				 url : '/iPlant_ajax',
			    			 dataType : 'JSON',
			    			 data:{
			    				 list : arrUpdate,
			    				 IFS : 'SCD00007'
			    			 },
			    			 successCallBack : function(data){
			    				/* if(data.RESPONSE["0"].RESPONSE_DATA[0].STATUS == '1') { 
			    					exceptionCode += ','+ item.XH;
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
			    						   IFS:'A1000071',
			    						   MT_CD:item.MT_CD
			    					     },
			    					     async:false,*/
	    					        	    if (delCnt == checkedItems.length) {
	    							            var susMsg = '删除成功';
	    							            if ($.messager.alert('提示',susMsg)){
	    								           initGridData();
	    								        }
	    					             }
			    				 }
			    			 }
			    			 
			    			 
		    			 
		    			 iplantAjaxRequest(ajaxParam);
		    			
		    		 });
		    	  }
		      });
		    
		}
		
		//添加
		addDictItem = function() {
			$("#enditTab").dialog("open").dialog('setTitle','添加' + pageConfig.title);
			$("#fmcustomtype").form("clear");
			setOptType(0);
		}
		saveDictItem = function() {
			var row = $("#" + pageConfig.gridName).datagrid("getSelected");
			// 校验
			if (($("#" + pageConfig.txtDictName).val() == null || $("#" + pageConfig.txtDictName).val() == "")) {
				 $.messager.alert('提示', "请输入"+pageConfig.gcDictName+"。");
				 return;
		    }else if
				(($("#paraVal").val() == null || $("#paraVal").val() == "")){
				$.messager.alert('提示', "请输入参数取值。");
				 return;
			}else if
			(($("#paraType").val() == null || $("#paraType").val() == "")){
				 $.messager.alert('提示', "请输入参数类型。");
				 return;
			}
			
			
			var IFServerNo = '', isUsed = '',PARAM_IDs='';
			if(row != null){
				PARAM_IDs=row.PARAM_ID;
				PARAM_MODIFIERs=row.PARAM_MODIFIER;
			}
			var reqData = {
				
				PARAM_ID : PARAM_IDs, // 参数ID
				PARAM_NAME:$("#" + pageConfig.txtDictName).val(), // 参数名称
				PARAM_VALAREA : $("#paraVal").val(), // 参数取值
				PARAM_MODIFIER : PARAM_MODIFIERs, // 修改者
				PARAM_DESC : $("#paraDescribe").val() ,//参数描述
				PARAM_TYPE : $("#paraType").val() //创建者
			}
			var optType = getOptType();
			if(optType==2){//查看状态
				$.messager.show({
					title:'提示信息',
					msg:'查看状态下无法编辑接口信息！',
					showType:'show',
					timeout:2000,
					style:{}
				});
				return;
			}
			// 新增
			if (optType == 0) {
				IFServerNo = 'SCD00008', 
				$.extend(reqData, {
					CRT_ID : '',
					CRT_IP : '',
					IFS : IFServerNo
				});
			}
			// 修改
			else if (optType == 1) {
				if (saveUpdateValidate()) {
					$.messager.alert("提示", '内容没有更新，请修改')
					return false;
				}
				reqData = $.extend(reqData, {
					CRT_ID : '',
					CRT_IP : '',
					IFS : 'SCD00006'
				});
				initEditorDataGridView(reqData);
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
				$('#btncheck').click(function(){//查看
					checkDictItem();
				});
				
			});
		}
	}
	var dict = new dictItem();
	dict.init();
})();