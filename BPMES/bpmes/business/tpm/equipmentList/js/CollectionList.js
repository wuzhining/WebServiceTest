(function() {
	var et;
	var arr=[];
	function dictItem() {
		pageConfig = {
			dictCD : windowPageConfig.dictCode || 'CCT01',
			gridName : windowPageConfig.gridName || 'dict_tab',  //分页
			/*txtDictCode : windowPageConfig.txtDictCode || 'txtDictCode',  //接口ID
*/			txtDictName : windowPageConfig.txtDictName || 'txtDictName',  //接口名称
			txtMethod	: windowPageConfig.txtMethod   || 'txtMethod',
			/*cbUsed : windowPageConfig.cbUsed || 'cbUsed',*/
			/*dictRemark : windowPageConfig.dictRemark || 'createDates', */
			title : windowPageConfig.title || '接口',
			gcDictCD : windowPageConfig.gcDictCD || '接口ID',
			gcDictName : windowPageConfig.gcDictName || '接口名称'
		}
		//初始化
		initGridData = function(eqName) {
			var dgrid = $('#' + pageConfig.gridName).datagrid('options');
			if (!dgrid) return;
			var reqData = {
				IFS : 'SCD00001',
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
				           { field : 'API_ID',title : pageConfig.gcDictCD,width : 200,align : 'center'},  //接口ID
				           { field : 'API_NAME',title : '接口名称',width : 200,align : 'center'},  
				           { field : 'API_DESC',title : '接口描述',width : 200,align : 'center'},
				           { field : 'API_ADDR',title : '接口地址',width : 200,align : 'center'},
				           { field : 'API_CREATOR',title : '创建者',width : 200,align : 'center'},
				           { field : 'API_CREATDATE',title : '创建日期',width : 200,align : 'center'},
				           {field : 'API_MODIFIER',title : '修改者',width : 200,align : 'center'},
				           {field : 'API_MODIFYDATE',title : '修改日期',width : 200,align : 'center'},
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
			if (row.API_ID) {  
				if($('#'+pageConfig.txtDictName).val() == row.API_NAME  //接口名称
				   && $("#interaddress").val() ==row.API_ADDR//接口地址
				   && $("#interDescribe").val()== row.API_DESC   //接口描述
				   /*&& $("#creator").val()==row.API_CREATOR   //创建者
*/				){
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
			$("#enditTab").dialog("open").dialog('setTitle', '<font color=\"white\">查看接口信息</font>');
    		$('#interfaceName').textbox('setValue',checkedItems[0].API_NAME);  //接口名称
   		    $('#interaddress').textbox('setValue',checkedItems[0].API_ADDR);  //接口地址
    		/*$('#creator').textbox('setValue',checkedItems[0].API_CREATOR);   //创建者
*/    		$('#interDescribe').textbox('setValue',checkedItems[0].API_DESC);  //接口描述
    		
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
				$('#' + pageConfig.txtDictName).textbox('setValue',row.API_NAME);//接口名称
			    $("#interDescribe").textbox('setValue',row.API_DESC);//接口描述
				$('#interaddress').textbox('setValue',row.API_ADDR);//接口地址
				/*$('#creator').textbox('setValue',row.API_CREATOR);//创建者
*/			}
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
		    			 arrUpdate.push({API_ID:item.API_ID});
		    			 var ajaxParam = {
		    				 url : '/iPlant_ajax',
			    			 dataType : 'JSON',
			    			 data:{
			    				 list : arrUpdate,
			    				 IFS : 'SCD00003'
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
		
		//帮助
		/*onBtnHelpClick=function(){
			
			$.messager.show({
				title:'<font color=\"white\">帮助信息</font>',
				msg:'按住shift勾选多选框即可选择多条记录进行删除',
				showType:'show',
				width:'300px',
				height:'150px',
				style:{
				}
			});
		}*/
		
		/*//下拉框保养项目值
		textCombobox= function(){
		 var ajaxParam = {
				 url : '/iPlant_ajax',
   			 dataType : 'JSON',
   			 data:{
   				 IFS : 'W00011',
   			 },
   			 successCallBack : function(data){
   				 arr.push({"value":"","text":"全部"});
   				 var rowCollection=createSourceObj(data);
   				 for(var i=0;i< rowCollection.length;i++){
   					 arr.push({"value":rowCollection[i].DICT_IT_NM_02,"text":rowCollection[i].DICT_IT_NM_02});
   				 }
   				 $('#creator').combobox({
   					 	data:arr,
   		                valueField:'value',
   		                textField:'text',
   		                panelWidth:200,
   		                panelHeight:200
   		            });
   			 }
   			}
		 iplantAjaxRequest(ajaxParam);
		}*/
		//添加
		addDictItem = function() {
			$("#enditTab").dialog("open").dialog('setTitle','添加' + pageConfig.title);
			$("#fmcustomtype").form("clear");
			setOptType(0);
		}
		saveDictItem = function() {
			var row = $("#" + pageConfig.gridName).datagrid("getSelected");
			// 校验
				/*var value=$('#creator').combobox('getValue');*/
			if (($("#" + pageConfig.txtDictName).val() == null || $("#" + pageConfig.txtDictName).val() == "")) {
				 $.messager.alert('提示', "请输入"+pageConfig.gcDictName+"。");
				 return;
		    }else if
				(($("#interaddress").val() == null || $("#interaddress").val() == "")){
				$.messager.alert('提示', "请输入接口地址。");
				 return;
			}/*else if
			(($("#creator").val() == null || $("#creator").val() == "")){
				 $.messager.alert('提示', "请输入创建者。");
				 return;
			}*/
			
			
			var IFServerNo = '', isUsed = '',API_IDs='';
			if(row != null){
				API_IDs=row.API_ID;
			}
			var reqData = {
				
				API_ID : API_IDs, // 接口ID
				API_NAME:$("#" + pageConfig.txtDictName).val(), // 接口名称
				API_ADDR : $("#interaddress").val(), // 接口地址
				API_DESC : $("#interDescribe").val() //接口描述
				/*API_CREATOR : $("#creator").val() //创建者
*/			}
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
				IFServerNo = 'SCD00004', 
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
					IFS : 'SCD00002'
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
				/*$('#btnExport').click(function(){//导出
	                    var reqData = {
	                        IFS: 'D00000112'
	                    }
	                    createTable('Type_tab','设备保养','listType_tab',reqData); 
	            });*/
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
				//帮助
				/*$('#btnHelp').click(function(){
					onBtnHelpClick();
				});*/
				/*$("input",$("#"+pageConfig.txtDictCode).next("span")).blur(function(){
				    var dictCode = $("#"+pageConfig.txtDictCode).val();
				    existDictItem(dictCode);
			    });*/
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