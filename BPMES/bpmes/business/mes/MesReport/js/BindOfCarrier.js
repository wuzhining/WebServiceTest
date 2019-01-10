/* 启动时加载 */
/*
 */
(function() {
	function factoryInfo() {
		initGridData = function() {
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			var reqData = {
				IFS: 'S0000031',
				async:false,
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'BindOfCarrier_tab', reqData);
		}
		var tmp = {
                url: "/iPlant_ajax",
                dataType: "JSON",
                data: {IFS: "B000021"},
                successCallBack: function(a) {
                	dataTmp = [];
                	var op = a.RESPONSE[0].RESPONSE_DATA;
                    $.each(op,function(n,obj) {
                    	dataTmp.push({'value':obj.FT_CD,'text':obj.FT_NM});
                    	Tmp[a.RESPONSE[0].RESPONSE_DATA[n].FT_CD]=a.RESPONSE[0].RESPONSE_DATA[n].FT_NM;
				    });  
                },
                errorCallBack: function() {
                    $.messager.alert("提示", '请联系管理员，查询失败！')
                }
            };
		iplantAjaxRequest(tmp),
		
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'BindOfCarrier_tab',
				dataType: 'json',
				columns: [[
						{field: 'FCT_CD',title: '工厂名称',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.FCT_NM  || Tmp[value])+ "</span>";},
				           		   editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataTmp,required:true,editable:false}}},
		           		{field: 'BAR_CODE',title: '绑定SN号',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
		        	    	   options:{required:true, validType:['length[1,50]','specialCharacterTextArea']}}},
		        	    {field: 'CARE_LB',title: '载具标签',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
				           options:{required:true, validType:['length[1,50]','specialCharacterTextArea']}}},
					    {field: 'CARE_CD',title: '载具编码',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					           options:{required:true, validType:['length[1,50]','specialCharacterTextArea']}}},
			            {field: 'CARE_NM',title: '载具名称',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
				               options:{required:true, validType:['length[1,50]','specialCharacterTextArea']}}},
					    {field: 'USE_YN',title: '是否启用',width: 80,align: 'center',formatter: function(value, row, index) {if(value == 'Y') { return '是';} else { return '否';}},editor:{type:'checkbox',options:{on: 'Y',off: 'N'}}}, 
				        {field: 'MO',title: '备注',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					           options:{validType:['length[0,50]','specialTextCharacter']}}},
				        {field: 'CRT_ID',title: '创建人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
						{field: 'CRT_DT',title: '创建时间',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
						{field: 'UPT_ID',title: '修改人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
						{field: 'UPT_DT',title: '修改时间',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
					]],
		        /**单击进入编辑模式*/
		        onClickRow: function (index, row) {
		        	careLB = row.CARE_LB;
		        	OpenFrameAttribute(row.CARE_LB);
	            },
			}
			initGridView(reqData, gridList);
			dataGrid.datagrid({"onLoadSuccess":function(data){
				if(data.rows.length == 0){
					OpenFrameAttribute('');
			    }else{
			    	 OpenFrameAttribute(data.rows[0].CARE_LB);
			    }
			}}).datagrid('loadData', jsonData);
		}
	}
	
	OpenFrameAttribute = function(CARE_LB){
		var dgrid = dataGrid.datagrid('options');
		if(!dgrid) return;
		var reqDataA = {
			CARE_LB: CARE_LB,
			IFS: 'S0000035',
			pageIndex: 1,
			pageSize: dgrid.pageSize
		}
		dialogDataGrid('/iPlant_ajax', 'BindOfCarrierDetail_tab', reqDataA);
		
		dialogEditorDataGrid = function(tabName,reqDataA, jsonData) {
			//根据tabName判断哪个列表
			var columnsTab,edDataGrid,messageInfo;
				columnsTab=[
				    {field: 'FCT_NM',title: '工厂名称',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{required:true, validType:['length[1,50]','specialTextCharacter']}}},  
	        	    {field: 'BAR_CODE',title: '绑定SN号',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
	        	    	   options:{required:true, validType:['length[1,50]','specialCharacterTextArea']}}},
	        	    {field: 'CARE_LB',title: '载具标签',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			               options:{required:true, validType:['length[1,50]','specialCharacterTextArea']}}},
				    {field: 'CARE_CD',title: '载具编码',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
				           options:{required:true, validType:['length[1,50]','specialCharacterTextArea']}}},
		            {field: 'CARE_NM',title: '载具名称',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			               options:{required:true, validType:['length[1,50]','specialCharacterTextArea']}}},
				    {field: 'USE_YN',title: '是否启用',width: 80,align: 'center',formatter: function(value, row, index) {if(value == 'Y') { return '是';} else { return '否';}},editor:{type:'checkbox',options:{on: 'Y',off: 'N'}}}, 
			        {field: 'MO',title: '备注',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
				           options:{validType:['length[0,50]','specialTextCharacter']}}},
			        {field: 'CRT_ID',title: '创建人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'CRT_DT',title: '创建时间',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'UPT_ID',title: '修改人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'UPT_DT',title: '修改时间',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}];
				
			var gridLists = {
				name: 'BindOfCarrierDetail_tab',
				dataType: 'json',
				pagination:false,
				rownumbers:true,
				loadMsg: '数据加载中...',
				columns: [columnsTab],
			}
			initEditorDataGridView(reqDataA, gridLists);
			$('#BindOfCarrierDetail_tab').datagrid('loadData', jsonData);
		}
	}
	
	
	searchDataGrid=function(dgrid){
		var CARE_LB =$("#CARE_LB").combobox("getValue");
		var CARE_CD =$("#CARE_CD").combobox("getValue");
		var BAR_CODE =$("#BAR_CODE").textbox("getValue");
		var reqData = {
			IFS: 'S0000031',
			CARE_LB:CARE_LB,
			CARE_CD:CARE_CD,
			BAR_CODE:BAR_CODE,
			pageIndex: 1,
			pageSize: dgrid.pageSize
		}
		reqGridData('/iPlant_ajax', 'BindOfCarrier_tab', reqData);
	}
	
	factoryInfo.prototype = {
		init: function() {
			$(function() {
				
				var ajaxParam2={
	                    url:'/iPlant_ajax',
	                    data:{
	                        IFS:'S0000023',
	                    },
	                    successCallBack:function(data){
	                    	$('#CARE_LB').combobox('clear');
	                        var rowCollection=createSourceObj(data); 
	                        var arr = [];
	                        arr.push({"id":"", "text":"全部"});
	                        for(var i=0; i< rowCollection.length; i++){
	                        	arr.push({"id":rowCollection[i].CARE_LB, "text":rowCollection[i].CARE_LB});
	                        }
	                        $('#CARE_LB').combobox({
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
	                        IFS:'S0000023',
	                    },
	                    successCallBack:function(data){
	                    	$('#CARE_CD').combobox('clear');
	                        var rowCollection=createSourceObj(data); 
	                        var arr = [];
	                        arr.push({"id":"", "text":"全部"});
	                        for(var i=0; i< rowCollection.length; i++){
	                        	arr.push({"id":rowCollection[i].CARE_CD, "text":rowCollection[i].CARE_CD});
	                        }
	                        $('#CARE_CD').combobox({
	                            data:arr,
	                            valueField:'id',
	                            textField:'text',
	                            panelWidth:150
	                        });
	                    }
	                }
	            iplantAjaxRequest(ajaxParam3);
				
				/*初始化全局变量对象*/
				dataGrid = $('#BindOfCarrier_tab'),dataTmp=[],dataFactory=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				initGridData();
				$('#btnSearch').click(function() {					
					searchDataGrid(dataGrid);
				});
				
				$('#btnExprt').click(function(){
					var now = new Date();
	                var year =now.getFullYear();
	                var reqData = {
	                		IFS:'S0000031'
	                	}
	                	createTable('tbIMESReport','载具绑定关系导出','BindOfCarrier_tab',reqData);
	                });
				
				$('#btnExprt2').click(function(){
					var now = new Date();
	                var year =now.getFullYear();
	                var reqData = {
	                		CARE_LB: careLB,
	                		IFS:'S0000035'
	                	}
	                	createTable('tbIMESReport','载具绑定关系明细导出','BindOfCarrierDetail_tab',reqData);
	                });
			});
		}
	}
	var fcfo = new factoryInfo();var careLB,Tmp={};
	fcfo.init();
})();