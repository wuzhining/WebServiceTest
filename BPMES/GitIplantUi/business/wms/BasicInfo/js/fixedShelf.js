/* 启动时加载 */
/*
 */
(function() {
	function nationalMaintenance() {
		/**初始化公司combobox内容*/
		initGridData = function() {
			var warehouseDes_id = $("#warehouseDes_id").val();
			var warehouseDes_name = $("#warehouseDes_name").val();
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			var reqData = {
				IFS: 'WMS_B000006',
				pageIndex: 1,
				pageSize: dgrid.pageSize,
				WAREHOUSE_ID:warehouseDes_id,
				WAREHOUSE_NAME:warehouseDes_name
			}
			reqGridData('../iPlant_ajax', 'warehouseDes_tab', reqData);
		},
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'warehouseDes_tab',
				dataType: 'json',
				columns: [[
					{field: 'WAREHOUSE_ID',title: '仓库编码',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
			        {field: 'WAREHOUSE_NAME',title: '仓库名称',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
				           options:{validType:['length[1,15]','specialTextCharacter'],message:"请输入长度在1和15之间的字符串 "}}},
				           {field: 'ENABLE',title: '是否启用',width: 100,align: 'center',formatter: 
				            	function (value,row,index) {
				            	if(value=="Y"){
				            		return "启用";
				            	}if(value=="N"){
				            		return "未启用";
				            	}
				            	}
						           ,editor:{type:'checkbox',options:{on: 'Y',off: 'N'}}
						           },
		            {field: 'NOTE',title: '备注',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			           options:{validType:['length[1,15]','specialTextCharacter']}}},
					{field: 'CREATER_ID',title: '创建人',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'CREATE_DATE',title: '创建时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'UPDATER_ID',title: '修改人',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'UPDATE_DATE',title: '修改时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
				]],            	 
				/**结束编辑模式的操作*/
			     onEndEdit:function(index,row){			    	
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
		        /**双击进入编辑模式*/
		        onDblClickRow: function (index, row) {
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
												IFS : 'WMS_B000006',		
												FT_CD : ftCd,
												pageIndex : 1,
												pageSize : 10
											},
											successCallBack : function(data) {
												rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
												if (rowNum > 0) {
													dataGrid.datagrid('selectRow', editIndex).datagrid('beginEdit', editIndex);
										       		showmessage.html('<font color=red>仓库编码['+ ftCd + ']已有相同,请重新输入!</font>');
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
                    		arrInsert.push({ WAREHOUSE_ID: inserted[m].WAREHOUSE_ID,ENABLE: inserted[m].ENABLE,WAREHOUSE_NAME: inserted[m].WAREHOUSE_NAME,NOTE: inserted[m].NOTE,CREATER_ID: inserted[m].CREATER_ID,CREATE_DATE: inserted[m].CREATE_DATE,
                    			UPDATER_ID: inserted[m].UPDATER_ID,UPDATE_DATE: inserted[m].UPDATE_DATE,});
                    	}
                    	
                    	
                    	if(arrInsert[0].WAREHOUSE_NAME==null||arrInsert[0].WAREHOUSE_NAME==""){
                    		showmessage.html('<font color=red>请输入仓库名称！</font>');
                    	}else if(arrInsert[0].ENABLE==null||arrInsert[0].ENABLE==""){
                    		showmessage.html('<font color=red>请输入正确的状态！</font>');
                    	}else if(arrInsert[0].ENABLE!="Y"&&arrInsert[0].ENABLE!="N"){
                			showmessage.html('<font color=red>请输入正确的状态！</font>');
                		}else{
                    		//批量先增
                            var ajaxInsert = {
                                url: '/iPlant_ajax',
                                dataType: 'JSON',
                                data: {
                                    list: arrInsert,
                                    IFS: 'WMS_B000007'		
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
                            setTimeout("conditionQuery();",500);
                    	}
                    }
                    if(updated.length>0){
                    	for(var m=0;m<updated.length;m++){
                    		if(updated[m].edited){
                    			arrUpdate.push({ WAREHOUSE_ID: updated[m].WAREHOUSE_ID,WAREHOUSE_NAME: updated[m].WAREHOUSE_NAME,ENABLE: updated[m].ENABLE,NOTE: updated[m].NOTE,CREATER_ID: updated[m].CREATER_ID,CREATE_DATE: updated[m].CREATE_DATE,
                        			UPDATER_ID: updated[m].UPDATER_ID,UPDATE_DATE: updated[m].UPDATE_DATE,});
                    		}
                    	}
                    	//批量修改
                        var ajaxUpdate = {
                            url: '/iPlant_ajax',
                            dataType: 'JSON',
                            data: {
                                list: arrUpdate,
                                IFS: 'WMS_B000008'
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
                        setTimeout("conditionQuery();",500);
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
			var obj =  $("#warehouseDes_tab").datagrid("getSelected");
			if(obj!=null){
				$.messager.confirm("确认框", "您确定要删除您所选择的数据?",function(a) {
					if(a){
						var WAREHOUSE_ID=obj.WAREHOUSE_ID;
								var e = {
			                        url: "/iPlant_ajax",
			                        dataType: "JSON",
			                        data: {
			                            IFS: "WMS_B000009",
			                            WAREHOUSE_ID:WAREHOUSE_ID                        
			                        },
			                        successCallBack: function() {
//			                        	dataGrid.datagrid('deleteRow', indexs[j]);
			                        }
			                    };
								
			             iplantAjaxRequest(e);
			            $('#warehouseDes_tab').datagrid('deleteRow', $('#warehouseDes_tab').datagrid('getRowIndex',$('#warehouseDes_tab').datagrid('getSelected')));
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

	nationalMaintenance.prototype = {
		init: function() {
			$(function() {
				//初始化全局变量对象
				dataGrid = $('#warehouseDes_tab'),dataCompany=[],dataFactory=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
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
	var national = new nationalMaintenance();
	national.init();
})();

//条件查询
function conditionQuery(){
	var dgrid = dataGrid.datagrid('options');
	var warehouseDes_id = $("#warehouseDes_id").val();
	var warehouseDes_name = $("#warehouseDes_name").val();
	var reqData = {
			IFS: 'WMS_B000006',
			pageIndex: 1,
			pageSize: dgrid.pageSize,
			WAREHOUSE_ID:warehouseDes_id,
			WAREHOUSE_TYPE_NAME:warehouseDes_name
		}
		reqGridData('../iPlant_ajax', 'warehouseDes_tab', reqData);
}

