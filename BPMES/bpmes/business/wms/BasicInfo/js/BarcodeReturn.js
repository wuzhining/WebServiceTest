(function() {
	function barcodeReturn() {
	// 向打印机传值
	getprintlist = function() {
					var printData = $('#BarcodeSupplement_tab').datagrid(
							'getSelections'), data = [];
					if (printData.length == 0) {
						$.messager.alert('提示', '请选择一条数据进行打印');
						return;
					}
					for (var i = 0; i < printData.length; i++) {
						data.push({
							"SN" : printData[i].BARCODE,
							"ProductNo" : printData[i].MATERIA_ID,
							"SUPNO" : printData[i].SUPPLIER_ID,
							"RN" : i + 1,
							"PTime" : printData[i].PRODUCT_DATE,
							"LOTNO" : printData[i].SN_NUMBER,
							"NUM" : printData[i].PACKAGE_CAPACITY
						});
					}
					return data;
				},
    //链接打印机
	barcodePrint = function() {
					var url = getRootPath_web() + "/iPlant_printer", data = getprintlist(), barCodeStr = "";
					barCodeStr = {
						"labName" : "mes01.lab",
						"barCodeList" : data
					};
					// 提交打印信息给socketservice，socketsevice服务下发给socketclient客户端调用打印机打印
					if (data.length > 0) {
//						$.ajax({
//									type : "POST",
//									url : url,
//									contentType : "application/x-www-form-urlencoded; charset=utf-8",
//									async : true,
//									data : {
//										"dataList" : JSON.stringify(barCodeStr)
//									},
//									success : function(data) {
//										console.log(data);
//									},
//									error : function(e) {
//									}
//								});
						zbSocketPrinter(barCodeStr);
					} else {
						$.messager.alert("提示", "请选择打印数据！")
					}
				},
     //初始化表格
	initGridData = function() {
					var dgrid = $('#BarcodeSupplement_tab').datagrid('options');
					if (!dgrid)
						return;
					var reqData = {
						IFS : 'WMS_C000040',
						pageIndex : 1,
						pageSize : dgrid.pageSize
					}
					reqGridData('/iPlant_ajax', 'BarcodeSupplement_tab',
							reqData);
				},

	bindGridData = function(reqData, jsonData) {
					var gridList = {
						name : 'BarcodeSupplement_tab',
						dataType : 'json',
						columns : [ [ {
							field : 'ck',
							checkbox : true
						}, {
							field : 'ORDER_ID',
							title : '订单编号 ',
							width : 200,
							align: 'center'
						}, {
							field : 'SN_NUMBER',
							title : '批次号 ',
							width : 100,
							align: 'center'
						}, {
							field : 'SUPPLIER_NAME',
							title : '供应商',
							width : 150,
							align: 'center'
						}, {
							field : 'MATERIA_ID',
							title : '物料编码 ',
							width : 150,
							align: 'center'
						}, {
							field : 'MATERIA_NAME',
							title : '物料名称',
							width : 150,
							align: 'center'
						}, {
							field : 'UNIT_NAME',
							title : '物料单位名称',
							width : 150,
							align: 'center'
						}, {
							field : 'PACKAGE_NUMBER',
							title : '打包数量',
							width : 100,
							align: 'center'
						}, {
							field : 'PACKAGE_CAPACITY',
							title : '每包数量',
							width : 100,
							align: 'center'
						}, {
							field : 'BARCODE',
							title : '条码号',
							width : 150,
							align: 'center'
						}, {
							field : 'DICT_IT_NM',
							title : '状态',
							width : 100,
							align: 'center'
						}
						] ]
					}
					initGridMultiView(reqData, gridList);
					$("#BarcodeSupplement_tab").datagrid('loadData', jsonData);
				},

	searchBarcodeInfo = function() {
					var req = {
						ORDER_ID : $("#ORDER_ID").textbox("getValue"),
						SN_NUMBER : $("#SN_NUMBER").textbox("getValue"),
						BARCODE : $("#BARCODE").textbox("getValue"),
						IFS : "WMS_C000040",
						pageIndex : 1,
						pageSize : $('#BarcodeSupplement_tab').pageSize
					};
					reqGridData("/iPlant_ajax", "BarcodeSupplement_tab", req);
				};
	}
	barcodeReturn.prototype = {
		init : function() {
			$(function() {
				initGridData();
				$('#btnSearch').click(function() {
					searchBarcodeInfo();
				});
				$('#btnprint').click(function() {
					barcodePrint();
				});
			});
		}
	}
	var barcode = new barcodeReturn();
	barcode.init();
})();
