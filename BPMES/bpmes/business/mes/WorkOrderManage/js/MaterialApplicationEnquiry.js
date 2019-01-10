/* 启动时加载 */
/*
 */
(function() {
	function factoryInfo() {
		initGridData = function() {
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			var reqData = {
				IFS: 'W0000013',
				async:false,
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'Product_tab', reqData);
		},
		
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'Product_tab',
				dataType: 'json',
				columns: [[
					{field: 'FCT_CD',title: '工厂名称',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.FCT_NM  || value)+ "</span>";},
				           		   editor:{type:'combobox',options:{valueField:'value',textField:'text',required:true,editable:false}}},
				           		  {field: 'WC_CD',title: '车间',width: 80,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.WC_NM || value)+ "</span>";},
									   editor:{type:'combobox',options:{valueField:'value',textField:'text',required:true,editable:false}}},
						    {field: 'MO_NO',title: '工单号',width: 150,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.MO_NO ||value)+ "</span>";},
							       editor:{type:'combobox',options:{valueField:'value',textField:'text',required:true,editable:true}}},
							{field:'WO_NO',title:'作业指示号',width:150,align:'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},
									options:{required:true, validType:['length[1,30]','specialTextCharacter']}},
							{field: 'LINE_CD',title: '线别',width: 80,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.LINE_NM  || value)+ "</span>";},
		            			   editor:{type:'combobox',options:{valueField:'value',textField:'text',required:true}}}, 
							/*{field: 'SHIFT_CD',title: '班组',width: 80,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.SHIFT_NM  || value)+ "</span>";},
								   editor:{type:'combobox',options:{valueField:'value',textField:'text',required:true}}}, */
							{field: 'PLAN_PO_QTY',title: '工单计划产量',width: 85,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
						    {field: 'PLAN_WO_QTY',title: '排产数量',width: 80,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'numberbox', options:{precision:0,required:true,}},formatter:function(value,row,index){ return formatNumber(value,0); }},
						    {field:'WO_STATE_NM',title:'作业指示状态',width:100,align:'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},
							       options:{required:true, validType:['length[1,30]','specialTextCharacter']}},	   
						    {field: 'ITEM_CD',title: '物料编码',width: 150,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (value)+ "</span>";},
							       editor:{type:'combobox',options:{valueField:'value',textField:'text',required:true,editable:false}}},
						    {field: 'ITEM_NM',title: '物料名称',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
			        	    {field: 'ITEM_TYPE',title: '物料类型',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.ITEM_TYPE_NM || value)+ "</span>";},
							       editor:{type:'combobox',options:{valueField:'value',textField:'text',required:true,editable:false}}}, 
						    {field: 'PROD_QTY',title: '累计生产数量',width: 100,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
							{field: 'GOOD_QTY',title: '良品数量',width: 80,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
							{field: 'DFCT_QTY',title: '不良品数量',width: 80,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
							{field: 'SCRAP_QTY',title: '报废数量',width: 80,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
							{field: 'PLAN_STRT_DT',title: '计划开始日期',width: 150,align: 'center',formatter:function(value,row,index){if(row.PLAN_STRT_DT){return row.PLAN_STRT_DT;}},
			            		   editor:{type:'datebox',options:{required:true,editable:true}}}, 
							{field: 'PLAN_END_DT',title: '计划结束日期',width: 150,align: 'center',formatter:function(value,row,index){if(row.PLAN_END_DT){return row.PLAN_END_DT;}},
			            		   editor:{type:'datebox',options:{required:true,editable:true}}}, 
		            	    {field: 'UGT_TYPE',title: '紧急等级',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.UGT_TYPE ||value)+ "</span>";},
								   editor:{type:'combobox',options:{valueField:'value',textField:'text',required:true,editable:false}}},
							{field: 'NXT_OPER',title: '后工程',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					        	   options:{validType:['length[0,30]','specialTextCharacter']}}},
			        	    {field: 'PRF_CD',title: '工艺流程',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
				        	   options:{validType:['length[1,30]','specialTextCharacter']}}},
							{field: 'CRT_ID',title: '创建人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
							{field: 'CRT_DT',title: '创建时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
							{field: 'UPT_ID',title: '修改人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
							{field: 'UPT_DT',title: '修改时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
					]],
		        /**单击进入编辑模式*/
		        onClickRow: function (index, row) {
		        	OpenFrameAttribute(row.WO_NO);
		        	$('#WO_NO').html(row.WO_NO+':');
	            },
			}
			initGridView(reqData, gridList);
			dataGrid.datagrid({"onLoadSuccess":function(data){
				if(data.rows.length == 0){
					OpenFrameAttribute('');
			    }else{
			    	 OpenFrameAttribute(data.rows[0].WO_NO);
					    $('#WO_NO').html(data.rows[0].MO_NO+':');
			    }
			}}).datagrid('loadData', jsonData);
		}
	}
	
	OpenFrameAttribute = function(WO_NO){
		var dgrid = dataGrid.datagrid('options');
		if(!dgrid) return;
		var reqDataA = {
			WO_NO: WO_NO,
			IFS: 'MF00085',
			pageIndex: 1,
			pageSize: dgrid.pageSize
		}
		dialogDataGrid('/iPlant_ajax', 'Material_tab', reqDataA);
		
		dialogEditorDataGrid = function(tabName,reqDataA, jsonData) {
			//根据tabName判断哪个列表
			var columnsTab,edDataGrid,messageInfo;
				columnsTab=[
				    {field: 'FCT_NM',title: '工厂名称',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{required:true, validType:['length[1,50]','specialTextCharacter']}}},  
			        {field: 'WO_NO',title: '作业指示编号',width: 135,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{required:true, validType:['length[1,50]','specialTextCharacter']}}},
					{field: 'MAT_CD',title: 'Mat编码',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{required:true, validType:['length[1,50]','specialTextCharacter']}}},
					{field: 'MAT_NM',title: 'Mat名称',width: 160,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{required:true, validType:['length[1,400]','specialTextCharacter']}}},
	        	   /* {field: 'PRF_CD',title: '工艺代码',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
				           options:{required:true, validType:['length[1,400]','specialTextCharacter']}}},	   
				    {field: 'PRF_NM',title: '工艺名称',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{required:true, validType:['length[1,400]','specialTextCharacter']}}},*/	   
					{field: 'UOM_NM',title: '单位',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{required:true, validType:['length[1,50]','specialTextCharacter']}}}, 
					{field: 'UNIT_QTY',title: '单位数量',width: 80,align: 'right',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";},editor:{type:'validatebox',
			        	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}}, 
			        {field: 'PLAN_QTY',title: '总计划数量',width: 80,align: 'right',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";},editor:{type:'validatebox',
				        	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}}, 
				    {field: 'REQ_QTY',title: '申请数量',width: 80,align: 'right',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";},editor:{type:'validatebox',
				        	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
				    {field: 'REQ_PROC_QTY',title: '已发料数量',width: 80,align: 'right',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";},editor:{type:'validatebox',
					        	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
				    {field: 'DAI_PROC_QTY',title: '待申请数',width: 80,align: 'right',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";},editor:{type:'validatebox',
				        	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
	        	    {field: 'MAT_STOCK_QTY',title: '物料库存数',width: 100,align: 'right',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";},editor:{type:'validatebox',
		        	    options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
				    {field: 'MO',title: '说明',width: 150,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";},editor:{type:'validatebox',
				        	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
				    {field: 'CRT_ID',title: '创建人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'CRT_DT',title: '创建时间',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}];
				
			var gridLists = {
				name: 'Material_tab',
				dataType: 'json',
				pagination:false,
				rownumbers:true,
				loadMsg: '数据加载中...',
				columns: [columnsTab],
			}
			initEditorDataGridView(reqDataA, gridLists);
			$('#Material_tab').datagrid('loadData', jsonData);
		}
	}
	
	
	searchDataGrid=function(dgrid){
		var search_MaterialType = $('#DeptCode').textbox('getValue');
		var workshops =$("#workShops").combobox("getValue");
		var orderstatus =$("#orderStatus").combobox("getValue");
		var statdate = $("#productionStartTime").datebox("getValue");
		var overdate = $("#productionEndTime").datebox("getValue");
		var reqData = {
			IFS: 'W0000013',
			WO_NO:search_MaterialType,
			WC_CD:workshops,
			WO_STATE:orderstatus,
			PLAN_STRT_DT:statdate,
			PLAN_END_DT:overdate,
			pageIndex: 1,
			pageSize: dgrid.pageSize
		}
		reqGridData('/iPlant_ajax', 'Product_tab', reqData);
	}
	
	factoryInfo.prototype = {
		init: function() {
			$(function() {
				
				var ajaxParam2={
	                    url:'/iPlant_ajax',
	                    data:{
	                        IFS:'W0000025',
	                    },
	                    successCallBack:function(data){
	                    	$('#orderStatus').combobox('clear');
	                        var rowCollection=createSourceObj(data); 
	                        var arr = [];
	                        arr.push({"id":"", "text":"全部"});
	                        for(var i=0; i< rowCollection.length; i++){
	                        	arr.push({"id":rowCollection[i].DICT_IT, "text":rowCollection[i].DICT_IT_NM});
	                        }
	                        $('#orderStatus').combobox({
	                            data:arr,
	                            valueField:'id',
	                            textField:'text',
	                            panelWidth:150
	                        });
	                    }
	                }
	                iplantAjaxRequest(ajaxParam2);
				
				
				var ajaxParam3={
	                    url:'/iPlant_ajax',
	                    data:{
	                        IFS:'B000025',
	                    },
	                    successCallBack:function(data){
	                    	$('#workShops').combobox('clear');
	                        var rowCollection=createSourceObj(data); 
	                        var arr = [];
	                        arr.push({"id":"", "text":"全部"});
	                        for(var i=0; i< rowCollection.length; i++){
	                        	arr.push({"id":rowCollection[i].PL_CD, "text":rowCollection[i].PL_NM});
	                        }
	                        $('#workShops').combobox({
	                            data:arr,
	                            valueField:'id',
	                            textField:'text',
	                            panelWidth:150
	                        });
	                    }
	                }
	            iplantAjaxRequest(ajaxParam3);
				
				/*初始化全局变量对象*/
				dataGrid = $('#Product_tab'),dataCompany=[],dataFactory=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				initGridData();
				$('#btnSearch').click(function() {					
					searchDataGrid(dataGrid);
				});
				
				$('#btnAdd').click(function() {					
					insertDataGrid('Product_tab',{});
				});
				
				$('#btnDelete').click(function(){
					deleteDataGrid('Product_tab','ITEM_TYPE_CD','W000004','showMessageInfo');
	            });

				$('#btnSave').click(function() {
					saveDataGrid('Product_tab','W000002','W000003','showMessageInfo');
				});
				
				$('#btnExprt').click(function(){
					var now = new Date();
	                var year =now.getFullYear();
	                var reqData = {
	                		IFS:'MB00010'
	                	}
	                	createTable('tbIMESReport','物料申请明细导出','Material_tab',reqData);
	                });
			});
		}
	}
	var fcfo = new factoryInfo();
	fcfo.init();
})();