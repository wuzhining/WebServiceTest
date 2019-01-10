/* 启动时加载 */
/*
 */
(function() {
	function factoryInfo() {
		initGridData = function() {
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			var reqData = {
				IFS: 'GW00010',
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'IPQCPosition_tab', reqData);
		},
		
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'IPQCPosition_tab',
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
			}
			initGridView(reqData, gridList);
			dataGrid.datagrid('loadData', jsonData);
		}
		
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
		        	$("#faildNum").textbox("setValue",node.id);
		        },
		    }
		    initTree(treeConfig);
		    $('#dd').tree(treeConfig);
		},
		initLeftMenu = function () {
		    var reqData = {
		        IFS: 'E0000018'
		    }
		    reqTreeData('/iPlant_ajax',reqData);
		}
		
		
		
	}

	
	/*失去焦点事件*/
	checkLoginName = function(dgrid){
		$('#showMessageInfo').html('');
		var search_MaterialWO_NO = $('#search_ENTERSN').textbox('getValue');
		if(search_MaterialWO_NO==null || search_MaterialWO_NO==''){
			$('#pass').linkbutton('disable');
			$('#fail').linkbutton('disable');
			$.messager.alert("提示", '请输入SN条码！')
			$("#fmStation").form("clear");
			return;
		}
		var ajaxParamA = {
			data: {
				url: '/iPlant_ajax',
				IFS: 'GW00006',
				BAR_CODE: search_MaterialWO_NO
			},
			successCallBack:function(data){
				var rowCollection=createSourceObj(data); 
				if(rowCollection.length <= 0){
					$('#pass').linkbutton('disable');
					$('#fail').linkbutton('disable');
					$.messager.alert("提示", '此SN条码不存在，请重新输入！')
					$("#fmStation").form("clear");
					return;
				}else{
					$("#workOrder").textbox('setValue',rowCollection[0].MO_NO);				/*工单编码*/
					$("#MaterialCodes").textbox('setValue',rowCollection[0].ITEM_CD);		/*物料编码*/
					$("#PlanProductCount").textbox('setValue',rowCollection[0].PLAN_WO_QTY);/*计划量*/
					$("#Line_Cd").textbox('setValue',rowCollection[0].LINE_NM);				/*线别*/
					$("#passNum").textbox('setValue',rowCollection[0].GOOD_QTY);			/*通过数*/
					$("#failNum").textbox('setValue',rowCollection[0].DFCT_QTY);			/*不合格数*/
					$("#WO_NO").textbox('setValue',rowCollection[0].WO_NO);					/*作业指示编码*/
					$("#search_SN").textbox('setValue',search_MaterialWO_NO);   			/*给当前SN赋值*/
					var insp_id=rowCollection[0].BAR_CODE;
					$("#insp_id").val(insp_id);
					$("#FCT_CD").val(rowCollection[0].FCT_CD);
					$("#lineId").val(rowCollection[0].LINE_CD);
					
					/*验证当前SN工序路线是否匹配*/
					if(rowCollection[0].NEXT_ROUT_CD ==null || rowCollection[0].NEXT_ROUT_CD ==""){
						$('#pass').linkbutton('disable');
						$('#fail').linkbutton('disable');
						$('#showMessageInfo').html('<font color=red>此SN当前应进行投入工位操作!</font>');
						$("#search_SN").textbox('setValue','');
						return;
					}else if(rowCollection[0].NEXT_ROUT_CD != ROUTCD){
						$('#pass').linkbutton('disable');
						$('#fail').linkbutton('disable');
						$('#showMessageInfo').html('<font color=red>此SN当前应进行'+rowCollection[0].CURR_ROUT_NM+'操作!</font>');
						$("#search_SN").textbox('setValue','');
						return;
					}else{
						if(rowCollection[0].WO_STATE == '5'){
							$('#pass').linkbutton('enable');
							$('#fail').linkbutton('enable');
							
							
							if($("#before_oneSN").val() == ""){
								$("#search_SN").textbox('setValue',$("#search_ENTERSN").val());
								$("#before_oneSN").textbox('setValue','');
								$("#before_twoSN").textbox('setValue','');
							}else if($("#search_SN").val() != ""){
								$("#search_SN").textbox('setValue',$("#search_ENTERSN").val());
								$("#before_oneSN").textbox('setValue',$("#search_SN").val());
								$("#before_twoSN").textbox('setValue','');
							}else if($("#before_oneSN").val() != ""){
								$("#search_SN").textbox('setValue',$("#search_ENTERSN").val());
								$("#before_oneSN").textbox('setValue',$("#search_SN").val());
								$("#before_twoSN").textbox('setValue',$("#before_oneSN").val());
							}
							
							
							
							$("#search_SN").textbox('setValue',$("#search_ENTERSN").val());
							$("#before_oneSN").textbox('setValue',$("#search_SN").val());
							$("#before_twoSN").textbox('setValue',$("#before_oneSN").val());
							
							/*PASS与FAIL按钮操作*/
							var ipqcInfo;
							addIPQC = function(flag){
								ipqcInfo = {
									BAR_CODE: $("#insp_id").val(),
									FCT_CD: $("#FCT_CD").val(),
									MO_NO: $("#workOrder").val(),
									IPQC_RSLT: flag,
									INSP_TYPE: "IPQC抽检",
									WO_NO: $("#WO_NO").val(),
									LINE_CD: $("#lineId").val(),
									ITEM_CD: $("#MaterialCodes").val(),
									QC_DFCT_CD: $("#faildNum").val(),
									MO: $("#description").val(),
									MAT_CD: $("#partNum").combobox("getValue"),
									IFS:'GW00011'
								}
								
							 ajaxParamB = {
								url: '/iPlant_ajax',
								dataType: 'JSON',
								data:ipqcInfo,
								successCallBack: function(data) {
									ajaxParamTime = {
										url: '/iPlant_ajax',
										dataType: 'JSON',
										data:{
											FCT_CD:rowCollection[0].FCT_CD,
											WC_CD:rowCollection[0].WC_CD,
											INSP_ID:$("#insp_id").val(),
											INSP_RSLT: flag,
											INSP_TYPE: "IPQC抽检",
											IFS:'GW00012'
										},
										successCallBack: function(data) {
											if(flag=="fail"){
											   ajaxParamUpdate = {
													url: '/iPlant_ajax',
													dataType: 'JSON',
													data:{
														BC_STATUS: '1',
														BAR_CODE: $("#insp_id").val(),
														IFS: 'GW00063'
													},
													successCallBack: function(data) {
													}
												};
											   iplantAjaxRequest(ajaxParamUpdate);
											   $("#showMessageFail").html('<font color=red>录入fail原因成功，继续录入请选择原因后点击添加按钮,过站请点击完成按钮！</font>');
											   $('#MaterialType_open_YI').dialog('open');
											   $("#fmFailedMes").form("clear");
											   $('#pass').linkbutton('disable');
											}
											if(flag=="pass"){
											   var reqData = {
													ROUT_CD: ROUTCD,	
												    BAR_CODE: $("#insp_id").val(),
												    TEMP_CODE: 'GW00000',  
													IFS: 'MF99999'
												}
											   universalAccess('/iPlant_ajax',reqData);
											   $.messager.alert('提示','外观及测试检测已完成，已进入下一步骤！');
											   $('#pass').linkbutton('disable');
											   $('#fail').linkbutton('disable');
											}
										},
										errorCallBack: function() {
											$.messager.alert('提示','抽检失败，请联系管理员');
										}
								    };
								 iplantAjaxRequest(ajaxParamTime);
								},
								errorCallBack: function() {
									$.messager.alert('提示','抽检失败，请联系管理员');
								}
							  };
							iplantAjaxRequest(ajaxParamB);
							}
						}else{
							$.messager.alert('提示','此SN不属于生产状态');
							return
						}
					}
				}
            }
		};
		iplantAjaxRequest(ajaxParamA);
	}
	
	/*查询位置和料号*/
	searchMatCD = function(){
		var MaterialWO_NO = $("#WO_NO").textbox('getValue');
		var MaterialCodes = $("#MaterialCodes").textbox('getValue');
		if(MaterialWO_NO!=null && MaterialWO_NO!=''){
			var ajaxParamWo={
	                url:'/iPlant_ajax',
	                data:{
	                    IFS:'W0000017',
	                    WO_NO: MaterialWO_NO
	                },
	                successCallBack:function(data){
	                	$('#partNum').combobox('clear');
                        var rowCollection=createSourceObj(data); 
                        var arr = [];
                        for(var i=0; i< rowCollection.length; i++){
                        	arr.push({"id":rowCollection[i].MAT_CD, "text":rowCollection[i].MAT_CD+"("+rowCollection[i].MAT_NM+")"});
                        }
                        $('#partNum').combobox({
                            data:arr,
                            valueField:'id',
                            textField:'text',
                            panelWidth:200
                        });
                        
	                	if(MaterialCodes!=null && MaterialCodes!=''){
	                		var ajaxParamPost={
                                url:'/iPlant_ajax',
                                data:{
                                	ITEM_CD: MaterialCodes,
                                    IFS:'Z000039'
                                },
                                successCallBack:function(data){
                                	$('#place').combobox('clear');
                                    var rowCollectiona=createSourceObj(data); 
                                    var arrPost = [];
                                    for(var i=0; i< rowCollectiona.length; i++){
                                    	arrPost.push({"id":rowCollectiona[i].ITEM_POST, "text":rowCollectiona[i].ITEM_POST+"("+rowCollectiona[i].ITEM_STATUS+")"});
                                    }
                                    $('#place').combobox({
                                        data:arrPost,
                                        valueField:'id',
                                        textField:'text',
                                        panelWidth:200
                                    });
                                }
	                        }
	                        iplantAjaxRequest(ajaxParamPost);
	                	}
	                }
	         }
	        iplantAjaxRequest(ajaxParamWo);
		}
	}
	
	/*添加fail原因*/
	saveUserMes=function(){
		addIPQC("fail");
	}
	
	/**
	 * 完成按钮并更新WIP
	 */
	saveOK=function(){
	    
		console.log("ROUTCD=="+ROUTCD+"----------="+$("#insp_id").val())
		var reqData = {
			ROUT_CD: ROUTCD,	
		    BAR_CODE: $("#insp_id").val(),
		    TEMP_CODE: 'GW00000',  
			IFS: 'MF99999'
		}
	   universalAccess('/iPlant_ajax',reqData);
	   $.messager.alert('提示','外观及测试检测已完成，已进入下一步骤！');
	   $('#MaterialType_open_YI').dialog('close');
	   $('#pass').linkbutton('disable');
	   $('#fail').linkbutton('disable');
	   
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
				$('#pass').linkbutton('disable');
				$('#fail').linkbutton('disable');
				var cdId = getQueryString("cdId");
				GetFromMacAddress(cdId);
				/*初始化全局变量对象*/
				dataGrid = $('#IPQCPosition_tab'),dataCompany=[],dataFactory=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				initGridData();
				
				$('#btnAdd').click(function() {					
					insertDataGrid('IPQCPosition_tab',{});
				});
				
				$('#search_ENTERSN').textbox('textbox').keydown(function (e) {
			         if (e.keyCode == 13) {
			        	 checkLoginName();
			         }
			     });
				
				$('#import').click(function() {
					OpenImprotFrame();
				});
				
				$('#fail').click(function() {
					if($(this).hasClass('l-btn-disabled') == false){
						$("#MaterialType_open_YI").dialog("open").dialog('setTitle', 'Fail原因录入');
						searchMatCD();
						$('#getTree').click(function() {
							bindTreeData();
							initLeftMenu();
						});
					}
				});
				
				$("#pass").click(function(){
					if($(this).hasClass('l-btn-disabled') == false){
						addIPQC("pass");
					}
				});
				
			});
		}
	}
	var fcfo = new factoryInfo();
	fcfo.init();
})();