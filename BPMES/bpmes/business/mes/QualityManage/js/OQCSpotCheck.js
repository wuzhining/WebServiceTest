/* 启动时加载 */
/*
 */
(function() {
	function factoryInfo() {
		initGridData = function() {
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			var reqData = {
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'SpotCheckMenu_tab', reqData);
			
			/*工厂名称下拉框*/
			var tmp = {
	                url: "/iPlant_ajax",
	                dataType: "JSON",
	                data: {IFS: "B000021"},
	                successCallBack: function(a) {
	                	var dataTmp = [];
	                	var op = a.RESPONSE[0].RESPONSE_DATA;
	                    $.each(op,function(n,obj) {
	                    	dataTmp.push({'value':obj.FT_CD,'text':obj.FT_NM});
	                    	tem[a.RESPONSE[0].RESPONSE_DATA[n].FT_CD]=a.RESPONSE[0].RESPONSE_DATA[n].FT_NM;
					    });  
	                },
	                errorCallBack: function() {
	                    $.messager.alert("提示", '请联系管理员，查询失败！')
	                }
	            };
			iplantAjaxRequest(tmp);
		},
		
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'SpotCheckMenu_tab',
				singleSelect : false,
				dataType: 'json',
				columns: [[
				    {field : "CZ",width : 10,'checkbox' : true},
				    {field: 'BAR_CODE',title: '产品编码',width: 200,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" + value+ "</span>";}},
					{field: 'FCT_NM',title: '工厂名称',width: 200,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" + (value)+ "</span>";}},
					{field: 'FCT_CD',title: '工厂编码',width: 120,hidden:true,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" + value+ "</span>";}},
					{field: 'ITEM_CD',title: '物料编码',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'ITEM_NM',title: '物料名称',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'MO_NO',title: '工单编码',width: 120, align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				    {field: 'WO_NO',title: '作业指示编码',width: 150, align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				    {field: 'QTY',title: '数量',width: 60,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
						   
				]],
			}
			initGridView(reqData, gridList);
			dataGrid.datagrid('loadData', jsonData);
		}
	}
	
	/*顶部的关联表格   已扫描明细表*/
	OpenFrameAttribute = function(OQC_LOTID){
		var tabName = 'LotRecord_tab';
		var dgridOp = $('#LotRecord_tab').datagrid('options');
		if(!dgridOp) return;
		var reqDataA = {
			OQC_LOTID :OQC_LOTID,
			IFS: 'MF00109',
			pageIndex: 1,
			pageSize: dgridOp.pageSize	
		}
		dialogDataGrid('/iPlant_ajax', tabName, reqDataA);
		dialogEditorDataGrid = function(tabName,reqDataA, jsonData) {
			var columnsTab,edDataGrid,messageInfo;
			columnsTab=[
					{field: 'BAR_CODE',title: '产品编码',width: 200,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" + value+ "</span>";}},
					{field: 'OQC_LOTID',title: 'OQC LotID',width: 200,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" + value+ "</span>";}},
					{field: 'MO_NO',title: '工单编码',width: 120, align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'WO_NO',title: '作业指示编码',width: 150, align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'ITEM_CD',title: '物料编码',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'ITEM_NM',title: '物料名称',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'QTY',title: '数量',width: 60,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
	   
				];
				var gridLists = {
					name: tabName,
					dataType: 'json',
					columns: [columnsTab]
				}
			initEditorDataGridView(reqDataA, gridLists);
			$('#LotRecord_tab').datagrid('loadData', jsonData);
		}
	};
	
	/*扫描条码插入数据到抽检BOX目录表*/
	EnterCode = function(dgrid){
		var search_Code = $('#search_Code').textbox('getValue');	/*获取扫描的条码*/
		var ajaxParamA = {
				data: {
					url: '/iPlant_ajax',
					IFS: 'GW00006',
					BAR_CODE: search_Code
				},
				successCallBack:function(data){
					var rowCollection=createSourceObj(data); 
					/*验证当前SN工序路线是否匹配*/
					if(rowCollection[0].NEXT_ROUT_CD ==null || rowCollection[0].NEXT_ROUT_CD ==""){
						$('#showMessageInfo').html('<font color=red>此SN当前应进行投入工位操作!</font>');
						$("#search_SN").textbox('setValue','');
						return;
					}else if(rowCollection[0].NEXT_ROUT_CD != ROUTCD){
						$('#showMessageInfo').html('<font color=red>此SN当前应进行'+rowCollection[0].CURR_ROUT_NM+'操作!</font>');
						$("#search_SN").textbox('setValue','');
						return;
					}
					
					/*失去焦点事件*/
					var rows = $('#SpotCheckMenu_tab').datagrid('getRows');
					if(search_Code==null || search_Code==''){
						$('#showMessageInfo').html('<font color=red>条码不能为空</font>');
						return;
					}
					var ajaxParam = {
						data: {
							url: '/iPlant_ajax',
							IFS: 'MF00108',
							BAR_CODE: search_Code
						},
						successCallBack:function(data){
							var rowCollection=createSourceObj(data); 
							if(rowCollection.length <= 0){
								$('#showMessageInfo').html('<font color=red>该SN不存在，请重新输入</font>');
								return;
							}else{
								/*装载数据*/
								var	initData={FCT_CD:rowCollection[0].FCT_CD,BAR_CODE:rowCollection[0].BAR_CODE,MO_NO:rowCollection[0].MO_NO,
										WO_NO:rowCollection[0].WO_NO,ITEM_CD:rowCollection[0].ITEM_CD,ITEM_NM:rowCollection[0].ITEM_NM,QTY:rowCollection[0].QTY,
										FCT_NM:tem[rowCollection[0].FCT_CD]
								}
								for (var i = 0; i < rows.length; i++) {  
							        if(rows[i]['BAR_CODE'] == search_Code ){
							        	$('#showMessageInfo').html('<font color=red>此SN已存在</font>');
							        	$("#search_Code").textbox('setValue','');
							        	return;	
							        }
							    } 
								$('#SpotCheckMenu_tab').datagrid('insertRow',{
									index: 0,	/* 索引从0开始*/
									row: initData
								});

					        	$("#search_Code").textbox('setValue','');
					        	$('#SpotCheckMenu_tab').datagrid('clearSelections');
					        	
							}
			            }
					};
					iplantAjaxRequest(ajaxParam);
				}
		};
		iplantAjaxRequest(ajaxParamA);
	}
	
	/*插入OQCLOT抽检主表和明细表*/
	addFUN = function(){
		var oqclot = autoCreateCode("OQCLOT");						/*生成OQCLot号*/
		var rows = $('#SpotCheckMenu_tab').datagrid('getChecked')  /*获取目录表选中的数据行*/  
	    var total = 0; 
		var arrInsert = new Array()
	    for (var i = 0; i < rows.length; i++) {  
	        total += parseInt(rows[i]['QTY']); 						/*获取数量的和*/
	    } 
		var ajaxInsert = {
                url: '/iPlant_ajax',
                dataType: 'JSON',
                data: {
                    FCT_CD: rows[0]['FCT_CD'],
                    OQC_LOTID: oqclot,
                    TOT_QTY:total,
                    OQC_TYPE :'1',
                    IFS: 'GW00032'
                },
                successCallBack: function (data) {
                	$('#showMessageInfo').html('<font color=red>保存成功！</font>');
                    return;
                },
                errorCallBack: function (data) {
                	$('#showMessageInfo').html('<font color=red>保存失败！</font>');
                    return;
                }
        };
        iplantAjaxRequest(ajaxInsert); 					/*插入OQC抽检主表*/
       
        for (var n = 0; n < rows.length; n++) {  
        	arrInsert.push(rows[n]);
	    } 
        for (var m = 0; m < arrInsert.length; m++){
        	arrInsert[m].OQC_LOTID = oqclot;
        	arrInsert[m].CHECK_YN = '0';
        }
        var ajaxInsert2 = {
                url: '/iPlant_ajax',
                dataType: 'JSON',
                data: {
                    list:arrInsert,
                    IFS: 'MF00110'
                },
                successCallBack: function (data) {
                	$('#showMessageInfo2').html('<font color=red>OQCBOX信息保存成功！</font>');
                	OpenFrameAttribute(oqclot);
                	for (var n = 0; n < arrInsert.length; n++) {  
                	   var reqData = {
							ROUT_CD: ROUTCD,	
						    BAR_CODE: rows[n].BAR_CODE,
							IFS: 'MF99999'
						}
    				   universalAccess('/iPlant_ajax',reqData);
            	    } 
                    return;
                },
                errorCallBack: function (data) {
                	$('#showMessageInfo2').html('<font color=red>OQCBOX信息保存失败！</font>');
                    return;
                }
        };
        iplantAjaxRequest(ajaxInsert2); 				/*插入OQC抽检明细表*/
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
				var cdId = getQueryString("cdId");
				GetFromMacAddress(cdId);
				/*初始化全局变量对象*/
				dataGrid = $('#SpotCheckMenu_tab');
				initGridData();
				OpenFrameAttribute();
				/*根据作业指示编码查询作业工单信息*/
				$('#search_Code').textbox('textbox').keydown(function (e) {
			         if (e.keyCode == 13) {
			        	 EnterCode();
			         }
			     });
				
				$('#btnAdd').click(function(){
					addFUN();
				})
			});
		}
	}
	var fcfo = new factoryInfo();var tem={};
	fcfo.init();
})();