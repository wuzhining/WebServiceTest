/* 启动时加载 */
/*
 */
(function() {
	function factoryInfo() {
		var tablename='listType_tab';
		var url='/iPlant_ajax';
		initGridData = function() {
			var dgrid = $('#listType_tab').datagrid('options');
			if(!dgrid) return;
			var reqData = {
				IFS: 'D00000111',
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'listType_tab', reqData);
		},
		
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'listType_tab',
				dataType: 'json',
				columns: [[
				           { field : "check",width : 10,checkbox : true},  
				           { field : 'ET_CD',title : '设备编码',width : 265,align : 'center'}, 
				           { field : 'ET_NM',title : '设备名称',width : 265,align : 'center'}, 
				           { field : 'EQ_IP',title : '设备IP',width : 265,align : 'center'} 
			    ]],
			}
			initGridView(reqData, gridList);
			$('#listType_tab').datagrid('loadData', jsonData);
		}
	}
	OptType = 0, 
	getOptType = function() {
		return this.OptType;
	} 
	setOptType = function(value) {
		this.OptType = value;
	}
	
	clean = function(){//清空
		$("#eqName").textbox('setValue');
	}
	
	OpenFrameAttribute = function(){
		var tablename='listType_tab2';
		var url='/iPlant_ajax';
		
			var dgrid = $('#listType_tab2').datagrid('options');
			if(!dgrid) return;
			var reqDataA = {
				IFS: 'P0001011',
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			dialogDataGrid('/iPlant_ajax', tablename, reqDataA);
		
		
			dialogEditorDataGrid = function(tablename,reqDataA, jsonData) {
			var gridList = {
				name: 'listType_tab2',
				dataType: 'json',
				columns: [[
				           { field : "check",width : 10,checkbox : true},  
				           { field : 'PARAM_ID',title : '参数',width : 265,align : 'center'}, 
				           { field : 'PARAM_NAME',title : '参数名称',width : 265,align : 'center'}, 
				           { field : 'PARAM_DESC',title : '参数描述',width : 265,align : 'center'}, 
			    ]],
			}
			initEditorDataGridView1(reqDataA, gridList);
			$('#listType_tab2').datagrid('loadData', jsonData);
		}
	}
	
	
	 OpenFrameAttribute1= function() {
		var tablename='listType_tab3';
		var url='/iPlant_ajax';
		
			var dgrid = $('#listType_tab3').datagrid('options');
			if(!dgrid) return;
			var reqData = {
				IFS: 'P0001012',
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			dialogDataGrid1('/iPlant_ajax', tablename, reqData);
		
			dialogEditorDataGrid1 = function(reqData, jsonData) {
			var gridList = {
				name: 'listType_tab3',
				dataType: 'json',
				columns: [[
				           { field : "check",width : 10,checkbox : true},  
				           { field : 'SET_CD',title : '设备编号',width : 265,align : 'center'}, 
				           { field : 'SET_IP',title : '设备IP',width : 265,align : 'center'}, 
				           { field : 'SET_NAME',title : '参数名称',width : 265,align : 'center'}, 
				           { field : 'SET_PARAM',title : '参数地址',width : 265,align : 'center'}, 
				           { field : 'SET_CREATOR',title : '执行者',width : 265,align : 'center'}, 
				           { field : 'SET_CREATDATE',title : '执行日期',width : 265,align : 'center'} 
			    ]],
			}
			initEditorDataGridView1(reqData, gridList);
			$('#listType_tab3').datagrid('loadData', jsonData);
		}
	}
	
	validSelectedData = function(gridName, type){
		var checkedItems = $("#listType_tab3").datagrid('getSelections');
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
	
	
	deleteDictItem=function(){
		var isSelectedData = validSelectedData('listType_tab3','Delete');
		if (!isSelectedData) {
			 $.messager.alert('提示', '请选择一条监控参数数据进行删除');
			 return;
		}
		var checkedItems = $("#listType_tab3").datagrid('getSelections');
		// 确认提示框
	    var delCnt = 0;
	    var exceptionCode = '';
	   var arrUpdate = new Array();
	    $.messager.confirm('确认框','您确定要删除您所选择的数据?',
	      function(r){
	    	  if(r==true){
	    		 $.each(checkedItems,function(index,item){
	    			 delCnt++;
	    			 arrUpdate.push({SET_ID:item.SET_ID});
	    			 var ajaxParam = {
	    				 url : '/iPlant_ajax',
		    			 dataType : 'JSON',
		    			 data:{
		    				 list : arrUpdate,
		    				 IFS : 'P0001015'
		    			 },
		    			 successCallBack : function(data){
    					        	    if (delCnt == checkedItems.length) {
    							            var susMsg = '删除成功';
    							            if ($.messager.alert('提示',susMsg)){
    								           OpenFrameAttribute1();
    								        }
    					             }
		    				 }
		    			 }
	    			 iplantAjaxRequest(ajaxParam);
	    		 });
	    	  }
	      });
	}
	
	
	checks = function (checkedItems){
		$("#enditTab").dialog("open").dialog('setTitle', '<font color=\"white\">查看监控参数</font>');
		$('#txtListCode').textbox('setValue',checkedItems[0].SET_CD);//设备编号
		$('#txtListName').textbox('setValue',checkedItems[0].SET_IP);//设备IP
		$('#assetCode').textbox('setValue',checkedItems[0].SET_NAME);//参数名称
		$('#EquipmentFacCode').textbox('setValue',checkedItems[0].SET_PARAM);//参数地址
	}
	
	//查看功能
	checkDictItem = function() {
		setOptType(2);
		var checkedItems = $('#listType_tab3').datagrid('getChecked');//获取选中行信息
		 if(checkedItems.length==0){
        	 $.messager.alert('提示', '请选择一行监控参数数据进行查看！');
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
	
	updateDictItem = function() {
		var isSelectedData = validSelectedData('listType_tab3','Update');
		if (!isSelectedData) {
			 $.messager.alert('提示', '请选择一条监控参数数据进行修改');
			 return;
		}
		setOptType(1);
		var row = $("#listType_tab3").datagrid("getSelected");
		if (row){
			$("#enditTab").dialog("open").dialog('setTitle','监控参数' + '维护');
			$('#txtListCode').textbox('textbox').attr('readonly', true);//只读 设备编号
			$('#txtListCode').textbox('textbox').attr('disabled', true);//变灰
			$('#txtListCode').textbox('setValue',row.SET_CD);//设备编号
			$('#txtListName').textbox('setValue',row.SET_IP);//设备IP
			$('#assetCode').textbox('setValue',row.SET_NAME);//参数名称
			$('#EquipmentFacCode').textbox('setValue',row.SET_PARAM);//参数地址
		}
	}
	
	addDictItem = function() {
		var row = $("#listType_tab").datagrid("getSelected");//获取设备列表选中项
		var row1 = $("#listType_tab2").datagrid("getSelected");//获取监控参数列表选中项
		setOptType(0);
		if(row==null ){
			$.messager.alert('提示','请选择设备');
			return;
		}
		if(row1==null){
			$.messager.alert('提示', '请选择监控参数');
			return;
		}
		saveDictItem();
	}
	
	saveDictItem = function() {
		var row = $("#listType_tab").datagrid("getSelected");//获取设备列表选中项
		var row1 = $("#listType_tab2").datagrid("getSelected");//获取监控参数列表选中项
		var row2 = $("#listType_tab3").datagrid("getSelected");//监控参数配置选中项
		var optType = getOptType();
		if(optType==0 && row2!=null){
			row2=null;
		}
		var reqData={};
		var IFServerNo = '', isUsed = '';
		if(row2!=null){
			reqData = {
					SET_PARAM : $('#EquipmentFacCode').val(),
					SET_NAME: $('#assetCode').val(),
					SET_IP: $('#txtListName').val(),
					SET_CD:$('#txtListCode').val(),
					SET_ID: row2.SET_ID
			}
		}else{
			reqData = {
					SET_CD : row.ET_CD,
					SET_IP: row.EQ_IP,
					SET_NAME: row1.PARAM_NAME,
					SET_PARAM:'http://192.168.1.88:8080/scada/SetMachineParam?MachineName='+row.ET_CD+'&IPAddress='+row.EQ_IP
	+'&ParamNo='+row1.PARAM_ID+'&ParamName='+row1.PARAM_NAME+'&ParamDesc='+row1.PARAM_DESC+'&ParamValue='+row1.PARAM_VALAREA
	+'&ParamResult='+'&ParamMSG='
	
			}
		}
		
		if(optType==2){//查看状态
			$.messager.show({
				title:'提示信息',
				msg:'查看状态下无法编辑！',
				showType:'show',
				timeout:2000,
				style:{}
			});
			return;
		}
		// 新增
		if (optType == 0) {
			IFServerNo = 'P0001013', 
			$.extend(reqData, {
				CRT_ID : '',
				CRT_IP : '',
				IFS : IFServerNo
			});
		}
		// 修改
		else if (optType == 1) {
			reqData = $.extend(reqData, {
				CRT_ID : '',
				CRT_IP : '',
				IFS : 'P0001014'
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
					  	initGridData();
					  	OpenFrameAttribute();
						OpenFrameAttribute1();
				}
			},
			errorCallBack : function() {
				$.messager.alert('提示', errorMsg);
			}
		};
		iplantAjaxRequest(ajaxParam);
	}
	
	
	factoryInfo.prototype = {
		init: function() {
			$(function() {
				initGridData();
				OpenFrameAttribute();
				OpenFrameAttribute1();
				$('#btnSearch').click(function() {	
					var dgrid = dataGrid.datagrid('options');
					searchDataGrid(dgrid);
				});
				$('.add').click(function() {
					addDictItem();
					
				});
				$('.delete').click(function() {
					deleteDictItem();
				});
				$('.update').click(function() {
					updateDictItem();
				});
				$('.save').click(function() {
					saveDictItem();
				});
				$('#btncheck').click(function(){//查看
					checkDictItem();
				});
			});
			
		}
	}
	var fcfo = new factoryInfo();
	fcfo.init();
})();