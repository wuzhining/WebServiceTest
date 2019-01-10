
function barCodePrinter(barCode, tilte, content, num) {
	var pi = {
		url : "../../../iPlant_ajax",
		dataType : "JSON",
		data : {
			IFS : "B000141",
			barCode : barCode,
			title : tilte,
			content : content,
			num : num
		},
		successCallBack : function(data) {
			console.log(data);
		},
		errorCallBack : function() {
			$.messager.alert("提示", e)
		}
	};
	iplantAjaxRequest(pi)
}


function view() {
	var dgrid = $("#BarcodeSupplement_tab").datagrid('options');
	if (!dgrid)
		return;
	var CHECKIN_ID = $("#CHECKIN_ID").val();
	var CHECKIN_NAME = $("#CHECKIN_NAME").val();
	var BARCODE = $("#BARCODE").val();
	var reqData = {
		IFS : 'WMS_BP00021',
		pageIndex : 1,
		pageSize : dgrid.pageSize,
		CHECKIN_ID : CHECKIN_ID,
		CHECKIN_NAME : CHECKIN_NAME,
		BARCODE:BARCODE
	}
	reqGridData('../iPlant_ajax', 'BarcodeSupplement_tab', reqData);
};

function bindGridData(reqData, jsonData) {
	var gridList = {
		name : 'BarcodeSupplement_tab',
		dataType : 'json',
		singleSelect:false,
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			field : 'CHECKIN_ID',
			title : '来料编号 ',
			width : 200
		}, {
			field : 'CHECKIN_NAME',
			title : '来料名称 ',
			width : 100
		}, {
			field : 'MATERIA_ID',
			title : '物料编码 ',
			width : 100
		}, {
			field : 'MATERIA_NAME',
			title : '物料名称',
			width : 150
		}, {
			field : 'UNIT_ID',
			title : '物料单位ID',
			width : 100,
			hidden: true
		}, {
			field : 'UNIT_NAME',
			title : '物料单位',
			width : 150
		}, {
			field : 'PACKAGE_NUMBER',
			title : '打包数量',
			width : 100
		}, {
			field : 'PACKAGE_CAPACITY',
			title : '每包数量',
			width : 100
		}, {
			field : 'BARCODE',
			title : '物料条码',
			width : 150
		}, {
			field : 'CHECKIN_STATUS',
			title : '状态',
			width : 100
		} ] ]
	}
	initGridMultiView(reqData, gridList);
	$("#BarcodeSupplement_tab").datagrid('loadData', jsonData);
}

function ajaxquery(id, b) {
	var arr = new Array();
	var d = {
		IFS : id,
		reqType : "WEB"
	};
	reqParam = b.split(",");
	if ("" != reqParam)
		for (var e = 0; e < reqParam.length; e++) { //当无输入参数时，此判断不会进入循环将不会进入
			var f = reqParam[e].toString().replace('"', ""), g = f.substring(0,
					f.indexOf(":")).toString(), h = f.indexOf(":") + 1, i = f
					.substring(h).toString();
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

function reprint(){
	var row = $('#BarcodeSupplement_tab').datagrid('getSelected');
	if(row==null){
		$.messager.confirm('提示框', '请选择需要补打条码的数据！', function (r) {
			
		});
	}else{
		$.messager.confirm('确认框', '您确定要补打您所选择的条码?', function (r) {
			if(r){
				barCodePrinter(row.BARCODE,'补打条码'+row.MATERIA_NAME,row.UNIT_NAME,row.PACKAGE_CAPACITY);
			}
		});
	}
	
	
}


