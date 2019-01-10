/**
 * 
 */
function bindGridView(objName,objProperty,jsonData){
	if(!objName) return;
	$('#'+objName).datagrid({ 
		title: '公司信息',
		dataType: 'json',
		pagination: true,
		pageSize: 5,
		pageList: [5, 10, 15, 20, 30, 50], //分页记录数数组     
		columns: [[
	               { field: 'CP_CD', title: '公司编号', width: 60 },
	               { field: 'CP_NM', title: '公司名称', width: 80 },
	               { field: 'CP_ADR', title: '公司地址', width: 100}
	     ]],  
		onLoadSuccess: function (data, param) {      
			
		}
	});     
	$('#company_tab').datagrid('loadData',jsonData);

}