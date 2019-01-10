/* 启动时加载 */
/*
 */
(function() {
	function factoryInfo() {
		initGridData = function() {
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			var search_MaterialType = $('#DeptCode').textbox('getValue');
			var workshops =$("#workShops").combobox("getValue");
			var orderstatus =$("#orderStatus").combobox("getValue");
			var statdate = $("#productionStartTime").datebox("getValue");
			var overdate = $("#productionEndTime").datebox("getValue");
			var reqData = {
				IFS: 'W000001',
				MO_NO:search_MaterialType,
				WC_CD:workshops,
				MO_STATE:orderstatus,
				PLAN_STRT_DT:statdate,
				PLAN_END_DT:overdate,
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'WorkOrderMaterialInformationQuery_tab', reqData);
		},
		
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'WorkOrderMaterialInformationQuery_tab',
				dataType: 'json',
				columns: [[
					{field: 'FCT_NM',title: '工厂名称',width: 80,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.DICT_IT_NM || value)+ "</span>";},editor:{type:'validatebox',
			        	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}}, 
					{field:'MO_NO',title:'工单号',width:120,align:'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},       
					{field: 'PROD_TYPE',title: '工单类型',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{validType:['length[1,30]','specialTextCharacter']}}},
					
					{field: 'WC_NM',title: '车间',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{ validType:['length[1,30]','specialTextCharacter']}}}, 
					{field: 'ITEM_CD',title: '物料编码',width: 120,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";},editor:{type:'validatebox',
			        	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}}, 
			        {field: 'ITEM_NM',title: '物料名称',width: 150,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";},editor:{type:'validatebox',
				           options:{validType:['length[1,30]','specialTextCharacter']}}},
				    {field: 'ITEM_TYPE_NM',title: '物料类型',width: 80,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";},editor:{type:'validatebox',
					            options:{required:true, validType:['length[1,50]','specialTextCharacter']}}},
		        	{field: 'MO_STATE_NM',title: '工单状态',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{ validType:['length[1,30]','specialTextCharacter']}}},
	        	    {field: 'PLAN_PO_QTY',title: '计划产量',width: 80,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
            	   	       options:{validType:['length[1,30]','specialTextCharacter']}}}, 
				    {field: 'REM_PO_QTY',title: '剩余数量',width: 80,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
		        	       options:{validType:['length[1,30]','specialTextCharacter']}}}, 
	        	    {field: 'SO_NO',title: '销售订单',width: 80,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.DICT_IT_NM || value)+ "</span>";},editor:{type:'validatebox',
        	               options:{ validType:['length[1,30]','specialTextCharacter']}}}, 
					{field: 'PLAN_STRT_DT',title: '计划开始日期',width: 150,align: 'center',formatter:function(value,row,index){if(row.PLAN_STRT_DT){return row.PLAN_STRT_DT;}},
		            	   editor:{type:'datebox',options:{required:true,editable:false}}}, 
					{field: 'PLAN_END_DT',title: '计划结束日期',width: 150,align: 'center',formatter:function(value,row,index){if(row.PLAN_END_DT){return row.PLAN_END_DT;}},
			               editor:{type:'datebox',options:{required:true,editable:false}}}, 
					{field: 'NXT_OPER',title: '后工程',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{validType:['length[1,30]','specialTextCharacter']}}}, 
			        {field: 'UGT_TYPE',title: '紧急等级',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
	        	    	   options:{validType:['length[1,30]','specialTextCharacter']}}},
    	    		{field: 'PRF_CD',title: '工艺流程',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
	        	           options:{validType:['length[1,30]','specialTextCharacter']}}},		
					{field: 'CRT_ID',title: '创建人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'CRT_DT',title: '创建时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'UPT_ID',title: '修改人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'UPT_DT',title: '修改时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
			    ]],
		        /**单击进入编辑模式*/
				onClickRow: function (index,row) {
		        	OpenFrameAttribute(row.MO_NO);
					$("#header-bottom").html(row.MO_NO);
		        },
			}
			initGridView(reqData, gridList);
			dataGrid.datagrid({"onLoadSuccess":function(data){
			    $(this).datagrid('selectRow',0);
			    OpenFrameAttribute(data.rows[0].MO_NO);
			    $('#header-bottom').html(data.rows[0].MO_NO+':');
			}}).datagrid('loadData', jsonData);
		}
		
	}
	/*底部的关联表格*/   
	OpenFrameAttribute = function(MO_NO){
		var tabName = 'WorkOrderMaterialInformationQuerybottom_tab';
		var dgridOp = $('#'+tabName).datagrid('options');
		if(!dgridOp) return;
		var reqDataA = {
			IFS: 'W0000026',
			MO_NO: MO_NO,
			pageIndex: 1,
			pageSize: dgridOp.pageSize	
		}
		dialogDataGrid('/iPlant_ajax', tabName, reqDataA);
		dialogEditorDataGrid = function(tabName,reqDataA, jsonData) {
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
					{field: 'PLAN_PO_QTY',title: '总计划数量',width: 80,align: 'right',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";},editor:{type:'validatebox',
					 	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}}, 
					{field: 'REQ_QTY',title: '发料数量',width: 80,align: 'right',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";},editor:{type:'validatebox',
					 	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
					{field: 'STD_QTY',title: '标准用量',width: 80,align: 'right',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";},editor:{type:'validatebox',
						   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
				    {field: 'REDU_QTY',title: '耗料数量',width: 80,align: 'right',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";},editor:{type:'validatebox',
						   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
					{field: 'RTN_QTY',title: '退回数量',width: 80,align: 'right',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";},editor:{type:'validatebox',
						   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
					{field: 'MO',title: '说明',width: 150,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";},editor:{type:'validatebox',
					 	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
					{field: 'CRT_ID',title: '创建人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'CRT_DT',title: '创建时间',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'UPT_ID',title: '修改人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'UPT_DT',title: '修改时间',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}];

			var gridLists = {
				name: tabName,
				dataType: 'json',
				columns: [columnsTab]
			}
			initEditorDataGridView(reqDataA, gridLists);
			$('#'+tabName).datagrid('loadData', jsonData);
		}
	}

	/*检索*/
	searchDataGrid=function(dgrid){
		initGridData();
	}
	
	factoryInfo.prototype = {
		init: function() {
			$(function() {
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
                        $('#workShops').combobox({
                            data:arr,
                            valueField:'id',
                            textField:'text',
                            panelWidth:150
                        });
                    }
             }
            iplantAjaxRequest(ajaxParam3);
			
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
                        $('#orderStatus').combobox({
                            data:arr,
                            valueField:'id',
                            textField:'text',
                            panelWidth:150
                        });
                    }
                }
                iplantAjaxRequest(ajaxParam2);
			 	
				/*初始化全局变量对象*/
				dataGrid = $('#WorkOrderMaterialInformationQuery_tab'),dataCompany=[],dataFactory=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				initGridData();
				$('#btnSearch').click(function() {	
					var dgrid = dataGrid.datagrid('options');
					searchDataGrid(dgrid);
				});
				
				/*底部框显示*/
				$('#btnSetAdd').click(function() {		
					insertDataGrid('MaterialGroupSetiing',{});	/*初始化默认数据*/
				});
				
				$('#btnSetDelete').click(function(){
					deleteDataGrid('MaterialGroupSetiing','ITEM_GROUP_ATTR','Z000049','showMSDInfo');
	            });

				$('#btnSetSave').click(function() {
					saveDataGrid('MaterialGroupSetiing','W000002','W000003','showMSDInfo');
				});
				
				$('#btnExprt').click(function(){						/*导出*/
				 	var now = new Date();
                    var year =now.getFullYear();
                	var reqData = {
                			IFS:'W0000026'
                	}
                	createTable('tbIMESReport','工单物料信息导出','WorkOrderMaterialInformationQuerybottom_tab',reqData);
	                	
	             });
			});
		}
	}
	var fcfo = new factoryInfo();
	fcfo.init();
})();