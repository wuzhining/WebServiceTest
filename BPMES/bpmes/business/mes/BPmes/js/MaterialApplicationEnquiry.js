/* 启动时加载 */
/*
 */
(function() {
	function factoryInfo() {
		initGridData = function() {
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			var reqData = {
				IFS: 'W000001',
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
					{field: 'FCT_NM',title: '工厂名称',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	    options:{required:true, validType:['length[1,50]','specialTextCharacter']}}},  
			        {field: 'MO_NO',title: '工单号',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	    options:{required:true, validType:['length[1,50]','specialTextCharacter']}}},
					{field: 'PROD_TYPE',title: '工单类型',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						    options:{validType:['length[1,50]','specialTextCharacter']}}},
					{field: 'WC_NM',title: '车间',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	    options:{validType:['length[1,50]','specialTextCharacter']}}}, 
					{field: 'ITEM_CD',title: '物料编码',width: 150,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";},editor:{type:'validatebox',
			        	    options:{required:true, validType:['length[1,50]','specialTextCharacter']}}}, 
			        {field: 'ITEM_NM',title: '物料名称',width: 200,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";},editor:{type:'validatebox',
	        	            options:{validType:['length[1,50]','specialTextCharacter']}}},
	        	    {field: 'ITEM_TYPE_NM',title: '物料类型',width: 80,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";},editor:{type:'validatebox',
					            options:{required:true, validType:['length[1,50]','specialTextCharacter']}}},
	        	    {field: 'MO_STATE_NM',title: '工单状态',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
		        	        options:{required:true, validType:['length[1,50]','specialTextCharacter']}}}, 
	        	    {field: 'PLAN_PO_QTY',title: '计划产量',width: 80,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
	                		options:{validType:['length[1,50]','specialTextCharacter']}}}, 
					{field: 'REM_PO_QTY',title: '剩余数量',width: 80,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	    options:{validType:['length[1,50]','specialTextCharacter']}}},    	   
			        {field: 'SO_NO',title: '销售订单',width: 80,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.DICT_IT_NM || value)+ "</span>";},editor:{type:'validatebox',
			        	    options:{validType:['length[1,50]','specialTextCharacter']}}},
					{field: 'PLAN_STRT_DT',title: '计划开始日期',width: 150,align: 'center',formatter:function(value,row,index){if(row.PLAN_STRT_DT){return row.PLAN_STRT_DT;}},
		            		editor:{type:'datebox',options:{required:true,editable:false}}}, 
					{field: 'PLAN_END_DT',title: '计划结束日期',width: 150,align: 'center',formatter:function(value,row,index){if(row.PLAN_END_DT){return row.PLAN_END_DT;}},
			                editor:{type:'datebox',options:{required:true,editable:false}}}, 
	                 
					{field: 'NXT_OPER',title: '后工程',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	    options:{validType:['length[1,50]','specialTextCharacter']}}}, 
			        {field: 'UGT_TYPE',title: '紧急等级',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
	        	    		options:{validType:['length[1,20]','specialTextCharacter']}}},
    	    		{field: 'PRF_CD',title: '工艺流程',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
	        	    	    options:{ validType:['length[1,50]','specialTextCharacter']}}},		
					{field: 'CRT_ID',title: '创建人',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'CRT_DT',title: '创建时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'UPT_ID',title: '修改人',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'UPT_DT',title: '修改时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
					]],
		        /**单击进入编辑模式*/
		        onClickRow: function (index, row) {
		        	OpenFrameAttribute(row.MO_NO);
		        	$('#MO_NO').html(row.MO_NO+':');
	            },
			}
			initGridView(reqData, gridList);
			dataGrid.datagrid({"onLoadSuccess":function(data){
			    $(this).datagrid('selectRow',0);
			    OpenFrameAttribute(data.rows[0].MO_NO);
			    $('#MO_NO').html(data.rows[0].MO_NO+':');
			}}).datagrid('loadData', jsonData);
		}
	}
	
	OpenFrameAttribute = function(MO_NO){
		var dgrid = dataGrid.datagrid('options');
		if(!dgrid) return;
		console.log(MO_NO)
		var reqDataA = {
			MO_NO: MO_NO,
			IFS: 'MB00010',
			pageIndex: 1,
			pageSize: dgrid.pageSize
		}
		dialogDataGrid('/iPlant_ajax', 'Material_tab', reqDataA);
		
		dialogEditorDataGrid = function(tabName,reqDataA, jsonData) {
			/*根据tabName判断哪个列表*/
			var columnsTab,edDataGrid,messageInfo;
				columnsTab=[
				    {field: 'FCT_NM',title: '工厂名称',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{required:true, validType:['length[1,50]','specialTextCharacter']}}},  
			        {field: 'MO_NO',title: '工单号',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{required:true, validType:['length[1,50]','specialTextCharacter']}}},
					{field: 'MAT_CD',title: 'Mat编码',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{required:true, validType:['length[1,50]','specialTextCharacter']}}},
					{field: 'MAT_NM',title: 'Mat名称',width: 160,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{required:true, validType:['length[1,400]','specialTextCharacter']}}},
	        	    {field: 'PRF_CD',title: '工艺代码',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
				           options:{required:true, validType:['length[1,400]','specialTextCharacter']}}},	   
				    {field: 'PRF_NM',title: '工艺名称',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{required:true, validType:['length[1,400]','specialTextCharacter']}}},	   
					{field: 'UOM',title: '单位',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{required:true, validType:['length[1,50]','specialTextCharacter']}}}, 
					{field: 'UNIT_QTY',title: '单位数量',width: 80,align: 'right',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";},editor:{type:'validatebox',
			        	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}}, 
			        {field: 'PLAN_QTY',title: '总计划数量',width: 80,align: 'right',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";},editor:{type:'validatebox',
				        	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}}, 
				    {field: 'REQ_QTY',title: '申请数量',width: 80,align: 'right',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";},editor:{type:'validatebox',
				        	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
				    {field: 'REQ_PROC_QTY',title: '已发料数量',width: 80,align: 'right',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";},editor:{type:'validatebox',
					        	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
				    {field: 'APPLY_QTY',title: '待申请数',width: 80,align: 'right',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";},editor:{type:'validatebox',
				        	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
				    {field: 'TO_WHS_NM',title: '出库仓库',width: 80,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";},editor:{type:'validatebox',
				        	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
				    {field: 'STOCK',title: '仓库库存',width: 80,align: 'right',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";},editor:{type:'validatebox',
					           options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
				    {field: 'MO',title: '说明',width: 150,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";},editor:{type:'validatebox',
				        	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
				    {field: 'CRT_ID',title: '创建人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'CRT_DT',title: '创建时间',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'UPT_ID',title: '修改人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'UPT_DT',title: '修改时间',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}];
				
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
		var search_transactionCode = $('#search_transactionCode').textbox('getValue');
		var search_dateStart = $('#search_dateStart').datebox('getValue');
		var search_dateEnd = $('#search_dateEnd').datebox('getValue');
		var search_workShop = $('#search_workShop').combobox('getValue');
		var search_workSho = $('#search_workSho').combobox('getValue');
		var reqData = {
			IFS: 'W000001',
			MO_NO:search_transactionCode,
			PLAN_STRT_DT:search_dateStart,
			PLAN_END_DT:search_dateEnd,
			WC_CD:search_workShop,
			MO_STATE:search_workSho,
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
	                        var rowCollection=createSourceObj(data); 
	                        var arr = [];
	                        arr.push({"id":"", "text":"全部"});
	                        for(var i=0; i< rowCollection.length; i++){
	                        	arr.push({"id":rowCollection[i].DICT_IT, "text":rowCollection[i].DICT_IT_NM});
	                        }
	                        $('#search_workSho').combobox({
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
	                        var rowCollection=createSourceObj(data); 
	                        var arr = [];
	                        arr.push({"id":"", "text":"全部"});
	                        for(var i=0; i< rowCollection.length; i++){
	                        	arr.push({"id":rowCollection[i].PL_CD, "text":rowCollection[i].PL_NM});
	                        }
	                        $('#search_workShop').combobox({
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