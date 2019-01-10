/* 启动时加载 */
/*
 */
(function() {
	function nationalMaintenance() {
		// 初始化物料编码选择
		getSelectedCondtion = function() {
			iplantAjaxRequest({
				url : '/iPlant_ajax',
				data : {
					IFS : 'T000073'
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
							"id" : rowCollection[i].ITEM_CD,
							"text" : rowCollection[i].ITEM_NM
						});
						dataPi.push({
							"id" : rowCollection[i].ITEM_CD,
							"text" : rowCollection[i].ITEM_NM
						});
					}

					// 查询
					$('#cxMatterNO').combobox({
						data : array,
						valueField : 'id',
						textField : 'text'
					});
				}
			});
		}
		/** 初始化公司combobox内容 */
				initGridData = function() {
					fileName = "", fileType = "", filePath = "";
					var dgrid = $('#samplingPlan_tab').datagrid('options');
					if (!dgrid)
						return;
					var reqData = {
						IFS : 'WMS_B00034',
						//MT_SN : $("#cxMatterNO").combobox("getValue"),
						pageIndex : 1,
						pageSize : dgrid.pageSize
					}
					reqGridData('/iPlant_ajax', 'samplingPlan_tab', reqData);
				},
				bindGridData = function(reqData, jsonData) {
					var gridList = {
						name : 'samplingPlan_tab',
						dataType : 'json',
						columns : [ [ {
							field : 'SAMPLE_ID',
							title : '抽样编号',
							width : 100,
							align : 'center'
						}, {
							field : 'MATERIA_ID',
							title : '物料编号',
							width : 150,
							align : 'center'
						}, {
							field : 'MATERIA_NM',
							title : '物料名称',
							width : 200,
							align : 'center'
						}, {
							field : 'SAMPLE_LEVEL',
							title : '抽样等级',
							width : 100,
							align : 'center'
						}, {
							field : 'SAMPLE_STAND_VALUE',
							title : '抽样标准值',
							width : 100,
							align : 'center'
						}, {
							field : 'SAMPLE_ASK',
							title : '抽样要求',
							width : 200,
							align : 'center'
						}
						] ],
					onDblClickRow: function(index,row){
						if(row) {
							CompanyOpttype = 1;
							$("#editTab").dialog("open").dialog('setTitle', '修改抽样方案信息');
							$('#txtNum').textbox('disable');
				            $('#txtMatterNO').combobox('disable');	
				            $('#txtNum').textbox('setValue', row.SAMPLE_ID);
							$('#txtMatterNO').combobox('setValue', row.MATERIA_ID);
							$('#txtLevel').combobox('setValue', row.SAMPLE_LEVEL);
							$('#txtStand').textbox('setValue', row.SAMPLE_STAND_VALUE);
							$('#txtRequire').textbox('setValue', row.SAMPLE_ASK);
						}
					}
				}
					initGridView(reqData, gridList);
					$('#samplingPlan_tab').datagrid('loadData', jsonData);
				},
				/** 删除行 */
				deleteDataGrid = function() {
					var isSelectedData = validSelectedData('samplingPlan_tab', 'Delete');
		            if (!isSelectedData) {
		                $.messager.alert('提示', '请选择一条数据进行删除');
		                return;
		            }
		            var checkedItems = $('#samplingPlan_tab').datagrid('getSelections');
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
		                                IFS: 'WMS_B00037',
		                                SAMPLE_ID: item.SAMPLE_ID
		                            },
		                            successCallBack:function(){
		                           	 if(delCnt==checkedItems.length){
		                           	    initGridData();
		                           	 }
		                           }
		                        };
		                        iplantAjaxRequest(ajaxParam);
		                    });
		           	 	}
		            });   
				},
				validSelectedData = function (gridName,type) {
		            var checkedItems = $('#' + 'samplingPlan_tab').datagrid('getSelections');
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
				// 查看抽样标准
				initSampleStand = function() {
					$("#enditTab1").dialog("open").dialog('setTitle', '抽样方案标准');
					$("#fmsampleStand").form("clear");
					initGridDatacc();
				},
				// 查询标准table加载数据
				initGridDatacc = function() {
					iplantAjaxRequest({
						url : '/iPlant_ajax',
						data : {
							IFS : 'WMS_B00033',
							pageIndex : 1,
							pageSize : 100
						},
						successCallBack : function(data) {
							var jsonData = {
								total : 0,
								rows : []
							};
							if (data.RESPONSE[0].length != 0) {
								jsonData.rows = data.RESPONSE[0].RESPONSE_DATA;
								jsonData.total = data.RESPONSE[0].RESPONSE_DATA.length;
							}

							$('#xhDatagrid').datagrid({
								name : 'xhDatagrid',
								dataType : 'json',
								columns : [ [ {
									field : 'NUM',
									title : '批量',
									width : 180,
									align : 'center',
									rowspan : 2
								}, {
									title : '特殊检验水准',
									colspan : 4,
									rowspan : 1
								}, {
									title : '一般检验水准',
									colspan : 3,
									rowspan : 1
								} ], [ {
									field : 'S1',
									title : 'S-1',
									width : 100,
									rowspan : 1
								}, {
									field : 'S2',
									title : 'S-2',
									width : 100,
									rowspan : 1
								}, {
									field : 'S3',
									title : 'S-3',
									width : 100,
									rowspan : 1
								}, {
									field : 'S4',
									title : 'S-4',
									width : 100,
									rowspan : 1
								}, {
									field : 'S5',
									title : 'I',
									width : 100,
									rowspan : 1
								}, {
									field : 'S6',
									title : 'II',
									width : 100,
									rowspan : 1
								}, {
									field : 'S7',
									title : 'III',
									width : 100,
									rowspan : 1
								} ] ],
								onClickRow : function(index, row) {									
								},
								onBeforeEdit : function(index, row) {
								},
								/** 编辑模式进入之后的操作 */
								onAfterEdit : function(index, row) {
									/** 判断是否进行数据变更 */
									// row.edited = true;
								}
							});

							$('#xhDatagrid').datagrid('loadData', jsonData);
						}
					});
				},
				// 关闭抽样标准窗口
				closeTab = function() {
					$("#enditTab1").dialog("close");
				},
				// 打开新增窗口
				insertDataGrid = function() {
					$("#editTab").dialog("open").dialog('setTitle', '添加抽样方案信息');
					getWorkOrder();
					setDataNull();
					$("#fmMatterFile").form("clear");
		            $('#txtNum').textbox('textbox').attr('readonly',false);
		            $('#txtNum').textbox('textbox').attr('disabled',false);
					$('#txtMatterNO').combobox({
						data : dataPi,
						valueField : 'id',
						textField : 'text'
					});
					CompanyOpttype = 0;
					$('#txtMatterNO').combobox('enable');
				},
				//查询按钮
				searchSamplePlanInf=function(){
					var req={
							MATERIA_ID:	$("#cxMatterNO").combobox("getValue"),
							IFS: "WMS_B00034",
			                pageIndex: 1,
			                pageSize: $('#samplingPlan_tab').pageSize   
					};
					reqGridData("/iPlant_ajax", "samplingPlan_tab", req);
				},
				//绑定自动生成的抽样编号
				getWorkOrder =function(){
		            var workOrderData='';
		            var ajaxParam={
		                url:'/iPlant_ajax',
		                data:{
		                      IFS:'WMS_B00054',
		                },
		                successCallBack:function(data){
		                    var rowNum=0
		                    if(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS){
		                        rowNum=parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
		                        workOrderData=data.RESPONSE["0"].RESPONSE_DATA[0];
		                    }
		                    $('#txtNum').textbox('setValue',workOrderData.SAMPLE_ID).textbox('readonly').textbox({ required: true });                                                                         
		                }
		            } 
		            iplantAjaxRequest(ajaxParam); 
		        }
				//修改抽样信息
				updateStation = function() {
					var checkedItems = $('#samplingPlan_tab').datagrid('getSelections');
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
					var row = $("#samplingPlan_tab").datagrid("getSelected");					
					if(row) {
						CompanyOpttype = 1;
						$("#editTab").dialog("open").dialog('setTitle', '修改抽样方案信息');
						$('#txtNum').textbox('disable');
						$('#txtMatterNO').combobox('disable');
						$('#txtNum').textbox('setValue', row.SAMPLE_ID);
						$('#txtMatterNO').combobox('setValue', row.MATERIA_ID);
						$('#txtLevel').combobox('setValue', row.SAMPLE_LEVEL);
						$('#txtStand').textbox('setValue', row.SAMPLE_STAND_VALUE);
						$('#txtRequire').textbox('setValue', row.SAMPLE_ASK);
	
					}
				},
				//保存抽样信息
				savaSamplePlanInfo=function(){
					if(CompanyOpttype == 0) {
						existProduct($('#txtMatterNO').combobox('getValue'));
						if(!isExist){
							return;
						};
						var cd  = autoCreateCode('wms');
						susMsg = '添加成功',errorMsg = '添加失败,请联系管理员';
						ajaxParam = {
			           				url: '/iPlant_ajax',
			           				dataType: 'JSON',
			           				data: {
			           					SAMPLE_ID: $('#txtNum').textbox('getValue'),
			           					MATERIA_ID:$('#txtMatterNO').combobox('getValue'),
			           					SAMPLE_LEVEL: $('#txtLevel').combobox('getValue'),
			           					SAMPLE_STAND_VALUE :$('#txtStand').textbox('getValue'),
			           					SAMPLE_ASK:$('#txtRequire').textbox('getValue'),
			           					IFS: 'WMS_B00035'
			           				},
			           				 successCallBack: function(data) {
			           					 setTimeout(function(){
			           						$.messager.alert("提示", susMsg) && ($("#editTab").dialog("close"), setDataNull(), initGridData())
			           					 }, 1000);
			           				},
			           				errorCallBack: function() {
			           					$.messager.alert('提示', errorMsg);
			           				}
			           			};
			           			iplantAjaxRequest(ajaxParam);
			           			$("#editTab").dialog("close");
					} else if(CompanyOpttype == 1){
						susMsg = '更新成功',errorMsg = '更新失败,请联系管理员';
						if(!saveUpdateValidate()){
		            		$.messager.alert("提示", '内容没有更新，请修改') 
		            		return false;
		            	}
						ajaxParam = {
								url: '/iPlant_ajax',
								dataType: 'JSON',
								data: {
									SAMPLE_ID:$('#txtNum').textbox('getValue'),
		           					MATERIA_ID:$('#txtMatterNO').combobox('getValue'),
		           					SAMPLE_LEVEL: $('#txtLevel').combobox('getValue'),
		           					SAMPLE_STAND_VALUE :$('#txtStand').textbox('getValue'),
		           					SAMPLE_ASK:$('#txtRequire').textbox('getValue'),
		           					IFS: 'WMS_B00036'
								},
								 successCallBack: function(data) {
									 setTimeout(function(){
										 $.messager.alert("提示", susMsg) && ($("#editTab").dialog("close"), setDataNull(), initGridData())
									 }, 1000);
									 

								},
								errorCallBack: function() {
									$.messager.alert('提示', errorMsg);
								}
							};
							iplantAjaxRequest(ajaxParam);
							$("#editTab").dialog("close");
					}
				},
				/*是否修改变更的验证*/
				saveUpdateValidate=function(){
					var checkedItems = $('#samplingPlan_tab').datagrid('getSelections'),row = checkedItems[0];
					if(row.SAMPLE_ID){
						if(
						$('#txtLevel').combobox('getValue')!=row.SAMPLE_LEVEL ||
						$('#txtMatterNO').combobox('getValue')!=row.MATERIA_ID ||
			         	$('#txtStand').textbox('getValue')!=row.SAMPLE_STAND_VALUE ||
			         	$('#txtRequire').textbox('getValue')!=row.SAMPLE_ASK){
							return true;
						}else{
							return false;
						}
					}
				},
				 /*验证是否重复*/
		         existProduct=function(sn){
		 	 	    		var ajaxParam = {
		 	 	    				url: '/iPlant_ajax',
		 	 	    				dataType: 'JSON',
		 	 	    				async: false,
		 	 	    				data: {
		 	 	                       	IFS: 'WMS_B00034',
		 	 	                       	MATERIA_ID:sn,
		 	 	  					 	pageIndex: 1,
		 	 	  					 	pageSize: $('#MatterFileinfo_tab').pageSize
		 	 	    				},
		 	 	    				successCallBack:function(data){
		 	 	    					var rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
		 	 	                   	 	if(rowNum>0){
		 	 	                   			$.messager.alert('提示', '您的录入信息相同,请重新输入!');
		 	 	                   			$("#txtMatterNO").combobox('select', '');
		 	 	                   			isExist=false;
		 	 	                   	 	}else{
		 	 	                   	 		isExist=true;
		 	 	                   	 	}
		 	 	                   	}
		 	 	    			};
		 	 	               	iplantAjaxRequest(ajaxParam);
		         },
		         /*清空表单*/
		 		setDataNull = function () {
		        	 $('#txtNum').textbox('setValue','');
		             $('#txtLevel').combobox('setValue','');
		             $("#txtMatterNO").combobox('setValue', '');
		             $('#txtStand').textbox('setValue','');
		             $('#txtRequire').textbox('setValue','');
		 		}
	}

	nationalMaintenance.prototype = {
		init : function() {
			$(function() {
				var CompanyOpttype; //0：新增   1:编辑
				getSelectedCondtion();
				initGridData();
				// 获取工厂类别下拉
				$('#btnSearch').click(function() {
					searchSamplePlanInf();
				});
				$('#btnAdd').click(function() {
					insertDataGrid();
				});

				$('#btnDelete').click(function() {
					deleteDataGrid();
				});
				$('#btnUpdate').click(function() {
					updateStation();
				});
				$('#btnform').click(function() {
					initSampleStand();
				});
			});
		}
	}
	var national = new nationalMaintenance();
	var dataPi=[];
	national.init();
})();
