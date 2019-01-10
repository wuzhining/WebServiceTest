
/* 启动时加载 */
/*
   http://blog.csdn.net/c657826604/article/details/51217542#
*/
$(function () {
    $('#movement_ode').combobox({
        url: '/portal/goodsMovingTypeAction.do?type=query',
        valueField: 'movement_types',
        textField: 'summary'
    });
    $("#goods_tab").datagrid({
        title: '货品移动填报',
        checkOnSelect: false,
        pagination: true,
        pageSize: 20,
        pageNumber: 1,
        toolbar: '#tb',
        url: '/portal/queryGoodsMovementAction.do',
        loadMsg: '加载中...',
        fit: true,
        columns: [[
            { field: 'id', checkbox: true },
             { field: 'moveid', title: '编号', width: 60 },
             { field: 'postingdate', title: '过帐日期', width: 80 },
             { field: 'transferreno', title: '移动单号', width: 100 },
             { field: 'movementcodename', title: '移动类型信息说明', width: 150 },
            { field: 'fromstoragelocation', title: '来源库位', width: 60 },
            { field: 'tostoragelocation', title: '接受库位', width: 60 },
            { field: 'frommaterial', title: '商品编码', width: 80 },
            { field: 'frombatchnumber', title: '商品批号', width: 80 },
            { field: 'quantity', title: '数量', width: 60 },
             { field: 'reasoncodename', title: '原因代码说明', width: 120 },
            { field: 'documentdatetime', title: '创建时间', width: 80 },
             {
                 field: 'del_flag', title: '记录状态', width: 80,
                 formatter: function (value, row, index) {
                     if (value == '0') {
                         return '<a  href="javascript:void(0);" style="color: #000000;" onclick="updateDelFlag(' + value + ',' + row.moveid + ');">有效</a>';
                     }
                     if (value == '1') {
                         return '<a  href="javascript:void(0);" style="color: #ff0000;" onclick="updateDelFlag(' + value + ',' + row.moveid + ');">无效</a>';
                     }
                 }
             },
             {
                 field: 'exec_flag', title: '同步状态', width: 80,
                 formatter: function (value, row, index) {
                     if (value == '0') {
                         return '未同步';
                     }
                     if (value == '1') {
                         return '已同步';
                     }
                 }
             }
        ]]
    });

    /* 选择ERP商品信息 */
    $("#select_erp_win").window({
        title: '选择ERP商品信息',
        width: 640,
        height: 400,
        modal: true
    }).window("close");

    $("#select_erp_tab").datagrid({
        url: "/portal/queryerpgoodsAction.do",
        loadMsg: '加载中...',
        singleSelect: true,
        pagination: true,
        pageSize: 10,
        pageNumber: 1,
        columns: [[
           { field: 'com_goods_id', title: 'com_goods_id', width: 100, checkbox: true },
          { field: 'goods_opcode', title: 'ERP商品操作码', width: 100 },
          { field: 'goods_name', title: 'ERP商品名称', width: 100 },
          { field: 'goods_desc', title: 'ERP商品规格', width: 100 },
           { field: 'product_location', title: 'ERP商品厂商', width: 100 },
         { field: 'unit_name', title: 'ERP商品单位', width: 75 },
           { field: 'package_num', title: 'ERP商品包装数', width: 75 }

        ]]
    });

    /* 选择商品批号 */
    $("#select_batchnumber_win").window({
        title: '选择ERP商品信息',
        width: 480,
        height: 400,
        modal: true
    }).window("close");

    $("#select_batchnumber_tab").datagrid({
        url: "/portal/queryerpGoodsBatchNumberAction.do",
        loadMsg: '加载中...',
        singleSelect: true,
        pagination: true,
        pageSize: 10,
        pageNumber: 1,
        columns: [[
         { field: 'com_lot_id', title: 'com_lot_id', width: 100, checkbox: true },
         { field: 'lot_no', title: '商品批号', width: 100 },
           { field: 'produce_date', title: '生效日期', width: 150 },
           { field: 'expire_date', title: '到期日期', width: 150 }
        ]]
    });
    /* 移动类型改变启用原因代码 */
    $('#tb_movement_code').combobox({
        onSelect: function (record) {
            var value = $(this).combobox('getValue');
            $('#tb_reasoncode').combobox({
                url: '/portal/getAllParameterAction.do?type=reason&movement_types=' + value,
                valueField: 'reason_code',
                textField: 'reason_name'
            });
            $("#tb_reasoncode").combobox("enable");
        }
    });


});

/* 查询数据条件 */
function checkInputQuery() {
    var startDate = $('#startDate').datebox('getValue');
    var endDate = $('#endDate').datebox('getValue');
    var movingCode = $('#movement_ode').combobox('getValue');
    $('#goods_tab').datagrid('options').url = '/portal/queryGoodsMovementAction.do';
    $('#goods_tab').datagrid('load', {
        startDate: startDate,
        endDate: endDate,
        movingCode: movingCode,
    });
}

/* 修改记录状态 */
function updateDelFlag(value, row) {
    $.ajax({
        method: 'post',
        url: '/portal/updateGoodStatusAction.do',
        data: {
            type: "del",
            moveid: row,
            del_flag: value
        },
        async: false,
        dataType: 'json',
        success: function (data) {
            if (data) {
                $('#goods_tab').datagrid('reload');
            } else {
                $.messager.alert('提示', "更改记录状态失败！");
            }
        },
        error: function () {
            $.messager.alert('异常', '更改记录状态异常！');
        }
    });
}

/* 修改同步状态，单条或多条 */
function updateExecFlag() {
    var checkedItems = $('#goods_tab').datagrid('getSelections');
    var moveid = [];
    $.each(checkedItems, function (index, item) {
        moveid.push(item.moveid);
    });
    var str = moveid.toString();
    if (moveid != "") {
        $.ajax({
            method: 'post',
            url: '/portal/updateGoodStatusAction.do',
            data: {
                type: "exec",
                moveids: str
            },
            async: false,
            dataType: 'json',
            success: function (data) {
                if (data) {
                    $('#goods_tab').datagrid('reload');
                } else {
                    $.messager.alert('提示', '更改同步状态失败！');
                }
            },
            error: function () {
                $.messager.alert('警告', '更改同步状态异常！');
            }
        });
    } else {
        $.messager.alert('提示', '请至少选择一条数据进行修改！');
        return false;
    }
}
/* 下拉框元素填充 */
function selectGood() {
    $('#tb_movement_code').combobox({
        url: '/portal/goodsMovingTypeAction.do?type=add',
        valueField: 'movement_types',
        textField: 'summary'
    });
    $('#tb_fromstoragelocation').combobox({
        url: '/portal/getAllParameterAction.do?type=fromstor',
        valueField: 'freight_code',
        textField: 'freight_info'
    });
    $('#tb_tostoragelocation').combobox({
        url: '/portal/getAllParameterAction.do?type=tostorage',
        valueField: 'freight_code',
        textField: 'freight_info'
    });
    $('#tb_reasoncode').combobox({
        url: '/portal/getAllParameterAction.do?type=reason',
        valueField: 'reason_code',
        textField: 'reason_name'
    });
    $("#frombatchnumberBtn").linkbutton("disable");
    $("#tb_reasoncode").combobox("disable");
}
var url;
/* 修改商品移动信息 */
function updateGood() {
    selectGood();
    var checkedItems = $('#goods_tab').datagrid('getSelections');
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
        $("#enditTab").dialog("open").dialog('setTitle', '编辑货品移动维护');
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
function addGood() {
    selectGood();
    $("#enditTab").dialog("open").dialog('setTitle', '添加货品移动维护');
    $("#fm").form("clear");
    url = "/portal/addGoodMovingAction.do?type=add";
}

/* 数据校验后提交 */
function checkInputAdd() {
    var tb_postingdate = $('#tb_postingdate').datebox('getValue');
    if (tb_postingdate == '') {
        $.messager.alert('提示', '过帐日期不能为空');
        return false;
    }
    var tb_movement_code = $('#tb_movement_code').combobox('getValue');
    if (tb_movement_code == '') {
        $.messager.alert('提示', '移动类型不能为空');
        return false;
    }
    var tb_fromstoragelocation = $('#tb_fromstoragelocation').combobox('getValue');
    if (tb_fromstoragelocation == '') {
        $.messager.alert('提示', '来源库位不能为空');
        return false;
    }
    var tb_tostoragelocation = $('#tb_tostoragelocation').combobox('getValue');
    if (tb_tostoragelocation == '') {
        $.messager.alert('提示', '接收库位不能为空');
        return false;
    }
    var tb_frommaterial = $('#tb_frommaterial').val();
    if (tb_frommaterial == '') {
        $.messager.alert('提示', '商品编码不能为空');
        return false;
    }
    var tb_frombatchnumber = $('#tb_frombatchnumber').val();
    if (tb_frombatchnumber == '') {
        $.messager.alert('提示', '商批号不能为空');
        return false;
    }
    var tb_quantity = $('#tb_quantity').val();
    if (tb_quantity == '') {
        $.messager.alert('提示', '数量不能为空');
        return false;
    }
    /* var tb_reasoncode = $('#tb_reasoncode').combobox('getValue');  
 if(tb_reasoncode==''){ 
    $.messager.alert('提示','原因代码不能为空'); 
     return false; 
} */
    $("#fm").form("submit", {
        url: url,
        onsubmit: function () {
            return $(this).form("validate");
        },
        success: function (result) {
            if (result == "true") {
                $.messager.alert("提示信息", "操作成功");
                $("#enditTab").dialog("close");
                $("#goods_tab").datagrid("load");
            }
            else {
                $.messager.alert("提示信息", "保存数据失败");
            }
        }
    });
}
/* 选择ERP商品 */

function selecterpapply() {
    $("#select_erp_win").window("open");
    $("#select_erp_tab").datagrid("load");
}

function queryselecterp() {
    var apply_erp_name = $("#select_erp_name").val();
    var apply_erp_produce = $("#select_erp_produce").val();
    $("#select_erp_tab").datagrid("load", { erp_name: apply_erp_name, erp_produce: apply_erp_produce });
}

function saveselecterp() {
    var select = $('#select_erp_tab').datagrid('getSelections');
    var goods_opcode = select[0].goods_opcode;
    var com_goods_id = select[0].com_goods_id;
    $("#tb_frommaterial").val(goods_opcode);
    $("#tb_frommaterial_in").val(goods_opcode);
    $("#com_goods_id").val(com_goods_id);
    $.messager.progress('close');
    $('#select_erp_win').window('close');
    /* 清空原有批号 */
    $("#tb_frombatchnumber").val("");
    $("#tb_frombatchnumber_in").val("");
    $("#frombatchnumberBtn").linkbutton("enable");
}

/* 批号 */
function queryFrombatchnumber(num) {
    var com_goods_id = $("#com_goods_id").val();
    if (num == 1) {
        $("#select_batchnumber_win").window("open");
        $("#select_batchnumber_tab").datagrid("load", { com_goods_id: com_goods_id });
    }
    if (num == 2) {
        var link_goods_id = $("#link_goods_id").val();
        $("#select_batchnumber_tab").datagrid("load", { com_goods_id: com_goods_id, link_goods_id: link_goods_id });
    }
}

function saveselectbatchnumber() {
    var select = $('#select_batchnumber_tab').datagrid('getSelections');
    var lot_no = select[0].lot_no;
    $("#tb_frombatchnumber").val(lot_no);
    $("#tb_frombatchnumber_in").val(lot_no);
    $.messager.progress('close');
    $('#select_batchnumber_win').window('close');
}

