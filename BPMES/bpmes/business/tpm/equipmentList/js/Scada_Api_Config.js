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
				singleSelect:true,
				columns: [[
				           { field : "check",width : 10,checkbox : true},  
				           { field : 'ET_CD',title : '设备编码',width : 265,align : 'center'}, 
				           { field : 'ET_NM',title : '设备名称',width : 265,align : 'center'}, 
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
		$("#ip").textbox('setValue');
	}
	
	function factoryInfo2() {
		var tablename='listType_tab2';
		var url='/iPlant_ajax';
		
			var dgrid = $('#listType_tab2').datagrid('options');
			if(!dgrid) return;
			var reqData = {
				IFS: 'Q0001011',
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			dialogDataGrid('/iPlant_ajax', tablename, reqData);
		
		
		dialogEditorDataGrid = function(tablename,reqData, jsonData) {
			var gridList = {
				name: 'listType_tab2',
				dataType: 'json',
				columns: [[
				           { field : "check",width : 10,checkbox : true},  
				           { field : 'API_ID',title : '接口',width : 265,align : 'center'}, 
				           { field : 'API_NAME',title : '接口名称',width : 265,align : 'center'}, 
				           { field : 'API_DESC',title : '接口描述',width : 265,align : 'center'}, 
			    ]],
			}
			initEditorDataGridView1(reqData, gridList);
			$('#listType_tab2').datagrid('loadData', jsonData);
		}
	}
	
	test1 = function(){//调用模糊查询
		et=$("#ip").val();
		factoryInfo3(et);
	}
	
	function factoryInfo3(et) {
		var tablename='listType_tab3';
		var url='/iPlant_ajax';
		
			var dgrid = $('#listType_tab3').datagrid('options');
			if(!dgrid) return;
			var reqData = {
				IFS: 'Q0001012',
				pageIndex: 1,
				CFG_IP:et,
				pageSize: dgrid.pageSize
			}
			dialogDataGrid1('/iPlant_ajax', tablename, reqData);
		
		
		dialogEditorDataGrid1 = function(reqData, jsonData) {
			var gridList = {
				name: 'listType_tab3',
				dataType: 'json',
				singleSelect:true,
				columns: [[
				           { field : "check",width : 10,checkbox : true},  
				           { field : 'CFG_CD',title : '设备编号',width : 265,align : 'center'}, 
				           { field : 'CFG_IP',title : '服务器IP',width : 265,align : 'center'}, 
				           { field : 'CFG_NAME',title : '接口名称',width : 265,align : 'center'}, 
				           { field : 'CFG_ADDR',title : '接口地址',width : 265,align : 'center'}, 
				           { field : 'CFG_CREATOR',title : '创建者',width : 265,align : 'center'}, 
				           { field : 'CFG_CREATDATE',title : '创建日期',width : 265,align : 'center'}, 
				           { field : 'CFG_MODIFIER',title : '修改者',width : 265,align : 'center'}, 
				           { field : 'CFG_MODIFYDATE',title : '修改日期',width : 265,align : 'center'}, 
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
			 $.messager.alert('提示', '请选择一条接口配置数据进行删除');
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
	    			 arrUpdate.push({CFG_ID:item.CFG_ID});
	    			 var ajaxParam = {
	    				 url : '/iPlant_ajax',
		    			 dataType : 'JSON',
		    			 data:{
		    				 list : arrUpdate,
		    				 IFS : 'Q0001014'
		    			 },
		    			 successCallBack : function(data){
    					        	    if (delCnt == checkedItems.length) {
    							            var susMsg = '删除成功';
    							            if ($.messager.alert('提示',susMsg)){
    								           factoryInfo3();
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
		$("#enditTab").dialog("open").dialog('setTitle', '<font color=\"white\">查看接口配置</font>');
		$('#txtListCode').textbox('setValue',checkedItems[0].CFG_CD);//设备编号
		$('#txtListName').textbox('setValue',checkedItems[0].CFG_IP);//服务器IP
		$('#assetCode').textbox('setValue',checkedItems[0].CFG_NAME);//接口名称
		$('#EquipmentFacCode').textbox('setValue',checkedItems[0].CFG_ADDR);//接口地址
	}
	
	//查看功能
	checkDictItem = function() {
		setOptType(2);
		var checkedItems = $('#listType_tab3').datagrid('getChecked');//获取选中行信息
		 if(checkedItems.length==0){
        	 $.messager.alert('提示', '请选择一行接口配置数据进行查看！');
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
			 $.messager.alert('提示', '请选择一条接口配置数据进行修改');
			 return;
		}
		setOptType(1);
		var row = $("#listType_tab3").datagrid("getSelected");
		if (row){
			$("#enditTab").dialog("open").dialog('setTitle','接口配置' + '维护');
			$('#txtListCode').textbox('textbox').attr('readonly', true);//只读 设备编号
			$('#txtListCode').textbox('textbox').attr('disabled', true);//变灰
			$('#txtListCode').textbox('setValue',row.CFG_CD);//设备编号
			$('#txtListName').textbox('setValue',row.CFG_IP);//服务器IP
			$('#assetCode').textbox('setValue',row.CFG_NAME);//接口名称
			$('#EquipmentFacCode').textbox('setValue',row.CFG_ADDR);//接口地址
		}
	}
	
	addDictItem = function() {
		var row = $("#listType_tab").datagrid("getSelected");//获取设备列表选中项
		var row1 = $("#listType_tab2").datagrid("getSelected");//获取接口列表选中项
		setOptType(0);
		if(row==null ){
			$.messager.alert('提示','请选择设备');
			return;
		}
		if(row1==null){
			$.messager.alert('提示', '请选择接口');
			return;
		}
		saveDictItem();
	}
	
	saveDictItem = function() {
		var row = $("#listType_tab").datagrid("getSelected");//获取设备列表选中项
		var row1 = $("#listType_tab2").datagrid("getSelected");//获取接口列表选中项
		var row2 = $("#listType_tab3").datagrid("getSelected");//接口配置选中项
		var optType = getOptType();
		if(optType==0 && row2!=null){
			row2=null;
		}
		
		var reqData={};
		var IFServerNo = '', isUsed = '';
		if(row2!=null){//修改
			reqData = {
					CFG_CD : $('#txtListCode').val(),
					CFG_IP: $('#txtListName').val(),
					CFG_NAME: $('#assetCode').val(),
					CFG_ADDR:$('#EquipmentFacCode').val(),
					CFG_ID: row2.CFG_ID
			}
		}else{//增加
			reqData = {
					CFG_CD : row.ET_CD,
					CFG_IP: '139.198.124.208',
					CFG_NAME: row1.API_NAME,
					CFG_ADDR:'http://192.168.1.88:8080/scada/'+row1.API_NAME,
					CFG_ID: row.CFG_ID
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
			IFServerNo = 'Q0001013', 
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
				IFS : 'Q0001015'
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
						factoryInfo2();
						factoryInfo3();
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
				factoryInfo2();
				factoryInfo3();
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