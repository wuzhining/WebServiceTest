/* 启动时加载 */
/*
 */
(function() {
	function factoryInfo() {
		initGridData = function(itemCD) {
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			/*部件条码信息*/
			iplantAjaxRequest( {
	 			url: '/iPlant_ajax',
	 			data: 
	 			{
	 				IFS:'Z000060',
	 				BOM_CD: itemCD,
	                pageIndex:1,
	        		pageSize:1000
	 			},
	 			successCallBack: function (data) {
	 				var jsonData ={total:0,rows:[]};
	 				if(data.RESPONSE[0].length != 0){
	 					jsonData.rows=data.RESPONSE[0].RESPONSE_DATA;
	 	 				jsonData.total=data.RESPONSE[0].RESPONSE_DATA.length;
	 				}
	 				
	 				$('#AssemblyDetails_tab').datagrid({       
	 					name:'AssemblyDetails_tab',
						dataType: 'json', 
						columns: [[
								{field: 'PROD_CODE',title: '产品编码',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
								{field: 'ASMBLY_ITEM_CD',title: '装配物料编码',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},          
								{field: 'ASMBLY_ITEM_NM',title: '装配物料名称',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
								{field: 'ASMBLY_PROCS',title: '装配工序',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
								{field: 'ASMBLY_SORT',title: '装配顺序',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
								{field: 'BAR_CD_RULES',title: '条码规则',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
								{field: 'UOM',title: '单位',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
								{field: 'UNIT_QTY',title: '单位数量',width: 60,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
					    ]]
	 		       	}); 
	 				
	 				$('#AssemblyDetails_tab').datagrid('loadData',jsonData);
	 			}
	 		});

		}
	}
	
	
	/*底部的关联表格   装配详细信息*/
	OpenFrameAttribute = function(WONO,MONO,BARCODE){
		var tabName = 'AssemblyStation_tab';
		var dgridOp = $('#'+tabName).datagrid('options');
		
		iplantAjaxRequest( {
 			url: '/iPlant_ajax',
 			data: 
 			{
 				IFS:'GW00050',
 				WO_NO:WONO,
 				MO_NO:MONO,
 				BAR_CODE:BARCODE,
                pageIndex:1,
        		pageSize:1000
 			},
 			successCallBack: function (data) {
 				var jsonData ={total:0,rows:[]};
 				if(data.RESPONSE[0].length != 0){
 					jsonData.rows=data.RESPONSE[0].RESPONSE_DATA;
 	 				jsonData.total=data.RESPONSE[0].RESPONSE_DATA.length;
 				}
 				
 				$('#AssemblyStation_tab').datagrid({       
 					name:'AssemblyStation_tab',
					dataType: 'json', 
					columns: [[
							{field: 'FCT_CD',title: '工厂编码',hidden:true,width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
							{field: 'BAR_CODE',title: '产品条码',hidden:true,width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
							{field: 'PRNT_MAT_NM',title: '父BOM名',hidden:true,width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},          
							{field: 'MO_NO',title: '生产订单号',hidden:true,width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
							{field: 'WO_NO',title: '作业指示',hidden:true,width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},          
							{field: 'PRNT_MAT_CD',title: '产品编码',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
							{field: 'MAT_CD',title: '装配物料编码',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},          
							{field: 'MAT_CD',title: '装配物料名称',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
							{field: 'PRF_CD',title: '装配工序',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
							{field: 'ASMBLY_SORT',title: '装配顺序',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
							{field: 'BAR_CD_RULES',title: '条码规则',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
							{field: 'UOM',title: '单位',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
							{field: 'UNIT_QTY',title: '单位数量',width: 60,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
							{field: 'STD_QTY',title: '标准数量',hidden:true,width: 60,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
							{field: 'REDU_QTY',title: '耗料数量',hidden:true,width: 60,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				    ]]
 		       	}); 
 				
 				$('#AssemblyStation_tab').datagrid('loadData',jsonData);
 			}
 		});
	};
	
	/*扫描产品SN得到作业信息*/
	QuerySN = function(dgrid){
		var sncode =$('#searchentersn').textbox('getValue');
		if(sncode !=null && sncode !=''){
			 var ajaxParam = {
				data: {
					url: '/iPlant_ajax',
					IFS: 'GW00006',
					BAR_CODE: sncode,
				},
				successCallBack:function(data){
					var rowCollection=createSourceObj(data); 
					if(rowCollection.length <= 0){
						$('#showMessageInfo').html('<font color=red>该SN号不存在，请重新扫描！</font>');
						$("#searchentersn").textbox('setValue','');
						return;
					}else{
						itemCD = data.RESPONSE[0].RESPONSE_DATA[0].ITEM_CD;
						WONO = data.RESPONSE[0].RESPONSE_DATA[0].WO_NO;
						MONO = data.RESPONSE[0].RESPONSE_DATA[0].MO_NO;
						BARCODE = data.RESPONSE[0].RESPONSE_DATA[0].BAR_CODE;
						/*验证当前SN工序路线是否匹配*/
						if(rowCollection[0].NEXT_ROUT_CD ==null || rowCollection[0].NEXT_ROUT_CD ==""){
							$('#showMessageInfo').html('<font color=red>此SN当前应进行投入工位操作!</font>');
							return
						}else if(rowCollection[0].NEXT_ROUT_CD != ROUTCD){
							$('#showMessageInfo').html('<font color=red>此SN当前应进行'+rowCollection[0].CURR_ROUT_NM+'操作!</font>');
							return
						}
						
						if(rowCollection[0].WO_STATE != '5'){
							$.messager.alert('提示','此SN不属于生产状态');
							return
						}
						
						$("#workOrder").textbox('setValue',rowCollection[0].MO_NO);					/*工单编号*/
						$("#MaterialCode").textbox('setValue',rowCollection[0].ITEM_CD);			/*物料编码*/
						$("#MaterialName").textbox('setValue',rowCollection[0].ITEM_NM);			/*物料名称*/
						$("#Line_Cd").textbox('setValue',rowCollection[0].LINE_NM);					/*产线名称*/
						$("#WO_NO").textbox('setValue',rowCollection[0].WO_NO);				/*作业指示编码*/
						$("#PlanProductCount").textbox('setValue',rowCollection[0].PLAN_WO_QTY);	/*作业指示计划量*/
						$("#workState").textbox('setValue',rowCollection[0].WO_STATE);				/*工单状态*/
						$("#thismomentSN").textbox('setValue',rowCollection[0].BAR_CODE);	
						fctCD = rowCollection[0].FCT_CD;
						prfCD = rowCollection[0].PRF_CD;
						initGridData(itemCD);
						OpenFrameAttribute(WONO,MONO,BARCODE);
						$('#thismomentITEM_CD').textbox('textbox').attr('disabled', false);
					}
	            }
			};
			iplantAjaxRequest(ajaxParam);
			
		}else{
			$('#showMessageInfo').html('<font color=red>请扫描SN号！</font>');
			$("#searchentersn").textbox('setValue','');
			return;
		}
	}
	
	/*扫描产品部件条码*/
	QueryITEM_CD = function(dgrid){
		var sncodes =$('#thismomentITEM_CD').val();
		if(sncodes !=null && sncodes !=''){
			 var ajaxParam = {
				data: {
					url: '/iPlant_ajax',
					IFS: 'Z000060',
					ASMBLY_ITEM_CD: sncodes,
					BOM_CD: itemCD
				},
				successCallBack:function(data){
					var rowCollection=createSourceObj(data); 
					if(rowCollection.length <= 0){
						$('#showMessageInfo').html('<font color=red>该部件不匹配，请重新扫描！</font>');
						return;
					}else{
						verifymomentITEM_CD();
						if(isContinue == 'Y'){
							console.log('yes')
							/*验证输入的部件编码属于此物料，新增到装配信息表*/
							var monoNM = $("#workOrder").textbox('getValue');	
							var wonoNM = $("#WO_NO").textbox('getValue');
							var barcodeNM = $("#searchentersn").textbox('getValue');
							var dgridOp = $('#AssemblyStation_tab').datagrid('options');
							 var arrInsert = new Array();
							 arrInsert.push({'MO_NO': monoNM,'WO_NO': wonoNM,'FCT_CD': fctCD,'BAR_CODE': barcodeNM,'PRF_CD': prfCD,'MAT_CD': rowCollection[0].ASMBLY_ITEM_CD,
								 'MAT_NM': rowCollection[0].ASMBLY_ITEM_NM,'PRNT_MAT_CD': rowCollection[0].BOM_CD,'PRNT_MAT_NM': rowCollection[0].BOM_NM,'UOM': rowCollection[0].UOM,
								 'UNIT_QTY' : rowCollection[0].UNIT_QTY,
							 })
							 var ajaxInsert = {
			                         url: '/iPlant_ajax',
			                         dataType: 'JSON',
			                         data: {
			                             list: arrInsert,
			                             IFS: 'GW00051'
			                         },
			                         successCallBack: function (data) {
			                        	 OpenFrameAttribute(wonoNM,monoNM,barcodeNM)
			                        	 
			                        	/*每次成功插入一条数据之后验证下是否已完成装配*/
			                        	var rows_r = $('#AssemblyStation_tab').datagrid('getRows'); /*获取右表所有已扫描部件的数据*/
			                        	/*获取所需部件数量总和*/
			    						var rows_l = $('#AssemblyDetails_tab').datagrid('getRows'); /*获取左表所有已扫描部件的数据*/
			    						var rows_r_num = rows_r.length+1
			    						var total = 0;  
			    					    for (var i = 0; i < rows_l.length; i++) {  
			    					        total += parseInt(rows_l[i]['UNIT_QTY']); /*获取指定列*/  
			    					    }  
			                        	if(total == rows_r_num){
				                        		$('#showMessageInfo').html('<font color=red>此SN已装配完成，请进入下一工序！</font>');
				                        		/*更新WIP表，进去下一工序*/
				                        		 var reqData = {
													ROUT_CD: ROUTCD,	
												    BAR_CODE:BARCODE,
												    TEMP_CODE: 'GW00000',  
													IFS: 'MF99999'
												 }
												 universalAccess('/iPlant_ajax',reqData);
				                        		 $('#searchentersn').textbox('setValue','');
				                        		 $('#thismomentITEM_CD').textbox('setValue','');
				                        		 $('#thismomentITEM_CD').textbox('textbox').attr('disabled', true);
					                             return;
			                        		}
			                         },
			                         errorCallBack: function (data) {
			                             return;
			                         }
			                     };
			                     iplantAjaxRequest(ajaxInsert);
						}else{
							console.log('NO')
						}
					}
	            }
			};
			iplantAjaxRequest(ajaxParam);
		}else{
			$('#showMessageInfo').html('<font color=red>部件条码不能为空！</font>');
			$("#thismomentITEM_CD").textbox('setValue','');
			return;
		}
	}
	
	/*扫描部件条码的验证*/
	verifymomentITEM_CD = function(){
		var sncodes =$('#thismomentITEM_CD').val();
		var rows_r = $('#AssemblyStation_tab').datagrid('getRows'); /*获取右表所有已扫描部件的数据*/
		if(rows_r.length == 0){
			isContinue = 'Y';
			return
		}
		
		var num_r = 0;
		for(var i=0;i<rows_r.length;i++){
			if(sncodes == rows_r[i].MAT_CD){
				num_r+=1;
			}
		}
		var rows_l = $('#AssemblyDetails_tab').datagrid('getRows'); /*获取左表所有已扫描部件的数据*/
		for(var n=0;n<rows_l.length;n++){
			if(sncodes == rows_l[n].ASMBLY_ITEM_CD){
				var UNIT_QTY = rows_l[n].UNIT_QTY;
			}
			if(UNIT_QTY == num_r){
				$('#showMessageInfo').html('<font color=red>'+sncodes+'部件已装配完毕！'+'</font>');
				isContinue = 'N';
				return
			}else{
				isContinue = 'Y';
			}
		}
		
		
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
				$('#thismomentITEM_CD').textbox('textbox').attr('disabled', true);
				var cdId = getQueryString("cdId");
				GetFromMacAddress(cdId);
				
				/*初始化全局变量对象*/
				dataGrid = $('#AssemblyDetails_tab');
				initGridData();
				OpenFrameAttribute();
				
				
				$('#searchentersn').textbox('textbox').keydown(function (e) {
			         if (e.keyCode == 13) {
			        	 QuerySN();
			         }
			     });
				
				$('#thismomentITEM_CD').textbox('textbox').keydown(function (e) {
			         if (e.keyCode == 13) {
			        	 QueryITEM_CD();
			         }
			     });
			});
		}
	}
	var fcfo = new factoryInfo(),itemCD,fctCD,prfCD,WONO,MONO,BARCODE,flag,isContinue,total
	fcfo.init();
})();