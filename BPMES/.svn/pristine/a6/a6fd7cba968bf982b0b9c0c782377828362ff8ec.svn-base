/* 启动时加载 */
/*
 */
(function() {
	function factoryInfo() {
		initGridData = function() {
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			var Search_LineCd = $('#Search_LineCd').textbox('getValue');
			var Search_WC = $('#Search_WC').textbox('getValue');
			var Search_Item = $('#Search_Item').textbox('getValue');
			var Search_Moder = $('#Search_Moder').textbox('getValue');
			var Search_Time = $('#Search_Time').datebox('getValue');
			var reqData = {
				IFS: 'MES_R0092',
				LINE_CD: Search_LineCd,
				WC_CD: Search_WC,
				ITEM_CD: Search_Item,
				MODER_CD: Search_Moder,
				CRT_DT: Search_Time,
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'SNRetrospectiveReport_tab', reqData);
		},		
		bindGridData = function(reqData, jsonData) {
			console.log("jsonData="+jsonData.rows.length);
			
			console.log("dataAttr="+dataAttr.length);
			var arr = [];
			var column = [];
			/*for(var i =0;i<jsonData.rows.length;i++){
				arr.push(
					
				)
			}*/
			var gridList = {
				name: 'SNRetrospectiveReport_tab',
				dataType: 'json',
				rownumbers:true,
                border : 2,  
                nowrap : false, 
                fit : true,  
				columns: [[
					{field: 'FCT_NM',title: '工厂名称',width: 120,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" +value+ "</span>";}},
			        {field: 'WC_NM',title: '车间名称',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'LINE_NM',title: '产线名称',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'SHIFT_NM',title: '班组名称',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'MO_NO',title: '工单编号',width: 130,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'WO_NO',title: '作业指示号',width: 140,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'ITEM_CD',title: '物料编码',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'ITEM_NM',title: '物料名称',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'BAR_CODE',title: '产品编码',width: 90,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'SMT001',title: '印刷机投入',width: 90,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'SMT002',title: '贴片机投入',width: 90,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'SMT003',title: '分板机投入',width: 90,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'SMT004',title: '波峰焊投入',width: 90,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
				]]
			}
			initGridView(reqData, gridList);
			dataGrid.datagrid('loadData', jsonData);
		},
     /*查询*/
	searchDataGrid=function(dgrid){
	   initGridData();
	}
		
		
	/*初始化加载*/
    InitializeLoad = function(){
		var MO_NO = 'MO1705230042';
		var AInitializeLoad = {
            url: "/iPlant_ajax",
            dataType: "JSON",
            async:false, 
            data: {
               MO_NO: MO_NO,
               IFS: "ST00112"
            },
            successCallBack: function(a) {
            	dataAttr = [];
            	var op = a.RESPONSE[0].RESPONSE_DATA;
                $.each(op,function(n,obj) {
                	dataAttr.push(
                		{field: "'"+obj.FROM_ROUT_CD+"'",title: '工位代码',width: 110,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + obj.FROM_ROUT_CD + "'>" +obj.FROM_ROUT_CD+ "</span>";}},
        			    {field: "'"+obj.ROUT_NAME+"'",title: '工位名称',width: 110,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + obj.ROUT_NAME + "'>" + obj.ROUT_NAME + "</span>";}}
        			);
			    });  
            },
            errorCallBack: function() {
                $.messager.alert("提示", '请联系管理员，查询失败！');
            }
        };
		iplantAjaxRequest(AInitializeLoad);
	}
		
	}
	factoryInfo.prototype = {
		init: function() {
			$(function() {
				dataGrid = $('#SNRetrospectiveReport_tab');
				
				InitializeLoad();
				
				initGridData();
				/*查询*/
				$('#btnSearch').click(function() {	
					var dgrid = dataGrid.datagrid('options');
					searchDataGrid(dgrid);
				});
				/*导出*/
				$('#btnExprt').click(function(){						
				 	var now = new Date();
                    var year =now.getFullYear();
                	var reqData = {
                	   IFS:''
                	}
                	createTable('tbIMESReport','SN追溯报表','SNRetrospectiveReport_tab',reqData);
                });
			});
		}
	}
	var fcfo = new factoryInfo();
	fcfo.init();
})();