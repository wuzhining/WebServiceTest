(function() {
	function EquipRepair() {
				getSelectedCondtion = function() {
					// 维修单号
					iplantAjaxRequest({
						url : '/iPlant_ajax',
						data : {
							IFS : 'T000033',
						},
						successCallBack : function(data) {
							var array = new Array();
							array.push({
								"id" : "",
								"text" : "全部"
							});
							var rowCollection = createSourceObj(data);
							for (var i = 0; i < rowCollection.length; i++) {
								array.push({
									"id" : rowCollection[i].RP_CD,
									"text" : rowCollection[i].RP_CD
								});
							}

							// 查询
							$('#cxRepairNum').combobox({
								data : array,
								valueField : 'id',
								textField : 'text'
							});
						}
					});

					// 响应人
					iplantAjaxRequest({
						url : '/iPlant_ajax',
						data : {
							IFS : 'D000041'
						},
						successCallBack : function(data) {
							var array = new Array();
							var rowCollection = createSourceObj(data);
							for (var i = 0; i < rowCollection.length; i++) {
								array.push({
									"id" : rowCollection[i].EMP_CD,
									"text" : rowCollection[i].EMP_NM
								});
							}
							// 编辑时
							$('#cxXYPerson').combobox({
								data : array,
								valueField : 'id',
								textField : 'text'
							});
						}
					});

					// 单据状态
					iplantAjaxRequest({
						url : '/iPlant_ajax',
						data : {
							IFS : 'D000008',
							DICT_CD : 'RDJ01'
						},
						successCallBack : function(data) {
							var array = new Array();
							array.push({
								"id" : "",
								"text" : "全部"
							});
							var rowCollection = createSourceObj(data);
							for (var i = 0; i < rowCollection.length; i++) {
								array.push({
									"id" : rowCollection[i].DICT_IT,
									"text" : rowCollection[i].DICT_IT_NM
								});
							}
							// 编辑时
							$('#cxCDType').combobox({
								data : array,
								valueField : 'id',
								textField : 'text'
							});
						}
					});

					// 设备编号
					iplantAjaxRequest({
						url : '/iPlant_ajax',
						data : {
							IFS : 'B000029'
						},
						successCallBack : function(data) {
							var array = new Array();
							var rowCollection = createSourceObj(data);
							var array = new Array();
							array.push({
								"id" : "",
								"text" : "全部"
							});
							for (var i = 0; i < rowCollection.length; i++) {
								array.push({
									"id" : rowCollection[i].ET_CD,
									"text" : rowCollection[i].ET_NM
								});
							}

							// 查询
							$('#cxEquipCode').combobox({
								data : array,
								valueField : 'id',
								textField : 'text'
							});

						}
					});
				},

				initGridData = function() {
					
					// 维修单类型
					iplantAjaxRequest({
						url : '/iPlant_ajax',
						data : {
							IFS : 'D000008',
							DICT_CD : 'CRP01',
						},
						successCallBack : function(data) {
							var rowCollection = createSourceObj(data);
							for (var i = 0; i < rowCollection.length; i++) {
								dataReqType.push({
									"id" : rowCollection[i].DICT_IT,
									"text" : rowCollection[i].DICT_IT_NM
								});
								IdataReqType[rowCollection[i].DICT_IT]=rowCollection[i].DICT_IT_NM;
							}
							
							//tab
							$('#comRepairType').combobox({
								data : dataReqType,
								valueField : 'id',
								textField : 'text'
							});
						}
					});
					
					// 设备类型
					iplantAjaxRequest({
						url : '/iPlant_ajax',
						data : {
							IFS : 'D000008',
							DICT_CD : 'CEM01',
						},
						successCallBack : function(data) {
							var rowCollection = createSourceObj(data);
							for (var i = 0; i < rowCollection.length; i++) {
								dataEqupType.push({
									"id" : rowCollection[i].DICT_IT,
									"text" : rowCollection[i].DICT_IT_NM
								});
								IdataEqupType[rowCollection[i].DICT_IT]=rowCollection[i].DICT_IT_NM;
							}
							
							//tab
							$('#comEquipType').combobox({
								data : dataEqupType,
								valueField : 'id',
								textField : 'text'
							});
						}
					});
					// 设备编号
					iplantAjaxRequest({
						url : '/iPlant_ajax',
						data : {
							IFS : 'B000029'
						},
						successCallBack : function(data) {
							var rowCollection = createSourceObj(data);
							for (var i = 0; i < rowCollection.length; i++) {
								dataEqupNum.push({	
									"id" : rowCollection[i].ET_CD,
									"text" : rowCollection[i].ET_NM
								});
								IdataEqupNum[rowCollection[i].ET_CD]=rowCollection[i].ET_NM;
							}
							
							//tab
							$('#comEquipmentCode').combobox({
								data : dataEqupNum,
								valueField : 'id',
								textField : 'text'
							});
						}
					});
					
					// 问题原因,问题描述,知识库代码，知识库名称
					iplantAjaxRequest({
						url : '/iPlant_ajax',
						data : {
							IFS : 'B000041'
						},
						successCallBack : function(data) {
							var rowCollection = createSourceObj(data);
							for (var i = 0; i < rowCollection.length; i++) {
								dataEqupNum.push({	
									"id" : rowCollection[i].KB_IU,
									"text" : rowCollection[i].KB_IU
								});//原因
								
								dataEqupNums.push({	
									"id" : rowCollection[i].KB_PD,
									"text" : rowCollection[i].KB_PD
								});//描述
								
								dataEqupNum1.push({	
									"id" : rowCollection[i].KB_CD,
									"text" : rowCollection[i].KB_CD
								});//知识库代码
								
								dataEqupNum2.push({	
									"id" : rowCollection[i].KB_NM,
									"text" : rowCollection[i].KB_NM
								});//知识库名称
								IdataEqupNum[rowCollection[i].KB_IU]=rowCollection[i].KB_IU;
								IdataEqupNums[rowCollection[i].KB_PD]=rowCollection[i].KB_PD;
								IdataEqupNum1[rowCollection[i].KB_CD]=rowCollection[i].KB_CD;
								IdataEqupNum1[rowCollection[i].KB_NM]=rowCollection[i].KB_NM;
							}
							
							//tab
							$('#problemDesc').combobox({ //描述
								data : dataEqupNums,
								valueField : 'id',
								textField : 'text'
							});
							
							//tab
							$('#problemCause').combobox({ //原因
								data : dataEqupNum,
								valueField : 'id',
								textField : 'text'
								
							});
							
							//tab
							$('#repositoryCode').combobox({ //知识库代码
								data : dataEqupNum1,
								valueField : 'text',
								textField : 'id'
							});
							
							//tab
							$('#repositoryName').combobox({ //知识库名称
								data : dataEqupNum2,
								valueField : 'id',
								textField : 'text'
							});
						}
					});
					
					
					
					// 维修办法
					iplantAjaxRequest({
						url : '/iPlant_ajax',
						data : {
							IFS : 'B000041',
							USE_YN : 'Y',
						},
						successCallBack : function(data) {
							var rowCollection = createSourceObj(data);
							for (var i = 0; i < rowCollection.length; i++) {
								dataReqWay.push({
									"id" : rowCollection[i].DICT_IT,
									"text" : rowCollection[i].KB_SC
								});
								IdataReqWay[rowCollection[i].DICT_IT]=rowCollection[i].KB_SC;
							}
							//tab
							$('#comRepairFun').combobox({
								data : dataReqWay,
								valueField : 'id',
								textField : 'text'
							});
						}
					});
					
					$('#comIsStress').combobox({
						data : dataIsImp,
						valueField : 'id',
						textField : 'text'
					});

					var dgrid = $('#' + 'repairinfo_tab').datagrid('options');
					if (!dgrid)
						return;
					var reqData = {
						IFS : 'T000025',
						pageIndex : 1,
						pageSize : dgrid.pageSize
					}
					reqGridData('/iPlant_ajax', 'repairinfo_tab', reqData);
					ChangeColor();
				},

				ChangeColor = function() {
					$('#' + 'repairinfo_tab').datagrid({
						rowStyler : function(index, row) {
							if (row.CK_STATUS == 1) {
								return 'background-color:#e2edda;';
							}
						}
					});
				},

				onSelect = function(d) {
					var issd = this.id == 'queryStartDate', queryStartDate = issd ? d
							: new Date($('#queryStartDate').datebox('getValue')), queryEndDate = issd ? new Date(
							$('#queryEndDate').datebox('getValue'))
							: d;
					if (queryEndDate < queryStartDate) {
						$('#queryEndDate').datebox('setValue', '').datebox(
								'hidePanel');
						$.messager.alert('错误', '结束日期小于开始日期');
					}
				},
				setDataNull = function(){
					$('#enditTab').dialog('close');
				}
				
				getDataByConditiononce = function() {
					var dgrid = $('#' + 'repairinfo_tab').datagrid('options');
					var cxRepairNum = $('#cxRepairNum').combobox('getValue');
					var cxEquipCode = $('#cxEquipCode').combobox('getValue');
					var cxXYPerson = $('#cxXYPerson').combobox('getValue');
					var cxCDType = $('#cxCDType').combobox('getValue');
					var cxstartTimeB = $('#cxStartTime1').datebox('getValue');
					var cxstartTimeE = $('#cxStartTime2').datebox('getValue');
					var cxEndTimeB = $('#cxEndTime1').datebox('getValue');
					var cxEndTimeE = $('#cxEndTime2').datebox('getValue');
					var cxCreateTimeB = $('#cxCreateTime1').datebox('getValue');
					var cxCreateTimeE = $('#cxCreateTime2').datebox('getValue');
					var reqData = {
						RP_CD : cxRepairNum,
						ET_CD : cxEquipCode,
						RSP_EMP : cxXYPerson,
						DICT_IT_NM_02 : cxCDType,
						BGN_DT_B : cxstartTimeB,
						BGN_DT_E : cxstartTimeE,
						END_DT_B : cxEndTimeB,
						END_DT_E : cxEndTimeE,
						CRT_DT_B : cxCreateTimeB,
						CRT_DT_E : cxCreateTimeE,
						IFS : 'T000025',
						pageIndex : 1,
						pageSize : dgrid.pageSize
					};
					reqGridData('/iPlant_ajax', 'repairinfo_tab', reqData);
				},

				bindGridData = function(reqData, jsonData) {
					var grid = {
						name : 'repairinfo_tab',
						dataType : 'json',
						columns : [ [
								{
									field : 'RP_CD',
									title : '维修单号',
									width : 150,
									align : 'center',
									formatter : function(value) {
										if (checkNotEmpty(value))
											return "<span title='" + value
													+ "'>" + value + "</span>";
									}
								},
								{
									field : 'DICT_IT_NM_01',
									title : '维修单类型',
									width : 200,
									align : 'center',
									formatter : function(value, row) {
										if (checkNotEmpty(value))
											return IdataReqType[value];
									},
									editor : {
										type : 'combobox',
										options : {
											valueField :'id',
											textField : 'text',
											data : dataReqType
										}
									}
								},
								{
									field : 'ET_TY',
									title : '设备类型',
									width : 100,
									align : 'center',
									formatter : function(value, row) {
										if (checkNotEmpty(value))
											return IdataEqupType[value];
									},
									editor : {
										type : 'combobox',
										options : {
											valueField : 'id',
											textField : 'text',
											data : dataEqupType
										}
									}
								},
								{
									field : 'ET_CD',
									title : '设备编码',
									width : 100,
									align : 'center',
									formatter : function(value, row) {
										if (checkNotEmpty(value))
											return IdataEqupNum[value];
									},
									editor : {
										type : 'combobox',
										options : {
											valueField : 'id',
											textField : 'text',
											data : dataEqupNum
										}
									}
								},
								{
									field : 'IS_UR',
									title : '是否紧急',
									width : 100,
									align : 'center',
									formatter : function(value, row) {
										if (checkNotEmpty(value)){
											if(value=="1"){
												return "紧急";
											}else{
												return "不紧急";
											}
										}
//											return "<span title='" + value
//													+ "'>" + value
//													+ "</span>";
									},
									editor : {
										type : 'combobox',
										options : {
											valueField : 'id',
											textField : 'text',
											data : dataIsImp,
//											required : true
										}
									}
								},
								{
									field : 'KB_SC',
									title : '维修办法',
									width : 200,
									align : 'center',
									formatter : function(value, row) {
										if (checkNotEmpty(value))
											return IdataReqWay[value];
									},
									editor : {
										type : 'combobox',
										options : {
											valueField : 'id',
											textField : 'text',
											data : dataReqWay,
//											required : true
										}
									}
								},
								{
									field : 'RE_CN',
									title : '维修内容',
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
//											required : true,
											validType : [ 'length[1,15]',
													'specialTextCharacter' ]
										}
									}
								},
								{
									field : 'KB_IU',
									title : '问题原因',
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
//											required : true,
											validType : [ 'length[1,15]',
													'specialTextCharacter' ]
										}
									}
								},
								{
									field : 'KB_PD',
									title : '问题描述',
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
//											required : true,
											validType : [ 'length[1,15]',
													'specialTextCharacter' ]
										}
									}
								},
								{
									field : 'RSP_DT',
									title : '响应时间',
									width : 200,
									align : 'center',
									formatter : function(value) {
										if (checkNotEmpty(value))
											return "<span title='" + value
													+ "'>" + value + "</span>";
									}
								},
								{
									field : 'RSP_EMP',
									title : '响应人员',
									width : 200,
									align : 'center',
									formatter : function(value) {
										if (checkNotEmpty(value))
											return "<span title='" + value
													+ "'>" + value + "</span>";
									}
								},
								{
									field : 'DICT_IT_NM_02',
									title : '维修状态',
									width : 100,
									align : 'center',
									formatter : function(value) {
										if (checkNotEmpty(value))
											return "<span title='" + value
													+ "'>" + value + "</span>";
									}
								},
								{
									field : 'RP_EMP',
									title : '维修人员',
									width : 100,
									align : 'center',
									formatter : function(value) {
										if (checkNotEmpty(value))
											return "<span title='" + value
													+ "'>" + value + "</span>";
									}
								},
								{
									field : 'BGN_DT',
									title : '开始时间',
									width : 100,
									align : 'center',
									formatter : function(value) {
										if (checkNotEmpty(value))
											return "<span title='" + value
													+ "'>" + value + "</span>";
									}
								},
								{
									field : 'END_DT',
									title : '结束时间',
									width : 100,
									align : 'center',
									formatter : function(value) {
										if (checkNotEmpty(value))
											return "<span title='" + value
													+ "'>" + value + "</span>";
									}
								},
								{
									field : 'KB_CD',
									title : '知识库代码',
									width : 100,
									align : 'center',
									formatter : function(value) {
										if (checkNotEmpty(value))
											return "<span title='" + value
													+ "'>" + value + "</span>";
									}
								},
								{
									field : 'KB_NM',
									title : '知识库名称',
									width : 100,
									align : 'center',
									formatter : function(value) {
										if (checkNotEmpty(value))
											return "<span title='" + value
													+ "'>" + value + "</span>";
									}
								},
								{
									field : 'RS_CM',
									title : '维修结果确认',
									width : 100,
									align : 'center',
									formatter : function(value) {
										if (checkNotEmpty(value))
											return "<span title='" + value
													+ "'>" + value + "</span>";
									}
								},
								{
									field : 'CM_EMP',
									title : '维修结果确认人',
									width : 100,
									align : 'center',
									formatter : function(value) {
										if (checkNotEmpty(value))
											return "<span title='" + value
													+ "'>" + value + "</span>";
									}
								},
								{
									field : 'CRT_ID',
									title : '创建人',
									width : 200,
									align : 'center',
									formatter : function(value) {
										if (checkNotEmpty(value))
											return "<span title='" + value
													+ "'>" + value + "</span>";
									}
								},
								{
									field : 'CRT_DT',
									title : '创建时间',
									width : 200,
									align : 'center',
									formatter : function(value) {
										if (checkNotEmpty(value))
											return "<span title='" + value
													+ "'>" + value + "</span>";
									}
								},
								{
									field : 'UPT_ID',
									title : '修改人',
									width : 200,
									align : 'center',
									formatter : function(value) {
										if (checkNotEmpty(value))
											return "<span title='" + value
													+ "'>" + value + "</span>";
									}
								},
								{
									field : 'UPT_DT',
									title : '修改时间',
									width : 200,
									align : 'center',
									formatter : function(value) {
										if (checkNotEmpty(value))
											return "<span title='" + value
													+ "'>" + value + "</span>";
									}
								}, ] ],
								onDblClickRow: function(index,row){	
							    	 CompanyOpttype=1;
							    	 $("#enditTab").dialog("open").dialog('setTitle', '修改设备维修信息');
							    	 checkFun();
							    	    $('#txtRepairCode').textbox('setValue', row.RP_CD==null?'':row.RP_CD);
										$('#comRepairType').combobox('setValue', row.DICT_IT_NM_01==null?'':row.DICT_IT_NM_01);
										$('#comEquipType').combobox('setValue', row.ET_TY==null?'':row.ET_TY);
										$('#comEquipmentCode').combobox('setValue', row.ET_CD==null?'':row.ET_CD);
										$('#comIsStress').combobox('setValue', row.IS_UR==null?'':row.IS_UR);
										$('#comRepairFun').combobox('setValue', row.KB_SC==null?'':row.KB_SC);							
							     }
					};
					initGridView(reqData, grid);
					dataGrid.datagrid('loadData', jsonData);
				},
				checkFun=function(){
					var qx = getUpdateRight();
					if(qx=="Y"){
						 $('#txtRepairCode').textbox('textbox').attr('disabled', true);
				    	 $('#comRepairType').combobox('textbox').attr('disabled', false);
				    	 $('#comEquipType').combobox('textbox').attr('disabled', false);
				    	 $('#comEquipmentCode').combobox('textbox').attr('disabled', false);
				    	 $('#comIsStress').combobox('textbox').attr('disabled', false);
				    	 $('#comRepairFun').combobox('textbox').attr('disabled', false);
				    	 $('#saveID').show();
				    	 $('#cancleID').show();
					}else{
						CompanyOpttype=2;
						$('#txtRepairCode').textbox('textbox').attr('disabled', true);
				    	 $('#comRepairType').combobox('textbox').attr('disabled', false);
				    	 $('#comEquipType').combobox('textbox').attr('disabled', false);
				    	 $('#comEquipmentCode').combobox('textbox').attr('disabled', false);
				    	 $('#comIsStress').combobox('textbox').attr('disabled', false);
				    	 $('#comRepairFun').combobox('textbox').attr('disabled', false);
				    	 $('#saveID').hide();
//				    	 $('#cancleID').hide();
					}
				},
				addFunction=function(){
					CompanyOpttype=0;
					getRepairOrdr();
					checkFun();
					$('#txtRepairCode').textbox('textbox').attr('readonly',
							false);
					$('#txtRepairCode').textbox('textbox').attr('disabled',
							false);
					$("#enditTab").dialog("open").dialog('setTitle', '设备维修信息添加');
					$("#fmEquipRepair").form("clear");	
				},
				getRepairOrdr=function(){
					// 维修单号
					iplantAjaxRequest({
						url : '/iPlant_ajax',
						data : {
							IFS : 'T000033',
						},
						successCallBack : function(data) {
							var needata = data.RESPONSE[0].RESPONSE_DATA[0].RP_CD;
							$("#txtRepairCode").textbox('setValue',data.RESPONSE[0].RESPONSE_DATA[0].RP_CD).textbox('readonly').textbox({require:true});
						}
					});
				},
				/* 保存按钮 */
				savaStation=function(){
					var IFServerNo='';
					var reqData=[];
					if(CompanyOpttype==0){
						IFServerNo = 'T000026'
					}else if(CompanyOpttype == 1) {
						/*if (!saveUpdateValidate()) {
							$.messager.alert("提示", '内容没有更新，请修改')
							return false;
						}*/
						IFServerNo = 'T000027'
					} else {
						IFServerNo = 'T000025'
					}
					var susMsg ='',
					errorMsg = '';
					if(CompanyOpttype == 0) {
						susMsg = '添加成功';
						errorMsg = '添加失败,请联系管理员';
					} else {
						susMsg = '更新成功';
						errorMsg = '更新失败,请联系管理员';
					}
					var ajaxParam = {
							url: '/iPlant_ajax',
							dataType: 'JSON',
							data: {
								RP_CD: $('#txtRepairCode').val(),
								DICT_IT_NM_01: $('#comRepairType').combobox('getValue'),
								ET_TY: $('#comEquipType').combobox('getValue'),
								ET_CD: $('#comEquipmentCode').combobox('getValue'),
								IS_UR: $('#comIsStress').combobox('getValue'),
								KB_SC: $('#comRepairFun').combobox('getValue'),	
								RE_CN: $("#comText").val(),			//维修内容
								KB_IU: $("#problemCause").combobox('getValue'),		//问题原因
								KB_PD: $("#problemDesc").combobox('getValue'),	 //问题描述
								RSP_DT: $("#responseDate").datebox('getValue'),//响应时间
								RSP_EMP: $("#responsePerson").val(),//响应人员
								DICT_IT_NM_02: $("#comState").val(),//维修状态
								RP_EMP: $("#comPerson").val(),//维修人员
								BGN_DT: $("#stDT").datebox('getValue'),//开始时间
								END_DT: $("#endDT").datebox('getValue'),//结束时间
								KB_CD: $("#repositoryCode").combobox('getValue'),//知识库代码
								KB_NM: $("#repositoryName").combobox('getValue'),//知识库名称
								RS_CM: $("#comResult").val(),//维修结果确认
								CM_EMP: $("#comResultPerson").val(),//维修结果确认人
								IFS: IFServerNo
							},
							successCallBack: function(data) {
								var susMsg=getReturnMsg(data);
			                	$.messager.alert("提示",susMsg,"",function(){
			            			reqGridData('/iPlant_ajax','repairinfo_tab',{IFS:'T000025'});
			            			$('#enditTab').dialog('close');
			            		});
							},
							errorCallBack: function() {
								$.messager.alert('提示', errorMsg);
							}
						};
						iplantAjaxRequest(ajaxParam);
				},
				/*验证修改内容是否重复*/
				saveUpdateValidate=function(){
					var checkedItems = $('#repairinfo_tab').datagrid('getSelections');
					row = checkedItems[0];
					if (row.RP_CD) {
						if ($('#txtRepairCode').textbox('getValue') != (row.RP_CD==null?'':row.RP_CD)
								|| $('#comRepairType').combobox('getValue') != (row.DICT_IT_NM_01==null?'':row.DICT_IT_NM_01)
								|| $('#comEquipType').combobox('getValue') != (row.ET_TY==null?'':row.ET_TY)						
								|| $('#comEquipmentCode').combobox('getValue') != (row.ET_CD==null?'':row.ET_CD)						
								|| $('#comIsStress').combobox('getValue') != (row.IS_UR==null?'':row.IS_UR)  
							    || $('#comRepairFun').combobox('getValue') != (row.KB_SC==null?'':row.KB_SC)) {
							return true;
						} else {
							return false;
						}
					}
				},
		        validSelectedData = function (gridName,type) {
		            var checkedItems = $(gridName).datagrid('getSelections');
		            var num = 0;
		            $.each(checkedItems, function (index, item) {
		               num++;
		            });
		            if (type == 'Update') {
		                if (num != 1) {
		                    return false;
		                }
		            }
		            else {
		                if (num <= 0) {
		                    return false;
		                }
		            }
		            return true;
		        },
		        deleteFunction=function(){
		        	var isSelectedData = validSelectedData('#repairinfo_tab', 'Delete');
		             if (!isSelectedData) {
		                 $.messager.alert('提示', '请选择一条数据进行删除');
		                 return;
		             }
		             var checkedItems = $('#repairinfo_tab').datagrid('getSelections');
		             //确认提示框
		             var delCnt=0;
		             $.messager.confirm('确认框', '您确定要删除您所选择的数据?', function (r) {
		            	 if(r==true){
		            		 $.each(checkedItems, function (index, item) {
		            			 delCnt++;
		                    	 var ajaxParam = {
		                                 url: '/iPlant_ajax',
		                                 dataType: 'JSON',
		                                 data: {
		                                     IFS: 'T000028',
		                                     RP_CD: item.RP_CD,
		                                 },
		                                 successCallBack:function(data){
		                                 	 if(delCnt==checkedItems.length){
			                              	 	if(data.RESPONSE["0"].RESPONSE_HDR.MSG_CODE=='0'){
			                              	 		$.messager.alert('提示', '删除成功!','',function(){
			                                	      initGridData();
			                                     });	
			                              	 	}else{
			                              	 		$.messager.alert('提示','删除失败,此数据正在使用!')
			                              	 	}
			                                     
			                            	 }
		                         		},
		                         		errorCallBack:function(data){
		                         			if(delCnt==checkedItems.length){
		                         				$.messager.alert('提示','删除失败,服务器无响应!');
		                         			}
		                         		}
		                          };
		                         iplantAjaxRequest(ajaxParam);
		            		 });
		            	 }
		             });
		        },
		        updateFunction=function(){
		        	var checkedItems = $('#repairinfo_tab').datagrid('getSelections');
					var moveIds = [];
					var num = 0;
					$.each(checkedItems, function(index, item) {
						moveIds.push(item.moveid);
						num++;
					});
					if(num != 1) {
						$.messager.alert('提示', '请选择一条数据进行修改');
						return false;
					}
					var row = $("#repairinfo_tab").datagrid("getSelected");
					if(row) {
						$("#searchCondition").dialog("close");
						$("#enditTab").dialog("open").dialog('setTitle', '修改设备维修信息');
						$('#txtRepairCode').textbox('textbox').attr('readonly', true);
						$('#txtRepairCode').textbox('textbox').attr('disabled', true);
						$('#txtRepairCode').textbox('setValue', row.RP_CD==null?'':row.RP_CD);
						$('#comRepairType').combobox('setValue', row.DICT_IT_NM_01==null?'':row.DICT_IT_NM_01);
						$('#comEquipType').combobox('setValue', row.ET_TY==null?'':row.ET_TY);				
						$('#comEquipmentCode').combobox('setValue', row.ET_CD==null?'':row.ET_CD);
						$('#comIsStress').combobox('setValue', row.IS_UR==null?'':row.IS_UR);
						$('#comRepairFun').combobox('setValue', row.KB_SC==null?'':row.KB_SC);
						
						$('#comText').textbox('setValue', row.RE_CN);
						$('#problemCause').combobox('setValue', row.KB_IU==null?'':row.KB_IU);
						$('#problemDesc').combobox('setValue', row.KB_PD==null?'':row.KB_PD);
						$('#responseDate').datebox('setValue', row.RSP_DT==null?'':row.RSP_DT);
						$('#responsePerson').textbox('setValue', row.RSP_EMP==null?'':row.RSP_EMP);
						$('#comState').textbox('setValue', row.DICT_IT_NM_02==null?'':row.DICT_IT_NM_02);
						$('#comPerson').textbox('setValue', row.RP_EMP==null?'':row.RP_EMP);
						$('#stDT').datebox('setValue', row.BGN_DT==null?'':row.BGN_DT);
						$('#endDT').datebox('setValue', row.END_DT==null?'':row.END_DT);
						$('#repositoryCode').combobox('setValue', row.KB_CD==null?'':row.KB_CD);
						$('#repositoryName').combobox('setValue', row.KB_NM==null?'':row.KB_SC);
						$('#comResult').textbox('setValue', row.RS_CM==null?'':row.RS_CM);
						$('#comResultPerson').textbox('setValue', row.CM_EMP==null?'':row.CM_EMP);

						CompanyOpttype = 1;				
					}
					checkFun();
		        }
	}
	EquipRepair.prototype = {
		init : function() {
			$(function() {
				// 初始化全局变量对象
				dataGrid = $('#repairinfo_tab'), dataLabelType = [],
						showmessage = $('#showMessageInfo'),
						editIndex = undefined, oldRow = undefined,
						reg = new RegExp("null", "g"), dataReqType = [],
						dataEqupType = [], dataEqupNum = [],dataEqupNums = [], dataEqupNum1 = [], dataEqupNum2 = [],
						// 是否紧急
						dataIsImp = [ {
							'id' : "1",
							'text' : "紧急"
						}, {
							'id' : "2",
							'text' : "不紧急"
						} ],
						dataReqWay = [],IdataReqType={},IdataEqupType={},IdataEqupNum={},IdataEqupNums={},IdataEqupNum1={},IdataReqWay={} ;
				getSelectedCondtion();
				initGridData();
				$('#btnSearch').click(function() {
					getDataByConditiononce();
				});
				$('#btnAdd').click(function() {
					addFunction();
				});
				 $('#btnUpdate').click(function() {
					 updateFunction();
				 });
				$('#btnDelete').click(function() {
					deleteFunction();
				});
			});
				
		}
	}
	var mER = new EquipRepair();
	mER.init();
})();