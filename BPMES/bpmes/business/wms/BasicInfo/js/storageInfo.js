(function() {
	function measurementUnit() {
		// 左边计量单位树形结构
		initLeftMenu = function() {
			var reqData = {
				IFS : 'WMS_B00026',
				DICT_CD : 'UNT01',
			}
			reqTreeData('/iPlant_ajax', reqData);
		}
		bindTreeData = function(jsonData) { // 树形节点
			var treeConfig = {
				name : 'tre',
				method : 'get',
				parentField : "sT_C_CD	",
				textFiled : "sT_C_NM",
				idFiled : "sT_C_NM",
				data : jsonData,
				onClick : function(node) {
					if (node['sT_C_NM']) {
						var dgrid = $('#factory_tab').datagrid('options');
						if (!dgrid)
							return;
						var Dept = node['sT_C_NM'];
						var reqData = {
							STORE_NAME : Dept,
							IFS : 'WMS_B00020',
							pageIndex : 1,
							pageSize : dgrid.pageSize
						}
						reqGridData('/iPlant_ajax', 'factory_tab', reqData); // 数据网格
					}
				}
			}
			initTree(treeConfig);
			$('#tre').tree(treeConfig);
		}
		// 初始化表格数据
		initGridData = function() {
			var supplier = {
	                url: "/iPlant_ajax",
	                dataType: "JSON",
	                data: {IFS: "WMS_B00030"},
	                successCallBack: function(a) {
	                	var op = a.RESPONSE[0].RESPONSE_DATA;
	                    $.each(op,function(n,obj) {
	                    	dataCompany.push({'value':obj.WAREHOUSE_ID,'text':obj.WAREHOUSE_NAME});
					    });  
	                },
	                errorCallBack: function() {
	                    $.messager.alert("提示", '请联系管理员，查询失败！')
	                }
	            };
				iplantAjaxRequest(supplier)
			var dgrid = $('#factory_tab').datagrid('options');
			var typeData;
			if (!dgrid)
				return;
			var reqData = {
				IFS : 'WMS_B00020',
				UNIT_TYPE : typeData,
				pageIndex : 1,
				pageSize : dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'factory_tab', reqData);
		}
				bindGridData = function(reqData, jsonData) {
					var editRow = undefined;
					var gridList = {
						name : 'factory_tab',
						dataType : 'json',
						columns: [[
					        	   {field: 'STORE_ID',title: '储区代码',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
							{field: 'STORE_NAME',title: '储区名称',width: 300,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					        	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
					        	   {
										field : 'WAREHOUSE_ID',
										title : '所属仓库',
										width : 200,
										align : 'center',
										formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.WAREHOUSE_NAME  || value)+ "</span>";},
										   editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataCompany,required:true}}},
						        	   {field: 'BARCODE',title: '条码',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
							        	   options:{validType:['length[1,100]','specialTextCharacter']}}}, 
					        	   {field: 'ENABLE',title: '是否启用',width: 100,align: 'center',formatter: function(value, row, index) {if(value == 'Y') { return '启用';} else { return '未启用';}},editor:{type:'checkbox',options:{on: 'Y',off: 'N'}}},
							
							{field: 'NOTE',title: '备注',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox', options:{validType:['length[1,25]','specialTextCharacter']}}}, 
							{field: 'CREATER_NAME',title: '创建人',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					        {field: 'CREATE_DATE',title: '创建时间',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
						           {field: 'UPDATER_NAME',title: '修改人',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					 	    {field: 'UPDATE_DATE',title: '修改时间',width: 150,align: 'center'}, 
							    
							]],
						/** 结束编辑模式的操作 */
						onEndEdit : function(index, row) {
							 var edditmp = $(this).datagrid('getEditor', {index: index,field: 'WAREHOUSE_ID'});
					    	 row.WAREHOUSE_ID = $(edditmp.target).combobox('getValue');
					    	 row.WAREHOUSE_NAME = $(edditmp.target).combobox('getText');
						},
						/** 进入编辑模式的操作 */
						onBeforeEdit : function(index, row) {
							showmessage.html('');
							row.editing = true;
							row.edited = false;
							oldRow = JSON.stringify(row).replace(reg, '\"\"');
							$(this).datagrid('refreshRow', index);
						},
						/** 编辑模式进入之后的操作 */
						onAfterEdit : function(index, row) {
							/*debugger*/
							/** 判断是否进行数据变更 */
							var temp = JSON.stringify(row).replace(reg, '\"\"');
							if (temp != oldRow) {
								row.edited = true;
							}
							row.editing = false;
							$(this).datagrid('refreshRow', index);
						},
						onCancelEdit : function(index, row) {
							row.editing = false;
							$(this).datagrid('refreshRow', index);
						},
						
					
						onCancelEdit : function(index, row) {
							row.editing = false;
							$(this).datagrid('refreshRow', index);
						},
						/**单击进入编辑模式*/
					    onClickRow: function (index, row) {
					    	addDatagridEditor(dataGrid,index);
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
		                    		arrInsert.push({SHELF_NAME: inserted[m].SHELF_NAME,STORE_NAME: inserted[m].STORE_NAME,LAYER_NUMBER: inserted[m].LAYER_NUMBER,POSITION_NUMBER: inserted[m].POSITION_NUMBER,BARCODE: inserted[m].BARCODE,
		                    			ENABLE: inserted[m].ENABLE,NOTE: inserted[m].NOTE,STORE_ID: inserted[m].STORE_ID,WAREHOUSE_ID: inserted[m].WAREHOUSE_ID,WAREHOUSE_NAME: inserted[m].WAREHOUSE_NAME,});
		                    	}
		                    	//批量先增
		                        var ajaxInsert = {
		                            url: '/iPlant_ajax',
		                            dataType: 'JSON',
		                            data: {
		                                list: arrInsert,
		                                IFS: 'WMS_B00024'
		                            },
		                            successCallBack: function (data) {
		                            	dataGrid.datagrid('acceptChanges');
		                            	showmessage.html('<font color=red>保存成功！</font>');
		                            	initGridData();
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
		                    			arrUpdate.push({ STORE_ID: updated[m].STORE_ID,STORE_NAME: updated[m].STORE_NAME,WAREHOUSE_ID: updated[m].WAREHOUSE_ID,WAREHOUSE_NAME: 
		                    				updated[m].WAREHOUSE_NAME,BARCODE: updated[m].BARCODE,ENABLE: updated[m].ENABLE,NOTE: updated[m].NOTE,});
		                    		}
		                    	}
		                    	//批量修改
		                        var ajaxUpdate = {
		                            url: '/iPlant_ajax',
		                            dataType: 'JSON',
		                            data: {
		                                list: arrUpdate,
		                                IFS: 'WMS_B00025'
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
				/** 删除行 */
				deleteDataGrid = function() {
					/** 删除行有2中情况，一种新增的还没有保存，一种是原来就有的直接删除 */
					var indexs = datagridEditorRows(), del = [], row;
					if (indexs.length > 0) {
						$.messager
								.confirm(
										"确认框",
										"您确定要删除您所选择的数据?",
										function(a) {
											if (a) {
												for (var j = 0; j < indexs.length; j++) {
													row = dataGrid
															.datagrid('getRows')[indexs[j]];
													if (checkNotEmpty(row.STORE_ID)) {
														var e = {
															url : "/iPlant_ajax",
															dataType : "JSON",
															data : {
																IFS: "WMS_B00023",
																STORE_ID: row.STORE_ID 
															},
															successCallBack : function() {
																// dataGrid.datagrid('deleteRow',
																// indexs[j]);
															}
														};
														dataGrid.datagrid(
																'deleteRow',
																indexs[j]);
														iplantAjaxRequest(e);
													} else {
														/** 判断多个空行只删除最顶上的 */
														del.push(indexs[j]);
													}
												}
												if (del.length > 0) {
													dataGrid
															.datagrid(
																	'deleteRow',
																	del[0]);
												}
												if (del.length == 1) {
													editIndex = undefined;
												}
												showmessage
														.html('<font color=red>删除成功！</font>');
											}
										})
					} else {
						showmessage.html('<font color=red>请选中要删除的数据！</font>');
					}
				},
				/** 插入一个新的空白行 */
				insertDataGrid = function() {
					var row = dataGrid.datagrid('getSelected'), compV = '', compT = '', facV = '', facT = '';
					// var rowEditRows = dataGrid.datagrid('getRows');
					if (dataCompany.length > 0) {
						compV = dataCompany[0].value,
								compT = dataCompany[0].text;
					}
					if (dataFactory.length > 0) {
						facV = dataFactory[0].value, facT = dataFactory[0].text;
					}
					if (row) {
						var index = dataGrid.datagrid('getRowIndex', row);
					} else {
						index = 0;
						editIndex = 0;
					}
					dataGrid.datagrid('insertRow', {
						index : index,
						row : {
							CP_CD : compV,
							CP_NM : compT,
							DICT_IT : facV,
							DICT_IT_NM : facT
						}
					});

					/** 新增一个字段判断是否为新增 */
					var rowEdit = dataGrid.datagrid('getRows')[index];
					rowEdit.editType = 'add';
					dataGrid.datagrid('selectRow', index);
					dataGrid.datagrid('beginEdit', index);
					if (editIndex != index) {
						if (endEditing(dataGrid)) {
							dataGrid.datagrid('selectRow', index).datagrid(
									'beginEdit', index);
							editIndex = index;
						} else {
							dataGrid.datagrid('selectRow', editIndex);
						}
					} else {
						endEditing(dataGrid);
					}
				}

	

	}

	measurementUnit.prototype = {
		init : function() {
			$(function() {
				// 初始化全局变量对象
				dataGrid = $('#factory_tab'), dataCompany = [],dataFactory = [], showmessage = $('#showMessageInfo'),editIndex = undefined, oldRow = undefined,reg = new RegExp("null", "g");
				unitType = 0;
				changeType = 0;
				updataId = [];

				initLeftMenu();
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
			})
		}
	}
	var unit = new measurementUnit();
	unit.init();
})()
function conditionQuery(){
	var dgrid = dataGrid.datagrid('options');
	var storageCd=$("#storage_CD").val();
	var storageNm=$("#storage_NM").val();
	var reqData = {
			IFS: 'WMS_B00020',
			pageIndex: 1,
			pageSize: dgrid.pageSize,
			STORE_ID:storageCd,
			STORE_NAME:storageNm
		}
		reqGridData('../iPlant_ajax', 'factory_tab', reqData);
}