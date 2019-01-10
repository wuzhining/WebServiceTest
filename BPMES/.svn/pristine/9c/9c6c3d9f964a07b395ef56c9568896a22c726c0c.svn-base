/* 启动时加载 */
/*
*/
var ModeMesOpttype;  //0：新增   1:编辑
$("#ulnav").tree({
        url: 'datasource/menu.json',
        method: 'get',
       
    });
$(function () {
    var reqData={
		IFS:'B000029'
    }
	reqGridData('/iPlant_ajax',reqData);
	
});


function bindGridData(jsonData){
	var grid={
			name:'modeMes_tab',
			title:'模具信息',
			dataType: 'json', 
			columns: [[
			           { field: 'ET_CD', title: '设备编码', width: 100 ,align:'center'},
		               { field: 'ET_NM', title: '设备名称', width: 200,align:'center'},
		               { field: 'ET_UT', title: '设备型号', width: 100,align:'center'},
		               { field: 'ET_MT', title: '制造厂商', width: 100,align:'center'},
		               { field: 'ET_MD', title: '制造日期', width: 100,align:'center'},
		               { field: 'ET_QT', title: '资产编号', width: 200,align:'center'},
		               { field: 'ET_PT', title: '入厂日期', width: 200,align:'center'},
		               { field: 'ET_PW', title: '机器功率', width: 100,align:'center'},
                   { field: 'DICT_IT', title: '设备类别编码', width: 100,align:'center'},
                   { field: 'PL_CD', title: '所属车间', width: 100,align:'center'},
                   { field: 'ET_TT', title: '设备吨位', width: 200,align:'center'},
                   { field: 'ET_ST', title: '一级保养', width: 200,align:'center'},
                   { field: 'ET_LT', title: '二级保养', width: 100,align:'center'},
		               { field: 'CRT_ID', title: '创建人', width: 100,align:'center'},
		               { field: 'CRT_DT', title: '创建时间', width: 100,align:'center'},
		               { field: 'UPT_ID', title: '修改人', width: 100,align:'center'},
		               { field: 'UPT_DT', title: '修改时间', width: 100,align:'center'},
		               { field: 'CP_RM', title: '备注', width: 200,align:'center'}
		     ]]
	}
	initGridView(grid);
	$('#modeMes_tab').datagrid('loadData',jsonData);
	$('#nav').text(grid.CP_NM);
}

/* 查询数据条件 */
function getDataByCondition() {
    var companyCode = $('#companyCode').val();
    var companyName = $('#companyName').val();
    var reqData={
    		CP_CD: companyCode,
            CP_NM: companyName,
            IFS:'B000049'	
    }
    reqGridData('/iPlant_ajax',reqData);
}
/* 修改商品移动信息 */
function updateModeMes() {
    var checkedItems = $('#company_tab').datagrid('getSelections');
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
    var row = $("#company_tab").datagrid("getSelected");
   
    if (row) {
        $("#enditTab").dialog("open").dialog('setTitle', '编辑公司信息维护');
        $('#txtCompanyCode').textbox('setValue',row.CP_CD);
        $('#txtCompanyName').textbox('setValue',row.CP_NM);
        $('#txtCompanyAddress').textbox('setValue',row.CP_ADR);
        $('#txtCompanyAbbreviation').textbox('setValue',row.ST_NM);
        $('#txtCompanyCondition').textbox('setValue',row.CP_ST);
        $('#txtCompanyUse').val(row.USE_YN);
        $('#txtCompanyDate').textbox('setValue',row.EL_TM);
        $('#txtCompanyHomepage').textbox('setValue',row.CP_WEB);
        $('#txtNote').textbox('setValue',row.CP_RM);
        CompanyOpttype=1;
        if(row.USE_YN == "on"){
        	$('#txtCompanyUse').attr('checked','checked');
        }else{
        	$('#txtCompanyUse').attr('checked','false');
        }
    }
}

/* 添加商品移动信息 */
function addModeMes() {
    $("#enditTab").dialog("open").dialog('setTitle', '公司信息维护');
    $("#fmCompany").form("clear");
    CompanyOpttype=0;
}

function savaModeMes(){ 
	   var IFServerNo='';
	   var reqData=[];
	   if(CompanyOpttype==0){ 
		   IFServerNo='B000050'   
	   }
	   else if(CompanyOpttype==1){
		   IFServerNo='B000052'
	   }
	   else{
		   IFServerNo='B000051'
	   }
	   var ajaxParam={
	      url:'/iPlant_ajax',
	      dataType:'JSON',
  	      data:{
              CP_CD:$('#txtCompanyCode').val(),
              CP_NM:$('#txtCompanyName').val(),
              CP_ADR:$('#txtCompanyAddress').val(),
              ST_NM:$('#txtCompanyAbbreviation').val(),
              CP_ST:$('#txtCompanyCondition').val(),
              USE_YN:$('#txtCompanyUse').val(),
              CP_WEB:$('#txtCompanyHomepage').val(),
              EL_TM:$('#txtCompanyDate').val(),
              CP_RM:$('#txtNote').val(), 
          	  IFS:IFServerNo
          }
    };
	iplantAjaxRequest(ajaxParam);	
}

