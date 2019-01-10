function view() {
	var dgrid = $("#StockOut_tab").datagrid('options');
	if (!dgrid)
		return;
	var reqData = {
		IFS : 'WMS_C000006',
		pageIndex : 1,
		pageSize : dgrid.pageSize,
	}
	reqGridData('../iPlant_ajax', 'StockOut_tab', reqData);

       
      // $("#operType").combobox("clear");	//清空原来的下拉框值
    $("#Warehouse").combobox({  
    	onHidePanel: function () {  
            var newPtion =  $("#Warehouse").numberbox("getValue");
            $("#Storage").combobox("clear");
            $('#Storage').combobox("loadData", ajaxquery("WMS_C000008","WAREHOUSE_ID:"+newPtion+""));
        }  
    }); 
    $("#Storage").combobox({  
    	onHidePanel: function () {  
            var newPtion =  $("#Storage").numberbox("getValue");
            $("#Shelf").combobox("clear");
            $('#Shelf').combobox("loadData", ajaxquery("WMS_C000009","STORE_ID:"+newPtion+""));
        }  
    }); 
    $("#Shelf").combobox({  
    	onHidePanel: function () {  
            var newPtion =  $("#Shelf").numberbox("getValue");
            $("#Allocationf").combobox("clear");
            $('#Allocationf').combobox("loadData", ajaxquery("WMS_C0000010","SHELF_ID:"+newPtion+""));
        }  
    }); 
    $("#Allocationf").combobox({  
    	onHidePanel: function () {  
            var newPtion =  $("#Allocationf").numberbox("getValue");
            $("#Material").combobox("clear");
            $('#Material').combobox("loadData", ajaxquery("WMS_C0000015","POSITION_ID:"+newPtion+""));
        }  
    }); 

};

function bindGridData(reqData, jsonData) {
	var gridList = {
		name : 'StockOut_tab',
		dataType : 'json',
		columns : [ [ {
			field : 'CHECKOUT_ID',
			title : '出库单号',
			width : 100
		}, {
			field : 'MATERIA_ID',
			title : '物料编码',
			width : 100
		}, {
			field : 'MATERIA_NAME',
			title : '物料名称',
			width : 100
		}, {
			field : 'CHECKOUT_TYPE',
			title : '出库类型',
			width : 100
		}, {
			field : 'CHECKOUT_NUMBER',
			title : '出库数量',
			width : 100
		}, {
			field : 'PICKUP_NUMBER',
			title : '拣货数量',
			width : 100
		}, {
			field : 'WAREHOUSE_ID',
			title : '仓库编码',
			width : 100
		}, {
			field : 'WAREHOUSE_NAME',
			title : '仓库',
			width : 100
		}, {
			field : 'CREATE_DATE',
			title : '单据日期',
			width : 100
		}, {
			field : 'PICKUP_PERSON',
			title : '领料人',
			width : 100
		}, {
			field : 'CREATER_ID',
			title : '制单人',
			width : 100
		} ] ]
	}
	initGridView(reqData, gridList);
	$("#StockOut_tab").datagrid('loadData', jsonData);
}

// 打开弹出看 弹出框的操作为修改和添加
function closeOpen(param) {			//param用于判断是修改还是新增操作
	$("#InsertUpdate").val(param);
	// 打开弹出框时加载下拉框的数据，级联操作，可使用循环遍历json数据绑定下拉框
	var arr=ajaxquery("WMS_C000007","");	//查询出所有仓库的信息
		$('#Warehouse').combobox({    
		    valueField:'WAREHOUSE_ID',    
		    textField:'WAREHOUSE_NAME' ,
		    editable:false
		}); 
		$('#Storage').combobox({    
		    valueField:'STORE_ID',    
		    textField:'STORE_NAME',
		    editable:false
		}); 
		$('#Shelf').combobox({    
		    valueField:'SHELF_ID',    
		    textField:'SHELF_NAME',
		    editable:false
		}); 
		$('#Allocationf').combobox({    
		    valueField:'POSITION_ID',    
		    textField:'POSITION_NAME',
		    editable:false
		}); 
		$('#Material').combobox({    
		    valueField:'MATERIA_ID',    
		    textField:'MATERIA_NAME',
		    editable:false
		}); 
		$('#Unit').combobox({
		    valueField:'UNIT_ID',    
		    textField:'UNIT_NAME',
		    editable:false
		}); 
		$('#Unit').combobox("loadData", ajaxquery("WMS_C0000016",""));
		$('#Warehouse').combobox("loadData", arr);
		
		if(param==1){	//==1为新增   ==2为修改
			$('#enditTab').dialog('open');
		}else if(param==2){
			updateLoad();
		}
}



function ajaxquery(id, b) {
	var arr = new Array();
	var d = {
		IFS : id,
		reqType : "WEB"
	};
	reqParam = b.split(",");
	if ("" != reqParam) for (var e = 0; e < reqParam.length; e++) {			//当无输入参数时，此判断不会进入循环将不会进入
    var f = reqParam[e].toString().replace('"', ""),
    g = f.substring(0, f.indexOf(":")).toString(),
    h = f.indexOf(":") + 1,								
    i = f.substring(h).toString();
    d[g] = i
} 
	var c = "";
	null != d && (c = '{"REQ":[{"REQ_DATA":' + JSON.stringify(d) + "}]}");
	var w = 1;
	$.ajax({
		async : false,
		type : "POST",
		url : "../../../iPlant_ajax",
		dataType : "json",
		data : {
			reqStr : c
		},
		success : function(data) {
			arr = data.RESPONSE[0].RESPONSE_DATA;
		}
	});
	return arr;
}

function addANDupdate(){			//新增和修改出库单的方法
	var CHECKOUT_ID=$("#CHECKOUT_ID").val();		//出库单号
	var MATERIA_ID =  $("#Material").numberbox("getValue");	//物料的ID
	var MATERIA_NAME =  $("#Material").numberbox("getText");	//物料的名字
	var CHECKOUT_TYPE = $("#CHECKOUT_TYPE").val();		//出货类型
	var CHECKOUT_NUMBER = $("#CHECKOUT_NUMBER").val();	//出库数量
	var PICKUP_NUMBER = $("#PICKUP_NUMBER").val();		//拣货数量
	var UNIT_ID = $("#Unit").numberbox("getValue");		//计量ID
	var UNIT_NAME = $("#Unit").numberbox("getText");	//计量名称
	var WAREHOUSE_ID = $("#Warehouse").numberbox("getValue");	//仓库ID
	var WAREHOUSE_NAME = $("#Warehouse").numberbox("getText");	//仓库名称
	var STORE_ID = $("#Storage").numberbox("getValue");		//储区ID
	var STORE_NAME = $("#Storage").numberbox("getText");		//储区名称
	var SHELF_ID = $("#Shelf").numberbox("getValue");		//货架ID
	var SHELF_NAME = $("#Shelf").numberbox("getText");		//货架名称
	var POSITION_ID = $("#Allocationf").numberbox("getValue");	//货位ID
	var POSITION_NAME = $("#Allocationf").numberbox("getText");	//货位名称
	var PICKUP_PERSON = $("#name").val();	//领料人编码	暂无此表
	var PICKUP_PERSON_ID=$("#name").val();;	//领料人名称  暂无此表
	if(
			CHECKOUT_ID==null||CHECKOUT_ID==""||MATERIA_NAME==null||MATERIA_NAME==""||CHECKOUT_TYPE==null||CHECKOUT_TYPE==""||CHECKOUT_NUMBER==null||CHECKOUT_NUMBER==""||PICKUP_NUMBER==null||PICKUP_NUMBER==""||
			UNIT_NAME==null||UNIT_NAME==""||WAREHOUSE_NAME==null||WAREHOUSE_NAME==""||STORE_NAME==null||STORE_NAME==""||SHELF_NAME==null||SHELF_NAME==""||PICKUP_PERSON==null||PICKUP_PERSON==""
	){
		$.messager.confirm('提示框', '请选输入完整的数据！', function (r) {
			
		});
	}else{
		var a=
			"CHECKOUT_ID:"+CHECKOUT_ID+","+
			"MATERIA_ID:"+MATERIA_ID+","+
			"MATERIA_NAME:"+MATERIA_NAME+","+
			"CHECKOUT_TYPE:"+CHECKOUT_TYPE+","+
			"CHECKOUT_NUMBER:"+CHECKOUT_NUMBER+","+
			"PICKUP_NUMBER:"+PICKUP_NUMBER+","+
			"UNIT_ID:"+UNIT_ID+","+
			"UNIT_NAME:"+UNIT_NAME+","+
			"WAREHOUSE_ID:"+WAREHOUSE_ID+","+
			"WAREHOUSE_NAME:"+WAREHOUSE_NAME+","+
			"STORE_ID:"+STORE_ID+","+
			"STORE_NAME:"+STORE_NAME+","+
			"SHELF_ID:"+SHELF_ID+","+
			"SHELF_NAME:"+SHELF_NAME+","+
			"POSITION_ID:"+POSITION_ID+","+
			"POSITION_NAME:"+POSITION_NAME+","+
			"PICKUP_PERSON:"+PICKUP_PERSON+","+
			"PICKUP_PERSON_ID:"+PICKUP_PERSON_ID+"";
		var fal = $("#InsertUpdate").val();
		if(fal=="1"){  //新增
			ajaxquery("WMS_C0000017",a);
			$('#enditTab').dialog('close');
			view();
		}else if(fal=="2"){	//修改
			$.messager.confirm('确认框', '您确定要修改此条数据？', function (r) {
				if(r){
					ajaxquery("WMS_C0000018",a);
					$('#enditTab').dialog('close');
					view();
				}
			});
		}
	}
	
}


function updateLoad(){		//修改是加载原来的数据
	var obj = $('#StockOut_tab').datagrid('getSelected');	//获取选中的出库单ID
	if(obj==null){
		$.messager.confirm('提示框', '请选择需要修改的数据！', function (r) {
			
		});
	}else{
		var row  = obj.CHECKOUT_ID
		var arr = ajaxquery("WMS_C000006","CHECKOUT_ID:"+row+"");
		$('#CHECKOUT_ID').textbox('setValue',arr[0].CHECKOUT_ID);
		$('#CHECKOUT_ID').textbox('setText',arr[0].CHECKOUT_ID);
		$('#Warehouse').combobox('setValue',arr[0].MATERIA_ID);
		$('#Warehouse').combobox('setText',arr[0].MATERIA_NAME);
		$('#Storage').combobox('setValue',arr[0].STORE_ID);
		$('#Storage').combobox('setText',arr[0].STORE_NAME);
		$('#Shelf').combobox('setValue',arr[0].SHELF_ID);
		$('#Shelf').combobox('setText',arr[0].SHELF_NAME);
		$('#Allocationf').combobox('setValue',arr[0].POSITION_ID);
		$('#Allocationf').combobox('setText',arr[0].POSITION_NAME);
		$('#Material').textbox('setValue',arr[0].MATERIA_ID);
		$('#Material').textbox('setText',arr[0].MATERIA_NAME);
		$('#CHECKOUT_TYPE').combobox('setValue',arr[0].CHECKOUT_TYPE);
		$('#CHECKOUT_TYPE').combobox('setText',arr[0].CHECKOUT_TYPE);
		$('#PICKUP_NUMBER').textbox('setValue',arr[0].PICKUP_NUMBER);
		$('#Unit').combobox('setValue',arr[0].UNIT_ID);
		$('#Unit').combobox('setText',arr[0].UNIT_NAME);
		$('#CHECKOUT_NUMBER').textbox('setText',arr[0].CHECKOUT_NUMBER);
		$('#CHECKOUT_NUMBER').textbox('setValue',arr[0].CHECKOUT_NUMBER);
		$('#name').textbox('setText',arr[0].PICKUP_PERSON);
		$('#name').textbox('setValue',arr[0].PICKUP_PERSON);
		$('#enditTab').dialog('open');
	}
}

function del(){		//删除出库单
	var obj = $('#StockOut_tab').datagrid('getSelected');
	if(obj==null){
		$.messager.confirm("提示框", "请选择一行数据",function(a) {
			
        })
	}else{
		$.messager.confirm("提示框", "确定删除此行数据吗？",function(a) {
			if(a){
				var CHECKOUT_ID = obj.CHECKOUT_ID;
				ajaxquery("WMS_C0000019","CHECKOUT_ID:"+CHECKOUT_ID+"");
				view();
			}
        })
	}
}


