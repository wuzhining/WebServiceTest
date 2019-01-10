(function() {
	function measurementUnit() {
				// 左边计量单位树形结构
				initLeftMenu = function() {
					var reqData = {
						IFS : 'WMS_B00027',
						//DICT_CD : 'UNT01',
					}
					reqTreeData('/iPlant_ajax', reqData);
				},
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
								var dgrid = $('#factory_tab').datagrid(
										'options');
								if (!dgrid)
									return;
								var Dept = node['sT_C_NM'];
								var reqData = {
									STORE_NAME : Dept,
									IFS : 'WMS_B000018',
									pageIndex : 1,
									pageSize : dgrid.pageSize
								}
								reqGridData('/iPlant_ajax', 'factory_tab',
										reqData); // 数据网格
							}
						}
					}
					initTree(treeConfig);
					$('#tre').tree(treeConfig);
				},
				// 初始化表格数据
				initGridData = function() {
					var supplier = {
						url : "/iPlant_ajax",
						dataType : "JSON",
						data : {
							IFS : "WMS_B00031"
						},
						successCallBack : function(a) {
							var op = a.RESPONSE[0].RESPONSE_DATA;
							$.each(op, function(n, obj) {
								dataCompany.push({
									'value' : obj.STORE_ID,
									'text' : obj.STORE_NAME
								});
							});
						},
						errorCallBack : function() {
							$.messager.alert("提示", '请联系管理员，查询失败！')
						}
					};
					iplantAjaxRequest(supplier)
					// 货架类型
					var strongnews = {
						url : "/iPlant_ajax",
						dataType : "JSON",
						data : {
							IFS : 'D000008',
							DICT_CD : 'SHF01'
						},
						successCallBack : function(a) {
							var op = a.RESPONSE[0].RESPONSE_DATA;
							$.each(op, function(n, obj) {
								datashelfID.push({
									'value' : obj.DICT_IT,
									'text' : obj.DICT_IT_NM
								});
							});
						},
						errorCallBack : function() {
							$.messager.alert("提示", '请联系管理员，查询失败！')
						}
					};
					iplantAjaxRequest(strongnews)

					var dgrid = $('#factory_tab').datagrid('options');
					var typeData;
					if (!dgrid)
						return;
					var reqData = {
						IFS : 'WMS_B000018',
						UNIT_TYPE : typeData,
						pageIndex : 1,
						pageSize : dgrid.pageSize
					}
					reqGridData('/iPlant_ajax', 'factory_tab', reqData);
				},
				bindGridData = function(reqData, jsonData) {
					var editRow = undefined;
					var gridList = {
						name : 'factory_tab',
						dataType : 'json',
						columns : [ [
								{
									field : 'SHELF_ID',
									title : '货架代码',
									width : 200,
									align : 'center',
									formatter : function(value) {
										if (checkNotEmpty(value))
											return "<span title='" + value
													+ "'>" + value + "</span>";
									}
								},
								{
									field : 'SHELF_NAME',
									title : '货架名称',
									width : 200,
									align : 'center',
									formatter : function(value) {
										if (checkNotEmpty(value))
											return "<span title='" + value
													+ "'>" + value + "</span>";
									},
									editor : {
										type : 'validatebox',
										options : {
											required : true,
											validType : [ 'length[1,30]',
													'specialTextCharacter' ]
										}
									}
								},
								{
									field : 'STORE_ID',
									title : '所属储区',
									width : 200,
									align : 'center',
									formatter : function(value, row) {
										if (checkNotEmpty(value)) {
											return "<span title='" + value
													+ "'>"
													+ (row.STORE_NAME || value)
													+ "</span>";
										}
									},
									editor : {
										type : 'combobox',
										options : {
											valueField : 'value',
											textField : 'text',
											data : dataCompany,
											required : true
										}
									}
								},
								{
									field : 'SHELF_TYPE',
									title : '货架类型',
									width : 200,
									align : 'center',
									formatter : function(value, row) {
										if (checkNotEmpty(value)) {
											return "<span title='" + value
													+ "'>"
													+ (row.DICT_IT_NM || value)
													+ "</span>";
										}
									},
									editor : {
										type : 'combobox',
										options : {
											valueField : 'value',
											textField : 'text',
											data : datashelfID,
											required : true
										}
									}
								},
								{
									field : 'LAYER_NUMBER',
									title : '货架层数',
									width : 200,
									align : 'center',
									formatter : function(value) {
										if (checkNotEmpty(value))
											return "<span title='" + value
													+ "'>" + value + "</span>";
									},
									editor : {
										type : 'validatebox',
										options : {
											required : true,
											validType : [ 'length[1,30]',
													'specialTextCharacter' ]
										}
									}
								},
								{
									field : 'COL_NUMBER',
									title : '货架列数',
									width : 200,
									align : 'center',
									formatter : function(value) {
										if (checkNotEmpty(value))
											return "<span title='" + value
													+ "'>" + value + "</span>";
									},
									editor : {
										type : 'validatebox',
										options : {
											required : true,
											validType : [ 'length[1,30]',
													'specialTextCharacter' ]
										}
									}
								},
								{
									field : 'POSITION_NUMBER',
									title : '货位数量',
									width : 100,
									align : 'center',
								},
								{
									field : 'BARCODE',
									title : '条码',
									width : 100,
									align : 'center',
									formatter : function(value) {
										if (checkNotEmpty(value))
											return "<span title='" + value
													+ "'>" + value + "</span>";
									},
									editor : {
										type : 'validatebox',
										options : {
											validType : [ 'length[1,100]',
													'specialTextCharacter' ]
										}
									}
								},
								{
									field : 'ENABLE',
									title : '是否启用',
									width : 100,
									align : 'center',
									formatter : function(value, row, index) {
										if (value == 'Y') {
											return '启用';
										} else {
											return '未启用';
										}
									},
									editor : {
										type : 'checkbox',
										options : {
											on : 'Y',
											off : 'N'
										}
									}
								},
								{
									field : 'NOTE',
									title : '备注',
									width : 100,
									align : 'center',
									formatter : function(value) {
										if (checkNotEmpty(value))
											return "<span title='" + value
													+ "'>" + value + "</span>";
									},
									editor : {
										type : 'validatebox',
										options : {
											validType : [ 'length[1,25]',
													'specialTextCharacter' ]
										}
									}
								},
								{
									field : 'CREATER_NAME',
									title : '创建人',
									width : 100,
									align : 'center',
									formatter : function(value) {
										if (checkNotEmpty(value))
											return "<span title='" + value
													+ "'>" + value + "</span>";
									}
								},
								{
									field : 'CREATE_DATE',
									title : '创建名称',
									width : 150,
									align : 'center',
									formatter : function(value) {
										if (checkNotEmpty(value))
											return "<span title='" + value
													+ "'>" + value + "</span>";
									}
								},
								{
									field : 'UPDATER_NAME',
									title : '修改人',
									width : 100,
									align : 'center',
									formatter : function(value) {
										if (checkNotEmpty(value))
											return "<span title='" + value
													+ "'>" + value + "</span>";
									}
								}, {
									field : 'UPDATE_DATE',
									// onSortColumn:'sort',
									title : '修改时间',
									width : 150,
									align : 'center'
								}, ] ],
						/** 结束编辑模式的操作 */
						onEndEdit : function(index, row) {
							var edditmp = $(this).datagrid('getEditor', {
								index : index,
								field : 'STORE_ID'
							});
							row.POSITION_NUMBER = parseInt(row.COL_NUMBER)* parseInt(row.LAYER_NUMBER);
							row.STORE_ID = $(edditmp.target).combobox(
									'getValue');
							row.STORE_NAME = $(edditmp.target).combobox(
									'getText');
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
							/* debugger */
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
						/** 单击进入编辑模式 */
						onClickRow : function(index, row) {
							// var b = field:'LAYER_NUMBER',
							$('#field:LAYER_NUMBER').disable = true;
							addDatagridEditor(dataGrid, index);
						}
					}
					initGridView(reqData, gridList);
					dataGrid.datagrid('loadData', jsonData);
				},

				/** 批量新增和修改的保存 */
				saveDataGrid = function() {
					if (endEditing(dataGrid)) {
						// 判断后变更数据
						if (dataGrid.datagrid('getChanges').length) {
							var inserted = dataGrid.datagrid('getChanges',
									"inserted");
							var updated = dataGrid.datagrid('getChanges',
									"updated");
							var deleted = dataGrid.datagrid('getChanges',
									"deleted");
							/** 装载数据 */
							var arrInsert = new Array(), arrUpdate = new Array();
							if (inserted.length > 0) {
								for (var m = 0; m < inserted.length; m++) {
									arrInsert
											.push({
												SHELF_ID : inserted[m].SHELF_ID,
												SHELF_NAME : inserted[m].SHELF_NAME,
												STORE_ID : inserted[m].STORE_ID,
												STORE_NAME : inserted[m].STORE_NAME,
												LAYER_NUMBER : inserted[m].LAYER_NUMBER,
												POSITION_NUMBER : inserted[m].POSITION_NUMBER,
												BARCODE : inserted[m].BARCODE,
												SHELF_TYPE : inserted[m].SHELF_TYPE,
												COL_NUMBER : inserted[m].COL_NUMBER,
												ENABLE : inserted[m].ENABLE,
												NOTE : inserted[m].NOTE,
											});
								}
								// 批量先增
								var ajaxInsert = {
									url : '/iPlant_ajax',
									dataType : 'JSON',
									data : {
										list : arrInsert,
										IFS : 'WMS_B00029'
									},
									successCallBack : function(data) {
										dataGrid.datagrid('acceptChanges');
										showmessage
												.html('<font color=red>保存成功！</font>');
										conditionQuery();
										return;
									},
									errorCallBack : function(data) {
										showmessage
												.html('<font color=red>保存失败！</font>');
										return;
									}
								};
								iplantAjaxRequest(ajaxInsert);
							}
							if (updated.length > 0) {
								for (var m = 0; m < updated.length; m++) {
									if (updated[m].edited) {
										arrUpdate.push({
													SHELF_ID : updated[m].SHELF_ID,
													SHELF_NAME : updated[m].SHELF_NAME,
													STORE_ID : updated[m].STORE_ID,
													STORE_NAME : updated[m].STORE_NAME,
													LAYER_NUMBER : updated[m].LAYER_NUMBER,
													POSITION_NUMBER : updated[m].POSITION_NUMBER,
													BARCODE : updated[m].BARCODE,
													SHELF_TYPE : updated[m].SHELF_TYPE,
													COL_NUMBER : updated[m].COL_NUMBER,
													ENABLE : updated[m].ENABLE
													/*,
													NOTE : updated[m].NOTE*/
												});
									}
								}
								// 批量修改
								var ajaxUpdate = {
									url : '/iPlant_ajax',
									dataType : 'JSON',
									data : {
										list : updated,
										IFS : 'WMS_B00022'
									},
									successCallBack : function(data) {
										dataGrid.datagrid('acceptChanges');
										// editable='false';
										showmessage
												.html('<font color=red>保存成功！</font>');
										conditionQuery();
										return;
									},
									errorCallBack : function(data) {
										showmessage
												.html('<font color=red>保存失败！</font>');
										return;
									}
								};
								iplantAjaxRequest(ajaxUpdate);
							}
						} else {
							showmessage.html('<font color=red>没有进行变更！</font>');
						}
					} else {
						showmessage.html('<font color=red>请输入必填项！</font>');
					}
				},

				/** 删除行 */
				deleteDataGrid = function() {
					/** 删除行有2中情况，一种新增的还没有保存，一种是原来就有的直接删除 */
					var indexs = datagridEditorRows(), del = [], row;
					var delCnt = 0;
					var exceptionCode = '';
					if (indexs.length > 0) {
						$.messager
								.confirm(
										"确认框",
										"您确定要删除您所选择的数据?",
										function(a) {
											if (a == true) {
												row = dataGrid
														.datagrid('getRows')[indexs[0]];
												var ajaxParam = {
													url : '/iPlant_ajax',
													dataType : 'JSON',
													data : {

														IFS : 'WMS_B00049',
														SHELF_ID : row.SHELF_ID
													},
													successCallBack : function(data) {
														if (data.RESPONSE.length != 0
																&& data.RESPONSE["0"].RESPONSE_DATA[0].STATUS > 0) {
															exceptionCode += ','+ row.SHELF_ID;
															exceptionCode = exceptionCode.substring(1);
															if (exceptionCode) {
																susMsg = '货架'
																		+ exceptionCode
																		+ '被使用，不能删除，请联系管理员';
															}
															if ($.messager.alert('提示',susMsg)) {
																initGridData();
															}
														} else {
															if (checkNotEmpty(row.STORE_ID)) {
																var e = {
																	url : "/iPlant_ajax",
																	dataType : "JSON",

																	data : {

																		IFS : "WMS_B000019",
																		SHELF_ID : row.SHELF_ID
																	},
																	successCallBack : function() {
																	}
																};
																dataGrid.datagrid('deleteRow',indexs[0]);
																iplantAjaxRequest(e);
															} else {
																/** 判断多个空行只删除最顶上的 */
																del.push(indexs[0]);
															}
															showmessage.html('<font color=red style=top>删除成功！</font>');
															initGridData();
														}

													}

												};
												iplantAjaxRequest(ajaxParam);
												if (del.length > 0) {
													dataGrid.datagrid('deleteRow',del[0]);
												}
												if (del.length == 1) {
													editIndex = undefined;
												}
											}
										})
					} else {
						showmessage.html('<font color=red>请选中要删除的数据！</font>');
					}
				},

				/** 插入一个新的空白行 */
				insertDataGrid = function() {
					var row = dataGrid.datagrid('getSelected'), compV = '', compT = '', sfV = '', sfT = '', sfVID = '';
//					getId();
					var datashelfid2 = [];
					iplantAjaxRequest({
						url : '/iPlant_ajax',
						data : {
							IFS : 'WMS_B00050'
						},
						successCallBack : function(data) {
							var rowCollection = createSourceObj(data);
							for (var i = 0; i < rowCollection.length; i++) {
								datashelfid2.push({
									"value" : rowCollection[i].SHELF_ID,
									"text" : rowCollection[i].SHELF_ID
								});
							};
							if (dataCompany.length > 0) {
								compV = dataCompany[0].value,
										compT = dataCompany[0].text;
							};
							if (datashelfID.length > 0) {
								sfV = datashelfID[0].value, sfT = datashelfID[0].text;
							};
							if (datashelfid2.length > 0) {
								sfVID = datashelfid2[0].value;
							};
							if (row) {
								var index = dataGrid.datagrid('getRowIndex', row);
							} else {
								index = 0;
								editIndex = 0;
							};
							
							dataGrid.datagrid('insertRow', {
								index : index,
								row : {
									CP_CD : compV,
									CP_NM : compT,
									DICT_IT : sfV,
									DICT_IT_NM : sfT,
									SHELF_ID : sfVID
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
							};
						}
					});
				},
				

				getId = function() {
					var datashelfid2 = [];
					iplantAjaxRequest({
						url : '/iPlant_ajax',
						data : {
							IFS : 'WMS_B00050'
						},
						successCallBack : function(data) {
							var rowCollection = createSourceObj(data);
							for (var i = 0; i < rowCollection.length; i++) {
								datashelfid2.push({
									"value" : rowCollection[i].SHELF_ID,
									"text" : rowCollection[i].SHELF_ID
								});
							}
						}
					});
				}
	}


	measurementUnit.prototype = {
		init : function() {
			$(function() {
				// 初始化全局变量对象
				dataGrid = $('#factory_tab'), dataCompany = [],
						datashelfID = [], dataFactory = [], datashelfid2 = [],
						showmessage = $('#showMessageInfo'),
						editIndex = undefined, oldRow = undefined,
						reg = new RegExp("null", "g");
				unitType = 0;
				changeType = 0;
				updataId = [];
				initLeftMenu();
				initGridData();
				// 获取工厂类别下拉
				$('.add').click(function() {
					insertDataGrid();
				});

				$('.delete').click(function() {
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
})();
function conditionQuery() {
	var dgrid = dataGrid.datagrid('options');
	var storageCd = $("#storage_CD").val();
	var storageNm = $("#storage_NM").val();
	var reqData = {
		IFS : 'WMS_B000018',
		pageIndex : 1,
		pageSize : dgrid.pageSize,
		SHELF_ID : storageCd,
		SHELF_NAME : storageNm
	}
	reqGridData('../iPlant_ajax', 'factory_tab', reqData);
}