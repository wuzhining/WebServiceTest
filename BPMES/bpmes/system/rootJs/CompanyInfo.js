/* 启动时加载 */
/*
*/
$(function () {
	$("#company_tab").datagrid({
        title: '公司信息',
        checkOnSelect: false,
        pagination: true,
        url: 'iPlant_ajax',
        queryParams: {
        	IFS:'B000049'
    	},
    	pageSize: 20,
        pageNumber: 1,
        toolbar: '#tb',
        loadMsg: '加载中...',
        fit: true,
        columns: [[
             { field: 'CP_CD', title: '公司编码', width: 60 },
             { field: 'CP_NM', title: '公司名称'}
        ]]
    });
});

/* 查询数据条件 */
function getDataByCondition() {
    var companyCode = $('#companyCode').val();
    var companyName = $('#companyCode').val();
    $('#company_tab').datagrid('options').url = 'iPlant_ajax';
    $('#company_tab').datagrid('load', {
        startDate: startDate,
        endDate: endDate,
        movingCode: movingCode,
        IFS:''
    });
}

var url;
/* 修改商品移动信息 */
function updateCompany() {
    selectGood();
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
    var row = $("#goods_tab").datagrid("getSelected");
    if (row) {
        $("#enditTab").dialog("open").dialog('setTitle', '编辑公司信息维护');
        $("#fm").form("load", row);
        url = "/portal/addGoodMovingAction.do?type=update";
    }
    $('#tb_movement_code').combobox("select", row.movementcode);
    $('#tb_reasoncode').combobox("select", row.reasoncode);
    //修改商品时把编码和批号传入隐藏文本框（禁用后获取不到值）  
    $('#tb_frommaterial_in').val(row.frommaterial);
    $('#tb_frombatchnumber_in').val(row.frombatchnumber);
}

/* 添加商品移动信息 */
function addCompany() {
    $("#enditTab").dialog("open").dialog('setTitle', '公司信息维护');
    $("#fmCompany").form("clear");
}
function savaCompany(){
	var data = {
            Company_Code: $('#txtCompanyCode').val(),
            Company_Name:$('#txtCompanyName').val(),
            Company_Address:$('#txtCompanyAddress').val(),
            Note:$('#txtNote').val(),
        	IFS:'B000051'
	};
    $.ajax({
        type: "POST",
        url: 'iPlant_ajax',
        dataType: "JSON",
        data: data,
        success: function (data) {
        	if (returnValue == '0') {
            	alert("公司信息添加成功");
            } 
        },
        error:function(e){
        	alert('error');
        }
    });
}