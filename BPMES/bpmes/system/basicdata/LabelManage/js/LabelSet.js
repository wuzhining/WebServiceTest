/* 启动时加载 */
/*
 */
(function() {
	function labelSet() {
		/**初始化combobox内容*/
		initGridData = function() {
			var company = {
	                url: "/iPlant_ajax",
	                dataType: "JSON",
	                data: {IFS: "L000011"},
	                successCallBack: function(a) {
	                	var op = a.RESPONSE[0].RESPONSE_DATA;
	                    $.each(op,function(n,obj) {
	                    	dataLabelType.push({'value':obj.LB_TY,'text':obj.LB_TY_DES});
					    });  
	                },
	                errorCallBack: function() {
	                    $.messager.alert("提示", '请联系管理员，查询失败！')
	                }
	            };
			iplantAjaxRequest(company);
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			var reqData = {
				IFS: 'L000011',
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'labelset_tab', reqData);
		},
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'labelset_tab',
				dataType: 'json',
				columns: [[
							{ field: 'CD', hidden:true,title: '编码', width: 100,align:'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
							{ field: 'LB_NM',title:'标签名',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					        	   options:{required:true, validType:['length[1,25]','specialTextCharacter']}}}, 
							{ field: 'LB_DES',title:'标签描述',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					        	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
							{ field: 'LB_TY', title: '标签种类', width: 150,align:'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.LB_TY_DES  || value)+ "</span>";},
								editor:{type:'combobox',options:{required:true,valueField:'value',textField:'text',data:dataLabelType,required:true}}}, 
							{ field: 'LB_KD', title: '标签类型',width: 150,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					        	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
							{ field: 'TT_PA', title: '目标路径', width: 100,align:'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					        	   options:{validType:['length[1,25]','specialTextCharacter']}}}, 
							{ field: 'RS_PA', title: '源路径', width: 100,align:'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					        	   options:{validType:['length[1,25]','specialTextCharacter']}}}, 
							{ field: 'OUT_TY', title: '输出类型', width:100,align:'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					        	   options:{validType:['length[1,25]','specialTextCharacter']}}}, 
							{ field: 'OTHER', title: '其他', width: 200,align:'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					        	   options:{validType:['length[1,25]','specialTextCharacter']}}} 
						]],
				/**结束编辑模式的操作*/ 
			     onEndEdit:function(index,row){
			    	 var ed = $(this).datagrid('getEditor', {index: index,field: 'LB_TY'});
			    	 row.LB_TY = $(ed.target).combobox('getValue');
			    	 row.LB_TY_DES = $(ed.target).combobox('getText');
			     },
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
		        	var Num = index,rowNum = row;
		        	console.log("Num:"+Num);
			    	console.log("rowNum:"+rowNum);
		            row.editing = false;
		            $(this).datagrid('refreshRow', index);
		        },
		        /**单击进入编辑模式*/
			    onClickRow: function (index, row) {
			    	addDatagridEditor(dataGrid,index);
			    }
			}
			initGridView(reqData, gridList);
			dataGrid.datagrid('loadData', jsonData);
		},
		getDataByCondition = function (){
			var queryLabelName = $('#queryLabelName').textbox('getValue');
			var queryLabelType = $('#queryLabelType').textbox('getValue');
			var dgrid = dataGrid.datagrid('options');
	        var reqData ={
	        	LB_NM: queryLabelName,
	        	LB_TY_DES: queryLabelType,
	        	IFS:'L000011',
	        	pageIndex:1,
	        	pageSize:dgrid.pageSize
	        };
	        reqGridData('/iPlant_ajax','labelset_tab',reqData)
		}
	}

	labelSet.prototype = {
		init: function() {
			$(function() {
				//初始化全局变量对象
				dataGrid = $('#labelset_tab'),dataLabelType=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				initGridData();
				
				$('#btnSearch').click(function(){
		        	  getDataByCondition(); 
				});
				
				$('.add').click(function() {					
					insertDataGrid('labelset_tab',{CD:autoCreateCode('SYS')});
				});
				
				$('.delete').click(function(){
					deleteDataGrid('labelset_tab','CD','L000013','showMessageInfo');
	            });

				$('.save').click(function() {
					saveDataGrid('labelset_tab','L000012','L000014','showMessageInfo');
				});
			});
		}
	}
	var fcfo = new labelSet();
	fcfo.init();
})();