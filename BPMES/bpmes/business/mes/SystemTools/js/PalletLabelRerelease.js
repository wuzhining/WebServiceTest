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
				reqGridData('/iPlant_ajax', 'BoxMSG_tab', reqData);
		},
		
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'BoxMSG_tab',
				dataType: 'json',
				columns: [[
					{field: 'BOX_ID',title: '箱号',width: 150,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.DICT_IT_NM || value)+ "</span>";},editor:{type:'validatebox',
			        	   options:{required:true, validType:['length[1,50]','specialTextCharacter']}}}, 
	        	   {field:'WO_NO',title:'作业指示号',width:180,align:'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
					{field:'MO_NO',title:'工单编号',width:120,align:'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},     
					{field: 'WC_NM',title: '车间名称',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{ validType:['length[1,50]','specialTextCharacter']}}}, 
					{field: 'LINE_NM',title: '拉线编码',width: 120,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";},editor:{type:'validatebox',
			        	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}}, 
				    {field: 'ITEM_CD',title: '物料编码',width: 120,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";},editor:{type:'validatebox',
					            options:{required:true, validType:['length[1,50]','specialTextCharacter']}}},
		            {field: 'ITEM_NM',title: '物料名称',width: 150,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";},editor:{type:'validatebox',
			        	   options:{validType:['length[1,30]','specialTextCharacter']}}}, 
					{field: 'CRT_ID',title: '创建人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'CRT_DT',title: '创建时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'UPT_ID',title: '修改人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'UPT_DT',title: '修改时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
			    ]],
		        /**单击进入编辑模式*/
				onClickRow: function (index,row) {
		        },
			}
			initGridView(reqData, gridList);
			dataGrid.datagrid({"onLoadSuccess":function(data){
			    $(this).datagrid('selectRow',0);
			}}).datagrid('loadData', jsonData);
		}
		
	}
	/*右侧的关联表格*/   
	OpenFrameAttribute = function(ifs){
		var tabName = 'RereleaseLog_tab';
		var dgridOp = $('#'+tabName).datagrid('options');
		if(!dgridOp) return;
		var reqDataA = {
			PLT_ID: $("#search_PalletId").val(),
			IFS: ifs,
			pageIndex: 1,
			pageSize: dgridOp.pageSize	
		}
		dialogDataGrid('/iPlant_ajax', tabName, reqDataA);
		dialogEditorDataGrid = function(tabName,reqDataA, jsonData) {
			var columnsTab,edDataGrid,messageInfo;
			columnsTab=[
					{field: 'PLT_ID',title: '栈板号',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{required:true, validType:['length[1,50]','specialTextCharacter']}}},  
					{field: 'FCT_CD',title: '工厂名称',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{required:true, validType:['length[1,50]','specialTextCharacter']}}},
					{field: 'PACK_STATE',title: '栈板状态',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{required:true, validType:['length[1,50]','specialTextCharacter']}}},
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
	
	/*PLT1704151194*/
	searchMO_NO = function(){
		var search_PalletId = $('#search_PalletId').textbox('getValue');
		if(search_PalletId==null || search_PalletId==''){
			$.messager.alert("提示", '请输入栈板号！')
			$("#fmStation").form("clear");
			return;
		};
		var ajaxParam = {
			data: {
				url: '/iPlant_ajax',
				IFS: 'GW00040',
				PLT_ID: search_PalletId
			},
			successCallBack:function(data){
				var rowCollection=createSourceObj(data); 
				if(rowCollection.length <= 0){
					$.messager.alert("提示", '该栈板号不存在，请重新输入！')
					$("#fmStation").form("clear");
					return;
				}else{
					$("#palletId").textbox('setValue',rowCollection[0].PLT_ID);					/*栈板ID*/
					$("#productionOrder").textbox('setValue',rowCollection[0].MO_NO);			/*生成订单号*/
					$("#packingDate").textbox('setValue',rowCollection[0].CRT_DT);				/*包装日期*/
					$("#materialName").textbox('setValue',rowCollection[0].ITEM_CD);			/*物料编码*/
					$("#materialDescribe").textbox('setValue',rowCollection[0].ITEM_NM);		/*物料名称*/	
					$("#pcsNum").textbox('setValue',rowCollection[0].PLT_QTY);					/*PCS数量*/
					
					var dgrid = dataGrid.datagrid('options');
					var reqData = {
							PLT_ID: $("#search_PalletId").val(),
							IFS: 'GW00040',
							pageIndex: 1,
							pageSize: dgrid.pageSize
						}
						reqGridData('/iPlant_ajax', 'BoxMSG_tab', reqData);
					OpenFrameAttribute('GW00040');
					
					//打印标签开始
					WOSN =rowCollection[0].MO_NO;
	        		JOBINS =rowCollection[0].WO_NO;
	        		MERSN =rowCollection[0].ITEM_CD;
	        		MERNM =rowCollection[0].ITEM_NM;
	        		LINE =rowCollection[0].LINE_CD;
	        		NUM  =rowCollection[0].NUM;
	        		rowNum	= rowCollection[0].PLT_QTY;
				}
            }
		};
		iplantAjaxRequest(ajaxParam);
	}
	
	/*再发行*/
	rerelease = function(){
		console.log(1)
		var search_PalletId = $('#search_PalletId').textbox('getValue');
		//打印标签开始
		var data1=new Array();
		var barCodeList="";
		data1.push({"TITLE":"栈板标签","SN":search_PalletId,"WOSN":WOSN,"JOBINS":JOBINS,"MERSN":MERSN,"MERNM":MERNM,"LINE":LINE,"NUM":rowNum});
		barCodeStr = {labName:"mes03.lab","barCodeList":data1};
		zbSocketPrinter(barCodeStr);
	}
	
	factoryInfo.prototype = {
		init: function() {
			$(function() {
				/*初始化全局变量对象*/
				dataGrid = $('#BoxMSG_tab'),dataCompany=[],dataFactory=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				initGridData();
				OpenFrameAttribute();
				$('#search_PalletId').textbox('textbox').keydown(function (e) {
			         if (e.keyCode == 13) {
			        	 searchMO_NO();
			         }
			     });
				
				$('#rerelease').click(function() {		/*再发行*/
					rerelease();
				});
			});
		}
	}
	var fcfo = new factoryInfo();var WOSN,JOBINS,MERSN,MERNM,LINE,NUM,rowNum
	fcfo.init();
})();