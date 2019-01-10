/* 启动时加载 */
/*
 */
(function() {
	function eqReuireInfo() {
		initGridData = function() {
			var dgrid = $('#setReuire_tab').datagrid('options');
			if (!dgrid) return;
			var eqReuireData = {
				IFS: 'T000056',
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'setReuire_tab', eqReuireData);
		}, dataArr = {};
		bindGridData = function(eqReuireData, jsonData) {
			var grid = {
				name: 'setReuire_tab',
				dataType: 'json',
				singleSelect:true,
				columns: [
					[{
						field: 'RQ_SN',
						title: '需求编号',
						width: 130,
						align: 'center'						
					}, {
						field: 'IT_NM',
						title: '项目名',
						width: 200,
						align: 'center',
						editor: {
							type: "text",
							options: {
								required: false
							}
						}
					}, {
						field: 'EF_DC',
						title: '设备功能描述',
						width: 100,
						align: 'center',
						editor: {
							type: "text",
							options: {
								required: false
							}
						}
					}, {
						field: 'ET_RM',
						title: '设备技术要求',
						width: 150,
						align: 'center',
						editor: {
							type: "text",
							options: {
								required: false
							}
						}
					}, {
						field: 'ET_SP',
						title: '供应商',
						width: 150,
						align: 'center',
						editor: {
							type: "text",
							options: {
								required: false
							}
						}
					}, {
						field: 'RQ_CN',
						title: '需求数量',
						width: 150,
						align: 'center',
						editor: {
							type: "text",
							options: {
								required: false
							}
						}
					}, {
						field: 'CK_TU',
						title: '审核状态',
						width: 150,
						align: 'center',
						formatter: function(val, rec) {
							if (val == 0) {
								return "未审核";
							} else {
								return "已审核";
							}
						}
					}, {
						field: 'CK_ID',
						title: '审核人',
						width: 150,
						align: 'center'
					}, {
						field: 'CK_DT',
						title: '审核时间',
						width: 150,
						align: 'center'
					}, {
						field: 'IS_TU',
						title: '样机状态',
						width: 100,
						align: 'center'						
					}, {
						field: 'CRT_ID',
						title: '创建人',
						width: 150,
						align: 'center'
					}, {
						field: 'CRT_DT',
						title: '创建时间',
						width: 200,
						align: 'center'
					}, {
						field: 'UPT_ID',
						title: '修改人',
						width: 150,
						align: 'center'
					}, {
						field: 'UPT_DT',
						title: '修改时间',
						width: 200,
						align: 'center'
					}]
				],
				onClickRow: function(index, row) {
					$('#setReuire_tab').datagrid("beginEdit", index);
				},
				onBeforeEdit: function(index, row) {
					$("#showMessageInfo").html('');
				},
				/**编辑模式进入之后的操作*/
				onAfterEdit: function(index, row) { /**判断是否进行数据变更*/
					row.edited = true;
				}
			}
			initGridView(eqReuireData, grid);
			$('#setReuire_tab').datagrid('loadData', jsonData);
		}, 
		
		clean = function(){//清空
			$("#cxEquipCode").textbox('setValue');
			$("#cxStartTime1").datetimebox('setValue');
			$("#cxStartTime2").datetimebox('setValue');
		}
		
		getDataBySearch = function() {
			var dgrid = $('#setReuire_tab').datagrid('options');
			if (!dgrid) return;
			var repairCode = $('#cxEquipCode').textbox('getValue'); //項目名
			var cxStartTime1 = $('#cxStartTime1').textbox('getValue'); //開始時間
			var cxStartTime2 = $('#cxStartTime2').textbox('getValue'); //结束时间
			var reqData = {
				IT_NM: repairCode,
				ST_DATE: cxStartTime1,
				END_DATE: cxStartTime2,
				IFS: 'T000056',
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'setReuire_tab', reqData);
		}, 
		deleterepair = function() {
			var checkedItems = $('#setReuire_tab').datagrid('getSelections');
			if (checkedItems.length < 1) {
				$.messager.alert('提示', '请选择一条数据进行删除');
				return;
			}
			/*确认提示框*/
			var delCnt = 0;
			$.messager.confirm('确认框', '您确定要删除您所选择的数据?', function(r) {
				if (r == true) {
					$.each(checkedItems, function(index, item) {
						delCnt++;
						var ajaxParam = {
							url: '/iPlant_ajax',
							dataType: 'JSON',
							data: {
								IFS: 'T000059',
								RQ_SN: item.RQ_SN
							},
							successCallBack: function(data) {
								if (delCnt == checkedItems.length) {
									if (data.RESPONSE["0"].RESPONSE_HDR.MSG_CODE == '0') {
										$.messager.alert('提示', '删除成功!', '', function() {
											initGridData();
										});
									} else {
										$.messager.alert('提示', '删除失败,此数据正在使用!')
									}

								}
							},
							errorCallBack: function(data) {
								if (delCnt == checkedItems.length) {
									$.messager.alert('提示', '删除失败,服务器无响应!');
								}
							}

						};
						iplantAjaxRequest(ajaxParam);
					});
				}
			});
		},
		saveeqReuireInfo = function() {
			saveDataGrid('setReuire_tab', 'T000057', 'T000058', 'showMessageInfo');
		}, 
		updaterepair = function() {
			var row = $('#setReuire_tab').datagrid("getSelected");
			if (row == null) {
				$.messager.alert('提示', '请选择一条数据进行审核!');
				return;
			}
			if (row.CK_TU == '1') {
				$.messager.alert('提示', '这条数据已审核!');
				return;
			}		
			var ajaxParam = {
				url: '/iPlant_ajax',
				dataType: 'JSON',
				data: {
					IFS: 'T000060',
					RQ_SN: row.RQ_SN
				},
				successCallBack: function(data) {
					$.messager.alert('提示', '审核成功!');
					initGridData();
				},
				errorCallBack: function(data) {
					if (delCnt == checkedItems.length) {
						$.messager.alert('提示', '删除失败,服务器无响应!');
					}
				}

			};
			iplantAjaxRequest(ajaxParam);
		}
	}
	eqReuireInfo.prototype = {
		init: function() {
			$(function() {
				initGridData();
				var CompanyOpttype;
				$('#btnSearch').click(function() {
					getDataBySearch();
				});
				$('#btnSave').click(function() {
					saveeqReuireInfo();
				});
				$('#btnAdd').click(function() {
					iplantAjaxRequest({
						url : '/iPlant_ajax',
						data : {
							IFS : 'T000035',
						},
						successCallBack : function(data) {
							var needata = data.RESPONSE[0].RESPONSE_DATA[0].RQ_SN;
							$('#setReuire_tab').datagrid('insertRow',{
								index: 0,	// 索引从0开始
								row: 
								{									
									RQ_SN: needata,
									CK_TU: 0,
									IS_TU: 0
								}
							});
							$('#setReuire_tab').datagrid("beginEdit", 0);
						}
					});
				})
				$('#btnDelete').click(function() {
					deleterepair();
				});
				$('#btnset').click(function() {
					updaterepair();
				})
				$('.close').click(function() {
					$('#enditTab').dialog('close');
				})
				$('.closeCustoms').click(function() {
					$('#searchCondition').dialog('close');
				});
			});
		}
	}
	var eqReuire = new eqReuireInfo();
	eqReuire.init();
})();