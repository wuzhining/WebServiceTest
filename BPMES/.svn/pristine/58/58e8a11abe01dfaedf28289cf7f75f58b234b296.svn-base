function view(id) {
	var dgrid = $("#IQC_tab").datagrid('options');
	if (!dgrid)
		return;
	var BARCODE = $("#BARCODE").val();
	var reqData;
	if(id!=null&&id!=''){
		if(BARCODE!=null&&BARCODE!=''){
			reqData = {
					IFS : 'WMS_BP00017',
					pageIndex : 1,
					pageSize : dgrid.pageSize,
					BARCODE:BARCODE
				}
		}
	}else{
		reqData = {
				IFS : '',
				pageIndex : 1,
				pageSize : dgrid.pageSize,
				BARCODE:BARCODE
			}
	}
	reqGridData('../iPlant_ajax', 'IQC_tab', reqData);
};

function bindGridData(reqData, jsonData) {
	var gridList = {
		name : 'IQC_tab',
		dataType : 'json',
		columns : [ [ {
			field : 'CHECKIN_ID',
			title : '录入编码 ',
			width : 100
		}, {
			field : 'MATERIA_ID',
			title : '物料编码 ',
			width : 100
		}, {
			field : 'MATERIA_NAME',
			title : '物料名称',
			width : 100
		}, {
			field : 'UNIT_NAME',
			title : '物料单位',
			width : 100
		},{
			field : 'PACKAGE_NUMBER',
			title : '打包数量',
			width : 100
		},  {
			field : 'PACKAGE_CAPACITY',
			title : '每包数量',
			width : 100,
			editor:{type:'validatebox',
		           options:{validType:['length[1,10]','specialTextCharacter']}
		}},{
			field : 'BARCODE',
			title : '物料条码',
			width : 100
		}, {
			field : 'zz',
			title : '状态',
			width : 100,
			formatter: function(value,row,index){
				var tmp;
				if("CHK01.02"==row.CHECKIN_STATUS){
					tmp="待质检";
				}
				return tmp;
			}
		}] ]
	}
	initGridView(reqData, gridList);
	$("#IQC_tab").datagrid('loadData', jsonData);
	$(".messager-body").window('close');  
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

function openWindows(){  
	var obj =  $("#IQC_tab").datagrid("getSelected");
	if(fal){	//当存在编辑行时，应先保存编辑行
		$.messager.confirm("提示框", "存在未保存数据，是否保存",function(a) {
			if(a){
				updatePACKAGE_CAPACITY();
			}
        })
	}else{
		if(obj==null){
			$.messager.confirm("提示框", "请选择一行数据！",function(a) {
				
	        })
		}else{
				$('#enditTab').dialog('open');
				
		}
	}
}


function go(number){
	var obj =  $("#IQC_tab").datagrid("getSelected");
	var row = obj.BARCODE;
	var row_id = obj.CHECKIN_ID;
	var materia_id = obj.MATERIA_ID;
			if(number==1){
				ajaxquery("WMS_BP00018","BARCODE:"+row+",CHECKIN_STATUS:CHK01.03");
				ajaxquery("WMS_BP00019","CHECKIN_ID:"+row_id+",materia_id:"+materia_id+",CHECKIN_STATUS:CHK01.03");
			}else if(number==2){
				ajaxquery("WMS_BP00018","BARCODE:"+row+",CHECKIN_STATUS:CHK01.05");
				ajaxquery("WMS_BP00019","CHECKIN_ID:"+row_id+",materia_id:"+materia_id+",CHECKIN_STATUS:CHK01.05");
			}
}

function updatePACKAGE_CAPACITY(){
	$("#IQC_tab").datagrid('endEdit', edit);
	fal = false;		//结束编辑，不存在编辑的行
	var obj = $('#IQC_tab').datagrid('getData').rows[edit];
	if(obj==null){
		$.messager.confirm("提示框", "请修改一条数据！", function(a) {
			
		})
	}else{
		var PACKAGE_CAPACITY = obj.PACKAGE_CAPACITY;		//获取正在编辑行的数据
		var BARCODE = obj.BARCODE;
		if (!isNaN(PACKAGE_CAPACITY)) {			//判断是否为数字
			ajaxquery("WMS_BP00018","BARCODE:"+BARCODE+",PACKAGE_CAPACITY:"+PACKAGE_CAPACITY+"");
			view(1);
		} else {
			$.messager.confirm("提示框", "请输入一个有效的数字！", function(a) {

			})
			$("#IQC_tab").datagrid('beginEdit',
			edit);
			var ed = $(this).datagrid('getEditor', {
				index : edit,
				field : PACKAGE_CAPACITY
			});
			fal = true;		//编辑不符合重新编辑，状态改为存在编辑的行
			$(ed.target).focus();
		}
	}
	
	
}

