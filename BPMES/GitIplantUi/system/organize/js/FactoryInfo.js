/* 启动时加载 */
/*
 */
(function() {
	function factoryInfo() {
		/**初始化公司combobox内容*/
		initGridData = function() {
			var company = {
                url: "/iPlant_ajax",
                dataType: "JSON",
                data: {IFS: "B000049"},
                successCallBack: function(a) {
                	var op = a.RESPONSE[0].RESPONSE_DATA;
                    $.each(op,function(n,obj) {
                    	dataCompany.push({'value':obj.CP_CD,'text':obj.CP_NM});
				    });  
                },
                errorCallBack: function() {
                    $.messager.alert("提示", '请联系管理员，查询失败！')
                }
            };
			iplantAjaxRequest(company),
			/**初始化工厂类型combobox内容*/
			factory = {
                url: "/iPlant_ajax",
                dataType: "JSON",
                data: {IFS:'D000008',DICT_CD:"CFT01",USE_YN:'Y'},
                successCallBack: function(a) {
                	var op = a.RESPONSE[0].RESPONSE_DATA;
                    $.each(op,function(n,obj) {
                    	dataFactory.push({'value':obj.DICT_IT,'text':obj.DICT_IT_NM});
				    });  
                },
                errorCallBack: function() {
                    $.messager.alert("提示", '请联系管理员，查询失败！')
                }
            };
			iplantAjaxRequest(factory);
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			var reqData = {
				IFS: 'B000021',
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'factory_tab', reqData);
		},
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'factory_tab',
				dataType: 'json',
				columns: [[
					{field: 'FT_CD',title: '工厂编码',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
					{field: 'FT_NM',title: '工厂名称',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
					{field: 'FT_ADR',title: '工厂地址',width: 300,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{validType:['length[1,25]','specialTextCharacter']}}}, 
					{field: 'CP_CD',title: '所属公司',width: 150,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";},
						editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataCompany,required:true,editable:false}}}, 
					{field: 'DICT_IT',title: '工厂类别',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.DICT_IT_NM || value)+ "</span>";},
							editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataFactory,required:true}}}, 
					{field: 'USE_YN',title: '是否启用',width: 100,align: 'center',formatter: function(value, row, index) {if(value == 'Y') { return '启用';} else { return '未启用';}},editor:{type:'checkbox',options:{on: 'Y',off: 'N'}}},
					{field: 'FT_RM',title: '备注',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{validType:['length[1,100]','specialTextCharacter']}}}, 
					{field: 'CRT_ID',title: '创建人',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'CRT_DT',title: '创建时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'UPT_ID',title: '修改人',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'UPT_DT',title: '修改时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
				]],
				/**结束编辑模式的操作*/
			     onEndEdit:function(index,row){
			    	 var ed = $(this).datagrid('getEditor', {index: index,field: 'CP_CD'});
			    	 row.CP_CD = $(ed.target).combobox('getValue');
			    	 row.CP_NM = $(ed.target).combobox('getText');
			    	 var eddi = $(this).datagrid('getEditor', {index: index,field: 'DICT_IT'});
			    	 row.DICT_IT = $(eddi.target).combobox('getValue');
			    	 row.DICT_IT_NM = $(eddi.target).combobox('getText');
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
		        /**单击进入编辑模式*/
			    onClickRow: function (index, row) {
			    	if (editIndex != index){
			    		var ed,fc,editorFt;
			    		if(editIndex!=undefined){
		    				/**判断是否为新增行，并验证新增工厂编码重复*/
			    			var rowEdit = dataGrid.datagrid('getRows')[editIndex],edft = $(this).datagrid('getEditor', {index: editIndex,field: 'FT_CD'}),editorFt = edft.target,ftCd = editorFt.val();
			    			if(checkNotEmpty(rowEdit.editType)){
			    				if(rowEdit.editType=='add'){
			    					if(checkNotEmpty(ftCd)){
					    				var ajaxParam = {
											url : '/iPlant_ajax',
											dataType : 'JSON',
											data : {
												IFS : 'B000021',
												FT_CD : ftCd,
												pageIndex : 1,
												pageSize : 10
											},
											successCallBack : function(data) {
												rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
												if (rowNum > 0) {
													dataGrid.datagrid('selectRow', editIndex).datagrid('beginEdit', editIndex);
										       		showmessage.html('<font color=red>您输入的工厂编码['+ ftCd + ']已有相同,请重新输入!</font>');
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
							    		ed = $(this).datagrid('getEditor', {index: index,field: 'FT_CD'});
							    		fc = ed.target;
							    		fc.prop('readonly',true);
						    		}
			    				}
			    			}else{
					    		 addDatagridEditor(dataGrid,index);
					    		 if(!checkNotEmpty(row.editType)){
							    		ed = $(this).datagrid('getEditor', {index: index,field: 'FT_CD'});
							    		fc = ed.target;
							    		fc.prop('readonly',true);
						    		}
			    			}
			    		}else{
			    			addDatagridEditor(dataGrid,index);
			    			if(!checkNotEmpty(row.editType)){
					    		ed = $(this).datagrid('getEditor', {index: index,field: 'FT_CD'});
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
                    		arrInsert.push({ FT_CD: inserted[m].FT_CD,FT_NM: inserted[m].FT_NM,FT_ADR: inserted[m].FT_ADR,CP_CD: inserted[m].CP_CD,DICT_IT: inserted[m].DICT_IT,
                    			USE_YN: inserted[m].USE_YN,FT_RM: inserted[m].FT_RM,CRT_ID: inserted[m].CRT_ID,CRT_DT: inserted[m].CRT_DT,UPT_ID: inserted[m].UPT_ID,UPT_DT: inserted[m].UPT_DT,});
                    	}
                    	//批量先增
                        var ajaxInsert = {
                            url: '/iPlant_ajax',
                            dataType: 'JSON',
                            data: {
                                list: arrInsert,
                                IFS: 'B000022'
                            },
                            successCallBack: function (data) {
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
                    			arrUpdate.push({ FT_CD: updated[m].FT_CD,FT_NM: updated[m].FT_NM,FT_ADR: updated[m].FT_ADR,CP_CD: updated[m].CP_CD,DICT_IT: updated[m].DICT_IT,
                        			USE_YN: updated[m].USE_YN,FT_RM: updated[m].FT_RM,CRT_ID: updated[m].CRT_ID,CRT_DT: updated[m].CRT_DT,UPT_ID: updated[m].UPT_ID,UPT_DT: updated[m].UPT_DT,});
                    		}
                    	}
                    	//批量修改
                        var ajaxUpdate = {
                            url: '/iPlant_ajax',
                            dataType: 'JSON',
                            data: {
                                list: arrUpdate,
                                IFS: 'B000024'
                            },
                            successCallBack: function (data) {
                            	dataGrid.datagrid('acceptChanges');
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
							if(checkNotEmpty(row.FT_CD)){
								var e = {
			                        url: "/iPlant_ajax",
			                        dataType: "JSON",
			                        data: {
			                            IFS: "B000023",
			                            FT_CD: row.FT_CD                            
			                        },
			                        successCallBack: function() {
			                        	editIndex = undefined;
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
			var row = dataGrid.datagrid('getSelected'),compV = '',compT='',facV = '',facT='';
			//var rowEditRows = dataGrid.datagrid('getRows');
			if(dataCompany.length>0){compV=dataCompany[0].value,compT=dataCompany[0].text;}
			if(dataFactory.length>0){facV=dataFactory[0].value,facT=dataFactory[0].text;}
			if (row){
				var index = dataGrid.datagrid('getRowIndex', row);
			} else {
				index = 0;
				editIndex = 0;
			}
			dataGrid.datagrid('insertRow', {
				index: index,
				row:{CP_CD:compV,CP_NM:compT,DICT_IT:facV,DICT_IT_NM:facT}
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

	factoryInfo.prototype = {
		init: function() {
			$(function() {
				//初始化全局变量对象
				dataGrid = $('#factory_tab'),dataCompany=[],dataFactory=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
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
	var fcfo = new factoryInfo();
	fcfo.init();
})();