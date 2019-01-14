(function () {
    function templet() {
      pageConfig={
          gridName:'templet_tab',
          treeName:'templetTree',
          title:'领料出库单',
      },
      initGridData=function(){
    	  selectTempletType();
    	  initLeftMenu();
    	  queryDataByCondition();
      },
      bindGridData = function (reqData,jsonData) {
    	  var grid = {
    		  name: pageConfig.gridName,
              dataType: 'json',
              singleSelect:true,
              columns:[[
                    { field: 'TEMPLET_ID', title: '模板编码', width: 220 ,align:'center'},
					{ field: 'TEMPLET_NAME', title: '模板名称', width: 180 ,align:'center'},
			   		{ field: 'TEMPLET_TYPE_NM', title: '模板类型', width: 180 ,align:'center'},
			   		{ field: 'ENABLE', title: '是否启用', width: 120 ,align:'center',formatter : function(value, row, index) {if (value == 'Y') {return '启用';} else {return '未启用';}}},
			   		{ field: 'CRT_DT', title: '创建时间', width: 220 ,align:'center'},
			   		{ field: 'CRT_NM', title: '创建人', width: 150 ,align:'center'},
			   		{ field: 'TEMPLET_TYPE', title: '模板类型', width: 0 ,align:'center',hidden:true},
			   		{ field: 'TEMPLET_PATH', title: '存储路径', width: 0 ,align:'center',hidden:true},
			   		{ field: 'CRT_ID', title: '制单人ID', width: 0 ,align:'center',hidden:true}
	            ]],
	            onDblClickRow: function(index,row){
	            	modifyData();
	            },
	            onClickRow: function(index,row){},
			    onClickCell : function (index,field,value) {}
    	  	}
        	initGridView(reqData,grid);
        	$('#'+pageConfig.gridName).datagrid('loadData', jsonData);
		},
		initLeftMenu = function () {//初始化模版类型树
		    var reqData = {IFS: "WD00000",USE_YN:"Y",DICT_CD:"WBILLTEMPLET"}
		    reqTreeData('/iPlant_ajax',reqData);
		},
		bindTreeData = function (jsonData) {//绑定模版树数据
			var treeData = treeDataFormat(jsonData);
			var treeConfig = {
		        name: pageConfig.treeName,
		        method: 'get',
		        parentField: "ST_P_CD",
		        textFiled: "ST_C_NM",
		        idFiled: "ST_C_CD",
                data: treeData,
		        onClick: function (node) {
		            if (node['ST_C_CD']) {
		            	var nodeId = node['ST_C_CD'],pNodeId = node['ST_P_CD'];
		            	var templetType = $("#templetType").combobox("select",nodeId);
		                var dgrid = $('#'+pageConfig.gridName).datagrid('options');
						if(!dgrid) return;
						if(pNodeId == "N/A"){
							nodeId = "";
						}
						var reqData = {
							qTempletType: nodeId,
							IFS: 'TP000001',
							pageIndex: dgrid.pageNumber,
							pageSize: dgrid.pageSize
						}
						reqGridData('/iPlant_ajax', pageConfig.gridName, reqData);
		            }
		        }
		    }
		    initTree(treeConfig);
		    $('#'+pageConfig.treeName).tree(treeConfig);
		},
		treeDataFormat = function(treeData){
			//ST_C_CD 树节点cd ST_C_NM 树节点名称  ST_P_CD 父节点cd 删除 所有 children,以防止多次调用
			treeData.forEach(function (item) {
	            delete item.children;
	        });
	        // 将数据存储为 以 id 为 KEY 的 map 索引数据列
	        var map = {};
	        treeData.forEach(function (item) {
	            map[item.ST_C_CD] = item;
	        });
	        console.log(map);
	        var val = [];
	        treeData.forEach(function (item) {
	            // 以当前遍历项，的pid,去map对象中找到索引的id
	            var parent = map[item.ST_P_CD];
	            // 好绕啊，如果找到索引，那么说明此项不在顶级当中,那么需要把此项新增到，他对应的父级中
	            if (parent) {
	                (parent.children || ( parent.children = [] )).push(item);
	            } else {
	                //如果没有在map中找到对应的索引ID,那么直接把 当前的item新增到 val结果集中，作为顶级
	                val.push(item);
	            }
	        });
	        return val;
		},
	    setDataNull = function () {
			opType="",
	    	$('#templetName').textbox('setValue',""),
	    	$('#templetType').combobox('setValue',""),
	    	$("#templetForm").form("clear");
	    	showMessage.html("");
	    	$('#templetDialog').dialog('close');
	    },
	    setQueryNull = function () {
	    	$('#qTempletName').textbox('setValue',""),
	    	$('#qTempletType').combobox('setValue',"N/A"),
	    	$('#qTempletBegin').datebox('setValue',""),
	    	$('#qTempletEnd').datebox('setValue',"");
	    },
	    queryDataByCondition = function(){
		    var dgrid=$('#'+pageConfig.gridName).datagrid('options');
		    if(!dgrid) return;
		    var qTempletType = $('#qTempletType').combobox('getValue'),qTempletName = $('#qTempletName').textbox('getValue'),qTempletBegin =$('#qTempletBegin').datebox('getValue'),qTempletEnd =$('#qTempletEnd').datebox('getValue');
		    if(qTempletType=="N/A"){qTempletType = "";}
		    var reqData ={
		    	qTempletName: qTempletName,
		    	qTempletType: qTempletType,
		    	qTempletBegin: qTempletBegin,
		    	qTempletEnd: qTempletEnd,
		        pageIndex:dgrid.pageNumber,
                pageSize:dgrid.pageSize,
		        IFS:'TP000001'
		    };
		    reqGridData('/iPlant_ajax',pageConfig.gridName,reqData);
		    $.messager.progress('close');
	    },
	    addDataTemplet = function(){
	    	var templetId = autoCreateCode("MOD");//获取到id
	    	opType="add";
			$("#templetDialog").dialog("open").dialog('setTitle', "模版新增");
			$('#enable').prop('checked', 'checked');
			$('#templetId').val(templetId);
	    },
	    modifyDataTemplet = function(){
			var checkedItems = $('#' + pageConfig.gridName).datagrid('getSelections'), num = 0;
			$.each(checkedItems, function (index, item) { num++;});
			if (num != 1) {
				commonShowMessage('请选择一条数据进行修改！');
				return false;
			}
			var row = $("#"+pageConfig.gridName).datagrid("getSelected");
	        if (row) {
	        	opType="modify";
	 			$("#templetDialog").dialog("open").dialog('setTitle', "模版修改");
	 			$('#templeId').val(row.TEMPLE_ID);
	 			$('#templetName').textbox("setValue",row.TEMPLE_NAME);
	 			$('#templetType').combobox("select",row.TEMPLE_TYPE);
	 			if ("Y" == row.ENABLE){
					$('#enable').prop('checked', 'checked');
				} else {
					$('#enable').prop('checked', '');
				}
	        }
	    },
	    editorDataTemplet = function(){
	    	console.log("模版编辑");
	    	var checkedItems = $('#' + pageConfig.gridName).datagrid('getSelections'), num = 0,templetId = "";
			$.each(checkedItems, function (index, item) { num++;});
			if (num != 1) {
				commonShowMessage('请选择一个模版进行编辑！');
				return false;
			}
			var row = $("#"+pageConfig.gridName).datagrid("getSelected");
	        if (row) {
	        	opType="editor";
	        	templetId = row.TEMPLET_ID;
	        	console.log(templetId);
				addTabIndex('模板设计', "/Warehouse/system/temple/report/DesignReport.html?templetId="+templetId);
	        }
	    },
	    formatDate = function(d){
	    	var str = "";
	    	if(checkNotEmpty(d)){ str = d.substring(0,10); }
	    	return str;
	    },
	    saveDataTemplet = function(){
	    	if (!checkDataValid()){
	    		showMessage.html("<font color=red>提示:请输入必填信息!</font>");
	            return false;
	         };
	         var IFServerNo ="",enable = '',reqData = {},susMsg = '', errorMsg = '',templetId = $("#templetId").val(),templetName = $("#templetName").textbox("getValue"),templetType = $("#templetType").combobox("getValue");
	         if ($('#enable').is(':checked')) { enable = "Y";}else { enable = "N";}
	         if(opType=="add"){
	        	 IFServerNo = "TP000002",susMsg = "新增模版成功！",errorMsg = "新增模版失败，请联系管理员！";
	         }else if(opType=="modify"){
	        	 IFServerNo = "TP000003",susMsg = "修改模版成功！",errorMsg = "修改模版失败，请联系管理员！";
	        	 reqData = {};
	         }
	         reqData = {IFS:IFServerNo,templetId:templetId,templetName:templetName,templetType:templetType,enable:enable};
        	 var ajaxParam = {
                 url: '/iPlant_ajax',
                 dataType: 'JSON',
                 data: reqData,
                 successCallBack:function(data){
                	 commonShowMessage(susMsg);
                	 initGridData();
                	 if(opType=="add"){
                		 addTabIndex('模板设计', "/Warehouse/system/temple/report/DesignNewReport.html?templetId="+templetId);
                	 }
                 },
                 errorCallBack:function(){
                	 commonShowMessage(errorMsg);
                 }   
        	 };
        	 iplantAjaxRequest(ajaxParam);
	    },
	    deleteDataTemplet = function(){
			var num = 0,IFServerNo='TP000004',dataGrid = $('#'+pageConfig.gridName),moveIds = [];
			var checkedItems = dataGrid.datagrid('getSelections');
			$.each(checkedItems, function(index, item) {
				moveIds.push(item.moveid);
				num++;
			});
			if(num != 1) {
				commonShowMessage('提示:请选择一条数据进行删除!');
				return false;
			}
			var row = dataGrid.datagrid("getSelected");
			if(row) {
				var delCnt=0;
	            $.messager.confirm('确认框', '您确定要删除您所选择的数据?', function (r) {
	            	 if(r==true){
	            		 $.each(checkedItems, function (index, item) {
	            			 delCnt++;
	                    	 var ajaxParam = {
                                 url: '/iPlant_ajax',
                                 dataType: 'JSON',
                                 data: {
                                	templetId:row.TEMPLET_ID,
                 					IFS: IFServerNo
                                 },
                                 successCallBack:function(data){
                                 	 if(delCnt==checkedItems.length){
                                 		commonShowMessage("删除成功!");
	                              	 	initGridData();
	                            	 }
                         		},
                         		errorCallBack:function(data){
                         			if(delCnt==checkedItems.length){
                         				commonShowMessage("删除失败,服务器无响应!");
                         			}
                         		}
	                          };
	                         iplantAjaxRequest(ajaxParam);
	                     });
	            	 }
	             });  
			}
		},
	    checkDataValid = function() {/*数据不能为空验证*/
	          var templetName = $('#templetName').textbox("getValue");
	          if (templetName == '') {  return false; }else{ return true;}
	    };
	    validSelectedData = function (gridName,type) {
            var checkedItems = $('#' + gridName).datagrid('getSelections'),num = 0;
            $.each(checkedItems, function (index, item) { num++;});
            if (type == 'modify') {
                if (num != 1) { return false;}
            } else {
                if (num <= 0) { return false;}
            }
            return true;
        },
        selectTempletType = function(){//初始化模版类型
	    	var reqStore = {
	            url: "/iPlant_ajax",
	            dataType: "JSON",
	            data: {IFS: "WMS_B00094",DICT_CD:"WBILLTEMPLET"},
	            successCallBack: function(a) {
	            	datatempletType = [],dataTemplet = [];
	            	datatempletType.push({"value":"N/A","text":"全部"});
	            	var op = a.RESPONSE[0].RESPONSE_DATA;
	                $.each(op,function(n,obj) {
	                	datatempletType.push({'value':obj.DICT_IT,'text':obj.DICT_IT_NM});
	                	dataTemplet.push({'value':obj.DICT_IT,'text':obj.DICT_IT_NM});
				    }); 
	                var qTempletType = $("#qTempletType"),templetType = $("#templetType");
	                qTempletType.combobox('loadData',datatempletType),
	                templetType.combobox('loadData',dataTemplet);
	                if(datatempletType.length>7){
	                	qTempletType.combobox({panelHeight:200});
					}else{
						qTempletType.combobox({panelHeight:'auto'});
					}
	                if(dataTemplet.length>7){
	                	templetType.combobox({panelHeight:200});
	                }else{
	                	templetType.combobox({panelHeight:'auto'});
	                }
	                if(datatempletType.length>0){
	                	qTempletType.combobox('select',datatempletType[0].value);
	                }
	                if(dataTemplet.length>0){
	                	templetType.combobox('select',dataTemplet[0].value);
	                }
	            },
	            errorCallBack: function() {
	            	commonShowMessage("提示：请联系管理员，查询失败！");
	            }
	        };
		    iplantAjaxRequest(reqStore);
		}
    }    
    templet.prototype = {
        init: function () {
            $(function () {
            	showMessage = $("#showMessage"),opType="";
            	initGridData();
            	$('#btnSearch').click(function(){ var dgrid=$('#'+pageConfig.gridName).datagrid('options'); dgrid.pageNumber = 1;queryDataByCondition();});
            	$('#btnReset').click(function(){ setQueryNull();});
            	$('#btnAdd').click(function(){ addDataTemplet();});
            	$('#btnUpdate').click(function(){ modifyDataTemplet();});
            	$('#btnEditor').click(function(){ editorDataTemplet();});
            	$('#btnDelete').click(function(){ deleteDataTemplet();});
            	$('.panel-tool-close').click(function(){ setDataNull();});
            });
        }
	}
    var t = new templet();
    t.init();
})();
