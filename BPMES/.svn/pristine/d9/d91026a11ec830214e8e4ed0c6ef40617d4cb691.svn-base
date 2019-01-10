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
				pageSize: 2
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
				    {field: 'MO_NO',title: '生产订单',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					       options:{validType:['length[1,25]','specialTextCharacter']}}},
				    {field: 'WO_NO',title: '作业指示',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					       options:{validType:['length[1,25]','specialTextCharacter']}}}, 
					{field: 'ITEM_CD',title: '物料编码',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{validType:['length[1,25]','specialTextCharacter']}}}, 
					{field: 'ITEM_NM',title: '物料名称',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{validType:['length[1,100]','specialTextCharacter']}}}, 
					{field: 'LINE_NM',title: '拉线编码',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{validType:['length[1,100]','specialTextCharacter']}}}, 
					{field: 'CRT_ID',title: '打印作业者',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{validType:['length[1,25]','specialTextCharacter']}}}
				]],
			}
			initGridView(reqData, gridList);
			dataGrid.datagrid('loadData', jsonData);
		}
	}
	
	var surplus =[];
	/*箱号查询*/
	/*BOX1704221237*/
	searchMO_NO = function(dgrid){
		var search_MaterialBOX_ID = $('#search_MaterialBOX_ID').textbox('getValue');
		if(search_MaterialBOX_ID==null || search_MaterialBOX_ID==''){
			$.messager.alert("提示", '请输入箱号！')
			$("#fmStation").form("clear");
			return;
		};
		var ajaxParam = {
			data: {
				url: '/iPlant_ajax',
				IFS: 'GW00046',
				BOX_ID: search_MaterialBOX_ID
			},
			successCallBack:function(data){
				var rowCollection=createSourceObj(data); 
				if(rowCollection.length <= 0){
					$.messager.alert("提示", '该箱号不存在，请重新输入！')
					$("#fmStation").form("clear");
					return;
				}else{
					$("#InstructionsNumber").textbox('setValue',rowCollection[0].WO_NO);		/*作业指示编号BOX_ID*/
					$("#BoxCode").textbox('setValue',rowCollection[0].BOX_ID);					/*箱号*/
					$("#FactoryCode").textbox('setValue',rowCollection[0].FCT_NM);				/*工厂编码*/
					$("#wireCode").textbox('setValue',rowCollection[0].LINE_NM);				/*拉线编码*/
					$("#MaterialCode").textbox('setValue',rowCollection[0].ITEM_CD);			/*物料编码*/
					$("#ProcessRoute").textbox('setValue',rowCollection[0].WC_NM);				/*工艺路线*/
					
					var reqData = {
							BOX_ID:search_MaterialBOX_ID,
			                IFS: 'GW00046',
							pageIndex: 1,
							pageSize: 2
						}
						reqGridData('/iPlant_ajax', 'BoxLabelRerelease_tab', reqData);
					 
					//打印标签开始
					WOSN =rowCollection[0].MO_NO;
	        		JOBINS =rowCollection[0].WO_NO;
	        		MERSN =rowCollection[0].ITEM_CD;
	        		MERNM =rowCollection[0].ITEM_NM;
	        		LINE =rowCollection[0].LINE_CD;
	        		NUM  =rowCollection[0].NUM;
				}
            }
		};
		iplantAjaxRequest(ajaxParam);
	}
	
	/*再发行*/
	rerelease = function(){
		var search_MaterialBOX_ID = $('#search_MaterialBOX_ID').textbox('getValue');
		//打印标签开始
		var data1=new Array();
		var barCodeList="";
		data1.push({"TITLE":"BOX标签","SN":search_MaterialBOX_ID,"WOSN":WOSN,"JOBINS":JOBINS,"MERSN":MERSN,"MERNM":MERNM,"LINE":LINE,"NUM":NUM});
		barCodeStr = {labName:"mes03.lab","barCodeList":data1};
		zbSocketPrinter(barCodeStr);
	}
	
	factoryInfo.prototype = {
		init: function() {
			$(function() {
				/*初始化全局变量对象*/
				dataGrid = $('#BoxLabelRerelease_tab');
				initGridData();
				
				$(function() {
					
					$('#search_MaterialBOX_ID').textbox('textbox').keydown(function (e) {
				         if (e.keyCode == 13) {
				        	 searchMO_NO();
				         }
				     });
					
					$('#Rerelease').click(function() {		/*再发行*/
						rerelease();
					});
					
				});
			});
		}
	}
	var fcfo = new factoryInfo();var WOSN,JOBINS,MERSN,MERNM,LINE,NUM
	fcfo.init();
})();