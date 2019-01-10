/* 启动时加载 */
/*
*/
var CompanyOpttype;  //0：新增   1:编辑

$(function () {
    var reqData={
		IFS:'B000013'
    }
  //物料类别
    var zydat=[{   
        "id":"Y",   
        "text":"是"  
    },{   
        "id":"N",   
        "text":"否"  
    }
    ] ;
    $('#txtBasicUnitUse').combobox({
		data:zydat,
		valueField:'id',
		textField:'text'
//		onChange: function (newval,oldval){
//			glzy = newval+"";
//			initBDZL();
//			initSBBDZL();
//		}
	});
	reqGridData('/iPlant_ajax','BasicUnit_tab',reqData);
});


function bindGridData(reqData,jsonData){
    var grid={
			name:'BasicUnit_tab',
			title:'客户信息',
			dataType: 'json', 
			columns: [[
			           { field: 'FD_CD', title: '基本单位编号', width: 200 ,align:'center'},
		               { field: 'FD_MM', title: '基本单位名称', width: 200,align:'center'},
		               { field: 'USE_YN', title: '是否启用', width: 200,align:'center',
							formatter: function(value,row,index){
								if(value == "N"){
									return "否";
								}else if(value=="Y"){
									return "是";
								}
								return "";
						}},
		               { field: 'CRT_ID', title: '创建人', width: 200,align:'center'},
		               { field: 'CRT_DT', title: '创建时间', width: 200,align:'center'},
		               { field: 'UPT_ID', title: '修改人', width: 200,align:'center'},
		               { field: 'UPT_DT', title: '修改时间', width: 200,align:'center'}
		     ]]
	}
	initGridView(reqData,grid);
	$('#BasicUnit_tab').datagrid('loadData',jsonData);
}

/* 修改商品移动信息 */
function updateBasicUnit() {
    var checkedItems = $('#BasicUnit_tab').datagrid('getSelections');
    var moveIds = [];
    var num = 0;
    
    $.each(checkedItems, function (index, item) {
        moveIds.push(item.moveid);
        num++;
    });
    if (num != 1) {
        $.messager.alert('提示', '请选择一条数据进行修改');
        return false;
    }
    var row = $("#BasicUnit_tab").datagrid("getSelected");
   
    if (row) {
        $("#enditTab").dialog("open").dialog('setTitle', '编辑单位信息');
        $('#txtBasicUnitCode').textbox('setValue',row.FD_CD);
        $('#txtBasicUnitName').textbox('setValue',row.FD_MM);
        $('#txtBasicUnitUse').combobox('setValue', row.USE_YN);
//      $('#txtFlightUse').val(row.USE_YN);
       
        CompanyOpttype=1;
    }
    
}

/* 添加商品移动信息 */
function addBasicUnit() {
    $("#enditTab").dialog("open").dialog('setTitle', '单位信息维护');
    $("#fmBasicUnit").form("clear");
    CompanyOpttype=0;
}
function savaBasicUnit(){ 
	   var IFServerNo='';
	   var reqData=[];
	   if(CompanyOpttype==0){ 
		   IFServerNo='B000014'   
	   }
	   else if(CompanyOpttype==1){
		   IFServerNo='B000016'
	   }
	   else{
		   IFServerNo='B000013'
	   }
	   
	   var ajaxParam={
	      url:'/iPlant_ajax',
	      dataType:'JSON',
  	      data:{
			    FD_CD:$('#txtBasicUnitCode').val(),
			    FD_MM:$('#txtBasicUnitName').val(),
			    USE_YN: $('#txtBasicUnitUse').combobox('getValue'),
          	    IFS:IFServerNo
          }
    };
	iplantAjaxRequest(ajaxParam);
	$.messager.alert("提示","保存成功！","",function(){
		reqGridData('/iPlant_ajax','BasicUnit_tab',{IFS:'B000013'});
	});
	$("#enditTab").dialog("close");
}
