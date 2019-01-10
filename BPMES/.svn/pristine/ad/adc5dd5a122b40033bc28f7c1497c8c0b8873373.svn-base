
(function() {
	function RankList() {	
		//初始化表格
		initGridData = function() {
			    var dgrid = $('#RFID_tab').datagrid('options');
				if(!dgrid) return;
				var reqData = {
					IFS: 'DMS_R0001',
					pageIndex: 1,
					pageSize: dgrid.pageSize
				}
				reqGridData('/iPlant_ajax', 'RFID_tab', reqData);
			},
			bindGridData = function(reqData, jsonData) {
				var gridList = {
					name: 'RFID_tab',
					dataType: 'json',
					singleSelect:false,
					columns: [
						[{
								field: 'HUM_GRADE',
								title: 'GRN',
								width: 110,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field : 'ISENCAP',
								title : '物料编码',
								width : 80,
								align : 'center',formatter : function(value) {
									if(value == '1'){
										return "<span title='是'>是</span>";
									}else {
										return "<span title='否'>否</span>";
									}
								}
							},{
								field : 'TOTALEXPOSEMINUTE',
								title : '物料规格',
								width : 110,
								align : 'center',formatter : function(value) {
								return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field : 'ENCAPSTAUTS',
								title : '机型',
								width : 110,
								align : 'center',formatter : function(value) {
								return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field : 'STORAGE_TIME',
								title : 'MSD等级',
								width : 120,
								align : 'center',formatter : function(value) {
								return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field : 'STORAGE_TIME',
								title : '烤箱编号',
								width : 120,
								align : 'center',formatter : function(value) {
								return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field : 'STORAGE_TIME',
								title : '下限温度℃',
								width : 120,
								align : 'center',formatter : function(value) {
								return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field : 'STORAGE_TIME',
								title : '上限温度℃',
								width : 120,
								align : 'center',formatter : function(value) {
								return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field : 'STORAGE_TIME',
								title : '当前温度℃',
								width : 120,
								align : 'center',formatter : function(value) {
								return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field : 'STORAGE_TIME',
								title : '扫描时间',
								width : 120,
								align : 'center',formatter : function(value) {
								return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field : 'STORAGE_TIME',
								title : '开始烘烤时间',
								width : 120,
								align : 'center',formatter : function(value) {
								return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field : 'STORAGE_TIME',
								title : '预计完成时间',
								width : 120,
								align : 'center',formatter : function(value) {
								return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field : 'STORAGE_TIME',
								title : '标准烘烤时间（h）',
								width : 120,
								align : 'center',formatter : function(value) {
								return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field : 'STORAGE_TIME',
								title : '实际烘烤时间（h）',
								width : 120,
								align : 'center',formatter : function(value) {
								return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field : 'STORAGE_TIME',
								title : '烘烤状态',
								width : 120,
								align : 'center',formatter : function(value) {
								return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field : 'STORAGE_TIME',
								title : '备注',
								width : 120,
								align : 'center',formatter : function(value) {
								return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'CRT_ID',
								title: '创建人',
								width: 100,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'CRT_DT',
								title: '创建日期',
								width: 200,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'UPT_ID',
								title: '修改人',
								width: 100,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'UPT_DT',
								title: '修改日期',
								width: 200,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							}
						]
					]
				}
				initGridView(reqData, gridList);
				$('#RFID_tab').datagrid('loadData', jsonData);
			}
			checkFun = function (){
				var qx = getUpdateRight();
				if(qx=="Y"){
			    	 $('#saveID').show();
			    	 $('#cancleID').show();
				}else{
					CompanyOpttype=2;
			    	 $('#saveID').hide();
				}
				 
			}
			
			/* 添加商品移动信息 */
			addStation = function() {
	        	CompanyOpttype = 0;
				$("#enditTab").dialog("open").dialog('setTitle', '放入烘烤');
				$("#fmStation").form("clear");
				$('#TOTALEXPOSEMINUTE').textbox('setValue','0');
				$('#ENCAPSTAUTS').textbox('setValue','0');
				$('#STORAGE_TIME').textbox('setValue','0');
			}	
			
			
			setDataNull = function () {           
	             // $('#txtID').textbox('setValue','');              
	          }	

		getDataBySearch = function(){
				var dgrid = $('#RFID_tab').datagrid('options');
				if(!dgrid) return;
				var HUM_GRADE = $('#HUM_GRADE1').val();
				var reqData = {
					HUM_GRADE: HUM_GRADE,
					IFS: 'DMS_R0001',
					pageIndex: 1,
					pageSize: dgrid.pageSize
				}
				reqGridData('/iPlant_ajax', 'RFID_tab',reqData);
			}
		/* 修改成品入库配置信息 */			
		updateStation = function() {
			$("#TakeOut").dialog("open").dialog('setTitle', '取出窗口');
			
			CompanyOpttype = 1;	
			checkedRow = 0;
		}
    
        dataArr={},
        
		//置空查询输入框
		setQueryNull=function() {
			$('#HUM_GRADE1').textbox('setValue',""),
			$('#fullMatching').prop('checked',false);
		},

		/*验证修改内容是否重复*/
        saveUpdateValidate = function() {
			var checkedItems = $('#RFID_tab').datagrid('getSelections');
			row = checkedItems[0];
			if (row.EID) {
				if ($('#HUM_GRADE').textbox('getValue') != (row.HUM_GRADE==null?'':row.HUM_GRADE)
						|| $('#TOTALEXPOSEMINUTE').textbox('getValue') != (row.TOTALEXPOSEMINUTE==null?'':row.TOTALEXPOSEMINUTE)
						|| $('#ENCAPSTAUTS').textbox('getValue') != (row.ENCAPSTAUTS==null?'':row.ENCAPSTAUTS)
						|| $('#STORAGE_TIME').textbox('getValue') != (row.STORAGE_TIME==null?'':row.STORAGE_TIME)) {
					return true;
				} else {
					return false;
				}
			}
		}

	    /*必填项空值验证*/
	   checkSelect=function() {
			pass = true; 
			$("select[required]").each(function(){
				if((this.value == '')&&($(this).combobox('getText')=='')) { 
					text = $(this).parent().prev().text(); 
					$.messager.alert('提示',text+"必填项不能为空"); 
					this.focus(); 
					pass = false; 
					return false;//跳出each 
				} 
			}); 
			return pass; 
		} 
		
		savaStation = function() {
			var IFServerNo = '';
			var IFSValue = '';
			var reqData = [];
			var EID;
		    if(CompanyOpttype == 0) {
				IFServerNo = 'DMS_R0002';
			} else if(CompanyOpttype == 1) {
				if (!saveUpdateValidate()) {
					$.messager.alert("提示", '内容没有更新，请修改')
					return false;
				}
				EID= $("#hid").val();
				IFServerNo = 'DMS_R0003';
			} else {
				IFServerNo = 'DMS_R0001'
			}
		    
		    var HUM_GRADE=$('#HUM_GRADE').textbox("getValue");
		    var TOTALEXPOSEMINUTE=$('#TOTALEXPOSEMINUTE').textbox("getValue");
		    var ENCAPSTAUTS=$('#ENCAPSTAUTS').textbox("getValue");
		    var STORAGE_TIME=$('#STORAGE_TIME').textbox("getValue");
		    
			var susMsg = '',
				errorMsg = '';
			if(CompanyOpttype == 0) {
				susMsg = '添加成功';
				errorMsg = '添加失败,请联系管理员';
			} else {
				susMsg = '更新成功';
				errorMsg = '更新失败,请联系管理员';
			}
			if(!checkSelect()) return;
			if(!checkForm()) return;
			var ajaxParam = {
				url: '/iPlant_ajax',
				dataType: 'JSON',
				data: {
					EID:EID, 
					HUM_GRADE: HUM_GRADE,
					TOTALEXPOSEMINUTE: TOTALEXPOSEMINUTE,
					ENCAPSTAUTS: ENCAPSTAUTS,
					STORAGE_TIME: STORAGE_TIME,
					IFS: IFServerNo
				},
				successCallBack: function(data) {
					var susMsg=getReturnMsg(data);
                	$.messager.alert("提示",susMsg,"",function(){
            			reqGridData('/iPlant_ajax','RFID_tab',{IFS:'DMS_R0001'});
            			$('#enditTab').dialog('close');
            			initGridData();
            		});
				},
			    errorCallBack: function() {
					$.messager.alert('提示', errorMsg);
				}
					
			};
			iplantAjaxRequest(ajaxParam);
			
		}
		
        ObjectNum = function() {
        	$("#addObjectNum").dialog("open").dialog('setTitle', '选择容器窗口');
        	
        	var tabName = 'tableObject';
			var dgridOp = $('#'+tabName).datagrid('options');
			if(!dgridOp) return;
			var reqDataA = {
				IFS: 'DMS_R0005',
				pageIndex: 1,
				pageSize: dgridOp.pageSize
			}
			dialogDataGrid('/iPlant_ajax', tabName, reqDataA);
			dialogEditorDataGrid = function(tabName,reqDataA, jsonData) {
				var gridLists = {
						name :tabName,
						dataType : 'json',
						columns : [[
						      {field:'CONTAINER_NAME',title: '容器名称',width: 230,align: 'center',formatter: function (value,row) {if (value != null) return "<span title='" + value + "'>" + value + "</span>";}},
						      {field:'CONTAINER_CODE',title: '容器编码',width: 200,align: 'center',formatter: function (value) {if (value != null) return "<span title='" + value + "'>" + value + "</span>";}},
						      {field:'MAXLIMIT',title: '上限温度(℃)',width: 200,align: 'center',formatter: function (value) {if (value != null) return "<span title='" + value + "'>" + value + "</span>";}},
						      {field:'MINLIMIT',title: '下限温度(℃)',width: 200,align: 'center',formatter: function (value) {if (value != null) return "<span title='" + value + "'>" + value + "</span>";}},
						      {field:'MAXNUM',title: '最大装载数量',width: 200,align: 'center',formatter: function (value) {if (value != null) return "<span title='" + value + "'>" + value + "</span>";}},
						      {field:'ALREADYNUM',title: '已用数',width: 200,align: 'center',formatter: function (value) {if (value != null) return "<span title='" + value + "'>" + value + "</span>";}},
						 ]],
						 onDblClickRow: function(index,row){
							 addValue(row);
							 $("#addObjectNum").dialog('close');
				         }
					}
				initEditorDataGridView(reqDataA, gridLists);
				$('#'+tabName).datagrid('loadData', jsonData);
			}
        }
        
        addValue = function(row){
        	$("#CONTAINER_CODE").textbox('setValue',row.CONTAINER_CODE);
        	$("#MAXNUM").textbox('setValue',row.MAXNUM);
        	$("#CONTAINER_NAME").textbox('setValue',row.CONTAINER_NAME);
        	$("#MAXLIMIT").textbox('setValue',row.MAXLIMIT);
        	$("#MINLIMIT").textbox('setValue',row.MINLIMIT);
        }
        
        SelectGRN = function(){//选择GRN
	    	$("#SelectGRN").dialog("open").dialog('setTitle', '选择容器窗口');
	    	var tabName = 'SelectGRN1';
			var dgridOp = $('#'+tabName).datagrid('options');
			if(!dgridOp) return;
			var reqDataA = {
				IFS: 'DMS_R0005',
				pageIndex: 1,
				pageSize: dgridOp.pageSize
			}
			dialogDataGrid('/iPlant_ajax', tabName, reqDataA);
			dialogEditorDataGrid = function(tabName,reqDataA, jsonData) {
				var gridLists = {
						name :tabName,
						dataType : 'json',
						columns : [[
						      {field:'CONTAINER_NAME',title: '容器名称',width: 230,align: 'center',formatter: function (value,row) {if (value != null) return "<span title='" + value + "'>" + value + "</span>";}},
						      {field:'CONTAINER_CODE',title: '容器编码',width: 200,align: 'center',formatter: function (value) {if (value != null) return "<span title='" + value + "'>" + value + "</span>";}},
						      {field:'MAXLIMIT',title: '上限温度(℃)',width: 200,align: 'center',formatter: function (value) {if (value != null) return "<span title='" + value + "'>" + value + "</span>";}},
						      {field:'MINLIMIT',title: '下限温度(℃)',width: 200,align: 'center',formatter: function (value) {if (value != null) return "<span title='" + value + "'>" + value + "</span>";}},
						      {field:'MAXNUM',title: '最大装载数量',width: 200,align: 'center',formatter: function (value) {if (value != null) return "<span title='" + value + "'>" + value + "</span>";}},
						      {field:'ALREADYNUM',title: '已用数',width: 200,align: 'center',formatter: function (value) {if (value != null) return "<span title='" + value + "'>" + value + "</span>";}},
						 ]],
						 onDblClickRow: function(index,row){
							 addGRN(row);
							 $("#SelectGRN").dialog('close');
				         }
					}
				initEditorDataGridView(reqDataA, gridLists);
				$('#'+tabName).datagrid('loadData', jsonData);
			}
	    }
        
        addGRN = function(row){
        	$("#GRN1").textbox('setValue',row.CONTAINER_CODE);
        	var appden = '<tr><td class="Label4" style="width: 20%">'+row.CONTAINER_CODE+'</td>'+
        		'<td class="Label4" style="width: 20%">'+row.CONTAINER_CODE+'</td>'+
				'<td class="Label4" style="width: 20%">'+row.CONTAINER_CODE+'</td>'+
				'<td class="Label4" style="width: 20%" id="RL"><a href="#" style="color: blue;" onclick="addRankList()">点击选择</a></td>'+
				'<td class="Label4" style="width: 20%">'+row.CONTAINER_CODE+'</td></tr>';
        	$("#tabAddPro tbody").html(appden);
        }
        
        addRankList = function(){
        	$("#RankList").dialog("open").dialog('setTitle', '选择容器窗口');
	    	var tabName = 'RankList1';
			var dgridOp = $('#'+tabName).datagrid('options');
			if(!dgridOp) return;
			var reqDataA = {
				IFS: 'DMS_R0001',
				pageIndex: 1,
				pageSize: dgridOp.pageSize
			}
			dialogDataGrid('/iPlant_ajax', tabName, reqDataA);
			dialogEditorDataGrid = function(tabName,reqDataA, jsonData) {
				var gridLists = {
						name :tabName,
						dataType : 'json',
						columns: [[{
										field: 'HUM_GRADE',title: '湿度等级',width: 110,
										align: 'center',formatter: function (value) {
							           	if(value != null)
		                                return "<span title='" + value + "'>" + value + "</span>";}
									},{
										field : 'TOTALEXPOSEMINUTE',title : '暴露时长(小时)',width : 110,
										align : 'center',formatter : function(value) {
										return "<span title='" + value + "'>" + value + "</span>";}
									},{
										field : 'ENCAPSTAUTS',title : '烘烤次数',width : 110,
										align : 'center',formatter : function(value) {
										return "<span title='" + value + "'>" + value + "</span>";}
									},{
										field : 'STORAGE_TIME',title : '存储期限(月)',width : 120,
										align : 'center',formatter : function(value) {
										return "<span title='" + value + "'>" + value + "</span>";}
									}
								]],
						 onDblClickRow: function(index,row){
							 $("#RL a").text(row.HUM_GRADE);
							 $("#RankList").dialog('close');
				         }
					}
				initEditorDataGridView(reqDataA, gridLists);
				$('#'+tabName).datagrid('loadData', jsonData);
			}
        }
        
        ObjectNum1 = function() {
        	$("#addObjectNum").dialog("open").dialog('setTitle', '选择容器窗口');
        	
        	var tabName = 'TakeOut1';
			var dgridOp = $('#'+tabName).datagrid('options');
			if(!dgridOp) return;
			var reqDataA = {
				IFS: 'DMS_R0005',
				pageIndex: 1,
				pageSize: dgridOp.pageSize
			}
			dialogDataGrid('/iPlant_ajax', tabName, reqDataA);
			dialogEditorDataGrid = function(tabName,reqDataA, jsonData) {
				var gridLists = {
						name :tabName,
						dataType : 'json',
						columns : [[
						      {field:'CONTAINER_NAME',title: '容器名称',width: 230,align: 'center',formatter: function (value,row) {if (value != null) return "<span title='" + value + "'>" + value + "</span>";}},
						      {field:'CONTAINER_CODE',title: '容器编码',width: 200,align: 'center',formatter: function (value) {if (value != null) return "<span title='" + value + "'>" + value + "</span>";}},
						      {field:'MAXLIMIT',title: '上限温度(℃)',width: 200,align: 'center',formatter: function (value) {if (value != null) return "<span title='" + value + "'>" + value + "</span>";}},
						      {field:'MINLIMIT',title: '下限温度(℃)',width: 200,align: 'center',formatter: function (value) {if (value != null) return "<span title='" + value + "'>" + value + "</span>";}},
						      {field:'MAXNUM',title: '最大装载数量',width: 200,align: 'center',formatter: function (value) {if (value != null) return "<span title='" + value + "'>" + value + "</span>";}},
						      {field:'ALREADYNUM',title: '已用数',width: 200,align: 'center',formatter: function (value) {if (value != null) return "<span title='" + value + "'>" + value + "</span>";}},
						 ]],
						 onDblClickRow: function(index,row){
							 addValue1(row);
							 $("#addObjectNum").dialog('close');
				         }
					}
				initEditorDataGridView(reqDataA, gridLists);
				$('#'+tabName).datagrid('loadData', jsonData);
			}
        }
        
	};
	RankList.prototype = {
		init: function() {
			$(function() {	
				var CompanyOpttype; //0：新增   1:编辑  
				var isid ='';
				var cong_id;
				var checkedRow;
		         
				initGridData();	
				
				$('#btnResets').click(function(){
		            setQueryNull();
		        });
				$('#bttSearch').click(function() {
					getDataBySearch();
				});				
				$('.add').click(function() {
					addStation();
				});
				$('#bttUpdate').click(function() {										
					updateStation();
				});
				$('.save').click(function() {
					savaStation();
				});
				$('.close').click(function() {
					$('#enditTab').dialog('close');
				});
				$('.panel-tool-close').click(function() {
					setDataNull();
				});
				$('#tabl .icon-search').click(function() {
					ObjectNum();
				});
				$('#GRN .icon-search').click(function() {
					SelectGRN();
				});
				$('#tabl1 .icon-search').click(function() {
					ObjectNum1();
				});
			});
		}
	}
	var fcfo = new RankList();
	fcfo.init();
})();