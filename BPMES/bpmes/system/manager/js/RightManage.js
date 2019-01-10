(function () {
    function rightManage() {
        InitYHXX = function () {
            var ajaxParam = {
                url: '/iPlant_ajax',
                dataType: 'JSON',
                data: {
                    IFS: 'D000025'
                },
                successCallBack: function (data) {
                    var rowNum = 0
                    if (data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS) {
                        rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
                    }
                    var rowCollection = createSourceObj(data);
                    var rows = [];
                    for (var i = 0; i < rowCollection.length; i++) {
                        var row = {
                            "GR_CD": rowCollection[i].GR_CD,
                            "GR_NM": rowCollection[i].GR_NM,
                            "state": "open"
                        };
                        rows.push(row);
                    }
                    $('#yhnav').tree({
                        method: 'get',
                        parentField: "0",
                        textFiled: 'GR_NM',
                        idFiled: 'GR_CD',
                        data: rows,
                        onClick: function (node) {
                            $("#btnSave").show();
                            ccName = node.GR_NM;
                            ccId = node.GR_CD;
                            if(!checkNotEmpty(onClickNode)){
                            	onClickNode = ccId;
                            }else{
                            	if(onClickNode == ccId){
                            		return false;
                            	}else{
                            		onClickNode = ccId;
                            	}
                            }
                            cccollect = {};
                            //获取功能点信息
                            var ajaxParam = {
                                url: '/iPlant_ajax',
                                dataType: 'JSON',
                                data: {
                                    IFS: 'D000029',
                                    MN_CD: ''
                                },
                                successCallBack: function (data) {
                                	gnCollect = [];
                                    gnCollect = createSourceObj(data);
                                    //获权限信息
                                    var ajaxParam = {
                                        url: '/iPlant_ajax',
                                        dataType: 'JSON',
                                        data: {
                                            IFS: 'D000033',
                                            GR_CD: ccId
                                        },
                                        successCallBack: function (data) {
                                        	qxCollect = [];
                                            qxCollect = createSourceObj(data);
                                            for (var i = 0; i < gnCollect.length; i++) {
                                                if (gnCollect[i].FUN_LEVL != "2") {
                                                    var a = gnCollect[i].MN_CD;
                                                    if (a in cccollect) {
                                                        var flag = false;
                                                        if (qxCollect.length > 0) {
                                                            for (var j = 0; j < qxCollect.length; j++) {
                                                                if (qxCollect[j].MN_CD == gnCollect[i].MN_CD && qxCollect[j].FUN_CD == gnCollect[i].FUN_CD) {
                                                                    flag = true;
                                                                    break;
                                                                }
                                                            }
                                                        }
                                                        if (flag) {
                                                            cccollect[a].push({ attr3: "CCattr", sT_C_CD: gnCollect[i].FUN_CD, sT_C_NM: gnCollect[i].FUN_NM, sT_P_CD: gnCollect[i].MN_CD, state: "open", children: [], checked: true });
                                                        } 
                                                        else {
                                                            cccollect[a].push({ attr3: "CCattr", sT_C_CD: gnCollect[i].FUN_CD, sT_C_NM: gnCollect[i].FUN_NM, sT_P_CD: gnCollect[i].MN_CD, state: "open", children: [] });
                                                        }
                                                    }
                                                    else {
                                                    	cccollect[a] = new Array();
                                                        var flag = false;
                                                        if (qxCollect.length > 0) {
                                                            for (var j = 0; j < qxCollect.length; j++) {
                                                                if (qxCollect[j].MN_CD == gnCollect[i].MN_CD && qxCollect[j].FUN_CD == gnCollect[i].FUN_CD) {
                                                                    flag = true;
                                                                    break;
                                                                }
                                                            }
                                                        }
                                                        if (flag) {
                                                            cccollect[a].push({ attr3: "CCattr", sT_C_CD: gnCollect[i].FUN_CD, sT_C_NM: gnCollect[i].FUN_NM, sT_P_CD: gnCollect[i].MN_CD, state: "open", children: [], checked: true });
                                                        } else {
                                                            cccollect[a].push({ attr3: "CCattr", sT_C_CD: gnCollect[i].FUN_CD, sT_C_NM: gnCollect[i].FUN_NM, sT_P_CD: gnCollect[i].MN_CD, state: "open", children: [] });
                                                        }
                                                    }
                                                }
                                            }
                                            //初始化
                                            InitLeftMenu();
                                        }
                                    };
                                    iplantAjaxRequest(ajaxParam);
                                }
                            };
                            iplantAjaxRequest(ajaxParam);
                        }
                    });
                }
            };
            iplantAjaxRequest(ajaxParam);
        },
    	bindTreeData = function (jsonData) {
    	    //拼接json数据  为树添加子节点
    	    if (jsonData.length > 0) {
    	        for (var i = 0; i < jsonData.length; i++) {
    	        	jsonData[i].attr2="";
    	            if (jsonData[i].children != undefined && jsonData[i].children.length > 0) {
    	                var jsdata = jsonData[i].children;
    	                
    	                //第二重循环
    	                for (var k = 0; k < jsdata.length; k++) {
    	                	jsdata[k].attr2="";
    	                    if (jsdata[k].children != undefined && jsdata[k].children.length > 0) {
    	                        var jdata = jsdata[k].children;
    	                        //第二重循环
    	                        for (var j = 0; j < jdata.length; j++) {
    	                        	jdata[j].attr2="";
    	                            if (jdata[j].children != undefined && jdata[j].children.length > 0) {

    	                            } else {
    	                                if (jdata[j].sT_C_CD in cccollect) {
    	                                    var a = jdata[j].sT_C_CD;
    	                                    jsonData[i].children[k].children[j].children = cccollect[a];
    	                                }
    	                            }
    	                        }
    	                    } else {
    	                        if (jsdata[k].sT_C_CD in cccollect) {
    	                            var a = jsdata[k].sT_C_CD;
    	                            jsonData[i].children[k].children = cccollect[a];
    	                        }
    	                    }
    	                }

    	            } else {
    	                if (jsonData[i].sT_C_CD in cccollect) {
    	                    var a = jsonData[i].sT_C_CD;
    	                    jsonData[i].children = cccollect[a];
    	                }
    	            }
    	        }
    	    }
    	    var treeConfig = {
    	        name: 'ulnav',
    	        method: 'post',
    	        parentField: "sT_P_CD",
    	        textFiled: "sT_C_NM",
    	        idFiled: "sT_C_CD",
    	        checkbox: true,
    	        data: jsonData,
    	        onClick: function (node) {
    	            if (ccId == "") {
    	                $.messager.alert('提示', '请先选择一个用户');
    	                return;
    	            }
    	        }
    	    }
    	    $('#ulnav').tree(treeConfig);
    	},
	gnCollect = [],//收集功能点
	qxCollect = [],//权限
	cccollect = {},
	ccId = "",//用户组id
	ccName = "",//用户组名称
	onClickNode = "",//当前选中的节点
    InitLeftMenu = function () {
        var reqData = {
            IFS: 'D000046'
        };
        reqTreeData('/iPlant_ajax', reqData);
    },
    savechild = function () {
        var noise = $('#ulnav').tree('getChecked', 'indeterminate');
        //获取所有选中的节点
        var nodes = $('#ulnav').tree('getChecked');
        if (nodes.length == 0) {
            return;
        }
        var arr = new Array();
        if (nodes.length > 0) {
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i].attr3 == "CCattr") {
                    arr.push({ GR_CD: ccId, FUN_CD: nodes[i].sT_C_CD, MN_CD: nodes[i].sT_P_CD, GR_ST: '1' });
                }
                else {
                    for (var c = 0; c < gnCollect.length; c++) {
                        if (nodes[i].sT_C_CD == gnCollect[c].MN_CD && gnCollect[c].FUN_LEVL == "2") {//用于功能等级字段区分   是父亲节点的查看 
                            arr.push({ GR_CD: ccId, FUN_CD: gnCollect[c].FUN_CD, MN_CD: gnCollect[c].MN_CD, GR_ST: '1' });
                            break;
                        }
                    }
                }
            }
        }

        //保存选中的父选项
        if (noise.length > 0) {
            for (var i = 0; i < noise.length; i++) {
                for (var c = 0; c < gnCollect.length; c++) {
                    if (noise[i].sT_C_CD == gnCollect[c].MN_CD && gnCollect[c].FUN_LEVL == "2") {//用于功能等级字段区分   是父亲节点的查看 
                        arr.push({ GR_CD: ccId, FUN_CD: gnCollect[c].FUN_CD, MN_CD: gnCollect[c].MN_CD, GR_ST: '1' });
                        break;
                    }
                }
            }
        }
        //实现整删整改功能   先删除  再先增
        var ajaxParam = {
            url: '/iPlant_ajax',
            dataType: 'JSON',
            data: {
                GR_CD: ccId,//用户组id
                IFS: 'D000035'
            },
            successCallBack: function (data) {
                //批量先增
                var ajaxParam1 = {
                    url: '/iPlant_ajax',
                    dataType: 'JSON',
                    data: {
                        list: arr,//[{GR_CD:1,FUN_CD:11,GR_ST：‘1’}，{GR_CD:2,FUN_CD:222,GR_ST：‘2’}]
                        IFS: 'D000034'
                    },
                    successCallBack: function (data) {
                        $.messager.alert('提示', '保存成功！');
                        return;
                    }
                };
                iplantAjaxRequest(ajaxParam1);
            }
        };
        iplantAjaxRequest(ajaxParam);
    }

    }
    rightManage.prototype = {
        init: function () {
            $(function () {
                InitYHXX();
            });
        }
    }
    var pCode = new rightManage();
    pCode.init();
})();
