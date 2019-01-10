$(function () {
    InitLeftMenu();
    $('body').layout();
    $('#lblExits').click(function(){
    	ExitSys();
    });
    GetMouldList();
})
/*************************************事件************************************************************************/


/*************************************方法************************************************************************/
/*获取系统菜单模块*/
function GetMouldList(userName){
	var ajaxParams={
	        type:'get',
	        dataType: 'json',
	        reqstr:{
	        	server:'D0000000',
	        	userName:userName
	        },
	        callBack: function (data) {
	            InitLeftMenu(data);
	        }
	}
	dataRequest.iplantAjaxRequest(ajaxParams);
}
/*退出系统时的确认提示框*/
function ExitSys(){
	if (!window.confirm("你要退出系统吗?")) {
        return event.returnValue = false;
    }
    else {
        window.top.location = "Login.html";
    }
}

function InitLeftMenu(data) {
	
   	
   $('.easyui-accordion li a').click(function () {
        var tabTitle = $(this).text();
        var url = $(this).attr("href");
        addTab(tabTitle, url);
        $('.easyui-accordion li div').removeClass("selected");
            $(this).parent().addClass("selected");
        }).hover(function () {
            $(this).parent().addClass("hover");
        }, function () {
            $(this).parent().removeClass("hover");
    });
}

function addTab(subtitle, url) {
        if (!$('#tabs').tabs('exists', subtitle)) {
        $('#tabs').tabs('add', {
            title: subtitle,
            content: createFrame(url),
            closable: true,
            width: $('#mainPanle').width(),
            height: $('#mainPanle').height() //- 26
        });
        $('#tabs').tabs({
            border: false,
            onSelect: function (title) {
                //tabs切换时 刷新 页面
                var pp = $("#tabs").tabs("getSelected");
                var tabObj = pp.panel("options").tab;    // 相应的 tab 对象
                var iframe = $(pp.panel('options').content);
                var src = iframe.attr('src');
                if (src != undefined) {
                    $('#tabs').tabs('update', { tab: pp, options: { content: createFrame(src) } });
                }
            }
        });
        
        }
        $('#tabs').tabs('select', subtitle);
    
}

function createFrame(url) {
    var s = '<iframe name="mainFrame" scrolling="yes" frameborder="0"  src="' + url + '" style="width:100%;height:99%;background-color:#ceb686;"></iframe>';
    return s;
}

$(function () {
	$('#btn-save,#btn-cancel').linkbutton();
    win = $('#eidt-window').window({
        closed: true,
        modal: true,
        shadow: false
    });
    form = win.find('form');

    $('#btn-search,#btn-search-cancel').linkbutton();
    searchWin = $('#search-window').window({
        closed: true,
        modal: true
    });
    searchForm = searchWin.find('form');

    tree = $('#tree').tree({
        checkbox: false,
        url: 'GetClassJsonByPid.ashx?pid=0',
        onBeforeExpand: function (node, param) {
            //alert(node.id);
            $('#tree').tree('options').url = "GetClassJsonByPid.ashx?pid=" + node.id; // change the url                       
            //param.myattr = 'test';    // or change request parameter
        },
        onClick: function (node) {
            clickTree(node.id);
        }
    });

    grid = $('#grid').datagrid({
        title: '产品管理',
        iconCls: 'icon-save',
        url: 'Handler.ashx?action=list',
        sortName: 'ID',
        sortOrder: 'desc',
        idField: 'ID',
        pageSize: 30,
        frozenColumns: [[
                    { field: 'ck', checkbox: true }
        ]],
        columns: [[
                    { field: 'title', title: '名称', width: 150 },
                    { field: 'addTime', title: '添加日期', width: 150, sortable: true }
                 ]],
        pagination: true,
        rownumbers: true,
        singleSelect: false,
        toolbar: [{
            text: '新增',
            iconCls: 'icon-add',
            handler: add
        }, '-', {
            text: '修改',
            iconCls: 'icon-edit',
            handler: edit
        }, '-', {
            text: '删除',
            iconCls: 'icon-remove',
            handler: del
        }, '-', {
            text: '查找',
            iconCls: 'icon-search',
            handler: OpensearchWin
        }, '-', {
            text: '所有',
            iconCls: 'icon-search',
            handler: showAll
        }]
    });
    $('body').layout();
});

var tree;
var grid;
var win;
var form;
var searchWin;
var searchForm;

function clickTree(nodeid) {
    grid.datagrid({ url: 'Handler.ashx?action=list&PID=' + nodeid });
    grid.datagrid('clearSelections');
}

function getSelectedArr() {
    var ids = [];
    var rows = grid.datagrid('getSelections');
    for (var i = 0; i < rows.length; i++) {
        ids.push(rows[i].ID);
    }
    return ids;
}
function getSelectedID() {
    var ids = getSelectedArr();
    return ids.join(',');
}
function arr2str(arr) {
    return arr.join(',');
}

function add() {
    win.window('open');
    form.form('clear');
    form.url = 'Handler.ashx?action=save';
}
function edit() {
    var rows = grid.datagrid('getSelections');
    var num = rows.length;
    if (num == 0) {
        $.messager.alert('提示', '请选择一条记录进行操作!', 'info');
        return;
    }
    else if (num > 1) {
        $.messager.alert('提示', '您选择了多条记录,只能选择一条记录进行修改!', 'info');
        return;
    }
    else {
        win.window('open');
        form.form('load', 'Handler.ashx?action=get&id=' + rows[0].ID);
        form.url = 'Handler.ashx?action=save&id=' + rows[0].ID;
    }
}
function del() {
    var arr = getSelectedArr();
    if (arr.length > 0) {
        $.messager.confirm('提示信息', '您确认要删除吗?', function (data) {
            if (data) {
                $.ajax({
                    url: 'Handler.ashx?action=del&id=' + arr2str(arr),
                    type: 'GET',
                    timeout: 1000,
                    error: function () {
                        $.messager.alert('错误', '删除失败!', 'error');
                    },
                    success: function (data) {
                        eval('data=' + data);
                        if (data.success) {
                            grid.datagrid('reload');
                            grid.datagrid('clearSelections');
                        } else {
                            $.messager.alert('错误', data.msg, 'error');
                        }
                    }
                });
            }
        });
    } else {
        $.messager.show({
            title: '警告',
            msg: '请先选择要删除的记录。'
        });
    }
}

function showAll() {
    grid.datagrid({ url: 'Handler.ashx?action=list' });
}
function OpensearchWin() {
    searchWin.window('open');
    searchForm.form('clear');
}

function saveData() {
    form.form('submit', {
        url: form.url,
        success: function (data) {
            //alert(data);
            eval('data=' + data);
            if (data.success) {
                grid.datagrid('reload');
                win.window('close');
            } else {
                $.messager.alert('错误', data.msg, 'error');
            }
        }
    });
}
function closeWindow() {
    win.window('close');
}

function SearchOK() {
    var s_title = $("#s_title").val();
    searchWin.window('close');
    grid.datagrid({ url: 'Handler.ashx?action=query', queryParams: { title: s_title } });
}
function closeSearchWindow() {
    searchWin.window('close');
}
