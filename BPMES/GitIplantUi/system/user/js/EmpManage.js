$(function () {
    $('#empDataGrid').datagrid({
        width: 1024,
        height: 350,
        //pageList: [5, 10, 15, 20],
        pageSize: 10,
        nowrap: false,
        striped: true,
        collapsible: true,
        url: '../UserManage/datagrid_data1.json',
        method: 'get',
        loadMsg: '数据装载中......',
        remoteSort: false,
        pagination: true,
        rownumbers: true,
        frozenColumns: [[{
            field: 'ck',
            checkbox: true
        }]],
        toolbar: [{
            text: '添加',
            iconCls: 'icon-add',
            handler: addUser
        }, '-', {
            text: '删除',
            iconCls: 'icon-remove',
            handler: delUser
        }, '-', {
            text: '保存',
            iconCls: 'icon-save',
            handler: function () {
                $('#empDataGrid').datagrid('acceptChanges');
            }
        }, '-', {
            text: '修改',
            iconCls: 'icon-edit',
            handler: editUser
        }, '-', {
            text: '查询',
            iconCls: 'icon-search',
            handler: function () {
                $('#divSearch').window('open');
            }
        }],
        onBeforeLoad: function () {
            $(this).datagrid('rejectChanges');
        }
    });

    //设置权限


});
function addUser() {
    $("#divEmp").dialog("open").dialog('setTitle', '用户管理-新增');
    $("#fmAdd").form("clear");
    url = "UserManage.aspx";
    document.getElementById("hidtype").value = "submit";
}
function editUser() {
    var row = $("#empDataGrid").datagrid("getSelected");
    if (row) {
        $("#divEmp").dialog("open").dialog('setTitle', 'Edit User');
        $("#fm").form("load", row);
        url = "UserManage.aspx?id=" + row.ID;
    }
}
function saveUser() {
    $("#fm").form("submit", {
        url: url,
        onsubmit: function () {
            return $(this).form("validate");
        },
        success: function (result) {
            if (result == "1") {
                $.messager.alert("提示信息", "操作成功");
                $("#divEmp").dialog("close");
                $("#dg").datagrid("load");
            }
            else {
                $.messager.alert("提示信息", "操作失败");
            }
        }
    });
}
function delUser() {
    var row = $('#empDataGrid').datagrid('getSelected');
    if (row) {
        $.messager.confirm('Confirm', 'Are you sure you want to destroy this user?', function (r) {
            if (r) {
                $.post('destroy_user.php', { id: row.id }, function (result) {
                    if (result.success) {
                        $('#dg').datagrid('reload');
                    } else {
                        $.messager.show({
                            title: 'Error',
                            msg: result.errorMsg
                        });
                    }
                }, 'json');
            }
        });
    }
}