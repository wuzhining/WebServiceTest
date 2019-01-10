(function () {
    function dictItem() {
    	pageConfig={
    		dictCode:windowPageConfig.dictCode ||'CCT01',
    	    gridName:windowPageConfig.dictCode ||'dict_tab',
    	    txtDictCode:windowPageConfig.txtDictCode ||'txtDictCode',
    	    txtDictName:windowPageConfig.txtDictCode ||'txtDictName',
    	    cbUsed:windowPageConfig.isUsed||'cbUsedFlag',
    	    title:windowPageConfig.title || '客户类别',
    	    gcDictCD:windowPageConfig.gcDictCD || '字典编号',
    	    gcDictName:windowPageConfig.gcDictName ||'字典名称'
    	}
    	bindGridData = function (reqData,jsonData) {
            var grid = {
                name: pageConfig.gridName,
                dataType: 'json',
                columns: [[
                           { field: 'DICT_CD', title: pageConfig.gcDictCD, width: 200, align: 'center' },
                           { field: 'DICT_NM', title: pageConfig.gcDictName, width: 200, align: 'center' },
                           {
                               field: 'USE_YN', title: '是否启用', width: 200, align: 'center',
                               formatter: function (value, row, index) {
                                   if (value == 'Y') {
                                       return '启用'; 
                                   }
                                   else {
                                       return '未启用';
                                   }
                               }
                           },
                           { field: 'CRT_ID', title: '创建人', width: 200, align: 'center' },
                           { field: 'CRT_DT', title: '创建时间', width: 200, align: 'center' },
                           { field: 'UPT_ID', title: '修改人', width: 200, align: 'center' },
                           { field: 'UPT_DT', title: '修改时间', width: 200, align: 'center' }
                ]]
            }
            initGridView(reqData,grid);
            $('#'+pageConfig.gcDictName).datagrid('loadData', jsonData);
        },
        /*数据有效性验证*/
        checkDataValid = function () {
              /*数据不能为空验证*/
              var dictCode = $('#'+pageConfig.txtDictCode).val();
              if (dictCode == '') {
                  $('#'+pageConfig.txtDictCode).textbox({ required: true });
                  return false;
              }
              return true;
          },
          setDataNull = function () {
              $('#'+pageConfig.txtDictCode).textbox({ required: false });
          }
          validSelectedData = function () {
            var checkedItems = $('#' + gridName).datagrid('getSelections');
            var moveIds = [];
            var num = 0;
            $.each(checkedItems, function (index, item) {
                moveIds.push(item.moveid);
                num++;
            });
            if (type == 'Update') {
                if (num != 1) {
                    return false;
                }
            }
            else {
                if (num <= 0) {
                    return false;
                }
            }
        },
         updateDictItem = function () {
             var isSelectedData = validSelectedData(pageConfig.gridName, 'Update');
             if (!isSelectedData) {
                 $.messager.alert('提示', '请选择一条数据进行修改');
                 return;
             }
             var row = $("#"+pageConfig.gridName).datagrid("getSelected");
             Opttype = 1;
             if (row) {
                 $("#enditTab").dialog("open").dialog('setTitle', '编辑'+pageConfig.title+'维护');
                 $('#'+pageConfig.txtDictCode).textbox('setValue', row.DICT_CD);
                 $('#'+pageConfig.txtDictName).textbox('setValue', row.DICT_NM);
                 if (row.USE_YN == "on") {
                     $('#'+pageConfig.cbUsed).attr('checked', 'checked');
                 } else {
                     $('#'+pageConfig.cbUsed).attr('checked', 'false');
                 }
             }
         },
         deleteDictItem = function () {
             var isSelectedData = validSelectedData(page, 'Delete');
             if (!isSelectedData) {
                 $.messager.alert('提示', '请选择一条数据进行删除');
                 return;
             }
             var row = $("#"+pageConfig.gridName).datagrid("getSelected");
             var ajaxParam = {
                 url: '/iPlant_ajax',
                 dataType: 'JSON',
                 data: {
                     IFS: 'D000002',
                     DICT_CD: row.DICT_CD
                 }
             };
             iplantAjaxRequest(ajaxParam);
         },
         addDictItem = function () {
             $("#enditTab").dialog("open").dialog('setTitle', pageConfig.title+'维护');
             $("#fmCompany").form("clear");
             CustomerOpttyp = 0;
         },
         savaDictItem = function () {
             if (!checkDataValid()) return false;
             var IFServerNo = '';
             var reqData = null;
             commonData={
                  DICT_CD: $("#"+pageConfig.txtDictCode).val(),  //字典代码
                  DICT_NM: $("#"+pageConfig.txtDictName).val(),  //字典名称
                  DICT_TP: pageConfig.dictCode,                  //字典类型
                  USE_YN: $("#"+pageConfig.cbUsed).val(),        //是否启用	 
             }
             //新增
             if (Opttype == 0) {
                 IFServerNo = 'D000001',
                 reqData =$.extend({}, { CRT_ID: '',CRT_IP: ''});
             }
             //修改
             else if (Opttype == 1) {
                 IFServerNo = 'D000003',
                 reqData =$.extend({}, { CRT_ID: '',CRT_IP: ''});
             }
             var ajaxParam = {
                 url: '/iPlant_ajax',
                 dataType: 'JSON',
                 data: reqData
             };
             iplantAjaxRequest(ajaxParam);
         }	
    }
    dictItem.prototype = {
        init: function () {
            $(function () {
                var reqData = {
                    IFS: 'D000004',
                    DICT_CD:pageConfig.dictCD,
                    pageIndex:1,
            		pageSize:10
                }
                reqGridData('/iPlant_ajax',pageConfig, reqData);
                $('.add').click(function () {
                    addDictItem();
                })
                $('.update').click(function () {
                    updateDictItem();
                })
                $('.save').click(function () {
                    savaDictItem();
                })
                $('.close').click(function () {
                    setDataNull();
                    $('#enditTab').dialog('close');
                })
            });
        }
    }
    var dict = new dictItem();
    dict.init();
})();
