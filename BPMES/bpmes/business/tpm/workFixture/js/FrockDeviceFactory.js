(function() {
	var et;
	var arr=[];
	var flags=true;
	function dictItem() {
		pageConfig = {
			dictCD : windowPageConfig.dictCode || 'CCT01',
			gridName : windowPageConfig.gridName || 'dict_tab',
			txtDictCode : windowPageConfig.txtDictCode || 'txtDictCode',
			txtDictName : windowPageConfig.txtDictName || 'txtDictName',
			txtMethod	: windowPageConfig.txtMethod   || 'txtMethod',
			cbUsed : windowPageConfig.cbUsed || 'cbUsed',
			dictRemark : windowPageConfig.dictRemark || 'txtDictRemrk',
			title : windowPageConfig.title || '客户类别',
			gcDictCD : windowPageConfig.gcDictCD || '字典编号',
			gcDictName : windowPageConfig.gcDictName || '字典名称'
		}
		
		textbobom=function(){
			//类别下拉框
			 var ajaxParam = {
   				 url : '/iPlant_ajax',
	    			 dataType : 'JSON',
	    			 data:{
	    				 IFS : 'T0000201',
	    			 },
	    			 successCallBack : function(data){
	    				 var rowCollection=createSourceObj(data);
	    				 
	    				 var arr=[];
	    				 arr.push({"value":"","text":"全部"});
	    				 for(var i=0;i< rowCollection.length;i++){
	    					 arr.push({"value":rowCollection[i].TYPENAME,"text":rowCollection[i].TYPENAME});
	    				 }
	    				 $('#type').combobox({
	    					 	data:arr,
	    		                valueField:'value',
	    		                textField:'text',
	    		                panelWidth:200,
	    		                panelHeight:200
	    		            });
	    			 }
	    			}
			 iplantAjaxRequest(ajaxParam);
			 }
		
		var count=0;
		checkMany= function(){//多选
			if(count%2==0){
				count++;
				flags=false;
			}else{
				count--;
				flags=true;
			}
			bindGridData();
		}
		
		initGridData = function(et,a,cl,fx,sl,st,ty,ty1,cm1,cm2) {
			var dgrid = $('#' + pageConfig.gridName).datagrid('options');
			if (!dgrid) return;
			var reqData = {
				IFS : 'E000101',
				FT_CD : fx,
				CL_NM: cl,
				flag: a,
				FT_MD:et,//工装治具机型名
				DS_LS:sl,
				FT_ST:st,
				FT_TYPE:ty,
				CM_DT1:cm1,
				CM_DT2:cm2,
				FT_EP:ty1,//搜索条件
				pageIndex : 1,
				pageSize : dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', pageConfig.gridName, reqData);
		}
		
		test1 = function(){//调用模糊查询
			var et=$("#workFlyName").val();//工装治具机型名
			var cl=$("#clientName1").val();//客户名
			var fx=$("#fixtureCode").val();//夹具编号
			var sl=$("#saveLocation").val();//存放位置
			var st=$("#state").combobox('getValue');//状态
			var ty=$("#type").combobox('getValue');//类别
			var ty1=$("#serchs").combobox('getValue');//搜索条件
			var cm1=$("#comeDate1").datebox('getValue');//入库日期
			var cm2=$("#comeDate2").datebox('getValue');//入库日期
			var a=$("input[type='checkbox']").is(':checked');
			initGridData(et,a,cl,fx,sl,st,ty,ty1,cm1,cm2);
		}
		
		clean = function(){//清空
			$("#workFlyName").textbox('setValue');
			$("#clientName1").textbox('setValue');
			$("#fixtureCode").textbox('setValue');
			$("#workFlyName").textbox('setValue');
			$("#saveLocation1").textbox('setValue');
			$("#state").combobox('setValue');
			$("#type").combobox('setValue');
			$("#serchs").combobox('setValue');
			$("#comeDate1").datebox('setValue');
			$("#comeDate2").datebox('setValue');
			$('#cb').prop('checked', '');
		}
		bindGridData = function(reqData, jsonData) {
			
			
			
			var grid = {
				name : 'listType_tab',
				dataType : 'json',
				//singleSelect:false,
				columns : [[ 
					           { field : "CZ",width : 10,checkbox : true}, 
					           { field : 'FT_CD',title : pageConfig.gcDictCD,width : 200,align : 'center'}, 
					           { field : 'FT_MD',title : '夹具机型',width : 200,align : 'center'},
					           { field : 'FT_TYPE',title : '夹具类型',width : 200,align : 'center'},
					           {field : 'PL_NM',title : '产线名称',width : 200,align : 'center'},
					           {field : 'FT_ST',title : '借用/归还/报废',width : 200,align : 'center'},
					           {field : 'FT_EP',title : '说明',width : 200,align : 'center'},
					           {field : 'FT_OT',title : '操作时间',width : 200,align : 'center'},
					           {field : 'FT_AL',title : '申请人',width : 200,align : 'center'},
					           {field : 'CR_DT',title : '创建日期',width : 200,align : 'center'},
					           { field : 'CL_NM',title : '客户名称',width : 200,align : 'center'},
					           { field : 'DS_LS',title : '存放位置',width : 200,align : 'center', }, 
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
		
		//帮助
		onBtnHelpClick=function(){
			
			$.messager.show({
				title:'<font color=\"white\">帮助信息</font>',
				msg:'按住shift勾选多选框即可选择多条记录进行删除',
				showType:'show',
				width:'300px',
				height:'150px',
				style:{
				}
			});
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
							$('#btnExport').click(function(){//导出
				                    var reqData = {
				                        IFS: 'E000101'
				                    }
				                    createTable('Type_tab','工装设备历史查询导出','listType_tab',reqData); 
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
							$('#btnGive').click(function(){//工装治具归还
								checkGive();
							});
							$('#btncheck').click(function(){//查看
								checkDictItem();
							});
							//帮助
							$('#btnHelp').click(function(){
								onBtnHelpClick();
							});
							$("input",$("#"+pageConfig.txtDictCode).next("span")).blur(function(){
							    var dictCode = $("#"+pageConfig.txtDictCode).val();
							    existDictItem(dictCode);
						    });
							textbobom();
						});
					}
		 
				}
				var dict = new dictItem();
				dict.init();
})();