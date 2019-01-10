/* 启动时加载 */
/*
 */
(function() {
	function factoryInfo() {
		initGridData = function() {
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			var searchFD_CD = $('#searchFD_CD').textbox('getValue');
			var searchFD_NM = $('#searchFD_NM').textbox('getValue');
			var searchMAT_CD =$("#searchMAT_CD").textbox("getValue");
			var searchLINE_CD =$("#searchLINE_CD").combobox("getValue");
			var reqData = {
				IFS: 'ST00025',
				FD_CD:searchFD_CD,
				FD_NM:searchFD_NM,
				MAT_CD:searchMAT_CD,
				LINE_CD:searchLINE_CD,
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'bindOnFeederInformation_tab', reqData);
		}		
		
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'bindOnFeederInformation_tab',
				dataType: 'json',
				columns: [[
        	    {field: 'FCT_CD',title: '工厂名称',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.FCT_NM  || value)+ "</span>";}},
        	    {field: 'LINE_CD',title: '拉线编码',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
        	    {field: 'ET_CD',title: '机器编码',width: 110,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
	            {field: 'STACK_CD',title: '栈位代码',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
	            {field: 'POSIT_NO',title: '位置号',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
        	    {field: 'FD_CD',title: '飞达编码',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
	            {field: 'FEED_PW',title: '飞达轨道',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},   
	            {field: 'FD_NM',title: '飞达名称',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
	            {field: 'MAT_CD',title: '物料编码',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
	            {field: 'PSN1_NO',title: 'PSN(物料条码)',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
	            {field: 'PSN1_QTY',title: 'PSN(上料数量)',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
	            {field: 'PSN2_NO',title: 'PSN(接料条码)',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
	            {field: 'PSN2_QTY',title: 'PSN(接料数量)',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
		        {field: 'MO',title: '备注',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
		        {field: 'CRT_ID',title: '创建人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				{field: 'CRT_DT',title: '创建时间',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
				{field: 'UPT_ID',title: '修改人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
				{field: 'UPT_DT',title: '修改时间',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
				]],
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
			$("#enditTabupload").dialog("open").dialog('setTitle', '飞达绑定关系维护导入');
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
				
				/*初始化全局变量对象*/
				dataGrid = $('#bindOnFeederInformation_tab'),showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				initGridData();
				$('#btnSearch').click(function() {	
					var dgrid = dataGrid.datagrid('options');
					searchDataGrid(dgrid);
				});
				
				$('#btnImport').click(function() {						/*导入*/
					OpenImprotFramedr();
				});
				
				 $('#btnExprt').click(function(){						/*导出*/
					 	var now = new Date();
	                    var year =now.getFullYear();
	                	var reqData = {
	                			IFS:'ST00025'
	                	}
	                	createTable('tbIMESReport','飞达绑定关系维护导出','bindOnFeederInformation_tab',reqData);
	                });
				
			});
		}
	}
	var fcfo = new factoryInfo();
	fcfo.init();
})();