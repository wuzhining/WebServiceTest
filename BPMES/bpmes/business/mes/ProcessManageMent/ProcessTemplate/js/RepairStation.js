/* 启动时加载 */
/*
 */
(function() {
	function factoryInfo() {
		initGridData = function() {
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			var reqData = {
				IFS: 'GW00005',
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'OQCposition_tab', reqData);
		},
		
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'OQCposition_tab',
				dataType: 'json',
				columns: [[
					{field: 'MO_NO',title: '工单编码',width: 120, align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
				    {field: 'WO_NO',title: '作业指示编码',width: 150, align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					       options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
					{field: 'ITEM_CD',title: '物料编码',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
					{field: 'LINE_NM',title: '产线名称',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{validType:['length[1,100]','specialTextCharacter']}}}, 
				    {field: 'PLAN_WO_QTY',title: '计划数',width: 60,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{validType:['length[1,25]','specialTextCharacter']}}},
					{field: 'INPUT_NUM',title: '投入数',width: 60,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{validType:['length[1,25]','specialTextCharacter']}}}, 
					{field: 'AO_COUNT',title: '完成数',width: 60,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{validType:['length[1,100]','specialTextCharacter']}}}, 
				    {field: 'NO_PASS',title: '不良数',width: 60,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{validType:['length[1,25]','specialTextCharacter']}}},
					{field: 'WO_STATE_NM',title: '作业状态',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{validType:['length[1,25]','specialTextCharacter']}}},
					{field: 'COMPLATE_RATE',title: '完成率',width: 60,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{validType:['length[1,25]','specialTextCharacter']}}}
				]],
			}
			initGridView(reqData, gridList);
			dataGrid.datagrid('loadData', jsonData);
			/*创建右边树形结构*/
			
			bindTreeData = function (jsonData) {
			    var treeConfig = {
			        name: 'dd',
			        lines:true,
			        method: 'get',
			        parentField: "sT_P_CD",
			        textFiled: "sT_C_NM",
			        idFiled: "sT_C_CD",
			        data: jsonData,
			        onClick: function (node) {
			        	var node = $('#dd').tree('getSelected');
			        	$("#ReworkProcess").textbox("setValue",node.id);
			        },
			    }
			    initTree(treeConfig);
			    $('#dd').tree(treeConfig);
			},
			initLeftMenu = function () {
			    var reqData = {
			        IFS: 'E0000017'
			    }
			    reqTreeData('/iPlant_ajax',reqData);
			}
			
			/*创建右边树形结构*/
			bindTreeData2 = function (jsonData) {
			    var treeConfig = {
			        name: 'dd2',
			        lines:true,
			        method: 'get',
			        parentField: "sT_P_CD",
			        textFiled: "sT_C_NM",
			        idFiled: "sT_C_CD",
			        data: jsonData,
			        onClick: function (node) {
			        	var node = $('#dd2').tree('getSelected');
			        	$("#MaintenanceReason").textbox("setValue",node.id);
			        },
			    }
			    initTree(treeConfig);
			    $('#dd2').tree(treeConfig);
			},
			initLeftMenu2 = function () {
			    var reqData = {
			        IFS: 'E000024'
			    }
			    reqTreeData('/iPlant_ajax',reqData);
			}
		}
	}
	
	
	/*ENTER事件*/
	checkLoginName = function(dgrid){
		var search_MaterialWO_NO = $('#search_ENTERSN').textbox('getValue');
		if(search_MaterialWO_NO==null || search_MaterialWO_NO==''){
			$.messager.alert("提示", '请输入SN条码！')
			return;
		}
		var ajaxParam = {
			data: {
				url: '/iPlant_ajax',
				IFS: 'GW00006',
				BAR_CODE: search_MaterialWO_NO
			},
			successCallBack:function(data){
				var rowCollection=createSourceObj(data); 
				if(rowCollection.length <= 0){
					$.messager.alert("提示", '该SN条码不存在，请重新输入！')
					$("#fmStation").form("clear");
					return;
				}else{
					$("#workOrder").textbox('setValue',rowCollection[0].MO_NO);					/*工单编码*/
					$("#MaterialCodes").textbox('setValue',rowCollection[0].ITEM_CD);			/*物料编码*/
					$("#PlanProductCount").textbox('setValue',rowCollection[0].PLAN_WO_QTY);	/*计划量*/
					$("#Line_Cd").textbox('setValue',rowCollection[0].LINE_CD);					/*线别*/
					$("#passNum").textbox('setValue',rowCollection[0].WO_STATE);				/*通过数*/
					$("#failNum").textbox('setValue',rowCollection[0].ITEM_TYPE);				/*不合格数*/
					$("#WO_NO").textbox('setValue',rowCollection[0].WO_NO);						/*作业指示编码*/
					$("#search_SN").textbox('setValue',search_MaterialWO_NO);   				/*给当前SN赋值*/
					var insp_id=rowCollection[0].BAR_CODE;
					$("#insp_id").val(insp_id);
					$("#FCT_CD").val(rowCollection[0].FCT_CD);
					$("#lineId").val(rowCollection[0].LINE_CD);
					
					if(rowCollection[0].NEXT_ROUT_CD ==null || rowCollection[0].NEXT_ROUT_CD ==""){
						$('#showMessageInfo').html('<font color=red>此SN当前应进行投入工位操作!</font>');
						$("#search_SN").textbox('setValue','');
						return;
					}else if(rowCollection[0].NEXT_ROUT_CD != ROUTCD){
						$('#showMessageInfo').html('<font color=red>此SN当前应进行'+rowCollection[0].CURR_ROUT_NM+'操作!</font>');
						$("#search_SN").textbox('setValue','');
						return;
					}
					
					if(rowCollection[0].WO_STATE != '5'){
						$.messager.alert('提示','此SN不属于生产状态');
						return
					}
					
					$("#enditTabRepair").dialog("open").dialog('setTitle', search_MaterialWO_NO+' 产品维修明细');
					var dgrid = dataGrid.datagrid('options');
					if(!dgrid) return;
					var reqDataA = {
					    BAR_CODE: search_MaterialWO_NO,
						IFS: 'GW00062',
						pageIndex: 1,
						pageSize: dgrid.pageSize
					}
					reqGridData('/iPlant_ajax', 'RepairPosition_tab', reqDataA);
					
					bindGridData = function(reqDataA, jsonData) {
						var gridLists = {
							name: 'RepairPosition_tab',
							dataType: 'json',
							columns: [[
							    {field: 'BAR_CODE',title: '产品编码',width: 130,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
							    {field: 'FCT_CD',title: '工厂编码',hidden:true,width: 2,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  value+ "</span>";}},
							    {field: 'FCT_NM',title: '工厂名称',width: 90,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  value+ "</span>";}},
								{field: 'WC_NM',title: '车间编码',width: 90,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
							    	options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
								{field: 'WO_NO',title: '作业指示号',width: 140,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
									options:{validType:['length[1,100]','specialTextCharacter']}}},
								{field: 'MO_NO',title: '工单编码',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
								{field: 'ITEM_CD',title: '物料编码',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
								{field: 'ITEM_NM',title: '物料名称',width: 140,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
								{field: 'MAT_CD',title: '不良料号',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
								{field: 'INSP_TYPE',title: '抽检类型',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
								{field: 'IPQC_RSLT',title: '抽检结果',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
								{field: 'QC_DFCT_NM',title: '缺陷描述',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
								{field: 'CRT_NM',title: '抽检人',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
							]]
						 }
						initGridView(reqDataA, gridLists);
						$('#RepairPosition_tab').datagrid('loadData', jsonData);
					}
				}
            }
		};
		iplantAjaxRequest(ajaxParam);
	}
	
	
	comboboxAll=function(){
		/**
		 * 维修职责
		 */
		var ajaxParam1={
	            url:'/iPlant_ajax',
	            data:{
	                IFS:'E000040',
	            },
	            successCallBack:function(data){
	                var rowCollection=createSourceObj(data); 
	                var arr = [];
	                for(var i=0; i< rowCollection.length; i++){
	                	arr.push({"id":rowCollection[i].MT_POST_CD, "text":rowCollection[i].MT_POST_NM});
	                }
	                $('#MaintenanceResponsibility').combobox({
	                    data:arr,
	                    valueField:'id',
	                    textField:'text',
	                    panelWidth:140
	                });
	            }
	        }
	    iplantAjaxRequest(ajaxParam1);
	}
	
	/*维修时保存操作*/
	saveUserMes = function(){
		MethodFunRepair();
	}
	
	MethodFunRepair= function(){
		var TypeName = "维修";
		var checkedItems = $('#RepairPosition_tab').datagrid('getSelections');
        
		var MaintenanceResponsibility = $("#MaintenanceResponsibility").combobox("getValue");
   		var ReworkProcess = $("#ReworkProcess").textbox("getValue");
   		var MaintenanceReason = $("#MaintenanceReason").textbox("getValue");
   		var Remarks = $("#Remarks").textbox("getValue");
   		var arrUpdate = new Array();
   		arrUpdate.push({MAT_CD:checkedItems[0].MAT_CD,BAR_CODE:checkedItems[0].BAR_CODE,MO_NO:checkedItems[0].MO_NO,WO_NO:checkedItems[0].WO_NO,FCT_CD:checkedItems[0].FCT_CD,MT_POST_CD:MaintenanceResponsibility,MT_FUN_CD:ReworkProcess,MT_CAUSE_CD:MaintenanceReason,MO:Remarks,MT_FT_CD:TypeName});
   		
   		if(arrUpdate.length>0){
            var ajaxUpdateInsert = {
                url: '/iPlant_ajax',
                dataType: 'JSON',
                data: {
                    list: arrUpdate,
                    IFS: 'GW00061'
                },
                successCallBack: function (data) {
	               	 $.messager.alert('提示',TypeName+'处理已提交成功！');
	               	 $("#FailCause").dialog("close").dialog('setTitle', 'Fail原因录入');
                 return;
                },
                errorCallBack: function (data) {
               	    $.messager.alert('提示',TypeName+'处理已提交失败！');
                    return;
                }
            };
            iplantAjaxRequest(ajaxUpdateInsert);
  		 }
   		
	}
	
	
	/*产品直接报废*/
	btnScrapSn = function(TypeName){
		var checkedItems = $('#RepairPosition_tab').datagrid('getSelections');
        if (checkedItems.length==0) {
            $.messager.alert('提示', '请选中一条数据进行相关操作！');
            return;
        }
        if (checkedItems.length > 1) {
            $.messager.alert('提示', '请选中一条数据进行相关操作！');
            return;
        }
        var arrUpdate = new Array();
        /*验证是否已进行维修处理*/
        var ajaxUpdateCheckInsert = {
            url: '/iPlant_ajax',
            dataType: 'JSON',
            data: {
                MAT_CD: checkedItems[0].MAT_CD,
                BAR_CODE: checkedItems[0].BAR_CODE,
                IFS: 'GW00060'
            },
            successCallBack: function (data) {
            	var rowCollection=createSourceObj(data); 
            	if(rowCollection.length > 0){
            		if(rowCollection[0].MT_FT_CD == "报废"){
                		$.messager.alert('提示', checkedItems[0].MAT_CD+'已报废处理,请不要重复进行报废操作！');
    					return;
                	}else{ 
						$.messager.alert('提示', checkedItems[0].MAT_CD+'正在进行送修处理，不能报废操作！');
						return;
                	}
				}else{
					$.messager.confirm('确认框', '您确定对'+checkedItems[0].BAR_CODE+'进行'+TypeName+'处理吗？', function (r) {
			           	if(r==true){
			           		var MaintenanceResponsibility = $("#MaintenanceResponsibility").combobox("getValue");
			           		var ReworkProcess = $("#ReworkProcess").textbox("getValue");
			           		var MaintenanceReason = $("#MaintenanceReason").textbox("getValue");
			           		var Remarks = $("#Remarks").textbox("getValue");
			           		arrUpdate.push({MAT_CD:checkedItems[0].MAT_CD,BAR_CODE:checkedItems[0].BAR_CODE,MO_NO:checkedItems[0].MO_NO,WO_NO:checkedItems[0].WO_NO,FCT_CD:checkedItems[0].FCT_CD,MT_POST_CD:MaintenanceResponsibility,MT_FUN_CD:ReworkProcess,MT_CAUSE_CD:MaintenanceReason,MO:Remarks,MT_FT_CD:TypeName});
			           		if(arrUpdate.length>0){
			                    var ajaxUpdateInsert = {
			                        url: '/iPlant_ajax',
			                        dataType: 'JSON',
			                        data: {
			                            list: arrUpdate,
			                            IFS: 'GW00061'
			                        },
			                        successCallBack: function (data) {
			                       	 showmessage.html('<font color=red>'+TypeName+'处理成功！</font>');
			                            return;
			                        },
			                        errorCallBack: function (data) {
			                       	 showmessage.html('<font color=red>'+TypeName+'处理失败！</font>');
			                            return;
			                        }
			                    };
			                    iplantAjaxRequest(ajaxUpdateInsert);
			          		 }
			           	}
			       });   
				}
            }
        };
        iplantAjaxRequest(ajaxUpdateCheckInsert);
	}
	
	/**
	 * 维修完成后更新BC_STATE
	 * @param TypeName
	 */
	RepairCompleate=function(TypeName){
		var checkedItems = $('#RepairPosition_tab').datagrid('getSelections');
        if (checkedItems.length==0) {
            $.messager.alert('提示', '请选中一条数据进行相关操作！');
            return;
        }
        if (checkedItems.length > 1) {
            $.messager.alert('提示', '请选中一条数据进行相关操作！');
            return;
        }
        var BARCODE = checkedItems[0].BAR_CODE;
        ajaxParamUpdate = {
			url: '/iPlant_ajax',
			dataType: 'JSON',
			data:{
				BC_STATUS: '0',
				BAR_CODE: BARCODE,
				IFS: 'GW00063'
			},
			successCallBack: function(data) {
			  var reqData = {
					ROUT_CD: ROUTCD,	
				    BAR_CODE: BARCODE,
					IFS: 'MF99999'
				}
			   universalAccess('/iPlant_ajax',reqData);
		       $("#enditTabRepair").dialog("close").dialog('setTitle','产品维修明细');
			   $.messager.alert('提示','维修已完成，已进入下一步骤！');
			}
		};
	   iplantAjaxRequest(ajaxParamUpdate);
	}
	
	
	
	/*产品维修*/
	btnScrapSnRepair = function(TypeName){
		var checkedItems = $('#RepairPosition_tab').datagrid('getSelections');
        if (checkedItems.length==0) {
            $.messager.alert('提示', '请选中一条数据进行相关操作！');
            return;
        }
        if (checkedItems.length > 1) {
            $.messager.alert('提示', '请选中一条数据进行相关操作！');
            return;
        }
       /*验证是否已进行维修处理*/
        var ajaxUpdateCheckInsert = {
            url: '/iPlant_ajax',
            dataType: 'JSON',
            data: {
                MAT_CD: checkedItems[0].MAT_CD,
                BAR_CODE: checkedItems[0].BAR_CODE,
                IFS: 'GW00060'
            },
            successCallBack: function (data) {
            	var rowCollection=createSourceObj(data); 
            	if(rowCollection.length > 0){
            		if(rowCollection[0].MT_FT_CD == "报废"){
                		$.messager.alert('提示', checkedItems[0].MAT_CD+'已报废,不可维修！');
    					return;
                	}else{ 
						$.messager.alert('提示', checkedItems[0].MAT_CD+'已进行过送修处理，请勿重复送修,过站请点完成！');
						return;
                	}
				}else{
					$.messager.confirm('确认框', '您确定对'+checkedItems[0].BAR_CODE+'进行'+TypeName+'处理吗？', function (r) {
			           	if(r==true){
			           		$("#FailCause").dialog("open").dialog('setTitle', 'Fail原因录入');
			           		comboboxAll();
			           	}
			       });  
				}
            }
        };
        iplantAjaxRequest(ajaxUpdateCheckInsert);
	}
	
	var MAC,IP,ROUTCD;
	GetFromMacAddress = function(cdId){
		var ip = getIP();
		if(cdId!=null && cdId!=''){
			var ajaxParam = {
				data: {
					url: '/iPlant_ajax',
					IFS: 'GX00075',
					//BUSI_CODE: cdId
					IP_ADDRESS : ip
				},
				successCallBack:function(data){
					var rowCollection = createSourceObj(data); 
					MAC = rowCollection[0].MAC_ADDRESS;
					IP = rowCollection[0].IP_ADDRESS;
					ROUTCD = rowCollection[0].ROUT_CD;
	            }
		   };
		 iplantAjaxRequest(ajaxParam);
		}
	}
	
	factoryInfo.prototype = {
		init: function() {
			$(function() {
				var cdId = getQueryString("cdId");
				GetFromMacAddress(cdId);
				/*初始化全局变量对象*/
				dataGrid = $('#OQCposition_tab'),dataCompany=[],dataFactory=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				initGridData();
				$('#search_ENTERSN').textbox('textbox').keydown(function (e) {
			         if (e.keyCode == 13) {
			        	 checkLoginName();
			         }
			     });
				$('#btnRepair').click(function() {			
					var TypeName = "维修";
					btnScrapSnRepair(TypeName);
				});
				/*直接报废*/
				$('#btnScrap').click(function() {
					var TypeName = "报废";
					btnScrapSn(TypeName);
				})
				/*完成操作*/
				$('#btnComplate').click(function() {
					var TypeName = "完成";
					RepairCompleate(TypeName);
				})
				
				$('#getTreeFun').click(function() {
					bindTreeData();
					initLeftMenu();
				});
				
				$('#getTreeReason').click(function() {
					bindTreeData2();
					initLeftMenu2();
				});
				
				$('#btnAdd').click(function() {					
					insertDataGrid('OQCposition_tab',{});
				});
				
				$('#btnDelete').click(function(){
					deleteDataGrid('OQCposition_tab','ITEM_TYPE_CD','Z000004','showMessageInfo');
	            });
			});
		}
	}
	var fcfo = new factoryInfo();
	fcfo.init();
})();