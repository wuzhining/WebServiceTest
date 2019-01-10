/* 启动时加载 */
/*
 */
(function() {
	function factoryInfo() {
		initGridData = function() {
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			var searchMO_NO = $('#searchMO_NO').textbox('getValue');
			var searchWO_NO = $('#searchWO_NO').textbox('getValue');
			var searchPSN_NO =$("#searchPSN_NO").textbox("getValue");
			var searchRTN_TYPE =$("#searchRTN_TYPE").combobox("getValue");
			var reqData = {
				IFS: 'ST00060',
				MO_NO:searchMO_NO,
				WO_NO:searchWO_NO,
				PSN_NO:searchPSN_NO,
				RTN_TYPE:searchRTN_TYPE,
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'ReturnToCheckMaterial_tab', reqData);
		}		
		dataGrade=[{'value':'良品退料','text':'良品退料'},{'value':'制程不良退料','text':'制程不良退料'},{'value':'来料不良退料','text':'来料不良退料'}];
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'ReturnToCheckMaterial_tab',
				dataType: 'json',
				columns: [[
                                    
			        	    {field: 'FCT_CD',title: '工厂名称',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.FCT_NM  || value)+ "</span>";}},
			        	    {field: 'WC_CD',title: '车间',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
			        	    {field:'WO_NO',title:'作业指示号',width:180,align:'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
							{field:'MO_NO',title:'工单号',width:120,align:'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},  	   
							{field: 'PSN_NO',title: 'PSN(物料条码)',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
							{field: 'RTN_TYPE',title: '退料类型',width: 120,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.FD_ST_NM  || value)+ "</span>";}},
							{field: 'UNIT_QTY',title: '单机用量',width: 60,align: 'right',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";}},
				            {field: 'PLAN_WO_QTY',title: '计划生产数',width: 80,align: 'right',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";}},
				            {field: 'RTN_QTY',title: '申请数量',width: 60,align: 'right',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";}},
				            {field: 'RTN_PROC_QTY',title: '出库数量',width: 60,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'numberbox', options:{required:true,precision:0,min:0}}, 
				            	   formatter:function(value,row,index){ return formatNumber(value,0); }},
							{field: 'PRNT_MAT_CD',title: '装配件编码',width: 120,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";}},
				            {field: 'PRNT_MAT_NM',title: '装配件名',width: 150,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";}}, 
				            {field: 'MAT_BAT_CD',title: '材料批次号',width: 120,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";}},
				            {field: 'MAT_CD',title: '组件编码',width: 120,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";}},
				            {field: 'MAT_NM',title: '组件名',width: 120,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";}},
				            {field: 'UOM',title: '单位',width: 120,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";}},
				            {field: 'MAT_TYPE',title: '组件物料类型',width: 120,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";}},
					        {field: 'MO',title: '备注',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					        {field: 'CRT_ID',title: '创建人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
							{field: 'CRT_DT',title: '创建时间',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
							{field: 'UPT_ID',title: '修改人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
							{field: 'UPT_DT',title: '修改时间',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
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
					        /**单击进入编辑模式*/
					        onClickCell: function (index,field,value) {
					        	var tabName,dialogName,titleName,rowEdit,editem,editorFt,itemCd,reqData,dgrid;
					        	var rows = dataGrid.datagrid('getRows'),row = rows[index];
					        	/**判断是否为可编辑字段*/
					        	addDatagridEditor(dataGrid,index);
					        },
			}
			initGridMultiView(reqData, gridList);
			dataGrid.datagrid('loadData', jsonData);
		},
		/*检索*/
	   searchDataGrid=function(dgrid){
			initGridData();
		},
		
		setDataNull=function(){
			 $('#showFileName').html('');
		},
		
		/*导入*/
		OpenImprotFramedr = function(){
			$("#enditTabupload").dialog("open").dialog('setTitle', '退料盘点导入');
		}
		
	}
	factoryInfo.prototype = {
		init: function() {
			$(function() {
				
				var ajaxParam = {
						url:'/iPlant_ajax',
						data:{
							IFS : 'B000109'
						},
						successCallBack:function(data){
							$('#searchLINE_CD').combobox('clear');
							var rowCollection = createSourceObj(data);
							var arr = [];
	                        arr.push({"value":"", "text":"全部"});
							for(var i=0; i<rowCollection.length;i++){
								arr.push({"value":rowCollection[i].PD_LN_CD,"text":rowCollection[i].PD_LN_NM});
						    }
							$('#searchLINE_CD').combobox({
					    		valueField:'value',
			  					textField:'text',
			  					data:arr,
			  					panelWidth:150
			  				});
						 }
					}
					iplantAjaxRequest(ajaxParam);
				$('#searchRTN_TYPE').combobox('clear');
				dataGrade.push({"value":"", "text":"全部"});
				$('#searchRTN_TYPE').combobox({
                    data:dataGrade,
                    valueField:'value',
                    textField:'text',
                    panelWidth:150
                });
				
				/*初始化全局变量对象*/
				dataGrid = $('#ReturnToCheckMaterial_tab'),showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				initGridData();
				$('#btnSearch').click(function() {	
					var dgrid = dataGrid.datagrid('options');
					searchDataGrid(dgrid);
				});
				
				$('#btnSave').click(function() {
					saveDataGrid('ReturnToCheckMaterial_tab','ST00061','ST00062','showMessageInfo');
				});
				
				$('#btnImport').click(function() {						/*导入*/
					OpenImprotFramedr();
				});
				
				 $('#btnExprt').click(function(){						/*导出*/
					 	var now = new Date();
	                    var year =now.getFullYear();
	                	var reqData = {
	                			IFS:'ST00060'
	                	}
	                	createTable('tbIMESReport','退料盘点导出','ReturnToCheckMaterial_tab',reqData);
	                });
				
			});
		}
	}
	var fcfo = new factoryInfo();
	fcfo.init();
})();