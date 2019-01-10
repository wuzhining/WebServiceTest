/* 启动时加载 */
/*
 */
(function() {
	function sysRuleInfo() {
		/**初始化公司combobox内容*/
		initTreeGridData = function() {
			dataCompany.push({'value':'T','text':'真'},{'value':'F','text':'假'});
			/**初始化工厂类型combobox内容*/
//			dataFactory.push({'value':'Y','text':''});
			var dgrid = dataGrid.treegrid('options');
			if(!dgrid) return;
			var reqData = {
				IFS: 'B000105',
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqTreeGridData('/iPlant_ajax', 'sysRule_tab', reqData);
			
		},
		bindTreeGridData = function(reqData,jsonData) {
			var gridList = {
				name: 'sysRule_tab',
		        parentField: "_parentId",
		        textFiled: "ST_C_NM",
		        idField: "ST_C_CD",
		        treeField:"ST_C_NM",
		        pagination:true,
	            pageSize:10,
	            pageList:[10,20,30],
		        state: "closed",
				dataType: 'json',
				loadFilter:treePagerFilter2,
				columns: [[
					{field: 'ST_C_NM',title: '系统规则',width: 250,align: 'left',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
			        {field: 'ST_C_CD',title: '系统规则编码',width: 250,align: 'left',hidden:'true'},
			        {field: 'ST_P_CD',title: '系统规则编码',width: 250,align: 'left',hidden:'true'},
					{field: 'SITE_VL',title: '站值点',width: 150,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";},
						editor:{type:'combobox',options:{valueField:'value',textField:'text',data:[{'value':'T','text':'真'},{'value':'F','text':'假'}],required:true}}}, 
					{field: 'IS_OVER',title: '可覆盖',width: 100,align: 'center',formatter: function(value, row, index) {if(value == 'Y') { return '是';} else { return '否';}},editor:{type:'checkbox',options:{on: 'Y',off: 'N'}}},
					{field: 'SET_UP',title: '设置',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
				        	   options:{validType:['length[1,5]','specialTextCharacter']}}}
				]], 
				
				/**结束编辑模式的操作*/
			     onEndEdit:function(row){
			   
			    	 var ed = $(this).treegrid('getEditor', {index: row.ST_C_CD,field: 'SITE_VL'});
//			    	 row.SITE_VL = $(ed.target).combobox('getText');
//			    	 row.RN = $(ed.target).combobox('getValue');
//			    	 var eddi = $(this).datagrid('getEditor', {index: index,field: 'DICT_IT'});
//			    	 row.DICT_IT = $(eddi.target).combobox('getValue');
//			    	 row.DICT_IT_NM = $(eddi.target).combobox('getText');
			     },
			     /**进入编辑模式的操作*/
			     onBeforeEdit:function(row){
			    	 showmessage.html('');
			    	 row.editing = true;
			    	 row.edited = false;
			    	 oldRow = JSON.stringify(row).replace(reg,'\"\"');
			    	 $(this).treegrid('refreshRow', row.ST_C_CD);
			     },
			     /**编辑模式进入之后的操作*/
			     onAfterEdit:function(row,changes){
			    	 /**判断是否进行数据变更*/
			    	 var temp = JSON.stringify(row).replace(reg,'\"\"');
			    	 if(temp!=oldRow){
			    		 row.edited = true;
			    	 }
			    	 row.editing = false;
			    	 $(this).treegrid('refreshRow', row.ST_C_CD);
			     },
			     onCancelEdit:function(row){
		            row.editing = false;
		            $(this).treegrid('refreshRow', row.ST_C_CD);
		        },
		        /**单击进入编辑模式*/
		        onClickRow: function (row) {
		        	var index = row.ST_C_CD;
			    	if (editIndex != index){
			    		var ed,fc,editorFt;
			    		if(editIndex!=undefined){
		    				/**判断是否为新增行，并验证新增工厂编码重复*/
			    			var rowEdit = dataGrid.treegrid('getSelected');
			    			if(checkNotEmpty(rowEdit.editType)){
			    				if(rowEdit.editType=='add'){
//			    					if(checkNotEmpty(ftCd)){
//					    				var ajaxParam = {
//											url : '/iPlant_ajax',
//											dataType : 'JSON',
//											data : {
//												IFS : 'B000021',
//												FT_CD : ftCd,
//												pageIndex : 1,
//												pageSize : 10
//											},
//											successCallBack : function(data) {
//												rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
//												if (rowNum > 0) {
//													dataGrid.treegrid('select', editIndex).treegrid('beginEdit', editIndex);
//										       		showmessage.html('<font color=red>您输入的工厂编码['+ ftCd + ']已有相同,请重新输入!</font>');
//										       		return false;
//												} else {
//													addTreeGridEditor(dataGrid,index);
//												}
//											}
//										};
//										iplantAjaxRequest(ajaxParam);
//					    			}else{
//					    				addTreeGridEditor(dataGrid,index);
//					    			}
//			    				}else{
			    					addTreeGridEditor(dataGrid,index);		    					
			    				}
			    			}else{
			    				addTreeGridEditor(dataGrid,index);
			    			}
			    		}else{
			    			addTreeGridEditor(dataGrid,index);
			    		}
			    	}
	            }
		        
			}
			initTreeGrid(reqData, gridList);
			dataGrid.treegrid('loadData', jsonData);
			
		},
		/**批量新增和修改的保存*/
		saveTreeDataGrid=function(){
            if (endTreeGridEditing(dataGrid)){
            	//判断后变更数据
            	var cnt = dataGrid.treegrid('getChanges').length
//            	if (cnt) {
                    var inserted = dataGrid.treegrid('getChanges', "inserted");  
                    var updated = dataGrid.treegrid('getChanges', "updated");
                    var deleted = dataGrid.treegrid('getChanges', "deleted");
                    /**装载数据*/
                    var arrInsert = new Array(),arrUpdate = new Array(),strInsert = new Array(),strUpdate = new Array();
                    if(updated.length>0){
                    	for(var m=0;m<updated.length;m++){
                    		if(updated[m].editType=='add'){
                    			arrInsert.push({ RULE_NM: updated[m].ST_C_NM,RULE_CD: updated[m].ST_C_CD,SITE_VL: updated[m].SITE_VL,IS_OVER: updated[m].IS_OVER,SET_UP: updated[m].SET_UP});
                    			strInsert.push({ST_P_CD:updated[m].ST_P_CD,ST_C_CD:updated[m].ST_C_CD,ST_TP:1})
	                    	}else{
	                    		if(updated[m].edited){
	                    			arrUpdate.push({ RULE_CD: updated[m].ST_C_CD,RULE_NM: updated[m].ST_C_NM,SITE_VL: updated[m].SITE_VL,IS_OVER: updated[m].IS_OVER,SET_UP: updated[m].SET_UP});
//	                    			strUpdate.push({ST_P_CD:updated[m].sT_P_CD,ST_C_CD:updated[m].sT_C_CD})
	                    		}
	                    	}
                    	}
                    	//批量先增
                        var ajaxInsert = {
                            url: '/iPlant_ajax',
                            dataType: 'JSON',
                            data: {
                                list: arrInsert,
                                IFS: 'B000102'
                            },
                            successCallBack: function (data) {
//                            	initTreeGridData();
//                            	dataGrid.datagrid('unselectAll');
//                            	dataGrid.treegrid('reload');  
//                            	dataGrid.treegrid('acceptChanges'); 
//                            	showmessage.html('<font color=red>保存成功！</font>');
                            	  var ajaxStrInsert = {
                                          url: '/iPlant_ajax',
                                          dataType: 'JSON',
                                          data: {
                                              list: strInsert,
                                              IFS: 'B000106'
                                          },
                                          successCallBack: function (data) {
                                          	initTreeGridData();
                                          	var selection = dataGrid.treegrid('getSelections');
                                        	$.each(selection,function(i,item){
                                        		dataGrid.treegrid('unselect',item.ST_C_CD);
                                        	})
                    
                                          	dataGrid.treegrid('reload');  
                                          	dataGrid.treegrid('acceptChanges'); 
                                          	showmessage.html('<font color=red>保存成功！</font>');
                                              return;
                                          },
                                          errorCallBack: function (data) {
                                          	showmessage.html('<font color=red>保存失败！</font>');
                                              return;
                                          }
                                      };
                            	  iplantAjaxRequest(ajaxStrInsert);
                                return;
                            },
                            errorCallBack: function (data) {
                            	showmessage.html('<font color=red>保存失败！</font>');
                                return;
                            }
                            
                        };
                        if(arrInsert.length>0){
                        	iplantAjaxRequest(ajaxInsert);
                    	}
                    	//批量修改
                        var ajaxUpdate = {
                            url: '/iPlant_ajax',
                            dataType: 'JSON',
                            data: {
                                list: arrUpdate,
                                IFS: 'B000104'
                            },
                            successCallBack: function (data) {
                            	initTreeGridData();
                            	dataGrid.treegrid('acceptChanges');
                            	showmessage.html('<font color=red>保存成功！</font>');
                                return;
                            	 
                            },
                            errorCallBack: function (data) {
                            	showmessage.html('<font color=red>保存失败！</font>');
                                return;
                            }
                        };
                        if(arrUpdate.length>0){
                        	iplantAjaxRequest(ajaxUpdate);
                        	var selection = dataGrid.treegrid('getSelections');
                        	$.each(selection,function(i,item){
                        		dataGrid.treegrid('unselect',item.ST_C_CD);
                        	})
                    	}else{
                    		showmessage.html('<font color=red>没有进行变更！</font>');
                        	var selection = dataGrid.treegrid('getSelections');
                        	$.each(selection,function(i,item){
                        		dataGrid.treegrid('unselect',item.ST_C_CD);
                        	})
                    	}
                    }else{
                	showmessage.html('<font color=red>没有进行变更！</font>');
                	var selection = dataGrid.treegrid('getSelections');
                	$.each(selection,function(i,item){
                		dataGrid.treegrid('unselect',item.ST_C_CD);
                	})
                	
//                }
            	}
			}else{
				showmessage.html('<font color=red>请输入必填项！</font>');
			}
		},
		/**删除行*/
		deleteTreeDataGrid=function (){
			/**删除行有2中情况，一种新增的还没有保存，一种是原来就有的直接删除*/
			var indexs = treegridEditorRows(),del = [],row;
			if(indexs.length>0){
				$.messager.confirm("确认框", "您确定要删除您所选择的数据?",function(a) {
					if(a){
						for(var j=0;j<indexs.length;j++){
							row = dataGrid.treegrid('find',indexs[j]);
							var asd = checkNotEmpty(row.ST_C_NM);
							if(checkNotEmpty(row.ST_C_NM)){
			                        	var str = {
						                        url: "/iPlant_ajax",
						                        dataType: "JSON",
						                        data: {
						                            IFS: "B000107",
						                            ST_C_CD: row.ST_C_CD                            
						                        },
						                        successCallBack: function(data) {
						                        	var e = {
									                        url: "/iPlant_ajax",
									                        dataType: "JSON",
									                        data: {
									                            IFS: "B000103",
									                            RULE_CD: row.ST_C_CD                            
									                        },
									                        successCallBack: function(data) {
									                        	initTreeGridData();
									                        	dataGrid.treegrid('remove', row.ST_C_CD );
									                        }
						                        	};
									                        iplantAjaxRequest(e);
						                    
						                     }
			                        	  };
//											dataGrid.datagrid('deleteRow', indexs[j]);
						                    iplantAjaxRequest(str);
			                       
			                  
//								dataGrid.datagrid('deleteRow', indexs[j]);
			                  
							}else{
								/**判断多个空行只删除最顶上的*/
								del.push(indexs[j]);
							}
						}
						if(del.length>0){
							dataGrid.treegrid('remove', del[0]);
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
		};
		/**插入一个新的空白行*/		
		insertTreeDataGrid=function (){
			
			var id,parentId,SYS = '0';
			var row = dataGrid.treegrid('getSelected');
//			var root = dataDrid.treegrid('getRoot');
//			if (row){
//				var index = dataGrid.datagrid('getRowIndex', row);
//			} else {
//				index = 0;
//				editIndex = 0;
//			}
			//CP_CD:dataCompany[0].value,CP_NM:dataCompany[0].text,DICT_IT:dataFactory[0].value,DICT_IT_NM:dataFactory[0].text
			if(row){
				 rowId = row.ST_C_CD;
				 parentId = row.ST_C_CD;
			}else{
				 rowId = '';
				 parentId = '';
//				 parentId = parentId.replace(/\//g, 'N/A');
			}
			id = autoCreateCode(SYS);
			dataGrid.treegrid('append', {
				parent: rowId,
				data: [{
					gridId:'sysRule_tab',
					ST_C_CD:id,
					ST_P_CD:parentId,
					ST_C_NM:"",
					editType:'add',
					SITE_VL: "",
					IS_OVER: "",
					SET_UP: ""
				}]

			});
			
			/**新增一个字段判断是否为新增*/
			var rowEdit = dataGrid.treegrid('getSelected');
//			dataGrid.treegrid('select',id);
			dataGrid.treegrid('beginEdit',id);
			if (editIndex != id){
				if (endTreeGridEditing(dataGrid)){
//					dataGrid.treegrid('beginEdit', id);
					editIndex = id;
				} 
				else 
				{
//					dataGrid.treegrid('select', editIndex);
				}
			}
			else
			{
				endTreeGridEditing(dataGrid);
			}
		}
	}

	sysRuleInfo.prototype = {
		init: function() {
			$(function() {
				//初始化全局变量对象
				dataGrid = $('#sysRule_tab'),dataCompany=[],dataFactory=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				initTreeGridData();
//				bindTreeGridData();
				//获取工厂类别下拉				
				$('.add').click(function() {
					insertTreeDataGrid();
				});
				
				$('.delete').click(function(){
					deleteTreeDataGrid();
	            });
				$('.save').click(function() {
					saveTreeDataGrid();
				});
			});
		}
	}
	var sysRule = new sysRuleInfo();
	sysRule.init();
})();