var ModeOpttype;  //0：新增   1:编辑
$("#ulnav").tree({
        url: 'datasource/menu.json',
        method: 'get',
       
    });
$(function () {
    var reqData={
    /*IFS:'B000037'*/
    }
  reqGridData('/iPlant_ajax',reqData);
  
});


function bindGridData(jsonData){
  var grid={
      name:'ModeMes_tab',
      title:'模具信息',
      dataType: 'json', 
      columns: [[
                /* { field: 'BR_CD', title: '不良代码', width: 100 ,align:'center'},
                   { field: 'BR_NM', title: '不良名称', width: 200,align:'center'},
                   { field: 'DICT_IT', title: '不良类别', width: 100,align:'center'},
                   { field: 'BR_SORT', title: '排序', width: 100,align:'center'},
                   { field: 'USE_YN', title: '是否启用', width: 100,align:'center'},
                   { field: 'CRT_ID', title: '创建人', width: 100,align:'center'},
                   { field: 'CRT_DT', title: '创建时间', width: 100,align:'center'},
                   { field: 'UPT_ID', title: '修改人', width: 100,align:'center'},
                   { field: 'UPT_DT', title: '修改时间', width: 100,align:'center'},*/
         ]]
  }
  initGridView(grid);
  $('#ModeMes_tab').datagrid('loadData',jsonData);
  $('#nav').text(grid.CP_NM);
}

/*添加维修知识库信息 */
function addModeMes() {
    $("#enditTab").dialog("open").dialog('setTitle', '模具信息维护');
    $("#ModeMes").form("clear");
    ModeOpttype=0;
}