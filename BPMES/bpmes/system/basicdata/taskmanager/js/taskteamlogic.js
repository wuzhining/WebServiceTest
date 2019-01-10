/* 启动时加载 */
/*
 */
(function() {
	function taskteamlogic() {
		/**初始化工厂combobox内容*/
		var Factory = {
                url: "/iPlant_ajax",
                dataType: "JSON",
                data: {IFS: "B000021"},
                successCallBack: function(a) {
                	var op = a.RESPONSE[0].RESPONSE_DATA;
                    $.each(op,function(n,obj) {
                    	dataFactory.push({'value':obj.FT_CD,'text':obj.FT_NM});
				    });  
                },
                errorCallBack: function() {
                    $.messager.alert("提示", '请联系管理员，查询失败！')
                }
            };
			iplantAjaxRequest(Factory),
			/**获取系统时间**/
			dateToString = function (now){  
				  var year = now.getFullYear();  
				    var month =(now.getMonth() + 1).toString();  
				    var day = (now.getDate()).toString();  
				    var hour = (now.getHours()).toString();  
				    var minute = (now.getMinutes()).toString();  
				    var second = (now.getSeconds()).toString();  
				    if (month.length == 1) {  
				        month = "0" + month;  
				    }  
				    if (day.length == 1) {  
				        day = "0" + day;  
				    }  
				    if (hour.length == 1) {  
				        hour = "0" + hour;  
				    }  
				    if (minute.length == 1) {  
				        minute = "0" + minute;  
				    }  
				    if (second.length == 1) {  
				        second = "0" + second;  
				    }  
			//	     var dateTime = year + "-" + month + "-" + day +" "+ hour +":"+minute+":"+second;  
				    var dateTime = year + month +day + hour + minute + second;  
				     return dateTime;  
				  },
		initGridData = function() {
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			var reqData = {
				IFS: 'B000097',
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'taskteamlogic_tab', reqData);
		},
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'taskteamlogic_tab',
				dataType: 'json',
				columns: [[
				    {field: 'CD',title: '编号',width: 100,align: 'center',hidden:'true'},
					{field: 'LG_FT_CD',title: '逻辑作业组代码',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{required:true, validType:['length[1,15]','specialTextCharacter']}}},
			        {field: 'LG_FT_NM',title: '描述',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
				           options:{validType:['length[1,15]','specialTextCharacter']}}},
//				    {field: 'FT_CD',title: '所属工厂编号',width: 100,align: 'center',hidden:'true'},
				    {field: 'FT_CD',title: '所属工厂',width: 150,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.FT_CD  || value)+ "</span>";},
						   editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataFactory,required:true}}}, 
					{field: 'CRT_ID',title: '创建人',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'CRT_DT',title: '创建时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
//					{field: 'UPT_ID',title: '修改人',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
//					{field: 'UPT_DT',title: '修改时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
				]],            	 
				/**结束编辑模式的操作*/
			     onEndEdit:function(index,row){
			    	 var ed = $(this).datagrid('getEditor', {index: index,field: 'FT_CD'});
			    	 row.FT_CD = $(ed.target).combobox('getValue');
			    	 row.FT_NM = $(ed.target).combobox('getText');
//			    	 var eddi = $(this).datagrid('getEditor', {index: index,field: 'DICT_IT'});
//			    	 row.DICT_IT = $(eddi.target).combobox('getValue');
//			    	 row.DICT_IT_NM = $(eddi.target).combobox('getText');
			     },
			     /**进入编辑模式的操作*/
			     onBeforeEdit:function(index,row){
			    	 showmessage.html('');
			    	 row.editing = true;
			    	 row.edited = false;
			    	 oldRow = JSON.stringify(row).replace(reg,'\"\"');
			    	 $(this).datagrid('refreshRow', index);
			     },
			     /**编辑模式进入之后的操作*/
			     onAfterEdit:function(index,row){
			    	 /**判断是否进行数据变更*/
			    	 var temp = JSON.stringify(row).replace(reg,'\"\"');
			    	 if(temp!=oldRow){
			    		 row.edited = true;
			    	 }
			    	 row.editing = false;
			    	 $(this).datagrid('refreshRow', index);
			     },
		        onCancelEdit:function(index,row){
		            row.editing = false;
		            $(this).datagrid('refreshRow', index);
		        },
		        /** 单击取消编辑**/
		        onclickRow:function(index,row){
		        	endEditing();
		        },
		        /**单击进入编辑模式*/
		        onClickRow: function (index, row) {
			    	if (editIndex != index){
			    		var ed,fc,editorFt;
			    		if(editIndex!=undefined){
		    				/**判断是否为新增行，并验证新增工厂编码重复*/
			    			var rowEdit = dataGrid.datagrid('getRows')[editIndex],edft = $(this).datagrid('getEditor', {index: editIndex,field: 'LG_FT_CD'}),editorFt = edft.target,ftCd = editorFt.val();
			    			if(checkNotEmpty(rowEdit.editType)){
			    				if(rowEdit.editType=='add'){
			    					if(checkNotEmpty(ftCd)){
					    				var ajaxParam = {
											url : '/iPlant_ajax',
											dataType : 'JSON',
											data : {
												IFS : 'B000097',
												FT_CD : ftCd,
												pageIndex : 1,
												pageSize : 10
											},
											successCallBack : function(data) {
												rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
												if (rowNum > 0) {
													dataGrid.datagrid('selectRow', editIndex).datagrid('beginEdit', editIndex);
										       		showmessage.html('<font color=red>您输入的编码['+ ftCd + ']已有相同,请重新输入!</font>');
										       		return false;
												} else {
													addDatagridEditor(dataGrid,index);
												}
											}
										};
										iplantAjaxRequest(ajaxParam);
					    			}else{
						        	   addDatagridEditor(dataGrid,index);
					    			}
			    				}else{
			    					addDatagridEditor(dataGrid,index);
			    					if(!checkNotEmpty(row.editType)){//如果是修改的情况，ft_cd字段为只读模式
							    		ed = $(this).datagrid('getEditor', {index: index,field: 'LG_FT_CD'});
							    		fc = ed.target;
							    		fc.prop('readonly',true);
						    		}
			    				}
			    			}else{
					    		 addDatagridEditor(dataGrid,index);
					    		 if(!checkNotEmpty(row.editType)){
							    		ed = $(this).datagrid('getEditor', {index: index,field: 'LG_FT_CD'});
							    		fc = ed.target;
							    		fc.prop('readonly',true);
						    		}
			    			}
			    		}else{
			    			addDatagridEditor(dataGrid,index);
			    			if(!checkNotEmpty(row.editType)){
					    		ed = $(this).datagrid('getEditor', {index: index,field: 'LG_FT_CD'});
					    		fc = ed.target;
					    		fc.prop('readonly',true);
				    		}
			    		}
			    	}
	            }
			}
			initGridView(reqData, gridList);
			dataGrid.datagrid('loadData', jsonData);
		},
		/**批量新增和修改的保存*/
		saveDataGrid=function(){  
            if (endEditing(dataGrid)){
            	//判断后变更数据
            	if (dataGrid.datagrid('getChanges').length) {
                    var inserted = dataGrid.datagrid('getChanges', "inserted");  
                    var updated = dataGrid.datagrid('getChanges', "updated");
                    var deleted = dataGrid.datagrid('getChanges', "deleted");
                    /**装载数据*/
                    var arrInsert = new Array(),arrUpdate = new Array();
                    if(inserted.length>0){
                    	for(var m=0;m<inserted.length;m++){
                    		var date = new Date();
                    		var sysTime = dateToString(date);
                    		arrInsert.push({CD:'LF'+sysTime+m, LG_FT_CD: inserted[m].LG_FT_CD,LG_FT_NM: inserted[m].LG_FT_NM,FT_CD: inserted[m].FT_CD,CRT_ID: inserted[m].CRT_ID,CRT_DT: inserted[m].CRT_DT});
                    	}
                    	//批量先增
                        var ajaxInsert = {
                            url: '/iPlant_ajax',
                            dataType: 'JSON',
                            data: {
                                list: arrInsert,
                                IFS: 'B000098'
                            },
                            successCallBack: function (data) {
                            	initGridData();
                            	dataGrid.datagrid('acceptChanges');
                            	showmessage.html('<font color=red>保存成功！</font>');
                                return;
                            },
                            errorCallBack: function (data) {
                            	showmessage.html('<font color=red>保存失败！</font>');
                                return;
                            }
                        };
                        iplantAjaxRequest(ajaxInsert);
                    }
                    if(updated.length>0){
                    	for(var m=0;m<updated.length;m++){
                    		if(updated[m].edited){
                    			arrUpdate.push({ CD: updated[m].CD,LG_FT_CD: updated[m].LG_FT_CD,LG_FT_NM: updated[m].LG_FT_NM,FT_CD: updated[m].FT_CD,CRT_ID: updated[m].CRT_ID,CRT_DT: updated[m].CRT_DT});
                    		}
                    	}
                    	//批量修改
                        var ajaxUpdate = {
                            url: '/iPlant_ajax',
                            dataType: 'JSON',
                            data: {
                                list: arrUpdate,
                                IFS: 'B000100'
                            },
                            successCallBack: function (data) {
                            	dataGrid.datagrid('acceptChanges');
                            	initGridData();
                            	showmessage.html('<font color=red>保存成功！</font>');
                                return;
                            },
                            errorCallBack: function (data) {
                            	showmessage.html('<font color=red>保存失败！</font>');
                                return;
                            }
                        };
                        iplantAjaxRequest(ajaxUpdate);
                    }
                }else{
                	showmessage.html('<font color=red>没有进行变更！</font>');
                }
			}else{
				showmessage.html('<font color=red>请输入必填项！</font>');
			}
		},
		/**删除行*/
		deleteDataGrid=function (){
			/**删除行有2中情况，一种新增的还没有保存，一种是原来就有的直接删除*/
			var indexs = datagridEditorRows(),del = [],row;
			if(indexs.length>0){
				$.messager.confirm("确认框", "您确定要删除您所选择的数据?",function(a) {
					if(a){
						for(var j=0;j<indexs.length;j++){
							row = dataGrid.datagrid('getRows')[indexs[j]];
							if(checkNotEmpty(row.CD)){
								var e = {
			                        url: "/iPlant_ajax",
			                        dataType: "JSON",
			                        data: {
			                            IFS: "B000099",
			                            CD: row.CD                            
			                        },
			                        successCallBack: function() {
			                        	initGridData();
//			                        	dataGrid.datagrid('deleteRow', indexs[j]);
			                        }
			                    };
								dataGrid.datagrid('deleteRow', indexs[j]);
			                    iplantAjaxRequest(e);
							}else{
								/**判断多个空行只删除最顶上的*/
								del.push(indexs[j]);
							}
						}
						if(del.length>0){
							dataGrid.datagrid('deleteRow', del[0]);
						}
						if(del.length==1){
							editIndex = undefined;
						}
						showmessage.html('<font color=red>删除成功！</font>');
					}
	            })
			}else{
				showmessage.html('<font color=red>请选中要删除的数据！</font>');
			}
		},
		/**插入一个新的空白行*/
		insertDataGrid=function (){
			var row = dataGrid.datagrid('getSelected');
			if (row){
				var index = dataGrid.datagrid('getRowIndex', row);
			} else {
				index = 0;
				editIndex = 0;
			}
			//CP_CD:dataCompany[0].value,CP_NM:dataCompany[0].text,DICT_IT:dataFactory[0].value,DICT_IT_NM:dataFactory[0].text
			dataGrid.datagrid('insertRow', {
				index: index,
				row:{}
			});
			/**新增一个字段判断是否为新增*/
			var rowEdit = dataGrid.datagrid('getRows')[index];
			rowEdit.editType='add';
			dataGrid.datagrid('selectRow',index);
			dataGrid.datagrid('beginEdit',index);
			if (editIndex != index){
				if (endEditing(dataGrid)){
					dataGrid.datagrid('selectRow', index).datagrid('beginEdit', index);
					editIndex = index;
				} else {
					dataGrid.datagrid('selectRow', editIndex);
				}
			}else{
				endEditing(dataGrid);
			}
		}
	}

	taskteamlogic.prototype = {
		init: function() {
			$(function() {
				//初始化全局变量对象
				dataGrid = $('#taskteamlogic_tab'),dataCompany=[],dataFactory=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				initGridData();
				//获取工厂类别下拉
				$('.add').click(function() {					
					insertDataGrid();
				});
				
				$('.delete').click(function(){
					deleteDataGrid();
	            });

				$('.save').click(function() {
					saveDataGrid();
				});
			});
		}
	}
	var logic = new taskteamlogic();
	logic.init();
})();