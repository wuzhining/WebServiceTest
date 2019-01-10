/* 启动时加载 */
/*
 */
(function() {
	function factoryInfo() {
		initGridData = function(ifs) {
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			var reqData = {
			    WO_NO: wono,	
				IFS: ifs,
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'IntoTheProcess_tab', reqData);
		},
		
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'IntoTheProcess_tab',
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
		}
	}
	
	
	/*验证此BAR_CODE是否属于该作业指示*/
	QuerySN = function(){
		var BAR_CODE =$('#searchentersn').textbox('getValue');
		if(BAR_CODE!='' && BAR_CODE!=null){
				var ajaxParam = {
					data: {
						url: '/iPlant_ajax',
						IFS: 'GW00006',
						BAR_CODE: BAR_CODE,
					},
					successCallBack:function(data){
						if(data.RESPONSE[0].RESPONSE_DATA.length == 0){
							$.messager.alert('提示','此条码不存在');
							return
						}
						var rowCollection = createSourceObj(data); 
						wono = rowCollection[0].WO_NO;
						var ajaxParam = {
							data: {
								url: '/iPlant_ajax',
								IFS: 'GW00001',
								WO_NO: rowCollection[0].WO_NO
							},
							successCallBack:function(data){
								var rowCollection=createSourceObj(data); 
								if(rowCollection.length <= 0){
									$.messager.alert("提示", '该作业指示编号不存在，请重新输入！')
									$("#fmStation").form("clear");
									return;
								}else{
									if(rowCollection.length > 1){
										$("#fmStation").form("clear");
									}else{
										$("#workOrder").textbox('setValue',rowCollection[0].MO_NO);					/*生产订单号1b*/
										$("#WoNoCode").textbox('setValue',rowCollection[0].WO_NO);					/*生产订单号1b*/
										$("#MaterialCode").textbox('setValue',rowCollection[0].ITEM_CD);			/*物料编码1b*/
										$("#PlanProductCount").textbox('setValue',rowCollection[0].PLAN_WO_QTY);	/*作业指示计划量1*/
										$("#Line_Cd").textbox('setValue',rowCollection[0].LINE_NM);					/*产线名称*/
										$("#workState").textbox('setValue',rowCollection[0].MO_STATE_NM);			/*工单状态1b*/
										$("#MaterialName").textbox('setValue',rowCollection[0].ITEM_NM);			/*物料名称1*/
										$("#PlanStartDate").textbox('setValue',rowCollection[0].PLAN_STRT_DT);		/*计划开始时间1*/
										$("#PlanEndDate").textbox('setValue',rowCollection[0].PLAN_END_DT);			/*计划完成时间1*/
									}
									initGridData('GW00005');
								}
				            }
						};
						iplantAjaxRequest(ajaxParam);
						if(rowCollection.length>0){
							$("#thismomentSN").textbox('setValue',rowCollection[0].BAR_CODE);			
							/*验证当前SN工序路线是否匹配*/
							if(rowCollection[0].NEXT_ROUT_CD ==null || rowCollection[0].NEXT_ROUT_CD =='' ){
								if(rowCollection[0].WO_STATE != "2" && rowCollection[0].WO_STATE != "5"){
									$.messager.alert('提示','该作业指示不属于生产状态');
									return
								}
								if(rowCollection[0].NEXT_ROUT_CD != ROUTCD){
									$('#showMessageInfo').html('<font color=red>此SN当前应进行'+rowCollection[0].CURR_ROUT_NM+'操作!</font>');
									return;
								}
								confirmInputLotInfo(rowCollection[0].BAR_CODE);
								var reqData = {
									ROUT_CD: ROUTCD,	
								    BAR_CODE: rowCollection[0].BAR_CODE,
								    TEMP_CODE: 'GW00000',  
									IFS: 'MF99999'
								}
							   universalAccess('/iPlant_ajax',reqData);
								
								if(rowCollection[0].WO_STATE == "2" ){
									var reqDataB = {
											WO_STATE: '5',	
										    WO_NO:rowCollection[0].WO_NO,
										    MO_NO:rowCollection[0].MO_NO,
											IFS: 'GW00004'
										}
									   universalAccess('/iPlant_ajax',reqDataB);
								}
								
							   $('#showMessageInfo').html('<font color=red>投入成功!</font>');
							}else if(rowCollection[0].NEXT_ROUT_CD!=null && rowCollection[0].NEXT_ROUT_CD!=''){
								WOSTATE = rowCollection[0].WO_STATE;
								if(rowCollection[0].WO_STATE != "2" && rowCollection[0].WO_STATE != "5"){
									$.messager.alert('提示','该作业指示不属于生产状态');
									return
								}
								if(rowCollection[0].NEXT_ROUT_CD != ROUTCD){
									$('#showMessageInfo').html('<font color=red>此SN当前应进行'+rowCollection[0].CURR_ROUT_NM+'操作!</font>');
									return;
								}
								
								/*验证产线只能有一个工单在生产*/
								var ajaxParamIsExists = {
									data: {
										url: '/iPlant_ajax',
										IFS: 'W0000034',
										LINE_CD: rowCollection[0].LINE_CD,
										WO_NO: rowCollection[0].WO_NO
									},
									successCallBack:function(data){
										var rowCollection=createSourceObj(data); 
										IS_CHECK = rowCollection[0].IS_CHECK;
										if(IS_CHECK =='Y'){
										   confirmInputLotInfo($("#thismomentSN").textbox('getValue'));
										   var reqData = {
												ROUT_CD: ROUTCD,	
											    BAR_CODE: $("#thismomentSN").textbox('getValue'),
											    TEMP_CODE: 'GW00000',
												IFS: 'MF99999'
											}
										   universalAccess('/iPlant_ajax',reqData);
										   
										   if(WOSTATE== "2" ){
												var reqDataB = {
														WO_STATE: '5',	
													    WO_NO: $("#WoNoCode").textbox('getValue'),
													    MO_NO: $("#workOrder").textbox('getValue'),
														IFS: 'GW00004'
													}
												   universalAccess('/iPlant_ajax',reqDataB);
											}
										   $('#showMessageInfo').html('<font color=red>投入成功!</font>');
										}else{
											$.messager.alert("提示", "该拉线已有工单正在生产,不能投入！");
											return;
										}
									}
								}
							  iplantAjaxRequest(ajaxParamIsExists);
							}else if(rowCollection[0].NEXT_ROUT_CD != ROUTCD){
								$('#showMessageInfo').html('<font color=red>此SN当前应进行'+rowCollection[0].CURR_ROUT_NM+'操作!</font>');
								return
							}
						}else{
							$.messager.alert("提示", '此【'+BAR_CODE+'】ENTER SN不存在，请重新扫描！')
							return;
						}
		            }
				};
				iplantAjaxRequest(ajaxParam);
		}else{
			$.messager.alert("提示", '请扫描SN条码！');
			return;
		}
	}
	
	/*确认作业指示后添加到生产投入表*/
	confirmInputLotInfo = function(BAR_CODE){
		var ajaxParamLotInfo = {
			data: {
				url: '/iPlant_ajax',
				IFS: 'GW00003',
				WO_NO: wono,
				ROUT_CD: ROUTCD,
				BAR_CODE: BAR_CODE
			},
			successCallBack:function(data){
				$.messager.alert("提示", '投入成功！');
				initGridData('GW00005');
			}
		}
		iplantAjaxRequest(ajaxParamLotInfo);
		/*var ajaxParam = {
			data: {
				url: '/iPlant_ajax',
				IFS: 'GW00001',
				WO_NO: wono
			},
			successCallBack:function(data){
				var rowCollection=createSourceObj(data); 
				if(rowCollection.length <= 0){
					return;
				}else{
				  var ajaxParam = {
					data: {
						url: '/iPlant_ajax',
						IFS: 'GW00003',
						BAR_CODE: $("#searchentersn").textbox('getValue'),
						ITEM_CD: rowCollection[0].ITEM_CD,					物料编码，当前SN
						ITEM_NM: rowCollection[0].ITEM_NM,					物料名称
						INPUT_NUM: 1,										投产数
						LOT_NO: autoCreateCode('MESLOT'),					自动生成LOT号
						FCT_CD: rowCollection[0].FCT_CD,					工厂编码
						MO_NO:rowCollection[0].MO_NO,						生产订单号
						LINE_CD:rowCollection[0].LINE_CD,					拉线编码
						WO_STATE: rowCollection[0].WO_STATE,			    wo状态
						PRF_CD : rowCollection[0].PRF_CD,					工艺流程编码b
						WC_CD : rowCollection[0].WC_CD,						现工程b
						WO_NO : rowCollection[0].WO_NO,						作业指示编号b
						SHIFT_CD: rowCollection[0].SHIFT_CD,
						PROD_TYPE: '注塑',
						ROUT_CD: ROUTCD
					},
					successCallBack:function(data){
						$.messager.alert("提示", '投入成功！');
						initGridData('GW00005');
					}
				 };
				 iplantAjaxRequest(ajaxParam);
				}
            }
		};
		iplantAjaxRequest(ajaxParam);*/
	}
	var MAC,IP,ROUTCD;
	GetFromMacAddress = function(cdId){
		var ip = getIP();
		if(cdId!=null && cdId!=''){
			var ajaxParam = {
				data: {
					url: '/iPlant_ajax',
					IFS: 'GX00075',
					//BUSI_CODE: cdId,
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
				dataGrid = $('#IntoTheProcess_tab');
				initGridData();
				/*根据作业指示编码查询作业工单信息*/
				$('#btnSearch').click(function() {
					searchMO_NO();
				});
				
				$('#searchentersn').textbox('textbox').keydown(function (e) {
			         if (e.keyCode == 13) {
			        	 QuerySN();
			         }
			     });
			});
		}
	}
	var fcfo = new factoryInfo();var wono,IS_CHECK,WOSTATE;
	fcfo.init();
})();