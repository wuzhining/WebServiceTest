/* 启动时加载 */
/*
 */
(function() {
	function factoryInfo() {
		initGridData = function() {
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			var search_MaterialWO_NO = $('#search_MaterialWO_NO').textbox('getValue');
			var reqData = {
			    WO_NO: search_MaterialWO_NO,	
				IFS: 'ST00081',
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'BindOfSN_tab', reqData);
		},
		
		dataGride = [{'value':'0','text':'永久'},{'value':'1','text':'临时'}]
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'BindOfSN_tab',
				dataType: 'json',
				columns: [[
					{field: 'BAR_CODE',title: 'SN号',width: 150, align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'WO_NO',title: '作业指示编号',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'FCT_NM',title: '工厂名称',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" + value+ "</span>";}},
					{field: 'FCT_CD',title: '工厂编码',width: 100,hidden:true,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" + value+ "</span>";}},
					
					{field: 'BIND_ST',title: '绑定状态',width: 100,align: 'center',formatter: function (value,row) {if(value == 0) {return '永久绑定';}else if(value == 1){return '临时绑定';}else {return value;}}},	
					{field: 'MO_NO',title: '工单号',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'ITEM_CD',title: '物料编码',width: 120,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  value+ "</span>";}},
					{field: 'ITEM_NM',title: '物料名称',width: 200,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  value+ "</span>";}},
					{field: 'LINE_CD',title: '产线编码',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'PROD_TYPE',title: '生产类型',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'WC_CD',title: '车间编码',width: 80,hidden:true,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
						   
				]],
			}
			initGridView(reqData, gridList);
			dataGrid.datagrid('loadData', jsonData);
		}
	}
	
	/*根据作业指示编码查询作业工单信息*/
	searchMO_NO = function(dgrid){
		var bindType = $('input[name=bindtype]:checked').val();
		console.log(bindType)
		var search_MaterialWO_NO = $('#search_MaterialWO_NO').textbox('getValue');
		if(search_MaterialWO_NO==null || search_MaterialWO_NO==''){
			$.messager.alert("提示", '请输入作业指示编号！')
			$("#fmStation").form("clear");
			return;
		}
		var ajaxParam = {
			data: {
				url: '/iPlant_ajax',
				IFS: 'ST00081',
				WO_NO: search_MaterialWO_NO
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
						$("#Line_Cd").textbox('setValue',rowCollection[0].PD_LN_NM);				/*产线名称*/
						$("#workState").textbox('setValue',rowCollection[0].WO_STATE);				/*工单状态1b*/
						$("#MaterialName").textbox('setValue',rowCollection[0].ITEM_NM);			/*物料名称1*/
						$("#PROGRAM_NM").textbox('setValue',rowCollection[0].PROGRAM_NM);			/*程序名称*/
						$("#PANEL_QTY").textbox('setValue',rowCollection[0].PANEL_QTY);				/*拼板数*/
					}
				}
            }
		};
		iplantAjaxRequest(ajaxParam);
	}
	
	/*验证此BAR_CODE是否属于该作业指示*/
	QuerySN = function(){
		var rows = $('#BindOfSN_tab').datagrid('getRows');
		var rowNum = rows.length +1 ;
		var upperLimit = parseInt($("#PANEL_QTY").textbox('getValue'));
		var BAR_CODE =$('#searchentersn').textbox('getValue');
		var MaterialWO_NO = $('#search_MaterialWO_NO').textbox('getValue');
		var bindType = $('input[name=bindtype]:checked').val();
		if(BAR_CODE!='' && BAR_CODE!=null){
			if(MaterialWO_NO !=null && MaterialWO_NO !=''){
				
				var ajaxParam2 = {
					data: {
						url: '/iPlant_ajax',
						IFS: 'ST00076',
						BAR_CODE: BAR_CODE,
					},
					successCallBack:function(data){
						var rowCollection2 = createSourceObj(data);
						console.log(rowCollection2)
						if(rowCollection2.length==0){
							var ajaxParam = {
									data: {
										url: '/iPlant_ajax',
										IFS: 'GW00006',
										BAR_CODE: BAR_CODE,
									},
									successCallBack:function(data){
										var rowCollection = createSourceObj(data);
										if(rowCollection.length>0){
											if(MaterialWO_NO == rowCollection[0].WO_NO){
												var	initData={BIND_ST:bindType,BAR_CODE:rowCollection[0].BAR_CODE,FCT_CD:rowCollection[0].FCT_CD,FCT_NM:rowCollection[0].FCT_NM,MO_NO:rowCollection[0].MO_NO,WO_NO:rowCollection[0].WO_NO,ITEM_CD:rowCollection[0].ITEM_CD,ITEM_NM:rowCollection[0].ITEM_NM,LINE_CD:rowCollection[0].LINE_CD,PROD_TYPE:rowCollection[0].PROD_TYPE,WC_CD:rowCollection[0].WC_CD,PCS_IN_BOX:rowCollection[0].PCS_IN_BOX,}
												$("#thismomentSN").textbox('setValue',rowCollection[0].BAR_CODE);			
												if(rows.length == 0){
													insertDataGrid('BindOfSN_tab',initData);
													$('#searchentersn').textbox('setValue','');
												}else{
													for (var i = 0; i < rows.length; i++) {  
												        if(rows[i]['BAR_CODE'] == BAR_CODE ){
												        	$('#showMessageInfo').html('<font color=red>此SN已存在</font>');
												        	$('#searchentersn').textbox('setValue','');
												        	return;	
												        }
												    } 
													insertDataGrid('BindOfSN_tab',initData);
													$('#searchentersn').textbox('setValue','');
												}
											}else{
												$.messager.alert("提示", '此【'+BAR_CODE+'】SN不属于该作业指示！')
												$('#searchentersn').textbox('setValue','');
												return;
											}
										}else{
											$.messager.alert("提示", '此【'+BAR_CODE+'】SN不存在或不属于此作业指示，请重新扫描！')
											return;
										}
										/*当扫描SN达到拼板数后自动关箱*/
										if(rowNum == upperLimit){
											var edDataGrid = $('#BindOfSN_tab');
								        	if (edDataGrid.datagrid('getChanges').length) {
								                var inserted = edDataGrid.datagrid('getChanges', "inserted");  
								                /**装载数据*/
								                var arrInsert = new Array()
								                if(inserted.length>0){
								                	for(var m=0;m<inserted.length;m++){
								                		arrInsert.push(inserted[m]);
								                	}
								                	ManualAutomaticPackingFun(arrInsert,rowNum,edDataGrid);
								                }
								            }
										}
						            }
								};
								iplantAjaxRequest(ajaxParam);
						}else{
							$.messager.alert("提示", '此SN已经绑定，不能重复绑定');
							$('#searchentersn').textbox('setValue','');
						}
					}
				};
				iplantAjaxRequest(ajaxParam2);
				
			}else{
				$.messager.alert("提示", '作业指示号不能为空！');
				return 
			}
		}else{
			$.messager.alert("提示", 'SN号不能为空！！');
			return;
		}
	}
	
	
	/*绑定SN*/
	ManualAutomaticPackingFun= function(arrInsert,rowNum,edDataGrid){
		/*批量新增*/
        var ajaxInsert = {
            url: '/iPlant_ajax',
            dataType: 'JSON',
            data: {
            	NAME_RULES : 'BIND',
                IFS: 'ST00082'   /*查询绑定码*/
            },
            successCallBack: function (data) {
            	var bindCode = data.RESPONSE[0].RESPONSE_DATA[0].BIND_NO;		/*获取BIND_NO*/
            	for(var n=0;n<arrInsert.length;n++){
             	   arrInsert[n].BIND_NO = bindCode;
             	}
            	var ajaxParamBox={
                    url:'/iPlant_ajax',
                    data:{
                        IFS:'ST00078',
                        list:arrInsert
                    }, 
                    successCallBack:function(data){
                    	var item = $('#BindOfSN_tab').datagrid('getRows');    
                        for (var i = item.length - 1; i >= 0; i--) {    
                            var index = $('#BindOfSN_tab').datagrid('getRowIndex', item[i]);    
                            $('#BindOfSN_tab').datagrid('deleteRow', index);    
                        }    
                    	$('#showMessageInfo').html('<font color=red>绑定SN成功！</font>');
                    },
                };
                iplantAjaxRequest(ajaxParamBox);
            },
            errorCallBack: function (data) {
            	$('#showMessageInfo').html('<font color=red>保存失败！</font>');
                return;
            }
        };
        iplantAjaxRequest(ajaxInsert);
	}
	factoryInfo.prototype = {
		init: function() {
			$(function() {
				/*初始化全局变量对象*/
				dataGrid = $('#BindOfSN_tab');
				initGridData();
				
				/*根据作业指示编码查询作业工单信息*/
				$('#search_MaterialWO_NO').textbox('textbox').keydown(function (e) {
			         if (e.keyCode == 13) {
			        	 searchMO_NO();
			         }
			     });
				
				$('#Rerelease').click(function(){
					var rows = $('#BindOfSN_tab').datagrid('getRows');
					var rowNum = rows.length ;
					var edDataGrid = $('#BindOfSN_tab');
		        	if (edDataGrid.datagrid('getChanges').length) {
		                var inserted = edDataGrid.datagrid('getChanges', "inserted");  
		                /**装载数据*/
		                var arrInsert = new Array()
		                if(inserted.length>0){
		                	for(var m=0;m<inserted.length;m++){
		                		arrInsert.push(inserted[m]);
		                	}
		                	ManualAutomaticPackingFun(arrInsert,rowNum,edDataGrid);
		                };
		            }else{
	                	$.messager.alert('提示','没有可供绑定的SN');
	                };
				});
				
				$('#searchentersn').textbox('textbox').keydown(function (e) {
			         if (e.keyCode == 13) {
			        	 QuerySN();
			         }
			     });
			});
		}
	}
	var fcfo = new factoryInfo();
	fcfo.init();
})();