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
			reqGridData('/iPlant_ajax', 'BoxLabelRerelease_tab', reqData);
		},
		
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'BoxLabelRerelease_tab',
				dataType: 'json',
				columns: [[
					{field: 'BOX_ID',title: '箱号',width: 160, align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
					{field: 'LOT_NO',title: 'Lot ID',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
					{field: 'ITEM_CD',title: '物料编码',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{validType:['length[1,25]','specialTextCharacter']}}}, 
					{field: 'ITEM_TYPE',title: '物料类型',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{validType:['length[1,100]','specialTextCharacter']}}}, 
				    {field: 'MO_NO',title: '生产订单',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{validType:['length[1,25]','specialTextCharacter']}}},
					{field: 'WO_NO',title: '作业指示',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{validType:['length[1,25]','specialTextCharacter']}}}, 
					{field: 'LINE_CD',title: '拉线编码',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{validType:['length[1,100]','specialTextCharacter']}}}, 
				    {field: '3',title: '订单数',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{validType:['length[1,25]','specialTextCharacter']}}},
					{field: 'WO_STATE',title: '状态',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{validType:['length[1,25]','specialTextCharacter']}}},
					{field: '1',title: '打印作业者',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{validType:['length[1,25]','specialTextCharacter']}}}
						   
				]],
			}
			initGridView(reqData, gridList);
			dataGrid.datagrid('loadData', jsonData);
		}
	}
	
	var surplus =[];
	/*箱号查询*/
	searchMO_NO = function(dgrid){
		var search_MaterialWO_NO = $('#search_MaterialWO_NO').textbox('getValue');
		if(search_MaterialWO_NO==null || search_MaterialWO_NO==''){
			$.messager.alert("提示", '请输入箱号！')
			$("#fmStation").form("clear");
			return;
		};
		var ajaxParam = {
			data: {
				url: '/iPlant_ajax',
				IFS: 'GW00020',
				BOX_ID: search_MaterialWO_NO
			},
			successCallBack:function(data){
				var rowCollection=createSourceObj(data); 
				if(rowCollection.length <= 0){
					$.messager.alert("提示", '该作业指示编号不存在，请重新输入！')
					$("#fmStation").form("clear");
					return;
				}else{
					$("#ProductionOrders").textbox('setValue',rowCollection[0].MO_NO);					/*生产订单号*/
					$("#OrdersLot").textbox('setValue',rowCollection[0].LOT_NO);						/*生产LOT号*/
					$("#InstructionsNumber").textbox('setValue',rowCollection[0].WO_NO);				/*作业指示编号BOX_ID*/
					$("#BoxCode").textbox('setValue',rowCollection[0].BOX_ID);							/*箱号*/
					$("#FactoryCode").textbox('setValue',rowCollection[0].FCT_CD);						/*工厂编码*/
					$("#wireCode").textbox('setValue',rowCollection[0].LINE_CD);						/*拉线编码*/
					$("#MaterialCode").textbox('setValue',rowCollection[0].ITEM_CD);					/*物料编码*/
					$("#WOState").textbox('setValue',rowCollection[0].WO_STATE);						/*工单w/o状态*/
					$("#ProcessRoute").textbox('setValue',rowCollection[0].ROUT_CD);					/*工艺路线*/
					
					var dgrid = dataGrid.datagrid('options');
					var reqData = {
							BOX_ID: search_MaterialWO_NO,
							IFS: 'GW00020',
							pageIndex: 1,
							pageSize: dgrid.pageSize
						}
						reqGridData('/iPlant_ajax', 'BoxLabelRerelease_tab', reqData);
				}
            }
		};
		iplantAjaxRequest(ajaxParam);
		console.log(surplus);
	}
	
	factoryInfo.prototype = {
		init: function() {
			$(function() {
				/*初始化全局变量对象*/
				dataGrid = $('#BoxLabelRerelease_tab');
				initGridData();
				
				
				$(function() {
					$('#search_MaterialWO_NO').textbox('textbox').keydown(function (e) {
				         if (e.keyCode == 13) {
				        	 searchMO_NO();
				         }
				     });
					
					$('#Rerelease').click(function() {		/*再发行*/
						searchMO_NO();
					});
					
				});
			});
		}
	}
	var fcfo = new factoryInfo();
	fcfo.init();
})();