var EquipTypeOpttype;
$("#ulnav").tree({
        url: 'datasource/menu.json',
        method: 'get',
       
    });

$(function () {
    var reqData={
/*		IFS:'B000037'*/
    }
	reqGridData('/iPlant_ajax',reqData);
	
});

function bindGridData(jsonData){
	var grid={
			name:'EquipType_tab',
			title:'设备类型信息',
			dataType: 'json', 
			columns: [[
	/*		           { field: 'BR_CD', title: '不良代码', width: 100 ,align:'center'},
		               { field: 'BR_NM', title: '不良名称', width: 200,align:'center'}*/
		     ]]
	}
	initGridView(grid);
	$('#EquipType_tab').datagrid('loadData',jsonData);
	$('#nav').text(grid.CP_NM);
}

/*添加设备类型信息 */
function addEquipType() {
    $("#enditTab").dialog("open").dialog('setTitle', '设备类型信息维护');
    $("#DefectiveType").form("clear");
    DefectiveOpttype=0;
}