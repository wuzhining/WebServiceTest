/* 启动时加载 */
/*
 */
(function() {
	function labelVariate() {
		/**初始化combobox内容*/
		initGridData = function() { 
			var labelType = {
                url: "/iPlant_ajax",
                dataType: "JSON",
                data: {IFS: "L000031"},
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
			iplantAjaxRequest(labelType);
			/**初始化工厂类型combobox内容*/
/*			factory = {
                url: "/iPlant_ajax",
                dataType: "JSON",
                data: {IFS:'D000008',DICT_CD:"CFT01",USE_YN:'Y'},
                successCallBack: function(a) {
                	var op = a.RESPONSE[0].RESPONSE_DATA;
                    $.each(op,function(n,obj) {
                    	dataFactory.push({'value':obj.DICT_IT,'text':obj.DICT_IT_NM});
				    });  
                },
                errorCallBack: function() {
                    $.messager.alert("提示", '请联系管理员，查询失败！')
                }
            };
			iplantAjaxRequest(factory);*/
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			var reqData = {
				IFS: 'L000031',
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'labelvariaterelevance_tab', reqData);
		},
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'labelvariaterelevance_tab',
				dataType: 'json',
				columns: [[
					{field: 'CD',hidden:true,title: '编号',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'LB_NM',title: '标签名',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
					{field: 'LB_TY',title: '标签种类',width: 300,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.LB_TY_DES  || value)+ "</span>";},
						editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataLabelType,required:true}}}, 
					{field: 'LB_KD',title: '标签类型',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
							options:{validType:['length[1,25]','specialTextCharacter']}}},
					{field: 'VB_UN',title: '变量关联',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
							options:{validType:['length[1,25]','specialTextCharacter']}}},
				    {field: 'REMARK',title: '备注',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
				    		options:{validType:['length[1,25]','specialTextCharacter']}}},
					{field: 'CRT_ID',title: '创建人',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.DICT_IT_NM || value)+ "</span>";}}, 
					{field: 'CRT_DT',title: '创建时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}} 
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
		            row.editing = false;
		            $(this).datagrid('refreshRow', index);
		        },
		        /**单击进入编辑模式*/
			    onClickRow: function (index, row) {
			    	if (editIndex != index){
			    		var ed,cd,editorFt;
			    		if(editIndex!=undefined){
		    				/**判断是否为新增行，并验证新增工厂编码重复*/
			    			var rowEdit = dataGrid.datagrid('getRows')[editIndex],edft = $(this).datagrid('getEditor', {index: editIndex,field: 'LB_NM'}),editorFt = edft.target,cd = editorFt.val();
			    			if(checkNotEmpty(rowEdit.editType)){
			    				if(rowEdit.editType=='add'){
			    					if(checkNotEmpty(cd)){
					    				var ajaxParam = {
											url : '/iPlant_ajax',
											dataType : 'JSON',
											data : {
												IFS : 'L000031',
												LB_NM : cd,
												pageIndex : 1,
												pageSize : 10
											},
											successCallBack : function(data) {
												rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
												if (rowNum > 0) {
													dataGrid.datagrid('selectRow', editIndex).datagrid('beginEdit', editIndex);
										       		showmessage.html('<font color=red>您输入的标签名['+ cd + ']已有相同,请重新输入!</font>');
										       		return false;
												} else {
													addDatagridEditor(dataGrid,index);
												}
											}
										};
										iplantAjaxRequest(ajaxParam);
					    			}else{
						        	   addDatagridEditor(dataGrid,index);
					    			}
			    				}else{
			    					addDatagridEditor(dataGrid,index);
			    					if(!checkNotEmpty(row.editType)){//如果是修改的情况，CD字段为只读模式
							    		ed = $(this).datagrid('getEditor', {index: index,field: 'LB_NM'});
							    		cd = ed.target;
							    		cd.prop('readonly',true);
						    		}
			    				}
			    			}else{
					    		 addDatagridEditor(dataGrid,index);
					    		 if(!checkNotEmpty(row.editType)){
							    		ed = $(this).datagrid('getEditor', {index: index,field: 'LB_NM'});
							    		cd = ed.target;
							    		cd.prop('readonly',true);
						    		}
			    			}
			    		}else{
			    			addDatagridEditor(dataGrid,index);
			    			if(!checkNotEmpty(row.editType)){
					    		ed = $(this).datagrid('getEditor', {index: index,field: 'LB_NM'});
					    		cd = ed.target;
					    		cd.prop('readonly',true);
				    		}
			    		}
			    	}
	            }
			}
			initGridView(reqData, gridList);
			dataGrid.datagrid('loadData', jsonData);
		},
		getDataByCondition =function (){
			var queryLabelName = $('#queryLabelName').textbox('getValue');
			var queryLabelType = $('#queryLabelType').textbox('getValue');
			var dgrid = dataGrid.datagrid('options');
	        var reqData ={
	        	LB_NM: queryLabelName,
	        	LB_TY_DES: queryLabelType,
	        	IFS:'L000031',
	        	pageIndex:1,
	        	pageSize:dgrid.pageSize
	        };
	        reqGridData('/iPlant_ajax','labelvariaterelevance_tab',reqData)
	      }
	}

	labelVariate.prototype = {
		init: function() {
			$(function() {
				//初始化全局变量对象
				dataGrid = $('#labelvariaterelevance_tab'),dataLabelType=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				initGridData();
				
				$('#btnSearch').click(function(){
		        	  getDataByCondition(); 
				});
				
				$('.add').click(function() {					
					insertDataGrid('labelvariaterelevance_tab',{CD:autoCreateCode('SYS')});
				});
				
				$('.delete').click(function(){
					deleteDataGrid('labelvariaterelevance_tab','CD','L000033','showMessageInfo');
	            });

				$('.save').click(function() {
					saveDataGrid('labelvariaterelevance_tab','L000032','L000034','showMessageInfo');
				});
			});
		}
	}
	var fcfo = new labelVariate();
	fcfo.init();
})();