/* 启动时加载 */
/*
 */
(function() {
	function factoryInfo() {
		initGridData = function() {
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			var search_Code = $('#search_Code').textbox('getValue');
			var reqData = {
				BAR_CODE: search_Code,	
				IFS: 'MF00111',
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'OQCDetermine_tab', reqData);
		},
		
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'OQCDetermine_tab',
				dataType: 'json',
				columns: [[
					{field: 'BAR_CODE',title: '产品SN',width: 200,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" + value+ "</span>";}},
					{field: 'OQC_LOTID',title: 'OQC LotID',width: 200,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" + value+ "</span>";}},
					{field: 'MO_NO',title: '工单编码',width: 120, align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'WO_NO',title: '作业指示编码',width: 150, align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'ITEM_CD',title: '物料编码',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'ITEM_NM',title: '物料名称',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'QTY',title: '数量',width: 60,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
						   
				]],
			}
			initGridView(reqData, gridList);
			dataGrid.datagrid('loadData', jsonData);
		}
	}
	
	/*验证此BAR_CODE是否属于该作业指示*/
	QuerySN = function(){
		
		/*var ajaxParamA = {
				data: {
					url: '/iPlant_ajax',
					IFS: 'GW00006',
					BAR_CODE: search_Code
				},
				successCallBack:function(data){
					var rowCollection=createSourceObj(data); 
					验证当前SN工序路线是否匹配
					if(rowCollection[0].NEXT_ROUT_CD ==null || rowCollection[0].NEXT_ROUT_CD ==""){
						$('#showMessageInfo').html('<font color=red>此SN当前应进行投入工位操作!</font>');
						$("#search_SN").textbox('setValue','');
						return;
					}else if(rowCollection[0].NEXT_ROUT_CD != ROUTCD){
						$('#showMessageInfo').html('<font color=red>此SN当前应进行'+rowCollection[0].CURR_ROUT_NM+'操作!</font>');
						$("#search_SN").textbox('setValue','');
						return;
					}*/
					
					var rows = $('#OQCDetermine_tab').datagrid('getRows');
					var search_Code = $('#search_Code').textbox('getValue');	/*获取扫描的条码*/
					if(search_Code==null || search_Code==''){
						$('#showMessageInfo').html('<font color=red>条码不能为空</font>');
						return;
					}
					var ajaxParam = {
						data: {
							url: '/iPlant_ajax',
							BAR_CODE: search_Code,	
							IFS: 'MF00111',
						},
						successCallBack:function(data){
							var rowCollection=createSourceObj(data); 
							if(rowCollection.length <= 0){
								$('#btnAdd').linkbutton('disable'); 
								$('#showMessageInfo').html('<font color=red>该SN不存在，请重新输入</font>');
								return;
							}else{
								/*启用按钮*/
								$('#btnAdd').linkbutton('enable'); 	 					
								/*将信息显示在主表信息显示区域*/
								$("#OQC_LOTID").textbox('setValue',rowCollection[0].OQC_LOTID);					/*LOT号*/
								$("#MO_NO").textbox('setValue',rowCollection[0].MO_NO);							/*工单号*/
								$("#WO_NO").textbox('setValue',rowCollection[0].WO_NO);							/*作业指示号*/
								$("#ITEM_CD").textbox('setValue',rowCollection[0].ITEM_CD);						/*物料编码*/
								$("#ITEM_NM").textbox('setValue',rowCollection[0].ITEM_NM);						/*物料名称*/
								$("#TOT_QTY").textbox('setValue',rowCollection[0].TOT_QTY);						/*总数*/
								$("#SAMP_QTY").textbox('setValue',rowCollection[0].SAMP_QTY);					/*抽检数*/
								$("#TOT_INSP_QTY").textbox('setValue',rowCollection[0].TOT_INSP_QTY);			/*已抽检数*/
								$("#INSP_RSLT").textbox('setValue',rowCollection[0].INSP_RSLT);					/*抽检结果*/
								/*将信息显示在OQC抽检信息中*/
								initGridData();
							}
			            }
					};
					iplantAjaxRequest(ajaxParam);
			/*	}
			};
		iplantAjaxRequest(ajaxParamA);*/
	}
	
	/*checkSnSampling LOT弹框 扫描SN 回车事件*/
	checkSnSampling = function(PassState){
		var SNNum = $('#SNNum').textbox('getValue');
		if(SNNum==null || SNNum==''){
			$.messager.alert("提示", '请输入SN条码！')
			return;
		}
		var ajaxParam = {
				data: {
					url: '/iPlant_ajax',
					IFS: 'GW00006',
					BAR_CODE: SNNum
				},
				successCallBack:function(data){
					var rowCollection=createSourceObj(data); 
					if(rowCollection.length <= 0){
						$.messager.alert("提示", '该SN条码不存在，请重新输入！')
						return;
					}else{
						$("#insp_id").val(rowCollection[0].BAR_CODE);
						$("#insp_fcd").val(rowCollection[0].FCT_CD);
						$("#insp_wcd").val(rowCollection[0].WC_CD);
						$("#lineId").val(rowCollection[0].LINE_CD);
						$("#insp_item").val(rowCollection[0].ITEM_CD);
						$('#pass').linkbutton('enable');
						$('#fail').linkbutton('enable');
						$('#showMessageInfo2').html('');
						/*OQC Pass fail操作*/ 
						addIPQC = function(PassState){
						var OQC_LOTID = $("#LOTCode").textbox('getValue');
						var ITEM_CD = $("#insp_item").val();	
							
						var ipqcInfo = {
								BAR_CODE: rowCollection[0].BAR_CODE,
								FCT_CD: rowCollection[0].FCT_CD,
								MO_NO: rowCollection[0].MO_NO,
								OQC_TYPE: "OQC抽检",
								WO_NO: rowCollection[0].WO_NO,
								LINE_CD: rowCollection[0].LINE_CD,
								ITEM_CD: rowCollection[0].ITEM_CD,
								MO: $("#description").val(),
								QC_DFCT_CD: $("#faildNum").textbox('getValue'),
								OQC_RES: PassState,
								OQC_LOTID: $("#LOTCode").textbox('getValue'),
								QC_RSN_DIST: $('#checkProject').combobox('getValue'),
								MAT_CD: $('#partNum').combobox('getValue'),
								IFS:'GW00030'	
							}
						 ajaxParamA = {
								url: '/iPlant_ajax',
								dataType: 'JSON',
								data: ipqcInfo,
								successCallBack: function(data) {
									ajaxParamTime = {
										url: '/iPlant_ajax',
										dataType: 'JSON',
										data:{
											FCT_CD: $("#insp_fcd").val(),
											OQC_LOTID: $("#LOTCode").textbox('getValue'),
											WC_CD: $("#insp_wcd").val(),
											OQC_TYPE:'OQC抽检',
											INSP_RSLT: PassState,
											IFS:'GW00032'
										},
										successCallBack: function(data) {
											if(PassState=="fail"){
											   ajaxParamUpdate = {
													url: '/iPlant_ajax',
													dataType: 'JSON',
													data:{
														BAR_CODE: $("#insp_id").val(),
														IFS: 'GW00063'
													},
													successCallBack: function(data) {
													}
												};
											   iplantAjaxRequest(ajaxParamUpdate);
											   $.messager.alert('提示','录入fail原因成功，继续录入请选择原因后点击添加按钮,过站请点击完成按钮！');
											   $('#pass').linkbutton('disable');
											   OpenFrameAttribute(ITEM_CD,OQC_LOTID);
											}
											
											if(PassState=="pass"){
												/*var reqData = {
													ROUT_CD: ROUTCD,	
												    BAR_CODE: $("#insp_id").val(),
														IFS: 'MF99999'
													}
												   universalAccess('/iPlant_ajax',reqData);
												   $.messager.alert('提示','外观及测试检测已完成，已进入下一步骤！');
											   */
											   $.messager.alert('提示','抽检完成,继续请扫描SN！');
											   $('#SNNum').textbox('setValue','');
											   $('#pass').linkbutton('disable');
											   $('#fail').linkbutton('disable');
											   OpenFrameAttribute(ITEM_CD,OQC_LOTID);
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
					   iplantAjaxRequest(ajaxParamA);
					  }		
					}
	            }
			};
			iplantAjaxRequest(ajaxParam);
	}
	
	checkLoginName = function(dgrid){
			$("#LOTChecked").dialog("open").dialog('setTitle', '抽检清单');
			$('#pass').linkbutton('disable');
			$('#fail').linkbutton('disable');
			
			var LOTCode;
			ajaxParamLotSamp = {
				url: '/iPlant_ajax',
				dataType: 'JSON',
				data: {
					SAMP_VAL: $("#ITEM_CD").textbox('getValue'),
					IFS:'Q000001'
				},
				successCallBack: function(dataSamp) {
				   var rowCollectionSamp=createSourceObj(dataSamp);
				   if(rowCollectionSamp.length <= 0){
					   $.messager.alert("提示", '请前往抽检比例页面进行数据维护！');
					   $("#LOTChecked").dialog("close").dialog('setTitle', '抽检清单');
					   return;
				   }else{
					   $("#BatchNum").textbox('setValue',rowCollectionSamp[0].SAMP_LOT);
					   $("#SpotCheckNum").textbox('setValue',rowCollectionSamp[0].SAMP_QTY);
					   ajaxParamLot = {
							url: '/iPlant_ajax',
							dataType: 'JSON',
							data: {
								ITEM_CD: $("#ITEM_CD").textbox('getValue'),
								IFS:'GW00031'
							},
							successCallBack: function(data) {
								var rowCollection=createSourceObj(data);
								if(rowCollection.length > 0){
									$("#LOTCode").textbox('setValue',rowCollection[0].OQC_LOTID);
									OpenFrameAttribute(ITEM_CD,rowCollection[0].OQC_LOTID);
								}else{
									LOTCode = autoCreateCode("OQCLOT");
									$("#LOTCode").textbox('setValue',LOTCode);
									$("#SpotCheckNumYet").textbox('setValue',0);
									OpenFrameAttribute(ITEM_CD,LOTCode);
								}
							}	
						};
					iplantAjaxRequest(ajaxParamLot);
				 }
			  }
		   };
		  iplantAjaxRequest(ajaxParamLotSamp);
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
	        	$("#faildNum").textbox("setValue",node.text);
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
	
	/**
	 * 添加fail原因
	 */
	saveUserMes=function(){
		var PassState = "fail"
	    addIPQC(PassState);
	}
	
	/**
	 * 点击完成按钮  更新WIP
	 */
	saveOK=function(){
		var rows = $('#SamplingList').datagrid('getRows');
		for (var i = 0; i < rows.length; i++) {  
	        if(rows[i]['OQC_RES'] == "fail" ){
	        	ajaxParamUpdateOqcState = {
    				url: '/iPlant_ajax',
    				dataType: 'JSON',
    				data:{
    					OQC_LOTID: OQC_LOTID,
    					IFS: 'GW00064'
    				},
    				successCallBack: function(data) {
    				}
    			};
	    		iplantAjaxRequest(ajaxParamUpdateOqcState);
	        }
		}
		/*var reqData = {
				ROUT_CD: ROUTCD,	
			    BAR_CODE: $("#SNNum").textbox("getValue"),
				IFS: 'MF99999'
			}
			universalAccess('/iPlant_ajax',reqData);
	   $.messager.alert('提示','外观及测试检测已完成，已进入下一步骤！');*/
	   OpenFrameAttribute(ITEM_CD,OQC_LOTID);
	}
	
	
	
	OpenFrameAttribute = function(ITEM_CD,OQC_LOTID){
		var dgrid = dataGrid.datagrid('options');
		if(!dgrid) return;
		
		var reqDataA = {
			ITEM_CD: ITEM_CD,
			OQC_LOTID: OQC_LOTID,
			IFS: 'GW00031'
		}
		reqGridData('/iPlant_ajax', 'SamplingList', reqDataA);
		
		bindGridData = function(reqDataA, jsonData) {
			var gridLists = {
				name: 'SamplingList',
				dataType: 'json',
				columns: [[
					{field: 'OQC_LOTID',title: 'LOT号',width: 160, align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				    {field: 'WO_NO',title: '作业指示编码',width: 140, align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				    {field: 'MO_NO',title: '工单编码',width: 120, align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				    {field: 'BAR_CODE',title: '产品SN',width: 120, align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				    {field: 'ITEM_CD',title: '物料编码',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				    {field: 'ITEM_NM',title: '物料名称',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				    {field: 'MAT_CD',title: '物料号',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				    {field: 'OQC_RES',title: '判定结果',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'OQC_DT',title: '判定日期',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
				]]
			}
			initGridView(reqDataA, gridLists);
			$('#SamplingList').datagrid('loadData', jsonData);
		}
	}
	
	/*查询位置和料号*/
	searchMatCD = function(){
		var MaterialWO_NO = $("#WO_NO").textbox('getValue');
		var MaterialCodes = $("#ITEM_CD").textbox('getValue');
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
                    checkProjectAjax();
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
	
	/*抽检项目下拉*/
	checkProjectAjax= function(){
		var ajaxParamCheckPro={
                url:'/iPlant_ajax',
                data:{
                    IFS:'Q000005'
                },
                successCallBack:function(data){
                	$('#checkProject').combobox('clear');
                    var rowCollectionPro=createSourceObj(data); 
                    var arrPro = [];
                    for(var i=0; i< rowCollectionPro.length; i++){
                    	arrPro.push({"id":rowCollectionPro[i].SAMP_ITEM_CD, "text":rowCollectionPro[i].SAMP_ITEM_CD+"("+rowCollectionPro[i].SAMP_ITEM_NM+")"});
                    }
                    $('#checkProject').combobox({
                        data:arrPro,
                        valueField:'id',
                        textField:'text',
                        panelWidth:200
                    });
                }
            }
       iplantAjaxRequest(ajaxParamCheckPro);
	}
	
	var MAC,IP,ROUTCD;
	GetFromMacAddress = function(cdId){
		if(cdId!=null && cdId!=''){
			var ajaxParam = {
				data: {
					url: '/iPlant_ajax',
					IFS: 'GX00075',
					BUSI_CODE: cdId
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
				$('#btnAdd').linkbutton('disable');
				var cdId = getQueryString("cdId");
				GetFromMacAddress(cdId);
				/*初始化全局变量对象*/
				dataGrid = $('#OQCDetermine_tab');
				initGridData();
				
				/*根据作业指示编码查询作业工单信息*/
				$('#btnSearch').click(function() {
					searchMO_NO();
				});
				
				$('#SNNum').textbox('textbox').keydown(function (e) {
			         if (e.keyCode == 13) {
			        	 checkSnSampling();
			         }
			     });
				
				$("#pass").click(function(){
					var PassState = "pass"
					addIPQC(PassState);
				});
				
				$('#fail').click(function() {					
					$("#FailCause").dialog("open").dialog('setTitle', 'Fail原因录入');
					searchMatCD();
					$('#getTree').click(function() {
						bindTreeData();
						initLeftMenu();
					});
				});
				
				$('#search_Code').textbox('textbox').keydown(function (e) {
			         if (e.keyCode == 13) {
			        	 QuerySN();
			         }
			     });
				$('#btnAdd').click(function(){
					if($(this).hasClass('l-btn-disabled') == false) {
						$("#LOTChecked").dialog("open").dialog('setTitle', '抽检清单');
						$('#pass').linkbutton('disable');
						$('#fail').linkbutton('disable');
						OQC_LOTID = $('#OQC_LOTID').textbox('getValue');
						ITEM_CD = $('#ITEM_CD').textbox('getValue');
						OpenFrameAttribute(ITEM_CD,OQC_LOTID);
						
						$('#LOTCode').textbox('setValue',OQC_LOTID);
						$('#BatchNum').textbox('setValue',$('#TOT_QTY').textbox('getValue'));
						$('#SpotCheckNum').textbox('setValue',$('#SAMP_QTY').textbox('getValue'));
						$('#SpotCheckNumYet').textbox('setValue',$('#TOT_INSP_QTY').textbox('getValue'));
					}
				})
			});
		}
	}
	var fcfo = new factoryInfo();var OQC_LOTID,ITEM_CD
	fcfo.init();
})();