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
			
			iplantAjaxRequest({
				url : '/iPlant_ajax',
				data : {
					IFS : 'WMS_B00044'
				},
				successCallBack : function(data) {
					var rowCollection = createSourceObj(data);
					for (var i = 0; i < rowCollection.length; i++) {
						dataDivide.push({
							"id" : rowCollection[i].DIVIDE_TYPE,
							"text" : rowCollection[i].DIVIDE_TYPE
						});
					}
				}
			});
		}
		/** 初始化公司combobox内容 */
				initGridData = function() {
					fileName = "", fileType = "", filePath = "";
					var dgrid = $('#MaterialDivideManage_tab').datagrid('options');
					if (!dgrid)
						return;
					var reqData = {
						IFS : 'WMS_B00045',						
						pageIndex : 1,
						pageSize : dgrid.pageSize
					}
					reqGridData('/iPlant_ajax', 'MaterialDivideManage_tab', reqData);
				},
				bindGridData = function(reqData, jsonData) {
					var gridList = {
						name : 'MaterialDivideManage_tab',
						dataType : 'json',
						columns : [ [ {
							field : 'MANAGE_ID',
							title : '物料分类编号',
							width : 100,
							align : 'center'							
						},{
							field : 'MATERIA_ID',
							title : '物料编号',
							width : 240,
							align : 'center'
						}, {
							field : 'MATERIA_NM',
							title : '物料名称',
							width : 200,
							align : 'center'
						}, {
							field : 'DIVIDE_ID',
							title : '物料分类编码',
							width : 100,
							align : 'center',
							hidden:true
						}, {
							field : 'DIVIDE_TYPE',
							title : '物料分类类型',
							width : 100,
							align : 'center'
						}, {
							field : 'OVER_SEND',
							title : '是否允许超发',
							width : 100,
							align : 'center',
								formatter: function(value, row, index) {if(value == 'Y') { return '是';} 
								else { return '否';}},editor:{type:'checkbox',options:{on: 'Y',off: 'N'}}}
						
						] ],
					onDblClickRow: function(index,row){
						if(row) {
							CompanyOpttype = 1;
							$("#editTab").dialog("open").dialog('setTitle', '修改物料分类信息');
							$('#txtMatterNO').combobox('disable');
							$('#txtNO').textbox('disable');
				            $('#txtDivide').combobox({
								data : dataDivide,
								valueField : 'id',
								textField : 'text',
								onSelect:function(record){
									setDefaultSelect(record.id);
								}
							});
				            $('#txtNO').textbox('setValue', row.MANAGE_ID);
							$('#txtMatterNO').combobox('setValue', row.MATERIA_ID);
							$('#txtDivide').combobox('setValue', row.DIVIDE_TYPE);
							if(row.OVER_SEND=="N"){
								$("#isOver").prop('checked',false);
							}else{
								$("#isOver").prop('checked',true);
							};
							
						}
					}
				}
					initGridView(reqData, gridList);
					$('#MaterialDivideManage_tab').datagrid('loadData', jsonData);
				},
				/** 删除行 */
				deleteDataGrid = function() {
					var isSelectedData = validSelectedData('MaterialDivideManage_tab', 'Delete');
		            if (!isSelectedData) {
		                $.messager.alert('提示', '请选择一条数据进行删除');
		                return;
		            }
		            var checkedItems = $('#MaterialDivideManage_tab').datagrid('getSelections');
		            // 确认提示框
		            var delCnt=0;
		            $.messager.confirm('确认框', '您确定要删除您所选择的数据?', function (r) {
		           	 if(r==true){
		           		 $.each(checkedItems, function (index, item) {
		           			 delCnt++;
		                   	 var ajaxParam = {
		                            url: '/iPlant_ajax',
		                            dataType: 'JSON',
		                            data: {
		                                IFS: 'WMS_B00048',
		                                MANAGE_ID: item.MANAGE_ID
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
		            var checkedItems = $('#' + 'MaterialDivideManage_tab').datagrid('getSelections');
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
							IFS : 'WMS_B00044',
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

							$('#MaterialDivideManagebottom_tab').datagrid({
								name : 'MaterialDivideManagebottom_tab',
								dataType : 'json',
								columns : [ [ {
									field : 'DIVIDE_TYPE',
									title : '物料分类',
									width : 100,
									align : 'center',
								}, {
									field : 'DIVIDE_STANDAR',
									title : '划分标准',
									width : 240,
									align : 'center',
								}, {
									field : 'MANAGE_STANDAR',
									title : '管理要求',
									width : 500,
									align : 'center',
								} , {
									field : 'WMS_DEFAULT',
									title : 'WMS默认',
									width : 240,
									align : 'center',
								} ]],
								onClickRow : function(index, row) {
									// $('#xhDatagrid').datagrid("beginEdit",
									// index);
								},
								onBeforeEdit : function(index, row) {
									// $("#showMessageInfo").html('');
								},
								/** 编辑模式进入之后的操作 */
								onAfterEdit : function(index, row) {
									/** 判断是否进行数据变更 */
									// row.edited = true;
								}
							});

							$('#MaterialDivideManagebottom_tab').datagrid('loadData', jsonData);
						}
					});
				},
				// 关闭抽样标准窗口
				closeTab = function() {
					$("#enditTab1").dialog("close");
				},
				// 打开新增窗口
				insertDataGrid = function() {
					setDataNull();
					getWorkOrder();
					$("#editTab").dialog("open").dialog('setTitle', '添加抽样方案信息');
		            $('#txtNO').textbox('textbox').attr('readonly',false);
		            $('#txtNO').textbox('textbox').attr('disabled',false);		            
					$('#txtMatterNO').combobox({
						data : dataPi,
						valueField : 'id',
						textField : 'text'
					});
					$('#txtDivide').combobox({
						data : dataDivide,
						valueField : 'id',
						textField : 'text',
						onSelect:function(record){
							setDefaultSelect(record.id);
						}
					});
					CompanyOpttype = 0;
					$('#txtMatterNO').combobox('enable');
				},
				//设置默认启用项
				setDefaultSelect=function(type){
					if(type=="A"){
						$("#isOver").prop('checked',false);
//						$("#isOver").onclick=function(){return false;};
						$("#isOver").attr("disabled","disabled");
						//$("#isOver")attr('disabled', 'disabled');
					}else if(type=="B"){
						$("#isOver").prop('checked',false);
						$("#isOver").attr("disabled",false);
//						$("#isOver").onclick=function(){return true;};  
						//$("#isOver").removeAttr('disabled');
					}else{
						$("#isOver").prop('checked',true);
						$("#isOver").attr("disabled",false);
//						$("#isOver").onclick=function(){return true;};  
						//$("#isOver").removeAttr('disabled');
					}
				},
				//绑定自动生成的物料分类编号
				getWorkOrder =function(){
		            var workOrderData='';
		            var ajaxParam={
		                url:'/iPlant_ajax',
		                data:{
		                      IFS:'WMS_B00053',
		                },
		                successCallBack:function(data){
		                    var rowNum=0
		                    if(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS){
		                        rowNum=parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
		                        workOrderData=data.RESPONSE["0"].RESPONSE_DATA[0];
		                    }
		                    $('#txtNO').textbox('setValue',workOrderData.MANAGE_ID).textbox('readonly').textbox({ required: true });                                                                         
		                }
		            } 
		            iplantAjaxRequest(ajaxParam); 
		        }
				//修改物料分类信息
				updateStation=function(){
					var isSelectedData = validSelectedData('MaterialDivideManage_tab', 'Update');
			          if (!isSelectedData) {
			               $.messager.alert('提示', '请选择一条数据进行修改');
			               return;
			          }
			        var row =$('#MaterialDivideManage_tab').datagrid('getSelected');
//			        var dgrid = dataGrid.datagrid('options');
			        if(row) {
						CompanyOpttype = 1;
						$("#editTab").dialog("open").dialog('setTitle', '修改物料分类信息');
						$('#txtNO').textbox('disable');
						$('#txtMatterNO').combobox('disable');
			            $('#txtDivide').combobox({
							data : dataDivide,
							valueField : 'id',
							textField : 'text',
							onSelect:function(record){
								setDefaultSelect(record.id);
							}
						});
			            $('#txtNO').textbox('setValue', row.MANAGE_ID);
						$('#txtMatterNO').combobox('setValue', row.MATERIA_ID);
						$('#txtDivide').combobox('setValue', row.DIVIDE_TYPE);
						if(row.OVER_SEND=="N"){
							$("#isOver").prop('checked',false);
						}else{
							$("#isOver").prop('checked',true);
						};
						
					}
				},
				// 查询按钮
				searchSamplePlanInf=function(){
					var req={
							MATERIA_ID:	$("#cxMatterNO").combobox("getValue"),
							IFS: "WMS_B00045",
			                pageIndex: 1,
			                pageSize: $('#MaterialDivideManage_tab').pageSize   
					};
					reqGridData("/iPlant_ajax", "MaterialDivideManage_tab", req);
				},
				//保存信息
				savaSamplePlanInfo=function(){
					var isUsed='';					
					if ($("input[name='isOver']").is(':checked')){
						 isUsed = 'Y';}
					else{
						 isUsed = 'N';}
					if(CompanyOpttype == 0) {
						var cd  = autoCreateCode('wms');
						susMsg = '添加成功',errorMsg = '添加失败,请联系管理员';
						ajaxParam = {
			           				url: '/iPlant_ajax',
			           				dataType: 'JSON',
			           				data: {
			           					MANAGE_ID:$('#txtNO').textbox('getValue'),
			           					MATERIA_ID:$('#txtMatterNO').combobox('getValue'),
			           					DIVIDE_TYPE: $('#txtDivide').combobox('getValue'),
			           					OVER_SEND :isUsed,
			           					IFS: 'WMS_B00046'
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
									MANAGE_ID:$('#txtNO').textbox('getValue'),
		           					MATERIA_ID:$('#txtMatterNO').combobox('getValue'),
		           					DIVIDE_TYPE: $('#txtDivide').combobox('getValue'),
		           					OVER_SEND :isUsed,
		           					IFS: 'WMS_B00047'
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
					};
					initGridData();
				},
				/* 是否修改变更的验证 */
				saveUpdateValidate=function(){
					var checkedItems = $('#MaterialDivideManage_tab').datagrid('getSelections'),row = checkedItems[0];
					if(row.MANAGE_ID){
						if(
						$('#txtMatterNO').combobox('getValue')!=row.MATERIA_ID ||
			         	$('#txtDivide').combobox('getValue')!=row.DIVIDE_TYPE ||
			         	$('#isOver').checkbox('getValue')!=row.OVER_SEND){
							return true;
						}else{
							return false;
						}
					}
				},
		       /* 清空表单 */
		 		setDataNull = function () {
		        	 $("#txtNO").textbox('setValue', '');
		             $("#txtMatterNO").combobox('setValue', '');
		             $('#txtDivide').combobox('setValue','');
		             $("#isOver").prop('checked',false);
		             //$('#isOver').textbox('setValue','');
		 		}
	}

	nationalMaintenance.prototype = {
		init : function() {
			$(function() {
				var CompanyOpttype; // 0：新增 1:编辑
				getSelectedCondtion();
				initGridData();
				initGridDatacc();
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
			});
		}
	}
	var national = new nationalMaintenance();
	var dataPi=[];
	var dataDivide=[];
	national.init();
})();
