﻿(function () {
    /*递归加载树数据*/
    loadTree = function (data, idFiled, textFiled) {
        if (!data) return;
        var i, l, treeData = [], tmpMap = [];
        for (i = 0, l = data.length; i < l; i++) {
            data[i]['id'] = data[i][idFiled];
            data[i]['text'] = data[i][textFiled];
              data[i]['iconCls']=data[i]['attr2'];
            
//          data[i]['iconCls']='icon-company';
            if (data[i]['children']) {
                loadTree(data[i]['children'], idFiled, textFiled)
            }
        }
        return data;
    };
    //重写树控件值域、文本域绑定
    $.fn.tree.defaults.loadFilter = function (data, parent) {
        var opt = $(this).data().tree.options;
        var idFiled, textFiled, parentField;
        if (opt.parentField) {
            idFiled = opt.idFiled || 'id';
            textFiled = opt.textFiled || 'text';
            parentField = opt.parentField || 'pid';
            var i, l, treeData = [], tmpMap = [];
            loadTree(data, idFiled, textFiled);
        }
        return data
    };
    $.fn.combotree.defaults.loadFilter = function (data, parent) {
        var opt = $(this).data().tree.options;
        var idFiled,
	    textFiled,
	    parentField;

        if (opt.parentField) {
            idFiled = opt.idFiled || 'id';
            textFiled = opt.textFiled || 'text';
            parentField = opt.parentField || 'pid';
            var i, l, treeData = [], tmpMap = [];
            loadTree(data, idFiled, textFiled);
        }
        return data
    };
    /*重写树表格控件值域、文本域绑定*/
    $.fn.treegrid.defaults.loadFilter = function (data, parent) {
    	var opt = $(this).data().treegrid.options;
        var idFiled, textFiled,parentField;
        if (opt.parentField) {
            idFiled = opt.idFiled || 'id';
            textFiled = opt.textFiled || 'text';
            parentField = opt.parentField || 'pid';
            var i, l, treeData = [], tmpMap = [];
            loadTree(data, idFiled, textFiled);
        }
        return data
    };
    
    /*必填项空值验证*/
   checkForm=function() {
		pass = true; 
		$("input[required]").each(function(){
			if((this.value == '')&&($(this).combobox('getText')=='')) { 
				text = $(this).parent().prev().text(); 
				$.messager.alert('提示',text+"必填项不能为空"); 
				this.focus(); 
				pass = false; 
				return false;//跳出each 
			} 
		}); 
		return pass; 
	} 
    /*请求树数据并绑定到树控件*/
    reqTreeData = function (url, reqData) {
        var ajaxParam = {
            url: url,
            data: reqData,
            successCallBack: function (data) {
                var rowCollection = createSourceObj(data);
                var jsonData = rowCollection;
                bindTreeData(jsonData);
            }
        }
        iplantAjaxRequest(ajaxParam);
    };
    /*请求下拉框树数据并绑定到树控件*/
    reqComboTreeData = function (url, reqData) {
        var ajaxParam = {
            url: url,
            data: reqData,
            successCallBack: function (data) {
                var rowCollection = createSourceObj(data);
                var jsonData = rowCollection;
                bindCombotree(jsonData);
            }
        }
        iplantAjaxRequest(ajaxParam);
    };
    /*初始化树控件*/
    initComboTree = function (tree) {
        if (!tree) retrun;
        $('#' + tree.name).combotree({
            method: tree.method,
            parentField: tree.parentField || "pid",
            textFiled: tree.parentField || "text",
            idFiled: tree.idFiled || "id",
            onClick: tree.onClick
        });
    };

    /*初始化树控件*/
    initTree = function (tree) {
        if (!tree) retrun;
        $('#' + tree.name).tree({
            method: tree.method,
            parentField: tree.parentField || "pid",
            textFiled: tree.parentField || "text",
            idFiled: tree.idFiled || "id",
            onClick: tree.onClick
        });
    };
    /** 初始化树表格控件 **/
    initTreeGrid = function(reqData, grid){
    	var ccArray = [];
      	var cc = initHeight();
      	ccArray.push(cc);
    	$('#'+grid.name).treegrid({
	    	 title: grid.title,
    		 url:grid.url,
             dataType: grid.dataType,
             idField: grid.idField, 
             parentField: grid.parentField, 
             textFiled: grid.textFiled ,
             treeField:grid.treeField,
             state:grid.state,
             pagination: grid.pagination,
             pageSize: grid.pageSize||3,
             pageList: grid.pageList||[3,10,15],
             striped:true,
             fit:true,
             loadFilter: grid.loadFilter || treePagerFilter,
//             singleSelect:true,
             columns: grid.columns,
             rownumbers: grid.rownumbers,
             loadMsg: '数据加载中...',
//             loadFilter: function (data){  
////               resultData = data;  
////               if(data.length>0){  
////                   data.rows = data.data;  
//                                  
////                   data.total = data.more;  
//                   return data;  
////               }else{  
//////                   return ajaxResultJudge.transformToUI(null);  
////               }  
////               return data;  
//           }, 
             onClickRow: grid.onClickRow || function (row) { //单击行事件  
 	             //---------for TEST 结合SHIFT,CTRL,ALT键实现单选或多选------------  
// 	             if(index != selectIndexs.firstSelectRowIndex && !inputFlags.isShiftDown ){    
// 	                 selectIndexs.firstSelectRowIndex = index; //alert('firstSelectRowIndex, sfhit = ' + index);  
// 	             }             
// 	             if(inputFlags.isShiftDown ) {  
// 	                 $('#'+tbId).datagrid('clearSelections');  
// 	                 selectIndexs.lastSelectRowIndex = index;  
// 	                 var tempIndex = 0;  
// 	                 if(selectIndexs.firstSelectRowIndex > selectIndexs.lastSelectRowIndex ){  
// 	                     tempIndex = selectIndexs.firstSelectRowIndex;  
// 	                     selectIndexs.firstSelectRowIndex = selectIndexs.lastSelectRowIndex;  
// 	                     selectIndexs.lastSelectRowIndex = tempIndex;  
// 	                 }  
// 	                 for(var i = selectIndexs.firstSelectRowIndex ; i <= selectIndexs.lastSelectRowIndex ; i++){  
// 	                     $('#'+tbId).treegrid('selectRow', i);     
// 	                 }     
// 	             } 
             },
             onDblClickRow: grid.onDblClickRow || function (row) {

             },
             /**结束编辑模式的操作*/
 		     onEndEdit:grid.onEndEdit ||function(row){
 		     },
 		     /**进入编辑模式的操作*/
 		     onBeforeEdit:grid.onBeforeEdit ||function(row){
 		     },
 		     /**编辑模式进入之后的操作*/
 		     onAfterEdit:grid.onAfterEdit ||function(row){
 		     },
 	        onCancelEdit:grid.onCancelEdit ||function(row){
// 	            row.editing = false;
// 	            $(this).treegrid('refreshRow', index);
 	        }

         });
//         $('#' + grid.name).treegrid({ loadFilter: treePagerFilter });
    	
    };
    /*分页*/
    treePagerFilter2 = function (data) {
       	var isAddRow=false;
    	var addData=data;
    	var returnData=data;
    	for(var i=0; i<data.length; i++){
    	    if(data[i].editType)
    	    {
    	    	isAddRow=true;
    	    	break;
    	    }
    	}
    	if ($.isArray(data)){    // is array  
            data = {  
                total: data.length,  
                rows: data  
            }  
        }
        var dg = $(this);  
        var state = dg.data('treegrid');
        var opts = dg.treegrid('options');  
        var pager = dg.treegrid('getPager');  
        pager.pagination({
        	showPageList:false,
            onSelectPage: function (pageNum, pageSize) {
                opts.pageNumber = pageNum;
                opts.pageSize = pageSize;
                var reqData = {
                    IFS: data.IFS,
                    pageIndex: pageNum,
                    pageSize: pageSize
                }
//                for(var p in data){
//                	var name=p;//属性名称 
//                	if(name=="pageIndex" || name =="pageSize" || name=="rows" || name=="total" ||name=="originalRows"){
//                		continue;
//                	}
//                	var value=data[p];//属性对应的值 
//                	reqData[name]=data[p]; 
//                }
                reqTreeGridData('/iPlant_ajax', data.gridId, reqData);
            },
            onRefresh: function (pageNumber, pageSize) {
                opts.pageNumber = 1;
                var reqData = {
                    IFS: data.IFS,
                    pageIndex: 1,
                    pageSize: pageSize
                }
                reqTreeGridData('/iPlant_ajax', data.gridId, reqData);
            }
        });  
        if (!data.topRows){  
            data.topRows = [];
            data.childRows = [];
            for(var i=0; i<data.rows.length; i++){
                var row = data.rows[i];
                row._parentId ? data.childRows.push(row) : data.topRows.push(row);
            }
            data.total = (data.topRows.length);
        }  
        var start = (opts.pageNumber-1)*parseInt(opts.pageSize);  
        var end = start + parseInt(opts.pageSize);  
        data.rows = $.extend(true,[],data.topRows.slice(start, end).concat(data.childRows));
        if(isAddRow==true){
        	returnData=addData;
        }
        return returnData;
    };
    /*树表格分页*/
    treePagerFilter = function(data){
    	var isAddRow=false;
    	var addData=data;
    	var returnData=data;
    	for(var i=0; i<data.length; i++){
    	    if(data[i].editType)
    	    {
    	    	isAddRow=true;
    	    	break;
    	    }
    	}
    	if ($.isArray(data)){    // is array  
            data = {  
                total: data.length,  
                rows: data  
            }  
        }
        var dg = $(this);  
        var state = dg.data('treegrid');
        var opts = dg.treegrid('options');  
        var pager = dg.treegrid('getPager');  
        pager.pagination({
            onSelectPage: function (pageNum, pageSize) {
                opts.pageNumber = pageNum;
                opts.pageSize = pageSize;
                dg.pageSize = pageSize;
                var reqData = {
                    IFS: data.IFS,
                    pageIndex: pageNum,
                    pageSize: pageSize
                }
//                for(var p in data){
//                	var name=p;//属性名称 
//                	if(name=="pageIndex" || name =="pageSize" || name=="rows" || name=="total" ||name=="originalRows"){
//                		continue;
//                	}
//                	var value=data[p];//属性对应的值 
//                	reqData[name]=data[p]; 
//                }
                reqTreeGridData('/iPlant_ajax', data.gridId, reqData);
            },
            onRefresh: function (pageNumber, pageSize) {
                opts.pageNumber = 1;
                var reqData = {
                    IFS: data.IFS,
                    pageIndex: 1,
                    pageSize: pageSize
                }
                reqTreeGridData('/iPlant_ajax', data.gridId, reqData);
            }
        });  
        if (!data.topRows){  
            data.topRows = [];
            data.childRows = [];
            for(var i=0; i<data.rows.length; i++){
                var row = data.rows[i];
                row._parentId ? data.childRows.push(row) : data.topRows.push(row);
            }
            data.total = (data.topRows.length);
        }  
        var start = (opts.pageNumber-1)*parseInt(opts.pageSize);  
        var end = start + parseInt(opts.pageSize);  
        data.rows = $.extend(true,[],data.topRows.slice(start, end).concat(data.childRows));
        if(isAddRow==true){
        	returnData=addData;
        }
        return returnData;
    }

    /*请求树表格数据并绑定到树表格控件*/
    reqTreeGridData = function (url,gridId,reqData) {
    	if(tbId==""){
    		tbId=gridId;
    	}
    	if("pageSize" in reqData){
    		 //存在
    		reqData.pageSize=initHeight();
    	}
        var ajaxParam = {
            url: url,
            data: reqData,
            successCallBack: function (data) {
                if (data) {
                    
                    if(data.RESPONSE.length>0){
                    	var rowNum = 0
                    	
                        if(!data.RESPONSE["0"].RESPONSE_HDR) rowNum=0;
                        else if (data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS) {
                            rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
                        }
                    }
                    $('#' + btnConfig.btnDeleteId).linkbutton('enable');
                    $('#' + btnConfig.btnUpdateId).linkbutton('enable');
                    if (rowNum == 0) {
                       	if(data.RESPONSE["0"].RESPONSE_HDR.MSG_CODE==='SESSION过期或是不存在'){
                    		$.messager.confirm('确认框', '长时间未操作，请重新登陆', function (r) {
								if(r==true){
                     	   			window.top.location.href="/iTaurus/Login.html";
                     	  		}
								return false;
							})
                     	}else{
                     		//$.messager.alert('提示', '没有相关记录');
                     	}
                        
                        $('#' + btnConfig.btnDeleteId).linkbutton('disable');
                        $('#' + btnConfig.btnUpdateId).linkbutton('disable');
                    }
                    var rowCollection = createSourceObj(data);
                    var jsonData = {
                        total: rowNum,
                        rows: rowCollection,
                        IFS: reqData.IFS,
                        gridId: gridId
                    }
                    $.each(jsonData.rows, function(i) {
                          var parentId = jsonData.rows[i].ST_P_CD;  
                          if(parentId != "N/A"){  
                        	  jsonData.rows[i]._parentId = parentId;  
                          }  
                      });
                    for(var p in reqData){
                    	var name=p;//属性名称 
                    	if(name=="pageIndex" || name =="pageSize" || name=="rows" || name=="total" ||name=="originalRows"){
                    		continue;
                    	}
                    	var value=reqData[p];//属性对应的值 
                    	jsonData[name]=reqData[p]; 
                    }
                    bindTreeGridData(reqData, jsonData);
                }
            }
        }
        iplantAjaxRequest(ajaxParam);
    };

    /*分页*/
    pagerFilter = function (data) {
        var dg = $('#' + data.gridId);
        var opts = dg.datagrid('options');
        var pager = dg.datagrid('getPager');
        pager.pagination({
        	showPageList:false,
        	showRefresh:false,
            onSelectPage: function (pageNum, pageSize) {
                opts.pageNumber = pageNum;
                opts.pageSize = pageSize;
                dg.pageSize = pageSize;
                var reqData = {
                    IFS: data.IFS,
                    pageIndex: pageNum,
                    pageSize: pageSize
                }
                for(var p in data){
                	var name=p;//属性名称 
                	if(name=="pageIndex" || name =="pageSize" || name=="rows" || name=="total" ||name=="originalRows"){
                		continue;
                	}
                	var value=data[p];//属性对应的值 
                	reqData[name]=data[p]; 
                }
                reqGridData('/iPlant_ajax', data.gridId, reqData);
            },
            onRefresh: function (pageNumber, pageSize) {
                opts.pageNumber = 1;
                var reqData = {
                    IFS: data.IFS,
                    pageIndex: 1,
                    pageSize: pageSize
                }
                reqGridData('/iPlant_ajax', data.gridId, reqData);
            }
        });
        if (!data.originalRows) {
            data.originalRows = (data.rows);
        }
        var start = 0;
        var end = start + parseInt(opts.pageSize);
        data.rows = (data.originalRows.slice(start, end));
        return data;
    };
    /*分页*/
    dialogPagerFilter = function (data) {
        var dg = $('#' + data.gridId);
        var opts = dg.datagrid('options');
        var pager = dg.datagrid('getPager');
        pager.pagination({
        	showPageList:false,
        	showRefresh:false,
            onSelectPage: function (pageNum, pageSize) {
                opts.pageNumber = pageNum;
                opts.pageSize = pageSize;
                dg.pageSize = pageSize;
                var reqData = {
                    IFS: data.IFS,
                    pageIndex: pageNum,
                    pageSize: pageSize
                }
                for(var p in data){
                	var name=p;//属性名称 
                	if(name=="pageIndex" || name =="pageSize" || name=="rows" || name=="total" ||name=="originalRows"){
                		continue;
                	}
                	var value=data[p];//属性对应的值 
                	reqData[name]=data[p]; 
                }
                dialogDataGrid('/iPlant_ajax', data.gridId, reqData);
            },
            onRefresh: function (pageNumber, pageSize) {
                opts.pageNumber = 1;
                var reqData = {
                    IFS: data.IFS,
                    pageIndex: 1,
                    pageSize: pageSize
                }
                dialogDataGrid('/iPlant_ajax', data.gridId, reqData);
            }
        });
        if (!data.originalRows) {
            data.originalRows = (data.rows);
        }
        var start = 0;
        var end = start + parseInt(opts.pageSize);
        data.rows = (data.originalRows.slice(start, end));
        return data;
    };
    /*分页*/
    dialogPagerFilter1 = function (data) {
    	var dg = $('#' + data.gridId);
    	var opts = dg.datagrid('options');
    	var pager = dg.datagrid('getPager');
    	pager.pagination({
    		showPageList:false,
    		showRefresh:false,
    		onSelectPage: function (pageNum, pageSize) {
    			opts.pageNumber = pageNum;
    			opts.pageSize = pageSize;
    			dg.pageSize = pageSize;
    			var reqData = {
    					IFS: data.IFS,
    					pageIndex: pageNum,
    					pageSize: pageSize
    			}
    			for(var p in data){
    				var name=p;//属性名称 
    				if(name=="pageIndex" || name =="pageSize" || name=="rows" || name=="total" ||name=="originalRows"){
    					continue;
    				}
    				var value=data[p];//属性对应的值 
    				reqData[name]=data[p]; 
    			}
    			dialogDataGrid1('/iPlant_ajax', data.gridId, reqData);
    		},
    		onRefresh: function (pageNumber, pageSize) {
    			opts.pageNumber = 1;
    			var reqData = {
    					IFS: data.IFS,
    					pageIndex: 1,
    					pageSize: pageSize
    			}
    			dialogDataGrid1('/iPlant_ajax', data.gridId, reqData);
    		}
    	});
    	if (!data.originalRows) {
    		data.originalRows = (data.rows);
    	}
    	var start = 0;
    	var end = start + parseInt(opts.pageSize);
    	data.rows = (data.originalRows.slice(start, end));
    	return data;
    };
    /*请求列表数据并绑定到列表控件，并解析后台返回Json格式*/
    reqGridData = function (url, gridId, reqData) {
    	if(tbId==""){
    		tbId=gridId;
    	}
    	if("pageSize" in reqData){
    		if(gridId=='Product_tab'){
    		}else{
    			//存在
    			reqData.pageSize=initHeight();
    		}
    	}
        var ajaxParam = {
            url: url,
            data: reqData,
            successCallBack: function (data) {
                if (data) {
                    if(data.RESPONSE.length>0){
                    	var rowNum = 0
                        if(!data.RESPONSE["0"].RESPONSE_HDR) rowNum=0;
                        else if (data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS) {
                            rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
                        }
                    }
                    $('#' + btnConfig.btnDeleteId).linkbutton('enable');
                    $('#' + btnConfig.btnUpdateId).linkbutton('enable');
                    if (rowNum == 0) {
                       	if(data.RESPONSE["0"].RESPONSE_HDR.MSG_CODE==='SESSION过期或是不存在'){
                    		$.messager.confirm('确认框', '长时间未操作，请重新登陆', function (r) {
								if(r==true){
                     	   			window.top.location.href="/iTaurus/Login.html";
                     	  		}
								return false;
							})
                     	}else{
                     		//$.messager.alert('提示', '没有相关记录');
                     	}
                        
                        $('#' + btnConfig.btnDeleteId).linkbutton('disable');
                        $('#' + btnConfig.btnUpdateId).linkbutton('disable');
                    }
                    var rowCollection = createSourceObj(data);
                    var jsonData = {
                        total: rowNum,
                        rows: rowCollection,
                        IFS: reqData.IFS,
                        gridId: gridId
                    }
                    for(var p in reqData){
                    	var name=p;//属性名称 
                    	if(name=="pageIndex" || name =="pageSize" || name=="rows" || name=="total" ||name=="originalRows"){
                    		continue;
                    	}
                    	var value=reqData[p];//属性对应的值 
                    	jsonData[name]=reqData[p]; 
                    }
                    bindGridData(reqData, jsonData);
                }
            }
        }
        iplantAjaxRequest(ajaxParam);
    };
    
    /*请求列表数据并绑定到列表控件，并解析后台返回Json格式*/
    myDataGrid = function (url, gridId, reqData ,bindGridData) {
    	if(tbId==""){
    		tbId=gridId;
    	}
    	if("pageSize" in reqData){
	   		 //存在
	   		reqData.pageSize=initHeight();
	   	}
        var ajaxParam = {
            url: url,
            data: reqData,
            successCallBack: function (data) {
                if (data) {
                    if(data.RESPONSE.length>0){
                    	var rowNum = 0
                        if(!data.RESPONSE["0"].RESPONSE_HDR) rowNum=0;
                        else if (data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS) {
                            rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
                        }
                    }
                    if (rowNum == 0) {
                       	if(data.RESPONSE["0"].RESPONSE_HDR.MSG_CODE==='SESSION过期或是不存在'){
                    		$.messager.confirm('确认框', '长时间未操作，请重新登陆', function (r) {
								if(r==true){
                     	   			window.top.location.href="/iTaurus/Login.html";
                     	  		}
								return false;
							})
                     	}
                    }
                    var rowCollection = createSourceObj(data);
                    var jsonData = {
                        total: rowNum,
                        rows: rowCollection,
                        IFS: reqData.IFS,
                        gridId: gridId,
                        callBack:bindGridData
                    };
                    for(var p in reqData){
                    	var name=p;//属性名称 
                    	if(name=="pageIndex" || name =="pageSize" || name=="rows" || name=="total" ||name=="originalRows"){
                    		continue;
                    	}
                    	var value=reqData[p];//属性对应的值 
                    	jsonData[name]=reqData[p]; 
                    };
                    bindGridData(gridId,reqData, jsonData);
                }
            }
        }
        iplantAjaxRequest(ajaxParam);
    };
    
    /*请求列表数据并绑定到列表控件，并解析后台返回Json格式*/
    dialogDataGrid = function (url, gridId, reqData) {
    	if(tbId==""){
    		tbId=gridId;
    	}
    	if("pageSize" in reqData){
	   		 //存在
	   		reqData.pageSize=initHeight();
	   	}
        var ajaxParam = {
            url: url,
            data: reqData,
            successCallBack: function (data) {
                if (data) {
                    if(data.RESPONSE.length>0){
                    	var rowNum = 0
                        if(!data.RESPONSE["0"].RESPONSE_HDR) rowNum=0;
                        else if (data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS) {
                            rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
                        }
                    }
                    if (rowNum == 0) {
                       	if(data.RESPONSE["0"].RESPONSE_HDR.MSG_CODE==='SESSION过期或是不存在'){
                    		$.messager.confirm('确认框', '长时间未操作，请重新登陆', function (r) {
								if(r==true){
                     	   			window.top.location.href="/iTaurus/Login.html";
                     	  		}
								return false;
							})
                     	}
                    }
                    var rowCollection = createSourceObj(data);
                    var jsonData = {
                        total: rowNum,
                        rows: rowCollection,
                        IFS: reqData.IFS,
                        gridId: gridId
                    }
                    for(var p in reqData){
                    	var name=p;//属性名称 
                    	if(name=="pageIndex" || name =="pageSize" || name=="rows" || name=="total" ||name=="originalRows"){
                    		continue;
                    	}
                    	var value=reqData[p];//属性对应的值 
                    	jsonData[name]=reqData[p]; 
                    }
                    dialogEditorDataGrid(gridId,reqData, jsonData);
                }
            }
        }
        iplantAjaxRequest(ajaxParam);
    };
    
    
    
 dialogDataGrid1 = function (url, gridId, reqData) {
    	if(tbId==""){
    		tbId=gridId;
    	}
        var ajaxParam = {
            url: url,
            data: reqData,
            successCallBack: function (data) {
                if (data) {
                    if(data.RESPONSE.length>0){
                    	var rowNum = 0
                        if(!data.RESPONSE["0"].RESPONSE_HDR) rowNum=0;
                        else if (data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS) {
                            rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
                        }
                    }
                    if (rowNum == 0) {
                       	if(data.RESPONSE["0"].RESPONSE_HDR.MSG_CODE==='SESSION过期或是不存在'){
                    		$.messager.confirm('确认框', '长时间未操作，请重新登陆', function (r) {
								if(r==true){
                     	   			window.top.location.href="/Gospell/Login.html";
                     	  		}
								return false;
							})
                     	}
                    }
                    var rowCollection = createSourceObj(data);
                    var jsonData = {
                        total: rowNum,
                        rows: rowCollection,
                        IFS: reqData.IFS,
                        gridId: gridId
                    }
                    for(var p in reqData){
                    	var name=p;//属性名称 
                    	if(name=="pageIndex" || name =="pageSize" || name=="rows" || name=="total" ||name=="originalRows"){
                    		continue;
                    	}
                    	var value=reqData[p];//属性对应的值 
                    	jsonData[name]=reqData[p]; 
                    }
                    dialogEditorDataGrid1(reqData, jsonData);
                }
            }
        }
        iplantAjaxRequest(ajaxParam);
    };
    
    
    
    /**
     * 弹出框分页
     * @param reqData
     * @param grid
     */
    initEditorDataGridView1 = function (reqData, grid) {
    	var ccArray = [];
      	var cc = reqData.pageSize;
      	if(cc==0){
      		cc= initHeight();
      	}
      	ccArray.push(cc);
        if (!grid) return
        var isSingleSelect=true;
        if(!grid.singleSelect && grid.singleSelect==false){isSingleSelect=false;}
        $('#' + grid.name).datagrid({
            title: grid.title,
            dataType: grid.dataType,
            pagination: grid.pagination || true,
            pageSize: cc,
            pageList: ccArray,
            fit:true,
            striped:true,
            singleSelect:isSingleSelect,
            columns: grid.columns,
            rownumbers: grid.rownumbers,
            loadMsg: '数据加载中...',
            onClickRow: grid.onClickRow || function (index, row) { //单击行事件  
	             //---------for TEST 结合SHIFT,CTRL,ALT键实现单选或多选------------  
	             if(index != selectIndexs.firstSelectRowIndex && !inputFlags.isShiftDown ){    
	                 selectIndexs.firstSelectRowIndex = index; //alert('firstSelectRowIndex, sfhit = ' + index);  
	             }             
	             if(inputFlags.isShiftDown ) {  
	                 $('#'+tbId).datagrid('clearSelections');  
	                 selectIndexs.lastSelectRowIndex = index;  
	                 var tempIndex = 0;  
	                 if(selectIndexs.firstSelectRowIndex > selectIndexs.lastSelectRowIndex ){  
	                     tempIndex = selectIndexs.firstSelectRowIndex;  
	                     selectIndexs.firstSelectRowIndex = selectIndexs.lastSelectRowIndex;  
	                     selectIndexs.lastSelectRowIndex = tempIndex;  
	                 }  
	                 for(var i = selectIndexs.firstSelectRowIndex ; i <= selectIndexs.lastSelectRowIndex ; i++){  
	                     $('#'+tbId).datagrid('selectRow', i);     
	                 }     
	             } 
            },
            onDblClickRow: grid.onDblClickRow || function (index, row) {

            },
            onClickCell: grid.onClickCell || function (index, row) {

            },
            /**结束编辑模式的操作*/
		     onEndEdit:grid.onEndEdit ||function(index,row){
		     },
		     /**进入编辑模式的操作*/
		     onBeforeEdit:grid.onBeforeEdit ||function(index,row){
		     },
		     /**编辑模式进入之后的操作*/
		     onAfterEdit:grid.onAfterEdit ||function(index,row){
		     },
	        onCancelEdit:grid.onCancelEdit ||function(index,row){
	            row.editing = false;
	            $(this).datagrid('refreshRow', index);
	        }
        });
        $('#' + grid.name).datagrid({ loadFilter: dialogPagerFilter1 });
    };
    
    

    
    initEditorDataGridView = function (reqData, grid) {
    	var ccArray = [];
      	var cc = initHeight();
      	ccArray.push(cc);
        if (!grid) return
        $('#' + grid.name).datagrid({
            title: grid.title,
            dataType: grid.dataType,
            pagination: grid.pagination || true,
            pageSize: cc,
            pageList: ccArray,
            fit:true,
            striped:true,
            singleSelect:false,
            columns: grid.columns,
            rownumbers: grid.rownumbers,
            loadMsg: '数据加载中...',
            onClickRow: grid.onClickRow || function (index, row) { //单击行事件  
	             //---------for TEST 结合SHIFT,CTRL,ALT键实现单选或多选------------  
	             if(index != selectIndexs.firstSelectRowIndex && !inputFlags.isShiftDown ){    
	                 selectIndexs.firstSelectRowIndex = index; //alert('firstSelectRowIndex, sfhit = ' + index);  
	             }             
	             if(inputFlags.isShiftDown ) {  
	                 $('#'+tbId).datagrid('clearSelections');  
	                 selectIndexs.lastSelectRowIndex = index;  
	                 var tempIndex = 0;  
	                 if(selectIndexs.firstSelectRowIndex > selectIndexs.lastSelectRowIndex ){  
	                     tempIndex = selectIndexs.firstSelectRowIndex;  
	                     selectIndexs.firstSelectRowIndex = selectIndexs.lastSelectRowIndex;  
	                     selectIndexs.lastSelectRowIndex = tempIndex;  
	                 }  
	                 for(var i = selectIndexs.firstSelectRowIndex ; i <= selectIndexs.lastSelectRowIndex ; i++){  
	                     $('#'+tbId).datagrid('selectRow', i);     
	                 }     
	             } 
            },
            onDblClickRow: grid.onDblClickRow || function (index, row) {

            },
            onClickCell: grid.onClickCell || function (index, row) {

            },
            /**结束编辑模式的操作*/
		     onEndEdit:grid.onEndEdit ||function(index,row){
		     },
		     /**进入编辑模式的操作*/
		     onBeforeEdit:grid.onBeforeEdit ||function(index,row){
		     },
		     /**编辑模式进入之后的操作*/
		     onAfterEdit:grid.onAfterEdit ||function(index,row){
		     },
	        onCancelEdit:grid.onCancelEdit ||function(index,row){
	            row.editing = false;
	            $(this).datagrid('refreshRow', index);
	        }
        });
        $('#' + grid.name).datagrid({ loadFilter: dialogPagerFilter });
    };
    /*获取高度*/
    initHeight = function () {
      	var ccheight= document.body.clientHeight-120;
      	var ipg = parseInt(ccheight/25);
      	return ipg;
    }
    /*初始化列表控件*/
    initGridView = function (reqData, grid) {
    	var ccArray = [];
      	var cc = initHeight();
      	if(grid.name=='Product_tab'){
      		cc = '10';
      	}
      	ccArray.push(cc);
        if (!grid) return
        var isSingleSelect=true;
        if(!grid.singleSelect && grid.singleSelect==false){isSingleSelect=false;}
        $('#' + grid.name).datagrid({
            title: grid.title,
            dataType: grid.dataType,
            pagination: grid.pagination || true,
            pageSize: cc,
            pageList: ccArray,
            fit:true,
            striped:true,
            singleSelect:isSingleSelect,
            columns: grid.columns,
            rownumbers: grid.rownumbers,
            loadMsg: '数据加载中...',
            onClickRow: grid.onClickRow || function (index, row) { //单击行事件  
	             //---------for TEST 结合SHIFT,CTRL,ALT键实现单选或多选------------  
	             if(index != selectIndexs.firstSelectRowIndex && !inputFlags.isShiftDown ){    
	                 selectIndexs.firstSelectRowIndex = index; //alert('firstSelectRowIndex, sfhit = ' + index);  
	             }             
	             if(inputFlags.isShiftDown ) {  
	                 $('#'+tbId).datagrid('clearSelections');  
	                 selectIndexs.lastSelectRowIndex = index;  
	                 var tempIndex = 0;  
	                 if(selectIndexs.firstSelectRowIndex > selectIndexs.lastSelectRowIndex ){  
	                     tempIndex = selectIndexs.firstSelectRowIndex;  
	                     selectIndexs.firstSelectRowIndex = selectIndexs.lastSelectRowIndex;  
	                     selectIndexs.lastSelectRowIndex = tempIndex;  
	                 }  
	                 for(var i = selectIndexs.firstSelectRowIndex ; i <= selectIndexs.lastSelectRowIndex ; i++){  
	                     $('#'+tbId).datagrid('selectRow', i);     
	                 }     
	             } 
            },
            onClickCell: grid.onClickCell || function (index, row) {

            },
            onDblClickRow: grid.onDblClickRow || function (index, row) {

            },
            /**结束编辑模式的操作*/
		     onEndEdit:grid.onEndEdit ||function(index,row){
		     },
		     /**进入编辑模式的操作*/
		     onBeforeEdit:grid.onBeforeEdit ||function(index,row){
		     },
		     /**编辑模式进入之后的操作*/
		     onAfterEdit:grid.onAfterEdit ||function(index,row){
		     },
	        onCancelEdit:grid.onCancelEdit ||function(index,row){
	            row.editing = false;
	            $(this).datagrid('refreshRow', index);
	        }
        });
        $('#' + grid.name).datagrid({ loadFilter: pagerFilter });
    };
    /*初始化列表控件*/
    initGridViewNoPage = function (reqData, grid) {
    	var ccArray = [];
      	var cc = initHeight();
      	if(grid.name=='Product_tab'){
      		cc = '10';
      	}
      	ccArray.push(cc);
        if (!grid) return
        var isSingleSelect=true;
        if(!grid.singleSelect && grid.singleSelect==false){isSingleSelect=false;}
        $('#' + grid.name).datagrid({
            title: grid.title,
            dataType: grid.dataType,
            pagination: false,
            //pageSize: cc,
            pageList: ccArray,
            fit:true,
            striped:true,
            singleSelect:isSingleSelect,
            columns: grid.columns,
            rownumbers: grid.rownumbers,
            loadMsg: '数据加载中...',
            onClickRow: grid.onClickRow || function (index, row) { //单击行事件  
	             //---------for TEST 结合SHIFT,CTRL,ALT键实现单选或多选------------  
	             if(index != selectIndexs.firstSelectRowIndex && !inputFlags.isShiftDown ){    
	                 selectIndexs.firstSelectRowIndex = index; //alert('firstSelectRowIndex, sfhit = ' + index);  
	             }             
	             if(inputFlags.isShiftDown ) {  
	                 $('#'+tbId).datagrid('clearSelections');  
	                 selectIndexs.lastSelectRowIndex = index;  
	                 var tempIndex = 0;  
	                 if(selectIndexs.firstSelectRowIndex > selectIndexs.lastSelectRowIndex ){  
	                     tempIndex = selectIndexs.firstSelectRowIndex;  
	                     selectIndexs.firstSelectRowIndex = selectIndexs.lastSelectRowIndex;  
	                     selectIndexs.lastSelectRowIndex = tempIndex;  
	                 }  
	                 for(var i = selectIndexs.firstSelectRowIndex ; i <= selectIndexs.lastSelectRowIndex ; i++){  
	                     $('#'+tbId).datagrid('selectRow', i);     
	                 }     
	             } 
            },
            onClickCell: grid.onClickCell || function (index, row) {

            },
            onDblClickRow: grid.onDblClickRow || function (index, row) {

            },
            /**结束编辑模式的操作*/
		     onEndEdit:grid.onEndEdit ||function(index,row){
		     },
		     /**进入编辑模式的操作*/
		     onBeforeEdit:grid.onBeforeEdit ||function(index,row){
		     },
		     /**编辑模式进入之后的操作*/
		     onAfterEdit:grid.onAfterEdit ||function(index,row){
		     },
	        onCancelEdit:grid.onCancelEdit ||function(index,row){
	            row.editing = false;
	            $(this).datagrid('refreshRow', index);
	        }
        });
        $('#' + grid.name).datagrid({ loadFilter: pagerFilter });
    };
    /*初始化列表控件*/
    initGridMultiView = function (reqData, grid) {
    	var ccArray = [];
      	var cc = initHeight();
      	ccArray.push(cc);
        if (!grid) return
        $('#' + grid.name).datagrid({
            title: grid.title,
            dataType: grid.dataType,
            pagination: grid.pagination || true,
            pageSize: cc,
            pageList: ccArray,
            fit:true,
            data:grid.data,
            striped:true,
            columns: grid.columns,
            rownumbers: grid.rownumbers,
            loadMsg: '数据加载中...',
            onClickRow: grid.onClickRow || function (index, row) { //单击行事件  
	             //---------for TEST 结合SHIFT,CTRL,ALT键实现单选或多选------------  
	             if(index != selectIndexs.firstSelectRowIndex && !inputFlags.isShiftDown ){    
	                 selectIndexs.firstSelectRowIndex = index; //alert('firstSelectRowIndex, sfhit = ' + index);  
	             }             
	             if(inputFlags.isShiftDown ) {  
	                 $('#'+tbId).datagrid('clearSelections');  
	                 selectIndexs.lastSelectRowIndex = index;  
	                 var tempIndex = 0;  
	                 if(selectIndexs.firstSelectRowIndex > selectIndexs.lastSelectRowIndex ){  
	                     tempIndex = selectIndexs.firstSelectRowIndex;  
	                     selectIndexs.firstSelectRowIndex = selectIndexs.lastSelectRowIndex;  
	                     selectIndexs.lastSelectRowIndex = tempIndex;  
	                 }  
	                 for(var i = selectIndexs.firstSelectRowIndex ; i <= selectIndexs.lastSelectRowIndex ; i++){  
	                     $('#'+tbId).datagrid('selectRow', i);     
	                 }     
	             } 
            },
            onClickCell: grid.onClickCell || function (index, row) {

            },
            onDblClickRow: grid.onDblClickRow || function (index, row) {

            },
            /**结束编辑模式的操作*/
		     onEndEdit:grid.onEndEdit ||function(index,row){
		     },
		     /**进入编辑模式的操作*/
		     onBeforeEdit:grid.onBeforeEdit ||function(index,row){
		     },
		     /**编辑模式进入之后的操作*/
		     onAfterEdit:grid.onAfterEdit ||function(index,row){
		     },
	        onCancelEdit:grid.onCancelEdit ||function(index,row){
	            row.editing = false;
	            $(this).datagrid('refreshRow', index);
	        }
        });
        $('#' + grid.name).datagrid({ loadFilter: pagerFilter });
    };
    /*序列化表单*/
    serializeForm = function (objs) {
        var parmString = $(objs).serialize();
        var parmArray = parmString.split("&");
        var parmStringNew = "";
        $.each(parmArray,function (index, data) {
	        var li_pos = data.indexOf("=");
	        if (li_pos > 0) {
	            var name = data.substring(0, li_pos);
	            var value = decodeURIComponent(data.substr(li_pos + 1));
	            var parm = name + "=" + value;
	            parmStringNew = parmStringNew == "" ? parm : parmStringNew + '&' + parm;
	        }
	    });
        return parmStringNew;
    };
    /*将字符串序列化为数组对象*/
    serializeToJson = function (para) {
        var ary = para.split('&'),
	    obj = {};
        for (var i = 0; i < ary.length; i++) {
            if (!ary[i] || ary[i].charAt(0) == '=') continue;
            var eqCharIndex = ary[i].indexOf('=');
            if (eqCharIndex == -1) continue;
            obj[ary[i].substring(0, eqCharIndex)] = ary[i].substring(eqCharIndex + 1, ary[i].length);
        }
        para = obj;
        return para;
    };
    /*将对象转换为字符串*/
    jsonToString = function (json) {
        var item = '',
	    itemFormat = '"{0}":"{1}"';
        for (var i = 0; i < json.length; i++) {
            for (var name in json[i]) {
                var b = itemFormat.replace('{0}', name).replace('{1}', json[i][name]);
                item += item.length == 0 ? b : ',' + b;
            }
        }

        return '[{' + item + '}]';
    };
    /*将对象转换为字符串*/
    jsonArryToString = function (json) {
        var item = '',
	    itemFormat = '{0}:"{1}"';
        for (var i = 0; i < json.length; i++) {
            var temp = '{';
            for (var name in json[i]) {
                var b = itemFormat.replace('{0}', name).replace('{1}', json[i][name]);
                temp += temp == '{' ? b : ',' + b;
            }
            temp += "}";
            //遍历完一条请求
            item += item == '' ? temp : ',' + temp;
        }
        return '{reqstr:[' + item + ']}';
    };
	/*将后台返回数据进行转换为控件可以绑定格式*/
//	createSourceObj=function(data) {
//	    var rowArray = new Array();
//	    if(!data.RESPONSE["0"].RESPONSE_DATA) return rowArray;
//	    for (var i = 0; i < data.RESPONSE["0"].RESPONSE_DATA.length; i++) {
//	        if (data.RESPONSE["0"].RESPONSE_DATA[i]) {
//	            rowArray.push($.extend(data.RESPONSE["0"].RESPONSE_DATA[i],{code:''}));
//	        }
//	    }
//	    return rowArray;
//	}
//	/*重新组合行数据列*/
//	reCreateDataSource=function(data,grid){
//	    if(grid){
//	    	var rowArray = new Array();
//	    	if(!data.RESPONSE["0"].RESPONSE_DATA) return rowArray;
//		    for (var i = 0; i < data.RESPONSE["0"].RESPONSE_DATA.length; i++) {
//		        if (data.RESPONSE["0"].RESPONSE_DATA[i]) {
//		            rowArray.push($.extend(data.RESPONSE["0"].RESPONSE_DATA[i],{code:grid.code,name:grid.name}));
//		        }
//		    }
//		    return rowArray;
//	    }	
//	}
	reqGroundData1=function(url,reqData,grounpName){
	    var ajaxParam={
	          url:url,
	          data:reqData,
	          successCallBack:function(data){
	            var rowNum=0
	            if(data.RESPONSE.length>0){
	               if(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS){
	                  rowNum=parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
	               }
	            }
	            var rowCollection=createSourceObj(data);
	            var jsonData={
	                  total:rowNum,
	                  rows:rowCollection
	            }
				$("#"+grounpName).datagrid("loadData", jsonData);
//				grounpsAjax(jsonData,grounpName);
	         }
	      }
	     iplantAjaxRequest(ajaxParam);
	}
	setUserID=function(value){
		window.userID=value;
	}
	getUserID=function(){
		 return window.userID;
	}
	/*将后台返回数据进行转换为控件可以绑定格式*/
    createSourceObj = function (data) {
        var rowArray = new Array();
        if(data.RESPONSE.length>0){
           if (!data.RESPONSE["0"].RESPONSE_DATA) return rowArray;
           for (var i = 0; i < data.RESPONSE["0"].RESPONSE_DATA.length; i++) {
              if (data.RESPONSE["0"].RESPONSE_DATA[i]) {
                  rowArray.push($.extend(data.RESPONSE["0"].RESPONSE_DATA[i], { code: '' }));
              }
           }
        }
        return rowArray;
    };
    /*重新组合行数据列*/
    reCreateDataSource = function (data, grid) {
        if (grid) {
            var rowArray = new Array();
            if(data.RESPONSE.length>0){
               if (!data.RESPONSE["0"].RESPONSE_DATA) return rowArray;
               for (var i = 0; i < data.RESPONSE["0"].RESPONSE_DATA.length; i++) {
                  if (data.RESPONSE["0"].RESPONSE_DATA[i]) {
                    rowArray.push($.extend(data.RESPONSE["0"].RESPONSE_DATA[i], { code: grid.code, name: grid.name }));
                  }
               }
            }
            return rowArray;
        }
    };
    
    /*发送请求*/
    iplantAjaxRequest = function (ajaxParam) {
        var reqData = ajaxParam.data;
        $.extend(reqData, { reqType: 'WEB' });
        //请求路径字符串操作
        //var reqUrl = ajaxParam.url || '/WebMes/iPlant_ajax';
        var reqUrl ='/iTaurus/iPlant_ajax';
        if(reqData.staticFlag){
        	reqUrl=ajaxParam.url;
        }
        var reqStr = '';
        if (reqData != null) {
            reqStr = '{\"REQ\":[{\"REQ_DATA\":' + JSON.stringify(reqData) + '}]}';
        }
        //将对象转换为json字符串
        var params = {
            url: reqUrl,
            type: 'POST',
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            async: String(ajaxParam.async) == 'false' ? false : true,
            data: { "reqStr": reqStr },
            success: ajaxParam.successCallBack || function (data) {
            },
            error: ajaxParam.errorCallBack || function (e) {
            }
        }
        $.ajax(params);
    };
    reqCombogridData = function (url, reqData) {
        var ajaxParam = {
            url: url,
            data: reqData,
            successCallBack: function (data) {
                var rowNum = 0
                if(data.RESPONSE.length>0){
                	 if (data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS) { 
                       }
                }
                var rowCollection = createSourceObj(data);
                var jsonData = {
                    total: rowNum,
                    rows: rowCollection
                }
                bindCombogrid(jsonData);
            }
        }
        iplantAjaxRequest(ajaxParam);
    };
    reqGroundData = function (url, reqData) {
        var ajaxParam = {
            url: url,
            data: reqData,
            successCallBack: function (data) {
                var rowNum = 0
                if(data.RESPONSE.length>0){
                   if (data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS) {
                       rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
                   }
                }
                var rowCollection = createSourceObj(data);
                var jsonData = {
                    total: rowNum,
                    rows: rowCollection
                }
                bindGroundgrid(jsonData);
            }
        }
        iplantAjaxRequest(ajaxParam);
    };
    initCombogrid = function (grid) {
        if (!grid) return
        $('#' + grid.name).combogrid({
            idtField: grid.idField,
            textField: grid.textField,
            mode: grid.mode,
            panelWidth: grid.panelWidth,
            columns: grid.columns
        });
    };
    gridToDate = function (value) {
        if (value) {
            var oDate = new Date();
            var nDate = new Date(value);
            var newDate = nDate.toLocaleDateString();
            return newDate;
        }
        else {
            return '';
        }
    };
    /*add by zhuss 2016/11/08    初始化多选列表框 */
    /*注册按钮事件*/
    registBtnEvent = function (grid, btnId) {
        /*注册添加按钮事件*/
        $('#' + btnId).click(function () {
            var options = $('#' + grid.focuseGridId).datagrid('getSelections');
            for (var i = 0; i < options.length; i++) {
//              var addRowData = getReRowData(options[i]);
//				var code = grid.code;
//				var name = grid.name;
				if(grid.code == 'AT_CD'){
					var addRowData = {
						AT_CD: options[i].AT_CD,
						AT_NM: options[i].AT_NM
					};
				}else{
					var addRowData = {
						ET_CD: options[i].ET_CD,
						ET_NM: options[i].ET_NM
					};
				}
                $('#' + grid.targetGridId).datagrid('appendRow', addRowData);
                var index = $('#' + grid.focuseGridId).datagrid('getRowIndex', options[i]);
                $('#' + grid.focuseGridId).datagrid('clearChecked');
                $('#' + grid.focuseGridId).datagrid('deleteRow', index);
            };

        });
    };
//  getReRowData = function (rowData) {
//      var AT_CD = rowData.code;
//      var AT_NM = rowData.name;
//      // 用来保存所有的属性名称和值
////      var props = "{";
////      // 开始遍历
////      for (var p in rowData) {
////          if (typeof (rowData[p]) == " function ") {
////              rowData[p]();
////          }
////          else {
////              if (p.toString() == valueField || p.toString() == textField || p.toString() == 'code' || p.toString() == 'name') {
////                  props += p + " : '" + rowData[p] + "',";
////              }
////          }
////      }
////      props = props.substring(0, props.length - 1) + "}";
////      var addRowData = eval('(' + props + ')');
////      return addRowData;
//  };
    bindComboData = function (grid, jsonData) {
        /*  grid对象
         *  {
         *      focuseGridId:  焦点列表ID
         *      targetGridId:  目标列表ID
         *      code:编码
         *      codeTitle:编码标题
         *      name:名称
         *      nameTitle:名称标题
         *   }
         *  
        */
        if (!grid) return;
        $("#" + grid.focuseGridId).datagrid({
            selectOnCheck: 'false',
            dataType: 'json',
            columns: [[
                   { field: "ck", checkbox: "true" },
                   { field: grid.code, title: grid.codeTitle, width: 103, hidden: 'true', align: 'center' },
                   { field: grid.name, title: grid.nameTitle, width: 170, align: 'center' }
            ]]
        });
        $("#" + grid.focuseGridId).datagrid("loadData", jsonData);

        /*注册左边列表双击事件*/
        $("#" + grid.focuseGridId).datagrid({
            onDblClickRow: function (rowIndex, rowData) {
                var addRowData = getReRowData(rowData);
                $("#" + grid.targetGridId).datagrid('appendRow', addRowData);
                $("#" + grid.focuseGridId).datagrid('clearChecked');
                $("#" + grid.focuseGridId).datagrid('deleteRow', rowIndex);

            }
        });
        /*注册右边列表双击事件*/
        $("#" + grid.targetGridId).datagrid({
            onDblClickRow: function (rowIndex, rowData) {
                var addRowData = getReRowData(rowData);
                $("#" + grid.focuseGridId).datagrid('appendRow', addRowData);
                $("#" + grid.targetGridId).datagrid('clearChecked');
                $("#" + grid.targetGridId).datagrid('deleteRow', rowIndex);
            }
        });
    };
    reqComboData = function (url, reqData, grid) {
        var ajaxParam = {
            url: url,
            data: reqData,
            successCallBack: function (data) {
                if (data) {
                    var rowNum = 0
                    if(data.RESPONSE.length>0){
                       if (data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS) {
                          rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
                       }
                    }
                    var rowCollection = reCreateDataSource(data, grid);
                    var jsonData = {
                        total: rowNum,
                        rows: rowCollection,
                        IFS: reqData.IFS,
                        gridId: grid.focuseGridId
                    }
                    bindComboData(grid, jsonData);
                }
            }
        }
        iplantAjaxRequest(ajaxParam);
    };
    /*消息提示框的enter键控制*/
    
    /*****************************************************************************end add by zhuss 初始化多选列表框 **************************************************************************/
    /*****************************************************************************add by zhuss 功能权限控制 **************************************************************************/
    btnConfig = {
        /*btnAddId:pageBtnConfig.btnAddId ||'btnAdd',
		btnDelId:pageBtnConfig.btnDelId || 'btnDelete',
		btnUpdateId:pageBtnConfig.btnUpdateId || 'btnUpdate',
		btnSearchId:pageBtnConfig.btnSearchId || 'btnSearch'*/
        btnSearchId:'btnSearch',// 查询
        btnAddId:'btnAdd', //新增
        btnUpdateId:'btnUpdate', //修改
        btnDeleteId:'btnDelete',// 删除
        btnGaoSearchId:'btnGaoSearch', // 高级查询
        btnCheckId:'btnCheck',  //审核
        btnExprtId:'btnExprt', //导出
        btnSaveId:'btnSave',  //保存
        btnResetId:'btnReset', //密码重置
        setId:'set',   //设置
        setImportId:'import',   //导入
        setDownloadId:'download',  //下载
        setReleaseId:'release',  //下载
        setReleaseId:'deploy',  //部署
        setPrintId:'print'  //打印
        	
    };
    getQueryString = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    };
    getUpdateRight= function (){
    	return updateType;
    };
    initBtnAuthority = function () {
        var userName = getQueryString("userName");
        var cdId = getQueryString("cdId");
        if (userName != null && cdId != null) {
            var ajaxParam = {
                url: '/iPlant_ajax',
                dataType: 'JSON',
                data: {
                    USE_CD: userName,//用户组id
                    MN_CD: cdId,
                    IFS: 'D000057'
                },
                successCallBack: function (data) {
                    for (var p in btnConfig) {
                        $('#'+btnConfig[p]).hide();
                    }
                    if(data.RESPONSE.length>0){
                		var btnAuthorData=data.RESPONSE["0"].RESPONSE_DATA;
                    	$.each(btnAuthorData, function (index, item) {
                    		if (item.FUN_CD == "F001") {
                                $('#' + btnConfig.btnSearchId).show();
                            }
                    	    else if (item.FUN_CD == "F002") {           
                                $('#' + btnConfig.btnAddId).show();
                            }
                            else if (item.FUN_CD == "F003") {     
                                $('#' + btnConfig.btnUpdateId).show();
                                updateType="Y";
                            }
                            else if (item.FUN_CD == "F004") {   
                                $('#' + btnConfig.btnDeleteId).show();
                            }
                            else if (item.FUN_CD == "F005") {   
                                $('#' + btnConfig.btnGaoSearchId).show();
                            }
                            else if (item.FUN_CD == "F006") {  
                                $('#' + btnConfig.btnCheckId).show();
                            }
                            else if (item.FUN_CD == "F007") {     
                                $('#' + btnConfig.btnExprtId).show();
                            }
                            else if (item.FUN_CD == "F008") {  
                                $('#' + btnConfig.btnSaveId).show();
                            }
                            else if (item.FUN_CD == "F009") { 
                                $('#' + btnConfig.btnResetId).show();
                            }
                            else if (item.FUN_CD == "F010") {    
                                $('#' + btnConfig.setId).show();
                            }
                            else if (item.FUN_CD == "F011") {    
                                $('#' + btnConfig.setImportId).show();
                            }
                            else if (item.FUN_CD == "F012") {    
                                $('#' + btnConfig.setDownloadId).show();
                            }
                            else if (item.FUN_CD == "F013") {    
                                $('#' + btnConfig.setPrintId).show();
                            }
                            else if (item.FUN_CD == "F014") {    
                                $('#' + btnConfig.setReleaseId).show();
                            }
                            else if (item.FUN_CD == "F015") {    
                                $('#' + btnConfig.setDeployId).show();
                            }
                       });
                		
                	}
                }
            }
            iplantAjaxRequest(ajaxParam);
        }

    };
    checkInputLength =function(elm,mylength){
        var text =$('#'+elm).textbox('getText');
        var len = 0;
        for (var i = 0; i < text.length; i++) {
            var a = text.charAt(i);
            if (a.match(/[^\x00-\xff]/ig) != null) {
              len += 2;
            }
            else {
              len += 1;
            }
        }
        if(len>mylength){
        	 /*$.messager.alert('提示','你输入的数据过长，请控制在'+mylength/2+'个汉字或者'+mylength+'个字符内');*/
        	$.messager.alert('提示','你输入的数据过长，请控制在'+mylength+'个字符内');
            $('#'+elm).textbox('textbox').attr('maxlength',mylength);
            $('#'+elm).textbox('setValue', '');
            return;
        }
    };
    
    /*  验证编码主键重复
     *  {
     *      value:  输入的值，在功能页面datagrid数据列中onChange事件触发时传值
     *      thisText:  触发onChange事件的textbox对象
     *      ifs:查询接口号
     *   }
     *  
    */
    verifyCode = function(value,thisText,ifs){
    	if(value!='' && value!=null){
    		var pattern =/^[a-zA-Z0-9_-]{1,}$/;
    		var Results = pattern.test(value);
    		if(Results){
    			var ajaxVerify = {
                    url: '/iPlant_ajax',
                    dataType: 'JSON',
                    data: {
                    	'CHECK_CODE': value,
                        IFS: ifs
                    },
                    successCallBack: function (data) {
                    	var dataLen = data.RESPONSE[0].RESPONSE_DATA.length,msg;
                    	if(dataLen == 1){
                    		msg = '编码['+value+']已存在，请重新输入。';
                    	}else if(dataLen>1){
                    		msg = '数据库中已有重复编码，请联系管理员！';
                    	}else{
                    		return;
                    	}
                    	$.messager.alert('提示',msg,'',function(){
            				$(thisText).textbox('setValue','');
            			});
                        return;
                    },
                    errorCallBack: function (data) {
                    	$.messager.alert('提示','编码查重失败，请联系管理员。','',function(){
            				$(thisText).textbox('setValue','');
            			});
                        return;
                    }
                };
                iplantAjaxRequest(ajaxVerify);
    		}else{
    			$.messager.alert('提示','编码字段只能由字母、数字、下划线组成。','',function(){
    				$(thisText).textbox('setValue','');
    			});
    		};
    	};
    };
    
    /*  验证IP地址重复
     *  {
     *      value:  输入的值，在功能页面datagrid数据列中onChange事件触发时传值
     *      thisText:  触发onChange事件的textbox对象
     *      ifs:查询接口号
     *   }
     *  
    */
    verifyIP = function(value,thisText,ifs){
    	if(value!='' && value!=null){
    		var pattern =/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    		var Results = pattern.test(value);
    		if(Results){
    			var ajaxVerify = {
                    url: '/iPlant_ajax',
                    dataType: 'JSON',
                    data: {
                    	'IP_ADDRESS': value,
                        IFS: ifs
                    },
                    successCallBack: function (data) {
                    	var dataLen = data.RESPONSE[0].RESPONSE_DATA.length,msg;
                    	if(dataLen == 1){
                    		msg = 'IP地址['+value+']已存在，请重新输入。';
                    	}else if(dataLen>1){
                    		msg = '数据库中已有重复IP地址，请联系管理员！';
                    	}else{
                    		return;
                    	}
                    	$.messager.alert('提示',msg,'',function(){
            				$(thisText).textbox('setValue','');
            			});
                        return;
                    },
                    errorCallBack: function (data) {
                    	$.messager.alert('提示','IP地址查重失败，请联系管理员。','',function(){
            				$(thisText).textbox('setValue','');
            			});
                        return;
                    }
                };
                iplantAjaxRequest(ajaxVerify);
    		}else{
    			$.messager.alert('提示','IP地址格式错误，请重新输入。','',function(){
    				$(thisText).textbox('setValue','');
    			});
    		}
    	}
    };
    
    /*******添加datagrid ctrl shift 事件*****************/
    //设置全局变量 
    var updateType = "N";//权限设置   默认 N表示没有修改权限  Y表示拥有修改权限
    var tbId = "";
	var KEY = { SHIFT:16, CTRL:17, ALT:18, DOWN:40, RIGHT:39, UP:38, LEFT:37};    
	var selectIndexs = {firstSelectRowIndex:0, lastSelectRowIndex:0};  
	var inputFlags = {isShiftDown:false, isCtrlDown:false, isAltDown:false};
	
    keyPress = function (event){//响应键盘按下事件  
		    var e = event || window.event;    
		    var code = e.keyCode | e.which | e.charCode;        
		    switch(code) {    
		        case KEY.SHIFT:    
		        inputFlags.isShiftDown = true;  
		        $('#'+tbId).datagrid('options').singleSelect = false;             
		        break;  
		    case KEY.CTRL:  
		        inputFlags.isCtrlDown = true;  
		        $('#'+tbId).datagrid('options').singleSelect = false;             
		        break;  
		    /* 
		    case KEY.ALT:    
		        inputFlags.isAltDown = true; 
		        $('#company_tab').datagrid('options').singleSelect = false;            
		        break; 
		    */    
		    default:          
		    }  
		};
		keyRelease = function(event) { //响应键盘按键放开的事件  
		    var e = event || window.event;    
		    var code = e.keyCode | e.which | e.charCode;        
		    switch(code) {    
		        case KEY.SHIFT:   
		        inputFlags.isShiftDown = false;  
		        selectIndexs.firstSelectRowIndex = 0;  
		        $('#'+tbId).datagrid('options').singleSelect = true;              
		        break;  
		    case KEY.CTRL:  
		        inputFlags.isCtrlDown = false;  
		        selectIndexs.firstSelectRowIndex = 0;  
		        $('#'+tbId).datagrid('options').singleSelect = true;  
		        break;  
		    /* 
		    case KEY.ALT:    
		        inputFlags.isAltDown = false; 
		        selectIndexs.firstSelectRowIndex = 0; 
		        $('#company_tab').datagrid('options').singleSelect = true;             
		        break; 
		    */  
		    default:          
		    }  
		};
    
    /***********************/
    /*****************************************************************************end add by zhuss 功能权限 **************************************************************************/
		getReturnMsg=function(data){
			var susMsg='保存成功';
	    	if (data.RESPONSE[0].RESPONSE_HDR.MSG_CODE == '-1007') {
				susMsg = data.RESPONSE[0].RESPONSE_HDR.MSG_TEXT;
				var endIndex=susMsg.indexOf('!');
				susMsg=susMsg.substring(0,endIndex+1);
				susMsg=susMsg.replace('调用','');
			}
	    	return susMsg;
		};
})();
initBtnAuthority();
/**
 * 
 */